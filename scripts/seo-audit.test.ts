import test from 'node:test';
import assert from 'node:assert/strict';
import sitemap from '../src/app/sitemap';
import robots from '../src/app/robots';
import { createPageMetadata, siteUrl } from '../src/lib/site';
import { blogPosts, caseStudies } from '../src/lib/data';
import { articleContent } from '../src/lib/search-content';
import { serviceContexts, serviceContextLength } from '../src/lib/service-content';
import { portfolioContextLength } from '../src/lib/portfolio-content';
import { services } from '../src/lib/data';
import { POST } from '../src/app/api/whatsapp/route';
import { existsSync } from 'node:fs';

test('sitemap has unique current canonical routes and includes every article', () => {
  const urls = sitemap().map(entry => entry.url);
  assert.equal(new Set(urls).size, urls.length);
  assert.ok(urls.includes(`${siteUrl}/about`));
  assert.ok(!urls.includes(`${siteUrl}/about-us`));
  assert.ok(!urls.includes(`${siteUrl}/services/seo-marketing`));
  for (const post of blogPosts) {
    assert.ok(urls.includes(`${siteUrl}/blog/${post.slug}`));
    assert.ok(articleContent[post.slug]?.sections.length >= 4);
  }
  assert.equal(createPageMetadata('/contact', 'Contact', 'Enquire').alternates?.canonical, '/contact');
  assert.equal(robots().sitemap, `${siteUrl}/sitemap.xml`);
  assert.ok(!JSON.stringify(robots()).includes('/_next/'));
});

test('every commercial service has a substantial, distinct context guide', () => {
  for (const service of services) {
    const context = serviceContexts[service.slug];
    assert.ok(context, `${service.slug} context exists`);
    assert.ok(serviceContextLength(service.slug) >= 10000, `${service.slug} context is at least 10,000 characters`);
    assert.ok(context.sections.length >= 18, `${service.slug} has structured sections`);
  }
});

test('portfolio only refers to existing local images', () => {
  for (const project of caseStudies) {
    if (project.heroImage.startsWith('/')) assert.ok(existsSync(`public${project.heroImage}`), project.heroImage);
    assert.ok(portfolioContextLength(project) >= 10000, `${project.slug} portfolio context is at least 10,000 characters`);
  }
});

test('enquiries validate input and only acknowledge confirmed delivery', async () => {
  const originalFetch = global.fetch;
  const originalEndpoint = process.env.WHATSAPP_API_URL;
  const originalRecipient = process.env.WHATSAPP_RECIPIENT_NUMBER;
  const fields = { name: 'Test Enquiry', email: 'test@example.test', phone: '447000000000', projectType: 'ai-integrations', message: 'This is a mocked test enquiry.' };
  const request = (body: unknown) => new Request('http://localhost/api/whatsapp', { method: 'POST', body: JSON.stringify(body) });
  try {
    global.fetch = async () => { throw new Error('No outbound calls permitted in this test'); };
    assert.equal((await POST(request({ ...fields, email: 'bad' }))).status, 400);
    assert.equal((await POST(new Request('http://localhost/api/whatsapp', { method: 'POST', body: 'bad json' }))).status, 400);
    assert.equal((await POST(request({ ...fields, message: 'short' }))).status, 400);
    delete process.env.WHATSAPP_API_URL;
    assert.equal((await POST(request(fields))).status, 503);
    process.env.WHATSAPP_API_URL = 'https://gateway.example.test';
    process.env.WHATSAPP_RECIPIENT_NUMBER = '923000000000';
    global.fetch = async (_input, options) => {
      const payload = JSON.parse(String(options?.body));
      assert.equal(payload.number, '923000000000');
      assert.ok(payload.message.includes(fields.phone));
      return Response.json({ success: true });
    };
    const success = await POST(request(fields));
    assert.equal(success.status, 200);
    assert.deepEqual(await success.json(), { success: true });
    global.fetch = async () => Response.json({ success: false });
    assert.equal((await POST(request(fields))).status, 502);
    global.fetch = async () => Response.json({});
    assert.equal((await POST(request(fields))).status, 502);
    global.fetch = async () => Response.json({ success: true }, { status: 500 });
    assert.equal((await POST(request(fields))).status, 502);
  } finally {
    global.fetch = originalFetch;
    if (originalEndpoint === undefined) delete process.env.WHATSAPP_API_URL;
    else process.env.WHATSAPP_API_URL = originalEndpoint;
    if (originalRecipient === undefined) delete process.env.WHATSAPP_RECIPIENT_NUMBER;
    else process.env.WHATSAPP_RECIPIENT_NUMBER = originalRecipient;
  }
});
