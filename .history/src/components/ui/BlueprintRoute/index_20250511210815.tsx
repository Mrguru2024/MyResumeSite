"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { createPortal } from "react-dom";

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
    <>
      {/* Sound Toggle Button */}
      {isMounted &&
        createPortal(
          <motion.button
            className="fixed bottom-4 right-4 z-50 bg-card-bg border border-card-border rounded-full p-2 shadow-lg hover:bg-card-hover transition-colors"
            onClick={() => setIsMuted(!isMuted)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          >
            {isMuted ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-text-secondary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                />
              </svg>
            )}
          </motion.button>,
          document.body,
        )}

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
          {/* Enhanced glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feFlood
              floodColor="#3b82f6"
              floodOpacity="0.3"
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

          {/* Enhanced pulse filter */}
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

          {/* Gradient for the path */}
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.4" />
          </linearGradient>

          {/* Gradient for the traveler */}
          <radialGradient id="travelerGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
          </radialGradient>

          {/* Particle effect for active section */}
          <filter
            id="particleGlow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -8"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background path with enhanced styling */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#pathGradient)"
          strokeWidth={6}
          strokeDasharray="12 8"
          className="transition-all duration-300"
          style={{
            opacity: 0.4,
            strokeDashoffset: -scrollY * 0.1,
          }}
        />

        {/* Active path with enhanced glow */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#3b82f6"
          strokeWidth={4}
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: scrollProgress }}
          transition={{ duration: 0.3 }}
          style={{ opacity: 0.8 }}
        />

        {/* Interactive path particles */}
        <motion.g>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.circle
              key={i}
              r={2}
              fill="#3b82f6"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                offsetDistance: [`${i * 5}%`, `${i * 5 + 100}%`],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.1,
                ease: "linear",
              }}
              style={{
                offsetPath: `path("${pathD}")`,
              }}
            />
          ))}
        </motion.g>

        {/* Markers with enhanced animations */}
        {markerPoints.map((pt, i) => (
          <g key={SECTIONS[i].id} style={{ pointerEvents: "auto" }}>
            {/* Marker glow effect */}
            {active === i && (
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r={MARKER_RADIUS * 1.5}
                fill={SECTIONS[i].color}
                filter="url(#particleGlow)"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            )}
            {/* Custom plug marker for last section */}
            {i === SECTIONS.length - 1 ? (
              <motion.g
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  filter: active === i ? "url(#pulse)" : "none",
                  scale: active === i ? 1.1 : 1,
                }}
                transition={{
                  scale: { type: "spring", stiffness: 300, damping: 20 },
                }}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  play("markerClick");
                  document
                    .getElementById(SECTIONS[i].id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={(e) => {
                  play("markerHover");
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipState({
                    show: true,
                    index: i,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                  });
                }}
                onMouseLeave={() => {
                  setTooltipState((prev) => ({ ...prev, show: false }));
                }}
                role="button"
                aria-label={`Go to ${SECTIONS[i].label} section`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    play("markerClick");
                    document
                      .getElementById(SECTIONS[i].id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {/* Plug socket with power icon SVG */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={MARKER_RADIUS}
                  fill="#fbbf24"
                  stroke="#fff"
                  strokeWidth={2}
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
                {/* Power bolt */}
                <polygon
                  points={`${pt.x},${pt.y + 2} ${pt.x - 2},${pt.y + 8} ${pt.x + 1},${pt.y + 8} ${pt.x - 1},${pt.y + 14} ${pt.x + 4},${pt.y + 7.5} ${pt.x + 1.5},${pt.y + 7.5}`}
                  fill="#fbbf24"
                  stroke="#f59e0b"
                  strokeWidth={0.7}
                />
              </motion.g>
            ) : (
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
                  play("markerClick");
                  document
                    .getElementById(SECTIONS[i].id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                onMouseEnter={(e) => {
                  play("markerHover");
                  const rect = e.currentTarget.getBoundingClientRect();
                  setTooltipState({
                    show: true,
                    index: i,
                    x: rect.left + rect.width / 2,
                    y: rect.top - 10,
                  });
                }}
                onMouseLeave={() => {
                  setTooltipState((prev) => ({ ...prev, show: false }));
                }}
                whileHover={{ scale: 1.1 }}
                animate={{
                  filter: active === i ? "url(#pulse)" : "none",
                  scale: active === i ? 1.1 : 1,
                }}
                transition={{
                  scale: { type: "spring", stiffness: 300, damping: 20 },
                }}
                role="button"
                aria-label={`Go to ${SECTIONS[i].label} section`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    play("markerClick");
                    document
                      .getElementById(SECTIONS[i].id)
                      ?.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              />
            )}
          </g>
        ))}

        {/* Enhanced traveler with gradient and glow */}
        <motion.g
          animate={{
            x: traveler.x,
            y: traveler.y,
          }}
          transition={{ type: "spring", stiffness: 100, damping: 30 }}
        >
          {/* Traveler trail effect */}
          <motion.circle
            r={TRAVELER_RADIUS * 1.5}
            fill={SECTIONS[active].color}
            filter="url(#glow)"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.2, scale: 1 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
          <motion.circle
            r={TRAVELER_RADIUS}
            fill="url(#travelerGradient)"
            stroke="#fff"
            strokeWidth={3}
            filter="url(#glow)"
            animate={{
              scale: [1, 1.1, 1],
              filter: [
                "drop-shadow(0 0 8px #fbbf24)",
                "drop-shadow(0 0 12px #fbbf24)",
                "drop-shadow(0 0 8px #fbbf24)",
              ],
            }}
            transition={{
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
              filter: {
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

      {/* Tooltip Portal */}
      {tooltipState.show &&
        isMounted &&
        createPortal(
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed z-50 pointer-events-none"
            style={{
              left: tooltipState.x,
              top: tooltipState.y,
              transform: "translateX(-50%)",
            }}
          >
            <div
              className="bg-card-bg border border-card-border rounded-lg px-4 py-2 shadow-lg"
              style={{
                boxShadow: `0 0 10px ${SECTIONS[tooltipState.index].color}40`,
              }}
            >
              <div className="flex items-center gap-2">
                <span>{SECTIONS[tooltipState.index].icon}</span>
                <span className="text-text-primary font-medium">
                  {SECTIONS[tooltipState.index].label}
                </span>
              </div>
              <p className="text-text-secondary text-sm mt-1">
                {SECTIONS[tooltipState.index].description}
              </p>
            </div>
          </motion.div>,
          document.body,
        )}
    </>
  );
}
