"use client";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Portfolio from "@/components/sections/Portfolio";
import BlueprintRoute from "@/components/ui/BlueprintRoute";
import { motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";
import { useState } from "react";
import { ActiveSectionContext } from "@/context/ActiveSectionContext";

// Debug imports
console.log("Hero:", Hero);
console.log("About:", About);
console.log("Skills:", Skills);
console.log("Experience:", Experience);
console.log("Projects:", Projects);
console.log("Portfolio:", Portfolio);

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert" className="p-4 bg-red-100 text-red-700 rounded">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}

export default function Home() {
  // Debug component rendering
  console.log("Rendering Home component");

  const [active, setActive] = useState(0);

  // Optionally, listen for BlueprintRoute updates (to be wired in BlueprintRoute)

  return (
    <ActiveSectionContext.Provider value={{ active, setActive }}>
      <div className="relative w-full min-h-screen bg-background-dark">
        {/* BlueprintRoute as absolute, full-height, behind content */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
          <BlueprintRoute />
        </div>
        {/* Main content with scroll snap */}
        <main className="relative z-10 snap-y snap-mandatory">
          {/* Hero Section */}
          <section
            id="hero"
            className="min-h-screen flex items-center justify-center relative snap-start"
          >
            <Hero />
          </section>
          {/* About Section */}
          <section
            id="about"
            className="min-h-screen pt-32 flex items-center justify-center relative snap-start"
          >
            <About />
          </section>
          {/* Skills Section */}
          <section
            id="skills"
            className="min-h-screen pt-32 flex items-center justify-center relative snap-start"
          >
            <Skills />
          </section>
          {/* Experience Section */}
          <section
            id="experience"
            className="min-h-screen pt-32 flex items-center justify-center relative snap-start"
          >
            <Experience />
          </section>
          {/* Projects Section */}
          <section
            id="projects"
            className="min-h-screen pt-32 flex items-center justify-center relative snap-start"
          >
            <Projects />
          </section>
          {/* Portfolio Section */}
          <section
            id="portfolio"
            className="min-h-screen pt-32 flex items-center justify-center relative snap-start"
          >
            <Portfolio />
          </section>
          {/* Contact Section */}
          <section
            id="contact"
            data-blueprint-section
            className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background-dark to-background-light py-24"
          >
            <h2 className="text-4xl font-extrabold text-text-primary mb-6 text-center drop-shadow-lg">
              Contact Me
            </h2>
            <p className="text-lg text-text-secondary mb-8 text-center max-w-xl">
              Ready to connect? I'm excited to discuss how my unique blend of
              tech and hands-on skills can help your team succeed. Let's talk
              about your needs and how I can deliver results.
            </p>
            {/* Request Resume Download Form */}
            <div className="w-full max-w-lg bg-white/10 dark:bg-background-dark/60 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 flex flex-col gap-6">
              <h3 className="text-2xl font-bold text-text-primary mb-4 text-center">
                Request a Downloadable Resume
              </h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: handle download logic (show link or trigger download)
                  alert("Resume download link would be provided here.");
                }}
                autoComplete="off"
                className="flex flex-col gap-5"
              >
                <div>
                  <label
                    htmlFor="download-fullname"
                    className="block text-text-primary font-semibold mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="download-fullname"
                    name="fullname"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-card-border bg-background-light dark:bg-background-dark text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="download-company"
                    className="block text-text-primary font-semibold mb-2"
                  >
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="download-company"
                    name="company"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-card-border bg-background-light dark:bg-background-dark text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="download-phone"
                    className="block text-text-primary font-semibold mb-2"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="download-phone"
                    name="phone"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-card-border bg-background-light dark:bg-background-dark text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="download-email"
                    className="block text-text-primary font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="download-email"
                    name="email"
                    className="w-full px-4 py-2 rounded-lg border border-card-border bg-background-light dark:bg-background-dark text-text-primary focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full px-8 py-4 rounded-full bg-sky-500 text-white font-bold text-lg shadow-lg hover:bg-sky-600 transition-colors focus:outline-none focus:ring-4 focus:ring-sky-400 mt-2"
                  aria-label="Request Resume Download"
                >
                  Request Download
                </motion.button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </ActiveSectionContext.Provider>
  );
}
