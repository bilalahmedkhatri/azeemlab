import PortfolioClient from './PortfolioClient';
import { pageMetadata } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: pageMetadata.portfolio.title,
  description: pageMetadata.portfolio.description,
  keywords: pageMetadata.portfolio.keywords,
};

export default function PortfolioPage() {
  return <PortfolioClient />;
}
