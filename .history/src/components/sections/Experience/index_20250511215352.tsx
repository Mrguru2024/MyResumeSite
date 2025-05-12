"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const EXPERIENCES = [
  {
    title: "Electronic Repair Technician & Locksmith",
    company: "M.E.T Repairs",
    dates: "July 2018 – Present",
    responsibilities: [
      "Faced with a wide range of electronic failures, I diagnosed and resolved issues through advanced soldering, nano device/TV repair, GPS installation, and computer hardware repair, restoring full device functionality.",
      "When customers needed urgent repairs, I delivered meticulous, timely service—turning stressful situations into positive experiences and earning repeat business.",
      "To address workflow bottlenecks, I optimized inventory management and repair processes, resulting in faster turnaround and improved operational efficiency.",
      "When devices like smartphones, tablets, laptops, and gaming consoles malfunctioned, I quickly identified root causes and performed precise repairs to restore performance.",
      "For complex circuit board failures, I performed component-level troubleshooting and repairs, ensuring long-term reliability.",
      "When faulty parts threatened device performance, I used specialized tools to expertly solder and replace components, extending device lifespan.",
      "To prevent recurring issues, I conducted thorough testing and analysis, ensuring every repair met the highest standards of accuracy.",
      "When clients faced lockouts or security concerns, I provided rapid on-site rekeying, key duplication, and automotive key services, restoring access and peace of mind.",
      "For property security upgrades, I rekeyed locks, advised on high-security options, and performed non-destructive entry when needed.",
      "By combining electronic repair and locksmith expertise, I delivered comprehensive solutions that addressed both digital and physical security needs.",
    ],
    color: "skill-fullstack",
  },
  {
    title: "Web Development Project",
    company: "SSI Success Solutions Inc.",
    dates: "January 2024 – December 2024 (Ongoing)",
    responsibilities: [
      "SSI needed a streamlined service platform—so I led the development of a comprehensive web application, transforming manual processes into a digital solution.",
      "Faced with integration challenges, I architected the app using HTML, CSS, JavaScript, React, Node.js, Express, and MongoDB, ensuring seamless client and backend operations.",
      "The result: a user-friendly application that enhances client engagement and operational efficiency for SSI.",
    ],
    color: "skill-field",
  },
  {
    title: "Low Voltage/Network Installation Technician",
    company: "Boss Networks",
    dates: "January 2023 – October 2024",
    responsibilities: [
      "When network performance was critical, I installed and configured low voltage systems to meet and exceed industry standards, ensuring optimal reliability.",
      "To minimize costly downtime, I proactively troubleshot and maintained network systems, resolving issues before they escalated.",
      "Faced with security threats, I implemented and maintained robust network security protocols, protecting systems from unauthorized access.",
      "When clients needed specialized systems, I installed and maintained security, fire alarm, and audiovisual equipment tailored to their needs.",
      "To ensure client satisfaction, I collaborated closely to assess requirements and recommend the best low voltage solutions.",
    ],
    color: "skill-lowvoltage",
  },
  {
    title: "Locksmith | Mobile Locksmith Technician",
    company: "Middle GA",
    dates: "April 2019 – August 2023",
    responsibilities: [
      "When clients faced lockouts or security concerns, I provided rapid on-site rekeying, key duplication, and automotive key services, restoring access and peace of mind.",
      "To ensure readiness for emergencies, I maintained tools and managed inventory, enabling quick response to urgent calls.",
      "By consistently delivering reliable, high-quality service, I built a reputation that drove customer referrals and repeat business.",
      "In emergency lockout situations, I responded promptly and efficiently, minimizing client stress and property disruption.",
      "For property security upgrades, I rekeyed locks, advised on high-security options, and performed non-destructive entry when needed.",
    ],
    color: "skill-cert",
  },
  {
    title: "Technical Repair and Inventory Specialist",
    company: "Office Depot",
    dates: "August 2015 – April 2016",
    responsibilities: [
      "When technical equipment failed, I provided expert cell phone repairs and maintenance, restoring functionality and minimizing downtime.",
      "To reduce waste and ensure repair readiness, I optimized inventory management, keeping essential components in stock.",
      "By focusing on customer needs, I delivered service that increased satisfaction and loyalty.",
    ],
    color: "skill-project",
  },
  {
    title: "Floor Tech Supervisor",
    company: "G & A Services",
    dates: "March 2015 – February 2016",
    responsibilities: [
      "Tasked with maintaining facility cleanliness, I led teams in buffer, wax, and strip operations, ensuring high standards across all shifts.",
      "To improve efficiency, I streamlined cleaning workflows, delivering consistent quality and faster results.",
      "By enforcing safety protocols, I reduced workplace accidents and created a safer environment for all staff.",
    ],
    color: "skill-leadership",
  },
  {
    title: "Forklift Operator",
    company: "Americold Logistics",
    dates: "October 2013 – June 2014",
    responsibilities: [
      "When material movement was critical, I operated forklifts to safely and efficiently meet daily productivity targets.",
      "To ensure shipment accuracy, I managed order picking and product inspection, maintaining high quality standards.",
      "By mentoring new operators, I improved team efficiency and upheld safety protocols.",
    ],
    color: "skill-other",
  },
];

export default function Experience() {
  return (
    <section
      className="min-h-screen flex items-center justify-center relative pt-32"
      data-blueprint-section
    >
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
                    `bg-${exp.color}`,
                  )}
                  aria-hidden="true"
                />
                <div className="bg-background-dark/90 border border-card-border rounded-xl p-6 shadow-xl backdrop-blur-sm">
                  <h3
                    className={cn(
                      "text-xl font-bold mb-1 text-text-primary",
                      `text-${exp.color}`,
                      exp.title === "Locksmith | Mobile Locksmith Technician" &&
                        "text-emerald-500",
                      exp.title ===
                        "Technical Repair and Inventory Specialist" &&
                        "text-blue-500",
                      exp.title === "Forklift Operator" && "text-yellow-500",
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
                  <ul className="list-disc list-inside text-text-secondary text-[15px] font-medium space-y-1">
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
