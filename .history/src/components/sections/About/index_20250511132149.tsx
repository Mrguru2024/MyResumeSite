"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center bg-background-dark py-20"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">
            About Me
          </h2>

          <div className="relative perspective-1000">
            <motion.button
              type="button"
              aria-pressed={isFlipped}
              tabIndex={0}
              className={cn(
                "relative w-full h-[400px] transition-transform duration-500 transform-style-3d focus:outline-none",
                isFlipped && "rotate-y-180",
              )}
              onClick={() => setIsFlipped(!isFlipped)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              role="button"
            >
              {/* Front of card */}
              <motion.div
                className={cn(
                  "absolute inset-0 backface-hidden bg-card-bg border border-card-border rounded-xl p-8 shadow-lg",
                  isFlipped && "hidden",
                )}
              >
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="w-32 h-32 rounded-full bg-skill-fullstack/10 mb-6 flex items-center justify-center">
                    <span className="text-4xl">👨‍💻</span>
                  </div>
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Anthony "Mrguru" Feaster
                  </h3>
                  <p className="text-lg text-text-secondary">
                    A versatile professional bridging the gap between technology
                    and hands-on expertise.
                  </p>
                </div>
              </motion.div>

              {/* Back of card */}
              <motion.div
                className={cn(
                  "absolute inset-0 backface-hidden bg-card-bg border border-card-border rounded-xl p-8 shadow-lg rotate-y-180",
                  !isFlipped && "hidden",
                )}
              >
                <div className="h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-text-primary mb-4">
                    Professional Summary
                  </h3>
                  <p className="text-text-secondary mb-4">
                    As a Full Stack Developer and Field Technician, I combine
                    technical expertise with practical problem-solving skills.
                    My experience spans from developing modern web applications
                    to hands-on locksmith and low voltage work.
                  </p>
                  <p className="text-text-secondary">
                    I lead teams, manage projects, and deliver solutions that
                    make a real impact. Whether it's coding, fixing, or
                    building, I'm passionate about creating efficient, reliable
                    systems that solve real-world problems.
                  </p>
                </div>
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
