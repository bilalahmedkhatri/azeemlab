'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import { FiChevronDown } from 'react-icons/fi';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({
  faqs,
  title = 'Frequently Asked Questions',
  subtitle,
  ctaText = 'Still have questions?',
  ctaLink = '/contact',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-neutral-dark mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-gray-600">{subtitle}</p>
            )}
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => toggleFAQ(index)}
              />
            ))}
          </motion.div>

          {ctaText && (
            <motion.div variants={fadeInUp} className="mt-12 text-center">
              <p className="text-lg text-gray-600 mb-4">{ctaText}</p>
              <a
                href={ctaLink}
                className="text-accent hover:text-accent-dark font-semibold inline-flex items-center gap-2 transition-colors"
              >
                Contact Us →
              </a>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{ faq: FAQ; isOpen: boolean; onClick: () => void }> = ({
  faq,
  isOpen,
  onClick,
}) => {
  return (
    <motion.div
      variants={staggerItem}
      className="border border-gray-200 rounded-lg overflow-hidden"
    >
      <button
        onClick={onClick}
        className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-neutral-light transition-colors"
      >
        <span className="font-heading font-semibold text-lg text-neutral-dark pr-8">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0"
        >
          <FiChevronDown className="w-6 h-6 text-accent" />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-5 text-gray-600 leading-relaxed">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
