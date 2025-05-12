"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const TAGS = [
  { key: "software", label: "Software", color: "skill-fullstack" },
  { key: "repairs", label: "Repairs", color: "skill-repair" },
  { key: "gps", label: "GPS", color: "skill-field" },
  { key: "eeprom", label: "EEPROM", color: "skill-lowvoltage" },
];

const PROJECTS = [
  {
    title: "Fleet Tracker App",
    tags: ["software", "gps"],
    description: "Real-time GPS tracking for commercial fleets.",
    caseStudy: {
      challenge: "Needed to monitor and optimize vehicle routes in real time.",
      action: "Developed a React/Node.js app with live GPS integration.",
      result: "Reduced delivery times by 20% and improved fleet safety.",
    },
  },
  {
    title: "Lock Repair Automation",
    tags: ["repairs", "software"],
    description: "Automated diagnostics for electronic lock repairs.",
    caseStudy: {
      challenge: "Manual lock diagnostics were slow and error-prone.",
      action: "Built a tool to automate testing and reporting.",
      result: "Cut repair time in half and improved accuracy.",
    },
  },
  {
    title: "EEPROM Key Programming",
    tags: ["eeprom", "repairs"],
    description: "Custom scripts for EEPROM-based key programming.",
    caseStudy: {
      challenge:
        "Needed to program keys for modern vehicles with EEPROM chips.",
      action: "Created scripts and hardware interface for safe programming.",
      result: "Enabled new revenue stream and faster service for clients.",
    },
  },
  // ...add more projects as needed
];

export default function Portfolio() {
  const [filter, setFilter] = useState<string | null>(null);
  const [selected, setSelected] = useState<(typeof PROJECTS)[0] | null>(null);

  const filtered = filter
    ? PROJECTS.filter((p) => p.tags.includes(filter))
    : PROJECTS;

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        <motion.div
          className="w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-8 text-center">
            Portfolio Projects
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <button
              className={cn(
                "px-4 py-2 rounded-full border border-card-border text-text-secondary hover:text-text-primary hover:bg-card-hover transition",
                !filter &&
                  "bg-skill-fullstack/10 text-text-primary border-skill-fullstack",
              )}
              onClick={() => setFilter(null)}
            >
              All
            </button>
            {TAGS.map((tag) => (
              <button
                key={tag.key}
                className={cn(
                  "px-4 py-2 rounded-full border border-card-border text-text-secondary hover:text-text-primary hover:bg-card-hover transition",
                  filter === tag.key &&
                    `bg-${tag.color}/10 text-${tag.color} border-${tag.color}`,
                )}
                onClick={() => setFilter(tag.key)}
              >
                {tag.label}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filtered.map((project) => (
              <motion.div
                key={project.title}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="bg-card-bg border border-card-border rounded-xl p-6 shadow-lg cursor-pointer transition-colors hover:bg-card-hover"
                onClick={() => setSelected(project)}
                tabIndex={0}
                role="button"
                aria-label={`View details for ${project.title}`}
              >
                <h3 className="text-xl font-bold mb-2 text-text-primary">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.tags.map((tag) => {
                    const tagObj = TAGS.find((t) => t.key === tag);
                    return (
                      <span
                        key={tag}
                        className={cn(
                          "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                          `bg-${tagObj?.color}/10 text-${tagObj?.color} border border-${tagObj?.color}`,
                        )}
                      >
                        {tagObj?.label}
                      </span>
                    );
                  })}
                </div>
                <p className="text-text-secondary text-sm">
                  {project.description}
                </p>
              </motion.div>
            ))}
          </div>
          <AnimatePresence>
            {selected && (
              <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelected(null)}
              >
                <motion.div
                  className="bg-card-bg border border-card-border rounded-xl p-8 shadow-lg max-w-md w-full relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-3 right-3 text-text-secondary hover:text-text-primary"
                    onClick={() => setSelected(null)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                  <h3 className="text-2xl font-bold mb-4 text-text-primary">
                    {selected.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {selected.tags.map((tag) => {
                      const tagObj = TAGS.find((t) => t.key === tag);
                      return (
                        <span
                          key={tag}
                          className={cn(
                            "inline-block px-3 py-1 rounded-full text-xs font-semibold",
                            `bg-${tagObj?.color}/10 text-${tagObj?.color} border border-${tagObj?.color}`,
                          )}
                        >
                          {tagObj?.label}
                        </span>
                      );
                    })}
                  </div>
                  <div className="mb-2">
                    <strong className="block text-text-accent mb-1">
                      Challenge
                    </strong>
                    <p className="text-text-secondary mb-2">
                      {selected.caseStudy.challenge}
                    </p>
                    <strong className="block text-text-accent mb-1">
                      Action
                    </strong>
                    <p className="text-text-secondary mb-2">
                      {selected.caseStudy.action}
                    </p>
                    <strong className="block text-text-accent mb-1">
                      Result
                    </strong>
                    <p className="text-text-secondary">
                      {selected.caseStudy.result}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
