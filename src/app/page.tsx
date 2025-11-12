import { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { JSONLD } from '@/components/SEO/JSONLD';
import { servicesSchema } from '@/lib/schema';
import { StatsSection } from '@/components/sections/StatsSection';
import { CompaniesSection } from '@/components/sections/CompaniesSection';
import LoadingAnimation from '@/components/ui/LoadingAnimation';

// Lazy load heavy components below the fold
const PortfolioSection = dynamic(() => import('@/components/sections/PortfolioSection').then(mod => ({ default: mod.PortfolioSection })), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-muted/20" />,
  ssr: true,
});

const PricingSection = dynamic(() => import('@/components/sections/PricingSection').then(mod => ({ default: mod.PricingSection })), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-muted/20" />,
  ssr: true,
});

const AboutSection = dynamic(() => import('@/components/sections/AboutSection').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="min-h-[400px] animate-pulse bg-muted/20" />,
  ssr: true,
});

const CTASection = dynamic(() => import('@/components/sections/CTASection').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="min-h-[200px] animate-pulse bg-muted/20" />,
  ssr: true,
});

export const metadata: Metadata = {
  title: 'Home',
  // ... existing metadata ...
};

// Async component with delay to trigger loading
async function DelayedContent() {
  return (
    <>
      <HeroSection />
      <CompaniesSection />
      <StatsSection />
      <ServicesSection />
      <PortfolioSection />
      <PricingSection />
      <AboutSection />
      <CTASection />
    </>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<LoadingAnimation />}>
      <DelayedContent />
    </Suspense>
  );
}
