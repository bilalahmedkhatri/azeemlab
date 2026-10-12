import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const origin = process.argv[2] || 'http://127.0.0.1:3001';
const xml = await (await fetch(`${origin}/sitemap.xml`)).text();
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const results = [];
for (const url of urls) {
  const path = new URL(url).pathname;
  const response = await fetch(`${origin}${path}`, { headers: { 'User-Agent': 'Googlebot' } });
  const html = await response.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const title = html.match(/<title>(.*?)<\/title>/i)?.[1];
  results.push({ path, status: response.status, canonical, title });
  assert.equal(response.status, 200, path);
  assert.equal(new URL(canonical).href, new URL(url).href, path);
  assert.ok(title, path);
  const markup = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
  assert.equal([...markup.matchAll(/<h1\b/g)].length, 1, `${path} main heading`);
  if (path === '/' || path.startsWith('/blog/') || /^\/services\/[^/]+$/.test(path)) {
    const scripts = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/g)];
    assert.ok(scripts.length >= 2, `${path} server structured data`);
    scripts.forEach(match => JSON.parse(match[1]));
  }
}
for (const [oldPath, replacement] of [['/about-us', '/about'], ['/services/seo-marketing', '/services/seo']]) {
  const response = await fetch(`${origin}${oldPath}`, { redirect: 'manual' });
  assert.equal(response.status, 308);
  assert.equal(new URL(response.headers.get('location'), origin).pathname, replacement);
}
const missing = await fetch(`${origin}/missing-audit-page`, { headers: { 'User-Agent': 'Googlebot' } });
assert.equal(missing.status, 404);
assert.match(await missing.text(), /name="robots" content="noindex"/);
const robots = await (await fetch(`${origin}/robots.txt`)).text();
assert.ok(!robots.includes('/_next'));
await writeFile('artifacts/built-seo-check.json', JSON.stringify(results, null, 2));
console.log(`PASS: ${results.length} sitemap routes return 200, a self canonical, a title and one H1. Server JSON-LD, two 308 redirects, 404 noindex and robots checked.`);
