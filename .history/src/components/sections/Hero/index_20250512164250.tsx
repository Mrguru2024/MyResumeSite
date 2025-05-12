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
  const particleRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (containerRef.current) {
      // Expose the ref globally for BlueprintRoute
      window.heroContainerRef = containerRef.current;
    }
  }, []);

  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId: number;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    ctx?.scale(dpr, dpr);

    // Generate more particles with varied sizes
    const dots = Array.from({ length: 64 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 2.5 + Math.random() * 3,
      speed: 0.1 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Get computed styles for theme colors
      const computedStyle = getComputedStyle(document.documentElement);
      const primaryColor = computedStyle.getPropertyValue('--primary').trim();

      // Parse HSL values properly
      const isDarkMode = document.documentElement.classList.contains('dark');

      // Default to blue if parsing fails
      let hue = 221;
      let saturation = 83;
      let lightness = 53;

      try {
        // Extract numbers from the HSL string
        const matches = primaryColor.match(/(\d+\.?\d*)\s+(\d+\.?\d*)\s+(\d+\.?\d*)/);
        if (matches) {
          hue = parseFloat(matches[1]);
          saturation = parseFloat(matches[2]);
          lightness = parseFloat(matches[3]);
        }
      } catch (error) {
        console.warn('Failed to parse primary color, using defaults:', error);
      }

      // Adjust colors for dark mode
      const adjustedHue = isDarkMode ? (hue + 180) % 360 : hue;
      const adjustedSaturation = isDarkMode ? Math.min(saturation + 20, 100) : saturation;
      const adjustedLightness = isDarkMode ? Math.min(lightness + 40, 100) : lightness;

      // Draw background gradient for glass effect
      const gradient = ctx.createLinearGradient(0, 0, 0, window.innerHeight);
      gradient.addColorStop(
        0,
        `hsla(${adjustedHue}, ${adjustedSaturation}%, ${adjustedLightness}%, 0.08)`
      );
      gradient.addColorStop(
        1,
        `hsla(${adjustedHue}, ${adjustedSaturation}%, ${adjustedLightness}%, 0.03)`
      );
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      dots.forEach(dot => {
        // Animate y position with a gentle sine wave
        const y = dot.y + Math.sin(Date.now() * 0.0005 + dot.phase) * 8;
        ctx.beginPath();
        ctx.arc(dot.x, y, dot.r, 0, Math.PI * 2);

        // Create a gradient for each dot
        const dotGradient = ctx.createRadialGradient(dot.x, y, 0, dot.x, y, dot.r * 2.5);

        // Use theme colors with varying opacity
        const baseOpacity = isDarkMode ? 1 : 0.9;
        const fadeOpacity = isDarkMode ? 0.4 : 0.2;

        // Add a bright center in dark mode
        if (isDarkMode) {
          dotGradient.addColorStop(
            0,
            `hsla(${adjustedHue}, ${adjustedSaturation}%, 100%, ${baseOpacity})`
          );
          dotGradient.addColorStop(
            0.5,
            `hsla(${adjustedHue}, ${adjustedSaturation}%, ${adjustedLightness}%, ${baseOpacity * 0.8})`
          );
          dotGradient.addColorStop(
            1,
            `hsla(${adjustedHue}, ${adjustedSaturation}%, ${adjustedLightness}%, ${fadeOpacity})`
          );
        } else {
          dotGradient.addColorStop(
            0,
            `hsla(${hue}, ${saturation}%, ${lightness}%, ${baseOpacity})`
          );
          dotGradient.addColorStop(
            1,
            `hsla(${hue}, ${saturation}%, ${lightness}%, ${fadeOpacity})`
          );
        }

        ctx.fillStyle = dotGradient;
        ctx.shadowColor = isDarkMode
          ? `hsla(${adjustedHue}, ${adjustedSaturation}%, 100%, 0.9)`
          : `hsla(${hue}, ${saturation}%, ${lightness}%, 0.6)`;
        ctx.shadowBlur = isDarkMode ? 24 : 16;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animationId = requestAnimationFrame(draw);
    }

    // Handle resize and theme changes
    function handleResize() {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      ctx.scale(dpr, dpr);
    }

    // Listen for theme changes
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.attributeName === 'class') {
          // Redraw particles when theme changes
          draw();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    window.addEventListener('resize', handleResize);
    draw();
    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <section className="min-h-screen w-screen flex items-center justify-center relative pt-32 overflow-hidden bg-transparent">
      <HeroGlassParticles />
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
            {mounted ? typedSubtitle : ''}
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
