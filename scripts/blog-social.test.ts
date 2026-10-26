import test from 'node:test';
import assert from 'node:assert/strict';
import { postSeo } from '../src/lib/blog/seo';
import { absoluteUrl } from '../src/lib/site';
import { blogUrl } from '../src/lib/blog/config';
import type { PostRow } from '../src/lib/blog/types';

const post: PostRow = {
  id: 1, locale: 'en', slug: 'automation-guide', title: 'AI & Automation', excerpt: 'A practical guide to automation.',
  content_schema_version: 1, metadata_json: {}, author_name: 'Bilal Ahmed', author_designation: 'Developer', author_avatar_url: null,
  published_at: new Date('2026-10-25T00:00:00Z'), updated_at: new Date('2026-10-25T01:00:00Z'), category_name: 'AI', category_slug: 'ai',
  cover: { id: 6, public_url: 'https://media.example.com/cover.png', media_type: 'image/png', original_filename: 'cover.png', alt_text: 'Automation diagram', caption: null, width: 2172, height: 724 },
};

test('article social metadata shares its own cover, title, excerpt and canonical URL', () => {
  const previous = process.env.BLOG_MEDIA_ORIGINS;
  try {
    process.env.BLOG_MEDIA_ORIGINS = 'https://media.example.com';
    const { metadata, structuredData } = postSeo(post);
    const og = metadata.openGraph as Record<string, unknown>;
    const twitter = metadata.twitter as Record<string, unknown>;
    assert.equal(og.type, 'article');
    assert.equal(og.siteName, 'AzeemLab');
    assert.equal(og.locale, 'en_US');
    assert.equal(og.title, post.title);
    assert.equal(og.description, post.excerpt);
    assert.equal(og.url, blogUrl('en', post.slug));
    assert.deepEqual(og.images, [{ url: post.cover!.public_url, secureUrl: post.cover!.public_url, width: 2172, height: 724, type: 'image/png', alt: 'Automation diagram' }]);
    assert.equal(og.publishedTime, post.published_at.toISOString());
    assert.equal(twitter.card, 'summary_large_image');
    assert.equal(twitter.title, post.title);
    assert.equal(twitter.description, post.excerpt);
    assert.deepEqual(twitter.images, [{ url: post.cover!.public_url, alt: 'Automation diagram' }]);
    assert.deepEqual(structuredData.image, [post.cover!.public_url]);
  } finally {
    if (previous === undefined) delete process.env.BLOG_MEDIA_ORIGINS;
    else process.env.BLOG_MEDIA_ORIGINS = previous;
  }
});

test('missing cover has an absolute fallback image rather than an empty share card', () => {
  const { metadata } = postSeo({ ...post, cover: null });
  assert.deepEqual(metadata.openGraph?.images, [{ url: absoluteUrl('/og-image.png'), secureUrl: absoluteUrl('/og-image.png'), alt: 'AzeemLab' }]);
  assert.equal((metadata.twitter as { card: string }).card, 'summary_large_image');
});

test('SEO overrides retain the published post URL and selected language', () => {
  const { metadata } = postSeo({ ...post, cover: null, locale: 'fr', metadata_json: { title: 'Custom title', description: 'Custom description', canonical_url: 'https://other.example/incorrect' } });
  assert.equal(metadata.openGraph?.url, blogUrl('fr', post.slug));
  assert.equal(metadata.openGraph?.title, 'Custom title');
  assert.equal(metadata.openGraph?.description, 'Custom description');
  assert.equal(metadata.openGraph?.locale, 'fr_FR');
});
