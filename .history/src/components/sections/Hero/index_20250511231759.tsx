"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

const TYPING_TEXT = "I fix. I code. I lead. I build what's needed.";

function useTypingEffect(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState("");
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed((prev) => {
        const next = prev + text[i];
        console.log("[TypingEffect]", next);
        return next;
      });
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
    const ctx = canvas.getContext("2d");
    let animationId: number;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    ctx?.scale(dpr, dpr);
    // Generate blueprint dots
    const dots = Array.from({ length: 36 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 1.5 + Math.random() * 2,
      speed: 0.1 + Math.random() * 0.2,
      phase: Math.random() * Math.PI * 2,
    }));
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      dots.forEach((dot) => {
        // Animate y position with a gentle sine wave
        const y = dot.y + Math.sin(Date.now() * 0.0005 + dot.phase) * 8;
        ctx.beginPath();
        ctx.arc(dot.x, y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56, 189, 248, 0.18)";
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      animationId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animationId);
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
            visible: { transition: { staggerChildren: 0.18 } },
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
          {/* Office walls (animated rectangles) */}
          <motion.rect
            x="400"
            y="250"
            width="640"
            height="400"
            stroke="#38bdf8"
            strokeWidth="3"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            style={{ opacity: 0.25 }}
          />
          {/* Interior wall */}
          <motion.line
            x1="720"
            y1="250"
            x2="720"
            y2="650"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="400"
            strokeDashoffset="400"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            style={{ opacity: 0.18 }}
          />
          {/* Door symbol (arc + swing) */}
          <motion.path
            d="M720 650 Q740 670 760 650"
            stroke="#38bdf8"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{ opacity: 0.22 }}
          />
          <motion.line
            x1="760"
            y1="650"
            x2="760"
            y2="630"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="20"
            strokeDashoffset="20"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            style={{ opacity: 0.22 }}
          />
          {/* Window symbols (short lines) */}
          <motion.line
            x1="400"
            y1="400"
            x2="420"
            y2="400"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="20"
            strokeDashoffset="20"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            style={{ opacity: 0.22 }}
          />
          <motion.line
            x1="1020"
            y1="400"
            x2="1040"
            y2="400"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeDasharray="20"
            strokeDashoffset="20"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            style={{ opacity: 0.22 }}
          />
          {/* Stairs symbol (zig-zag lines) */}
          <motion.polyline
            points="420,650 440,630 460,650 480,630 500,650"
            stroke="#38bdf8"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            style={{ opacity: 0.22 }}
          />
          {/* Dimension lines */}
          <motion.line
            x1="400"
            y1="670"
            x2="1040"
            y2="670"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeDasharray="640"
            strokeDashoffset="640"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
            style={{ opacity: 0.13 }}
          />
          <motion.line
            x1="380"
            y1="250"
            x2="380"
            y2="650"
            stroke="#38bdf8"
            strokeWidth="1"
            strokeDasharray="400"
            strokeDashoffset="400"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, delay: 1.6 }}
            style={{ opacity: 0.13 }}
          />
          {/* Section mark (circle + cross) */}
          <motion.circle
            cx="400"
            cy="250"
            r="18"
            stroke="#38bdf8"
            strokeWidth="1.5"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 1.8 }}
            style={{ opacity: 0.18 }}
          />
          <motion.line
            x1="400"
            y1="232"
            x2="400"
            y2="268"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="36"
            strokeDashoffset="36"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.5, delay: 1.9 }}
            style={{ opacity: 0.18 }}
          />
          <motion.line
            x1="382"
            y1="250"
            x2="418"
            y2="250"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeDasharray="36"
            strokeDashoffset="36"
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            style={{ opacity: 0.18 }}
          />
        </motion.svg>
        {/* Soft dark overlay for blending */}
        <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 to-transparent" />
      </motion.div>
      {/* Blueprint Dots Particle Canvas */}
      <canvas
        ref={particleRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
        aria-hidden
      />
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
            {mounted ? typedSubtitle : ""}
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
