import { useEffect } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/animations/gsap";

/**
 * Lenis smooth scroll wired into GSAP's ticker + ScrollTrigger.
 * Loaded in idle time so it stays off the hydration critical path; native
 * scrolling (and native #anchor jumps) work until it arrives.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let cancelled = false;
    let cleanup = () => {};

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;

      const lenis = new Lenis({
        lerp: 0.11,
        wheelMultiplier: 1,
        touchMultiplier: 1.4,
      });

      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // anchor navigation through Lenis
      const onClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
        if (!anchor) return;
        const target = document.querySelector(anchor.getAttribute("href")!);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -72, duration: 1.4 });
      };
      document.addEventListener("click", onClick);

      cleanup = () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    };

    // Safari has no requestIdleCallback
    const idle = "requestIdleCallback" in window;
    const id = idle ? requestIdleCallback(start, { timeout: 2000 }) : setTimeout(start, 1);

    return () => {
      cancelled = true;
      if (idle) cancelIdleCallback(id);
      else clearTimeout(id);
      cleanup();
    };
  }, []);
}
