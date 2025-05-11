"use client";
import { useState, useEffect } from "react";
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
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
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
