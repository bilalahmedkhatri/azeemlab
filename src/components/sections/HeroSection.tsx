'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { BrainCircuit, Bot, AppWindow, Database } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-background py-20 md:py-32 text-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
            🚀 Digital Growth, Simplified.
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Turn Your Business Into a <span className="text-primary">Digital Powerhouse</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto">
            We partner with ambitious businesses to create stunning websites, memorable brands, and data-driven marketing strategies that deliver measurable growth.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button href="/contact" size="lg">
              Start Your Project →
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              View Success Stories
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground mb-6 font-medium">Trusted by Innovative Startups</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-muted-foreground/70">
            <div className="flex items-center gap-3">
                <BrainCircuit className="w-7 h-7" />
                <span className="text-xl font-semibold">QuantumLeap</span>
            </div>
            <div className="flex items-center gap-3">
                <Bot className="w-7 h-7" />
                <span className="text-xl font-semibold">NextGen</span>
            </div>
            <div className="flex items-center gap-3">
                <AppWindow className="w-7 h-7" />
                <span className="text-xl font-semibold">InnovateHub</span>
            </div>
            <div className="flex items-center gap-3">
                <Database className="w-7 h-7" />
                <span className="text-xl font-semibold">DataSphere</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
