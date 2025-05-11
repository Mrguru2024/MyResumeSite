"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, scaleIn } from "@/utils/animations";

interface AboutCardProps {
  title: string;
  content: string;
  isFlipped: boolean;
  onFlip: () => void;
}

const AboutCard = ({ title, content, isFlipped, onFlip }: AboutCardProps) => {
  return (
    <motion.div
      className="relative w-full max-w-2xl mx-auto h-[400px] cursor-pointer perspective-1000"
      onClick={onFlip}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="absolute w-full h-full transition-transform duration-500 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute w-full h-full backface-hidden bg-gray-800 rounded-xl p-8 flex flex-col items-center justify-center"
          variants={scaleIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">{title}</h3>
          <p className="text-gray-300 text-center">
            Click to learn more about my journey
          </p>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute w-full h-full backface-hidden bg-gray-800 rounded-xl p-8 rotate-y-180"
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <p className="text-gray-300">{content}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const About = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="w-full">
      <AboutCard
        title="Anthony 'Mrguru' Feaster"
        content="A versatile professional with expertise spanning full-stack development, locksmithing, and low-voltage systems. My journey combines technical innovation with hands-on problem-solving, allowing me to bridge the gap between digital and physical solutions. I bring a unique perspective to every project, combining code craftsmanship with mechanical expertise."
        isFlipped={isFlipped}
        onFlip={() => setIsFlipped(!isFlipped)}
      />
    </div>
  );
};
