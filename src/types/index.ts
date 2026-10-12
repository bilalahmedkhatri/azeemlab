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
  faq?: FAQItem[];
  locationPages?: LocationPage[];
  leadMagnet?: LeadMagnet;
  highlights?: ServiceHighlight[];
  techStack?: string[];
  relatedCaseStudies?: string[];
}

export interface ServiceHighlight {
  icon: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface LocationPage {
  slug: string;
  city: string;
  headline: string;
  description?: string;
  metaTitle?: string;
  metaDescription?: string;
  images?: LocationImage[];
  issues?: { title: string; body: string }[];
  paragraphs?: ContentParagraph[];
  relatedLinks?: { text: string; href: string }[];
  cta?: {
    primary: string;
    secondary: string;
    href: string;
  };
}

export interface LocationImage {
  imageAfterIndex?: number | null;
  src: string;
  localPath: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  loading: 'eager' | 'lazy';
  fetchpriority: 'high' | 'auto' | 'low';
  schema: {
    '@type': string;
    contentUrl: string;
    description: string;
    license: string;
    creditText: string;
  };
  credit: string;
  unsplashUrl: string;
}

export interface ContentParagraph {
  id: string;
  imageAfterIndex?: number | null;
  text: string;
  isHeading?: boolean;
  headingLevel?: number;
  heading?: string | null;
}

export interface LeadMagnet {
  title: string;
  description: string;
  fileName: string;
  ctaText: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  ctaText: string;
  ctaHref: string;
  relatedKeywords: string[];
  internalLinks: { text: string; href: string }[];
  hasFreeDownload?: boolean;
  downloadFile?: string;
  faqSection?: { q: string; a: string }[];
  seoNote?: string;
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
  aiTags?: string[];
  technicalDetails?: {
    aiModel: string;
    knowledgeBase: string;
    integrations: string[];
    deployment: string;
    trainingTime: string;
  };
  internalLinkAnchors?: { text: string; href: string }[];
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
