// Build-time localization compiler: English templates are the single source of truth.
// Network access is only used by the explicit --translate authoring command, never a build.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import ts from 'typescript';

const root = path.resolve(import.meta.dirname, '..');
const src = path.join(root, 'src');
const out = path.join(src, 'generated');
const catalogDir = path.join(root, 'translations');
const locales = ['en', 'ru', 'nl', 'fr', 'es', 'pt-BR', 'zh-Hans', 'ko', 'ja'];
const targetLanguages = { ru: 'ru', nl: 'nl', fr: 'fr', es: 'es', 'pt-BR': 'pt', 'zh-Hans': 'zh-CN', ko: 'ko', ja: 'ja' };
const glossary = ['AzeemLab', 'Azeem Lab', 'azeemlab', 'Next.js', 'GreenLife', 'SmartConcierge', 'QuantumLeap', 'AI Letter Generator', 'LinkedIn', 'Facebook', 'Instagram', 'WhatsApp', 'OpenAI', 'ChatGPT', 'Gemini', 'Perplexity'];
const protectedTokens = text => [...glossary.filter(term => text.includes(term)), ...(text.match(/\b\d{1,2}(?:am|pm)\b/gi) || []), ...(text.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi) || [])].sort((a, b) => b.length - a.length);
const numericPattern = /\d+(?:[.,]\d+|[ \u00a0\u202f]\d{3}(?!\d))*(?:\s*%|\+)?/g;
const numbers = text => text.replace(/XQH\d+QX/g, '').match(numericPattern)?.map(n => n.replace(/\s/g, '')) || [];
const contentLibs = new Set(['data.ts', 'navigation.ts', 'visuals.ts', 'site.ts', 'schema.ts', 'service-content.ts', 'portfolio-content.ts', 'search-content.ts']);
const walk = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]);
const files = walk(src).filter(f => {
  const rel = path.relative(src, f).replaceAll('\\', '/');
  if (rel.startsWith('app/') && locales.includes(rel.split('/')[1])) return false;
  return /\.(tsx?|css)$/.test(f) && (rel.startsWith('components/') || rel.startsWith('contexts/') || rel.startsWith('hooks/') || rel.startsWith('types/') || (rel.startsWith('lib/') && contentLibs.has(path.basename(f))) || (rel.startsWith('app/') && !rel.startsWith('app/api/') && !rel.startsWith('app/[locale]/') && !/\/(sitemap|robots)\.ts$/.test(rel) && !rel.includes('llms.txt/') && !rel.includes('page_old')));
});
const readSource = f => {
  const relative = path.relative(src, f).replaceAll('\\', '/');
  return fs.readFileSync(relative === 'app/layout.tsx' ? path.join(src, 'templates/RootLayout.tsx') : relative === 'app/loading.tsx' ? path.join(src, 'templates/Loading.tsx') : f, 'utf8');
};
const sourceFiles = new Map(files.filter(f => /\.tsx?$/.test(f)).map(f => [f, ts.createSourceFile(f, readSource(f), ts.ScriptTarget.Latest, true, f.endsWith('.tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS)]));
const key = text => crypto.createHash('sha256').update(text).digest('hex').slice(0, 20);
const ignoredKeys = new Set(['slug', 'id', 'client', 'name', 'src', 'localPath', 'href', 'url', 'type', '@type', '@context', 'image', 'heroImage', 'icon', 'className', 'class', 'role', 'target', 'rel', 'key', 'value', 'field', 'status', 'method', 'strategy', 'loading', 'fetchpriority', 'categoryId', 'downloadFile', 'seoNote', 'schema', 'license', 'creditText', 'unsplashUrl', 'email', 'phone', 'service', 'projectType', 'property', 'content', 'initial', 'animate', 'exit', 'mode', 'variants', 'viewport', 'transition']);
const humanKeys = new Set(['title', 'description', 'label', 'text', 'heading', 'headline', 'metaTitle', 'metaDescription', 'excerpt', 'summary', 'alt', 'caption', 'q', 'a', 'question', 'answer', 'category', 'metric', 'ctaText', 'problem', 'solution', 'challenge', 'audience', 'differentiator', 'location', 'department', 'salary', 'employmentType', 'tags', 'topTrafficSources']);
function ownerKey(node) {
  let p = node.parent;
  while (p && !ts.isStatement(p)) {
    if (ts.isPropertyAssignment(p)) return p.name.getText().replace(/^['"]|['"]$/g, '');
    if (ts.isJsxAttribute(p)) return p.name.getText();
    p = p.parent;
  }
  return '';
}
function human(node, text) {
  if (!text.trim() || !/[a-zA-Z]/.test(text)) return false;
  if (ts.isJsxText(node)) return !!text.trim();
  const p = node.parent;
  if (!p || ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isLiteralTypeNode(p) || (ts.isPropertyAssignment(p) && p.name === node) || ts.isElementAccessExpression(p) || (ts.isBinaryExpression(p) && [ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken].includes(p.operatorToken.kind)) || ts.isImportTypeNode(p)) return false;
  const owner = ownerKey(node);
  if (ignoredKeys.has(owner) || owner.startsWith('@')) return false;
  if (ts.isJsxAttribute(p)) return ['alt', 'title', 'placeholder', 'aria-label', 'label'].includes(owner);
  if (text === 'use client' || text === 'use server' || /^(https?:|mailto:|tel:|\/|#|@|\.|\{)/.test(text.trim()) || /[<>]|=>|\b(?:function|const|var)\s/.test(text)) return false;
  if (humanKeys.has(owner)) return true;
  if (ts.isArrayLiteralExpression(p) && p.elements[0] === node && p.elements[1] && ts.isStringLiteral(p.elements[1]) && p.elements[1].text.startsWith('/')) return true;
  if (ts.isArrayLiteralExpression(p) && ['Discover', 'Design', 'Build', 'Launch & refine', 'Explore', 'Strategy', 'Development', 'Marketing', 'Research', 'Email', 'Phone', 'Website'].includes(text)) return true;
  return /[A-Za-z]{2,}\s+[A-Za-z]/.test(text) && !/(?:\b(?:flex|grid|text-|bg-|px-|py-|w-|h-|border-|font-|rounded-|max-|min-|items-|justify-|hover:)|\.[a-z]+\{)/.test(text);
}
const decode = text => text.replace(/&apos;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ');
const catalog = {};
function segments(sf) {
  const result = [];
  function visit(node) {
    if (ts.isTemplateExpression(node)) {
      const expressions = node.templateSpans.map(s => s.expression.getText(sf));
      const text = node.head.text + node.templateSpans.map((s, i) => `XQH${i}QX${s.literal.text}`).join('');
      if (human(node, text)) { result.push({ node, text, expressions, kind: 'template' }); return; }
    }
    if (ts.isJsxText(node)) {
      const text = decode(node.text.replace(/\s+/g, ' ').trim());
      if (human(node, text)) result.push({ node, text, kind: 'jsx' });
      return;
    }
    if ((ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) && human(node, node.text)) result.push({ node, text: node.text, kind: ts.isJsxAttribute(node.parent) ? 'attribute' : 'string' });
    ts.forEachChild(node, visit);
  }
  visit(sf);
  return result;
}
const extracted = new Map();
for (const [f, sf] of sourceFiles) { const items = segments(sf); extracted.set(f, items); for (const item of items) catalog[key(item.text)] = item.text; }
fs.mkdirSync(catalogDir, { recursive: true });
fs.writeFileSync(path.join(catalogDir, 'en.json'), JSON.stringify(catalog, null, 2) + '\n');

if (process.argv.includes('--translate')) {
  // Public editorial copy only; not API prompts, uploads, reports, secrets or submissions.
  for (const locale of locales.filter(l => l !== 'en')) {
    const dest = path.join(catalogDir, `${locale}.json`);
    const messages = fs.existsSync(dest) ? JSON.parse(fs.readFileSync(dest, 'utf8')) : {};
    const pending = Object.entries(catalog).filter(([id, text]) => !messages[id] || (process.argv.includes('--repair') && protectedTokens(text).some(token => !messages[id].includes(token))));
    const batches = [];
    let batch = [], size = 0;
    for (const entry of pending) { if (size + entry[1].length > 3500 && batch.length) { batches.push(batch); batch = []; size = 0; } batch.push(entry); size += entry[1].length + 24; }
    if (batch.length) batches.push(batch);
    let cursor = 0, done = 0;
    await Promise.all(Array.from({ length: 3 }, async () => {
      while (cursor < batches.length) {
        const group = batches[cursor++];
        const protections = group.map(([, value]) => protectedTokens(value));
        const usedProtections = group.map(() => new Set());
        const text = group.map(([, value], index) => {
          const escaped = protections[index].map(token => token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
          const protectedValue = escaped.length ? value.replace(new RegExp(`XQH\\d+QX|${escaped.join('|')}`, 'g'), token => {
            if (token.startsWith('XQH')) return token;
            const position = protections[index].indexOf(token);
            usedProtections[index].add(position);
            return `XQK${position}QX`;
          }) : value;
          return `\n[${String(index).padStart(6, '0')}]\n${protectedValue}`;
        }).join('\n');
        let lastError;
        for (let attempt = 0; attempt < 5; attempt++) {
          try {
            const url = new URL('https://translate.googleapis.com/translate_a/single');
            for (const [k, v] of Object.entries({ client: 'gtx', sl: 'en', tl: targetLanguages[locale], dt: 't', q: text })) url.searchParams.set(k, v);
            const response = await fetch(url, { signal: AbortSignal.timeout(40000) });
            if (!response.ok) throw new Error(`Translation HTTP ${response.status}`);
            const data = await response.json();
            const translated = data[0].map(x => x[0]).join('').replace(/[XХＸ][QＱ][KＫ]\s*(\d+)\s*[QＱ][XХＸ]/g, 'XQK$1QX');
            const matches = [...translated.matchAll(/[\[［]\s*(\d{6})\s*[\]］]/g)];
            if (matches.length !== group.length) throw new Error('Translation batch marker mismatch');
            for (let i = 0; i < matches.length; i++) {
              const id = group[Number(matches[i][1])]?.[0];
              let value = translated.slice(matches[i].index + matches[i][0].length, matches[i + 1]?.index ?? translated.length).trim();
              protections[Number(matches[i][1])].forEach((token, index) => {
                if (!usedProtections[Number(matches[i][1])].has(index)) return;
                if (!value.includes(`XQK${index}QX`)) throw new Error(`Protected fact placeholder mismatch ${locale}: ${token}; source=${group[Number(matches[i][1])][1]}; output=${value}`);
                value = value.replaceAll(`XQK${index}QX`, token);
              });
              const source = catalog[id];
              if (!source || !value) throw new Error('Translation incomplete');
              const sourceNumbers = numbers(source);
              const normal = n => n.replace(/[.,\s%+]/g, '');
              value = value.replace(new RegExp(`XQH\\d+QX|${numericPattern.source}`, 'g'), token => {
                if (token.startsWith('XQH')) return token;
                const sourceNumber = sourceNumbers.find(n => normal(n) === normal(token));
                return sourceNumber ? /[%+]\s*$/.test(token) ? sourceNumber : sourceNumber.replace(/[%+]$/, '') : token;
              });
              const expected = source.match(/XQH\d+QX/g) || [];
              if (expected.some(token => !value.includes(token))) throw new Error('Translation placeholder mismatch');
              messages[id] = value;
            }
            fs.writeFileSync(dest, JSON.stringify(messages, null, 2) + '\n');
            done++; if (done % 10 === 0 || done === batches.length) console.log(`${locale}: ${done}/${batches.length} batches`);
            lastError = null; break;
          } catch (error) { lastError = error; await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1))); }
        }
        if (lastError) throw lastError;
      }
    }));
  }
}
if (process.argv.includes('--extract')) { console.log(`${Object.keys(catalog).length} source messages, ${Object.values(catalog).reduce((n, t) => n + t.length, 0)} characters`); process.exit(0); }

const missing = [];
const dictionaries = Object.fromEntries(locales.map(locale => {
  const file = path.join(catalogDir, `${locale}.json`);
  const messages = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  for (const id of Object.keys(catalog)) if (!messages[id]) missing.push(`${locale}:${id}`);
  return [locale, messages];
}));
if (missing.length) throw new Error(`Missing ${missing.length} translations; run the translation authoring command. Examples: ${missing.slice(0, 8).join(', ')}`);

fs.mkdirSync(out, { recursive: true });
for (const locale of locales) {
  for (const file of files) {
    const relative = path.relative(src, file);
    const dest = path.join(out, locale, relative);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    let content = readSource(file);
    const replacements = [];
    if (locale !== 'en') for (const item of extracted.get(file) || []) {
      const translated = dictionaries[locale][key(item.text)];
      let value = JSON.stringify(translated);
      if (item.kind === 'template') {
        value = '`' + translated.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${').replace(/XQH(\d+)QX/g, (_, i) => '${' + item.expressions[Number(i)] + '}') + '`';
      } else if (item.kind === 'jsx') value = '{' + value + '}';
      else if (item.kind === 'attribute') value = '{' + value + '}';
      replacements.push({ start: item.node.getStart(), end: item.node.getEnd(), value });
    }
    const sf = sourceFiles.get(file);
    if (sf) {
      const visit = node => {
        if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
          const spec = node.moduleSpecifier.text;
          let target = spec;
          if (spec === 'next/link') target = '@/i18n/Link';
          else if (spec.startsWith('@/') && !spec.startsWith('@/i18n/')) {
            const original = path.join(src, spec.slice(2));
            if (files.some(f => f === original || f === original + '.ts' || f === original + '.tsx' || f === path.join(original, 'index.ts') || f === path.join(original, 'index.tsx'))) target = `@/generated/${locale}/${spec.slice(2)}`;
          }
          if (target !== spec) replacements.push({ start: node.moduleSpecifier.getStart(), end: node.moduleSpecifier.getEnd(), value: JSON.stringify(target) });
        }
        ts.forEachChild(node, visit);
      };
      visit(sf);
    }
    for (const replacement of replacements.sort((a, b) => b.start - a.start)) content = content.slice(0, replacement.start) + replacement.value + content.slice(replacement.end);
    if (relative.replaceAll('\\', '/') === 'app/layout.tsx') {
      content = content.replace('import "../styles/globals.css";', '').replace('<html lang="en" suppressHydrationWarning>', '<>').replace('</html>', '</>').replace('<head>', '<>').replace('</head>', '</>').replace(/<body className="[^"]*">/, '<>').replace('</body>', '</>');
      content = `import {NextIntlClientProvider} from 'next-intl';\n` + content.replace('<Header />', `<NextIntlClientProvider locale="${locale}" messages={{}}><Header />`).replace('<SpeedInsights />', '<SpeedInsights /></NextIntlClientProvider>');
    }
    if (relative.replaceAll('\\', '/') === 'lib/site.ts') {
      content = `import {localizeUrl} from '@/i18n/urls';\n` + content.replace('new URL(path, `${siteUrl}/`).href', `localizeUrl('${locale}', new URL(path, \`\${siteUrl}/\`).href)`);
    }
    if (relative.replaceAll('\\', '/') === 'components/SEO/JSONLD.tsx') {
      content = `import {localizeSchema} from '@/i18n/urls';\n` + content.replace('JSON.stringify(data)', `JSON.stringify(localizeSchema('${locale}', data))`);
    }
    content = content.replace(/toLocaleDateString\((['"])en-(US|GB)\1/g, `toLocaleDateString('${locale}'`);
    // Localize plain internal anchors too; assets, mail, APIs and fragment links stay intact.
    content = content.replace(/href=(['"])(\/(?!\/|api\/)[^'"{}]*)\1/g, (all, quote, href) => /\.[a-z0-9]+(?:[?#]|$)/i.test(href) ? all : `href=${quote}/${locale}${href === '/' ? '' : href}${quote}`);
    fs.writeFileSync(dest, content);
  }
}
const pageFiles = files.filter(f => f.endsWith(path.sep + 'page.tsx'));
// Each filesystem locale imports only its own registry and client boundary graph.
// A single registry containing every locale makes Next preload unrelated locale clients.
for (const locale of locales) {
  const entries = pageFiles.map(file => {
    const rel = path.relative(path.join(src, 'app'), file).replaceAll('\\', '/').replace(/(?:^|\/)page\.tsx$/, '');
    return `  '${'/' + rel}': () => import('./app/${rel ? rel + '/' : ''}page'),`;
  });
  const layouts = files.filter(f => f.endsWith(path.sep + 'layout.tsx') && f !== path.join(src, 'app/layout.tsx')).map(file => {
    const rel = path.relative(path.join(src, 'app'), file).replaceAll('\\', '/').replace(/\/layout\.tsx$/, '');
    return rel.startsWith('..') ? '' : `  '/${rel}': () => import('./app/${rel}/layout'),`;
  }).filter(Boolean);
  fs.writeFileSync(path.join(out, locale, 'registry.ts'), `export const pageLoaders = {\n${entries.join('\n')}\n};\nexport const layoutLoaders = {\n${layouts.join('\n')}\n};\n`);
}
console.log(`Compiled ${locales.length} isolated locales from ${files.length} shared source modules; ${Object.keys(catalog).length} messages per locale.`);
