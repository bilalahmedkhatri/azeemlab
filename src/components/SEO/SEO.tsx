import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://azeemlab.com';
const siteName = 'Azeem Lab';
const twitterHandle = '@AzeemLab';

interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  keywords?: string[];
}

export function generateSEOMetadata({
  title,
  description,
  canonical,
  ogImage = '/og-image.png',
  ogType = 'website',
  noindex = false,
  keywords = [
    'web design',
    'web development',
    'digital agency',
    'UI/UX design',
    'branding',
    'e-commerce',
    'custom software',
  ],
}: SEOConfig): Metadata {
  const fullTitle = `${title} | ${siteName}`;
  const canonicalUrl = canonical || siteUrl;
  const imageUrl = ogImage.startsWith('http') ? ogImage : `${siteUrl}${ogImage}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
      },
    },
    openGraph: {
      type: ogType,
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: twitterHandle,
      creator: twitterHandle,
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
