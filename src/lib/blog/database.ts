import 'server-only';
import postgres from 'postgres';

const globalDb = globalThis as typeof globalThis & { azeemlabBlogSql?: ReturnType<typeof postgres> };

export class BlogUnavailableError extends Error {
  constructor(readonly code = 'BLOG_DATABASE_UNAVAILABLE') {
    const hints: Record<string, string> = {
      BLOG_DATABASE_URL_MISSING: 'Set BLOG_DATABASE_URL in .env.local and restart the Next.js server.',
      BLOG_DATABASE_URL_INVALID: 'BLOG_DATABASE_URL must be a valid PostgreSQL connection URL.',
      '42P01': 'The configured database is missing a required blog table. Review the manual blog schema setup.',
      '42501': 'The configured database role does not have the required read permissions.',
      '28P01': 'PostgreSQL authentication failed. Review the server-only database credentials.',
    };
    const detail = process.env.NODE_ENV !== 'production'
      ? ` [${code}] ${hints[code] || 'Review the database connection, TLS configuration and schema.'}`
      : '';
    super(`Blog content is temporarily unavailable.${detail}`);
    this.name = 'BlogUnavailableError';
  }
}

export function database() {
  if (globalDb.azeemlabBlogSql) return globalDb.azeemlabBlogSql;
  const connection = process.env.BLOG_DATABASE_URL;
  if (!connection?.trim()) throw new BlogUnavailableError('BLOG_DATABASE_URL_MISSING');
  try {
    const url = new URL(connection);
    if (!['postgres:', 'postgresql:'].includes(url.protocol)) throw new Error();
    // Poolers may be explicit or recognizable by their hostname/port. Prepared
    // statements are disabled on every connection, including unrecognized poolers.
    const pooled = process.env.BLOG_DATABASE_POOLER === 'true' || /pooler|pgbouncer|-pooler/i.test(url.hostname) || url.port === '6543';
    const ssl = process.env.BLOG_DATABASE_SSL !== 'disable';
    globalDb.azeemlabBlogSql = postgres(connection, {
      prepare: false,
      max: pooled ? 3 : 5,
      connect_timeout: 5,
      idle_timeout: 20,
      max_lifetime: 300,
      ssl: ssl ? 'verify-full' : false,
      connection: { application_name: 'public-blog-reader' },
      onnotice: () => {},
    });
    return globalDb.azeemlabBlogSql;
  } catch { throw new BlogUnavailableError('BLOG_DATABASE_URL_INVALID'); }
}

export async function readQuery<T>(query: (sql: postgres.TransactionSql) => Promise<T>): Promise<T> {
  try {
    // Transaction-local settings also work with transaction-mode poolers that
    // reject statement_timeout/default_transaction_read_only startup parameters.
    return await database().begin('read only', async sql => {
      await sql`SET LOCAL statement_timeout = '8s'`;
      await sql`SET LOCAL lock_timeout = '2s'`;
      return query(sql);
    }) as T;
  }
  catch (error) {
    if (error instanceof BlogUnavailableError) throw error;
    // Preserve only a bounded error code, never driver messages, connection
    // URLs, SQL parameters or a raw error cause that could expose credentials.
    const code = error && typeof error === 'object' && 'code' in error ? error.code : undefined;
    throw new BlogUnavailableError(typeof code === 'string' && /^[A-Z0-9_]{2,40}$/.test(code) ? code : undefined);
  }
}
