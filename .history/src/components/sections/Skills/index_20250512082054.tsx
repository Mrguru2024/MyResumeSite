"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const SKILL_CATEGORIES = [
  { key: "fullstack", label: "Full Stack Dev", color: "text-skill-fullstack" },
  { key: "field", label: "Field Technician", color: "text-skill-field" },
  { key: "lowvoltage", label: "Low Voltage", color: "text-skill-lowvoltage" },
  { key: "leadership", label: "Leadership", color: "text-skill-leadership" },
  { key: "repair", label: "Repair", color: "text-skill-repair" },
];

const SKILLS = [
  {
    name: "React",
    category: "fullstack",
    description: "Modern UI development.",
  },
  {
    name: "Node.js",
    category: "fullstack",
    description: "Backend APIs and services.",
  },
  {
    name: "Locksmithing",
    category: "field",
    description: "Physical and electronic locks.",
  },
  {
    name: "Alarm Systems",
    category: "lowvoltage",
    description: "Security and fire systems.",
  },
  {
    name: "Team Leadership",
    category: "leadership",
    description: "Leading cross-functional teams.",
  },
  {
    name: "Soldering",
    category: "repair",
    description: "Precision electronics repair.",
  },
  // ...add more skills as needed
];

export default function Skills() {
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<(typeof SKILLS)[0] | null>(
    null,
  );
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedSkill && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedSkill]);

  const filteredSkills = filter
    ? SKILLS.filter((s) => s.category === filter)
    : SKILLS;

  return (
    <section
      role="region"
      aria-label="Skills"
      className="min-h-screen flex items-center justify-center relative pt-32"
      data-blueprint-section
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        <motion.div
          className="w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-8 text-center">
            Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              className={cn(
                "px-4 py-2 rounded-full border border-card-border text-text-secondary hover:text-text-primary hover:bg-card-hover transition",
                !filter &&
                  "bg-skill-fullstack/10 text-text-primary border-skill-fullstack",
              )}
              onClick={() => setFilter(null)}
              aria-pressed={!filter ? "true" : "false"}
            >
              All
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                className={cn(
                  "px-4 py-2 rounded-full border border-card-border text-text-secondary hover:text-text-primary hover:bg-card-hover transition",
                  filter === cat.key &&
                    `bg-${cat.color.replace("text-", "")}/10 text-${
                      cat.color
                    } border-${cat.color.replace("text-", "")}`,
                )}
                onClick={() => setFilter(cat.key)}
                aria-pressed={(filter === cat.key).toString()}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
            role="list"
          >
            {filteredSkills.map((skill) => (
              <li key={skill.name} role="listitem">
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "bg-card-bg border border-card-border rounded-xl p-6 shadow-lg cursor-pointer transition-colors hover:bg-card-hover",
                    SKILL_CATEGORIES.find((cat) => cat.key === skill.category)
                      ?.color,
                  )}
                  onClick={() => setSelectedSkill(skill)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setSelectedSkill(skill);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for ${skill.name}`}
                >
                  <h3
                    className={cn(
                      "text-xl font-bold mb-2",
                      SKILL_CATEGORIES.find((cat) => cat.key === skill.category)
                        ?.color,
                    )}
                  >
                    {skill.name}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {skill.description}
                  </p>
                </motion.div>
              </li>
            ))}
          </ul>
          <AnimatePresence>
            {selectedSkill && (
              <motion.div
                ref={modalRef}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedSkill(null)}
                role="dialog"
                aria-modal="true"
                aria-label={`Details for ${selectedSkill.name}`}
                aria-labelledby="skill-modal-title"
                aria-describedby="skill-modal-desc"
                tabIndex={-1}
                data-testid="skill-modal"
              >
                <motion.div
                  className="bg-card-bg border border-card-border rounded-xl p-8 shadow-lg max-w-md w-full relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  tabIndex={0}
                >
                  <button
                    className="absolute top-3 right-3 text-text-secondary hover:text-text-primary"
                    onClick={() => setSelectedSkill(null)}
                    aria-label="Close"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        setSelectedSkill(null);
                      }
                    }}
                  >
                    ×
                  </button>
                  <h3
                    id="skill-modal-title"
                    className={cn(
                      "text-2xl font-bold mb-4",
                      SKILL_CATEGORIES.find(
                        (cat) => cat.key === selectedSkill.category,
                      )?.color,
                    )}
                  >
                    {selectedSkill.name}
                  </h3>
                  <p id="skill-modal-desc" className="text-text-secondary mb-2">
                    {selectedSkill.description}
                  </p>
                  <span
                    className={cn(
                      "inline-block px-3 py-1 rounded-full text-xs font-semibold mt-2",
                      SKILL_CATEGORIES.find(
                        (cat) => cat.key === selectedSkill.category,
                      )?.color,
                    )}
                  >
                    {
                      SKILL_CATEGORIES.find(
                        (cat) => cat.key === selectedSkill.category,
                      )?.label
                    }
                  </span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
