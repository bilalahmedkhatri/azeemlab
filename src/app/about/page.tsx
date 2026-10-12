import AboutClient from './AboutClient';
import { pageMetadata } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: pageMetadata.about.title,
  description: pageMetadata.about.description,
  keywords: pageMetadata.about.keywords,
};

export default function AboutPage() {
  return <AboutClient />;
}
