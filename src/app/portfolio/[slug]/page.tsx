import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { caseStudies } from '@/lib/data';
import { ExternalLink } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);

  if (!caseStudy) return { title: 'Project Not Found' };

  return {
    title: `${caseStudy.title} | AzeemLab Case Study`,
    description: caseStudy.challenge.substring(0, 160),
    openGraph: {
      title: `${caseStudy.title} | AzeemLab Case Study`,
      description: caseStudy.challenge.substring(0, 160),
      images: [caseStudy.heroImage],
    },
  };
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
            
            {/* Hero Image - Clickable if website URL exists */}
            <div className="relative h-[32rem] md:h-[36rem] lg:h-[40rem] rounded-xl overflow-hidden group">
              {caseStudy.heroImage ? (
                <>
                  <Image
                    src={caseStudy.heroImage}
                    alt={caseStudy.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay with website link if available */}
                  {caseStudy.client && caseStudy.client.includes('.') && (
                    <a
                      href={`https://${caseStudy.client.replace(/^https?:\/\//, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <div className="bg-white text-accent px-6 py-3 rounded-full font-semibold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <ExternalLink className="w-5 h-5" />
                        Visit Website
                      </div>
                    </a>
                  )}
                </>
              ) : (
                <div className="bg-gradient-to-br from-accent to-accent-dark h-full rounded-xl"></div>
              )}
            </div>
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
      <section className="py-20 bg-gradient-to-br from-accent to-accent-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Want Results Like {caseStudy.client}?
            </h2>
            <p className="text-xl mb-2 opacity-90">
              They achieved <strong className="font-bold">{caseStudy.results[0].value} {caseStudy.results[0].description.toLowerCase()}</strong>
            </p>
            <p className="text-lg mb-8 opacity-80">
              Let&apos;s create a custom strategy to deliver similar breakthrough results for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" variant="secondary" size="lg">
                Schedule Strategy Call →
              </Button>
              <Button href="/services" variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-accent">
                View Our Services
              </Button>
            </div>
            <div className="mt-8 pt-6 border-t border-white border-opacity-20">
              <p className="text-sm opacity-75">
                ✓ Free 30-minute consultation &nbsp; • &nbsp; ✓ Custom proposal within 48 hours &nbsp; • &nbsp; ✓ No obligation
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
