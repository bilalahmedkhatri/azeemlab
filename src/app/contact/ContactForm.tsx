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
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="Tell us about your project..."
        rows={6}
      />
      
      {submitStatus === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          Thank you for your inquiry! We&apos;ll get back to you within 24 hours.
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          Something went wrong. Please try again or email us directly.
        </div>
      )}
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send My Inquiry'}
      </Button>
    </form>
  );
}
