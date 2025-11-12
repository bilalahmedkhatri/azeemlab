import { Metadata } from 'next';
import PlanDetailClientPage from '@/components/pricing/PlanDetailClientPage';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

const validPlans = ['starter', 'business', 'enterprise'];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const planName = slug.charAt(0).toUpperCase() + slug.slice(1);
  
  if (!validPlans.includes(slug.toLowerCase())) {
    return {
      title: 'Plan Not Found',
    };
  }

  return {
    title: `${planName} Plan - Detailed Features | AzeemLab`,
    description: `Explore all the features and benefits of our ${planName} plan. Perfect for your business needs with comprehensive support and features.`,
  };
}

export async function generateStaticParams() {
  return validPlans.map((plan) => ({
    slug: plan,
  }));
}

export default async function PlanDetailPage({ params }: Props) {
  const { slug } = await params;
  
  if (!validPlans.includes(slug.toLowerCase())) {
    notFound();
  }

  return <PlanDetailClientPage planSlug={slug} />;
}
