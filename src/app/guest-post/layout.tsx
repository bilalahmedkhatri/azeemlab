import { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: '/guest-post' },
  title: { absolute: pageMetadata.guestPost.title },
  description: pageMetadata.guestPost.description,
  keywords: pageMetadata.guestPost.keywords,
  openGraph: {
    title: pageMetadata.guestPost.title,
    description: pageMetadata.guestPost.description,
    type: 'website',
    url: '/guest-post',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: pageMetadata.guestPost.title,
    description: pageMetadata.guestPost.description,
    images: ['/og-image.png'],
  },
};

export default function GuestPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
