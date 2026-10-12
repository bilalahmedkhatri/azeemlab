import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/data';
import { createPageMetadata } from '@/lib/site';
import { agencyVisual } from '@/lib/visuals';
import { AgencyHome } from '@/components/sections/AgencyHome';

export const metadata: Metadata = {
  ...createPageMetadata('/', 'Web Design, AI Chatbots & Automation | AzeemLab', 'AzeemLab builds responsive websites, AI chatbots and business automations for UK, US and global clients. Explore our projects and discuss your next build.', agencyVisual.src),
  keywords: pageMetadata.home.keywords,
};

export default function Home() {
  return <AgencyHome />;
}
