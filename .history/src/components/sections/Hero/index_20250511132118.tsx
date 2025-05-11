"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background-dark">
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background-dark to-background-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Anthony "Mrguru" Feaster
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-text-accent mb-8">
            Full Stack Developer | Locksmith Lead | Low Voltage Specialist
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-text-secondary mb-12"
          >
            I fix. I code. I lead. I build what's needed.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              onClick={() => {
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              variant="primary"
              size="lg"
            >
              Begin Journey
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
