'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { caseStudies } from '@/lib/data';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(caseStudies.map(cs => cs.category)))];
  
  const filteredCaseStudies = activeFilter === 'All' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.category === activeFilter);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-light to-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-neutral-dark mb-6">
              Our <span className="text-accent">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-600">
              Real projects. Real results. See how we've helped businesses grow and succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 bg-white sticky top-20 z-10 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeFilter === category
                    ? 'bg-accent text-white'
                    : 'bg-neutral-light text-neutral-dark hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((caseStudy) => (
              <Link key={caseStudy.id} href={`/portfolio/${caseStudy.slug}`}>
                <Card hover className="h-full">
                  <div className="bg-gradient-to-br from-accent to-accent-dark h-48 rounded-lg mb-4"></div>
                  <span className="text-accent text-sm font-semibold">{caseStudy.category}</span>
                  <h2 className="font-heading text-2xl font-bold text-neutral-dark my-3">
                    {caseStudy.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{caseStudy.challenge}</p>
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
                    {caseStudy.results.slice(0, 3).map((result, index) => (
                      <div key={index} className="text-center">
                        <div className="text-lg font-bold text-accent">{result.value}</div>
                        <div className="text-xs text-gray-500">{result.metric}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-dark mb-6">
              Want Results Like These?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how we can help you achieve similar success.
            </p>
            <Button href="/contact" size="lg">
              Start Your Project
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
