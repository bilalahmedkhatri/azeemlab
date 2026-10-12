import ServicesClient from './ServicesClient';
import { pageMetadata } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: pageMetadata.services.title,
  description: pageMetadata.services.description,
  keywords: pageMetadata.services.keywords,
};

export default function ServicesPage() {
  return <ServicesClient />;
}
