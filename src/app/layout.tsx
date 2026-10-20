import { getLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';
import '@/styles/globals.css';

export const metadata: Metadata = { metadataBase: new URL(siteUrl) };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang={await getLocale()}><body className="antialiased bg-background text-foreground transition-colors duration-300 overflow-x-hidden">{children}</body></html>;
}
