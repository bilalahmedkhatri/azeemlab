import { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';

export const metadata: Metadata = {
  title: pageMetadata.pricing.title,
  description: pageMetadata.pricing.description,
  keywords: pageMetadata.pricing.keywords,
  openGraph: {
    title: pageMetadata.pricing.title,
    description: pageMetadata.pricing.description,
    type: 'website',
    url: '/pricing',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.pricing.title,
    description: pageMetadata.pricing.description,
    images: ['/og-image.png'],
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
