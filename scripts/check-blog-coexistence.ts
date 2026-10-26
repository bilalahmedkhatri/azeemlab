import assert from 'node:assert/strict';
import fs from 'node:fs';
import { blogPosts } from '../src/lib/data';
import { locales } from '../src/i18n/config';
import { articleContent } from '../src/lib/search-content';
import { siteUrl } from '../src/lib/site';

const origin = process.env.CHECK_ORIGIN || 'http://localhost:3000';
const escaped = (text: string) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
async function read(path: string) {
  const response = await fetch(origin + path, { headers: { 'user-agent': 'facebookexternalhit/1.1' }, signal: AbortSignal.timeout(60000) });
  return { status: response.status, html: await response.text() };
}
async function main() {
  const listing = await read('/en/blog');
  assert.equal(listing.status, 200);
  const sitemap = await read('/sitemap.xml');
  const llms = await read('/llms.txt');
  assert.equal(sitemap.status, 200);
  assert.equal(llms.status, 200);
  const checks: { path: string; status: number }[] = [];
  for (const post of blogPosts) {
    const path = `/en/blog/${post.slug}`;
    assert.ok(listing.html.includes(`href="${path}"`), `${path} listing link`);
    assert.ok(llms.html.includes(`${siteUrl}${path}`), `${path} llms link`);
    for (const locale of locales) assert.ok(sitemap.html.includes(`${siteUrl}/${locale}/blog/${post.slug}`), `${locale}/${post.slug} sitemap`);
    const response = await read(path);
    assert.equal(response.status, 200, path);
    assert.ok(response.html.includes(escaped(post.title)), `${path} title`);
    for (const section of articleContent[post.slug].sections) assert.ok(response.html.includes(escaped(section.text)), `${path} preserved section ${section.heading}`);
    assert.ok(response.html.includes(`rel="canonical" href="${siteUrl}${path}"`), `${path} original canonical`);
    assert.equal((response.html.match(/rel="alternate" hrefLang=/g) || []).length, 10, `${path} reciprocal locales`);
    checks.push({ path, status: response.status });
  }
  const staticPaths = new Set(locales.flatMap(locale => blogPosts.map(post => `${siteUrl}/${locale}/blog/${post.slug}`)));
  const databaseUrls = [...sitemap.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]).filter(url => url.includes('/blog/') && !staticPaths.has(url));
  assert.ok(databaseUrls.length, 'configured DB articles remain discoverable');
  for (const url of databaseUrls) {
    const path = new URL(url).pathname;
    const response = await read(path);
    assert.equal(response.status, 200, path);
    assert.ok(response.html.includes('property="og:type" content="article"'), `${path} article metadata`);
    assert.ok(llms.html.includes(url), `${path} llms discovery`);
    assert.ok(!response.html.includes('This article content is not available'), `${path} supported document`);
    if (path.startsWith('/en/')) assert.ok(listing.html.includes(`href="${path}"`), `${path} DB listing link`);
    checks.push({ path, status: response.status });
  }
  for (const locale of ['fr', 'ru']) {
    const path = `/${locale}/blog/${blogPosts[0].slug}`;
    const response = await read(path);
    assert.equal(response.status, 200, path);
    assert.ok(response.html.includes(`rel="canonical" href="${siteUrl}${path}"`));
    checks.push({ path, status: response.status });
  }
  fs.mkdirSync('artifacts/blog', { recursive: true });
  fs.writeFileSync('artifacts/blog/coexistence-check.json', JSON.stringify({ origin, staticArticles: blogPosts.length, staticSitemapUrls: staticPaths.size, databaseArticles: databaseUrls.length, checks }, null, 2));
  console.log(`${blogPosts.length} static articles retain full content, links and ${staticPaths.size} sitemap URLs; ${databaseUrls.length} DB articles remain available. Localized canonicals passed.`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
