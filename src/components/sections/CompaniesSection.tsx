'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const CompaniesSection: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const companies = [
    'TechVista Solutions',
    'CloudSync Enterprises',
    'NexaCore Digital',
    'VelocityWorks',
    'Pinnacle Innovations',
    'BrightPath Technologies',
    'Fusion Dynamics',
    'Quantum Ventures'
  ];

  // Removed auto-slide for performance - user can manually navigate
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="m-16 lg:mt-24"
    >
      <h2 className="text-xl text-muted-foreground mb-8 font-medium text-center">
        Loved by Businesses Worldwide
      </h2>
      
      {/* Companies Display - Static for performance */}
      <div className="relative overflow-hidden">
        <div className="flex justify-center">
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {companies.slice(currentSlide * 4, currentSlide * 4 + 4).map((company, index) => (
                <motion.div
                  key={company}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-center"
                >
                  <div className="text-lg md:text-xl font-semibold text-muted-foreground/70 hover:text-primary transition-colors duration-300 cursor-pointer hover:scale-105 text-center">
                    {company}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(companies.length / 4) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'w-8 bg-primary' 
                  : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};
