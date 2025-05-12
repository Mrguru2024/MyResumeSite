
# 🛠 BlueprintRoute Component Development Instructions (FINAL)

## Purpose

Build a **scroll-driven, interactive resume journey** using a custom React component called `BlueprintRoute`. This component should guide users visually through Anthony “Mrguru” Feaster’s resume using a **fusion of Road/Highway and Electric Circuit Path** metaphors. Inspired by the SuperShine design site, this component blends narrative, motion, and interactivity to deliver a memorable user experience.

---

## 🔧 Component Overview

**Component Name**: `BlueprintRoute.jsx`  
**CSS Module**: `BlueprintRoute.module.css`  
**Framework**: Next.js (React)  
**Animation Library**: Framer Motion  
**Purpose**: Visually connect resume sections with a glowing, interactive trail that animates like a journey through both a career highway and a tech circuit

---

## 🔩 Functional Requirements

### 1. Render a Combined Highway + Circuit SVG Path

- Create a curved, zig-zag SVG path that mimics a roadmap or journey
- Overlay circuit-style elements (thin lines, glowing pulses, nodes)
- Animate the path using `Framer Motion`’s `pathLength` and stroke offset
- Use glows, hover animations, or circuit “pings” at each milestone node

### 2. Animate a Tracker Element Along the Path

- A glowing dot, pulse orb, or directional icon (arrow/vehicle/electronic blip)
- Sync its movement along the SVG path with scroll position
- Use `offsetPath` and `offsetDistance` or `Framer Motion` animations

### 3. Interactive Milestone Markers

- Place clickable or hoverable icons at each resume section:
  - About Me
  - Skills
  - Work Experience
  - Projects
  - Certifications
  - Contact
- Milestones should:
  - Scale on hover
  - Pulse with circuit glow effect
  - Trigger overlays/tooltips on interaction

### 4. Responsive Design

- Ensure path responsiveness using `viewBox`
- Keep path in background layer, behind content
- Maintain legibility and spacing on mobile/tablets

---

## 🧩 Design Fusion Summary: Road/Highway + Electric Circuit

| Feature | Road/Highway | Electric Circuit |
|--------|---------------|------------------|
| **Path Layout** | Curved SVG trail | Layered circuit lines and nodes |
| **Milestones** | Highway exits or stops | Circuit nodes (pulsing) |
| **Motion** | Smooth scroll drawing | Electric pulse traveling path |
| **Theme** | Career journey | Technical interconnectedness |
| **Colors** | Gray path with orange/white signs | Cyan-blue glows, sparks, animated flows |

---

## 📦 Example JSX (`BlueprintRoute.jsx`)

```jsx
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from './BlueprintRoute.module.css';

const BlueprintRoute = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({ target: ref });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className={styles.routeContainer}>
      <svg viewBox="0 0 1200 3000" className={styles.routeSVG}>
        <motion.path
          d="M100 150 C300 300, 900 100, 1100 250 S1300 500, 1000 700 Q900 800, 800 1000 T600 1300"
          stroke="#22D3EE"
          strokeWidth="3"
          fill="none"
          strokeDasharray="1"
          strokeDashoffset="1"
          style={{ pathLength }}
        />
        <circle cx="100" cy="150" r="12" className={styles.milestone} />
        <circle cx="1100" cy="250" r="12" className={styles.milestone} />
        <circle cx="1000" cy="700" r="12" className={styles.milestone} />
        <circle cx="800" cy="1000" r="12" className={styles.milestone} />
        <circle cx="600" cy="1300" r="12" className={styles.milestone} />
        <motion.circle
          r="16"
          fill="#F97316"
          style={{
            offsetPath: "path('M100 150 C300 300, 900 100, 1100 250 S1300 500, 1000 700 Q900 800, 800 1000 T600 1300')",
            offsetDistance: scrollYProgress
          }}
        />
      </svg>
    </div>
  );
};

export default BlueprintRoute;
```

---

## 🎨 CSS Module (`BlueprintRoute.module.css`)

```css
.routeContainer {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.routeSVG {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
}

.milestone {
  fill: #F97316;
  filter: drop-shadow(0 0 4px #F97316);
  transition: transform 0.3s ease;
  cursor: pointer;
}

.milestone:hover {
  transform: scale(1.2);
  filter: drop-shadow(0 0 6px #FBBF24);
}
```

---

## ✅ Final Result

An immersive, scroll-responsive **Resume Trail Map**, styled like a **blueprint road circuit**, leading users through Anthony’s professional journey. It should feel polished, alive, and interactive — a fusion of structure and energy.

