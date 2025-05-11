"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const SECTIONS = [
  { id: "hero", label: "Hero", icon: "🏁", color: "#3b82f6" },
  { id: "about", label: "About", icon: "👤", color: "#10b981" },
  { id: "skills", label: "Skills", icon: "🛠️", color: "#f59e0b" },
  { id: "experience", label: "Experience", icon: "💼", color: "#8b5cf6" },
  { id: "portfolio", label: "Portfolio", icon: "📁", color: "#ec4899" },
];

const X_LEFT = 80;
const X_RIGHT = 480;
const X_CENTER = 280;
const SVG_WIDTH = 560;
const MARKER_RADIUS = 22;
const TRAVELER_RADIUS = 18;

export default function BlueprintRoute() {
  const [sectionCenters, setSectionCenters] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Measure section centers and viewport on mount/resize
  useEffect(() => {
    if (!isMounted) return;
    function measureSections() {
      const centers = SECTIONS.map((s) => {
        const el = document.getElementById(s.id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });
      setSectionCenters(centers);
      setSvgHeight(window.innerHeight * SECTIONS.length);
      setViewportHeight(window.innerHeight);
    }
    measureSections();
    window.addEventListener("resize", measureSections);
    return () => window.removeEventListener("resize", measureSections);
  }, [isMounted]);

  // Update active section and scroll position
  useEffect(() => {
    if (!isMounted) return;
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
  }, [sectionCenters, isMounted]);

  // Calculate marker positions with padding
  const markerPoints = sectionCenters.map((y, i) => {
    const baseY = (y ?? 0) - (sectionCenters[0] ?? 0);
    // Add padding at start and end
    const padding = MARKER_RADIUS * 2;
    const adjustedY =
      i === 0
        ? baseY + padding
        : i === SECTIONS.length - 1
        ? baseY - padding
        : baseY;
    return {
      x: i % 2 === 0 ? X_LEFT : X_RIGHT,
      y: adjustedY,
    };
  });

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
  const progress = isMounted
    ? Math.min(
        1,
        Math.max(
          0,
          (scrollY + viewportHeight / 2 - sectionCenters[0]) / (total || 1)
        )
      )
    : 0;

  // Ensure svgHeight is valid
  const validSvgHeight = svgHeight || 0;

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

  // Debug: Log SVG height and path data
  console.log("[BlueprintRoute] svgHeight:", svgHeight, "pathD:", pathD);

  if (!isMounted) {
    return null;
  }

  return (
    <svg
      ref={svgRef}
      width={SVG_WIDTH}
      height={svgHeight}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 0,
        pointerEvents: "none",
        minHeight: 400, // Debug: force min height
        border: "2px solid red", // Debug: visible border
      }}
      className="w-full h-full"
      viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="pulse" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="pulse"
          />
          <feMerge>
            <feMergeNode in="pulse" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {/* Background path */}
      <path
        d={pathD}
        fill="none"
        stroke="url(#pathGradient)"
        strokeWidth={6}
        strokeDasharray="18 12"
        className="transition-all duration-300"
        style={{
          opacity: 0.6,
          strokeDashoffset: -scrollY * 0.1,
        }}
      />
      {/* Active path */}
      <motion.path
        d={pathD}
        fill="none"
        stroke="#3b82f6"
        strokeWidth={6}
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: progress }}
        transition={{ duration: 0.3 }}
        style={{ opacity: 0.8 }}
      />
      {/* Markers */}
      {markerPoints.map((pt, i) => (
        <g key={SECTIONS[i].id} tabIndex={0} aria-label={SECTIONS[i].label}>
          <motion.circle
            cx={pt.x}
            cy={pt.y}
            r={MARKER_RADIUS}
            fill={SECTIONS[i].color}
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
            animate={{
              filter: active === i ? "url(#pulse)" : "none",
              boxShadow:
                active === i ? `0 0 20px ${SECTIONS[i].color}` : "none",
            }}
            transition={{ duration: 0.3 }}
          />
          <motion.text
            x={pt.x}
            y={pt.y + 10}
            textAnchor="middle"
            fontSize={active === i ? 32 : 22}
            fill="#fff"
            style={{ pointerEvents: "none" }}
            animate={{
              scale: active === i ? 1.2 : 1,
              filter: active === i ? "url(#glow)" : "none",
            }}
            transition={{ duration: 0.3 }}
          >
            {SECTIONS[i].icon}
          </motion.text>
          {/* Tooltip */}
          {active === i && (
            <motion.foreignObject
              x={pt.x + (pt.x < SVG_WIDTH / 2 ? 30 : -130)}
              y={pt.y - 20}
              width={120}
              height={40}
              style={{ pointerEvents: "none" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div
                className="bg-skill-fullstack text-white text-xs rounded px-2 py-1 shadow-lg animate-fade-in pointer-events-none"
                style={{
                  backgroundColor: SECTIONS[i].color,
                  boxShadow: `0 0 10px ${SECTIONS[i].color}`,
                }}
              >
                {SECTIONS[i].label}
              </div>
            </motion.foreignObject>
          )}
        </g>
      ))}
      {/* Traveler */}
      <motion.g
        animate={{
          x: traveler.x,
          y: traveler.y,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        <motion.circle
          r={TRAVELER_RADIUS}
          fill="#fbbf24"
          stroke="#fff"
          strokeWidth={5}
          animate={{
            filter: "drop-shadow(0 0 16px #fbbf24)",
            scale: [1, 1.1, 1],
          }}
          transition={{
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        <motion.path
          d="M-8,-8 L8,0 L-8,8 Z"
          fill="#fff"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </motion.g>
    </svg>
  );
}
