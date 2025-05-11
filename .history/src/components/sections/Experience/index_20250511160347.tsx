"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EXPERIENCES = [
  {
    title: "Full Stack Developer",
    company: "Tech Solutions Inc.",
    dates: "2022 – Present",
    responsibilities: [
      "Built and maintained scalable web applications.",
      "Led a team of 5 engineers.",
      "Integrated third-party APIs and services.",
    ],
    color: "skill-fullstack",
  },
  {
    title: "Locksmith Lead",
    company: "Secure Entry Co.",
    dates: "2019 – 2022",
    responsibilities: [
      "Managed field operations for commercial clients.",
      "Trained and supervised junior technicians.",
      "Specialized in electronic and mechanical locks.",
    ],
    color: "skill-field",
  },
  {
    title: "Low Voltage Specialist",
    company: "SafeNet Systems",
    dates: "2017 – 2019",
    responsibilities: [
      "Installed and serviced alarm and access control systems.",
      "Collaborated with project managers on large-scale jobs.",
      "Provided on-call emergency support.",
    ],
    color: "skill-lowvoltage",
  },
  // ...add more experiences as needed
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
