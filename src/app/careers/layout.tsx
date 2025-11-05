import { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';

export const metadata: Metadata = {
  title: pageMetadata.careers.title,
  description: pageMetadata.careers.description,
  keywords: pageMetadata.careers.keywords,
  openGraph: {
    title: pageMetadata.careers.title,
    description: pageMetadata.careers.description,
    type: 'website',
    url: '/careers',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.careers.title,
    description: pageMetadata.careers.description,
    images: ['/og-image.png'],
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
