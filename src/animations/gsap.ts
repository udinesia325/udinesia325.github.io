import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const EASE = {
  out: "expo.out",
  inOut: "expo.inOut",
  power: "power3.out",
} as const;

export const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Standard scroll reveal: fade + rise, optionally staggered over children.
 * Call inside gsap.context(). No-ops (jumps to end state) under reduced motion.
 */
export function revealOnScroll(
  targets: gsap.TweenTarget,
  trigger: Element,
  vars: gsap.TweenVars = {},
) {
  if (prefersReducedMotion()) {
    gsap.set(targets, { opacity: 1, y: 0, clearProps: "all" });
    return;
  }
  gsap.fromTo(
    targets,
    { opacity: 0, y: 48 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: EASE.out,
      stagger: 0.08,
      scrollTrigger: {
        trigger,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      ...vars,
    },
  );
}

export { gsap, ScrollTrigger };
