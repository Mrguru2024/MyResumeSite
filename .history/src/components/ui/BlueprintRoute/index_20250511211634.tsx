"use client";
import { useEffect, useRef, useState } from "react";
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
  },
  {
    id: "about",
    label: "About",
    icon: "👤",
    color: "#10b981",
    description: "Get to know me",
  },
  {
    id: "skills",
    label: "Skills",
    icon: "🛠️",
    color: "#f59e0b",
    description: "My technical expertise",
  },
  {
    id: "experience",
    label: "Experience",
    icon: "💼",
    color: "#8b5cf6",
    description: "Professional journey",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "💡",
    color: "#10b981",
    description: "Featured projects",
  },
  {
    id: "portfolio",
    label: "Portfolio",
    icon: null, // Will use custom SVG for plug
    color: "#fbbf24",
    description: "Portfolio gallery (plugged in!)",
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
  const [svgHeight, setSvgHeight] = useState(0);
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
  const containerRect =
    typeof window !== "undefined" && window.heroContainerRef
      ? window.heroContainerRef.getBoundingClientRect()
      : null;
  const buttonPosition = buttonRect ? buttonRect.bottom + window.scrollY : 0;
  const buttonCenterX =
    buttonRect && containerRect
      ? buttonRect.left + buttonRect.width / 2 - containerRect.left
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
  const scrollProgress = isMounted
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
  const traveler = getTravelerPos(scrollProgress);

  // Debug: Log SVG height and path data
  console.log("[BlueprintRoute] svgHeight:", svgHeight, "pathD:", pathD);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={styles.routeContainer}>
      <svg viewBox="0 0 1200 3000" className={styles.routeSVG}>
        {/* Main glowing/circuit path */}
        <motion.path
          d="M100 150 C300 300, 900 100, 1100 250 S1300 500, 1000 700 Q900 800, 800 1000 T600 1300"
          stroke="#22D3EE"
          strokeWidth="3"
          fill="none"
          strokeDasharray="1"
          strokeDashoffset="1"
          style={{ pathLength: scrollProgress }}
          filter="url(#glow)"
        />
        {/* Milestone/circuit nodes */}
        <circle cx="100" cy="150" r="16" className={styles.milestone} />
        <circle cx="1100" cy="250" r="16" className={styles.milestone} />
        <circle cx="1000" cy="700" r="16" className={styles.milestone} />
        <circle cx="800" cy="1000" r="16" className={styles.milestone} />
        <circle cx="600" cy="1300" r="16" className={styles.milestone} />
        {/* Powered plug marker for Portfolio (last node) */}
        <g
          className={styles.milestone}
          tabIndex={0}
          role="button"
          aria-label="Portfolio"
        >
          <circle
            cx="600"
            cy="1300"
            r="22"
            fill="#fbbf24"
            filter="url(#glow)"
          />
          <rect
            x={600 - 10}
            y={1300 - 8}
            width={20}
            height={16}
            rx={4}
            fill="#fff"
            stroke="#fbbf24"
            strokeWidth={2}
          />
          <rect
            x={600 - 4}
            y={1300 - 4}
            width={3}
            height={8}
            rx={1}
            fill="#fbbf24"
          />
          <rect
            x={600 + 1}
            y={1300 - 4}
            width={3}
            height={8}
            rx={1}
            fill="#fbbf24"
          />
          <motion.polygon
            points="600,1302 598,1308 601,1308 599,1314 604,1307.5 601.5,1307.5"
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
        {/* Animated tracker/orb */}
        <motion.circle
          r="20"
          fill="#F97316"
          style={{
            offsetPath:
              "path('M100 150 C300 300, 900 100, 1100 250 S1300 500, 1000 700 Q900 800, 800 1000 T600 1300')",
            offsetDistance: scrollProgress,
          }}
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
}
