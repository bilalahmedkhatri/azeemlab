'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { teamMembers } from '@/lib/data';
import { motion } from 'framer-motion';
import { Eye, Lightbulb, Target, Handshake } from 'lucide-react';

export default function AboutPage() {
  const coreValues = [
    {
      icon: <Eye className="w-10 h-10" strokeWidth={2} />,
      title: 'Transparency',
      description: 'Clear and honest communication at every step. No hidden costs, no surprises—just straightforward collaboration.'
    },
    {
      icon: <Lightbulb className="w-10 h-10" strokeWidth={2} />,
      title: 'Innovation',
      description: 'We embrace the latest technologies and creative approaches to keep your business ahead of the competition.'
    },
    {
      icon: <Target className="w-10 h-10" strokeWidth={2} />,
      title: 'Results-Driven',
      description: 'Every decision focuses on delivering measurable outcomes that directly impact your business growth.'
    },
    {
      icon: <Handshake className="w-10 h-10" strokeWidth={2} />,
      title: 'Partnership',
      description: 'Your success is our success. We build long-term relationships based on trust and mutual growth.'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-neutral-light to-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-5xl md:text-6xl font-bold text-neutral-dark mb-6">
              About <span className="text-accent">SooooLab</span>
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
                    SooooLab was born from a simple belief: great design and smart strategy shouldn't be exclusive to Fortune 500 companies.
                  </p>
                  <p>
                    We started with a vision to democratize world-class digital services, making them accessible to businesses of all sizes. Today, we're proud to have helped hundreds of companies transform their online presence and achieve measurable growth.
                  </p>
                  <p>
                    Our team combines creative excellence with data-driven strategy to deliver solutions that don't just look good—they perform.
                  </p>
                </div>
              </div>
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/about/our_story.jpg"
                  alt="Our Story - SooooLab Team"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gradient-to-b from-neutral-light to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The principles that guide every decision we make and every project we deliver
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 overflow-hidden text-center">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                    
                    {/* Icon container */}
                    <div className="relative mb-6 flex justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-accent to-accent-dark rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                        <div className="w-10 h-10">
                          {value.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                      <h3 className="font-heading text-2xl font-bold text-neutral-dark mb-4 group-hover:text-accent transition-colors duration-300">
                        {value.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed text-base">
                        {value.description}
                      </p>
                    </div>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-dark transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-gradient-to-b from-white to-neutral-light">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4 text-center">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-600 mb-16 text-center max-w-2xl mx-auto">
              Talented individuals united by passion for exceptional digital experiences
            </p>
            
            {/* Staggered Card Layout */}
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {teamMembers.map((member, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div 
                    key={index} 
                    className={`group ${isEven ? 'md:mt-0' : 'md:mt-12'}`}
                  >
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                      {/* Colored Top Bar */}
                      <div className="h-2 bg-gradient-to-r from-accent to-accent-dark"></div>
                      
                      <div className="p-8">
                        {/* Avatar Area */}
                        <div className="flex items-start gap-6 mb-6">
                          {/* Avatar Circle */}
                          <div className="relative flex-shrink-0">
                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent via-accent-dark to-teal-900 p-1 shadow-lg">
                              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                <span className="text-3xl font-bold text-accent">
                                  {member.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                            </div>
                            {/* Online Status Dot */}
                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-4 border-white"></div>
                          </div>
                          
                          {/* Name & Position */}
                          <div className="flex-1 pt-2">
                            <h3 className="font-heading text-2xl font-bold text-neutral-dark mb-1">
                              {member.name}
                            </h3>
                            <p className="text-accent font-semibold text-sm uppercase tracking-wide mb-3">
                              {member.position}
                            </p>
                            
                            {/* Social Links */}
                            {member.social && (
                              <div className="flex gap-3">
                                {member.social.linkedin && (
                                  <a 
                                    href={member.social.linkedin} 
                                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300 group/icon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                  </a>
                                )}
                                {member.social.twitter && (
                                  <a 
                                    href={member.social.twitter} 
                                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                                    </svg>
                                  </a>
                                )}
                                {member.social.github && (
                                  <a 
                                    href={member.social.github} 
                                    className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bio */}
                        <div className="pl-0">
                          <p className="text-gray-600 leading-relaxed text-base mb-6">
                            {member.bio}
                          </p>

                          {/* Skills/Expertise Pills */}
                          <div className="flex flex-wrap gap-2">
                            <span className="px-4 py-1.5 bg-teal-50 text-accent text-xs font-semibold rounded-full border border-teal-100">
                              Expert
                            </span>
                            <span className="px-4 py-1.5 bg-purple-50 text-purple-600 text-xs font-semibold rounded-full border border-purple-100">
                              Certified
                            </span>
                            <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">
                              5+ Years
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Accent */}
                      <div className="h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Team Culture Section */}
            <div className="mt-20 grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg font-bold mb-2">Collaborative Culture</h4>
                <p className="text-gray-600 text-sm">We work together, share ideas, and celebrate wins as one united team.</p>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg font-bold mb-2">Always Learning</h4>
                <p className="text-gray-600 text-sm">Continuous growth mindset keeps us ahead of industry trends and technologies.</p>
              </div>

              <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-heading text-lg font-bold mb-2">Remote-First</h4>
                <p className="text-gray-600 text-sm">Work from anywhere while staying connected and delivering excellence globally.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent to-accent-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Willing to JOIN US?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              We're always looking for talented, passionate individuals who want to make a real impact. Join a team that values innovation, creativity, and your personal growth. Work on exciting projects, collaborate with industry experts, and build a career you're proud of.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/careers" variant="secondary" size="lg">
                Apply Now →
              </Button>
            </div>
            <p className="mt-6 text-sm opacity-75">
              Remote-friendly • Competitive compensation • Continuous learning opportunities
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
