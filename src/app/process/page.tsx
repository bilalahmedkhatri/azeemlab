import { Metadata } from 'next';
import ProcessClientPage from '@/components/process/ProcessClientPage';

export const metadata: Metadata = {
  title: "Our Process - SooooLab",
  description: "Discover the proven, transparent process SooooLab uses to turn your vision into a successful digital product. From discovery and strategy to launch and optimization.",
};

export default function ProcessPage() {
  return <ProcessClientPage />;
}
