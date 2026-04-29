import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  problem: string;
  solution: string;
  process: ProcessStep[];
  pricing?: PricingTier[];
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface PricingTier {
  name: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export interface InternationalChallenge {
  region: string;
  challenge: string;
  solution: string;
}

export interface SEOAndTraffic {
  targetKeywords: string[];
  estimatedMonthlyVisits: string;
  topTrafficSources: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Rating {
  overall: number;
  breakdown: {
    [key: string]: number;
  };
  reviewCount: number;
  platform: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  heroImage: string;
  challenge: string;
  solution: string;
  results: Result[];
  images: string[];
  testimonial?: Testimonial;
  internationalChallenges?: InternationalChallenge[];
  seoAndTraffic?: SEOAndTraffic;
  rating?: Rating;
  tags?: string[];
  marketFocus?: string[];
}

export interface Result {
  metric: string;
  value: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  image?: string;
}

export interface TeamMember {
  name: string;
  position: string;
  bio: string;
  image: string;
  social?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType?: string;
  message: string;
}
