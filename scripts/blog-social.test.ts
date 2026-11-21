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

test('SEO, AEO and GEO: prioritizes blog_details_json.seo over metadata_json and defaults', () => {
  const customPost: PostRow = {
    ...post,
    title: 'Base Title',
    excerpt: 'Base Excerpt',
    metadata_json: {
      seo_title: 'Metadata SEO Title',
      meta_description: 'Metadata Meta Description',
      primary_keyword: 'Metadata Primary',
      secondary_keywords: ['Metadata Secondary 1'],
    },
    blog_details_json: {
      seo: {
        seo_title: 'API V1.1 SEO Title',
        meta_description: 'API V1.1 Meta Description',
        primary_keyword: 'Answer Engine Optimization',
        secondary_keywords: ['AEO', 'GEO', 'Answer Engine Optimization', ''],
      },
    },
  };
  const { metadata, structuredData } = postSeo(customPost);

  // 1. Title & description priority
  assert.equal((metadata.title as { absolute: string }).absolute, 'API V1.1 SEO Title');
  assert.equal(metadata.openGraph?.title, 'API V1.1 SEO Title');
  assert.equal(metadata.twitter?.title, 'API V1.1 SEO Title');
  assert.equal(metadata.description, 'API V1.1 Meta Description');
  assert.equal(metadata.openGraph?.description, 'API V1.1 Meta Description');
  assert.equal(metadata.twitter?.description, 'API V1.1 Meta Description');

  // 2. Keywords extraction (trimmed, deduplicated)
  assert.deepEqual(metadata.keywords, ['Answer Engine Optimization', 'AEO', 'GEO']);

  // 3. Schema.org structured data
  assert.equal(structuredData.headline, 'API V1.1 SEO Title');
  assert.equal(structuredData.description, 'API V1.1 Meta Description');
  assert.equal(structuredData.keywords, 'Answer Engine Optimization, AEO, GEO');
  assert.deepEqual(structuredData.about, { '@type': 'Thing', name: 'Answer Engine Optimization' });
});

test('SEO, AEO and GEO: falls back to metadata_json when blog_details_json is absent', () => {
  const customPost: PostRow = {
    ...post,
    title: 'Fallback Base Title',
    excerpt: 'Fallback Base Excerpt',
    metadata_json: {
      seo_title: 'Metadata Fallback Title',
      meta_description: 'Metadata Fallback Description',
      primary_keyword: 'Generative Engine Optimization',
      secondary_keywords: ['GEO', 'Search'],
    },
    blog_details_json: null,
  };
  const { metadata, structuredData } = postSeo(customPost);

  assert.equal((metadata.title as { absolute: string }).absolute, 'Metadata Fallback Title');
  assert.equal(metadata.description, 'Metadata Fallback Description');
  assert.deepEqual(metadata.keywords, ['Generative Engine Optimization', 'GEO', 'Search']);
  assert.equal(structuredData.headline, 'Metadata Fallback Title');
  assert.equal(structuredData.description, 'Metadata Fallback Description');
  assert.equal(structuredData.keywords, 'Generative Engine Optimization, GEO, Search');
  assert.deepEqual(structuredData.about, { '@type': 'Thing', name: 'Generative Engine Optimization' });
});

test('SEO, AEO and GEO: preserves full backwards compatibility with empty/null SEO fields', () => {
  const legacyPost: PostRow = {
    ...post,
    title: 'Original Legacy Title',
    excerpt: 'Original Legacy Excerpt',
    metadata_json: {},
    blog_details_json: null,
  };
  const { metadata, structuredData } = postSeo(legacyPost);

  assert.equal((metadata.title as { absolute: string }).absolute, 'Original Legacy Title');
  assert.equal(metadata.description, 'Original Legacy Excerpt');
  assert.equal(metadata.keywords, undefined);
  assert.equal(structuredData.headline, 'Original Legacy Title');
  assert.equal(structuredData.description, 'Original Legacy Excerpt');
  assert.equal(structuredData.keywords, undefined);
  assert.equal(structuredData.about, undefined);
});
