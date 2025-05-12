"use client";
import {
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
  useCallback,
} from "react";
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
const MARKER_OFFSET = 40; // Base offset for markers
const MOBILE_MARKER_OFFSET = 24; // Smaller offset for mobile screens
const MARKER_GAP = 16; // Small gap below the button
const START_MARKER_GAP = 32; // Gap below the button for the first marker

const SOUNDS = {
  markerHover: "/sounds/hover.mp3",
  markerClick: "/sounds/click.mp3",
  scroll: "/sounds/scroll.mp3",
} as const;

// Sound manager hook
function useSoundManager() {
  const [isMuted, setIsMuted] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const sounds = useRef<Record<keyof typeof SOUNDS, HTMLAudioElement>>(
    {} as any
  );
  const [isInitialized, setIsInitialized] = useState(false);

  // Set hasMounted after mount
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Only read localStorage after mount
  useEffect(() => {
    if (!hasMounted) return;
    try {
      const stored = localStorage.getItem("blueprintroute-muted");
      if (stored === "true") setIsMuted(true);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;
    try {
      localStorage.setItem("blueprintroute-muted", isMuted ? "true" : "false");
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }, [isMuted, hasMounted]);

  useEffect(() => {
    if (!hasMounted) return;
    try {
      Object.entries(SOUNDS).forEach(([key, src]) => {
        const audio = new Audio(src);
        audio.preload = "auto";
        audio.volume = 0.3;
        sounds.current[key as keyof typeof SOUNDS] = audio;
      });
      setIsInitialized(true);
    } catch (error) {
      console.error("Error initializing audio:", error);
    }
    return () => {
      Object.values(sounds.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, [hasMounted]);

  const play = useCallback(
    (sound: keyof typeof SOUNDS) => {
      if (!isInitialized || isMuted || !hasMounted) return;
      const audio = sounds.current[sound];
      if (audio) {
        audio.currentTime = 0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Audio playback failed:", error);
          });
        }
      }
    },
    [isInitialized, isMuted, hasMounted]
  );

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  return { play, isMuted, toggleMute };
}

// Sound toggle button component
function SoundToggle({
  isMuted,
  onToggle,
}: {
  isMuted: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={() => {
        console.log("Sound button clicked");
        onToggle();
      }}
      className="fixed top-4 left-4 z-[99999] bg-red-500 border-4 border-yellow-400 rounded-full p-4 shadow-2xl pointer-events-auto hover:scale-110 transition-transform"
      style={{ position: 'fixed', zIndex: 99999 }}
      aria-label={isMuted ? "Enable sound" : "Disable sound"}
    >
      {isMuted ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      )}
    </button>
  );
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
  const { play, isMuted, toggleMute } = useSoundManager();
  const [markerPoints, setMarkerPoints] = useState<{ x: number; y: number }[]>(
    []
  );
  const [sectionOffsets, setSectionOffsets] = useState<number[]>([]);
  const markerOffset = 40;
  const [svgHeight, setSvgHeight] = useState(1000); // default fallback for SSR
  const [lastSection, setLastSection] = useState(0);

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
      try {
        const beginJourneyBtn = document.querySelector("[data-journey-button]");
        if (!beginJourneyBtn) return;
        const buttonPosition =
          beginJourneyBtn.getBoundingClientRect().bottom + window.scrollY;
        setSvgTop(buttonPosition);
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
      } catch (error) {
        console.error("Error measuring sections:", error);
      }
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

  // Update active section and scroll position with improved section detection
  useEffect(() => {
    if (!isMounted) return;

    function onScroll() {
      setScrollY(window.scrollY);
      setViewportHeight(window.innerHeight);

      // Find current section based on viewport center
      const viewCenter = window.scrollY + window.innerHeight / 2;
      let currentSection = 0;

      for (let i = 0; i < sectionOffsets.length - 1; i++) {
        if (
          viewCenter >= sectionOffsets[i] &&
          viewCenter < sectionOffsets[i + 1]
        ) {
          currentSection = i;
          break;
        }
        if (viewCenter >= sectionOffsets[sectionOffsets.length - 1]) {
          currentSection = sectionOffsets.length - 1;
        }
      }

      // Play sound only when changing sections
      if (currentSection !== lastSection) {
        play("scroll");
        setLastSection(currentSection);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isMounted, sectionOffsets, lastSection, play]);

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
      const isMobile = window.innerWidth < 768; // Check if mobile screen
      const markerOffset = isMobile ? MOBILE_MARKER_OFFSET : MARKER_OFFSET;

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
          "[data-blueprint-section] h2, [data-blueprint-section] h1"
        )
      );
      sectionHeaders.forEach((header, i) => {
        const rect = header.getBoundingClientRect();
        const scrollY = window.scrollY;
        const y = rect.top + scrollY + rect.height / 2;

        // Calculate x position based on screen size
        let x;
        if (isMobile) {
          // On mobile, alternate between left and right edges with smaller offset
          x = i % 2 === 0 ? markerOffset : window.innerWidth - markerOffset;
        } else {
          // On desktop, use the original logic
          x =
            i % 2 === 0 ? rect.left - markerOffset : rect.right + markerOffset;
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

    // Calculate progress within the current section
    const start = sectionOffsets[idx];
    const end = sectionOffsets[idx + 1] || start + 1;
    const sectionProgress = Math.min(
      1,
      Math.max(0, (viewCenter - start) / (end - start))
    );

    // Get the current and next marker points
    const p1 = markerPoints[idx];
    const p2 = markerPoints[idx + 1] || p1;
    if (!p1 || !p2) return null;

    // Calculate the distance between points for smoother interpolation
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Use cubic easing for smoother movement
    const easedProgress =
      sectionProgress < 0.5
        ? 4 * sectionProgress * sectionProgress * sectionProgress
        : 1 - Math.pow(-2 * sectionProgress + 2, 3) / 2;

    // Calculate the new position with easing
    return {
      x: p1.x + dx * easedProgress,
      y: p1.y + dy * easedProgress,
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
          markerPoints[markerPoints.length - 1].y + 200
        )
      );
    }
  }, [markerPoints]);

  // Fallback: ensure first marker is always present and centered
  useEffect(() => {
    if (!markerPoints.length && isMounted) {
      // If no marker points, insert a fallback at the top center
      setMarkerPoints([
        { x: window.innerWidth / 2, y: 100 },
        ...markerPoints.slice(1),
      ]);
    } else if (markerPoints.length && markerPoints.length < SECTIONS.length) {
      // If not enough markers, pad the first
      setMarkerPoints([{ x: window.innerWidth / 2, y: 100 }, ...markerPoints]);
    }
    // Debug log
    if (markerPoints.length) {
      // eslint-disable-next-line no-console
      console.log("[BlueprintRoute] markerPoints:", markerPoints);
    }
  }, [markerPoints, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Sound toggle button at the root level */}
      <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
      
      <div className={styles.routeContainer}>
        <svg
          ref={svgRef}
          width="100%"
          height={svgHeight}
          className={styles.routeSVG}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "visible", // Ensure markers are visible even if they extend beyond the SVG bounds
          }}
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
          {markerPoints.map((pt, i) => {
            const section = SECTIONS[i];
            const tooltipContent = section?.tooltip;
            if (i === 0) {
              // First marker: always centered under the Begin Journey button, high visibility
              return (
                <motion.circle
                  key={i}
                  cx={pt.x}
                  cy={pt.y}
                  r={20}
                  className={styles.milestone}
                  tabIndex={0}
                  role="button"
                  aria-label={section?.label || "Milestone"}
                  style={{
                    filter: "drop-shadow(0 0 10px #38bdf8)",
                    opacity: 1,
                  }}
                  onMouseEnter={() => {
                    play("markerHover");
                    setTooltip({
                      show: true,
                      x: pt.x,
                      y: pt.y - 40,
                      label: tooltipContent?.headline || section?.label,
                      description:
                        tooltipContent?.blurb || section?.description,
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                  onFocus={() =>
                    setTooltip({
                      show: true,
                      x: pt.x,
                      y: pt.y - 40,
                      label: tooltipContent?.headline || section?.label,
                      description:
                        tooltipContent?.blurb || section?.description,
                    })
                  }
                  onBlur={() => setTooltip(null)}
                  onClick={() => {
                    play("markerClick");
                    document
                      .getElementById(section?.id?.toLowerCase())
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                  animate={{
                    filter: "drop-shadow(0 0 12px #38bdf8)",
                    opacity: 1,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              );
            }
            if (i === markerPoints.length - 1) {
              // Last marker: Contact (plug or envelope), high visibility
              return (
                <g key={i} style={{ zIndex: 10 }}>
                  {/* Interactive transparent circle on top for events */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={30}
                    fill="transparent"
                    style={{ cursor: "pointer" }}
                    tabIndex={0}
                    aria-label={section?.label || "Milestone"}
                    onMouseEnter={() =>
                      setTooltip({
                        show: true,
                        x: pt.x,
                        y: pt.y - 40,
                        label: tooltipContent?.headline || section?.label,
                        description:
                          tooltipContent?.blurb || section?.description,
                      })
                    }
                    onMouseLeave={() => setTooltip(null)}
                    onFocus={() =>
                      setTooltip({
                        show: true,
                        x: pt.x,
                        y: pt.y - 40,
                        label: tooltipContent?.headline || section?.label,
                        description:
                          tooltipContent?.blurb || section?.description,
                      })
                    }
                    onBlur={() => setTooltip(null)}
                    onClick={() => {
                      play("markerClick");
                      document
                        .getElementById(section?.id?.toLowerCase())
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                  />
                  {/* Glowing circle always on top */}
                  <motion.circle
                    cx={pt.x}
                    cy={pt.y}
                    r={26}
                    fill="#fbbf24"
                    stroke="#fff"
                    strokeWidth={3}
                    filter="url(#glow) drop-shadow(0 0 40px #fbbf24) drop-shadow(0 0 32px #fde047)"
                    animate={{ scale: [1, 1.14, 1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ mixBlendMode: "screen", opacity: 1 }}
                  />
                  {/* Plug body and prongs */}
                  <g style={{ zIndex: 11 }}>
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
                </g>
              );
            }
            // Other markers
            return (
              <motion.circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={16}
                className={styles.milestone}
                tabIndex={0}
                role="button"
                aria-label={section?.label || "Milestone"}
                onMouseEnter={() =>
                  setTooltip({
                    show: true,
                    x: pt.x,
                    y: pt.y - 40,
                    label: tooltipContent?.headline || section?.label,
                    description: tooltipContent?.blurb || section?.description,
                  })
                }
                onMouseLeave={() => setTooltip(null)}
                onFocus={() =>
                  setTooltip({
                    show: true,
                    x: pt.x,
                    y: pt.y - 40,
                    label: tooltipContent?.headline || section?.label,
                    description: tooltipContent?.blurb || section?.description,
                  })
                }
                onBlur={() => setTooltip(null)}
                onClick={() => {
                  play("markerClick");
                  document
                    .getElementById(section?.id?.toLowerCase())
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
                animate={{ filter: "drop-shadow(0 0 6px #FBBF24)", opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />
            );
          })}
          {/* Tracker orb animated along the path */}
          {traveler && (
            <motion.circle
              cx={traveler.x}
              cy={traveler.y}
              r={20}
              fill="#F97316"
              filter="url(#glow)"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [1, 0.8, 1],
                filter: [
                  "drop-shadow(0 0 8px #f97316)",
                  "drop-shadow(0 0 16px #f97316)",
                  "drop-shadow(0 0 8px #f97316)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                mixBlendMode: "screen",
                willChange: "transform",
              }}
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
            <div className="bg-card-bg border border-card-border rounded-lg px-4 py-2 shadow-lg min-w-[220px] max-w-xs">
              <div className="flex items-center gap-2">
                <span className="text-text-primary font-semibold text-base">
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
    </>
  );
}
