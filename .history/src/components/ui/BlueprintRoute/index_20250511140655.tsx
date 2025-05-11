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

const X_LEFT = 80;
const X_RIGHT = 480;
const X_CENTER = 280;
const SVG_WIDTH = 560;

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

  // Zig-zag X positions for each marker
  const markerPoints = sectionCenters.map((y, i) => ({
    x: i % 2 === 0 ? X_LEFT : X_RIGHT,
    y: (y ?? 0) - (sectionCenters[0] ?? 0),
  }));

  // SVG path string for zig-zag with Bezier curves
  let pathD = "";
  if (markerPoints.length) {
    pathD = `M ${markerPoints[0].x} ${markerPoints[0].y}`;
    for (let i = 1; i < markerPoints.length; i++) {
      const prev = markerPoints[i - 1];
      const curr = markerPoints[i];
      const c1x = prev.x + (curr.x - prev.x) / 2;
      const c1y = prev.y;
      const c2x = prev.x + (curr.x - prev.x) / 2;
      const c2y = curr.y;
      pathD += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${curr.x} ${curr.y}`;
    }
  }

  // Calculate traveler position along the zig-zag path
  const total =
    sectionCenters[sectionCenters.length - 1] - sectionCenters[0] || 1;
  const progress = Math.min(
    1,
    Math.max(
      0,
      (scrollY + window.innerHeight / 2 - sectionCenters[0]) / (total || 1)
    )
  );
  function getTravelerPos(t: number) {
    if (markerPoints.length < 2) return { x: X_CENTER, y: 0 };
    const seg = 1 / (markerPoints.length - 1);
    const idx = Math.floor(t / seg);
    const frac = (t - idx * seg) / seg;
    const p1 = markerPoints[idx];
    const p2 = markerPoints[idx + 1] || p1;
    return {
      x: p1.x + (p2.x - p1.x) * frac,
      y: p1.y + (p2.y - p1.y) * frac,
    };
  }
  const traveler = getTravelerPos(progress);

  return (
    <svg
      ref={svgRef}
      width={SVG_WIDTH}
      height={markerPoints[markerPoints.length - 1]?.y || svgHeight}
      style={{
        minHeight: 400,
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
      }}
      className="w-full h-full"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={pathD}
        fill="none"
        stroke="#3b82f6"
        strokeWidth={6}
        strokeDasharray="18 12"
        filter="url(#glow)"
      />
      {/* Markers */}
      {markerPoints.map((pt, i) => (
        <g key={SECTIONS[i].id}>
          <motion.circle
            cx={pt.x}
            cy={pt.y}
            r={active === i ? 22 : 16}
            fill={active === i ? "#3b82f6" : "#1e293b"}
            stroke="#fff"
            strokeWidth={4}
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
            x={pt.x}
            y={pt.y + 10}
            textAnchor="middle"
            fontSize={active === i ? 32 : 22}
            fill="#fff"
            style={{ pointerEvents: "none" }}
          >
            {SECTIONS[i].icon}
          </text>
          {/* Tooltip */}
          {active === i && (
            <foreignObject
              x={pt.x + (pt.x < SVG_WIDTH / 2 ? 30 : -130)}
              y={pt.y - 20}
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
        cx={traveler.x}
        cy={traveler.y}
        r={18}
        fill="#fbbf24"
        stroke="#fff"
        strokeWidth={5}
        animate={{ filter: "drop-shadow(0 0 16px #fbbf24)" }}
      />
    </svg>
  );
}
