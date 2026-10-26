import assert from 'node:assert/strict';
import fs from 'node:fs';

// Run against a dev server or the deployed origin. No browser or account login.
const origin = process.env.CHECK_ORIGIN || 'http://localhost:3000';
const path = process.env.CHECK_BLOG_PATH || '/en/blog/ai-automation-for-business-workflows-agents-roi';
const results = [];
for (const agent of ['facebookexternalhit/1.1', 'Twitterbot/1.0', 'LinkedInBot/1.0']) {
  const response = await fetch(new URL(path, origin), { headers: { 'user-agent': agent }, signal: AbortSignal.timeout(45000) });
  assert.equal(response.status, 200, `${agent}: article HTTP status`);
  const html = await response.text();
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] || '';
  const tags = new Map([...head.matchAll(/<meta\s+(?:name|property)="([^"]+)"\s+content="([^"]*)"[^>]*>/g)].map(match => [match[1], match[2]]));
  for (const name of ['og:title', 'og:description', 'og:image', 'og:url', 'og:site_name', 'og:locale', 'twitter:title', 'twitter:description', 'twitter:image']) {
    assert.ok(tags.get(name), `${agent}: missing ${name} in initial HTML head`);
  }
  assert.doesNotMatch(tags.get('og:title'), /Post Not Found/i, `${agent}: incorrect article metadata`);
  assert.equal(tags.get('og:type'), 'article');
  assert.equal(tags.get('twitter:card'), 'summary_large_image');
  assert.equal(tags.get('og:title'), tags.get('twitter:title'));
  assert.equal(tags.get('og:description'), tags.get('twitter:description'));
  assert.equal(tags.get('og:image'), tags.get('twitter:image'));
  assert.equal(new URL(tags.get('og:url')).pathname, path);
  assert.ok(tags.get('article:published_time'));
  assert.ok(tags.get('article:author'));
  const image = await fetch(tags.get('og:image').replaceAll('&amp;', '&'), { method: 'HEAD', headers: { 'user-agent': agent }, signal: AbortSignal.timeout(20000) });
  assert.equal(image.status, 200, `${agent}: public image status`);
  assert.match(image.headers.get('content-type') || '', /^image\//);
  results.push({ agent, status: response.status, title: tags.get('og:title'), image: tags.get('og:image'), imageStatus: image.status });
}
fs.mkdirSync('artifacts/blog', { recursive: true });
fs.writeFileSync('artifacts/blog/social-check.json', JSON.stringify({ origin, path, results }, null, 2));
console.log(`${results.length} social crawlers received complete article metadata in the HTML head and a public image.`);
