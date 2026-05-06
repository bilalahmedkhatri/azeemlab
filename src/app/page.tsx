import { Metadata } from 'next';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { CompaniesSection } from '@/components/sections/CompaniesSection';

// Lazy load heavy components below the fold with individual Suspense boundaries
const PortfolioSection = dynamic(() => import('@/components/sections/PortfolioSection').then(mod => ({ default: mod.PortfolioSection })), {
  loading: () => <div className="min-h-[400px] bg-background" />,
  ssr: true,
});


const AboutSection = dynamic(() => import('@/components/sections/AboutSection').then(mod => ({ default: mod.AboutSection })), {
  loading: () => <div className="min-h-[400px] bg-background" />,
  ssr: true,
});

const CTASection = dynamic(() => import('@/components/sections/CTASection').then(mod => ({ default: mod.CTASection })), {
  loading: () => <div className="min-h-[200px] bg-background" />,
  ssr: true,
});

export const metadata: Metadata = {
  title: 'AzeemLab | Premium Web Design & Digital Growth Solutions',
  description: 'AzeemLab transforms businesses with high-converting web design, strategic branding, and data-driven SEO solutions. Start your digital journey today.',
};

export default function Home() {
  return (
    <>
      {/* Critical above-the-fold content - render immediately */}
      <HeroSection />
      <CompaniesSection />
      <StatsSection />
      <ServicesSection />
      
      {/* Below-the-fold content - lazy loaded individually */}
      <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
        <PortfolioSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[400px] bg-background" />}>
        <AboutSection />
      </Suspense>
      
      <Suspense fallback={<div className="min-h-[200px] bg-background" />}>
        <CTASection />
      </Suspense>
    </>
  );
}
