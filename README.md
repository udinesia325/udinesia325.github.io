# Ahmad Fahruddin Salim — Portfolio

Cinematic single-page portfolio. Vite + React 19 + TypeScript + Tailwind v4 + GSAP/ScrollTrigger + Lenis.

## Run

```bash
npm install
npm run dev      # develop
npm run build    # production build → dist/
npm run preview  # serve the build
```

## Replace the placeholders

Everything fake is isolated in two places:

| What | Where |
|------|-------|
| Images (profile, projects, certificates) | Drop files into `public/images/` with the same names — paths live only in `src/constants/images.ts` |
| Copy, projects, experience, testimonials, certificates, contact | `src/data/content.ts` — placeholder entries are marked with comments |
| Resume link | `PROFILE.resumeUrl` in `src/data/content.ts` |
| Contact form | Currently opens a `mailto:` draft — swap for a real endpoint in `src/sections/Contact.tsx` (`onSubmit`) |

## Structure

```
src/
  animations/   gsap setup + shared reveal helpers
  components/   navbar, preloader, footer, ui primitives, background effects
  constants/    image path registry
  data/         ALL site content (single source of truth)
  hooks/        Lenis smooth scroll, reduced-motion
  sections/     hero, about, stack, projects, experience, skills, …
  types/        shared interfaces
```

Motion respects `prefers-reduced-motion` everywhere (animations skip to their end state).
