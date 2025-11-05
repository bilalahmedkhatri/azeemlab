import { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';

export const metadata: Metadata = {
  title: pageMetadata.terms.title,
  description: pageMetadata.terms.description,
  keywords: pageMetadata.terms.keywords,
  openGraph: {
    title: pageMetadata.terms.title,
    description: pageMetadata.terms.description,
    type: 'website',
    url: '/terms',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.terms.title,
    description: pageMetadata.terms.description,
    images: ['/og-image.png'],
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
