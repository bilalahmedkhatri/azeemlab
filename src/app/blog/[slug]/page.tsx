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
import { Calendar, Clock, ChevronLeft, Download } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return { title: 'Post Not Found' };

  return {
    alternates: { canonical: `/blog/${slug}` },
    title: { absolute: post.metaTitle },
    description: articleContent[slug]?.summary || post.metaDescription,
    twitter: { card: 'summary_large_image', images: [articleVisuals[slug].src] },
    openGraph: {
      url: `/blog/${slug}`,
      images: [{ url: articleVisuals[slug].src, width: 1200, height: 800, alt: articleVisuals[slug].alt }],
      title: post.metaTitle,
      description: articleContent[slug]?.summary || post.metaDescription,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const content = articleContent[slug];
  return (
    <article className="min-h-screen bg-background pt-32 pb-20">
      <JSONLD id="article-schema" data={{ '@context': 'https://schema.org', '@type': 'Article', image: { '@type': 'ImageObject', url: absoluteUrl(articleVisuals[slug].src), width: 1200, height: 800, caption: articleVisuals[slug].caption }, headline: post.title, description: content?.summary || post.excerpt, datePublished: post.publishDate, dateModified: '2026-10-12', mainEntityOfPage: absoluteUrl(`/blog/${slug}`), author: { '@type': 'Organization', '@id': absoluteUrl('/#organization'), name: 'AzeemLab' }, publisher: { '@id': absoluteUrl('/#organization') } }} />
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Navigation */}
          <Link 
            href="/blog" 
            className="inline-flex items-center text-gray-500 hover:text-accent transition-colors mb-12 group"
          >
            <ChevronLeft className="w-5 h-5 mr-1 transform group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-6 text-gray-500 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {new Date(post.publishDate).toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {Math.max(1, Math.ceil(([content?.summary || post.excerpt, ...(content?.sections.map(section => `${section.heading} ${section.text}`) || [])].join(' ').split(/\s+/).length) / 200))} min read
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading text-neutral-dark mb-8 leading-tight">
              {post.title}
            </h1>
          </header>

          <ContentVisual visual={articleVisuals[slug]} priority />
          {/* Excerpt/Intro */}
          <div className="bg-neutral-light/50 p-8 rounded-2xl mb-12 border border-neutral-light">
            <p className="text-xl text-neutral-dark font-medium leading-relaxed italic">
              {content?.summary || post.excerpt}
            </p>
          </div>

          {/* Download CTA if applicable */}
          {post.hasFreeDownload && (
            <div className="bg-accent/5 border border-accent/10 rounded-3xl p-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-neutral-dark mb-2">Free Resource Included</h3>
                <p className="text-gray-600">Download the companion PDF guide for this article.</p>
              </div>
              <Button href={post.ctaHref} className="whitespace-nowrap">
                <Download className="w-5 h-5 mr-2" />
                {post.ctaText}
              </Button>
            </div>
          )}

          <div className="prose prose-lg max-w-none text-gray-600 mb-16">
            {content?.sections.map(section => <section key={section.heading} className="mb-9"><h2 className="text-2xl font-bold text-neutral-dark mb-4">{section.heading}</h2><p className="leading-relaxed">{section.text}</p></section>)}
            <h2 className="text-2xl font-bold text-neutral-dark mt-10 mb-4">Explore related services</h2>
            <ul className="space-y-3">{post.internalLinks.map(link => <li key={link.href}><Link href={link.href} className="underline underline-offset-4">{link.text}</Link></li>)}</ul>
            {content && <><h2 className="text-2xl font-bold text-neutral-dark mt-10 mb-4">Further reading</h2><ul className="space-y-3">{content.sources.map(source => <li key={source.url}><a href={source.url} className="underline underline-offset-4">{source.label}</a></li>)}</ul></>}
          </div>

          {/* Final CTA */}
          <footer className="border-t border-gray-100 pt-16">
            <div className="bg-neutral-dark text-white p-12 rounded-3xl text-center">
              <h2 className="text-3xl font-bold mb-6">Ready to apply these techniques?</h2>
              <p className="text-gray-400 mb-8 text-xl max-w-xl mx-auto">
                Our team specializes in turning these concepts into real-world business results.
              </p>
              <Button href={post.ctaHref} size="lg" variant="secondary">
                {post.ctaText}
              </Button>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}
