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
    <section className="min-h-screen flex items-center justify-center relative pt-32">
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
          className="w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">
            About Me
          </h2>
          <div className="relative perspective-1000">
            <motion.button
              ref={cardRef}
              className="relative w-full h-[340px] md:h-[380px] flex items-center justify-center focus:outline-none bg-transparent border-0 cursor-pointer"
              style={{
                perspective: 1000,
                transform: `rotateY(${isFlipped ? 180 : 0}deg) rotateX(${
                  -tilt.y * 10
                }deg) rotateY(${tilt.x * 10}deg)`,
                transition: "transform 0.5s cubic-bezier(.4,2,.3,1)",
                zIndex: 2,
              }}
              aria-label="Flip about card"
              tabIndex={0}
              onClick={() => setIsFlipped((f) => !f)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Front Side */}
              <motion.div
                className={cn(
                  "absolute inset-0 backface-hidden bg-card-bg border border-card-border rounded-xl p-8 shadow-xl flex flex-col items-center justify-center",
                  isFlipped && "hidden"
                )}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Avatar with pulse/shine when active */}
                <motion.div
                  className="w-28 h-28 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-700 border-4 border-white shadow-lg mb-6 flex items-center justify-center overflow-hidden"
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
                  <span className="text-5xl">👤</span>
                </motion.div>
                <motion.p
                  className="text-xl text-text-primary font-semibold text-center mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  A versatile professional bridging the gap between technology
                  and hands-on expertise.
                </motion.p>
                <motion.p
                  className="text-text-secondary text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Full Stack Developer • Locksmith Lead • Low Voltage Specialist
                </motion.p>
                <motion.span
                  className="mt-4 text-sm text-emerald-500 font-mono tracking-wide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  (Click or tap to reveal more)
                </motion.span>
              </motion.div>
              {/* Back Side */}
              <motion.div
                className={cn(
                  "absolute inset-0 backface-hidden bg-card-bg border border-card-border rounded-xl p-8 shadow-xl rotate-y-180 flex flex-col justify-center",
                  !isFlipped && "hidden"
                )}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h3
                  className="text-2xl font-bold text-text-primary mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                >
                  Professional Summary
                </motion.h3>
                <motion.p
                  className="text-text-secondary mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  As a Full Stack Developer and Field Technician, I combine
                  technical expertise with practical problem-solving skills. My
                  experience spans from developing modern web applications to
                  hands-on locksmith and low voltage work.
                </motion.p>
                <motion.p
                  className="text-text-secondary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  I lead teams, manage projects, and deliver solutions that make
                  a real impact. Whether it's coding, fixing, or building, I'm
                  passionate about creating efficient, reliable systems that
                  solve real-world problems.
                </motion.p>
                <motion.span
                  className="mt-4 text-sm text-emerald-500 font-mono tracking-wide text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  (Click or tap to flip back)
                </motion.span>
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
