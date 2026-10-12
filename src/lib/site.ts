import type { Metadata } from 'next';

// Keep canonical URLs, structured data and crawl discovery on one origin.
export const siteUrl = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.azeemlab.com').origin;
export const absoluteUrl = (path: string) => new URL(path, `${siteUrl}/`).href;

export function createPageMetadata(path: string, title: string, description: string, image = '/og-image.png'): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: 'AzeemLab', type: 'website', images: [image] },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}

export const serviceSearchCopy: Record<string, { title: string; description: string }> = {
  'web-design': { title: 'Responsive Web Design & Development | AzeemLab', description: 'Custom responsive websites for small businesses and growing teams. Explore our work, discuss your goals, and plan your website with AzeemLab.' },
  branding: { title: 'Brand Identity & Logo Design Services | AzeemLab', description: 'Build a consistent brand with logo design, visual identity and brand guidelines. Discuss your audience and creative direction with AzeemLab.' },
  seo: { title: 'Technical SEO & Digital Marketing Services | AzeemLab', description: 'Technical SEO, on-page improvements and digital marketing built around your business. Talk to AzeemLab about search visibility and qualified enquiries.' },
  ecommerce: { title: 'E-commerce Website Development | AzeemLab', description: 'Custom online stores with responsive design, product discovery and payment integrations. Plan your e-commerce website with AzeemLab.' },
  'ai-integrations': { title: 'AI Chatbot Development & Website Integration | AzeemLab', description: 'Integrate AI chatbots, knowledge search and business tools into your website. Scope a practical AI integration with AzeemLab for your team and customers.' },
  'ai-automation': { title: 'AI Workflow Automation for Business | AzeemLab', description: 'Connect your business tools and reduce repetitive work with custom AI workflow automation. Discuss lead management, document processing and integrations.' },
};
