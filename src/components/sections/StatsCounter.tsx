'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useCounter } from '@/hooks/useAnimations';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  icon?: React.ReactNode;
}

interface StatsCounterProps {
  stats: Stat[];
  title?: string;
  subtitle?: string;
  className?: string;
  darkMode?: boolean;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({
  stats,
  title,
  subtitle,
  className = '',
  darkMode = false,
}) => {
  return (
    <section className={`py-20 ${darkMode ? 'bg-gradient-to-br from-neutral-dark to-gray-900 text-white' : 'bg-neutral-light'} ${className}`}>
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto"
        >
          {(title || subtitle) && (
            <motion.div variants={fadeInUp} className="text-center mb-16">
              {title && (
                <h2 className={`font-heading text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-neutral-dark'}`}>
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {subtitle}
                </p>
              )}
            </motion.div>
          )}

          <motion.div
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
          >
            {stats.map((stat, index) => (
              <StatItem key={index} stat={stat} darkMode={darkMode} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const StatItem: React.FC<{ stat: Stat; darkMode: boolean }> = ({ stat, darkMode }) => {
  const { count, ref } = useCounter(stat.value, 2000);

  return (
    <motion.div
      ref={ref}
      variants={staggerItem}
      className="text-center"
    >
      {stat.icon && (
        <div className="text-4xl mb-4 flex justify-center">
          {stat.icon}
        </div>
      )}
      <div className={`text-5xl md:text-6xl font-bold mb-2 ${darkMode ? 'text-accent' : 'text-accent'}`}>
        {stat.prefix}{count.toLocaleString()}{stat.suffix}
      </div>
      <div className={`text-base md:text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        {stat.label}
      </div>
    </motion.div>
  );
};
