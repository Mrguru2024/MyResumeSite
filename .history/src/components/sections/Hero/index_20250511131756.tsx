"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background to-background/80"
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
            Anthony "Mrguru" Feaster
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl text-primary mb-8">
            Full Stack Developer | Locksmith Lead | Low Voltage Specialist
          </h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-secondary mb-12"
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
