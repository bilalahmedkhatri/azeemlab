import { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  keywords: pageMetadata.about.keywords,
  openGraph: {
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
    type: 'website',
    url: '/about-us',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.about.title,
    description: pageMetadata.about.description,
    images: ['/og-image.png'],
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
