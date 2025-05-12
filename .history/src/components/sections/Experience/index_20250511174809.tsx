"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EXPERIENCES = [
  {
    title: "Electronic Repair Technician",
    company: "M.E.T Repairs",
    dates: "July 2018 – Present",
    responsibilities: [
      "Conducted complex repairs on various electronics, specializing in soldering, nano device/TV repair, GPS installation, and computer hardware repair.",
      "Provided exceptional customer service, ensuring satisfaction through meticulous repairs and timely service—resulting in a high rate of return customers.",
      "Managed inventory and repair workflow, optimizing processes to improve service delivery and operational efficiency.",
      "Diagnosed and repaired electronic devices, including smartphones, tablets, laptops, and gaming consoles.",
      "Performed component-level troubleshooting and repair of circuit boards to resolve hardware issues.",
      "Utilized specialized tools and equipment to solder components and replace faulty parts.",
      "Maintained a high level of accuracy in diagnosing problems by conducting thorough testing and analysis.",
    ],
    color: "skill-fullstack",
  },
  // Add more roles here as needed
];

export default function Experience() {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
        <motion.div
          className="w-full max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-12 text-center">
            Experience
          </h2>
          <div className="relative border-l-4 border-card-border ml-4">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                className="mb-12 ml-8 relative"
              >
                {/* Timeline dot */}
                <span
                  className={cn(
                    "absolute -left-6 top-4 w-6 h-6 rounded-full border-4 border-background-dark",
                    `bg-${exp.color}`
                  )}
                  aria-hidden="true"
                />
                <div className="bg-card-bg border border-card-border rounded-xl p-6 shadow-lg">
                  <h3
                    className={cn(
                      "text-xl font-bold mb-1",
                      `text-${exp.color}`
                    )}
                  >
                    {exp.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-text-secondary text-sm font-semibold">
                      {exp.company}
                    </span>
                    <span className="text-text-secondary text-xs">•</span>
                    <span className="text-text-secondary text-sm">
                      {exp.dates}
                    </span>
                  </div>
                  <ul className="list-disc list-inside text-text-secondary text-sm space-y-1">
                    {exp.responsibilities.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
