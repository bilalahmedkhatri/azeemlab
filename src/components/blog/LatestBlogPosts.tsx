import Image from 'next/image';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { blogPosts } from '@/lib/data';
import { articleVisuals } from '@/lib/visuals';
import { listPosts } from '@/lib/blog/queries';
import { postView } from '@/lib/blog/adapter';
import { blogPath } from '@/lib/blog/config';
import { BlogUnavailableError } from '@/lib/blog/database';
import { latestBlogCards } from '@/lib/blog/latest';
import { isLocale, localizedPath } from '@/i18n/config';
import { Card } from '@/components/ui/Card';

export default async function LatestBlogPosts({ currentSlug, source }: { currentSlug: string; source: 'static' | 'database' }) {
  const value = await getLocale();
  const locale = isLocale(value) ? value : 'en';
  // Five DB candidates leave four even when the current article is the newest.
  const result = await listPosts(locale, 1, 5).catch(error => {
    if (!(error instanceof BlogUnavailableError)) throw error;
    return { posts: [] };
  });
  const currentHref = source === 'database' ? blogPath(locale, currentSlug) : localizedPath(locale, `/blog/${currentSlug}`);
  const cards = latestBlogCards([
    ...result.posts.map(post => {
      const view = postView(post);
      return { href: blogPath(locale, post.slug), title: post.title, publishDate: view.publishDate, image: view.visual || { src: '/og-image.png', alt: post.title } };
    }),
    ...blogPosts.map(post => ({ href: localizedPath(locale, `/blog/${post.slug}`), title: post.title, publishDate: post.publishDate, image: articleVisuals[post.slug] || { src: '/og-image.png', alt: post.title } })),
  ], currentHref);
  if (!cards.length) return null;

  return <section aria-labelledby="latest-blog-heading" className="mt-12 max-w-4xl border-t border-gray-200 pt-10">
    <h2 id="latest-blog-heading" className="mb-6 text-2xl font-bold text-neutral-dark">Latest articles</h2>
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map(card => <li key={card.href} className="min-w-0">
        <Link href={card.href} className="group block h-full rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">
          <Card className="h-full overflow-hidden border border-gray-200 bg-white p-0! transition-shadow hover:shadow-lg">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={card.image.src} alt={card.image.alt} fill sizes="(min-width: 1280px) 210px, (min-width: 640px) 45vw, 100vw" className="object-cover transition-transform group-hover:scale-105" />
            </div>
            <h3 className="break-words p-4 text-base font-semibold leading-snug text-neutral-dark group-hover:text-accent">{card.title}</h3>
          </Card>
        </Link>
      </li>)}
    </ul>
  </section>;
}
