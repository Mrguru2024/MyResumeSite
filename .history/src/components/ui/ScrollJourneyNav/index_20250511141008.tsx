"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Hero", icon: "🏁", color: "#3b82f6" },
  { id: "about", label: "About", icon: "👤", color: "#10b981" },
  { id: "skills", label: "Skills", icon: "🛠️", color: "#f59e0b" },
  { id: "experience", label: "Experience", icon: "💼", color: "#8b5cf6" },
  { id: "portfolio", label: "Portfolio", icon: "📁", color: "#ec4899" },
];

function getActiveSection() {
  if (typeof window === "undefined") return 0;
  const offsets = SECTIONS.map((s) => {
    const el = document.getElementById(s.id);
    return el ? el.getBoundingClientRect().top : Infinity;
  });
  return offsets.findIndex((top, i) => top >= 0 || i === SECTIONS.length - 1);
}

export default function ScrollJourneyNav() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    function onScroll() {
      setActive(getActiveSection());
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center h-4/5 select-none pointer-events-none">
      <svg
        height="100%"
        width="32"
        viewBox="0 0 32 100%"
        className="absolute left-1/2 -translate-x-1/2 h-full"
        style={{ minHeight: 400 }}
      >
        <motion.line
          x1="16"
          y1="0"
          x2="16"
          y2="100%"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeDasharray="8 8"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
      <div className="relative flex flex-col justify-between h-full w-8">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.id}
            className="flex flex-col items-center mb-2 last:mb-0"
            animate={
              active === i
                ? { scale: 1.3, boxShadow: `0 0 0 6px ${section.color}80` }
                : { scale: 1, boxShadow: "none" }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
          >
            <motion.div
              className={`w-6 h-6 rounded-full border-4 border-skill-fullstack bg-background-dark flex items-center justify-center pointer-events-auto cursor-pointer transition-all ${
                active === i ? "bg-skill-fullstack" : "bg-background-dark"
              }`}
              style={{
                borderColor: section.color,
                backgroundColor: active === i ? section.color : "transparent",
              }}
              title={section.label}
              onClick={() => {
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              tabIndex={0}
              aria-label={`Go to ${section.label}`}
              role="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: hovered === i ? `0 0 20px ${section.color}` : "none",
              }}
            >
              <motion.span
                className="w-2 h-2 rounded-full bg-white block"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: active === i ? 1 : 0.5,
                }}
                transition={{
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            </motion.div>
            <AnimatePresence>
              {hovered === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-full ml-2 bg-background-dark text-white text-xs rounded px-2 py-1 shadow-lg whitespace-nowrap"
                  style={{
                    backgroundColor: section.color,
                    boxShadow: `0 0 10px ${section.color}`,
                  }}
                >
                  {section.label}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
