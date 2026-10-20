import fs from 'node:fs';
import assert from 'node:assert/strict';

const origin = process.env.CHECK_ORIGIN || 'http://localhost:3100';
const locales = ['en', 'ru', 'nl', 'fr', 'es', 'pt-BR', 'zh-Hans', 'ko', 'ja'];
const english = JSON.parse(fs.readFileSync('translations/en.json', 'utf8'));
const id = Object.keys(english).find(key => english[key].startsWith('Custom responsive websites, AI chatbots,'));
assert.ok(id, 'Homepage locale isolation sentinel exists');
const sentinels = Object.fromEntries(locales.map(locale => [locale, JSON.parse(fs.readFileSync(`translations/${locale}.json`, 'utf8'))[id]]));
const chunkCache = new Map();
const results = [];
for (const locale of locales) {
  const html = await (await fetch(`${origin}/${locale}`)).text();
  const chunks = [...new Set([...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(match => match[1]).filter(url => url.startsWith('/_next/') && url.endsWith('.js')))];
  const code = await Promise.all(chunks.map(async chunk => {
    if (!chunkCache.has(chunk)) chunkCache.set(chunk, fetch(origin + chunk).then(response => response.text()));
    return chunkCache.get(chunk);
  }));
  const payload = (html + code.join('\n')).replace(/&#x27;|&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&');
  assert.ok(payload.includes(sentinels[locale]), `${locale} selected content present`);
  for (const other of locales.filter(value => value !== locale)) assert.ok(!payload.includes(sentinels[other]), `${locale} must not load ${other} content`);
  results.push({ locale, chunks: chunks.length, unrelatedLocaleSentinels: 0 });
}
fs.mkdirSync('artifacts', { recursive: true });
fs.writeFileSync('artifacts/i18n-bundle-check.json', JSON.stringify(results, null, 2));
console.log('PASS: all 9 initial HTML/RSC + referenced client bundle sets contain their selected homepage copy and none of the other 8 locale sentinels.');
