import React from 'react';
import { Button } from '../ui/Button';

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-accent to-accent-dark text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how we can help you achieve your digital goals. Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/contact" variant="secondary" size="lg">
              Start Your Project
            </Button>
            <Button href="/portfolio" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-accent">
              View Portfolio
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
