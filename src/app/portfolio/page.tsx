'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { caseStudies } from '@/lib/data';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { ArrowRight, TrendingUp, Zap } from 'lucide-react';

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  
  const categories = ['All', ...Array.from(new Set(caseStudies.map(cs => cs.category)))];
  
  const filteredCaseStudies = caseStudies
    .filter(cs => activeFilter === 'All' || cs.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h1 
              variants={fadeInUp}
              className="font-heading text-5xl md:text-6xl font-bold text-foreground mb-6"
            >
              Our <span className="text-primary">Portfolio</span>
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground"
            >
              Real projects. Real results. See how we've helped businesses grow and succeed.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-8 bg-background/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveFilter(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-semibold transition-all text-sm ${
                  activeFilter === category
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted text-muted-foreground hover:bg-card'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-muted-foreground mb-8"
          >
            Showing {filteredCaseStudies.length} {filteredCaseStudies.length === 1 ? 'project' : 'projects'}
          </motion.p>

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredCaseStudies.map((caseStudy) => (
                <motion.div
                  key={caseStudy.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group"
                >
                  <Link href={`/portfolio/${caseStudy.slug}`}>
                    <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                      <div className="relative h-48">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary/50"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <h3 className="font-heading text-2xl font-bold text-white text-center p-4">
                            {caseStudy.title}
                          </h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <span className="inline-block bg-secondary/10 text-secondary text-xs font-semibold px-3 py-1 rounded-full mb-4">
                          {caseStudy.category}
                        </span>
                        <p className="text-muted-foreground mb-6 line-clamp-3">{caseStudy.challenge}</p>
                        
                        <div className="space-y-4 mb-6">
                          {caseStudy.results.slice(0, 2).map((result, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="bg-primary/10 p-2 rounded-full">
                                {index === 0 ? <TrendingUp className="w-5 h-5 text-primary" /> : <Zap className="w-5 h-5 text-primary" />}
                              </div>
                              <div>
                                <div className="font-bold text-foreground">{result.value}</div>
                                <div className="text-sm text-muted-foreground">{result.metric}</div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border">
                          <span className="text-sm font-semibold text-primary">View Project</span>
                          <ArrowRight className="w-5 h-5 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredCaseStudies.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground mb-4">No projects found</p>
              <p className="text-sm text-muted-foreground/80">Try adjusting your filters</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-6">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 
              variants={fadeInUp}
              className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6"
            >
              Want Results Like These?
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-muted-foreground mb-8"
            >
              Let's discuss how we can help you achieve similar success.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <a href="/contact" className="btn-flip" data-back="Get a Quote" data-front="Start Your Project"></a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
