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
    <section className="min-h-screen flex items-center justify-center relative pt-32 overflow-hidden">
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
          <h2 className="text-4xl sm:text-5xl font-extrabold text-text-primary mb-10 text-center tracking-tight drop-shadow-lg">
            About Me
          </h2>
          <div className="relative perspective-1000 flex flex-col items-center justify-center">
            {/* Badge above card, horizontally centered, pill shape, no rotation */}
            <motion.div
              className="mb-5 px-5 py-2 rounded-full bg-emerald-500/90 text-white font-semibold text-base shadow-md border border-white/20 backdrop-blur-md max-w-xs text-center whitespace-pre-line"
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
            {/* Animated floating accent in card background */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              animate={{ opacity: 0.22, scale: 1.1, rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ width: 320, height: 320 }}
              aria-hidden
            >
              <svg width="100%" height="100%" viewBox="0 0 320 320" fill="none">
                <circle
                  cx="160"
                  cy="160"
                  r="120"
                  stroke="#10b981"
                  strokeWidth="2"
                  opacity="0.18"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="80"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  opacity="0.12"
                />
                <circle
                  cx="160"
                  cy="160"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="1"
                  opacity="0.10"
                />
                <g>
                  <motion.circle
                    cx="160"
                    cy="60"
                    r="8"
                    fill="#10b981"
                    animate={{ cy: [60, 80, 60] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  <motion.circle
                    cx="260"
                    cy="160"
                    r="6"
                    fill="#10b981"
                    animate={{ cx: [260, 240, 260] }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  <motion.circle
                    cx="160"
                    cy="260"
                    r="5"
                    fill="#10b981"
                    animate={{ cy: [260, 240, 260] }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                  <motion.circle
                    cx="60"
                    cy="160"
                    r="7"
                    fill="#10b981"
                    animate={{ cx: [60, 80, 60] }}
                    transition={{
                      duration: 2.7,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  />
                </g>
              </svg>
            </motion.div>
            <div
              className="relative w-full flex justify-center items-center"
              style={{ perspective: 1200 }}
            >
              <motion.div
                className="w-full max-w-md xl:max-w-lg"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
                }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
              >
                {/* Card Front */}
                <motion.div
                  className={cn(
                    "absolute w-full h-[380px] md:h-[420px] xl:h-[480px] rounded-2xl p-10 md:p-14 shadow-2xl flex flex-col items-center justify-center border-2 border-transparent bg-white/30 dark:bg-background-dark/60 backdrop-blur-xl",
                    "z-10",
                    isFlipped && "pointer-events-none opacity-0"
                  )}
                  style={{
                    boxShadow: "0 8px 40px 0 #10b98122, 0 1.5px 8px #0002",
                    borderImage: isActive
                      ? "linear-gradient(90deg, #10b981 0%, #22d3ee 100%) 1"
                      : undefined,
                    borderColor: isActive ? "#10b981" : "#e5e7eb",
                    transition: "border-color 0.4s, box-shadow 0.4s",
                  }}
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isFlipped ? 0 : 1 }}
                  transition={{ duration: 0.4 }}
                >
                  {/* Avatar with pulse/shine when active */}
                  <motion.div
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 border-4 border-white shadow-lg mb-6 flex items-center justify-center overflow-hidden"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{
                      scale: isActive ? [1, 1.08, 1] : 1,
                      opacity: 1,
                      boxShadow: isActive
                        ? [
                            "0 0 0 0 #10b98155",
                            "0 0 32px 8px #10b98155",
                            "0 0 0 0 #10b98155",
                          ]
                        : "0 0 0 0 #10b98155",
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: isActive ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Replace with actual avatar image if available */}
                    <span className="text-6xl">👤</span>
                  </motion.div>
                  {/* Divider */}
                  <motion.div
                    className="w-24 h-1 rounded-full bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-500 mb-6"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                  />
                  <motion.h3
                    className="text-2xl sm:text-3xl font-extrabold text-text-primary text-center mb-2 drop-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                  >
                    Anthony "Mrguru" Feaster
                  </motion.h3>
                  <motion.p
                    className="text-lg sm:text-xl text-text-secondary text-center mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    A versatile professional bridging the gap between technology
                    and hands-on expertise.
                  </motion.p>
                  <motion.span
                    className="mt-2 text-base text-emerald-500 font-mono tracking-wide"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    (Click or tap to reveal more)
                  </motion.span>
                </motion.div>
                {/* Card Back */}
                <motion.div
                  className={cn(
                    "absolute w-full h-[380px] md:h-[420px] xl:h-[480px] rounded-2xl p-10 md:p-14 shadow-2xl flex flex-col justify-center border-2 border-transparent bg-background-dark/90 dark:bg-white/90 backdrop-blur-xl rotate-y-180",
                    !isFlipped && "pointer-events-none opacity-0"
                  )}
                  style={{
                    boxShadow: "0 8px 40px 0 #10b98122, 0 1.5px 8px #0002",
                    borderImage: isActive
                      ? "linear-gradient(90deg, #10b981 0%, #22d3ee 100%) 1"
                      : undefined,
                    borderColor: isActive ? "#10b981" : "#e5e7eb",
                    transition: "border-color 0.4s, box-shadow 0.4s",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isFlipped ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.h3
                    className="text-2xl sm:text-3xl font-extrabold text-text-primary mb-4 text-center drop-shadow"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    Professional Summary
                  </motion.h3>
                  <motion.p
                    className="text-lg sm:text-xl text-text-secondary mb-4 text-center"
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
                    className="text-lg sm:text-xl text-text-secondary text-center"
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
                    className="mt-4 text-base text-emerald-500 font-mono tracking-wide text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    (Click or tap to flip back)
                  </motion.span>
                </motion.div>
              </motion.div>
              {/* Clickable area for flipping */}
              <button
                className="absolute inset-0 w-full h-full z-20 bg-transparent border-0 cursor-pointer focus:outline-none"
                aria-label="Flip about card"
                tabIndex={0}
                onClick={() => setIsFlipped((f) => !f)}
                style={{ background: "none" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
