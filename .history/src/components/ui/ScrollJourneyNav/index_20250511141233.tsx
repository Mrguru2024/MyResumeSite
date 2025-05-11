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
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex items-center">
      <svg
        width="8"
        height="100%"
        className="absolute left-0 top-0"
        style={{ height: "100vh" }}
      >
        <motion.path
          d="M4 0 L4 100%"
          stroke="#3b82f6"
          strokeWidth="2"
          fill="none"
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
              role="button"
              aria-label={`Scroll to ${section.label} section`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <span className="text-sm">{section.icon}</span>
            </motion.div>
            <AnimatePresence>
              {hovered === i && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-8 bg-card-bg border border-card-border rounded px-2 py-1 text-sm text-text-primary whitespace-nowrap"
                  style={{ boxShadow: `0 0 10px ${section.color}40` }}
                >
                  {section.label}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </nav>
  );
}
