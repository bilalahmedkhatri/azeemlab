import { isLocale, localizedPath, type Locale } from './config';

export function localizeUrl(locale: Locale, value: string) {
  const url = new URL(value);
  if (url.origin !== new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.azeemlab.com').origin || /\.[a-z0-9]+$/i.test(url.pathname) || url.pathname.startsWith('/api/')) return value;
  url.pathname = localizedPath(locale, url.pathname);
  return url.href;
}
export function languageAlternates(pathname: string) {
  const origin = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.azeemlab.com').origin;
  const tags = ['en', 'ru', 'nl', 'fr', 'es', 'pt-BR', 'zh-Hans', 'ko', 'ja'];
  return Object.fromEntries([...tags.filter(isLocale).map(locale => [locale, `${origin}${localizedPath(locale, pathname)}`]), ['x-default', `${origin}${localizedPath('en', pathname)}`]]);
}

export function localizeSchema(locale: Locale, value: unknown, key = ''): unknown {
  if (typeof value === 'string' && ['@id', 'url', 'mainEntityOfPage', 'item'].includes(key) && /^https?:\/\//.test(value)) {
    const url = new URL(value);
    const preferred = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.azeemlab.com');
    if ([preferred.hostname, preferred.hostname.replace(/^www\./, '')].includes(url.hostname)) { url.protocol = preferred.protocol; url.host = preferred.host; return localizeUrl(locale, url.href); }
  }
  if (Array.isArray(value)) return value.map(item => localizeSchema(locale, item, key));
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const result = Object.fromEntries(Object.entries(record).map(([name, item]) => [name, localizeSchema(locale, item, name)]));
    if (['WebSite', 'WebPage', 'Article', 'BlogPosting'].includes(String(record['@type']))) result.inLanguage = locale;
    return result;
  }
  return value;
}
