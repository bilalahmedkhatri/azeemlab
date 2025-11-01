import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { services } from '@/lib/data';

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-light to-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-neutral-dark mb-6">
              Our <span className="text-accent">Services</span>
            </h1>
            <p className="text-xl text-gray-600">
              Comprehensive digital solutions designed to help your business grow and succeed online
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {services.map((service) => (
              <Card key={service.id} hover>
                <div className="text-4xl mb-4">{service.icon}</div>
                <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-3">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <p className="text-sm text-gray-500 mb-6">
                  <strong>Problem:</strong> {service.problem}
                </p>
                <Button href={`/services/${service.slug}`} variant="outline">
                  Learn More
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-neutral-dark mb-6">
              Not sure which service you need?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Let's chat about your goals and we'll recommend the best solution for your business.
            </p>
            <Button href="/contact" size="lg">
              Get Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
