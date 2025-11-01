import React from 'react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-light to-white flex items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="font-heading text-9xl font-bold text-accent mb-4">404</h1>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary" size="lg">
            Go Home
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            Contact Us
          </Button>
        </div>

        <div className="mt-12 pt-12 border-t border-gray-200">
          <p className="text-gray-600 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap gap-4 justify-center text-sm">
            <a href="/services" className="text-accent hover:text-accent-dark transition-colors">
              Our Services
            </a>
            <span className="text-gray-300">•</span>
            <a href="/portfolio" className="text-accent hover:text-accent-dark transition-colors">
              Portfolio
            </a>
            <span className="text-gray-300">•</span>
            <a href="/about" className="text-accent hover:text-accent-dark transition-colors">
              About Us
            </a>
            <span className="text-gray-300">•</span>
            <a href="/contact" className="text-accent hover:text-accent-dark transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
