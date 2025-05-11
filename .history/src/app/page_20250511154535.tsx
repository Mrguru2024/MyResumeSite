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
    <div className="w-full">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative">
        <Hero />
      </section>
      {/* BlueprintRoute in flow, with vertical margin */}
      <div className="w-full my-24">
        <BlueprintRoute />
      </div>
      {/* About Section */}
      <section id="about" className="min-h-screen mt-24 flex items-center justify-center relative">
        <About />
      </section>
      {/* Skills Section */}
      <section id="skills" className="min-h-screen mt-24 flex items-center justify-center relative">
        <Skills />
      </section>
      {/* Experience Section */}
      <section id="experience" className="min-h-screen mt-24 flex items-center justify-center relative">
        <Experience />
      </section>
      {/* Portfolio Section */}
      <section id="portfolio" className="min-h-screen mt-24 flex items-center justify-center relative">
        <Portfolio />
      </section>
    </div>
  );
}
