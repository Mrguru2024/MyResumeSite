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
  const [markerPoints, setMarkerPoints] = useState<{ x: number; y: number }[]>(
    [],
  );

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

  // Calculate marker positions after mount
  useLayoutEffect(() => {
    function getMarkerPositions() {
      const points: { x: number; y: number }[] = [];
      // 1. First marker: under Begin Journey button
      const btn = document.querySelector("[data-journey-button]");
      if (btn) {
        const btnRect = btn.getBoundingClientRect();
        const scrollY = window.scrollY;
        points.push({
          x: btnRect.left + btnRect.width / 2,
          y: btnRect.bottom + scrollY + 32, // 32px below button
        });
      }
      // 2. Other markers: next to each section header
      const sectionIds = [
        "about",
        "skills",
        "experience",
        "projects",
        "portfolio",
      ];
      sectionIds.forEach((id, i) => {
        const section = document.getElementById(id);
        if (section) {
          const header = section.querySelector("h2, h1");
          if (header) {
            const rect = header.getBoundingClientRect();
            const scrollY = window.scrollY;
            // Zig-zag: alternate x between left and right
            const x = i % 2 === 0 ? 120 : window.innerWidth - 120;
            const y = rect.top + scrollY + rect.height / 2;
            points.push({ x, y });
          }
        }
      });
      setMarkerPoints(points);
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

  // Ensure svgHeight is valid
  const validSvgHeight = svgHeight || 0;

  function getTravelerPos(t: number) {
    if (!markerPoints.length || markerPoints.length < 2)
      return { x: markerPoints[0].x, y: markerPoints[0].y };
    const seg = 1 / (markerPoints.length - 1);
    const idx = Math.floor(t / seg);
    const p1 = markerPoints[idx];
    const p2 = markerPoints[idx + 1] || p1;
    if (!p1 || !p2) return { x: markerPoints[0].x, y: markerPoints[0].y };
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
      <svg
        ref={svgRef}
        width={window.innerWidth}
        height={window.innerHeight * 3}
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
        {/* Markers */}
        {markerPoints.map((pt, i) => (
          <circle
            key={i}
            cx={pt.x}
            cy={pt.y}
            r={i === markerPoints.length - 1 ? 22 : 16}
            className={styles.milestone}
          />
        ))}
      </svg>
    </div>
  );
}
