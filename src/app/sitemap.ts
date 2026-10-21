import type { MetadataRoute } from 'next';
import { services, caseStudies, blogPosts } from '@/lib/data';
import { absoluteUrl } from '@/lib/site';
import { agencyVisual, serviceVisuals, articleVisuals } from '@/lib/visuals';
import { locales, localizedPath } from '@/i18n/config';
import { languageAlternates } from '@/i18n/urls';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/', '/about', '/services', '/portfolio', '/blog', '/careers', '/process', '/partners', '/contact', '/privacy', '/terms', '/pricing/plan_detail/business',
    ...services.map(service => `/services/${service.slug}`),
    ...services.flatMap(service => (service.locationPages || []).map(location => `/services/${service.slug}/${location.slug}`)),
    ...caseStudies.map(project => `/portfolio/${project.slug}`),
    ...blogPosts.map(post => `/blog/${post.slug}`),
  ];
  // Do not invent modification dates for pages with no maintained revision date.
  const localizedEntries = [...new Set(paths)].flatMap(path => locales.map(locale => {
    const slug = path.split('/').pop() || '';
    const image = path === '/' ? agencyVisual.src
      : path.startsWith('/blog/') ? articleVisuals[slug]?.src
      : /^\/services\/[^/]+$/.test(path) ? serviceVisuals[slug]?.src
      : path.startsWith('/portfolio/') ? caseStudies.find(project => project.slug === slug)?.heroImage
      : undefined;
    return { url: absoluteUrl(localizedPath(locale, path)), alternates: { languages: languageAlternates(path) }, ...(image ? { images: [absoluteUrl(image)] } : {}) };
  }));
  return localizedEntries;
}
