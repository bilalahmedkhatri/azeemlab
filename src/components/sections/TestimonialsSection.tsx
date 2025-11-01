'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';

const testimonials = [
  {
    quote: "AzeemLab transformed our online presence. Their team is professional, creative, and delivered beyond our expectations. Our traffic is up 200%!",
    name: "Sarah Johnson",
    title: "CEO of InnovateCo",
    avatar: "/avatars/sarah.jpg",
  },
  {
    quote: "The best web development agency we've worked with. They understood our vision perfectly and brought it to life with a stunning and functional website.",
    name: "Michael Chen",
    title: "Founder of TechStart",
    avatar: "/avatars/michael.jpg",
  },
  {
    quote: "From branding to the final website launch, the process was seamless. Their attention to detail and commitment to quality is unmatched.",
    name: "Emily Rodriguez",
    title: "Marketing Director, GreenLife",
    avatar: "/avatars/emily.jpg",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 80,
    },
  },
};

const StarRating = ({ rating = 5 }: { rating?: number }) => (
  <div className="flex items-center gap-1 text-yellow-400">
    {[...Array(rating)].map((_, i) => (
      <FaStar key={i} size={18} />
    ))}
  </div>
);

export const TestimonialsSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground">
            Loved by Businesses Worldwide
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Don't just take our word for it. Here's what our clients have to say.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-card p-8 rounded-2xl shadow-lg flex flex-col"
              variants={itemVariants}
            >
              <StarRating />
              <blockquote className="mt-4 text-foreground flex-grow">
                <p>"{testimonial.quote}"</p>
              </blockquote>
              <div className="mt-6 flex items-center">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    layout="fill"
                    objectFit="cover"
                    className="bg-muted"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
