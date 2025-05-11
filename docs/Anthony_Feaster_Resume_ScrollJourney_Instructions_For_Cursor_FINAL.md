# Anthony “Mrguru” Feaster – Interactive Resume Website Development Brief

## 👨‍💻 For: Cursor AI / Developer Team

This document outlines the full specifications for building an interactive, professional-grade personal resume website for **Anthony “Mrguru” Feaster** using **Next.js**, **React**, and **Framer Motion**. The design must be immersive, engaging, and capable of guiding hiring managers, recruiters, and collaborators through a dynamic experience that reflects Anthony’s skills and impact.

---

## 🔧 Project Overview

- **Project Title**: Anthony “Mrguru” Feaster – The JOAT Interactive Resume Portfolio
- **Objective**: Build a full-featured portfolio website that is scroll-based, animated, and interaction-driven.
- **Primary Technologies**:
  - Framework: Next.js (React)
  - Styling: TailwindCSS (or Chakra UI)
  - Animation: Framer Motion, optional React Spring
  - Deployment: Vercel
  - Source: GitHub Repo

---

## 🔨 Instructional Build Outline

### 1. Hero Landing Page

- Animated background (parallax layer with tech/field tools)
- Fade-in title text: “Anthony 'Mrguru' Feaster – Full Stack Developer | Locksmith Lead | Low Voltage Specialist”
- Typing animation subtitle: “I fix. I code. I lead. I build what’s needed.”
- Button: “Begin Journey” scrolls user to About Me

---

### 2. About Me Section (Interactive Card)

- Use a card flip or reveal animation on scroll/hover
- Front: Avatar and summary tagline
- Back: Expanded professional summary
- Framer Motion animations: Slide-in panels and subtle bounce-ins

---

### 3. Skills Dashboard (Filterable and Expandable)

- Create a 3-column grid with filters for categories:
  - Full Stack Dev
  - Field Technician
  - Low Voltage
  - Leadership
  - Repair
- On click: reveal modal or detail with skill usage context

---

### 4. Experience Timeline

- Use either:
  - Vertical scroll timeline with animation on scroll
  - Horizontal step-based navigator with progress indicator
- Each role includes:
  - Title
  - Company
  - Dates
  - Animated card with responsibilities using Framer Motion

---

### 5. Portfolio Projects (Tabbed or Grid Gallery)

- Include filtering tags: Software / Repairs / GPS / EEPROM
- Hover: brief description
- Click: Modal popup with full case study (Challenge, Action, Result)

---

### 6. Education & Certifications

- Display as icon cards or collapsible list with Framer slide-down animation
- Badge or chip style:
  - EEPROM Specialist
  - Hilti Powder Gun
  - Forklift Certification
  - Per Scholas Graduate
  - UEI Engineering

---

### 7. Testimonials Section

- Swipeable carousel
- Include:
  - Quote
  - Name, Company (if approved)
  - Subtle transitions with easing

---

### 8. Contact + CTA Section

- Floating “Let’s Work” sticky button
- Contact form:
  - Name
  - Email
  - Message
- Optional integrations:
  - LinkedIn plugin
  - GitHub repo preview
  - Calendly for booking

---

## 🎯 Bonus UX Features (Optional)

- Dark/Light mode toggle with smooth animation
- Custom mouse trail (e.g., wrench or cursor glow)
- Animated skill bars or circular progress indicators
- Unlockable-style achievement badges for certs

---

## 📁 Required Media & Files (Client to Provide)

- Professional photo or action shot
- GitHub links
- Screenshots of web apps and repair work
- Logos for tools/technologies used
- Icons for certs or accomplishments

---

## 🧠 Final Notes

- Use professional tone and interaction logic throughout
- Performance optimized for both mobile and desktop
- All animations should enhance—not overwhelm—the UX
- Ensure accessibility compliance where applicable (keyboard nav, contrast, alt-text)

This is not just a resume—it is a showcase of Anthony’s hybrid expertise across tech, mechanical repair, and leadership. Build with clarity, style, and interactivity in mind.

---

## 🧭 IMMERSIVE USER NAVIGATION SPECIFICATIONS (Inspired by SuperShine.Design)

