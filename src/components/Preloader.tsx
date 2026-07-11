import { useEffect, useRef, useState } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/animations/gsap";
import { PROFILE } from "@/data/content";

interface PreloaderProps {
  onComplete: () => void;
}

/** Logo mark + counter, then a curtain wipe into the hero. */
export function Preloader({ onComplete }: PreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      onComplete();
      return;
    }

    const el = rootRef.current!;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete,
      });

      // logo letters rise in
      tl.fromTo(
        "[data-logo-char]",
        { y: "120%", rotate: 6 },
        { y: 0, rotate: 0, duration: 0.9, ease: EASE.out, stagger: 0.07 },
      )
        // progress counter
        .to(
          { v: 0 },
          {
            v: 100,
            duration: 1.6,
            ease: "power2.inOut",
            onUpdate() {
              setProgress(Math.round((this.targets()[0] as { v: number }).v));
            },
          },
          "<0.2",
        )
        // logo exits up, curtain wipes
        .to("[data-logo-char]", {
          y: "-120%",
          duration: 0.6,
          ease: EASE.inOut,
          stagger: 0.04,
        })
        .to(
          el,
          { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: EASE.inOut },
          "<0.15",
        );
    }, el);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-void"
      style={{ clipPath: "inset(0 0 0% 0)" }}
      aria-hidden
    >
      <div className="overflow-hidden">
        <div className="flex font-display text-5xl font-bold tracking-tight md:text-7xl">
          {PROFILE.alias.split("").map((char, i) => (
            <span key={i} data-logo-char className="inline-block will-change-transform">
              {char}
            </span>
          ))}
          <span data-logo-char className="inline-block text-primary will-change-transform">
            .
          </span>
        </div>
      </div>
      <div className="absolute bottom-10 right-10 font-code text-sm text-muted tabular-nums md:bottom-14 md:right-14">
        {String(progress).padStart(3, "0")}%
      </div>
      <div className="absolute bottom-0 left-0 h-px w-full bg-line">
        <div
          className="h-full bg-gradient-to-r from-primary via-highlight to-secondary transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
