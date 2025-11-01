import React from 'react';
import { Button } from '../ui/Button';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-6">
                Why Choose <span className="text-accent">AzeemLab</span>?
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We're not just another digital agency. We're your growth partners, combining creative excellence with data-driven strategies to deliver measurable results.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of experts brings together years of experience in web design, branding, and digital marketing to help businesses of all sizes reach their full potential online.
              </p>
              <Button href="/about" variant="outline">
                Learn More About Us
              </Button>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-3xl">🎯</div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-neutral-dark mb-2">
                    Results-Focused
                  </h3>
                  <p className="text-gray-600">
                    Every project is designed with your ROI in mind. We measure success by your growth.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">💡</div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-neutral-dark mb-2">
                    Creative Innovation
                  </h3>
                  <p className="text-gray-600">
                    We stay ahead of trends to deliver cutting-edge solutions that set you apart.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-3xl">🤝</div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-neutral-dark mb-2">
                    True Partnership
                  </h3>
                  <p className="text-gray-600">
                    Your success is our success. We're with you every step of the journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
