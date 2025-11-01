import React from 'react';
import { Button } from '../ui/Button';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-neutral-light to-white py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-neutral-dark mb-6">
            Digital Growth, <span className="text-accent">Simplified</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            We help businesses thrive online with expert web design, branding, and digital marketing that drives real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" size="lg">
              Start Your Project
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              View Our Work
            </Button>
          </div>
          
          {/* Social Proof */}
          <div className="mt-16">
            <p className="text-sm text-gray-500 mb-6">Trusted by leading brands</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">TechStart</div>
              <div className="text-2xl font-bold text-gray-400">GreenLife</div>
              <div className="text-2xl font-bold text-gray-400">Anderson & Associates</div>
              <div className="text-2xl font-bold text-gray-400">InnovateCo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
