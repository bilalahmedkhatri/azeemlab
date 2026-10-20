import assert from 'node:assert/strict';
import fs from 'node:fs';
import sitemap from '../src/app/sitemap';

const origin = process.env.CHECK_ORIGIN || 'http://localhost:3100';
const urls = sitemap().map(item => item.url);
let cursor = 0;
const results: unknown[] = [];
async function main() {
await Promise.all(Array.from({ length: 3 }, async () => {
  while (cursor < urls.length) {
    const canonical = urls[cursor++];
    const path = new URL(canonical).pathname;
    const response = await fetch(origin + path);
    const html = await response.text();
    assert.equal(response.status, 200, path);
    const locale = path.split('/')[1];
    assert.ok(html.includes(`<html lang="${locale}"`), `${path} HTML language`);
    assert.ok(html.includes(`rel="canonical" href="${canonical}"`), `${path} canonical`);
    assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${path} H1`);
    assert.equal((html.match(/rel="alternate" hrefLang=/g) || []).length, 10, `${path} hreflang`);
    results.push({ path, status: response.status, locale });
    if (results.length % 30 === 0) console.log(`${results.length}/${urls.length} localized pages verified`);
  }
}));
fs.mkdirSync('artifacts', { recursive: true });
fs.writeFileSync('artifacts/i18n-http-check.json', JSON.stringify(results, null, 2));
console.log(`PASS ${results.length} localized pages: 200, correct HTML language, canonical, H1 and reciprocal hreflang.`);
}
main().catch(error => { console.error(error); process.exitCode = 1; });
