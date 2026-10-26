import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { getPost } from '@/lib/blog/queries';
import { postView } from '@/lib/blog/adapter';
import { postSeo } from '@/lib/blog/seo';
import { BlogContent } from '@/lib/blog/renderer';
import { BlogShareLinks } from '@/lib/blog/share';
import LatestBlogPosts from '@/components/blog/LatestBlogPosts';
import { ContentVisual } from '@/components/ui/ContentVisual';
import { JSONLD } from '@/components/SEO/JSONLD';
import { Button } from '@/components/ui/Button';
import { teamMembers } from '@/lib/data';
import { Calendar, Clock, ArrowUpRight } from 'lucide-react';

interface PageProps { params: Promise<{ slug: string }> }

export async function databaseBlogMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPost(await getLocale(), slug);
  if (!result) notFound();
  return postSeo(result.post).metadata;
}

export default async function DatabaseBlogPost({ params }: PageProps) {
  const { slug } = await params;
  const result = await getPost(await getLocale(), slug);
  if (!result) notFound();
  const post = postView(result.post, result.document);
  const visual = post.visual;
  const sections = post.sections;
  const { structuredData } = postSeo(result.post);
  const teamAuthor = teamMembers.find(member => member.name.trim().toLowerCase() === post.author_name.trim().toLowerCase());
  const authorDescription = post.authorDescription || teamAuthor?.bio;
  const authorImage = post.avatar;
  const authorDesignation = post.author_designation?.trim();
  const authorInitials = post.author_name.trim().split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();

  return (
    <article className="min-h-screen bg-background py-15">
      <JSONLD id="article-schema" data={structuredData} />
      <div className="container mx-auto w-full max-w-7xl px-6">
        <div className="grid lg:grid-cols-[minmax(0,1fr)_19rem] gap-12 xl:gap-20 items-start">
          <main className="relative min-w-0">
            <BlogShareLinks locale={post.locale} slug={post.slug} title={post.title} />
            <header className="max-w-4xl mb-10">
              <h1 className="font-heading text-4xl sm:text-sm md:text-6xl font-bold tracking-tight text-neutral-dark leading-[1.08] mb-7">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500 mb-6">
                <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" /><time dateTime={post.publishDate}>{new Date(post.publishDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</time></span>
                <span className="inline-flex items-center gap-2"><Clock className="w-4 h-4" />{post.readTime}</span>
                <span>{post.avatar && <img src={post.avatar} alt={post.author_name} width={32} height={32} className="inline-block rounded-full mr-2" />}{post.author_name}{authorDesignation && ` · ${authorDesignation}`}</span>
              </div>
              <p className="text-xl md:text-2xl leading-relaxed text-gray-600">{post.excerpt}</p>
            </header>

            {visual && <ContentVisual visual={visual} priority />}

            <div className="space-y-10 max-w-4xl">
              <BlogContent document={result.document} assets={result.assets} />
            </div>

            <section className="mt-16 pt-10 border-t border-gray-200 max-w-4xl"><h2 className="text-2xl font-bold text-neutral-dark mb-5">Explore related services</h2><ul className="grid sm:grid-cols-2 gap-3">{post.internalLinks.map(link => <li key={link.href}><Link href={link.href} className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-neutral-dark hover:border-accent hover:text-accent"><span>{link.text}</span><ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link></li>)}</ul></section>

            <section aria-labelledby="article-author-name" className="mt-10 max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start gap-5">
                {authorImage ? <img src={authorImage} alt={post.author_name} width={80} height={80} loading="lazy" decoding="async" className="h-20 w-20 shrink-0 rounded-full object-cover" /> : <span aria-hidden="true" className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-neutral-light text-2xl font-bold text-neutral-dark">{authorInitials}</span>}
                <div className="min-w-0">
                  <h2 id="article-author-name" className="text-2xl font-bold text-neutral-dark">{post.author_name}</h2>
                  {authorDesignation && <p className="mt-1 text-sm font-semibold text-gray-500">{authorDesignation}</p>}
                  {authorDescription && <p className="mt-4 whitespace-pre-line break-words text-base leading-relaxed text-gray-600">{authorDescription}</p>}
                </div>
              </div>
            </section>

            <LatestBlogPosts currentSlug={slug} source="database" />
          </main>

          <aside className="lg:sticky lg:top-28 space-y-5">
            <nav aria-label="Table of contents" className="rounded-2xl border border-gray-200 bg-white p-6"><p className="text-xs uppercase tracking-[0.16em] text-accent font-bold mb-4">In this article</p><ol className="space-y-3">{sections.map((section, index) => <li key={section.id}><a href={`#${section.id}`} className="flex gap-3 text-sm leading-snug text-gray-600 hover:text-accent"><span className="font-bold text-gray-400">{String(index + 1).padStart(2, '0')}</span><span>{section.heading}</span></a></li>)}</ol></nav>
            <div className="rounded-2xl bg-neutral-dark p-6 text-white"><p className="text-xs uppercase tracking-[0.16em] text-accent font-bold mb-3">Need help applying this?</p><h2 className="text-xl font-bold mb-3">Turn the guidance into a practical plan.</h2><p className="text-sm leading-relaxed text-white/70 mb-5">Share your current website, workflow or goal and we will help you choose a focused next step.</p><Button href={post.ctaHref} variant="secondary" className="w-full">{post.ctaText}</Button></div>
          </aside>
        </div>
      </div>
    </article>
  );
}
