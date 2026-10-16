# BodhixAI — Website

Corporate website for **BodhixAI** — *Intelligence, engineered with purpose.*

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript · Tailwind CSS v4 · Motion for React (`motion/react`) · Embla Carousel · React Three Fiber + Drei · React Hook Form + Zod · Lucide.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
```

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build (static prerender where possible) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | Canonical URL for metadata, sitemap, Open Graph |
| `RESEND_API_KEY` | for contact form | [Resend](https://resend.com) API key |
| `CONTACT_TO_EMAIL` | for contact form | Recipient(s), comma-separated |
| `CONTACT_FROM_EMAIL` | for contact form | Verified sender, e.g. `BodhixAI <website@your-domain.com>` |

If the email variables are missing, `/api/contact` responds with `503` and the form shows an error. It **never** pretends a message was sent.

## Project structure

```
src/
  app/                    routes: / · /solutions · /work · /work/[slug] · /research · /about · /contact · /privacy · /terms
    api/contact/route.ts  validated contact endpoint (Zod, honeypot, timing check, rate limit, Resend)
    sitemap.ts robots.ts opengraph-image.tsx template.tsx (page transitions)
  content/site.ts         ALL editable content: solutions, projects, research, founders, tech, testimonials
  lib/motion.ts           motion tokens (durations, easing, springs, variants)
  lib/contact-schema.ts   shared client/server validation
  components/
    ui.tsx                Reveal, AnimatedText, SectionHeading, MagneticButton, Tag, PageHero
    Navbar.tsx Footer.tsx
    home/Hero.tsx         hero + lazy 3D core (home/HeroCore3D.tsx) with SVG fallback
    sections.tsx          Intro, SolutionBento, Pillars, ResearchShowcase, TechnologyStack, FounderSection, ContactCTA
    ProjectCarousel.tsx   Embla carousel + ProjectCard
    CaseStudyScroller.tsx sticky scroll-driven security story
    ProcessTimeline.tsx   scroll-progress timeline (horizontal desktop / vertical mobile)
    TestimonialCarousel.tsx
    Visuals.tsx ProjectVisual.tsx   original SVG/CSS illustrations (no image weight)
```

## Customising content

Everything lives in `src/content/site.ts` and is typed.

- **Projects** – add an entry to `projects`; its detail page at `/work/<slug>` is generated automatically. Set `origin` honestly (`Founder-led research`, `Research prototype`, `Independent engineering`). Add BodhixAI client work only with approval.
- **Research** – `status` must be `Published`, `Accepted`, or `Ongoing`. Add `link` only for real, verified URLs.
- **Testimonials** – add **approved** quotes to `testimonials`. While it's empty, production shows a "Let's create the next success story" CTA. Development shows clearly labelled placeholders.
- **Founders** – add more co-founders to `founders`. To use a photo, drop it in `public/` and swap the initials block for `next/image`.
- **Social links** – add verified company channels to `site.socials`; the footer and Organization schema pick them up.

## Motion & accessibility

- `MotionConfig reducedMotion="user"` honours `prefers-reduced-motion` site-wide. CSS loops (marquee, ambient drift) are also disabled under reduced motion.
- The 3D hero is loaded lazily on the client, pauses when off-screen, and falls back to a static SVG when WebGL is unavailable or reduced motion is set.
- Animations use transform and opacity only. Pinned sections use native `position: sticky`, so scrolling is never hijacked.
- Skip link, visible focus rings, keyboard-operable carousels (arrow keys), labelled controls, and `role="alert"` form errors.

## Deployment

Deploys to Vercel with zero config. Set the environment variables in the project settings. Any Node host also works: `npm run build && npm start`.
