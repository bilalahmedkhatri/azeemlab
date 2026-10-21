import { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';
import PartnersClientPage from '@/components/partners/PartnersClientPage';

export const metadata: Metadata = {
  title: pageMetadata.partners.title,
  description: pageMetadata.partners.description,
  keywords: pageMetadata.partners.keywords,
};

export default function PartnersPage() {
  return <PartnersClientPage />;
}
