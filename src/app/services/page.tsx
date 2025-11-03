"use client";

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { services } from '@/lib/data';
import { ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { CTASection } from '@/components/sections/CTASection';

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden bg-neutral-light py-24 md:py-32"
      >
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-neutral-dark mb-6">
            Our Digital Expertise
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            We build beautiful, effective, and scalable digital solutions that drive growth and deliver tangible results for your business.
          </p>
        </div>
        <div className="absolute -bottom-1/2 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent"></div>
      </motion.section>

      {/* Services Sections */}
      <section className="py-20">
        <div className="container mx-auto px-6 space-y-24">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isReversed = index % 2 !== 0;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center`}
              >
                <div className={`md:order-${isReversed ? '2' : '1'}`}>
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                     <div className="absolute inset-0 bg-primary/10 rounded-3xl transform -rotate-6 transition-transform group-hover:rotate-0"></div>
                     <div className="absolute inset-0 bg-background border-2 border-border rounded-3xl flex items-center justify-center p-8">
                        <Icon className="w-3/5 h-3/5 text-primary opacity-80" />
                     </div>
                  </div>
                </div>

                <div className={`md:order-${isReversed ? '1' : '2'}`}>
                  <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-4">{service.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6">{service.problem}</p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.process.slice(0, 3).map(step => (
                      <li key={step.title} className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                        <span>
                          <span className="font-semibold">{step.title}:</span> {step.description}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button href={`/services/${service.slug}`} size="lg">
                    Learn More <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </div>
  );
}
