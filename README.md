# Saira Adnan — Portfolio

A premium, modern portfolio website for **Saira Adnan**, PhD researcher in Air Forensics.
Built with **Next.js 14 (App Router)**, **TypeScript** and **Tailwind CSS**.

## Highlights

- **Server-first** — every section is a React Server Component. Only the interactive
  research map is a Client Component (`"use client"`); even the mobile nav menu is
  pure CSS (no JS).
- **Content-driven** — all CV content lives in typed modules under `data/`, fully
  separated from presentation.
- **Interactive research map** — hover (or focus) markers to reveal where Saira has
  studied, researched and trained across two continents.
- **Refined design system** — botanical forest-green + warm amber palette, Fraunces
  display serif + Inter body, consistent spacing and motion.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

## Project structure

```
app/                     # Next.js App Router
  layout.tsx             # Root layout, fonts, metadata
  page.tsx               # Page composition (section order)
  globals.css            # Tailwind layers + utilities

components/
  layout/                # Navbar, Footer
  sections/              # One component per page section
  ui/                    # Reusable primitives (Container, Section,
                         #   SectionHeading, Card, Badge, Timeline, icons)
  map/
    ResearchMap.tsx      # Interactive client-side map

data/                    # All site content as typed modules
  profile.ts             # Identity, nav, references, quick facts
  education.ts           # Education timeline
  experience.ts          # Work / research timeline
  skills.ts              # Scientific, technical, languages, trainings
  publications.ts        # Peer-reviewed publications
  achievements.ts        # Honours, summer schools, conferences, memberships
  locations.ts           # Geo-coordinates for the research map

lib/
  types.ts               # Shared TypeScript interfaces

public/
  world-110m.json        # World topology used by the research map
```

## Editing content

To update any text, edit the relevant file in `data/` — no component changes needed.
The section order on the page is controlled in `app/page.tsx`.

## Tech

| Concern        | Choice                          |
| -------------- | ------------------------------- |
| Framework      | Next.js 14 (App Router)         |
| Language       | TypeScript                      |
| Styling        | Tailwind CSS                    |
| Fonts          | Fraunces (display) + Inter      |
| Map            | react-simple-maps + world-atlas |
