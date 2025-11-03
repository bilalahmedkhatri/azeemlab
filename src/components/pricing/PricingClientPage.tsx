"use client";

import { Check, X, Minus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/sections/CTASection';
import { motion } from 'framer-motion';
import React from 'react';

const plans = {
  starter: {
    name: 'Starter',
    price: 500,
    priceType: 'One-Time',
    description: 'Perfect for a professional online presence.',
  },
  business: {
    name: 'Business',
    price: 1200,
    priceType: 'One-Time',
    description: 'For growing businesses ready to scale.',
  },
  enterprise: {
    name: 'Enterprise',
    price: 2000,
    priceType: 'One-Time',
    description: 'Ultimate solution for industry leaders.',
  },
};

const allFeatures = [
    { category: 'Core Website', features: [
        { name: 'Custom Pages', starter: 'Up to 3', business: 'Up to 10', enterprise: 'Unlimited' },
        { name: 'Responsive Design', starter: true, business: true, enterprise: true },
        { name: 'Stock Photos', starter: 'Basic', business: 'Premium', enterprise: 'Custom Photoshoot' },
        { name: 'Design Revisions', starter: 2, business: 5, enterprise: 'Unlimited' },
        { name: 'Contact Form', starter: true, business: true, enterprise: true },
        { name: 'Social Media Integration', starter: true, business: true, enterprise: true },
    ]},
    { category: 'Content & SEO', features: [
        { name: 'CMS Integration', starter: false, business: true, enterprise: true },
        { name: 'Basic SEO Setup', starter: true, business: true, enterprise: true },
        { name: 'Advanced SEO & Analytics', starter: false, business: true, enterprise: true },
        { name: 'Blog Setup', starter: false, business: true, enterprise: true },
        { name: 'XML Sitemap', starter: true, business: true, enterprise: true },
    ]},
    { category: 'AI Features', features: [
        { name: 'AI Content Suggestions', starter: false, business: true, enterprise: true },
        { name: 'AI-Generated SEO Meta Tags', starter: false, business: 'Basic', enterprise: 'Advanced' },
        { name: 'AI Image Optimization', starter: false, business: true, enterprise: true },
        { name: 'Dedicated AI Chatbot', starter: false, business: false, enterprise: true },
        { name: 'AI Personalization Engine', starter: false, business: false, enterprise: true },
        { name: 'AI Predictive Analytics', starter: false, business: false, enterprise: true },
        { name: 'Automated A/B Testing', starter: false, business: false, enterprise: true },
        { name: 'Voice Search Optimization', starter: false, business: false, enterprise: true },
    ]},
    { category: 'E-commerce', features: [
        { name: 'E-commerce Functionality', starter: false, business: 'Basic (up to 20 products)', enterprise: 'Advanced (unlimited)' },
        { name: 'Payment Gateway Integration', starter: false, business: true, enterprise: true },
        { name: 'Inventory Management', starter: false, business: 'Basic', enterprise: 'Advanced' },
        { name: 'AI Fraud Detection', starter: false, business: false, enterprise: true },
        { name: 'Dynamic Pricing AI', starter: false, business: false, enterprise: true },
    ]},
    { category: 'Technical & Support', features: [
        { name: 'API Integrations', starter: false, business: 'Up to 3', enterprise: 'Unlimited' },
        { name: 'Cloud Hosting Setup', starter: false, business: true, enterprise: true },
        { name: 'Security Audit', starter: false, business: true, enterprise: true },
        { name: 'Load Time Optimization', starter: true, business: true, enterprise: true },
        { name: '24/7 Premium Support', starter: false, business: false, enterprise: true },
        { name: 'Dedicated Project Manager', starter: false, business: false, enterprise: true },
        { name: 'Code & Database Backup', starter: 'Weekly', business: 'Daily', enterprise: 'Real-time' },
        { name: 'Uptime Monitoring', starter: false, business: true, enterprise: true },
        { name: 'Staging Environment', starter: false, business: true, enterprise: true },
        { name: 'Performance Scaling', starter: false, business: false, enterprise: true },
        { name: 'GDPR/CCPA Compliance Kit', starter: false, business: true, enterprise: true },
        { name: 'Accessibility (WCAG) Audit', starter: false, business: true, enterprise: true },
        { name: 'API & Webhook Support', starter: false, business: false, enterprise: true },
        { name: 'Multi-language Support', starter: false, business: false, enterprise: true },
        { name: 'User Role Management', starter: false, business: 'Basic', enterprise: 'Advanced' },
        { name: 'Single Sign-On (SSO)', starter: false, business: false, enterprise: true },
        { name: 'DevOps & CI/CD Pipeline', starter: false, business: false, enterprise: true },
        { name: 'Source Code Ownership', starter: true, business: true, enterprise: true },
        { name: 'Training & Documentation', starter: 'Basic', business: 'Standard', enterprise: 'Comprehensive' },
        { name: 'Quarterly Strategy Reviews', starter: false, business: false, enterprise: true },
        { name: 'Sentiment Analysis AI', starter: false, business: false, enterprise: true },
        { name: 'Automated Reporting', starter: false, business: true, enterprise: true },
        { name: 'CRM Integration', starter: false, business: 'Basic', enterprise: 'Advanced' },
        { name: 'Marketing Automation', starter: false, business: 'Basic', enterprise: 'Advanced' },
        { name: 'Subscription Management', starter: false, business: 'Basic', enterprise: 'Advanced' },
        { name: 'Headless CMS Architecture', starter: false, business: false, enterprise: true },
        { name: 'GraphQL API', starter: false, business: false, enterprise: true },
        { name: 'Serverless Functions', starter: false, business: false, enterprise: true },
        { name: 'Real-time Collaboration Tools', starter: false, business: false, enterprise: true },
    ]},
];

const renderFeature = (value: any) => {
  if (typeof value === 'boolean') {
    return value ? <Check className="text-green-500 mx-auto" /> : <X className="text-red-500 mx-auto" />;
  }
  if (typeof value === 'string' || typeof value === 'number') {
    return <span className="text-sm">{value}</span>;
  }
  return <Minus className="text-gray-400 mx-auto" />;
};

export default function PricingClientPage() {
  return (
    <div className="bg-background text-foreground">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="py-20 md:py-28 text-center bg-neutral-light"
      >
        <div className="container mx-auto px-6">
          <h1 className="font-heading text-5xl md:text-6xl font-bold">Find Your Perfect Plan</h1>
          <p className="text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
            Transparent pricing for projects of all sizes. From simple landing pages to complex AI-driven platforms, we have a solution for you.
          </p>
        </div>
      </motion.section>

      {/* Pricing Table */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left">
              <thead>
                <tr>
                  <th className="p-4 w-1/4"></th>
                  {Object.values(plans).map(plan => (
                    <th key={plan.name} className="p-4 w-1/4 text-center border-b-2 border-border">
                      <h3 className="text-2xl font-bold font-heading">{plan.name}</h3>
                      <p className="text-4xl font-bold">${plan.price}</p>
                      <p className="text-muted-foreground text-sm">{plan.priceType}</p>
                      <Button href="/contact" size="md" className="mt-4 w-full">Get Started</Button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allFeatures.map(category => (
                  <React.Fragment key={category.category}>
                    <tr>
                      <td colSpan={4} className="p-4 bg-neutral-light">
                        <h4 className="text-lg font-bold font-heading">{category.category}</h4>
                      </td>
                    </tr>
                    {category.features.map(feature => (
                      <tr key={feature.name} className="border-b border-border">
                        <td className="p-4 font-medium">{feature.name}</td>
                        <td className="p-4 text-center">{renderFeature((feature as any).starter)}</td>
                        <td className="p-4 text-center">{renderFeature((feature as any).business)}</td>
                        <td className="p-4 text-center">{renderFeature((feature as any).enterprise)}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
