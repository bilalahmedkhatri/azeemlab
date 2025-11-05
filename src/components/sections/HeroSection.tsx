'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { CompaniesSection } from './CompaniesSection';

export const HeroSection: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear" as const,
    },
  };

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-10 md:py-14 lg:py-18 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/3 to-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-left"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Digital Growth, Simplified</span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            >
              Turn Your Business Into a{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Digital Powerhouse
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
            >
              We partner with ambitious businesses to create stunning websites, memorable brands, and data-driven marketing strategies that deliver measurable growth.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button href="/contact" size="lg" className="group">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <motion.div
                animate={floatingAnimation}
                className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100"
              >
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Your Project</div>
                        <div className="text-sm text-muted-foreground">In Progress</div>
                      </div>
                    </div>
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  </div>

                  {/* Progress Bars */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground font-medium">Design</span>
                        <span className="text-primary font-semibold">100%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-primary to-accent"
                        ></motion.div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground font-medium">Development</span>
                        <span className="text-primary font-semibold">85%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '85%' }}
                          transition={{ duration: 1.5, delay: 0.7 }}
                          className="h-full bg-gradient-to-r from-primary to-accent"
                        ></motion.div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-foreground font-medium">Deployment</span>
                        <span className="text-primary font-semibold">60%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: '60%' }}
                          transition={{ duration: 1.5, delay: 0.9 }}
                          className="h-full bg-gradient-to-r from-primary to-accent"
                        ></motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Growth</div>
                        <div className="font-semibold text-foreground">+127%</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">Quality</div>
                        <div className="font-semibold text-foreground">Premium</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-accent to-primary rounded-2xl shadow-lg flex items-center justify-center"
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl shadow-lg flex items-center justify-center"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
