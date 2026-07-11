import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "@/animations/gsap";
import { Aurora } from "@/components/effects/Aurora";
import { GridPattern } from "@/components/effects/GridPattern";
import { Particles } from "@/components/effects/Particles";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { PROFILE } from "@/data/content";

// Three.js is heavy and this is a secondary focal point — code-split so it never
// blocks the hero text's first paint.
const HeroNetwork = lazy(() =>
  import("@/components/network/HeroNetwork").then((m) => ({ default: m.HeroNetwork })),
);

/** Rotating role words with a masked flip. */
function RotatingRoles() {
  const [index, setIndex] = useState(0);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      const el = wordRef.current;
      if (!el) return;
      gsap.to(el, {
        y: "-110%",
        duration: 0.45,
        ease: "power3.in",
        onComplete: () => {
          setIndex((i) => (i + 1) % PROFILE.roles.length);
          gsap.fromTo(el, { y: "110%" }, { y: 0, duration: 0.55, ease: EASE.out });
        },
      });
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="inline-flex overflow-hidden align-bottom">
      <span ref={wordRef} className="inline-block text-gradient-accent font-semibold will-change-transform">
        {PROFILE.roles[index]}
      </span>
    </span>
  );
}

export function Hero({ started }: { started: boolean }) {
  const rootRef = useRef<HTMLElement>(null);

  // entrance choreography, waits for preloader
  useEffect(() => {
    if (!started || !rootRef.current) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set("[data-hero-reveal], [data-hero-fade]", { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ delay: 0.1 });
      tl.fromTo(
        "[data-hero-reveal]",
        { y: "115%" },
        { y: 0, duration: 1.3, ease: EASE.out, stagger: 0.12 },
      ).fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 1, ease: EASE.out, stagger: 0.1 },
        "-=0.8",
      );

      // background drifts slower than content on scroll
      gsap.to("[data-hero-bg]", {
        yPercent: 28,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to("[data-hero-content]", {
        yPercent: -10,
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom 30%", scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [started]);

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-dvh flex-col justify-center overflow-hidden"
    >
      <div data-hero-bg className="absolute inset-0">
        <Aurora />
        <GridPattern />
        <Particles />
      </div>

      {/* Living software-architecture network on the right. Hidden below lg where
          the single column already fills the width. */}
      <div
        data-hero-fade
        className="absolute inset-y-0 right-0 z-20 hidden w-[40%] lg:block"
      >
        <Suspense fallback={null}>
          <HeroNetwork className="h-full w-full" />
        </Suspense>
      </div>

      <div data-hero-content className="container-site relative z-10 pt-24 pb-32">
        <div data-hero-fade className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          <span className="font-code text-xs text-muted">Available for new projects</span>
          <Sparkles size={12} className="text-primary" />
        </div>

        <h1 className="font-display text-hero font-bold tracking-tight">
          <span className="block overflow-hidden pb-1">
            <span data-hero-reveal className="block will-change-transform">
              Engineering
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span data-hero-reveal className="text-gradient block will-change-transform">
              that survives
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span data-hero-reveal className="block will-change-transform">
              production.
            </span>
          </span>
        </h1>

        <p data-hero-fade className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          I'm <span className="font-semibold text-ink">{PROFILE.name}</span> — a{" "}
          <RotatingRoles /> crafting structured, scalable web systems from database
          architecture to pixel-perfect interfaces.
        </p>

        <div data-hero-fade className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="#projects">
            View Selected Work
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in Touch
          </MagneticButton>
        </div>

        <div data-hero-fade className="mt-16 flex flex-wrap gap-x-8 gap-y-2 font-code text-xs text-faint">
          {["React", "Laravel", "Go", "Node.js", "MySQL", "Redis"].map((tech) => (
            <span key={tech} className="transition-colors duration-300 hover:text-secondary">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#about"
        data-hero-fade
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-ink"
        aria-label="Scroll to about section"
      >
        <span className="font-code text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
