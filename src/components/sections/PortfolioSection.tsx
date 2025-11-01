import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { caseStudies } from '@/lib/data';

export const PortfolioSection: React.FC = () => {
  const featuredCase = caseStudies[0];

  return (
    <section className="py-20 bg-neutral-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real projects, real impact. See how we've helped businesses grow.
          </p>
        </div>

        {/* Featured Case Study */}
        <Card className="max-w-4xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="bg-gradient-to-br from-accent to-accent-dark h-64 rounded-lg mb-4"></div>
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-accent font-semibold text-sm mb-2">{featuredCase.category}</span>
              <h3 className="font-heading text-3xl font-bold text-neutral-dark mb-4">
                {featuredCase.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {featuredCase.challenge}
              </p>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {featuredCase.results.map((result, index) => (
                  <div key={index}>
                    <div className="text-2xl font-bold text-accent">{result.value}</div>
                    <div className="text-sm text-gray-600">{result.metric}</div>
                  </div>
                ))}
              </div>
              <Button href={`/portfolio/${featuredCase.slug}`} variant="outline">
                View Case Study
              </Button>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <Button href="/portfolio" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};
