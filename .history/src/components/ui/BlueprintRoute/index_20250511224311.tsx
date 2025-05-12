"use client";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { createPortal } from "react-dom";
import styles from "./BlueprintRoute.module.css";

const SECTIONS = [
  {
    id: "hero",
    label: "Hero",
    icon: "🏁",
    color: "#3b82f6",
    description: "Welcome to my journey",
    tooltip: {
      headline: "Start Here",
      blurb: "Discover a unique blend of tech and hands-on expertise.",
    },
  },
  {
    id: "about",
    label: "About",
    icon: "👤",
    color: "#10b981",
    description: "Get to know me",
    tooltip: {
      headline: "Who am I?",
      blurb:
        "A hybrid tech leader and hands-on problem solver. See why my unique background is your next team's advantage.",
    },
  },
  {
    id: "skills",
    label: "Skills",
    icon: "🛠️",
    color: "#f59e0b",
    description: "My technical expertise",
    tooltip: {
      headline: "Skills",
      blurb:
        "Full-stack, field, and leadership skills. Instantly productive in any environment.",
    },
  },
  {
    id: "experience",
    label: "Experience",
    icon: "💼",
    color: "#8b5cf6",
    description: "Professional journey",
    tooltip: {
      headline: "Experience",
      blurb:
        "Proven results across tech and trades. I deliver, lead, and adapt.",
    },
  },
  {
    id: "projects",
    label: "Projects",
    icon: "💡",
    color: "#10b981",
    description: "Featured projects",
    tooltip: {
      headline: "Projects",
      blurb: "Real-world impact. Explore my most relevant work.",
    },
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: null, // Will use custom SVG for plug
    color: "#fbbf24",
    description: "Portfolio gallery (plugged in!)",
    tooltip: {
      headline: "Portfolio",
      blurb: "See my work in action—case studies and outcomes.",
    },
  },
  {
    id: "contact",
    label: "Contact",
    icon: "✉️",
    color: "#06b6d4",
    description: "Contact me",
    tooltip: {
      headline: "Contact Me",
      blurb:
        "Ready to connect? Let's talk about your needs and how I can help.",
    },
  },
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

// Sound effects configuration
const SOUNDS = {
  markerHover: "/sounds/hover.mp3",
  markerClick: "/sounds/click.mp3",
  scroll: "/sounds/scroll.mp3",
} as const;

// Sound manager hook
function useSoundManager() {
  const [isMuted, setIsMuted] = useState(true);
  const sounds = useRef<Record<keyof typeof SOUNDS, HTMLAudioElement>>(
    {} as any,
  );

  useEffect(() => {
    // Initialize audio elements
    Object.entries(SOUNDS).forEach(([key, src]) => {
      const audio = new Audio(src);
      audio.preload = "auto";
      audio.volume = 0.3; // Set default volume to 30%
      sounds.current[key as keyof typeof SOUNDS] = audio;
    });

    // Cleanup
    return () => {
      Object.values(sounds.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  const play = (sound: keyof typeof SOUNDS) => {
    if (isMuted) return;
    const audio = sounds.current[sound];
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  };

  return { play, isMuted, setIsMuted };
}

export default function BlueprintRoute() {
  const [sectionCenters, setSectionCenters] = useState<number[]>([]);
  const [active, setActive] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [svgTop, setSvgTop] = useState(0);
  const [tooltipState, setTooltipState] = useState<{
    show: boolean;
    index: number;
    x: number;
    y: number;
  }>({ show: false, index: -1, x: 0, y: 0 });
  const { play, isMuted, setIsMuted } = useSoundManager();
  const [markerPoints, setMarkerPoints] = useState<{ x: number; y: number }[]>(
    [],
  );
  const [sectionOffsets, setSectionOffsets] = useState<number[]>([]);
  const markerOffset = 40;
  const [svgHeight, setSvgHeight] = useState(1000); // default fallback for SSR

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
      setViewportHeight(window.innerHeight);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMounted]);

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

  // Dynamically find all sections with headers
  useLayoutEffect(() => {
    function getMarkerPositions() {
      const points: { x: number; y: number }[] = [];
      const offsets: number[] = [];
      // 1. First marker: under Begin Journey button (always centered)
      const btn = document.querySelector("[data-journey-button]");
      if (btn) {
        const btnRect = btn.getBoundingClientRect();
        const scrollY = window.scrollY;
        points.push({
          x: btnRect.left + btnRect.width / 2,
          y: btnRect.bottom + scrollY + 32, // 32px below button
        });
        offsets.push(btnRect.bottom + scrollY);
      }
      // 2. Other markers: for each section header (excluding hero)
      const sectionHeaders = Array.from(
        document.querySelectorAll(
          "[data-blueprint-section] h2, [data-blueprint-section] h1",
        ),
      );
      sectionHeaders.forEach((header, i) => {
        const rect = header.getBoundingClientRect();
        const scrollY = window.scrollY;
        const y = rect.top + scrollY + rect.height / 2;
        // Only alternate left/right for markers after the first
        let x;
        if (i % 2 === 0) {
          x = rect.left - markerOffset;
        } else {
          x = rect.right + markerOffset;
        }
        points.push({ x, y });
        offsets.push(rect.top + scrollY);
      });
      setMarkerPoints(points);
      setSectionOffsets(offsets);
    }
    getMarkerPositions();
    window.addEventListener("resize", getMarkerPositions);
    window.addEventListener("scroll", getMarkerPositions);
    return () => {
      window.removeEventListener("resize", getMarkerPositions);
      window.removeEventListener("scroll", getMarkerPositions);
    };
  }, []);

  // Generate SVG path string for zig-zag
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
  const scrollProgress = isMounted
    ? Math.min(
        1,
        Math.max(
          0,
          (scrollY + viewportHeight / 2 - sectionCenters[0]) / (total || 1),
        ),
      )
    : 0;

  // Responsive tracker: use scroll position relative to viewport and section offsets
  function getResponsiveTravelerPos() {
    if (!markerPoints || markerPoints.length < 2 || !sectionOffsets.length)
      return null;
    // Use the center of the viewport as the reference point
    const viewCenter = scrollY + viewportHeight / 2;
    // Find which section the center is in
    let idx = 0;
    for (let i = 0; i < sectionOffsets.length - 1; i++) {
      if (
        viewCenter >= sectionOffsets[i] &&
        viewCenter < sectionOffsets[i + 1]
      ) {
        idx = i;
        break;
      }
      if (viewCenter >= sectionOffsets[sectionOffsets.length - 1]) {
        idx = sectionOffsets.length - 1;
      }
    }
    // Interpolate between markerPoints[idx] and markerPoints[idx+1]
    const start = sectionOffsets[idx];
    const end = sectionOffsets[idx + 1] || start + 1;
    const t = Math.min(1, Math.max(0, (viewCenter - start) / (end - start)));
    const p1 = markerPoints[idx];
    const p2 = markerPoints[idx + 1] || p1;
    if (!p1 || !p2) return null;
    return {
      x: p1.x + (p2.x - p1.x) * t,
      y: p1.y + (p2.y - p1.y) * t,
    };
  }

  const traveler = getResponsiveTravelerPos();

  // Tooltip state
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    x: number;
    y: number;
    label: string;
    description: string;
  } | null>(null);
  const markerLabels = [
    { label: "Hero", description: "Start your journey" },
    { label: "About", description: "Get to know me" },
    { label: "Skills", description: "My technical expertise" },
    { label: "Experience", description: "Professional journey" },
    { label: "Projects", description: "Featured projects" },
    { label: "Portfolio", description: "Portfolio gallery (plugged in!)" },
    { label: "Contact", description: "Contact me" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined" && markerPoints.length) {
      setSvgHeight(
        Math.max(
          window.innerHeight,
          markerPoints[markerPoints.length - 1].y + 200,
        ),
      );
    }
  }, [markerPoints]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.routeContainer}>
      <svg
        ref={svgRef}
        width="100%"
        height={svgHeight}
        className={styles.routeSVG}
      >
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feFlood
              floodColor="#22D3EE"
              floodOpacity="0.6"
              result="glowColor"
            />
            <feComposite
              in="glowColor"
              in2="coloredBlur"
              operator="in"
              result="softGlow"
            />
            <feMerge>
              <feMergeNode in="softGlow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Main glowing/circuit path */}
        <motion.path
          d={pathD}
          stroke="#22D3EE"
          strokeWidth="3"
          fill="none"
          filter="url(#glow)"
        />
        {/* Markers with interactivity and tooltips */}
        {markerPoints.map((pt, i) =>
          i === markerPoints.length - 1 ? (
            // Energized plug for last marker
            <g
              key={i}
              tabIndex={0}
              className={styles.milestone}
              role="button"
              aria-label={markerLabels[i]?.label || "Milestone"}
              onMouseEnter={(e) =>
                setTooltip({
                  show: true,
                  x: pt.x,
                  y: pt.y - 40,
                  label: markerLabels[i]?.label,
                  description: markerLabels[i]?.description,
                })
              }
              onMouseLeave={() => setTooltip(null)}
              onFocus={(e) =>
                setTooltip({
                  show: true,
                  x: pt.x,
                  y: pt.y - 40,
                  label: markerLabels[i]?.label,
                  description: markerLabels[i]?.description,
                })
              }
              onBlur={() => setTooltip(null)}
              onClick={() =>
                document
                  .getElementById(markerLabels[i]?.label?.toLowerCase())
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r={22}
                fill="#fbbf24"
                filter="url(#glow)"
                animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ mixBlendMode: "screen" }}
              />
              <rect
                x={pt.x - 10}
                y={pt.y - 8}
                width={20}
                height={16}
                rx={4}
                fill="#fff"
                stroke="#fbbf24"
                strokeWidth={2}
              />
              <rect
                x={pt.x - 4}
                y={pt.y - 4}
                width={3}
                height={8}
                rx={1}
                fill="#fbbf24"
              />
              <rect
                x={pt.x + 1}
                y={pt.y - 4}
                width={3}
                height={8}
                rx={1}
                fill="#fbbf24"
              />
              <motion.polygon
                points={`${pt.x},${pt.y + 2} ${pt.x - 2},${pt.y + 8} ${
                  pt.x + 1
                },${pt.y + 8} ${pt.x - 1},${pt.y + 14} ${pt.x + 4},${
                  pt.y + 7.5
                } ${pt.x + 1.5},${pt.y + 7.5}`}
                fill="#fbbf24"
                stroke="#f59e0b"
                strokeWidth={0.7}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [1, 0.7, 1],
                  filter: [
                    "drop-shadow(0 0 8px #fde047)",
                    "drop-shadow(0 0 16px #fbbf24)",
                    "drop-shadow(0 0 8px #fde047)",
                  ],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </g>
          ) : (
            <motion.circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r={16}
              className={styles.milestone}
              tabIndex={0}
              role="button"
              aria-label={markerLabels[i]?.label || "Milestone"}
              onMouseEnter={(e) =>
                setTooltip({
                  show: true,
                  x: pt.x,
                  y: pt.y - 40,
                  label: markerLabels[i]?.label,
                  description: markerLabels[i]?.description,
                })
              }
              onMouseLeave={() => setTooltip(null)}
              onFocus={(e) =>
                setTooltip({
                  show: true,
                  x: pt.x,
                  y: pt.y - 40,
                  label: markerLabels[i]?.label,
                  description: markerLabels[i]?.description,
                })
              }
              onBlur={() => setTooltip(null)}
              onClick={() =>
                document
                  .getElementById(markerLabels[i]?.label?.toLowerCase())
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              animate={{ filter: "drop-shadow(0 0 6px #FBBF24)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ),
        )}
        {/* Tracker orb animated along the path */}
        {traveler && (
          <motion.circle
            cx={traveler.x}
            cy={traveler.y}
            r={20}
            fill="#F97316"
            filter="url(#glow)"
            animate={{ scale: [1, 1.1, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </svg>
      {/* Tooltip overlay */}
      {tooltip?.show && (
        <div
          style={{
            position: "fixed",
            left: tooltip.x,
            top: tooltip.y,
            transform: "translate(-50%, -100%)",
            zIndex: 50,
            pointerEvents: "none",
          }}
        >
          <div className="bg-card-bg border border-card-border rounded-lg px-4 py-2 shadow-lg">
            <div className="flex items-center gap-2">
              <span className="text-text-primary font-medium">
                {tooltip.label}
              </span>
            </div>
            <p className="text-text-secondary text-sm mt-1">
              {tooltip.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
