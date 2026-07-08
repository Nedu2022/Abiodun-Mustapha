# Abiodun Mustapha — Personal Brand Website

A premium, editorial personal-brand site for **Abiodun Mustapha** (Personal
Development Expert, Educator, Author & Transformational Speaker), built from
scratch with **React + JavaScript + Tailwind CSS** and animated with **Framer
Motion**.

All content and links come from his real profiles (Linktree, socials, Amazon,
Medium). Nothing is invented.

## Sections

Preloader → Navbar → Hero (real portrait + credential marquee) → My Story
(Oshodi → purpose, links to his Medium article) → The Book (*30 Lessons Life
Taught Me Before 30*) → Free Resources (his ebooks + Purpose Challenge) →
Podcast (Growth Secrets, spinning-record graphic) → Speaking & Training →
Community (Growth Hub Africa) → Gallery (scroll-driven sliding rows) → Footer.

## Tech stack

- React 19 (Vite)
- Tailwind CSS v4 (theme tokens in `src/index.css`)
- Framer Motion — preloader spinner, scroll reveals, scroll-linked gallery,
  ambient particles, rotating record
- Fonts: **Playfair Display** (display) + **Jost** (body) — same pairing as the
  reference template
- Palette: editorial green & gold on warm cream & charcoal

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
npm run lint
```

## Customizing

- **Content & links:** everything lives in
  [`src/data/content.js`](src/data/content.js) — profile, nav, book, resources,
  podcast, speaking, community, socials. Every URL there is his real link.
- **Images:** [`public/images/`](public/images/). His real photo
  (`profile-real.jpg`) and book cover (`book-30.jpg`) are included. The gallery
  currently uses tasteful stock placeholders that represent his work (speaking,
  podcasting, writing) — **swap these with his real event photos** using the
  same filenames.
- **Brand colors / fonts:** edit the `@theme` tokens in
  [`src/index.css`](src/index.css).

## Notes

- Mobile nav is a right-side drawer with his full name as a backdrop watermark.
- Lucide 1.x dropped brand logos, so social icons (Instagram, YouTube, Telegram,
  WhatsApp, LinkedIn, Medium, Email) are hand-inlined SVGs in `SocialIcons.jsx`.
