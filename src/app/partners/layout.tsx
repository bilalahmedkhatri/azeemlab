import { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/partners' },
  title: { absolute: pageMetadata.partners.title },
  description: pageMetadata.partners.description,
  keywords: pageMetadata.partners.keywords,
  openGraph: {
    title: pageMetadata.partners.title,
    description: pageMetadata.partners.description,
    type: 'website',
    url: '/partners',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.partners.title,
    description: pageMetadata.partners.description,
    images: ['/og-image.png'],
  },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
