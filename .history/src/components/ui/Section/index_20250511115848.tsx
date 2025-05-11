'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '@/utils/animations';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ id, title, children, className = '' }: SectionProps) => {
  return (
    <section
      id={id}
      className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-12"
        >
          {title}
        </motion.h2>
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}; 