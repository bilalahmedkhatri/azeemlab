'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ProcessSectionProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({
  steps,
  title = 'How We Work',
  subtitle = 'Our proven process for delivering exceptional results',
  className = '',
}) => {
  return (
    <section className={`py-20 bg-white ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
              {title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid md:grid-cols-4 gap-8 relative"
          >
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent to-accent opacity-20 z-0" />
            
            {steps.map((step, index) => (
              <ProcessStepCard key={index} step={step} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ProcessStepCard: React.FC<{ step: ProcessStep; index: number }> = ({ step, index }) => {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -8 }}
      className="relative text-center z-10"
    >
      {/* Step Number Circle */}
      <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent to-accent-dark text-white rounded-full text-2xl font-bold mb-6 shadow-lg">
        {step.icon || step.number}
        
        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 bg-accent rounded-full"
          initial={{ scale: 1, opacity: 0.5 }}
          animate={{ scale: 1.3, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeOut',
          }}
        />
      </div>

      <h3 className="font-heading text-xl font-bold text-neutral-dark mb-3">
        {step.title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );
};
