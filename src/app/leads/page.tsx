import type { Metadata } from 'next';
import { LeadReport } from '@/components/sections/LeadReport';

export const metadata: Metadata = {
  title: 'Lead report viewer',
  description: 'Turn a JSON lead report into a readable project and contact overview.',
  robots: { index: false, follow: false },
};

export default function LeadsPage() {
  return <LeadReport />;
}
