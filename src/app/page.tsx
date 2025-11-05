import { Metadata } from 'next';
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

export const metadata: Metadata = {
  title: 'Home',
  // ... existing metadata ...
};

// Simulate loading delay (for testing loading animation)
async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default async function Home() {
  // Add 3 second delay to see loading animation
  await delay(3000);
  
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
