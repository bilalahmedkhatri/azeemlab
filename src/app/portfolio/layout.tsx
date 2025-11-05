import { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';

export const metadata: Metadata = {
  title: pageMetadata.portfolio.title,
  description: pageMetadata.portfolio.description,
  keywords: pageMetadata.portfolio.keywords,
  openGraph: {
    title: pageMetadata.portfolio.title,
    description: pageMetadata.portfolio.description,
    type: 'website',
    url: '/portfolio',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.portfolio.title,
    description: pageMetadata.portfolio.description,
    images: ['/og-image.png'],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
