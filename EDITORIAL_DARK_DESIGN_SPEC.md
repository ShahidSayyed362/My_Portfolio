# Editorial Dark — Design Specification
> Theme: Editorial Dark | Portfolio Website | React 18 + Vite + Tailwind CSS

---

## Table of Contents
1. [Design Philosophy](#design-philosophy)
2. [Design Tokens](#design-tokens)
3. [Typography](#typography)
4. [Component: Navbar](#component-navbar)
5. [Component: Hero Section](#component-hero-section)
6. [Component: Experience / Timeline](#component-experience--timeline)
7. [Component: Projects Grid](#component-projects-grid)
8. [Component: Skills](#component-skills)
9. [Component: Footer](#component-footer)
10. [Component: SectionWrapper](#component-sectionwrapper)
11. [Component: Button](#component-button)
12. [Component: Tag / Badge](#component-tag--badge)
13. [Animation Spec](#animation-spec)
14. [Responsive Breakpoints](#responsive-breakpoints)
15. [File References](#file-references)

---

## Design Philosophy

The Editorial Dark theme is built around a single idea: **a developer portfolio that reads like a well-designed print magazine**. It is not a SaaS landing page. It is not a startup template. Every typographic decision, color choice, and spacing rule is in service of that print-editorial feeling — warm, confident, unhurried.

Key principles:
- **Warmth over cold tech**: Near-black backgrounds (#0d0d0d) instead of true black. Warm gold accents instead of electric blue.
- **Serif headings in a digital context**: Using Georgia/Playfair Display for display text creates unexpected sophistication.
- **Extreme restraint on color**: Only three active colors — background, text, and one accent. Everything else is a shade of those three.
- **Whitespace as structure**: Sections breathe. Nothing feels cramped. Padding is generous intentionally.
- **Thin borders, not cards**: Sections are separated by 0.5px hairline borders rather than card shadows — keeps the flat editorial feel.

---

## Design Tokens

All tokens defined as CSS custom properties in `src/styles/globals.css`.

```css
:root {
  /* ── Backgrounds ── */
  --color-bg:            #0d0d0d;   /* Page background — near black, warm */
  --color-bg-surface:    #161616;   /* Navbar, section overrides */
  --color-bg-card:       #1c1c1c;   /* Project cards, skill badges */

  /* ── Text ── */
  --color-text:          #f0ede8;   /* Primary text — warm white, not pure white */
  --color-text-muted:    #777777;   /* Secondary text, dates, descriptions */

  /* ── Accent ── */
  --color-accent:        #d4af72;   /* Gold — CTAs, links, dots, eyebrows */
  --color-accent-subtle: rgba(212, 175, 114, 0.08);  /* Accent tint backgrounds */

  /* ── Borders ── */
  --color-border:        rgba(255, 255, 255, 0.07);  /* Section dividers, card borders */
  --color-border-strong: rgba(255, 255, 255, 0.12);  /* Hover state borders */

  /* ── Tag / Chip ── */
  --color-tag-bg:        rgba(212, 175, 114, 0.10);
  --color-tag-text:      #d4af72;

  /* ── Typography ── */
  --font-display:        'Playfair Display', Georgia, serif;
  --font-body:           'DM Sans', sans-serif;
  --font-mono:           'JetBrains Mono', 'Fira Code', monospace;

  /* ── Spacing ── */
  --section-padding-y:   48px;
  --section-padding-x:   32px;
  --container-max:       1100px;
  --container-padding:   1.5rem;

  /* ── Shape ── */
  --radius-sm:           4px;
  --radius-md:           8px;
  --radius-lg:           12px;
  --radius-pill:         999px;

  /* ── Motion ── */
  --transition-fast:     0.18s ease;
  --transition-base:     0.28s ease;
  --transition-slow:     0.45s ease;
}
```

**File reference:** `src/styles/globals.css`

---

## Typography

### Font Pairing

| Role | Font | Weight | Source |
|---|---|---|---|
| Display / Headings | Playfair Display | 400 (regular) | Google Fonts |
| Body / UI | DM Sans | 400, 500 | Google Fonts |
| Monospace / Tags | JetBrains Mono | 400 | Google Fonts |

### Google Fonts Import (in `index.html`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet" />
```

### Type Scale

| Element | Font | Size | Weight | Color |
|---|---|---|---|---|
| Hero name | Playfair Display | 52px | 400 | `--color-text` |
| Section heading | Playfair Display | 28px | 400 | `--color-text` |
| Project title | Playfair Display | 16px | 500 | `--color-text` |
| Navbar logo | Playfair Display | 18px | 400 | `--color-text` |
| Body / description | DM Sans | 14–15px | 400 | `--color-text-muted` |
| Eyebrow / label | DM Sans | 11px | 400 | `--color-accent` |
| Tag / chip | JetBrains Mono | 10–11px | 400 | `--color-tag-text` |
| Nav links | DM Sans | 13px | 400 | `--color-text-muted` |

**File reference:** `src/styles/globals.css`, `index.html`

---

## Component: Navbar

**File:** `src/components/layout/Navbar.jsx`
**Style:** `src/components/layout/Navbar.module.css`

### Visual Spec

- **Height:** 60px
- **Background:** `--color-bg-surface` (#161616) — slightly lifted from page bg
- **Border-bottom:** `0.5px solid var(--color-border)`
- **Padding:** 0 32px
- **Position:** `sticky top-0` with `z-index: 50`
- **Backdrop:** `backdrop-filter: blur(12px)` — applies once user scrolls past 60px (JS-driven class toggle)
- **Logo:** Playfair Display, 18px, `--color-text`. Format: `"YN."` — initials + period.
- **Nav links:** DM Sans 13px, `--color-text-muted`. Active link color: `--color-accent`.
- **CTA button (Resume):** 12px, border `1px solid var(--color-accent)`, color `--color-accent`, background transparent. Padding: 7px 16px, border-radius: 6px.

### Scroll Behavior

After `scrollY > 60`, add class `.scrolled` to Navbar:
```css
.navbar.scrolled {
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

### Responsive
- Below `768px`: hide nav links, show hamburger icon (Lucide `Menu`). Nav links collapse into a full-width drawer from top.

### Props / Data Source
```jsx
// Navbar reads from resume.json basics
import resume from '../../data/resume.json';
const { name, profiles } = resume.basics;
```

### JSX Structure
```jsx
<nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
  <span className={styles.logo}>{initials}.</span>
  <ul className={styles.navLinks}>
    <li><a href="#about" className={activeSection === 'about' ? styles.active : ''}>About</a></li>
    <li><a href="#experience">Work</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <button className={styles.resumeBtn}>Resume</button>
</nav>
```

**Hook used:** `useScrollSpy` (`src/hooks/useScrollSpy.js`) — returns `activeSection` string.

---

## Component: Hero Section

**File:** `src/components/sections/Hero.jsx`
**Style:** `src/components/sections/Hero.module.css`

### Visual Spec

- **Padding:** 72px 32px 64px
- **Border-bottom:** `0.5px solid var(--color-border)`
- **Max-width:** `--container-max` (1100px), centered

### Sub-elements

#### Eyebrow
- Font: DM Sans, 11px, `letter-spacing: 2px`, `text-transform: uppercase`
- Color: `--color-accent`
- Content: `"{role} · {city}, {countryCode}"` — sourced from `resume.basics`
- Margin-bottom: 20px

#### Name
- Font: Playfair Display, 52px, weight 400, `letter-spacing: -1.5px`, `line-height: 1.08`
- Color: `--color-text`
- Content: First name on line 1, last name on line 2 (achieved with `<br />`)
- Margin-bottom: 16px

#### Tagline / Summary
- Font: DM Sans, 16px, `--color-text-muted`, `line-height: 1.6`
- Max-width: 480px
- Content: `resume.basics.summary` (first 100–120 chars or full sentence)
- Margin-bottom: 36px

#### CTA Buttons
Two buttons side by side, `gap: 12px`, `flex-wrap: wrap`.

| Button | Style | Action |
|---|---|---|
| "View Projects" | Filled — bg `--color-accent`, color `--color-bg`, border-radius 8px, 10px 24px | `href="#projects"` smooth scroll |
| "Get in Touch" | Ghost — bg transparent, border `1px solid var(--color-border)`, color `--color-text` | `href="#contact"` smooth scroll |

#### Tech Chips
- Margin-top: 40px
- Font: JetBrains Mono, 11px
- Background: `--color-tag-bg`, color: `--color-tag-text`
- Border-radius: `--radius-pill` (999px)
- Padding: 4px 12px
- Source: `resume.skills` — top 5 keywords from first skill group

### Animation (Framer Motion)
```jsx
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
```
Wrap eyebrow, name, tagline, buttons, chips each in `<motion.div variants={item}>` inside a `<motion.div variants={container} initial="hidden" animate="show">`.

### Data Source
```jsx
import resume from '../../data/resume.json';
const { name, label, summary, location, profiles } = resume.basics;
```

---

## Component: Experience / Timeline

**File:** `src/components/sections/Experience.jsx`
**Style:** `src/components/sections/Experience.module.css`

### Visual Spec

- **Section padding:** 48px 32px
- **Border-bottom:** `0.5px solid var(--color-border)`

### Section Label
- Font: DM Sans, 11px, `letter-spacing: 2px`, uppercase
- Color: `--color-accent`
- Margin-bottom: 28px

### Timeline Layout

Each `work` entry renders as a row with two columns:
1. **Dot column** (24px wide) — contains a 10px gold circle dot + a 1px vertical line extending to the next item. Last item has no line.
2. **Content column** — date, role, company, description.

```
● ─── [Date]
│     [Role]
│     [Company]
│     [Description]
│
● ─── [Date]
      [Role]
      ...
```

#### Dot
- Size: 10px × 10px, `border-radius: 50%`
- Background: `--color-accent`
- Margin-top: 4px (aligns with first text line)

#### Connector Line
- Width: 1px, background: `--color-border`
- Flex: 1 (stretches to fill gap between dots)
- Margin-top: 6px

#### Date
- Font: DM Sans, 11px, `--color-text-muted`
- Margin-bottom: 4px
- Format: `"Jan 2023 – Present"` — use `src/utils/formatDate.js`

#### Role
- Font: DM Sans, 15px, weight 500, `--color-text`
- Margin-bottom: 2px

#### Company
- Font: DM Sans, 13px, `--color-accent`
- Margin-bottom: 6px

#### Description
- Font: DM Sans, 13px, `--color-text-muted`, `line-height: 1.6`
- Source: `work[n].summary` or first highlight from `work[n].highlights[0]`

### Scroll Animation (Framer Motion)
Each `TimelineItem` wrapped in:
```jsx
<motion.div
  initial={{ opacity: 0, x: -16 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.08 }}
>
```

### Data Source
```jsx
import resume from '../../data/resume.json';
const { work } = resume;
```

---

## Component: Projects Grid

**File:** `src/components/sections/Projects.jsx`
**Style:** `src/components/sections/Projects.module.css`

**Sub-component:** `src/components/ui/ProjectCard.jsx`

### Visual Spec

- **Grid:** `display: grid`, `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, `gap: 16px`

### ProjectCard

- **Background:** `--color-bg-card` (#1c1c1c)
- **Border:** `0.5px solid var(--color-border)`
- **Border-radius:** `--radius-lg` (12px)
- **Padding:** 20px
- **Hover state:** `border-color: var(--color-border-strong)`, `transform: translateY(-2px)` — subtle lift. Transition: `--transition-base`.

#### Card Title
- Font: Playfair Display, 16px, weight 500, `--color-text`
- Margin-bottom: 8px

#### Card Description
- Font: DM Sans, 13px, `--color-text-muted`, `line-height: 1.6`
- Margin-bottom: 16px

#### Tech Tags
- See [Component: Tag / Badge](#component-tag--badge)
- `display: flex; gap: 6px; flex-wrap: wrap`

#### Project Link
- Font: DM Sans, 12px, `--color-accent`
- No underline by default. Underline on hover.
- Display: block, margin-top: 12px
- Format: `"github.com/you/project →"`
- Source: `projects[n].url`

### Scroll Animation (Framer Motion)
```jsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-40px" }}
  transition={{ duration: 0.5, delay: index * 0.1 }}
>
```

### Data Source
```jsx
import resume from '../../data/resume.json';
const { projects } = resume;
// Each project: { name, description, url, keywords[] }
```

---

## Component: Skills

**File:** `src/components/sections/Skills.jsx`
**Style:** `src/components/sections/Skills.module.css`

### Visual Spec

- **Layout:** `display: flex; flex-wrap: wrap; gap: 8px`
- Groups rendered as labeled rows if `resume.skills` contains multiple groups.

### SkillBadge
- Font: DM Sans, 12px, `--color-text-muted`
- Background: `--color-bg-card`
- Border: `0.5px solid var(--color-border)`
- Border-radius: `--radius-md` (8px) — not pill, more editorial
- Padding: 5px 14px
- Hover: `border-color: var(--color-accent)`, `color: var(--color-text)` — transition `--transition-fast`

### Group Label (optional, if skills have categories)
- Font: DM Sans, 11px, uppercase, `letter-spacing: 1.5px`, `--color-text-muted`
- Margin-bottom: 10px, margin-top: 20px (except first group)

### Data Source
```jsx
import resume from '../../data/resume.json';
const { skills } = resume;
// skills[n]: { name: "Frontend", keywords: ["React", "TypeScript", ...] }
```

---

## Component: Footer

**File:** `src/components/layout/Footer.jsx`
**Style:** `src/components/layout/Footer.module.css`

### Visual Spec

- **Padding:** 24px 32px
- **Layout:** `display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px`
- **No top border** — sits naturally after the last section's border-bottom.

#### Left — Name + Year
- Font: Playfair Display, 14px, `--color-text-muted`
- Content: `"{name} · {year}"`

#### Right — Social Links
- Font: DM Sans, 12px, `--color-text-muted`
- `display: flex; gap: 16px`
- On hover: `color: var(--color-accent)`, transition `--transition-fast`
- Links from `resume.basics.profiles` + `resume.basics.email`
- Networks to show: GitHub, LinkedIn, Twitter/X, email (as `mailto:`)

### Data Source
```jsx
import resume from '../../data/resume.json';
const { name, email, profiles } = resume.basics;
```

---

## Component: SectionWrapper

**File:** `src/components/layout/SectionWrapper.jsx`

A utility wrapper applied to every section for consistent spacing and max-width.

```jsx
// SectionWrapper.jsx
export const SectionWrapper = ({ id, children, className }) => (
  <section
    id={id}
    className={`section-wrapper ${className || ''}`}
    style={{
      padding: 'var(--section-padding-y) var(--section-padding-x)',
      borderBottom: '0.5px solid var(--color-border)',
      maxWidth: 'var(--container-max)',
      margin: '0 auto',
      width: '100%',
    }}
  >
    {children}
  </section>
);
```

Every section component (`Hero`, `Experience`, `Projects`, `Skills`, `Contact`) is wrapped in `<SectionWrapper id="section-id">`.

**File reference:** `src/components/layout/SectionWrapper.jsx`

---

## Component: Button

**File:** `src/components/ui/Button.jsx`

### Variants

#### Primary (filled)
```css
.btn-primary {
  background:    var(--color-accent);
  color:         var(--color-bg);           /* Dark text on gold */
  border:        none;
  padding:       10px 24px;
  border-radius: var(--radius-md);
  font-family:   var(--font-body);
  font-size:     14px;
  font-weight:   500;
  cursor:        pointer;
  transition:    opacity var(--transition-fast);
}
.btn-primary:hover { opacity: 0.88; }
```

#### Ghost (outlined)
```css
.btn-ghost {
  background:    transparent;
  color:         var(--color-text);
  border:        1px solid var(--color-border);
  padding:       10px 24px;
  border-radius: var(--radius-md);
  font-family:   var(--font-body);
  font-size:     14px;
  cursor:        pointer;
  transition:    border-color var(--transition-fast), color var(--transition-fast);
}
.btn-ghost:hover {
  border-color: var(--color-accent);
  color:        var(--color-accent);
}
```

### Props
```jsx
<Button variant="primary" | "ghost" onClick={fn} href="#section">
  Label
</Button>
```

**File reference:** `src/components/ui/Button.jsx`

---

## Component: Tag / Badge

**File:** `src/components/ui/Tag.jsx`

Used in: Hero chips, ProjectCard tech tags.

```css
.tag {
  font-family:   var(--font-mono);
  font-size:     10px;
  padding:       3px 9px;
  border-radius: var(--radius-sm);        /* 4px — sharp, not pill */
  background:    var(--color-tag-bg);     /* rgba(212,175,114,0.10) */
  color:         var(--color-tag-text);   /* #d4af72 */
  white-space:   nowrap;
}
```

Hero eyebrow chips use `border-radius: var(--radius-pill)` — this is the only distinction between a `Tag` and a `Chip`. Pass `pill` prop to toggle:

```jsx
<Tag pill>React</Tag>   // Hero chips — rounded pill
<Tag>React</Tag>        // Project tags — sharp corners
```

**File reference:** `src/components/ui/Tag.jsx`

---

## Animation Spec

All animations use **Framer Motion**. Install: `npm install framer-motion`.

### Hero Entrance (stagger on mount)

```jsx
// src/components/sections/Hero.jsx
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.10, delayChildren: 0.05 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};
```

### Section Scroll Reveal

```jsx
// Used in Experience, Projects, Skills
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-60px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

### Card Hover (Framer Motion)

```jsx
<motion.div
  whileHover={{ y: -2, borderColor: 'var(--color-border-strong)' }}
  transition={{ duration: 0.18 }}
>
```

### Navbar Background (CSS + JS class toggle)

```js
// src/components/layout/Navbar.jsx
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 60);
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

```css
/* Navbar.module.css */
.navbar { transition: background var(--transition-base), backdrop-filter var(--transition-base); }
.navbar.scrolled { background: rgba(13,13,13,0.85); backdrop-filter: blur(12px); }
```

---

## Responsive Breakpoints

Defined in `tailwind.config.js` (or media queries in CSS modules):

| Breakpoint | Width | Changes |
|---|---|---|
| `sm` | 640px | Hero font-size reduces to 36px. Section padding-x reduces to 20px. |
| `md` | 768px | Navbar links hidden, hamburger shown. Projects grid → 1 column. |
| `lg` | 1024px | Full layout — projects grid 2–3 cols, hero name 52px. |
| `xl` | 1280px | Max-width container caps at 1100px — layout stops growing. |

### Hero Name Responsive
```css
.hero-name {
  font-size: clamp(32px, 6vw, 52px);   /* Fluid scaling between mobile and desktop */
}
```

---

## File References

Complete map of every file touched by the Editorial Dark theme:

| File | Purpose |
|---|---|
| `src/styles/globals.css` | All CSS tokens — colors, fonts, spacing, radii, transitions |
| `src/styles/animations.css` | Keyframe animations (optional, Framer Motion handles most) |
| `index.html` | Google Fonts import, meta tags, OG image |
| `src/data/resume.json` | Single source of truth for all portfolio content |
| `src/App.jsx` | Root component — assembles all sections in scroll order |
| `src/main.jsx` | Vite entry point |
| `src/components/layout/Navbar.jsx` | Sticky nav with scroll-spy, blur-on-scroll |
| `src/components/layout/Navbar.module.css` | Navbar scoped styles |
| `src/components/layout/Footer.jsx` | Name + year + social links |
| `src/components/layout/Footer.module.css` | Footer scoped styles |
| `src/components/layout/PageWrapper.jsx` | Max-width container, page-level padding |
| `src/components/layout/SectionWrapper.jsx` | Per-section padding + hairline border |
| `src/components/sections/Hero.jsx` | Eyebrow, name, tagline, CTAs, chips |
| `src/components/sections/Hero.module.css` | Hero scoped styles |
| `src/components/sections/Experience.jsx` | Timeline of work entries |
| `src/components/sections/Experience.module.css` | Timeline dot, line, content styles |
| `src/components/sections/Projects.jsx` | Grid of project cards |
| `src/components/sections/Projects.module.css` | Grid layout styles |
| `src/components/sections/Skills.jsx` | Skill badges grouped by category |
| `src/components/sections/Skills.module.css` | Badge + group label styles |
| `src/components/sections/Contact.jsx` | Email + social links |
| `src/components/sections/Contact.module.css` | Contact scoped styles |
| `src/components/ui/Button.jsx` | Reusable button — primary + ghost variants |
| `src/components/ui/Tag.jsx` | Tech tag / chip — pill and sharp variants |
| `src/components/ui/Badge.jsx` | Skill badge (border, no fill) |
| `src/components/ui/SectionHeading.jsx` | Reusable section label (uppercase, gold) |
| `src/components/ui/ProjectCard.jsx` | Single project card with hover animation |
| `src/hooks/useScrollSpy.js` | IntersectionObserver — returns active section id |
| `src/hooks/useTheme.js` | Light/dark mode toggle (future use) |
| `src/utils/formatDate.js` | Converts ISO dates to "Jan 2023 – Present" |
| `tailwind.config.js` | Extends Tailwind with custom tokens |
| `vite.config.js` | Vite build config |
| `vercel.json` | SPA rewrite rule for Vercel |

---

*Design Spec version: 1.0.0 | Editorial Dark Theme | March 2026*
