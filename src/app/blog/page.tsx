import React from 'react';
import Image from 'next/image';
import { getLocale } from 'next-intl/server';
import { listBlogPage } from '@/lib/blog/queries';
import { postView } from '@/lib/blog/adapter';
import { blogConfig, blogPath } from '@/lib/blog/config';
import { normalizeBlogPage } from '@/lib/blog/pagination';
import { BlogEmpty, BlogDatabaseUnavailable } from '@/lib/blog/ui';
import BlogPagination from '@/components/blog/BlogPagination';
import { BlogUnavailableError } from '@/lib/blog/database';
import { blogPosts } from '@/lib/data';
import { articleVisuals } from '@/lib/visuals';
import { localizedPath, isLocale } from '@/i18n/config';
import Link from 'next/link';
import { Metadata } from 'next';
import { Card } from '@/components/ui/Card';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  alternates: { canonical: '/blog' },
  title: 'Blog - Expert Insights on Web Design & Digital Growth | AzeemLab',
  description: 'Read our latest articles on responsive web design, front end development, and digital marketing strategies to grow your business online.',
};

export default async function BlogListingPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
  const locale = await getLocale();
  const query = await searchParams || {};
  const page = typeof query.page === 'string' && /^\d{1,5}$/.test(query.page) ? Number(query.page) : 1;
  const category = typeof query.category === 'string' ? query.category : undefined;
  let unavailable = false;
  const result = await listBlogPage(locale, page, blogPosts, category).catch(error => {
    if (!(error instanceof BlogUnavailableError)) throw error;
    unavailable = true;
    const safePage = normalizeBlogPage(page);
    const size = blogConfig.pageSize;
    const ordered = [...blogPosts].sort((a, b) => Date.parse(b.publishDate) - Date.parse(a.publishDate) || a.slug.localeCompare(b.slug));
    const offset = (safePage - 1) * size;
    const selected = ordered.slice(offset, offset + size + 1);
    return { references: selected.slice(0, size).map(post => ({ source: 'static' as const, key: post.slug })), posts: [], page: safePage, hasNext: selected.length > size && safePage < blogConfig.maxPage };
  });
  const databaseById = new Map(result.posts.map(post => [String(post.id), post]));
  const staticBySlug = new Map(blogPosts.map(post => [post.slug, post]));
  const posts = result.references.map(reference => {
    if (reference.source === 'static') {
      const post = staticBySlug.get(reference.key);
      if (!post) return null;
      return { ...post, key: `static:${post.id}`, href: localizedPath(isLocale(locale) ? locale : 'en', `/blog/${post.slug}`), visual: articleVisuals[post.slug] };
    }
    const post = databaseById.get(reference.key);
    if (!post) return null;
    return { ...postView(post), key: `database:${post.id}`, href: blogPath(locale, post.slug) };
  }).filter(post => post !== null);
  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="font-heading text-5xl md:text-6xl font-bold text-neutral-dark mb-6">
            Insights & <span className="text-accent">Expertise</span>
          </h1>
          <p className="text-xl text-gray-600">
            Deep dives into responsive web design, performance optimization, and digital strategy.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {posts.map((post, index) => (
            <Link key={post.key} href={post.href} className="group">
              <Card className="h-full hover:shadow-2xl transition-all duration-300 border-none bg-white overflow-hidden flex flex-col">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-100">
                  {post.visual && <Image
                    src={post.visual?.src || '/og-image.png'}
                    alt={post.visual?.alt || post.title}
                    fill
                    // width={post.visual.width}
                    // height={post.visual.height}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />}
                </div>
                <div className="p-0 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.publishDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    {post.readTime && <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </div>}
                  </div>

                  <h2 className="text-2xl font-bold font-heading mb-4 group-hover:text-accent transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 flex items-center text-accent font-semibold group/link">
                    Read Article
                    <ArrowRight className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="h-1.5 bg-gradient-to-r from-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Card>
            </Link>
          ))}
        </div>
        {unavailable && <BlogDatabaseUnavailable locale={locale} />}
        {!posts.length && !unavailable && <BlogEmpty locale={locale} />}
        <BlogPagination locale={locale} page={result.page} hasNext={result.hasNext} category={category} />
      </div>
    </div>
  );
}
