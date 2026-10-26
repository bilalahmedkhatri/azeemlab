import test from 'node:test';
import assert from 'node:assert/strict';
import { latestBlogCards, type LatestBlogCard } from '../src/lib/blog/latest';

const card = (href: string, publishDate: string): LatestBlogCard => ({ href, publishDate, title: href, image: { src: '/og-image.png', alt: href } });

test('four latest cards combine static and DB dates and exclude the open article', () => {
  const cards = [card('/en/blog/static-old', '2026-01-01'), card('/en/blog/current', '2026-10-26'), card('/en/blog/db-latest', '2026-10-25'), card('/en/blog/static-latest', '2026-10-24'), card('/en/blog/db-second', '2026-10-23'), card('/en/blog/static-second', '2026-10-22')];
  assert.deepEqual(latestBlogCards(cards, '/en/blog/current').map(item => item.href), ['/en/blog/db-latest', '/en/blog/static-latest', '/en/blog/db-second', '/en/blog/static-second']);
  assert.equal(cards[0].href, '/en/blog/static-old');
});

test('same-slug static and DB articles remain distinct, and static cards work without DB rows', () => {
  const original = card('/fr/blog/guide', '2026-04-10');
  const database = card('/fr/blog/posts/guide', '2026-10-25');
  assert.deepEqual(latestBlogCards([original, database], original.href), [database]);
  assert.deepEqual(latestBlogCards([original, database], database.href), [original]);
  assert.deepEqual(latestBlogCards([original], '/fr/blog/other'), [original]);
});
