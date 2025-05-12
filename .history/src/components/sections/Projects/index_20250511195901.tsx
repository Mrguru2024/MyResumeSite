"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

const PROJECTS = [
  {
    name: "MyResumeSite",
    description:
      "Interactive resume website built with Next.js, React, and Framer Motion",
    language: "TypeScript",
    url: "https://github.com/Mrguru2024/MyResumeSite",
    updated: "May 11, 2025",
    topics: ["nextjs", "react", "typescript", "framer-motion", "tailwindcss"],
  },
  {
    name: "mcp-nextjs-boilerplate",
    description: "Modular Component Pattern boilerplate for Next.js projects",
    language: "TypeScript",
    url: "https://github.com/Mrguru2024/mcp-nextjs-boilerplate",
    updated: "May 9, 2025",
    topics: ["nextjs", "typescript", "boilerplate", "mcp"],
  },
  {
    name: "Newsletter",
    description: "Newsletter subscription and management application",
    language: "JavaScript",
    url: "https://github.com/Mrguru2024/Newsletter",
    updated: "May 7, 2025",
    topics: ["javascript", "newsletter", "subscription"],
  },
  {
    name: "PersonalPortfolio",
    description: "Personal portfolio website showcasing projects and skills",
    language: "TypeScript",
    url: "https://github.com/Mrguru2024/PersonalPortfolio",
    updated: "May 5, 2025",
    topics: ["typescript", "portfolio", "react"],
  },
  {
    name: "IncomeIntelligence",
    description: "Financial tracking and analysis application",
    language: "TypeScript",
    url: "https://github.com/Mrguru2024/IncomeIntelligence",
    updated: "May 4, 2025",
    topics: ["typescript", "finance", "analytics"],
  },
  {
    name: "StackrLaunch",
    description: "Stack-based deployment and management platform",
    language: "TypeScript",
    url: "https://github.com/Mrguru2024/StackrLaunch",
    updated: "May 4, 2025",
    topics: ["typescript", "deployment", "devops"],
  },
  {
    name: "inventoryapp",
    description: "Inventory management system for businesses",
    language: "TypeScript",
    url: "https://github.com/Mrguru2024/inventoryapp",
    updated: "Apr 12, 2025",
    topics: ["typescript", "inventory", "management"],
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof PROJECTS)[0] | null
  >(null);

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">
            Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-background-dark/90 border border-card-border rounded-xl p-6 shadow-xl backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-text-primary">
                    {project.name}
                  </h3>
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-500">
                    {project.language}
                  </span>
                </div>
                <p className="text-text-secondary text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs px-2 py-1 rounded-full bg-card-hover text-text-secondary"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">
                    Updated {project.updated}
                  </span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-500 hover:text-emerald-400 text-sm font-medium transition-colors"
                  >
                    View Project →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
