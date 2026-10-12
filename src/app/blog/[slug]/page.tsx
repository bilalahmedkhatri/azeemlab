import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { articleVisuals } from '@/lib/visuals';
import { ContentVisual } from '@/components/ui/ContentVisual';
import { articleContent } from '@/lib/search-content';
import { absoluteUrl } from '@/lib/site';
import { JSONLD } from '@/components/SEO/JSONLD';
import { Button } from '@/components/ui/Button';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

interface PageProps { params: Promise<{ slug: string }> }

const headingId = (heading: string) => heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export async function generateStaticParams() { return blogPosts.map((post) => ({ slug: post.slug })); }

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Post Not Found' };
  const visual = articleVisuals[slug];
  const articleDateModified = post.publishDate;
  return {
    alternates: { canonical: `/blog/${slug}` },
    title: { absolute: post.metaTitle },
    description: articleContent[slug]?.summary || post.metaDescription,
    keywords: post.relatedKeywords,
    authors: [{ name: 'AzeemLab editorial team', url: absoluteUrl('/about') }],
    openGraph: { type: 'article', url: `/blog/${slug}`, title: post.metaTitle, description: articleContent[slug]?.summary || post.metaDescription, publishedTime: post.publishDate, modifiedTime: articleDateModified, authors: [absoluteUrl('/about')], images: [{ url: visual.src, width: visual.width, height: visual.height, alt: visual.alt }] },
    twitter: { card: 'summary_large_image', images: [visual.src] },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();
  const content = articleContent[slug];
  const visual = articleVisuals[slug];
  const sections = content?.sections || [];
  const articleDateModified = post.publishDate;
  const readMinutes = Math.max(1, Math.ceil(([content?.summary || post.excerpt, ...sections.map(section => `${section.heading} ${section.text}`)].join(' ').split(/\s+/).length) / 200));

  return (
    <article className="min-h-screen bg-background pt-28 pb-24">
      <JSONLD id="article-schema" data={{ '@context': 'https://schema.org', '@type': 'BlogPosting', '@id': absoluteUrl(`/blog/${slug}#article`), headline: post.title, description: content?.summary || post.excerpt, image: [absoluteUrl(visual.src)], datePublished: post.publishDate, dateModified: articleDateModified, mainEntityOfPage: absoluteUrl(`/blog/${slug}`), author: { '@type': 'Organization', '@id': absoluteUrl('/#organization'), name: 'AzeemLab editorial team', url: absoluteUrl('/about') }, publisher: { '@id': absoluteUrl('/#organization') }, keywords: post.relatedKeywords }} />
      <div className="container mx-auto w-full max-w-7xl px-6">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_19rem] gap-12 xl:gap-20 items-start">
          <main className="min-w-0">
            <header className="max-w-4xl mb-10">
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-6">
                <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" /><time dateTime={post.publishDate}>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time></span>
                <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4" />{readMinutes} min read</span>
                <span>By AzeemLab editorial team</span>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-accent mb-4">AzeemLab Insights</p>
              <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-neutral-dark leading-[1.08] mb-7">{post.title}</h1>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-600">{content?.summary || post.excerpt}</p>
              <p className="mt-5 text-sm text-gray-500">Practical guidance for business owners and teams · Maintained when the article is materially updated.</p>
            </header>

            <ContentVisual visual={visual} priority />

            <div className="grid md:grid-cols-2 gap-4 my-10" aria-label="Article at a glance">
              <div className="rounded-2xl border border-gray-200 bg-white p-6"><p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Primary question</p><p className="font-semibold text-neutral-dark">{post.relatedKeywords[0]}</p></div>
              <div className="rounded-2xl border border-gray-200 bg-white p-6"><p className="text-xs uppercase tracking-widest text-gray-500 font-bold mb-2">Best next step</p><p className="font-semibold text-neutral-dark">{post.ctaText}</p></div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden mb-14">
              <div className="px-6 py-4 bg-neutral-light border-b border-gray-200"><h2 className="text-lg font-bold text-neutral-dark">Article details</h2></div>
              <div className="overflow-x-auto"><table className="w-full text-left"><tbody><tr><th scope="row" className="px-6 py-4 w-1/3 text-sm font-semibold text-gray-500">Topic</th><td className="px-6 py-4 text-sm text-neutral-dark">{post.relatedKeywords.slice(0, 3).join(' · ')}</td></tr><tr className="border-t border-gray-100"><th scope="row" className="px-6 py-4 text-sm font-semibold text-gray-500">Audience</th><td className="px-6 py-4 text-sm text-neutral-dark">Business owners, marketing teams and product decision-makers</td></tr><tr className="border-t border-gray-100"><th scope="row" className="px-6 py-4 text-sm font-semibold text-gray-500">Published</th><td className="px-6 py-4 text-sm text-neutral-dark"><time dateTime={post.publishDate}>{post.publishDate}</time></td></tr><tr className="border-t border-gray-100"><th scope="row" className="px-6 py-4 text-sm font-semibold text-gray-500">Editorial note</th><td className="px-6 py-4 text-sm text-neutral-dark">Updated only when the guidance or sources materially change</td></tr></tbody></table></div>
            </div>

            <div className="space-y-10 max-w-4xl">
              {sections.map((section, index) => <section key={section.heading} id={headingId(section.heading)} className="scroll-mt-28"><p className="text-xs uppercase tracking-[0.16em] text-accent font-bold mb-3">{String(index + 1).padStart(2, '0')}</p><h2 className="text-2xl md:text-3xl font-bold text-neutral-dark mb-4 leading-tight">{section.heading}</h2><p className="text-lg leading-[1.85] text-gray-700">{section.text}</p></section>)}
            </div>

            <section className="mt-16 pt-10 border-t border-gray-200 max-w-4xl"><h2 className="text-2xl font-bold text-neutral-dark mb-5">Explore related services</h2><ul className="grid sm:grid-cols-2 gap-3">{post.internalLinks.map(link => <li key={link.href}><Link href={link.href} className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-dark hover:border-accent hover:text-accent"><span>{link.text}</span><ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></li>)}</ul></section>
            {content && <section className="mt-14 pt-10 border-t border-gray-200 max-w-4xl"><h2 className="text-2xl font-bold text-neutral-dark mb-5">Sources and further reading</h2><ul className="space-y-3">{content.sources.map(source => <li key={source.url}><a href={source.url} className="inline-flex items-center gap-2 text-accent underline underline-offset-4" rel="noopener noreferrer">{source.label}<ArrowUpRight className="w-4 h-4" /></a></li>)}</ul></section>}
          </main>

          <aside className="lg:sticky lg:top-28 space-y-5">
            <nav aria-label="Table of contents" className="rounded-2xl border border-gray-200 bg-white p-6"><p className="text-xs uppercase tracking-[0.16em] text-accent font-bold mb-4">In this article</p><ol className="space-y-3">{sections.map((section, index) => <li key={section.heading}><a href={`#${headingId(section.heading)}`} className="flex gap-3 text-sm leading-snug text-gray-600 hover:text-accent"><span className="font-bold text-gray-400">{String(index + 1).padStart(2, '0')}</span><span>{section.heading}</span></a></li>)}</ol></nav>
            <div className="rounded-2xl bg-neutral-dark p-6 text-white"><p className="text-xs uppercase tracking-[0.16em] text-accent font-bold mb-3">Need help applying this?</p><h2 className="text-xl font-bold mb-3">Turn the guidance into a practical plan.</h2><p className="text-sm leading-relaxed text-white/70 mb-5">Share your current website, workflow or goal and we will help you choose a focused next step.</p><Button href={post.ctaHref} variant="secondary" className="w-full">{post.ctaText}</Button></div>
          </aside>
        </div>
      </div>
    </article>
  );
}
