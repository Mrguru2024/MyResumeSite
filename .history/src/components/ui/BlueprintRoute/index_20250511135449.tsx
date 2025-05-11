"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Hero", icon: "🏁" },
  { id: "about", label: "About", icon: "👤" },
  { id: "skills", label: "Skills", icon: "🛠️" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "portfolio", label: "Portfolio", icon: "📁" },
];

// SVG path points for a zig-zag route (normalized 0-1, will scale to height)
const ZIGZAG_POINTS = [
  { x: 0.2, y: 0 },
  { x: 0.8, y: 0.2 },
  { x: 0.2, y: 0.4 },
  { x: 0.8, y: 0.6 },
  { x: 0.2, y: 0.8 },
  { x: 0.8, y: 1 },
];

function getSectionOffsets() {
  if (typeof window === "undefined") return SECTIONS.map(() => 0);
  return SECTIONS.map((s) => {
    const el = document.getElementById(s.id);
    return el ? el.getBoundingClientRect().top + window.scrollY : 0;
  });
}

export default function BlueprintRoute() {
  const [active, setActive] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  // Update active section and scroll position
  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY);
      const offsets = getSectionOffsets();
      const winH = window.innerHeight;
      const idx = offsets.findIndex(
        (off, i) => window.scrollY + winH / 2 < (offsets[i + 1] ?? Infinity)
      );
      setActive(idx === -1 ? SECTIONS.length - 1 : idx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Responsive SVG height
  useEffect(() => {
    function onResize() {
      setSvgHeight(window.innerHeight * 0.8);
    }
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Calculate traveler position (0-1) based on scroll
  const offsets = getSectionOffsets();
  const total = offsets[offsets.length - 1] - offsets[0] || 1;
  const progress = Math.min(
    1,
    Math.max(0, (scrollY - offsets[0]) / (total || 1))
  );

  // Interpolate traveler position along the zig-zag path
  function getTravelerPos(t: number) {
    // t: 0-1
    const seg = 1 / (ZIGZAG_POINTS.length - 1);
    const idx = Math.floor(t / seg);
    const frac = (t - idx * seg) / seg;
    const p1 = ZIGZAG_POINTS[idx];
    const p2 = ZIGZAG_POINTS[idx + 1] || p1;
    return {
      x: p1.x + (p2.x - p1.x) * frac,
      y: p1.y + (p2.y - p1.y) * frac,
    };
  }
  const traveler = getTravelerPos(progress);

  // Build SVG path string
  const pathD = ZIGZAG_POINTS.map(
    (p, i) => `${i === 0 ? "M" : "L"} ${p.x * 64} ${p.y * svgHeight}`
  ).join(" ");

  return (
    <div className="fixed left-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center h-4/5 select-none pointer-events-none">
      <svg
        ref={svgRef}
        width={64}
        height={svgHeight}
        style={{ minHeight: 400 }}
        className="absolute left-1/2 -translate-x-1/2 h-full"
      >
        <path
          d={pathD}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={5}
          strokeDasharray="12 8"
        />
        {/* Markers */}
        {SECTIONS.map((section, i) => {
          const pt = ZIGZAG_POINTS[i];
          return (
            <g key={section.id}>
              <circle
                cx={pt.x * 64}
                cy={pt.y * svgHeight}
                r={active === i ? 16 : 12}
                fill={active === i ? "#3b82f6" : "#1e293b"}
                stroke="#fff"
                strokeWidth={3}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              />
              <text
                x={pt.x * 64}
                y={pt.y * svgHeight - 24}
                textAnchor="middle"
                fontSize={active === i ? 24 : 18}
                fill="#fff"
                style={{ pointerEvents: "none" }}
              >
                {section.icon}
              </text>
            </g>
          );
        })}
        {/* Traveler */}
        <motion.circle
          cx={traveler.x * 64}
          cy={traveler.y * svgHeight}
          r={14}
          fill="#fbbf24"
          stroke="#fff"
          strokeWidth={4}
          animate={{ filter: "drop-shadow(0 0 12px #fbbf24)" }}
        />
      </svg>
    </div>
  );
}
