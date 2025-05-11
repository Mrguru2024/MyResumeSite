"use client";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Portfolio from "@/components/sections/Portfolio";
import BlueprintRoute from "@/components/ui/BlueprintRoute";
import { motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";

// Debug imports
console.log("Hero:", Hero);
console.log("About:", About);
console.log("Skills:", Skills);
console.log("Experience:", Experience);
console.log("Portfolio:", Portfolio);
console.log("BlueprintRoute:", BlueprintRoute);

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

  return (
    <div className="relative w-full min-h-screen">
      {/* BlueprintRoute as a fixed background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <BlueprintRoute />
        </ErrorBoundary>
      </div>

      {/* Main content with glass effect */}
      <main className="relative z-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <motion.div
              className="min-h-screen flex items-center justify-center"
              id="hero"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Hero />
            </motion.div>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <motion.div
              className="min-h-screen flex items-center justify-center"
              id="about"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <About />
            </motion.div>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <motion.div
              className="min-h-screen flex items-center justify-center"
              id="skills"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Skills />
            </motion.div>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <motion.div
              className="min-h-screen flex items-center justify-center"
              id="experience"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Experience />
            </motion.div>
          </ErrorBoundary>

          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <motion.div
              className="min-h-screen flex items-center justify-center"
              id="portfolio"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Portfolio />
            </motion.div>
          </ErrorBoundary>
        </div>
      </main>
    </div>
  );
}
