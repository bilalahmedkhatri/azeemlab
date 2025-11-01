import { Metadata } from 'next';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { CTASection } from '@/components/sections/CTASection';
import { JSONLD } from '@/components/SEO/JSONLD';
import { servicesSchema } from '@/lib/schema';
import { StatsSection } from '@/components/sections/StatsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Transform your vision into powerful digital solutions with custom web design, development, and branding services. 50+ successful projects delivered.',
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <>
      <JSONLD data={{
        '@context': 'https://schema.org',
        '@graph': servicesSchema,
      }} />
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <AboutSection />
      <CTASection />

    </>
  );
}
