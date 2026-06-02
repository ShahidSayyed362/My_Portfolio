# Portfolio Website — Frontend Architecture
> Static React SPA | Component-Based Design | Deployed on Vercel

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Component Architecture](#component-architecture)
5. [Design System](#design-system)
6. [Routing](#routing)
7. [Data Layer](#data-layer)
8. [Performance & SEO](#performance--seo)
9. [Environment & Config](#environment--config)
10. [Vercel Deployment](#vercel-deployment)

---

## Project Overview

A fully static, component-driven personal portfolio website built with **React 18 + Vite**. There is no backend — all content is sourced from a local `resume.json` file (JSON Resume schema) that is imported directly into React components at build time. The site is deployed as a static SPA on **Vercel** with zero server infrastructure.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | React 18 + Vite | Component-based SPA, fast HMR |
| Styling | Tailwind CSS + CSS Modules | Utility-first + scoped component styles |
| Animation | Framer Motion | Page transitions, scroll reveals, micro-interactions |
| Routing | React Router v6 | Client-side routing (single page) |
| Icons | Lucide React | Consistent icon set |
| Data | resume.json (local import) | Single source of truth for all content |
| Linting | ESLint + Prettier | Code quality |
| Deployment | Vercel | Static hosting, CDN, HTTPS, preview deployments |

---

## Folder Structure

```
portfolio/
├── public/
│   ├── favicon.ico
│   ├── og-image.png                  # Open Graph image for social sharing
│   └── robots.txt
│
├── src/
│   ├── assets/
│   │   ├── fonts/                    # Self-hosted custom fonts (optional)
│   │   └── images/
│   │       └── profile.jpg           # Profile photo
│   │
│   ├── components/
│   │   ├── ui/                       # Atoms — smallest reusable units
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Tag.jsx
│   │   │   ├── SectionHeading.jsx
│   │   │   └── Divider.jsx
│   │   │
│   │   ├── layout/                   # Structural wrappers
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── PageWrapper.jsx       # Max-width, padding, scroll behavior
│   │   │   └── SectionWrapper.jsx    # Consistent vertical spacing per section
│   │   │
│   │   └── sections/                 # Full page sections (one per scroll stop)
│   │       ├── Hero.jsx              # Name, title, CTA, animated intro
│   │       ├── About.jsx             # Bio, profile image, personality
│   │       ├── Experience.jsx        # Work history timeline
│   │       ├── Projects.jsx          # Project cards grid
│   │       ├── Skills.jsx            # Skills grouped by category
│   │       ├── Education.jsx         # Degrees / certifications
│   │       └── Contact.jsx           # Email, socials, links
│   │
│   ├── data/
│   │   └── resume.json               # All portfolio content — single source of truth
│   │
│   ├── hooks/
│   │   ├── useScrollSpy.js           # Active nav link based on scroll position
│   │   └── useTheme.js               # Light/dark mode toggle (localStorage)
│   │
│   ├── styles/
│   │   ├── globals.css               # CSS reset, design tokens, base styles
│   │   └── animations.css            # Reusable keyframe animations
│   │
│   ├── utils/
│   │   └── formatDate.js             # e.g. "Jan 2022 – Present"
│   │
│   ├── App.jsx                       # Root: Navbar + all sections + Footer
│   └── main.jsx                      # Vite entry point, ReactDOM.createRoot
│
├── index.html                        # Vite HTML template, meta tags, fonts
├── vite.config.js
├── tailwind.config.js
├── vercel.json                       # Vercel SPA rewrite rule
├── .eslintrc.cjs
├── .prettierrc
└── package.json
```

---

## Component Architecture

### Hierarchy

```
App
└── PageWrapper
    ├── Navbar
    │   ├── Logo
    │   ├── NavLinks (scroll-spy highlighted)
    │   └── ThemeToggle
    │
    ├── Hero
    │   ├── AnimatedHeading
    │   ├── SubTitle
    │   ├── CTAButtons (Resume download + Contact)
    │   └── SocialLinks
    │
    ├── About
    │   ├── ProfileImage
    │   └── BioText
    │
    ├── Experience
    │   └── TimelineItem[] (mapped from resume.work)
    │       ├── CompanyName
    │       ├── Role + DateRange
    │       └── Highlights[]
    │
    ├── Projects
    │   └── ProjectCard[] (mapped from resume.projects)
    │       ├── ProjectTitle
    │       ├── Description
    │       ├── TechTags[]
    │       └── Links (GitHub, Live)
    │
    ├── Skills
    │   └── SkillGroup[] (mapped from resume.skills)
    │       ├── GroupLabel
    │       └── Badge[]
    │
    ├── Education
    │   └── EducationItem[] (mapped from resume.education)
    │
    ├── Contact
    │   ├── EmailLink
    │   └── SocialLink[]
    │
    └── Footer
        └── CopyrightLine
```

### Component Rules
- **Atoms** (`ui/`) accept only props — no data imports, no side effects.
- **Sections** (`sections/`) import directly from `resume.json` — they own their data.
- **Layout** (`layout/`) components are purely structural — no content logic.
- Every component is a named export from its own file. No barrel files that cause circular deps.

---

## Design System

### Design Tokens (`globals.css`)

```css
:root {
  /* Colors */
  --color-bg:           #0a0a0a;
  --color-bg-surface:   #111111;
  --color-bg-elevated:  #1a1a1a;
  --color-text:         #f0ede8;
  --color-text-muted:   #888888;
  --color-accent:       #e8d5b0;        /* Warm gold */
  --color-accent-dim:   #c4b08a;
  --color-border:       rgba(255,255,255,0.08);

  /* Typography */
  --font-display:       'Playfair Display', serif;   /* Headings */
  --font-body:          'DM Sans', sans-serif;       /* Body text */
  --font-mono:          'JetBrains Mono', monospace; /* Code / tags */

  /* Spacing */
  --section-gap:        8rem;
  --container-max:      1100px;
  --container-padding:  1.5rem;

  /* Effects */
  --radius-sm:          6px;
  --radius-md:          12px;
  --shadow-card:        0 4px 32px rgba(0,0,0,0.4);
  --transition:         0.2s ease;
}
```

### Animation Strategy (Framer Motion)
- **Page load**: Staggered fade-up on Hero elements (name → title → CTA).
- **Scroll reveal**: Each section fades + slides up when entering viewport (`whileInView`).
- **Cards**: Subtle scale + shadow lift on hover.
- **Navbar**: Background blur appears after 60px scroll.
- No animations run until the component is in the viewport — no layout jank.

---

## Routing

This is a **single-page application** with no multi-page routing. Navigation is purely **scroll-based**. React Router is used only if a `/404` or dedicated `/projects` page is added later.

```jsx
// App.jsx — linear scroll layout
<PageWrapper>
  <Navbar />
  <Hero />
  <About />
  <Experience />
  <Projects />
  <Skills />
  <Education />
  <Contact />
  <Footer />
</PageWrapper>
```

Navbar links use `<a href="#section-id">` smooth scroll. `useScrollSpy` hook highlights the active link by watching IntersectionObserver on each section.

---

## Data Layer

All content lives in one file: `src/data/resume.json` following the [JSON Resume](https://jsonresume.org/schema/) open standard.

```json
{
  "basics": {
    "name": "Your Name",
    "label": "Full Stack Developer",
    "email": "you@email.com",
    "summary": "...",
    "location": { "city": "Pune", "countryCode": "IN" },
    "profiles": [
      { "network": "GitHub", "url": "..." },
      { "network": "LinkedIn", "url": "..." }
    ]
  },
  "work": [...],
  "education": [...],
  "skills": [...],
  "projects": [...]
}
```

Sections import and destructure this file directly:

```js
import resume from '../data/resume.json';
const { basics, work, skills, projects } = resume;
```

To update any portfolio content — edit only `resume.json`. No component code ever needs to change.

---

## Performance & SEO

| Concern | Solution |
|---|---|
| SEO meta tags | `<title>`, `<meta description>`, Open Graph tags in `index.html` |
| Social sharing | `og:image`, `og:title`, `og:description` in `index.html` |
| Font loading | Google Fonts via `<link rel="preconnect">` + `display=swap` |
| Image optimization | Profile image exported as WebP, lazy-loaded with `loading="lazy"` |
| Bundle size | Vite tree-shakes unused code; Framer Motion is modular |
| Lighthouse target | Performance > 90, Accessibility > 95, Best Practices > 95 |

---

## Environment & Config

No `.env` file needed — this is a fully static site with no API keys or secrets.

### `vercel.json`
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### `vite.config.js`
```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
```

---

## Vercel Deployment

### Steps
1. Push repo to GitHub.
2. Connect repo on [vercel.com](https://vercel.com) → Import Project.
3. Vercel auto-detects Vite. Confirm build settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Every push to `main` triggers a production deploy automatically.
5. Every pull request gets a unique **preview URL** for free.

### Custom Domain
- Vercel Dashboard → Project → Settings → Domains → Add your domain.
- HTTPS provisioned automatically via Let's Encrypt.

### No environment variables required.

---

*Architecture version: 2.0.0 | Static Frontend Only | Vercel | March 2026*
