"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const TYPING_TEXT = "I fix. I code. I lead. I build what's needed.";

function useTypingEffect(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

export default function Hero() {
  const typedSubtitle = useTypingEffect(TYPING_TEXT, 40);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      // Expose the ref globally for BlueprintRoute
      window.heroContainerRef = containerRef.current;
    }
  }, []);
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-32 overflow-hidden">
      {/* Animated Blueprint SVG Background (subtle, blended) */}
      <motion.div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 60% 40%, #0f172a 60%, transparent 100%)",
        }}
        aria-hidden
      >
        <motion.svg
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="w-full h-full"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Blueprint grid */}
          <motion.rect
            x="0"
            y="0"
            width="1440"
            height="900"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ duration: 1 }}
          />
          {/* Animated lines and shapes */}
          <motion.line
            x1="200"
            y1="200"
            x2="1240"
            y2="200"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="1040"
            strokeDashoffset="1040"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{ opacity: 0.22, filter: "blur(0.5px)" }}
          />
          <motion.line
            x1="200"
            y1="700"
            x2="1240"
            y2="700"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="1040"
            strokeDashoffset="1040"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            style={{ opacity: 0.22, filter: "blur(0.5px)" }}
          />
          <motion.line
            x1="200"
            y1="200"
            x2="200"
            y2="700"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="500"
            strokeDashoffset="500"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            style={{ opacity: 0.18, filter: "blur(0.5px)" }}
          />
          <motion.line
            x1="1240"
            y1="200"
            x2="1240"
            y2="700"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="500"
            strokeDashoffset="500"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            style={{ opacity: 0.18, filter: "blur(0.5px)" }}
          />
          {/* Diagonal and detail lines */}
          <motion.line
            x1="200"
            y1="200"
            x2="1240"
            y2="700"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            style={{ opacity: 0.13, filter: "blur(0.5px)" }}
          />
          <motion.line
            x1="1240"
            y1="200"
            x2="200"
            y2="700"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeDasharray="1200"
            strokeDashoffset="1200"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.2, delay: 1.2 }}
            style={{ opacity: 0.13, filter: "blur(0.5px)" }}
          />
          {/* Circles for architectural detail */}
          <motion.circle
            cx="720"
            cy="450"
            r="120"
            stroke="#38bdf8"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.4 }}
            style={{ opacity: 0.18, filter: "blur(0.5px)" }}
          />
          <motion.circle
            cx="720"
            cy="450"
            r="200"
            stroke="#38bdf8"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 1.6 }}
            style={{ opacity: 0.13, filter: "blur(0.5px)" }}
          />
        </motion.svg>
        {/* Soft dark overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 to-transparent" />
      </motion.div>
      {/* Content */}
      <div
        ref={containerRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent relative z-10"
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
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="primary"
              size="lg"
              data-journey-button
            >
              Begin Journey
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
