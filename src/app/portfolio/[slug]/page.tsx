import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { caseStudies } from '@/lib/data';
import { ExternalLink, Calendar, Clock } from 'lucide-react';
import { getPortfolioSections } from '@/lib/portfolio-content';

interface PageProps { params: Promise<{ slug: string }> }

export async function generateStaticParams() { return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);
  if (!caseStudy) return { title: 'Project Not Found' };
  return { alternates: { canonical: `/portfolio/${slug}` }, title: { absolute: `${caseStudy.title} | AzeemLab Case Study` }, description: caseStudy.challenge.substring(0, 160), openGraph: { url: `/portfolio/${slug}`, title: `${caseStudy.title} | AzeemLab Case Study`, description: caseStudy.challenge.substring(0, 160), images: [caseStudy.heroImage || '/og-image.png'] } };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = caseStudies.find((cs) => cs.slug === slug);
  if (!caseStudy) notFound();
  const sections = getPortfolioSections(caseStudy);
  const nextProject = caseStudies[(caseStudies.findIndex(cs => cs.slug === slug) + 1) % caseStudies.length];

  return (
    <article className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto w-full max-w-7xl px-6"><div className="w-full">
        <header className="mb-12"><div className="flex flex-wrap items-center gap-5 text-gray-500 mb-6"><span className="text-accent font-semibold">{caseStudy.category}</span><span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" />Case study</span><span className="inline-flex items-center gap-2"><Clock className="w-4 h-4" />12 min read</span></div><h1 className="font-heading text-4xl md:text-6xl font-bold text-neutral-dark mb-6">{caseStudy.title}</h1><p className="text-xl text-gray-600">A documented project for {caseStudy.client}: the challenge, decisions, implementation and evidence behind the result.</p></header>
        <div className="relative h-[24rem] md:h-[34rem] rounded-3xl overflow-hidden mb-14 bg-gradient-to-br from-accent to-accent-dark">{caseStudy.heroImage ? <Image src={caseStudy.heroImage} alt={`${caseStudy.title} project`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 1024px" priority /> : <div className="h-full" />}{caseStudy.client.includes('.') && <a href={`https://${caseStudy.client.replace(/^https?:\/\//, '')}`} target="_blank" rel="noopener noreferrer" className="absolute bottom-6 right-6 bg-white text-accent px-5 py-3 rounded-full font-semibold flex items-center gap-2"><ExternalLink className="w-4 h-4" />Visit website</a>}</div>
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-16"><div className="overflow-x-auto"><table className="w-full text-left"><caption className="sr-only">Results summary for {caseStudy.title}</caption><thead className="bg-neutral-light"><tr><th className="px-6 py-4 font-bold text-neutral-dark">Measure</th><th className="px-6 py-4 font-bold text-neutral-dark">Recorded result</th><th className="px-6 py-4 font-bold text-neutral-dark">Context</th></tr></thead><tbody>{caseStudy.results.map((result) => <tr key={result.metric} className="border-t border-gray-100"><th scope="row" className="px-6 py-4 text-neutral-dark">{result.metric}</th><td className="px-6 py-4 text-accent font-bold">{result.value}</td><td className="px-6 py-4 text-gray-600">{result.description}</td></tr>)}</tbody></table></div></div>
        <div className="prose prose-lg max-w-7xl mx-auto text-gray-600">{sections.map(([heading, text]) => <section key={heading} className="mb-10"><h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4">{heading}</h2><p className="leading-relaxed">{text}</p></section>)}</div>
        {caseStudy.testimonial && <blockquote className="my-16 rounded-3xl bg-accent p-10 text-white text-xl italic">“{caseStudy.testimonial.quote}”<footer className="mt-5 text-base not-italic font-semibold">{caseStudy.testimonial.author}, {caseStudy.testimonial.position}</footer></blockquote>}
        <footer className="border-t border-gray-200 pt-12 mt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"><div><p className="text-sm uppercase tracking-wider text-gray-500 font-semibold">Next case study</p><h2 className="text-2xl font-bold text-neutral-dark mt-2">{nextProject.title}</h2></div><Button href={`/portfolio/${nextProject.slug}`} variant="outline">Read next project <ExternalLink className="w-4 h-4 ml-2" /></Button></footer>
      </div></div>
    </article>
  );
}
