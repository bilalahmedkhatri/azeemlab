import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { services, pageMetadata, caseStudies } from '@/lib/data';
import {
  Check, Zap, Shield, Smartphone, Code, Sparkles, TrendingUp,
  MessageSquare, Code2, LineChart, Brain, Cpu, ArrowRight, MapPin, Globe
} from 'lucide-react';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import Image from 'next/image';
import { createPageMetadata, serviceSearchCopy, absoluteUrl } from '@/lib/site';
import { serviceVisuals } from '@/lib/visuals';
import { ContentVisual } from '@/components/ui/ContentVisual';
import { JSONLD } from '@/components/SEO/JSONLD';
import { serviceContexts } from '@/lib/service-content';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) return { title: 'Service Not Found' };

  const copy = serviceSearchCopy[slug] || { title: `${service.title} | AzeemLab`, description: service.description };
  return createPageMetadata(`/services/${slug}`, copy.title, copy.description, serviceVisuals[slug]?.src);
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const IconComponent = service.icon;
  const context = serviceContexts[slug];

  // Filter related case studies
  const relatedProjects = caseStudies.filter(cs =>
    service.relatedCaseStudies?.includes(cs.slug) ||
    cs.aiTags?.some(tag => service.title.toLowerCase().includes(tag.toLowerCase()))
  );

  // Icon mapping for highlights
  const iconMap: { [key: string]: any } = {
    MessageSquare,
    Zap,
    Code2,
    LineChart,
    Share2: Sparkles,
    Users: TrendingUp,
    Mail: MessageSquare,
    FileText: Code
  };

  return (
    <div className="min-h-screen pt-20">
      <JSONLD id="service-schema" data={{ '@context': 'https://schema.org', '@type': 'Service', '@id': absoluteUrl(`/services/${slug}#service`), image: absoluteUrl(serviceVisuals[slug].src), name: service.title, description: service.description, url: absoluteUrl(`/services/${slug}`), provider: { '@id': absoluteUrl('/#organization') }, areaServed: ['United Kingdom', 'United States', 'Worldwide'] }} />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-light to-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 text-accent">
              <IconComponent className="w-16 h-16 mx-auto" />
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-neutral-dark mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              {service.description}
            </p>
            <div className="flex justify-center gap-4">
              <Button href="/contact" size="lg">
                Get Started
              </Button>
              {service.locationPages && (
                <Button href="#locations" variant="outline" size="lg">
                  Local Services
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 max-w-4xl" aria-label={`${service.title} illustration`}>
        <ContentVisual visual={serviceVisuals[slug]} />
      </section>
      {/* Tech Stack Marquee (NEW) */}
      {service.techStack && (
        <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
          <div className="container mx-auto px-6">
            <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
              Powered by Industry-Leading Technology
            </p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-500">
              {service.techStack.map((tech) => (
                <div key={tech} className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-accent" />
                  <span className="font-bold text-neutral-dark whitespace-nowrap">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights Grid (NEW) */}
      {service.highlights && (
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Service Highlights</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Specialised solutions designed to deliver maximum impact for your business.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {service.highlights.map((item, idx) => {
                const HighlightIcon = iconMap[item.icon] || Sparkles;
                return (
                  <Card key={idx} className="p-8 hover:shadow-xl transition-shadow border-none bg-neutral-light/30">
                    <HighlightIcon className="w-10 h-10 text-accent mb-6" />
                    <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Problem & Solution */}
      <section className="py-24 border-t border-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="p-10 rounded-3xl bg-red-50 border border-red-100">
                <h2 className="font-heading text-2xl font-bold text-red-900 mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-200 flex items-center justify-center text-red-700 text-sm">!</div>
                  The Challenge
                </h2>
                <p className="text-red-800/80 leading-relaxed text-lg">{service.problem}</p>
              </div>
              <div className="p-10 rounded-3xl bg-accent text-white shadow-xl shadow-accent/20">
                <h2 className="font-heading text-2xl font-bold mb-6 flex items-center gap-3">
                  <Check className="w-8 h-8 p-1.5 rounded-full bg-white/20 text-white" />
                  Our Solution
                </h2>
                <p className="text-white/90 leading-relaxed text-lg">{service.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proven Results (Case Study Filter - NEW) */}
      {relatedProjects.length > 0 && (
        <section className="py-24 bg-neutral-light/50 border-y border-gray-100 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Proven Results</h2>
                <p className="text-gray-600 text-lg">
                  Real-world examples of how we've applied our {service.title.toLowerCase()} expertise to drive growth.
                </p>
              </div>
              <Button href="/portfolio" variant="outline" className="border-gray-300 text-neutral-dark hover:bg-neutral-dark hover:text-white">
                View All Case Studies
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {relatedProjects.map((project) => (
                <Link key={project.id} href={`/portfolio/${project.slug}`} className="group relative block aspect-[4/3] rounded-3xl overflow-hidden">
                  <Image
                    src={project.heroImage || '/og-image.png'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-dark via-neutral-dark/20 to-transparent p-8 flex flex-col justify-end">
                    <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2">{project.category}</span>
                    <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                    <div className="flex items-center gap-2 text-white font-semibold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                      Read Case Study <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lead Magnet */}
      {service.leadMagnet && (
        <section className="py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-neutral-light to-white p-12 md:p-16 rounded-[3rem] border border-gray-100 flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-6">{service.leadMagnet.title}</h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {service.leadMagnet.description}
                </p>
                <Button href={`/downloads/${service.leadMagnet.fileName}`} size="lg" className="shadow-lg shadow-accent/20">
                  {service.leadMagnet.ctaText}
                </Button>
              </div>
              <div className="w-full md:w-1/3 aspect-[3/4] bg-neutral-dark rounded-2xl flex items-center justify-center p-8 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                <div className="relative z-10">
                  <IconComponent className="w-16 h-16 text-accent mx-auto mb-4" />
                  <span className="text-white font-bold tracking-widest uppercase text-xs block mb-2">Exclusive Guide</span>
                  <span className="text-white/60 text-sm">2026 EDITION</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Process Section */}
      <section className="py-24 bg-neutral-light/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-dark mb-4">Our {service.title} Process</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              A transparent, results-driven methodology refined over years of delivery.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {service.process.map((step, index) => (
              <div key={index} className="relative p-8 bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-accent/30">
                  {index + 1}
                </div>
                <h3 className="font-heading text-xl font-bold text-neutral-dark mb-4 mt-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Links (NEW) */}
      {service.locationPages && service.locationPages.length > 0 && (
        <section id="locations" className="py-24 border-t border-gray-100">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-12">Available in Your City</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {service.locationPages.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/services/${slug}/${loc.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-gray-200 hover:border-accent hover:text-accent transition-all font-semibold shadow-sm"
                >
                  <MapPin className="w-4 h-4" />
                  {loc.city}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {service.faq && service.faq.length > 0 && (
        <div className="bg-white">
          <FAQSection
            faqs={service.faq}
            title={`${service.title} FAQs`}
            subtitle="Common questions about our services and approach."
          />
        </div>
      )}

      {context && (
        <section className="py-24 bg-neutral-light/40 border-t border-gray-100" aria-labelledby="service-context-title">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="max-w-5xl mb-14">
              <span className="text-xs font-bold tracking-[0.18em] text-gray-500 uppercase">A practical guide</span>
              <h2 id="service-context-title" className="text-3xl md:text-5xl font-bold text-neutral-dark mt-4 mb-6">How {service.title} works for your business</h2>
              <p className="text-lg leading-relaxed text-gray-600">This guide explains the decisions, evidence and handover behind the service. It is written to help you compare scope, ask better questions and choose a useful next step.</p>
            </div>
            <div className="space-y-12">
              {context.sections.map(([heading, text]) => (
                <article key={heading} className="max-w-none border-b border-gray-200 pb-10 last:border-b-0">
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">{heading}</h3>
                  <p className="text-gray-700 leading-[1.9] text-[1.05rem]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
