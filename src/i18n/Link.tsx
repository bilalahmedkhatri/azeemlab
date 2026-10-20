'use client';
import NextLink from 'next/link';
import { useLocale } from 'next-intl';
import type { ComponentProps } from 'react';
import { isLocale, localizedPath } from './config';

export default function Link(props: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  const href = props.href;
  const target = typeof href === 'string' ? href : href.pathname;
  const internal = target?.startsWith('/') && !target.startsWith('//') && !target.startsWith('/api/') && !/\.[a-z0-9]+(?:[?#]|$)/i.test(target);
  const value = internal && isLocale(locale) ? typeof href === 'string' ? localizedPath(locale, href) : { ...href, pathname: localizedPath(locale, target!) } : href;
  return <NextLink {...props} href={value} prefetch={false} />;
}
