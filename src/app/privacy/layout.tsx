import { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';

export const metadata: Metadata = {
  title: pageMetadata.privacy.title,
  description: pageMetadata.privacy.description,
  keywords: pageMetadata.privacy.keywords,
  openGraph: {
    title: pageMetadata.privacy.title,
    description: pageMetadata.privacy.description,
    type: 'website',
    url: '/privacy',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.privacy.title,
    description: pageMetadata.privacy.description,
    images: ['/og-image.png'],
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
