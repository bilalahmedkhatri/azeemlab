import assert from 'node:assert/strict';
import fs from 'node:fs';
import sitemap from '../src/app/sitemap';
import { locales } from '../src/i18n/config';

const origin = process.env.CHECK_ORIGIN || 'http://localhost:3000';
const pricing = '/pricing/plan_detail/business';
const englishPaths = sitemap().map(entry => new URL(entry.url).pathname).filter(path => path === '/en' || path.startsWith('/en/'));
const paths = [...new Set([...englishPaths, ...locales.flatMap(locale => [`/${locale}`, `/${locale}/partners`, `/${locale}${pricing}`])])];
const pages = new Map<string, { html: string; links: Set<string>; main: Set<string> }>();

function links(html: string, path: string) {
  const result = new Set<string>();
  for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll('&amp;', '&'), origin + path);
    if (url.origin === origin) result.add(url.pathname.replace(/\/$/, '') || '/');
  }
  return result;
}

async function main() {
  let cursor = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (cursor < paths.length) {
      const path = paths[cursor++];
      const response = await fetch(origin + path, { signal: AbortSignal.timeout(60000) });
      assert.equal(response.status, 200, path);
      const html = await response.text();
      const main = html.replace(/<header\b[\s\S]*?<\/header>/g, '').replace(/<footer\b[\s\S]*?<\/footer>/g, '');
      pages.set(path, { html, links: links(html, path), main: links(main, path) });
    }
  }));

  const visited = new Set<string>();
  const queue = ['/en'];
  while (queue.length) {
    const path = queue.shift()!;
    if (visited.has(path)) continue;
    visited.add(path);
    for (const target of pages.get(path)?.links || []) {
      if (englishPaths.includes(target) && !visited.has(target)) queue.push(target);
    }
  }
  assert.deepEqual(englishPaths.filter(path => !visited.has(path)), [], 'Public sitemap pages must be reachable from the homepage');

  for (const locale of locales) {
    const home = pages.get(`/${locale}`)!.html;
    const footer = home.match(/<footer\b[\s\S]*?<\/footer>/)?.[0] || '';
    assert.ok(links(footer, `/${locale}`).has(`/${locale}${pricing}`), `${locale}: footer pricing`);
    assert.ok(links(footer, `/${locale}`).has(`/${locale}/partners`), `${locale}: footer partners`);
    const html = pages.get(`/${locale}${pricing}`)!.html;
    assert.equal((html.match(/rel="alternate" hrefLang=/g) || []).length, 10, `${locale}: pricing hreflang`);
    const schema = html.match(/<script[^>]*id="business-pricing-schema"[^>]*>([\s\S]*?)<\/script>/);
    assert.ok(schema, `${locale}: shared pricing schema (including the English route)`);
    assert.equal(JSON.parse(schema[1])['@graph'].filter((item: Record<string, unknown>) => item['@type'] === 'Service').length, 6);
  }

  const contextual: [string, string][] = [
    ['/en', `/en${pricing}`], ['/en', '/en/partners'],
    ['/en/services', `/en${pricing}`], ['/en/process', `/en${pricing}`],
    ['/en/about', '/en/partners'], ['/en/contact', '/en/partners'],
    ['/en/contact', `/en${pricing}`], ['/en/partners', `/en${pricing}`],
  ];
  for (const path of englishPaths.filter(path => path.startsWith('/en/services/'))) contextual.push([path, `/en${pricing}`]);
  for (const [from, to] of contextual) assert.ok(pages.get(from)?.main.has(to), `Missing contextual link: ${from} -> ${to}`);

  const report = { checkedPages: pages.size, reachableEnglishPages: englishPaths.length, orphanPages: [], languages: locales.length, contextualLinks: contextual.length, pricingSchemaAndHreflang: 'passed' };
  fs.mkdirSync('artifacts/seo', { recursive: true });
  fs.writeFileSync('artifacts/seo/internal-links-check.json', JSON.stringify(report, null, 2) + '\n');
  console.log(report);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
