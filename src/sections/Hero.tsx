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

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  // The network is CSS-hidden below lg anyway; gating the mount keeps the ~240KB
  // three.js chunk off phones and out of the prerendered HTML.
  const [showNetwork, setShowNetwork] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 64rem)");
    const update = () => setShowNetwork(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // no entrance animation: the prerendered hero is visible from the first paint
  useEffect(() => {
    if (!rootRef.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
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
  }, []);

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
        className="absolute inset-y-0 right-0 z-20 hidden w-[40%] lg:block"
      >
        {showNetwork && (
          <Suspense fallback={null}>
            <HeroNetwork className="h-full w-full" />
          </Suspense>
        )}
      </div>

      <div data-hero-content className="container-site relative z-10 pt-24 pb-32">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full glass px-4 py-2">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          <span className="font-code text-xs text-muted">Available for new projects</span>
          <Sparkles size={12} className="text-primary" />
        </div>

        <h1 className="mb-6 font-code text-sm text-muted">
          {PROFILE.name} — {PROFILE.role}, {PROFILE.location.split(",")[0]}
        </h1>

        <p className="font-display text-hero font-bold tracking-tight">
          <span className="block overflow-hidden pb-1">
            <span className="block">
              Engineering
            </span>
          </span>
          <span className="block overflow-hidden pb-1">
            <span className="text-gradient block">
              that survives
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span className="block">
              production.
            </span>
          </span>
        </p>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          I'm <span className="font-semibold text-ink">{PROFILE.name}</span> — a{" "}
          <RotatingRoles /> crafting structured, scalable web systems from database
          architecture to pixel-perfect interfaces.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton href="#projects">
            View Selected Work
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            Get in Touch
          </MagneticButton>
        </div>

        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-2 font-code text-xs text-faint">
          {["React", "Laravel", "Go", "Node.js", "MySQL", "Redis"].map((tech) => (
            <span key={tech} className="transition-colors duration-300 hover:text-secondary">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-faint transition-colors hover:text-ink"
        aria-label="Scroll to about section"
      >
        <span className="font-code text-xs tracking-[0.25em] uppercase">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
