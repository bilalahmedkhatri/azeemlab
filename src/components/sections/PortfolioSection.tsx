'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { caseStudies } from '@/lib/data';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Zap, CheckCircle } from 'lucide-react';
import Image from 'next/image';

export const PortfolioSection: React.FC = () => {
  const featuredCase = caseStudies[0];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            Proven Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real projects, real impact. See how we've helped businesses grow.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="max-w-5xl mx-auto mb-12 overflow-hidden group">
            <div className="grid md:grid-cols-2">
              <div className="relative h-80 md:h-auto overflow-hidden">
                <Image 
                  src={featuredCase.heroImage}
                  alt={featuredCase.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-8">
                    <h3 className="font-heading text-3xl font-bold text-white">
                        {featuredCase.title}
                    </h3>
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <p className="text-muted-foreground mb-6">
                  {featuredCase.challenge}
                </p>
                <div className="space-y-4 mb-8">
                  {featuredCase.results.map((result, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <div className="bg-primary/10 p-2 rounded-full">
                        {index === 0 && <TrendingUp className="w-6 h-6 text-primary" />}
                        {index === 1 && <Zap className="w-6 h-6 text-primary" />}
                        {index === 2 && <CheckCircle className="w-6 h-6 text-primary" />}
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">{result.value}</div>
                        <div className="text-sm text-muted-foreground">{result.metric}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <Button href={`/portfolio/${featuredCase.slug}`} variant="outline" className="self-start">
                  View Case Study <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <div className="text-center">
          <Button href="/portfolio" size="lg">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};
