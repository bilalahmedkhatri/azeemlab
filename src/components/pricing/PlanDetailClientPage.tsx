"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Check, ArrowLeft, Rocket, Zap, Shield, Clock, Users, Code, Database, Cloud, Bot, TrendingUp, HeadphonesIcon, Globe, Search, Palette, ShoppingCart, BarChart } from 'lucide-react';
import Link from 'next/link';

interface PlanDetails {
  name: string;
  price: number;
  description: string;
  tagline: string;
  icon: React.ReactNode;
  features: {
    category: string;
    items: string[];
  }[];
  benefits: string[];
  idealFor: string[];
  deliverables: string[];
  timeline: string;
  support: string;
}

const planDetails: Record<string, PlanDetails> = {
  starter: {
    name: 'Starter',
    price: 500,
    description: 'Perfect for individuals and small teams getting started with their online presence.',
    tagline: 'Launch Your Digital Presence',
    icon: <Rocket className="w-12 h-12" />,
    features: [
      {
        category: 'Design & Development',
        items: [
          'Custom Landing Page Design',
          'Fully Responsive Mobile-First Design',
          'Modern UI/UX Best Practices',
          'Cross-Browser Compatibility',
          'Fast Loading Performance',
        ],
      },
      {
        category: 'SEO & Marketing',
        items: [
          'Basic On-Page SEO Setup',
          'Meta Tags & Descriptions',
          'Google Analytics Integration',
          'Sitemap Generation',
          'Social Media Meta Tags',
        ],
      },
      {
        category: 'Content & Branding',
        items: [
          'Contact Form Integration',
          'Brand Color Scheme Implementation',
          'Typography Optimization',
          'Image Optimization',
        ],
      },
      {
        category: 'Support & Hosting',
        items: [
          'Standard Email Support',
          'Deployment Assistance',
          '30-Day Bug Fix Guarantee',
          'Documentation & Training',
        ],
      },
    ],
    benefits: [
      'Professional online presence in days',
      'Mobile-optimized for all devices',
      'Search engine ready',
      'Cost-effective solution',
    ],
    idealFor: [
      'Freelancers & Consultants',
      'Small Local Businesses',
      'Personal Portfolios',
      'Startup MVPs',
    ],
    deliverables: [
      'Fully functional landing page',
      'Source code & assets',
      'Basic documentation',
      'SEO setup guide',
    ],
    timeline: '1-2 weeks',
    support: 'Email support (48-hour response)',
  },
  business: {
    name: 'Business',
    price: 1200,
    description: 'Ideal for growing businesses that need advanced features and comprehensive digital solutions.',
    tagline: 'Scale Your Business Online',
    icon: <TrendingUp className="w-12 h-12" />,
    features: [
      {
        category: 'Design & Development',
        items: [
          '5-Page Custom Website',
          'Advanced UI/UX Design',
          'Interactive Animations & Transitions',
          'Custom Component Library',
          'Performance Optimization',
          'Progressive Web App (PWA) Features',
        ],
      },
      {
        category: 'Content Management',
        items: [
          'Headless CMS Integration (Sanity/Contentful)',
          'Easy Content Editing Interface',
          'Media Management System',
          'Blog/News Section',
          'Dynamic Content Updates',
        ],
      },
      {
        category: 'SEO & Analytics',
        items: [
          'Advanced SEO Optimization',
          'Schema Markup Implementation',
          'Google Analytics 4 Setup',
          'Search Console Integration',
          'Performance Monitoring',
          'Conversion Tracking',
        ],
      },
      {
        category: 'AI & Automation',
        items: [
          'AI-Powered Content Suggestions',
          'Smart Search Functionality',
          'Automated Meta Description Generation',
          'Content Optimization Recommendations',
        ],
      },
      {
        category: 'Support & Maintenance',
        items: [
          'Priority Support (24-hour response)',
          '3 Months Post-Launch Support',
          'Monthly Performance Reports',
          'Content Update Training',
          'Security Updates',
        ],
      },
    ],
    benefits: [
      'Complete business website solution',
      'Easy content management',
      'AI-powered optimizations',
      'Scalable architecture',
      'Better search rankings',
    ],
    idealFor: [
      'Growing Businesses',
      'Service-Based Companies',
      'Marketing Agencies',
      'Professional Services',
    ],
    deliverables: [
      '5 fully designed & developed pages',
      'CMS with training',
      'SEO strategy document',
      'Analytics dashboard setup',
      'Complete source code',
    ],
    timeline: '3-4 weeks',
    support: 'Priority support (24-hour response)',
  },
  enterprise: {
    name: 'Enterprise',
    price: 2000,
    description: 'Comprehensive solution for large-scale applications with advanced features and dedicated support.',
    tagline: 'Enterprise-Grade Solutions',
    icon: <Shield className="w-12 h-12" />,
    features: [
      {
        category: 'Full-Stack Development',
        items: [
          'Custom Web Application',
          'Complex Backend Architecture',
          'RESTful API Development',
          'Database Design & Implementation',
          'User Authentication & Authorization',
          'Role-Based Access Control',
          'Admin Dashboard',
        ],
      },
      {
        category: 'E-commerce Features',
        items: [
          'Product Catalog Management',
          'Shopping Cart & Checkout',
          'Payment Gateway Integration (Stripe/PayPal)',
          'Inventory Management',
          'Order Processing System',
          'Customer Account Management',
        ],
      },
      {
        category: 'AI Integration',
        items: [
          'Dedicated AI Chatbot',
          'Natural Language Processing',
          'Automated Customer Support',
          'Smart Recommendations',
          'Sentiment Analysis',
          'AI-Powered Search',
        ],
      },
      {
        category: 'Infrastructure & Security',
        items: [
          'Cloud Hosting Setup (AWS/Vercel)',
          'SSL Certificate & HTTPS',
          'DDoS Protection',
          'Automated Backups',
          'Load Balancing',
          'CDN Integration',
          'Security Audits',
        ],
      },
      {
        category: 'Analytics & Monitoring',
        items: [
          'Advanced Analytics Dashboard',
          'Real-time Performance Monitoring',
          'Error Tracking & Logging',
          'User Behavior Analytics',
          'A/B Testing Framework',
        ],
      },
      {
        category: 'Premium Support',
        items: [
          '24/7 Premium Support',
          'Dedicated Account Manager',
          'Monthly Strategy Calls',
          '6 Months Post-Launch Support',
          'Priority Bug Fixes',
          'Feature Enhancement Consultations',
        ],
      },
    ],
    benefits: [
      'Enterprise-level scalability',
      'Advanced AI capabilities',
      'Complete e-commerce solution',
      'Dedicated support team',
      'Maximum security & performance',
    ],
    idealFor: [
      'Large Enterprises',
      'E-commerce Businesses',
      'SaaS Companies',
      'High-Traffic Applications',
    ],
    deliverables: [
      'Full-stack web application',
      'Complete API documentation',
      'Admin panel & documentation',
      'Cloud infrastructure setup',
      'Training & onboarding sessions',
      'Source code & deployment guides',
    ],
    timeline: '6-8 weeks',
    support: '24/7 Premium support with dedicated manager',
  },
};

