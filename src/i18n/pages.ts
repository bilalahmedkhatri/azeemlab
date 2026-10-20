import 'server-only';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, localizedPath, locales, openGraphLocales } from './config';
import { languageAlternates } from './urls';

type PageModule = { default: React.ComponentType<any>; metadata?: Metadata; generateMetadata?: (props: any) => Promise<Metadata> | Metadata };
export type PageLoaders = Record<string, () => Promise<PageModule>>;
export type LayoutLoaders = Record<string, () => Promise<{ metadata?: Metadata }>>;
export async function resolvePage(locale: string, path: string[] = [], routes: PageLoaders) {
  if (!isLocale(locale)) notFound();
  const pathname = '/' + path.join('/');
  let key = pathname, params: Record<string, string> = {};
  if (path[0] === 'services' && path.length === 2) { key = '/services/[slug]'; params = { slug: path[1] }; }
  if (path[0] === 'services' && path.length === 3) { key = '/services/[slug]/[location]'; params = { slug: path[1], location: path[2] }; }
  if (['blog', 'portfolio'].includes(path[0]) && path.length === 2) { key = `/${path[0]}/[slug]`; params = { slug: path[1] }; }
  const loader = routes[key];
  if (!loader) notFound();
  const module = await loader();
  return { locale, pathname, params: Promise.resolve(params), module };
}
export async function pageMetadata(locale: string, path: string[] = [], routes: PageLoaders, layouts: LayoutLoaders): Promise<Metadata> {
  const page = await resolvePage(locale, path, routes);
  const parentLoader = layouts['/' + (path[0] || '')];
  const parent = parentLoader ? (await parentLoader()).metadata || {} : {};
  const metadata = { ...parent, ...(page.module.generateMetadata ? await page.module.generateMetadata({ params: page.params }) : page.module.metadata || {}) };
  const url = localizedPath(page.locale, page.pathname);
  return { ...metadata, alternates: { canonical: url, languages: languageAlternates(page.pathname) }, openGraph: { ...metadata.openGraph, url, locale: openGraphLocales[page.locale], alternateLocale: locales.filter(value => value !== locale).map(value => openGraphLocales[value]) } };
}
