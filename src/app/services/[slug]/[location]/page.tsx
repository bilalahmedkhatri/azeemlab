import { ProjectLinks } from '@/components/sections/ProjectLinks';
import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { services } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { FAQSection } from '@/components/sections/FAQSection';
import { CTASection } from '@/components/sections/CTASection';
import { Card } from '@/components/ui/Card';
import { ArrowRight, MapPin, Globe, Shield } from 'lucide-react';
import type { ContentParagraph } from '@/types';

interface PageProps {
  params: Promise<{ slug: string; location: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; location: string }[] = [];
  
  services.forEach(service => {
    if (service.locationPages) {
      service.locationPages.forEach(location => {
        params.push({
          slug: service.slug,
          location: location.slug
        });
      });
    }
  });

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, location: locationSlug } = await params;
  const service = services.find((s) => s.slug === slug);
  const locationData = service?.locationPages?.find((l) => l.slug === locationSlug);

  if (!service || !locationData) return { title: 'Page Not Found' };

  return {
    alternates: { canonical: `/services/${slug}/${locationSlug}` },
    title: { absolute: locationData.metaTitle || `${locationData.headline} | AzeemLab ${locationData.city}` },
    description: locationData.metaDescription || locationData.description,
    openGraph: {
      url: `/services/${slug}/${locationSlug}`,
      title: locationData.metaTitle || locationData.headline,
      description: locationData.metaDescription || locationData.description,
      images: locationData.images?.[0] ? [{ url: locationData.images[0].src }] : [],
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug, location: locationSlug } = await params;
  const service = services.find((s) => s.slug === slug);
  const locationData = service?.locationPages?.find((l) => l.slug === locationSlug);

  if (!service || !locationData) {
    notFound();
  }

  const IconComponent = service.icon;
  const contentParagraphs: ContentParagraph[] = locationData.paragraphs?.length
    ? locationData.paragraphs
    : [
        ...(locationData.description ? [{ id: 'location-description', text: locationData.description }] : []),
        ...(locationData.issues || []).flatMap((issue, index) => [
          { id: `location-issue-heading-${index}`, text: issue.title, isHeading: true, headingLevel: 2 },
          { id: `location-issue-body-${index}`, text: issue.body },
        ]),
      ];

  // JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `AzeemLab ${locationData.city}`,
    "description": locationData.description || locationData.metaDescription,
    "url": `https://azeemlab.com/services/${slug}/${locationSlug}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": locationData.city,
      "addressCountry": slug === 'london' || slug === 'uk' ? 'GB' : 'US'
    },
    "image": locationData.images?.map(img => img.src) || []
  };

  return (
    <main className="min-h-screen pt-20 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-light to-white py-24 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col items-center text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold mb-6">
                <MapPin className="w-4 h-4" />
                <span>Expert {service.title} in {locationData.city}</span>
              </div>
              <h1 className="font-heading text-5xl md:text-7xl font-bold text-neutral-dark mb-8 leading-tight">
                {locationData.headline}
              </h1>
              
              {/* <div className="flex flex-wrap justify-center gap-4">
                <Button href={locationData.cta?.href || "/contact"} size="lg">
                  {locationData.cta?.primary || 'Get a Local Quote'}
                </Button>
                <Button href={`/services/${slug}`} variant="outline" size="lg">
                  Explore Global Services
                </Button>
              </div> */}
            </div>

            {/* Hero Featured Image */}
            {locationData.images?.[0] && (
              <div className="relative h-[400px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl mb-12">
                <Image
                  src={locationData.images[0].src}
                  alt={locationData.images[0].alt}
                  fill
                  className="object-cover"
                  priority
                  loading="eager"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                  <p className="text-white/90 italic">{locationData.images[0].caption}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
            
            {/* Content Column */}
            <div className="lg:w-2/3">
              <div className="prose prose-lg max-w-none prose-headings:font-heading prose-headings:text-neutral-dark prose-p:text-gray-600 prose-strong:text-neutral-dark">
                {contentParagraphs.map((para, index) => (
                  <React.Fragment key={para.id}>
                    {/* Render Paragraph or Heading */}
                    {para.isHeading ? (
                      para.headingLevel === 2 ? (
                        <h2 className="text-3xl md:text-4xl font-bold mt-12 mb-8">{para.text}</h2>
                      ) : (
                        <h3 className="text-2xl md:text-3xl font-bold mt-8 mb-6">{para.text}</h3>
                      )
                    ) : (
                      <div className="mb-8">
                        {para.heading && <h4 className="text-xl font-bold mb-3">{para.heading}</h4>}
                        <p className="leading-relaxed">{para.text}</p>
                      </div>
                    )}

                    {/* Interleave Images */}
                    {locationData.images?.map((img, imgIndex) => {
                      if (img.imageAfterIndex === index) {
                        return (
                          <div key={`img-${para.id}`} className="my-12">
                            <div className="relative h-[350px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg mb-4">
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                className="object-cover"
                                loading="lazy"
                              />
                            </div>
                            <p className="text-sm text-gray-500 italic text-center px-4">{img.caption}</p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Sidebar Column */}
            <aside className="lg:w-1/3">
              <div className="sticky top-32 space-y-8">
                {/* Local Trust Card */}
                <Card className="bg-white text-neutral-dark p-8 border border-gray-200 shadow-xl">
                  <Shield className="w-12 h-12 text-accent mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Why {locationData.city} Trusts AzeemLab</h3>
                  <ul className="space-y-4 text-gray-700">
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      <span>Compliant with {locationData.city === 'London' || locationData.city === 'UK' ? 'UK GDPR' : 'US Privacy Laws'}</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      <span>Available in local {locationData.city === 'New York' ? 'EST' : 'GMT/BST'} time zone</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                      <span>Performance budget and independent checks</span>
                    </li>
                  </ul>
                  <Button href="/contact" className="w-full mt-8" variant="secondary">
                    {locationData.cta?.primary || 'Book Consultation'}
                  </Button>
                </Card>

                {/* Related Links */}
                {locationData.relatedLinks && (
                  <Card className="p-8">
                    <h4 className="text-xl font-bold mb-6">Expert Resources</h4>
                    <ul className="space-y-4">
                      {locationData.relatedLinks.map((link, i) => (
                        <li key={i}>
                          <Link 
                            href={link.href} 
                            className="flex items-center justify-between group text-gray-600 hover:text-accent transition-colors"
                          >
                            <span className="font-medium">{link.text}</span>
                            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Card>
                )}

                {/* Global Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-accent/5 rounded-xl">
                    <div className="text-3xl font-bold text-accent">90+</div>
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Perf Score</div>
                  </div>
                  <div className="text-center p-4 bg-accent/5 rounded-xl">
                    <div className="text-3xl font-bold text-accent">18D</div>
                    <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">AI Launch</div>
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Reused FAQ Section */}
      {service.faq && service.faq.length > 0 && (
        <div className="bg-neutral-light/30 border-y border-gray-100">
          <FAQSection 
            faqs={service.faq} 
            title={`${locationData.city} ${service.title} FAQs`}
            subtitle={`Common questions about our ${service.title.toLowerCase()} services for businesses in ${locationData.city}.`}
          />
        </div>
      )}

      <ProjectLinks />
      {/* Localized CTA Section */}
      <section className="py-24 bg-accent">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Ready to Scale Your {locationData.city} Business?
          </h2>
          <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
            Our team is available in your time zone and ready to start. 
            Book your free audit and strategy session today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/contact" size="lg" variant="secondary">
              {locationData.cta?.primary || 'Get Started Now'}
            </Button>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-medium">
              <Globe className="w-5 h-5" />
              <span>{locationData.cta?.secondary || 'UK & US Business Hours'}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
