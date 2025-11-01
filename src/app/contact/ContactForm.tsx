'use client';

import React, { useState } from 'react';
import { Input, TextArea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For now, just log the data (replace with actual API call)
    console.log('Form submitted:', formData);
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      projectType: '',
      message: ''
    });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitStatus('idle'), 5000);
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
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
        placeholder="John Doe"
      />
      
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        placeholder="john@example.com"
      />
      
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
        rows={6}
      />
      
      {/* Privacy & Security Notice */}
      <div className="bg-neutral-light border border-gray-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div className="text-sm text-gray-600">
            <strong className="text-neutral-dark">🔒 Your Privacy Matters</strong>
            <p className="mt-1">
              We respect your privacy and will never share your information with third parties. 
              Your data is encrypted and stored securely. By submitting this form, you agree to our{' '}
              <a href="/privacy" className="text-accent hover:text-accent-dark underline">
                Privacy Policy
              </a>.
            </p>
          </div>
        </div>
      </div>
      
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          <strong>✓ Message sent successfully!</strong> We&apos;ll get back to you within 24 hours.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          <strong>✗ Something went wrong.</strong> Please try again or email us directly at bilalahmedkhatri@outlook.com
        </div>
      )}
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending Your Message...' : 'Send My Inquiry →'}
      </Button>

      {/* Response Time Promise */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span><strong>Quick Response:</strong> We typically reply within 2-4 business hours</span>
      </div>
    </form>
  );
}
