import React from 'react';
import Link from 'next/link';
import { Card } from '../ui/Card';
import { services } from '@/lib/data';

export const ServicesSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
            What We Do Best
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive digital solutions tailored to your business goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Link key={service.id} href={`/services/${service.slug}`}>
              <Card hover className="h-full text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="font-heading text-xl font-bold text-neutral-dark mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
