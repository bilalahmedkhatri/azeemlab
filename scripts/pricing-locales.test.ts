import test from 'node:test';
import assert from 'node:assert/strict';
import { locales } from '../src/i18n/config';
import { pricingMessages, pricingTranslator } from '../src/i18n/pricing/messages';
import sitemap from '../src/app/sitemap';

test('pricing catalogs cover every source message without silent English fallbacks', () => {
  const source = pricingMessages.en;
  assert.equal(new Set(source).size, source.length);
  for (const locale of locales) {
    const messages = pricingMessages[locale];
    assert.equal(messages.length, source.length, locale);
    messages.forEach((message, index) => {
      assert.ok(message.trim(), `${locale}: ${index}`);
      assert.equal(pricingTranslator(locale)(source[index]), message);
      // Quantities in scope must survive translation. Some languages also
      // represent English words such as "one" with a digit.
      const translatedNumbers: string[] = message.match(/\d+/g) || [];
      for (const number of source[index].match(/\d+/g) || []) {
        assert.ok(translatedNumbers.includes(number), `${locale}: ${source[index]}`);
      }
    });
    assert.equal(pricingTranslator(locale)('USD'), 'USD');
    if (locale !== 'en') {
      for (const key of ['Business service pricing.', 'What is included', 'Get my project quote']) {
        assert.notEqual(pricingTranslator(locale)(key), key, `${locale}: ${key}`);
      }
    }
  }
  assert.throws(() => pricingTranslator('en')('An uncatalogued pricing string'), /Missing pricing translation/);
});

test('pricing sitemap lists exactly nine canonical routes with reciprocal alternates', () => {
  const entries = sitemap().filter(entry => entry.url.endsWith('/pricing/plan_detail/business'));
  assert.equal(entries.length, locales.length);
  for (const locale of locales) {
    const entry = entries.find(item => new URL(item.url).pathname === `/${locale}/pricing/plan_detail/business`);
    assert.ok(entry, locale);
    assert.equal(Object.keys(entry.alternates?.languages || {}).length, locales.length + 1);
    assert.equal(entry.alternates?.languages?.[locale], entry.url);
  }
});
