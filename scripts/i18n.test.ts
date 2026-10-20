import test from 'node:test';
import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { browserLocale, detectLocale, isLocale, localizedPath, locales } from '../src/i18n/config';
import { proxy } from '../src/proxy';
import { POST } from '../src/app/api/language/route';
import { languageAlternates } from '../src/i18n/urls';
import fs from 'node:fs';

test('language precedence, country mapping and weighted browser fallback', () => {
  assert.equal(detectLocale('en', 'RU', 'ru'), 'en');
  assert.equal(detectLocale(undefined, 'RU', 'en-US'), 'ru');
  assert.equal(detectLocale('invalid', 'CA', 'fr-CA;q=0.9,en;q=0.5'), 'fr');
  assert.equal(browserLocale('de;q=1,ja;q=0.7,fr;q=0.3'), 'ja');
  assert.equal(browserLocale('ru;q=0,en;q=0.5'), 'en');
  assert.equal(browserLocale('de'), 'en');
  assert.equal(isLocale('../../ru'), false);
  assert.equal(isLocale('en<script>'), false);
  assert.equal(localizedPath('fr', '/ru/blog/test?sort=new#table'), '/fr/blog/test?sort=new#table');
});

test('explicit URLs replace forged internal locale and never geo redirect', () => {
  const result = proxy(new NextRequest('https://www.azeemlab.com/en/services', { headers: { 'x-azeemlab-locale': 'ru', 'x-vercel-ip-country': 'RU' } }));
  assert.equal(result.status, 200);
  assert.equal(result.headers.get('x-middleware-request-x-azeemlab-locale'), 'en');
});

test('negotiated redirects preserve query and cannot be cached across visitors', () => {
  const old = process.env.VERCEL;
  try {
    process.env.VERCEL = '1';
    const result = proxy(new NextRequest('https://www.azeemlab.com/blog?sort=new', { headers: { 'x-vercel-ip-country': 'RU' } }));
    assert.equal(result.status, 307);
    assert.equal(result.headers.get('location'), 'https://www.azeemlab.com/ru/blog?sort=new');
    assert.match(result.headers.get('cache-control') || '', /private, no-store/);
    delete process.env.VERCEL;
    assert.match(proxy(new NextRequest('https://www.azeemlab.com/', { headers: { 'x-vercel-ip-country': 'RU' } })).headers.get('location') || '', /\/en$/);
  } finally { if (old === undefined) delete process.env.VERCEL; else process.env.VERCEL = old; }
});

test('language preference rejects cross-origin and arbitrary locale input', async () => {
  const request = (body: unknown, origin = 'https://www.azeemlab.com') => new NextRequest('https://www.azeemlab.com/api/language', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) });
  assert.equal((await POST(request({ locale: 'ru' }, 'https://evil.example'))).status, 403);
  for (const locale of ['../../ru', '//evil.example', 'fr<script>', 'de']) assert.equal((await POST(request({ locale }))).status, 400);
  const result = await POST(request({ locale: 'ru', returnUrl: 'https://evil.example' }));
  assert.equal(result.status, 200);
  assert.equal(result.headers.has('location'), false);
  assert.match(result.headers.get('set-cookie') || '', /HttpOnly/);
  assert.match(result.headers.get('set-cookie') || '', /SameSite=lax/i);
});

test('all catalogs preserve interpolation tokens and SEO alternates', () => {
  const source = JSON.parse(fs.readFileSync('translations/en.json', 'utf8')) as Record<string, string>;
  for (const locale of locales) {
    const dictionary = JSON.parse(fs.readFileSync(`translations/${locale}.json`, 'utf8'));
    for (const [id, text] of Object.entries(source)) {
      assert.ok(dictionary[id], `${locale}:${id}`);
      assert.deepEqual((dictionary[id].match(/XQH\d+QX/g) || []).sort(), (text.match(/XQH\d+QX/g) || []).sort(), `${locale}:${id} interpolation`);
    }
    assert.equal(languageAlternates('/about')[locale], `https://www.azeemlab.com/${locale}/about`);
  }
});
