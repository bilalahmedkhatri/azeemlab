import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://testweb.com';
  
  const staticRoutes = [
    '',
    '/services',
    '/services/web-design-development',
    '/services/ui-ux-design',
    '/services/branding-identity',
    '/services/ecommerce-solutions',
    '/portfolio',
    '/portfolio/techcorp-redesign',
    '/portfolio/ecommerce-platform',
    '/portfolio/saas-dashboard',
    '/process',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route.includes('portfolio') || route.includes('services') ? 0.8 : 0.5,
  }));

  return staticRoutes;
}
