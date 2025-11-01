export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
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
