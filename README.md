# AVENIQTECH Portfolio

A modern, high-performance, responsive company portfolio for **AVENIQTECH SDN. BHD.** — dark high-tech theme (deep indigo, crisp white, electric violet accents).

## Tech Stack
- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** (custom dark theme)
- **Framer Motion** (scroll reveals, transitions)
- **Lucide React** (iconography)

## Sections
1. Header (sticky, scroll-aware, mobile menu) + Hero
2. About — brand meaning (AVE / NIQ / TECH), Vision, Mission
3. What We Do — Custom Web, AI & Automation, IoT
4. Leadership & Engineering Team (5 profiles)
5. Partners grid + CEO quote
6. Contact form (HQ: Tanjong Malim, Perak) + Footer

## Getting Started
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## Brand
The `components/Logo.tsx` component renders the AVENIQTECH monogram + wordmark
(supports `light` / `dark` variants). Swap in a real logo file by replacing the
SVG inside that component.
