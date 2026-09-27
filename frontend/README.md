# Halex Rent Car

A Next.js 14 (App Router) + TypeScript + Tailwind CSS website for Halex Rent
Car, styled after the dark charcoal + gold "Limo Anywhere" reference design.

## Getting started

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Build for production:

```bash
npm run build
npm start
```

## Project structure

```
app/
  layout.tsx      Root layout, fonts, header/footer mount
  page.tsx         Homepage — assembles all sections
  globals.css      Tailwind + custom utility classes/animations
components/
  Header.tsx       Sticky nav with mobile menu
  Hero.tsx         Landing hero with entrance animation
  StatsBar.tsx      Count-up stats on scroll
  Fleet.tsx        Vehicle class cards + pricing
  About.tsx        Brand story + 3-step process
  Services.tsx     4-up service feature grid
  OfferBanner.tsx  10%-off lead form (id="contact")
  Destinations.tsx Local Austin highlights
  FAQ.tsx          Accordion
  Footer.tsx       Map embed, contact info, newsletter
  icons.tsx        Hand-drawn SVG car & UI icons (no external images)
  Reveal.tsx       Scroll-reveal wrapper (IntersectionObserver)
lib/
  data.ts          All editable business content lives here
```

## Customizing content

Almost everything you'll want to change — phone number, address, fleet
pricing, services, FAQs, Austin highlights — lives in **`lib/data.ts`**.
Edit that file and the whole site updates.

## Customizing colors/fonts

Defined in `tailwind.config.ts` under `theme.extend.colors` (the `ink`,
`gold`, and `paper` palettes) and `theme.extend.fontFamily`. Fonts
(Fraunces for display, Manrope for body) are loaded via `next/font/google`
in `app/layout.tsx`.

## Map

The footer embeds a keyless Google Maps iframe built from the address in
`lib/data.ts`. For a styled/interactive map (e.g. Mapbox), swap the
`<iframe>` in `components/Footer.tsx` for your preferred map library.

## Notes

- No external/stock images are used — all visuals are custom inline SVG,
  so there's nothing to license or that can 404.
- Forms (offer form, newsletter) are client-side only right now; wire the
  `handleSubmit` functions in `OfferBanner.tsx` and `Footer.tsx` up to your
  CRM, email provider, or an API route to actually collect leads.
- Animations respect `prefers-reduced-motion`.
