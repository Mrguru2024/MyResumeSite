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
  {
    title: "Web Development Project",
    company: "SSI Success Solutions Inc.",
    dates: "January 2024 – December 2024 (Ongoing)",
    responsibilities: [
      "Challenge: Develop a comprehensive web application to streamline services for SSI.",
      "Action: Lead development using HTML, CSS, JavaScript, and React, with backend services implemented using Node.js, Express, and MongoDB.",
      "Anticipated Result: Deliver a high-quality, user-friendly application to enhance client engagement and operational efficiency.",
    ],
    color: "skill-field",
  },
  {
    title: "Low Voltage/Network Installation Technician",
    company: "Boss Networks",
    dates: "January 2023 – October 2024",
    responsibilities: [
      "Installed and configured low voltage network systems, ensuring all installations met organizational and industry standards.",
      "Performed troubleshooting and maintenance to quickly identify and resolve issues, minimizing downtime.",
      "Implemented network security protocols to protect systems from unauthorized access and cyber threats.",
      "Installed and maintained low voltage electrical systems, including security systems, fire alarms, and audiovisual equipment.",
      "Collaborated with clients to determine needs and provided recommendations for installations.",
    ],
    color: "skill-lowvoltage",
  },
  {
    title: "Locksmith | Mobile Locksmith Technician",
    company: "Middle GA",
    dates: "April 2019 – August 2023",
    responsibilities: [
      "Provided mobile locksmith services: on-site lock rekeying, key duplication, and automotive key services.",
      "Maintained locksmith tools and managed inventory for emergency services.",
      "Built a strong reputation for reliability and service quality, leading to increased referrals and repeat business.",
      "Responded to emergency lockout situations promptly and efficiently.",
      "Rekeyed locks, provided expert advice on high-security locks, and safely opened locked doors without damage.",
    ],
    color: "skill-cert",
  },
  {
    title: "Technical Repair and Inventory Specialist",
    company: "Office Depot",
    dates: "August 2015 – April 2016",
    responsibilities: [
      "Provided cell phone repair services and managed maintenance of technical equipment.",
      "Optimized inventory management practices, reducing waste and ensuring availability of repair components.",
      "Delivered exceptional customer service, increasing satisfaction and loyalty.",
    ],
    color: "skill-project",
  },
  {
    title: "Floor Tech Supervisor",
    company: "G & A Services",
    dates: "March 2015 – February 2016",
    responsibilities: [
      "Supervised floor tech teams in buffer, wax, and strip operations.",
      "Streamlined workflow to improve cleaning efficiency and maintain quality.",
      "Implemented and enforced safety protocols, reducing workplace accidents.",
    ],
    color: "skill-leadership",
  },
  {
    title: "Forklift Operator",
    company: "Americold Logistics",
    dates: "October 2013 – June 2014",
    responsibilities: [
      "Operated forklifts to safely and efficiently move materials, meeting productivity targets.",
      "Managed order picking and product inspection to ensure accuracy and quality.",
      "Provided training and mentorship to new forklift operators.",
    ],
    color: "skill-other",
  },
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
