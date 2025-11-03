import { Metadata } from 'next';
import PricingClientPage from '@/components/pricing/PricingClientPage';

export const metadata: Metadata = {
  title: 'Pricing Plans',
  description: 'Explore our detailed pricing plans, from starter websites to full-stack enterprise applications with advanced AI features. Find the perfect fit for your business.',
  alternates: {
    canonical: '/pricing',
  },
};

export default function PricingPage() {
  return <PricingClientPage />;
}
