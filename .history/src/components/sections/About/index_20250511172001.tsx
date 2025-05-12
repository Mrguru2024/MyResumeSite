"use client";
import { useState, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ActiveSectionContext } from "@/context/ActiveSectionContext";

const ABOUT_COLOR = "#10b981";

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const { active } = useContext(ActiveSectionContext);
  const sectionIndex = 1; // About is the second section (0 = Hero)
  const isActive = active === sectionIndex;
  const cardRef = useRef<HTMLButtonElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  // Flip card automatically when About is active
  // (but allow manual flip as well)
  // Only auto-flip to back ONCE per activation
  const [autoFlipped, setAutoFlipped] = useState(false);
  if (isActive && !autoFlipped && !isFlipped) {
    setTimeout(() => {
      setIsFlipped(true);
      setAutoFlipped(true);
    }, 400);
  } else if (!isActive && autoFlipped) {
    setIsFlipped(false);
    setAutoFlipped(false);
  }

  // 3D tilt effect on mouse move
  function handleMouseMove(e: React.MouseEvent) {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x, y });
  }
  function handleMouseLeave() {
    setTilt({ x: 0, y: 0 });
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative pt-32 overflow-hidden">
      {/* Animated SVG/CSS background pattern */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="about-bg-pattern"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0 pointer-events-none"
            aria-hidden
          >
            <svg
              width="100%"
              height="100%"
              className="w-full h-full"
              viewBox="0 0 800 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient
                  id="aboutBgGrad"
                  cx="50%"
                  cy="40%"
                  r="80%"
                  fx="50%"
                  fy="40%"
                >
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <rect width="800" height="600" fill="url(#aboutBgGrad)" />
              <g stroke="#10b981" strokeWidth="0.5" opacity="0.18">
                {[...Array(12)].map((_, i) => (
                  <circle
                    key={i}
                    cx={400}
                    cy={300}
                    r={40 + i * 40}
                    fill="none"
                  />
                ))}
              </g>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Animated background accent when active */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            key="about-accent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.25, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 40%, #10b98155 0%, transparent 70%)",
              filter: "blur(32px)",
            }}
            aria-hidden
          />
        )}
      </AnimatePresence>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        <motion.div
          className="w-full max-w-3xl xl:max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-4 sm:mb-6 text-center tracking-tight drop-shadow-lg">
            About Me
          </h2>
          {/* Badge above card, always readable, never flips */}
          <motion.div
            className="mb-6 sm:mb-8 mt-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-emerald-500/90 text-white font-semibold text-xs sm:text-base shadow-md border border-white/20 backdrop-blur-md max-w-[90vw] sm:max-w-xs text-center whitespace-pre-line"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ zIndex: 2 }}
          >
            <span className="block sm:inline">Full Stack Developer</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span className="block sm:inline">Locksmith Lead</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span className="block sm:inline">Low Voltage Specialist</span>
          </motion.div>
          {/* Card flip container with perspective */}
          <div className="flex justify-center items-center mt-4 sm:mt-8">
            <motion.div
              className="relative w-full max-w-md xl:max-w-lg"
              style={{ perspective: 1200 }}
              layout
            >
              <motion.div
                className="absolute inset-0 w-full"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
                layout
              >
                {/* Card Front */}
                <motion.button
                  type="button"
                  aria-pressed={isFlipped}
                  className={cn(
                    "absolute w-full rounded-2xl p-4 sm:p-6 md:p-10 shadow-2xl flex flex-col items-center justify-center border-2 border-transparent bg-white/30 dark:bg-background-dark/60 backdrop-blur-xl z-10 select-none transition-transform duration-300",
                    isFlipped && "pointer-events-none opacity-0",
                  )}
                  style={{
                    boxShadow: "0 8px 40px 0 #10b98122, 0 1.5px 8px #0002",
                    borderImage: isActive
                      ? "linear-gradient(90deg, #10b981 0%, #22d3ee 100%) 1"
                      : undefined,
                    borderColor: isActive ? "#10b981" : "#e5e7eb",
                    transition: "border-color 0.4s, box-shadow 0.4s",
                    cursor: "pointer",
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isFlipped ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                  tabIndex={0}
                  aria-label="About card front"
                  layout
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsFlipped((f) => !f)}
                >
                  {/* Avatar with drop shadow, perfectly centered */}
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 border-4 border-white shadow-lg mb-4 sm:mb-6 flex items-center justify-center overflow-hidden"
                    style={{ boxShadow: "0 4px 24px 0 #10b98144" }}
                  >
                    {/* Replace with actual avatar image if available */}
                    <svg
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-16 h-16 sm:w-20 sm:h-20"
                    >
                      <circle cx="32" cy="32" r="32" fill="url(#avatarGrad)" />
                      <defs>
                        <linearGradient
                          id="avatarGrad"
                          x1="0"
                          y1="0"
                          x2="64"
                          y2="64"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="#34d399" />
                          <stop offset="1" stopColor="#2563eb" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M32 34c-7.732 0-14 6.268-14 14v2h28v-2c0-7.732-6.268-14-14-14z"
                        fill="#2563eb"
                        fillOpacity=".2"
                      />
                      <circle
                        cx="32"
                        cy="24"
                        r="10"
                        fill="#2563eb"
                        fillOpacity=".3"
                      />
                    </svg>
                  </div>
                  {/* Divider */}
                  <motion.div
                    className="w-16 sm:w-20 md:w-24 h-1 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 mb-4 sm:mb-6"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                  />
                  <motion.h3
                    className="text-lg sm:text-xl md:text-2xl font-extrabold text-text-primary text-center mb-2 drop-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    Anthony "Mrguru" Feaster
                  </motion.h3>
                  <motion.p
                    className="text-sm sm:text-base md:text-lg text-text-secondary text-center mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    A versatile professional bridging the gap between technology
                    and hands-on expertise.
                  </motion.p>
                  <motion.span
                    className="mt-2 text-xs sm:text-sm md:text-base text-emerald-500 font-mono tracking-wide pb-2 sm:pb-4 md:pb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    (Click or tap to reveal more)
                  </motion.span>
                </motion.button>
                {/* Card Back */}
                <motion.button
                  type="button"
                  aria-pressed={!isFlipped}
                  className={cn(
                    "absolute w-full rounded-2xl p-4 sm:p-6 md:p-10 shadow-2xl flex flex-col justify-center border-2 border-transparent bg-background-dark/90 dark:bg-white/90 backdrop-blur-xl rotate-y-180 z-10 select-none transition-transform duration-300",
                    !isFlipped && "pointer-events-none opacity-0",
                  )}
                  style={{
                    boxShadow: "0 8px 40px 0 #10b98122, 0 1.5px 8px #0002",
                    borderImage: isActive
                      ? "linear-gradient(90deg, #10b981 0%, #22d3ee 100%) 1"
                      : undefined,
                    borderColor: isActive ? "#10b981" : "#e5e7eb",
                    transition: "border-color 0.4s, box-shadow 0.4s",
                    cursor: "pointer",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isFlipped ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  tabIndex={0}
                  aria-label="About card back"
                  layout
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsFlipped((f) => !f)}
                >
                  <motion.h3
                    className="text-lg sm:text-xl md:text-2xl font-extrabold text-text-primary mb-4 text-center drop-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    Professional Summary
                  </motion.h3>
                  <motion.p
                    className="text-sm sm:text-base md:text-lg text-text-secondary mb-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    As a Full Stack Developer and Field Technician, I combine
                    technical expertise with practical problem-solving skills.
                    My experience spans from developing modern web applications
                    to hands-on locksmith and low voltage work.
                  </motion.p>
                  <motion.p
                    className="text-sm sm:text-base md:text-lg text-text-secondary text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    I lead teams, manage projects, and deliver solutions that
                    make a real impact. Whether it's coding, fixing, or
                    building, I'm passionate about creating efficient, reliable
                    systems that solve real-world problems.
                  </motion.p>
                  <motion.span
                    className="mt-4 text-xs sm:text-sm md:text-base text-emerald-500 font-mono tracking-wide text-center pb-2 sm:pb-4 md:pb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    (Click or tap to flip back)
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
