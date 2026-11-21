import type { Metadata } from 'next';
import { absoluteUrl, createPageMetadata } from '@/lib/site';
import { openGraphLocales } from '@/i18n/config';
import { blogUrl } from './config';
import { postView } from './adapter';
import type { PostRow } from './types';

const resolveText = (candidates: unknown[], fallback: string, maximum: number): string => {
  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return candidate.trim().slice(0, maximum);
    }
  }
  return fallback.trim().slice(0, maximum);
};

export function postSeo(post: PostRow) {
  const view = postView(post);
  const stored = post.metadata_json || {};
  const blogDetailsSeo = post.blog_details_json?.seo;
  const metadataSeo = (stored.seo as Record<string, unknown> | undefined) || {};
  const expected = blogUrl(post.locale, post.slug);
  let canonical = expected;
  try {
    const url = new URL(String(stored.canonical_url));
    // Only the exact configured route for this published post is acceptable.
    if (url.href === expected && !url.username && !url.password) canonical = url.href;
  } catch { /* Regenerate missing or invalid canonical from app configuration. */ }

  // 1. Title & Description Fallback Hierarchy
  const title = resolveText(
    [
      blogDetailsSeo?.seo_title,
      stored.seo_title,
      metadataSeo.seo_title,
      stored.title,
    ],
    post.title,
    300
  );

  const description = resolveText(
    [
      blogDetailsSeo?.meta_description,
      stored.meta_description,
      metadataSeo.meta_description,
      stored.description,
    ],
    post.excerpt,
    320
  );

  // 2. Meta Keywords Tag
  const primaryCandidate = blogDetailsSeo?.primary_keyword
    ?? stored.primary_keyword
    ?? metadataSeo.primary_keyword;
  const primaryKeyword = typeof primaryCandidate === 'string' && primaryCandidate.trim()
    ? primaryCandidate.trim()
    : undefined;

  const secondaryCandidate = blogDetailsSeo?.secondary_keywords
    ?? stored.secondary_keywords
    ?? metadataSeo.secondary_keywords;
  const secondaryList = Array.isArray(secondaryCandidate)
    ? secondaryCandidate
    : typeof secondaryCandidate === 'string'
      ? secondaryCandidate.split(',')
      : [];

  const keywordsList: string[] = [];
  if (primaryKeyword) {
    keywordsList.push(primaryKeyword);
  }
  for (const item of secondaryList) {
    if (typeof item === 'string') {
      const trimmed = item.trim();
      if (trimmed && !keywordsList.includes(trimmed)) {
        keywordsList.push(trimmed);
      }
    }
  }

  // Use the public original, never the Next image optimizer URL. Social
  // crawlers must be able to fetch this image without cookies or JavaScript.
  const image = view.visual?.src || absoluteUrl('/og-image.png');
  const socialImage = view.visual ? {
    url: image, secureUrl: image, alt: view.visual.alt,
    ...(post.cover?.width ? { width: post.cover.width } : {}),
    ...(post.cover?.height ? { height: post.cover.height } : {}),
    ...(post.cover?.media_type ? { type: post.cover.media_type } : {}),
  } : { url: image, secureUrl: image, alt: 'AzeemLab' };

  const metadata: Metadata = {
    ...createPageMetadata(canonical, title, description, image),
    alternates: { canonical, languages: { [post.locale]: canonical } },
    authors: [{ name: post.author_name }],
    robots: { index: true, follow: true },
    ...(keywordsList.length ? { keywords: keywordsList } : {}),
    openGraph: {
      type: 'article', siteName: 'AzeemLab', url: canonical, title, description,
      locale: openGraphLocales[post.locale as keyof typeof openGraphLocales],
      publishedTime: view.publishDate, modifiedTime: view.modifiedDate,
      authors: [post.author_name], ...(post.category_name ? { section: post.category_name } : {}),
      images: [socialImage],
    },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: image, alt: view.visual?.alt || 'AzeemLab' }] },
  };

  const structuredData: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${canonical}#article`,
    headline: title,
    description,
    inLanguage: post.locale,
    mainEntityOfPage: canonical,
    datePublished: view.publishDate,
    dateModified: view.modifiedDate,
    author: {
      '@type': 'Person',
      name: post.author_name,
      ...(post.author_designation ? { jobTitle: post.author_designation } : {}),
      ...(view.avatar ? { image: view.avatar } : {}),
    },
    image: [image],
    ...(keywordsList.length ? { keywords: keywordsList.join(', ') } : {}),
    ...(primaryKeyword ? { about: { '@type': 'Thing', name: primaryKeyword } } : {}),
  };

  return { metadata, structuredData };
}
