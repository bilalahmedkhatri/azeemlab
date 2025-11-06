import { Metadata } from 'next';
import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { CTASection } from '@/components/sections/CTASection';
import { JSONLD } from '@/components/SEO/JSONLD';
import { servicesSchema } from '@/lib/schema';
import { StatsSection } from '@/components/sections/StatsSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { CompaniesSection } from '@/components/sections/CompaniesSection';
import LoadingAnimation from '@/components/ui/LoadingAnimation';

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
