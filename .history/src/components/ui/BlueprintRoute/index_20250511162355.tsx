"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { createPortal } from "react-dom";

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
const MARKER_OFFSET = 64;
const MARKER_GAP = 16; // Small gap below the button
const START_MARKER_GAP = 32; // Gap below the button for the first marker

export default function BlueprintRoute() {
  const [sectionCenters, setSectionCenters] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [svgTop, setSvgTop] = useState(0);

  // Set mounted state
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use MutationObserver to wait for the button before measuring
  useEffect(() => {
    if (!isMounted) return;
    let observer: MutationObserver | null = null;
    let measured = false;
    function measureSections() {
      const beginJourneyBtn = document.querySelector("[data-journey-button]");
      if (!beginJourneyBtn) return;
      const buttonPosition =
        beginJourneyBtn.getBoundingClientRect().bottom + window.scrollY;
      setSvgTop(buttonPosition); // Store the button's position for SVG container
      console.log("[BlueprintRoute] Button position:", buttonPosition);
      const centers = SECTIONS.map((s, index) => {
        if (index === 0) return buttonPosition;
        const el = document.getElementById(s.id);
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        return rect.top + window.scrollY + rect.height / 2;
      });
      setSectionCenters(centers);
      const lastSection = centers[centers.length - 1] || 0;
      setSvgHeight(
        lastSection - buttonPosition + window.innerHeight + MARKER_OFFSET,
      );
      setViewportHeight(window.innerHeight);
      measured = true;
    }
    // Initial measure if possible
    measureSections();
    // Observe DOM for button
    if (!measured) {
      observer = new MutationObserver(() => {
        const btn = document.querySelector("[data-journey-button]");
        if (btn) {
          measureSections();
          if (observer) observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
    window.addEventListener("resize", measureSections);
    window.addEventListener("scroll", measureSections);
    return () => {
      window.removeEventListener("resize", measureSections);
      window.removeEventListener("scroll", measureSections);
      if (observer) observer.disconnect();
    };
  }, [isMounted]);

  // Update active section and scroll position
  useEffect(() => {
    if (!isMounted) return;
    function onScroll() {
      setScrollY(window.scrollY);
      const winH = window.innerHeight;
      const idx = sectionCenters.findIndex(
        (center, i) =>
          window.scrollY + winH / 2 < (sectionCenters[i + 1] ?? Infinity),
      );
      setActive(idx === -1 ? SECTIONS.length - 1 : idx);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionCenters, isMounted]);

  // Get header positions for each section
  function getHeaderCenters() {
    return SECTIONS.map((section, i) => {
      if (i === 0) return null; // skip for first marker
      const sectionEl = document.getElementById(section.id);
      if (!sectionEl) return null;
      const header = sectionEl.querySelector("h2, h1");
      if (!header) return null;
      const rect = header.getBoundingClientRect();
      return rect.top + window.scrollY + rect.height / 2;
    });
  }

  const [headerCenters, setHeaderCenters] = useState<(number | null)[]>([]);

  useEffect(() => {
    if (!isMounted) return;
    function measureHeaders() {
      setHeaderCenters(getHeaderCenters());
    }
    measureHeaders();
    window.addEventListener("resize", measureHeaders);
    return () => window.removeEventListener("resize", measureHeaders);
  }, [isMounted, sectionCenters]);

  // Calculate marker positions
  const markerRefs = useRef<(SVGCircleElement | null)[]>([]);
  const svgRect = svgRef.current
    ? svgRef.current.getBoundingClientRect()
    : null;
  const beginJourneyBtn =
    typeof window !== "undefined"
      ? document.querySelector("[data-journey-button]")
      : null;
  const buttonRect = beginJourneyBtn
    ? beginJourneyBtn.getBoundingClientRect()
    : null;
  const buttonPosition = buttonRect ? buttonRect.bottom + window.scrollY : 0;
  const buttonCenterX =
    buttonRect && svgRect
      ? buttonRect.left + buttonRect.width / 2 - svgRect.left
      : X_LEFT;
  const markerPoints = SECTIONS.map((s, i) => {
    if (i === 0) {
      return {
        x: buttonCenterX,
        y: START_MARKER_GAP,
      };
    }
    const headerY = headerCenters[i] ?? sectionCenters[i] ?? 0;
    return {
      x: i % 2 === 0 ? X_LEFT : X_RIGHT,
      y: headerY - buttonPosition,
    };
  });

  // Set svgHeight to cover from button to last marker
  useEffect(() => {
    if (!isMounted) return;
    if (!markerPoints.length) return;
    const lastY = markerPoints[markerPoints.length - 1]?.y ?? 0;
    setSvgHeight(lastY + window.innerHeight / 2);
  }, [markerPoints, isMounted]);

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
          (scrollY + viewportHeight / 2 - sectionCenters[0]) / (total || 1),
        ),
      )
    : 0;

  // Ensure svgHeight is valid
  const validSvgHeight = svgHeight || 0;

  function getTravelerPos(t: number) {
    if (!markerPoints.length || markerPoints.length < 2)
      return { x: buttonCenterX, y: START_MARKER_GAP };
    const seg = 1 / (markerPoints.length - 1);
    const idx = Math.floor(t / seg);
    const p1 = markerPoints[idx];
    const p2 = markerPoints[idx + 1] || p1;
    if (!p1 || !p2) return { x: buttonCenterX, y: START_MARKER_GAP };
    const frac = (t - idx * seg) / seg;
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
    <>
      <svg
        ref={svgRef}
        width={SVG_WIDTH}
        height={svgHeight}
        style={{
          position: "absolute",
          top: svgTop,
          left: 0,
          zIndex: 0,
          pointerEvents: "none",
          height: svgHeight,
          opacity: 1,
          filter: "none",
        }}
        className="w-full"
        viewBox={`0 0 ${SVG_WIDTH} ${svgHeight}`}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="pulse" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 12 -5"
              result="pulse"
            />
            <feMerge>
              <feMergeNode in="pulse" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {/* Background path */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth={4}
          strokeDasharray="12 8"
          className="transition-all duration-300"
          style={{
            opacity: 0.4,
            strokeDashoffset: -scrollY * 0.1,
          }}
        />
        {/* Active path */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={4}
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: progress }}
          transition={{ duration: 0.3 }}
          style={{ opacity: 0.6 }}
        />
        {/* Markers */}
        {markerPoints.map((pt, i) => (
          <g key={SECTIONS[i].id} style={{ pointerEvents: "auto" }}>
            <motion.circle
              ref={(el) => (markerRefs.current[i] = el)}
              cx={pt.x}
              cy={pt.y}
              r={MARKER_RADIUS}
              fill={SECTIONS[i].color}
              stroke="#fff"
              strokeWidth={2}
              style={{ cursor: "pointer" }}
              onClick={() => {
                document
                  .getElementById(SECTIONS[i].id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.1 }}
              animate={{ filter: active === i ? "url(#pulse)" : "none" }}
            />
            {/* No tooltip here, will use portal */}
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
            strokeWidth={3}
            animate={{
              filter: "drop-shadow(0 0 8px #fbbf24)",
              scale: [1, 1.05, 1],
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
            d="M-6,-6 L6,0 L-6,6 Z"
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
      {/* Portal-based tooltip will be rendered in next step */}
    </>
  );
}
