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
        {/* Portfolio Section */}
        <section
          id="portfolio"
          className="min-h-screen pt-32 flex items-center justify-center relative snap-start"
        >
          <Portfolio />
        </section>
      </main>
    </div>
  );
}
