import { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';

export const metadata: Metadata = {
  title: pageMetadata.process.title,
  description: pageMetadata.process.description,
  keywords: pageMetadata.process.keywords,
  openGraph: {
    title: pageMetadata.process.title,
    description: pageMetadata.process.description,
    type: 'website',
    url: '/process',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.process.title,
    description: pageMetadata.process.description,
    images: ['/og-image.png'],
  },
};

export default function ProcessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
