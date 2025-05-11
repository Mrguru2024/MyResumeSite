"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/utils/animations";

interface AboutProps {
  summary: string;
  expandedSummary: string;
  avatarUrl: string;
}

export const About = ({ summary, expandedSummary, avatarUrl }: AboutProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-8 bg-background-dark">
      <motion.div
        className="w-full max-w-4xl perspective-1000"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div
          className={`relative w-full h-[400px] preserve-3d transition-transform duration-500 ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          {/* Front of card */}
          <div className="absolute w-full h-full backface-hidden bg-card-bg border border-card-border rounded-xl p-8 flex flex-col items-center justify-center text-center">
            <motion.img
              src={avatarUrl}
              alt="Anthony Feaster"
              className="w-32 h-32 rounded-full mb-6 object-cover"
              whileHover={{ scale: 1.05 }}
            />
            <h2 className="text-3xl font-bold text-text-primary mb-4">About Me</h2>
            <p className="text-text-secondary">{summary}</p>
            <p className="text-text-accent mt-4">Click to learn more</p>
          </div>

          {/* Back of card */}
          <div className="absolute w-full h-full backface-hidden bg-card-bg border border-card-border rounded-xl p-8 rotate-y-180">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Professional Summary</h2>
            <p className="text-text-secondary leading-relaxed">{expandedSummary}</p>
            <p className="text-text-accent mt-4">Click to flip back</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
