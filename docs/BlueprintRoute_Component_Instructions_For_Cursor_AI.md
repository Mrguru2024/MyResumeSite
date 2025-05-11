
# 🛠 BlueprintRoute Component Development Instructions

## Purpose

Build a **scroll-driven, interactive resume journey** using a custom React component called `BlueprintRoute`. This component should guide users visually through Anthony “Mrguru” Feaster’s resume using a **combined Highway + Electric Circuit path metaphor**. Inspired by the SuperShine design site, this component blends narrative and interaction into a fluid, immersive UI experience.

---

## 🔧 Component Overview

**Component Name**: `BlueprintRoute.jsx`  
**CSS Module**: `BlueprintRoute.module.css`  
**Framework**: Next.js (React)  
**Animation Library**: Framer Motion  
**Purpose**: Visually connect resume sections with an animated trail that grows and guides users as they scroll

---

## 🔩 Functional Requirements

### 1. Render a Combined Highway + Circuit SVG Path

- Create a visually appealing **zig-zag or curved SVG path**
- Style it to look like both a road and a glowing electric circuit
- The path should **animate progressively** as the user scrolls using `Framer Motion`’s `pathLength`

### 2. Animate a Tracker Element Along the Path

- Design a **glowing dot, arrow, or custom icon** that represents Anthony’s progress
- Sync its motion along the path using scroll position
- Use `offsetPath` and `offsetDistance` or Framer Motion keyframes

### 3. Interactive Milestone Markers

- Add SVG `<circle>` markers or icons at key points on the path
- Each should correspond to a resume section:
  - About Me
  - Skills
  - Work Experience
  - Projects
  - Certifications
  - Contact
- Markers should respond to hover:
  - Scale up or pulse
  - Show a tooltip or pop-in guide with section info

### 4. Responsive and Accessible Design

- Ensure the trail scales responsively with `viewBox`
- Maintain visibility and accessibility across devices
- Trail should remain in the background behind main content

---

## 📦 Example JSX Structure (`BlueprintRoute.jsx`)

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
          strokeWidth="4"
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

## 🎨 CSS Module: `BlueprintRoute.module.css`

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
  transition: transform 0.3s ease;
  cursor: pointer;
}

.milestone:hover {
  transform: scale(1.2);
}
```

---

## 🧠 Additional Tips

- Use `scroll-snap` layout for each resume section to improve visual anchoring.
- Consider using tooltips or modals for each milestone to guide the user.
- Optimize SVGs using vector tools (Figma, Illustrator) to polish curves and icon positions.
- Implement lazy rendering or canvas-based layers if performance is a concern on mobile.

---

## ✅ Outcome

This component will visually connect all resume sections like a **journey map**, combining career clarity with a **tech-branded path animation**. The user should feel guided, impressed, and inspired to interact with each section of Anthony’s portfolio.
