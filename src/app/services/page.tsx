import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { services, caseStudies } from '@/lib/data';

export default function ServicesPage() {
  // Map services to related case studies
  const serviceWithCaseStudy = (serviceSlug: string) => {
    const mapping: Record<string, string> = {
      'branding': 'techstart-rebrand',
      'ecommerce': 'greenlife-ecommerce',
      'seo': 'lawfirm-seo',
    };
    return caseStudies.find(cs => cs.slug === mapping[serviceSlug]);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-light to-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-neutral-dark mb-6">
              Services That Drive <span className="text-accent">Real Results</span>
            </h1>
            <p className="text-xl text-gray-600">
              Transform your business with proven strategies that increase revenue, build brand authority, and create lasting customer relationships
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service) => {
              const relatedCase = serviceWithCaseStudy(service.slug);
              
              return (
                <Card key={service.id} hover className="flex flex-col">
                  <div className="text-5xl mb-4">{service.icon}</div>
                  <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-3">
                    {service.title}
                  </h2>
                  
                  {/* Benefit-Focused Description */}
                  <p className="text-lg text-gray-700 mb-4 font-medium">{service.description}</p>
                  
                  {/* Solution Statement */}
                  <div className="bg-accent bg-opacity-5 rounded-lg p-4 mb-4">
                    <p className="text-sm text-gray-600">
                      <strong className="text-accent">Result You&apos;ll Get:</strong> {service.solution}
                    </p>
                  </div>

                  {/* Related Case Study Link */}
                  {relatedCase && (
                    <div className="mb-4 text-sm">
                      <Link 
                        href={`/portfolio/${relatedCase.slug}`}
                        className="text-accent hover:text-accent-dark transition-colors inline-flex items-center gap-1"
                      >
                        <span>📊</span>
                        <span>See {relatedCase.client} Success Story</span>
                      </Link>
                    </div>
                  )}

                  <div className="mt-auto pt-4">
                    <Button 
                      href={`/services/${service.slug}`} 
                      variant="primary"
                      className="w-full"
                    >
                      Get Started with {service.title.split(' ')[0]} →
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent to-accent-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              Not Sure Which Service Fits Your Needs?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Book a free 30-minute strategy call. We&apos;ll analyze your situation and recommend the exact solution to achieve your goals.
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Schedule Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
