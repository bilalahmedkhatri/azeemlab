// Application adapter: keep routes, locales and deployment settings out of queries/rendering.
import { isLocale, locales, localizedPath } from '@/i18n/config';
import { siteUrl } from '@/lib/site';
import { blogPosts } from '@/lib/data';

export const blogConfig = {
  origin: siteUrl,
  locales: locales as readonly string[],
  routeBase: (locale: string) => {
    if (!isLocale(locale)) throw new Error('Unsupported blog locale.');
    return localizedPath(locale, '/blog');
  },
  pageSize: 12,
  maxPageSize: 48,
  maxPage: 10000,
};
// Database URLs only: existing static slugs keep ownership of the shorter URL.
export const blogPath = (locale: string, slug?: string) => blogConfig.routeBase(locale) + (slug ? `${blogPosts.some(post => post.slug === slug) ? '/posts' : ''}/${encodeURIComponent(slug)}` : '');
export const blogUrl = (locale: string, slug?: string) => new URL(blogPath(locale, slug), blogConfig.origin).href;

// Exact HTTPS origins only, e.g. https://f005.backblazeb2.com (no wildcard hosts).
export function mediaOrigins(): string[] {
  return (process.env.BLOG_MEDIA_ORIGINS || '').split(',').map(value => value.trim()).filter(Boolean).map(value => {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) throw new Error('Invalid blog media configuration.');
    return url.origin;
  });
}
