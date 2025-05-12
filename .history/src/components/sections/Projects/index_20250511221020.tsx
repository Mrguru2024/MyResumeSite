"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { GitHubRepo, getRepositories } from "@/lib/github";
import Image from "next/image";

// Fallback data in case API fails
const FALLBACK_PROJECTS = [
  {
    name: "MyResumeSite",
    description:
      "Interactive resume website built with Next.js, React, and Framer Motion",
    language: "TypeScript",
    html_url: "https://github.com/Mrguru2024/MyResumeSite",
    updated_at: "2025-05-11T00:00:00Z",
    topics: ["nextjs", "react", "typescript", "framer-motion", "tailwindcss"],
    homepage: null,
    stargazers_count: 0,
    forks_count: 0,
  },
  // ... other fallback projects ...
];

export default function Projects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<GitHubRepo | null>(
    null,
  );
  const [previewError, setPreviewError] = useState<Record<string, boolean>>({});

  useEffect(() => {
    async function fetchProjects() {
      try {
        const repos = await getRepositories("Mrguru2024");
        setProjects(repos);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center relative pt-32"
      data-blueprint-section
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center flex items-center justify-center gap-3">
            <span className="inline-block align-middle">Projects</span>
            <span className="inline-block align-middle">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="8"
                  fill="#10b981"
                  filter="url(#glow)"
                />
                <defs>
                  <filter
                    id="glow"
                    x="-4"
                    y="-4"
                    width="30"
                    height="30"
                    filterUnits="userSpaceOnUse"
                  >
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
            </span>
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.updated_at).getTime() -
                    new Date(a.updated_at).getTime(),
                )
                .slice(0, 6)
                .map((project, idx) => (
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
                      {project.description || "No description available"}
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
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-text-secondary">
                          Updated {formatDate(project.updated_at)}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-secondary">
                            ⭐ {project.stargazers_count}
                          </span>
                          <span className="text-xs text-text-secondary">
                            🔄 {project.forks_count}
                          </span>
                        </div>
                      </div>
                      <a
                        href={project.html_url}
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
          )}
        </motion.div>
      </div>
    </section>
  );
}
