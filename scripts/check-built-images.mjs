import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const origin=process.argv[2] || 'http://127.0.0.1:3001';
const sitemap=await (await fetch(`${origin}/sitemap.xml`)).text();
const imageUrls=[...sitemap.matchAll(/<image:loc>(.*?)<\/image:loc>/g)].map(match=>match[1]);
assert.ok(imageUrls.length >= 21, 'Image sitemap includes home, services, articles and existing project previews');
const assets=[];
for (const url of new Set(imageUrls)) {
  const path=new URL(url).pathname;
  const response=await fetch(`${origin}${path}`);
  assert.equal(response.status,200,path);
  assert.match(response.headers.get('content-type'), /^image\//,path);
  assets.push({path,status:response.status,bytes:(await response.arrayBuffer()).byteLength});
}
let taggedImages=0;
const pageUrls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
for (const url of pageUrls.filter(url=>new URL(url).pathname==='/' || /\/(blog|services)\/[^/]+$/.test(new URL(url).pathname))) {
  const path=new URL(url).pathname;
  const html=await (await fetch(`${origin}${path}`,{headers:{'User-Agent':'Googlebot'}})).text();
  const tags=[...html.matchAll(/<img\b[^>]*>/g)].map(match=>match[0]);
  let relevant=0;
  for (const tag of tags) {
    const src=tag.match(/\bsrc="([^"]+)"/)?.[1]?.replaceAll('&amp;','&');
    if (!src) continue;
    const imageURL=new URL(src,origin);
    const source=imageURL.searchParams.get('url') || imageURL.pathname;
    if (!source.startsWith('/images/')) continue;
    assert.match(tag,/\balt="[^"]+"/,path);
    assert.match(tag,/\bwidth="1200"/,path);
    assert.match(tag,/\bheight="800"/,path);
    assert.match(tag,/\bsizes="[^"]+"/,path);
    relevant++; taggedImages++;
  }
  assert.ok(relevant > 0,`${path} has visible crawlable illustrations`);
  assert.match(html,/property="og:image" content="https:\/\/www\.azeemlab\.com\/images\//,`${path} contextual social preview`);
  if (path==='/') assert.ok(html.includes('"primaryImageOfPage":{"@type":"ImageObject","url":"https://www.azeemlab.com/images/'));
  if (path.startsWith('/blog/')) assert.ok(html.includes('"image":{"@type":"ImageObject","url":"https://www.azeemlab.com/images/'));
}
await writeFile('artifacts/image-check.json',JSON.stringify({imageReferences:imageUrls.length,taggedImages,assets},null,2));
console.log(`PASS: ${imageUrls.length} sitemap image references, ${assets.length} working image assets and ${taggedImages} descriptive sized illustrations checked. Page previews and structured images verified.`);
