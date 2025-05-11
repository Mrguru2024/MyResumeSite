import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Portfolio from "@/components/sections/Portfolio";
import BlueprintRoute from "@/components/ui/BlueprintRoute";
import ScrollJourneyNav from "@/components/ui/ScrollJourneyNav";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="relative w-full min-h-screen bg-background-dark overflow-x-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <BlueprintRoute />
      </div>
      <ScrollJourneyNav />
      <main className="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory px-16 md:px-32 lg:px-48">
        <motion.div
          className="snap-start h-screen flex items-center justify-center"
          id="hero"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Hero />
        </motion.div>
        <motion.div
          className="snap-start h-screen flex items-center justify-center"
          id="about"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <About />
        </motion.div>
        <motion.div
          className="snap-start h-screen flex items-center justify-center"
          id="skills"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Skills />
        </motion.div>
        <motion.div
          className="snap-start h-screen flex items-center justify-center"
          id="experience"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Experience />
        </motion.div>
        <motion.div
          className="snap-start h-screen flex items-center justify-center"
          id="portfolio"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Portfolio />
        </motion.div>
      </main>
    </div>
  );
}
