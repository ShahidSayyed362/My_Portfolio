# Antigravity Project Context

## What We're Building

This is a fully static personal portfolio website — no backend, no database, no API calls at runtime. It is a single-page React application built with Vite and deployed on Vercel.

## Tech Stack

React 18 with Vite as the build tool. Tailwind CSS for styling with CSS custom properties for design tokens. Framer Motion for animations (scroll reveals, staggered entrance on Hero, hover interactions on cards). Lucide React for icons. No state management library needed — all data is static.

## Architecture Philosophy

Strict component-based design with three tiers: atoms (ui/), layout wrappers (layout/), and full-page sections (sections/). Atoms are purely prop-driven with zero data dependencies. Sections own their data by importing directly from a single `src/data/resume.json` file. Layout components are structural only.

## Data Layer

There is one single source of truth: `src/data/resume.json` following the JSON Resume open standard. Every section of the portfolio (Hero, About, Experience, Projects, Skills, Education, Contact) reads from this file. To update any content on the site, only this file ever needs to be edited — no component code changes required.

## Page Structure

The site is a single scrollable page. There is no multi-page routing. The Navbar contains anchor links that smooth-scroll to section IDs. A `useScrollSpy` hook powered by IntersectionObserver highlights the active nav link as the user scrolls. A `useTheme` hook handles light/dark mode toggled via localStorage.

## Sections in Order

Hero (name, title, CTA buttons for resume download and contact scroll, social links), About (bio + profile image), Experience (timeline of work history from resume.json), Projects (card grid with tech tags and GitHub/live links), Skills (grouped badges by category), Education, Contact (email + social links), Footer.

## Design Direction

Dark theme. Warm editorial aesthetic — think refined developer portfolio, not startup SaaS. Display font: Playfair Display (serif, for headings). Body font: DM Sans. Mono font: JetBrains Mono (for tech tags and code snippets). Accent color: warm gold (#e8d5b0). Background: near-black (#0a0a0a). The feel should be confident, minimal, and typographically strong — not flashy, not corporate.

## Animation Rules

Framer Motion `whileInView` with `once: true` on every section for scroll reveal. Staggered children on Hero (name fades in first, then subtitle, then CTA). ProjectCard hover: subtle scale + shadow lift. Navbar: backdrop-blur appears after 60px scroll. No animation plays until the element enters the viewport.

## Deployment

Vercel. The repo connects directly to Vercel. Every push to `main` auto-deploys to production. PRs get preview URLs. The `vercel.json` contains a single rewrite rule (`source: "/(.*)" → destination: "/index.html"`) to handle client-side routing correctly. No environment variables are needed.

## What Does NOT Exist in This Project

No backend. No Express server. No API routes. No database. No Redis. No chatbot. No OpenRouter. No .env secrets. No authentication. No form submissions with server processing (Contact section links to email via mailto only).

## File to Update for Content Changes

`src/data/resume.json` — this is the only file that ever needs editing to update portfolio content.