interface PlanDetailClientPageProps {
  planSlug: string;
}

export default function PlanDetailClientPage({ planSlug }: PlanDetailClientPageProps) {
  const plan = planDetails[planSlug.toLowerCase()];

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Plan Not Found</h1>
          <Button href="/pricing">Back to Pricing</Button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-15">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <div className="inline-block bg-primary/10 text-primary p-6 rounded-2xl mb-6">
              {plan.icon}
            </div>
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-4">
              {plan.name} Plan
            </h1>
            <p className="text-2xl text-primary font-semibold mb-4">{plan.tagline}</p>
            <p className="text-xl text-muted-foreground mb-8">
              {plan.description}
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-foreground">${plan.price}</div>
                <div className="text-muted-foreground">one-time payment</div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/contact" size="lg" className="text-lg px-8">
                Get Started Now
              </Button>
              <Button href="/pricing" variant="outline" size="lg" className="text-lg px-8">
                Compare Plans
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Info */}
      <section className="py-12 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Timeline</h3>
              <p className="text-muted-foreground">{plan.timeline}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <HeadphonesIcon className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Support</h3>
              <p className="text-muted-foreground">{plan.support}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Zap className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold text-lg mb-2">Delivery</h3>
              <p className="text-muted-foreground">Fast & Reliable</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              Everything Included
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive features designed to meet your needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {plan.features.map((category, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border rounded-xl p-8"
              >
                <h3 className="text-2xl font-bold font-heading mb-6 text-foreground">
                  {category.category}
                </h3>
                <ul className="space-y-4">
                  {category.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-4xl font-bold mb-4">Key Benefits</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-6">
              {plan.benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 bg-card p-6 rounded-lg"
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Check className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-lg">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-4xl font-bold mb-4">Ideal For</h2>
              <p className="text-xl text-muted-foreground">
                This plan is perfect for:
              </p>
            </motion.div>
            <div className="grid sm:grid-cols-2 gap-6">
              {plan.idealFor.map((target, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-card border border-border p-6 rounded-lg text-center"
                >
                  <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-lg font-semibold">{target}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-heading text-4xl font-bold mb-4">What You'll Receive</h2>
            </motion.div>
            <div className="grid md:grid-cols-2 gap-4">
              {plan.deliverables.map((deliverable, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-center gap-4 bg-card p-6 rounded-lg"
                >
                  <Check className="w-6 h-6 text-primary flex-shrink-0" />
                  <p className="text-lg">{deliverable}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
