import React from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { caseStudies } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-light to-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <span className="text-accent font-semibold text-lg">{caseStudy.category}</span>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-neutral-dark my-6">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">Client: {caseStudy.client}</p>
            <div className="bg-gradient-to-br from-accent to-accent-dark h-96 rounded-xl"></div>
          </div>
        </div>
      </section>

      {/* Results Overview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-8 text-center">
              Results Achieved
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {caseStudy.results.map((result, index) => (
                <Card key={index} className="text-center">
                  <div className="text-5xl font-bold text-accent mb-3">{result.value}</div>
                  <h3 className="font-heading text-xl font-bold text-neutral-dark mb-2">
                    {result.metric}
                  </h3>
                  <p className="text-gray-600">{result.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-6">
              The Challenge
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{caseStudy.challenge}</p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl font-bold text-neutral-dark mb-6">
              Our Solution
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">{caseStudy.solution}</p>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {caseStudy.testimonial && (
        <section className="py-20 bg-gradient-to-br from-accent to-accent-dark text-white">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <svg
                className="w-16 h-16 mx-auto mb-6 opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>
              <blockquote className="text-2xl font-medium mb-6 italic">
                "{caseStudy.testimonial.quote}"
              </blockquote>
              <div>
                <div className="font-bold text-lg">{caseStudy.testimonial.author}</div>
                <div className="opacity-90">
                  {caseStudy.testimonial.position}, {caseStudy.testimonial.company}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-dark mb-6">
              Ready for Similar Results?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's discuss how we can help transform your business.
            </p>
            <div className="flex gap-4 justify-center">
              <Button href="/contact" size="lg">
                Start Your Project
              </Button>
              <Button href="/portfolio" variant="outline" size="lg">
                View More Work
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