> ✨ Build an immersive and reactive navigation system modeled after [https://www.supershine.design](https://www.supershine.design). The site must feel like a guided journey — not just a scrollable resume.

### Key Navigation & Interaction Features

1. **Scroll-Based Transitions**
   - Use full viewport-height panels.
   - Transition sections via horizontal or vertical motion.
   - Animate section content into view on scroll (Framer Motion recommended).

2. **Micro-Interactions**
   - Hover animations on skill cards, project tiles, and buttons.
   - Icons animate or glow slightly on cursor proximity.
   - Skill proficiency bars or rings that animate into place.

3. **Custom Animated Cursor**
   - Cursor changes form when hovering over different content (e.g., code icon over projects, lock icon over locksmithing sections).
   - Optional animated trail or interactive hints.

4. **Viewport Snap Navigation**
   - Enable CSS scroll-snap or logic-based viewport snapping for clean transitions.
   - Each section (About, Skills, Experience, Projects, Contact) snaps into view clearly.

5. **Parallax Motion Layers**
   - Backgrounds subtly move with scroll.
   - Use depth by offsetting tool icons, code snippets, or gear elements in motion.

6. **Dynamic Scroll Progress**
   - Create a vertical or horizontal progress bar.
   - Show current resume/story progress as a percentage or section highlight.

7. **Optional Audio Feedback**
   - Sound effects (key click, gear turning, etc.) on action triggers.
   - Must be subtle and toggleable (mute by default).

### Development Guidance

- Use Framer Motion and React hooks (`useScroll`, `useTransform`) for scroll responsiveness.
- Prefer declarative animations over imperative to keep performance high.
- Optimize for mobile touch gestures with reduced animation intensity.

This navigation layer must **engage the user**, **guide them**, and **visually reinforce** Anthony's unique cross-discipline value in tech, locksmithing, and electronics.

---

## 🛣️ SCROLL-BASED RESUME JOURNEY NAVIGATION (Inspired by SuperShine Design)

> ✨ Implement a visually engaging, scroll-driven “resume road trip” experience. This will guide users through Anthony’s story as a **progressive journey**, where each scroll reveals the next milestone in his career. This is not a traditional page layout but a **motion-first, narrative interaction experience**.

### 🔁 Narrative Path Experience Goals

- Build a **visual resume roadmap** — users scroll through a horizontal or zig-zag path
- Use **SVG or canvas-based animated trail/line** to indicate movement
- Introduce each resume milestone (About, Skills, Jobs, Projects) as **checkpoints**
- Animate **trail line** progressively as user scrolls (Framer Motion or GSAP preferred)
- Show the **user's avatar or cursor pulse** “traveling” along the route

---

### 🎯 Design Metaphors (choose based on brand tone)

- **Road/Highway**: Clear forward journey through career
- **Tech Blueprint**: Animates like an engineer’s schematic unfolding
- **Electric Circuit Path**: Connects your roles visually like wiring
- **Logistics Route**: With location marker animations for each company/project

---

### 🔧 Development Requirements

#### 1. Scroll-Snap Layout
- Use CSS `scroll-snap-type` or libraries like `locomotive-scroll` for smooth transitions
- Each section should fill the viewport fully and snap cleanly into place

#### 2. Animated SVG Trail Path
- Create an SVG path line that **draws itself** as the user scrolls
- Use `Framer Motion` `pathLength` prop or GSAP `drawSVG` plugin
- Trail should pass through or “connect” each content section

#### 3. Milestone Animations
- For each checkpoint (e.g., “Full Stack Dev”, “Locksmith Lead”, “Low Voltage Tech”):
  - Show a card with: Title, Dates, Description
  - Animate it with: Scale in, Bounce, Fade, or Slide
  - Add optional interaction: hover/click to expand

#### 4. Trail Icon or Cursor Avatar
- Add a visual representation of the user traveling the path:
  - Pulse dot, tech glyph, animated wrench
  - Cursor floats along trail or leaves motion echo

#### 5. Scroll-Progress Indicator
- Implement a sticky indicator (horizontal or vertical)
- Show % of journey complete or highlight active section
- Optional: Floating mini-map on large screen devices

---

### 📦 Deliverable Components

- [ ] SVG Path for resume trail (animated with scroll)
- [ ] Viewport-snapped sections (About, Skills, Timeline, Projects, Contact)
- [ ] Scroll triggers for milestone animations
- [ ] Avatar/cursor that follows trail path
- [ ] Responsive, performance-optimized structure

---

### 💡 User Experience Goals

- Navigation should feel like a **purposeful career path**, not just clicking pages
- Emphasize **milestones** and **growth**
- Add personality through motion: floating elements, icons animating in/out, sound effects (optional)
- Must remain professional, readable, and accessible

---

### 🛠 Tools & Technologies

- React (Next.js)
- Framer Motion or GSAP
- SVG (for path design and animation)
- TailwindCSS for responsive layout
- Optional: Three.js or Canvas if visual depth is needed

---

This feature transforms Anthony’s resume into a **guided, interactive visual story**. It creates engagement, helps viewers retain key details, and elevates his brand far beyond a static document.
