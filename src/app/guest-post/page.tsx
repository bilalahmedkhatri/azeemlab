import { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';
import GuestPostClientPage from '@/components/guest-post/GuestPostClientPage';

export const metadata: Metadata = {
  title: pageMetadata.guestPost.title,
  description: pageMetadata.guestPost.description,
  keywords: pageMetadata.guestPost.keywords,
};

export default function GuestPostPage() {
  return <GuestPostClientPage />;
}
