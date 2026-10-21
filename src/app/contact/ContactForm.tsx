'use client';

import React, { useState } from 'react';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

const enquiryErrors: Record<string, string> = {
  'Message is too large.': 'Message is too large.',
  'Please send valid form data.': 'Please send valid form data.',
  'Please check your name, email, service and project details (10–5,000 characters).': 'Please check your name, email, service and project details (10–5,000 characters).',
  'The enquiry form is temporarily unavailable. Please email bilal.azeemlab@gmail.com.': 'The enquiry form is temporarily unavailable. Please email bilal.azeemlab@gmail.com.',
  'Your enquiry could not be delivered. Please email bilal.azeemlab@gmail.com.': 'Your enquiry could not be delivered. Please email bilal.azeemlab@gmail.com.',
};

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Points to your general Next.js API route
      const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        setErrorMessage(enquiryErrors[result.error] || 'Your enquiry could not be delivered.');
        setSubmitStatus('error');
        return;
      }
      const analytics = window as Window & { gtag?: (...args: unknown[]) => void };
      analytics.gtag?.('event', 'generate_lead', { method: 'contact_form', service: formData.projectType });

      setSubmitStatus('success');
      // Reset all fields
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
    } catch (error) {
      setErrorMessage('Your enquiry could not be delivered.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);

    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Name"
        autoComplete="name"
        maxLength={120}
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="John Doe"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Email"
          autoComplete="email"
          maxLength={254}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
        />

        <Input
          label="Phone number (optional)"
          autoComplete="tel"
          maxLength={60}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+92 300 1234567"
        />
      </div>

      <Select
        label="Project Type"
        name="projectType"
        value={formData.projectType}
        onChange={handleChange}
        required
      >
        <option value="">Select a service...</option>
        <option value="web-design">Web Design & Development</option>
        <option value="branding">Branding & Identity</option>
        <option value="seo">SEO & Marketing</option>
        <option value="ecommerce">E-Commerce Solutions</option>
        <option value="ai-integrations">AI Chatbots & Integration</option>
        <option value="ai-automation">Business Workflow Automation</option>
        <option value="consulting">Strategy Consulting</option>
        <option value="other">Other</option>
      </Select>

      <TextArea
        label="Tell us about your project"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="Share details about your goals, timeline, and any specific requirements..."
        minLength={10}
        maxLength={5000}
        rows={6}
      />

      <div className="bg-neutral-light border border-gray-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div className="text-sm text-gray-600">
            <strong className="text-neutral-dark">🔒 Your Privacy Matters</strong>
            <p className="mt-1">
              Your details are used to respond to your project enquiry. <a href="/privacy" className="underline">Read our privacy policy</a> for more information.
            </p>
          </div>
        </div>
      </div>

      {submitStatus === 'success' && (
        <div role="status" className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          <strong>✓ Message sent successfully!</strong> Your enquiry has been delivered to our team.
        </div>
      )}

      {submitStatus === 'error' && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <strong>Enquiry not delivered.</strong> {errorMessage} <a className="underline" href="mailto:bilal.azeemlab@gmail.com">Email our team</a>.
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending enquiry…' : 'Send My Inquiry →'}
      </Button>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Share your goals and preferred timeline so we can discuss the next steps.</span>
      </div>
    </form>
  );
}
