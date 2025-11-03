import { Metadata } from 'next';
import CareersClientPage from '@/components/careers/CareersClientPage';

export const metadata: Metadata = {
  title: 'Careers - Join Our Team | AzeemLab',
  description: 'Join AzeemLab and work on exciting projects with a talented team. Explore open positions and build a career you\'re proud of.',
};

export default function CareersPage() {
  return <CareersClientPage />;
}
