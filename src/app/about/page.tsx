import React from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { teamMembers } from '@/lib/data';

export default function AboutPage() {
  const coreValues = [
    {
      icon: '🎯',
      title: 'Transparency',
      description: 'We believe in honest communication and clear expectations at every step.'
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'We stay ahead of trends to deliver cutting-edge solutions that set you apart.'
    },
    {
      icon: '📈',
      title: 'Impact',
      description: 'Every decision is measured by the tangible results it creates for your business.'
    },
    {
      icon: '🤝',
      title: 'Partnership',
      description: 'Your success is our success. We&apos;re committed to your long-term growth.'
    },
  ];

  const process = [
    {
      step: '1',
      title: 'Discovery',
      description: 'We learn about your business, goals, and challenges'
    },
    {
      step: '2',
      title: 'Strategy',
      description: 'We develop a customized plan to achieve your objectives'
    },
    {
      step: '3',
      title: 'Execution',
      description: 'We bring the strategy to life with expert implementation'
    },
    {
      step: '4',
      title: 'Growth',
      description: 'We measure, optimize, and scale for continued success'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-light to-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-neutral-dark mb-6">
              About <span className="text-accent">AzeemLab</span>
            </h1>
            <p className="text-xl text-gray-600">
              We're on a mission to help businesses grow through exceptional digital experiences
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-lg text-gray-600">
                  <p>
                    AzeemLab was born from a simple belief: great design and smart strategy shouldn't be exclusive to Fortune 500 companies.
                  </p>
                  <p>
                    We started with a vision to democratize world-class digital services, making them accessible to businesses of all sizes. Today, we're proud to have helped hundreds of companies transform their online presence and achieve measurable growth.
                  </p>
                  <p>
                    Our team combines creative excellence with data-driven strategy to deliver solutions that don't just look good—they perform.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-accent to-accent-dark h-96 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="font-heading text-xl font-bold text-neutral-dark mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-12 text-center">
              How We Work
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              {process.map((item, index) => (
                <div key={index} className="relative">
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-6 left-1/2 w-full h-0.5 bg-accent opacity-20"></div>
                  )}
                  <div className="relative text-center">
                    <div className="bg-accent text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 relative z-10">
                      {item.step}
                    </div>
                    <h3 className="font-heading text-xl font-bold text-neutral-dark mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-neutral-light">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-4xl font-bold text-neutral-dark mb-4 text-center">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 mb-12 text-center">
              The talented people behind your success
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center">
                  <div className="bg-gradient-to-br from-accent to-accent-dark h-48 rounded-lg mb-4"></div>
                  <h3 className="font-heading text-xl font-bold text-neutral-dark mb-1">
                    {member.name}
                  </h3>
                  <p className="text-accent font-semibold text-sm mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  {member.social && (
                    <div className="flex justify-center gap-3">
                      {member.social.linkedin && (
                        <a href={member.social.linkedin} className="text-accent hover:text-accent-dark transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                        </a>
                      )}
                      {member.social.twitter && (
                        <a href={member.social.twitter} className="text-accent hover:text-accent-dark transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                          </svg>
                        </a>
                      )}
                      {member.social.github && (
                        <a href={member.social.github} className="text-accent hover:text-accent-dark transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent to-accent-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Let's Work Together
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Ready to take your business to the next level? We'd love to hear about your project.
            </p>
            <Button href="/contact" variant="secondary" size="lg">
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
