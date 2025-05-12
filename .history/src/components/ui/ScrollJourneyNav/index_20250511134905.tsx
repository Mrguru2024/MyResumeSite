"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "portfolio", label: "Portfolio" },
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
        <line
          x1="16"
          y1="0"
          x2="16"
          y2="100%"
          stroke="#3b82f6"
          strokeWidth="4"
          strokeDasharray="8 8"
        />
      </svg>
      <div className="relative flex flex-col justify-between h-full w-8">
        {SECTIONS.map((section, i) => (
          <motion.div
            key={section.id}
            className="flex flex-col items-center mb-2 last:mb-0"
            animate={
              active === i
                ? { scale: 1.3, boxShadow: "0 0 0 6px #3b82f680" }
                : { scale: 1, boxShadow: "none" }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div
              className={`w-6 h-6 rounded-full border-4 border-skill-fullstack bg-background-dark flex items-center justify-center pointer-events-auto cursor-pointer transition-all ${active === i ? "bg-skill-fullstack" : "bg-background-dark"}`}
              title={section.label}
              onClick={() => {
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              tabIndex={0}
              aria-label={`Go to ${section.label}`}
              role="button"
            >
              <span className="w-2 h-2 rounded-full bg-white block" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
