"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Hero", icon: "🏁" },
  { id: "about", label: "About", icon: "👤" },
  { id: "skills", label: "Skills", icon: "🛠️" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "portfolio", label: "Portfolio", icon: "📁" },
];

export default function BlueprintRoute() {
  const [sectionCenters, setSectionCenters] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  // Measure section centers on mount/resize
  useEffect(() => {
    function measureSections() {
      const centers = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });
      setSectionCenters(centers);
      setSvgHeight(window.innerHeight * 0.8);
    }
    measureSections();
    window.addEventListener("resize", measureSections);
    return () => window.removeEventListener("resize", measureSections);
  }, []);

  // Update active section and scroll position
  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY);
      const winH = window.innerHeight;
      const idx = sectionCenters.findIndex(
        (center, i) =>
          window.scrollY + winH / 2 < (sectionCenters[i + 1] ?? Infinity)
      );
      setActive(idx === -1 ? SECTIONS.length - 1 : idx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionCenters]);

  // Calculate traveler position (0-1) based on scroll
  const total =
    sectionCenters[sectionCenters.length - 1] - sectionCenters[0] || 1;
  const progress = Math.min(
    1,
    Math.max(
      0,
      (scrollY + window.innerHeight / 2 - sectionCenters[0]) / (total || 1)
    )
  );

  // Interpolate traveler position along the path
  function getTravelerY(t: number) {
    if (sectionCenters.length < 2) return 0;
    const seg = 1 / (sectionCenters.length - 1);
    const idx = Math.floor(t / seg);
    const frac = (t - idx * seg) / seg;
    const y1 = (sectionCenters[idx] ?? 0) - (sectionCenters[0] ?? 0);
    const y2 = (sectionCenters[idx + 1] ?? y1) - (sectionCenters[0] ?? 0);
    return y1 + (y2 - y1) * frac;
  }
  const travelerY = getTravelerY(progress);

  // Build SVG path string (vertical, but can be curved/zig-zag for more style)
  const markerYs = sectionCenters.map(
    (c) => (c ?? 0) - (sectionCenters[0] ?? 0)
  );
  const pathD = markerYs.length
    ? markerYs.map((y, i) => `${i === 0 ? "M" : "L"} 32 ${y}`).join(" ")
    : "";

  return (
    <div
      className="fixed left-1/2 top-0 -translate-x-1/2 z-50 flex flex-col items-center w-32 pointer-events-none"
      style={{ height: "100vh" }}
    >
      <svg
        ref={svgRef}
        width={64}
        height={markerYs[markerYs.length - 1] || svgHeight}
        style={{ minHeight: 400, position: "absolute", top: 0, left: 0 }}
        className="h-full"
      >
        <path
          d={pathD}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={5}
          strokeDasharray="12 8"
        />
        {/* Markers */}
        {markerYs.map((y, i) => (
          <g key={SECTIONS[i].id}>
            <motion.circle
              cx={32}
              cy={y}
              r={active === i ? 18 : 14}
              fill={active === i ? "#3b82f6" : "#1e293b"}
              stroke="#fff"
              strokeWidth={3}
              style={{ cursor: "pointer", pointerEvents: "auto" }}
              onClick={() => {
                document
                  .getElementById(SECTIONS[i].id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            />
            <text
              x={32}
              y={y + 8}
              textAnchor="middle"
              fontSize={active === i ? 28 : 20}
              fill="#fff"
              style={{ pointerEvents: "none" }}
            >
              {SECTIONS[i].icon}
            </text>
            {/* Tooltip */}
            {active === i && (
              <foreignObject
                x={40}
                y={y - 20}
                width={120}
                height={40}
                style={{ pointerEvents: "none" }}
              >
                <div className="bg-skill-fullstack text-white text-xs rounded px-2 py-1 shadow-lg animate-fade-in pointer-events-none">
                  {SECTIONS[i].label}
                </div>
              </foreignObject>
            )}
          </g>
        ))}
        {/* Traveler */}
        <motion.circle
          cx={32}
          cy={travelerY}
          r={16}
          fill="#fbbf24"
          stroke="#fff"
          strokeWidth={4}
          animate={{ filter: "drop-shadow(0 0 12px #fbbf24)" }}
        />
      </svg>
    </div>
  );
}
