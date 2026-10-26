import test from 'node:test';
import assert from 'node:assert/strict';
import { blogPosts } from '../src/lib/data';
import { locales, localizedPath } from '../src/i18n/config';
import { articleContent } from '../src/lib/search-content';
import { articleVisuals } from '../src/lib/visuals';
import { blogPath, blogUrl } from '../src/lib/blog/config';
import { postSeo } from '../src/lib/blog/seo';
import type { PostRow } from '../src/lib/blog/types';

test('all indexed static articles retain their content and have distinct collision-safe DB URLs', () => {
  assert.equal(blogPosts.length, 9);
  for (const post of blogPosts) {
    assert.ok(articleContent[post.slug]?.sections.length >= 4, post.slug);
    assert.ok(articleVisuals[post.slug]?.src, post.slug);
    for (const locale of locales) {
      const original = localizedPath(locale, `/blog/${post.slug}`);
      assert.equal(original, `/${locale}/blog/${post.slug}`);
      assert.equal(blogPath(locale, post.slug), `/${locale}/blog/posts/${post.slug}`);
      assert.notEqual(blogPath(locale, post.slug), original);
    }
  }
  assert.equal(blogPath('en', 'ai-automation-for-business-workflows-agents-roi'), '/en/blog/ai-automation-for-business-workflows-agents-roi');
});

test('a colliding database post uses its own canonical, share and discovery URL', () => {
  const post: PostRow = { id: 1, locale: 'en', title: 'A separate DB article', slug: blogPosts[0].slug, excerpt: 'New content', content_schema_version: 1, metadata_json: { canonical_url: `https://www.azeemlab.com/en/blog/${blogPosts[0].slug}` }, author_name: 'Author', author_designation: null, author_avatar_url: null, published_at: new Date('2026-10-26'), updated_at: new Date('2026-10-26'), category_name: null, category_slug: null, cover: null };
  const { metadata } = postSeo(post);
  assert.equal(metadata.alternates?.canonical, blogUrl('en', post.slug));
  assert.equal(metadata.openGraph?.url, blogUrl('en', post.slug));
  assert.ok(blogUrl('en', post.slug).includes('/blog/posts/'));
});
