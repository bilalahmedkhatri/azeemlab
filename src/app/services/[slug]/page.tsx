'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { services } from '@/lib/data';
import { Check, Zap, Shield, Smartphone, Code, Sparkles, TrendingUp, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { use } from 'react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ServiceDetailPage({ params }: PageProps) {
  const { slug } = use(params);
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Get the icon component
  const IconComponent = service.icon;

  // Web Design specific features
  const webDesignFeatures = slug === 'web-design' ? [
    {
      icon: Smartphone,
      title: 'Mobile-First Design',
      description: 'Optimized for all devices with responsive layouts that adapt seamlessly'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with 90+ Lighthouse scores for speed and SEO'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with security best practices and regular updates'
    },
    {
      icon: Code,
      title: 'Clean Code',
      description: 'Maintainable, scalable code following industry standards'
    },
    {
      icon: Sparkles,
      title: 'Modern UI/UX',
      description: 'Beautiful interfaces with smooth animations and micro-interactions'
    },
    {
      icon: TrendingUp,
      title: 'Conversion Focused',
      description: 'Strategic design elements that guide users to take action'
    }
  ] : [];

  const webDesignTechnologies = slug === 'web-design' ? [
    { name: 'Next.js', logo: '⚡' },
    { name: 'React', logo: '⚛️' },
    { name: 'Tailwind CSS', logo: '🎨' },
    { name: 'TypeScript', logo: '📘' },
    { name: 'Framer Motion', logo: '🎭' },
    { name: 'Vercel', logo: '▲' }
  ] : [];

  const webDesignBenefits = slug === 'web-design' ? [
    'Increase user engagement by up to 160%',
    'Reduce bounce rates significantly',
    'Improve SEO rankings and organic traffic',
    'Faster page load times (under 2 seconds)',
    'Better mobile experience',
    'Higher conversion rates',
    'Professional brand perception',
    'Scalable for future growth'
  ] : [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-light to-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-6xl mb-6 text-center text-accent">
              <IconComponent className="w-16 h-16 mx-auto" />
            </div>
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
                <h2 className="font-heading text-2xl font-bold text-neutral-dark mb-4">
                  Our Solution
                </h2>
                <p className="text-gray-600">{service.solution}</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features - Web Design Specific */}
      {slug === 'web-design' && (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-4">
                  Why Choose Our Web Design Services?
                </h2>
                <p className="text-xl text-gray-600">
                  We combine creativity with cutting-edge technology to deliver exceptional results
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {webDesignFeatures.map((feature, index) => (
                  <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                    <feature.icon className="w-12 h-12 text-accent mb-4" />
                    <h3 className="font-heading text-xl font-bold text-neutral-dark mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Benefits - Web Design Specific */}
      {slug === 'web-design' && (
        <section className="py-20 bg-neutral-light">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-12 text-center">
                What You'll Get
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {webDesignBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <Check className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
