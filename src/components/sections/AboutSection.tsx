import React from 'react';
import { Button } from '../ui/Button';
import { Target, Lightbulb, Handshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Why Choose <span className="text-primary">AzeemLab</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We're not just another digital agency. We're your growth partners, combining creative excellence with data-driven strategies to deliver measurable results.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our team of experts brings together years of experience in web design, branding, and digital marketing to help businesses of all sizes reach their full potential online.
              </p>
              <Button href="/about" variant="outline">
                Learn More About Us
              </Button>
            </div>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    Results-Focused
                  </h3>
                  <p className="text-muted-foreground">
                    Every project is designed with your ROI in mind. We measure success by your growth.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    Creative Innovation
                  </h3>
                  <p className="text-muted-foreground">
                    We stay ahead of trends to deliver cutting-edge solutions that set you apart.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 rounded-lg p-3">
                  <Handshake className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    True Partnership
                  </h3>
                  <p className="text-muted-foreground">
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
