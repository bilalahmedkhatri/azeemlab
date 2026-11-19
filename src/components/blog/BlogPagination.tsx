import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { blogConfig, blogPath } from '@/lib/blog/config';
import { blogPageNumbers, blogPaginationLabels, normalizeBlogPage } from '@/lib/blog/pagination';

type Props = { locale: string; page: number; hasNext: boolean; category?: string };

export default function BlogPagination({ locale, page: value, hasNext, category }: Props) {
  const page = normalizeBlogPage(value);
  const nextAvailable = hasNext && page < blogConfig.maxPage;

  // Agar total sirf 1 page hai to pagination dikhane ki zaroorat nahi
  if (page === 1 && !nextAvailable) return null;

  const [navigation, previous, next, pageLabel] = blogPaginationLabels(locale);
  const href = (number: number) => {
    const search = new URLSearchParams({ page: String(number) });
    if (category) search.set('category', category);
    return `${blogPath(locale)}?${search}`;
  };
  const base = 'flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm transition-colors';
  const enabled = `${base} border-gray-300 bg-white text-neutral-dark hover:border-neutral-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`;
  const disabled = `${base} cursor-not-allowed border-gray-200 text-gray-300`;

  // Sirf wahi pages dikhayein jo waqai mojood hain (fake ya disabled numbers nahi)
  const maxPage = page + (nextAvailable ? 1 : 0);
  const startPage = Math.max(1, page - 2);
  const pages = Array.from({ length: maxPage - startPage + 1 }, (_, index) => startPage + index);

  return <nav aria-label={navigation} className="mt-12 flex flex-wrap justify-center gap-2">
    {page > 1 ? <Link href={href(page - 1)} className={enabled} aria-label={previous}><ChevronLeft size={18} aria-hidden="true" /></Link>
      : <span className={disabled} aria-disabled="true" aria-label={previous}><ChevronLeft size={18} aria-hidden="true" /></span>}
    {pages.map(number => {
      const active = number === page;
      return <Link key={number} href={href(number)} aria-label={`${pageLabel} ${number}`} aria-current={active ? 'page' : undefined} className={active ? `${base} border-neutral-dark bg-neutral-dark text-white` : enabled}>{number}</Link>;
    })}
    {nextAvailable ? <Link href={href(page + 1)} className={enabled} aria-label={next}><ChevronRight size={18} aria-hidden="true" /></Link>
      : <span className={disabled} aria-disabled="true" aria-label={next}><ChevronRight size={18} aria-hidden="true" /></span>}
  </nav>;
}
