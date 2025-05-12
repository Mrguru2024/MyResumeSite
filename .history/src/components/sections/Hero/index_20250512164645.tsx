'use client';
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';
import HeroGlassParticles from '@/components/ui/GlobalGlassParticles';

const TYPING_TEXT = "I fix. I code. I lead. I build what's needed.";

function useTypingEffect(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  useEffect(() => {
    let interval: NodeJS.Timeout | number;
    if (index < text.length) {
      interval = setInterval(() => {
        setDisplayed(prev => prev + text[index]);
        setIndex(i => i + 1);
      }, speed);
    } else {
      // Wait 1s, then restart
      interval = setTimeout(() => {
        setDisplayed('');
        setIndex(0);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [index, text, speed]);
  return displayed;
}

export default function Hero() {
  const typedSubtitle = useTypingEffect(TYPING_TEXT, 40);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="min-h-screen w-screen flex items-center justify-center relative pt-32 overflow-hidden bg-transparent">
      {mounted && <HeroGlassParticles />}
      {/* Ultra-smooth bottom gradient: light theme uses white, dark theme uses a subtle dark fade */}
      <div className="absolute bottom-0 left-0 w-full h-56 pointer-events-none z-10 bg-gradient-to-b from-transparent via-slate-100/80 to-white dark:from-transparent dark:via-background/60 dark:to-background" />
      {/* Blueprint Dots Particle Canvas */}
      {/* Content */}
      <div
        ref={containerRef}
        className="w-full px-4 sm:px-6 lg:px-8 relative z-10 bg-transparent flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Anthony "Mrguru" Feaster
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-text-accent mb-8">
            Full Stack Developer | Locksmith Lead | Low Voltage Specialist
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-text-secondary mb-12 min-h-[2.5rem]"
            aria-label={TYPING_TEXT}
          >
            {typedSubtitle}
            <span className="animate-pulse">|</span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
              variant="primary"
              size="lg"
              data-journey-button
              className="hover:scale-105 transition-transform duration-300"
            >
              Begin Journey
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
