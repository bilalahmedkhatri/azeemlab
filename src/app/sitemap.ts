import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://azeemlab.vercel.app';
  
  const staticRoutes = [
    '',
    '/about-us',
    '/services',
    '/services/web-design',
    '/services/branding',
    '/services/seo',
    '/services/ecommerce',
    '/portfolio',
    '/portfolio/quantumleap-ai-platform',
    '/portfolio/greenlife-ecommerce',
    '/portfolio/ai-letter-generator',
    '/portfolio/blog-platform',
    '/portfolio/linkedin-automation-bot',
    '/careers',
    '/process',
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
