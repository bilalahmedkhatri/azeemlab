'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/lib/animations';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  image?: string;
  rating?: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  autoplay?: boolean;
  interval?: number;
}

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
  title = 'What Our Clients Say',
  subtitle,
  autoplay = true,
  interval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoplay, interval, testimonials.length]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-neutral-light to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-gray-600">{subtitle}</p>
            )}
          </div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              >
                {/* Rating Stars */}
                {testimonials[currentIndex].rating && (
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-6 h-6 ${
                          i < testimonials[currentIndex].rating!
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                )}

                {/* Quote */}
                <blockquote className="text-2xl md:text-3xl font-heading font-medium text-neutral-dark mb-8 text-center leading-relaxed">
                  &quot;{testimonials[currentIndex].quote}&quot;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  {testimonials[currentIndex].image && (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-accent-dark flex items-center justify-center text-white font-bold text-xl">
                      {testimonials[currentIndex].author.charAt(0)}
                    </div>
                  )}
                  <div className="text-left">
                    <div className="font-bold text-lg text-neutral-dark">
                      {testimonials[currentIndex].author}
                    </div>
                    <div className="text-gray-600">
                      {testimonials[currentIndex].position}
                    </div>
                    <div className="text-accent font-semibold">
                      {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 bg-white hover:bg-accent hover:text-white text-accent rounded-full p-3 shadow-lg transition-all duration-200"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 bg-white hover:bg-accent hover:text-white text-accent rounded-full p-3 shadow-lg transition-all duration-200"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-accent w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
