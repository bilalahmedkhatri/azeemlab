'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { caseStudies } from '@/lib/data';
import { fadeInUp, staggerContainer } from '@/lib/animations';
import { ArrowRight, TrendingUp, Award, ExternalLink } from 'lucide-react';

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Hero Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Award className="w-4 h-4" />
              <span>Our Success Stories</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              Transforming Ideas Into{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Digital Success
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              Real projects. Real results. Discover how we've helped businesses achieve remarkable growth through innovative digital solutions.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 pb-24">
        <div className="container mx-auto px-6">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground mb-12 text-lg"
          >
            Showcasing <span className="font-bold text-primary">{caseStudies.length}</span> successful projects
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <motion.div
                key={caseStudy.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/portfolio/${caseStudy.slug}`}>
                  <Card className="h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border-2 border-transparent hover:border-primary/20 bg-white">
                    {/* Image Header with Gradient Overlay */}
                    <div className="relative h-56 overflow-hidden">
                      {/* Background Image */}
                      {caseStudy.heroImage && (
                        <Image
                          src={caseStudy.heroImage}
                          alt={caseStudy.title}
                          fill
                          className="object-cover"
                        />
                      )}
                      
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Project Title */}
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {caseStudy.title}
                      </h3>
                      
                      <p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                        {caseStudy.challenge}
                      </p>
                      
                      {/* Results Preview */}
                      <div className="space-y-3 mb-6">
                        {caseStudy.results.slice(0, 2).map((result, idx) => (
                          <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-colors duration-300">
                            <div className="bg-primary/10 p-2 rounded-lg shrink-0">
                              <TrendingUp className="w-4 h-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-bold text-lg text-foreground">{result.value}</div>
                              <div className="text-xs text-muted-foreground truncate">{result.metric}</div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* View Project Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors">
                          View Case Study
                        </span>
                        <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                          <ArrowRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-4xl md:text-5xl font-bold text-white mb-6"
            >
              Ready to Write Your Success Story?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-white/90 mb-10"
            >
              Let's create something extraordinary together. Transform your vision into a digital masterpiece.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Start Your Project
                <ExternalLink className="w-5 h-5" />
              </Link>
              <Link 
                href="/services"
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white border-2 border-white/30 px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
              >
                Explore Services
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
