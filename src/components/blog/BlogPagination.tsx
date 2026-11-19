import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { blogConfig, blogPath } from '@/lib/blog/config';
import { blogPageNumbers, blogPaginationLabels, normalizeBlogPage } from '@/lib/blog/pagination';

type Props = { locale: string; page: number; hasNext: boolean; category?: string };

export default function BlogPagination({ locale, page: value, hasNext, category }: Props) {
  const page = normalizeBlogPage(value);
  const nextAvailable = hasNext && page < blogConfig.maxPage;
  const [navigation, previous, next, pageLabel] = blogPaginationLabels(locale);
  const href = (number: number) => {
    const search = new URLSearchParams({ page: String(number) });
    if (category) search.set('category', category);
    return `${blogPath(locale)}?${search}`;
  };
  const base = 'flex h-10 min-w-10 items-center justify-center rounded-lg border px-3 text-sm transition-colors';
  const enabled = `${base} border-gray-300 bg-white text-neutral-dark hover:border-neutral-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`;
  const disabled = `${base} cursor-not-allowed border-gray-200 text-gray-300`;

  return <nav aria-label={navigation} className="mt-12 flex flex-wrap justify-center gap-2">
    {page > 1 ? <Link href={href(page - 1)} className={enabled} aria-label={previous}><ChevronLeft size={18} aria-hidden="true" /></Link>
      : <span className={disabled} aria-disabled="true" aria-label={previous}><ChevronLeft size={18} aria-hidden="true" /></span>}
    {blogPageNumbers(page).map(number => {
      const active = number === page;
      // Without a total-count query only the immediate next page is verified.
      const unavailable = number > page + (nextAvailable ? 1 : 0);
      if (unavailable) return <span key={number} className={disabled} aria-disabled="true" aria-label={`${pageLabel} ${number}`}>{number}</span>;
      return <Link key={number} href={href(number)} aria-label={`${pageLabel} ${number}`} aria-current={active ? 'page' : undefined} className={active ? `${base} border-neutral-dark bg-neutral-dark text-white` : enabled}>{number}</Link>;
    })}
    {nextAvailable ? <Link href={href(page + 1)} className={enabled} aria-label={next}><ChevronRight size={18} aria-hidden="true" /></Link>
      : <span className={disabled} aria-disabled="true" aria-label={next}><ChevronRight size={18} aria-hidden="true" /></span>}
  </nav>;
}
