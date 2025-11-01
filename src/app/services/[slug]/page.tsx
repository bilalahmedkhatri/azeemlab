import React from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { services } from '@/lib/data';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-light to-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl mb-6 text-center">{service.icon}</div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-neutral-dark mb-6 text-center">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 text-center mb-8">
              {service.description}
            </p>
            <div className="flex justify-center">
              <Button href="/contact" size="lg">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <Card>
                <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-4">
                  The Challenge
                </h2>
                <p className="text-gray-600">{service.problem}</p>
              </Card>
              <Card className="bg-accent text-white">
                <h2 className="font-heading text-2xl font-bold mb-4">
                  Our Solution
                </h2>
                <p className="opacity-90">{service.solution}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-12 text-center">
              Our Process
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-neutral-dark mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing (if available) */}
      {service.pricing && service.pricing.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-12 text-center">
                Pricing Options
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {service.pricing.map((tier, index) => (
                  <Card
                    key={index}
                    className={tier.highlighted ? 'border-4 border-accent' : ''}
                  >
                    {tier.highlighted && (
                      <div className="bg-accent text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
                        Most Popular
                      </div>
                    )}
                    <h3 className="font-heading text-2xl font-bold text-neutral-dark mb-2">
                      {tier.name}
                    </h3>
                    <div className="text-4xl font-bold text-accent mb-6">{tier.price}</div>
                    <ul className="space-y-3 mb-8">
                      {tier.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2">
                          <span className="text-accent mt-1">✓</span>
                          <span className="text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      href="/contact"
                      variant={tier.highlighted ? 'primary' : 'outline'}
                      className="w-full"
                    >
                      Get Quote
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent to-accent-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss your project and how we can help you achieve your goals.
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
