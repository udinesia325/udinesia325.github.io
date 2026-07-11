import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/animations/gsap";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

/** Section header with masked line-reveal on scroll. */
export function SectionHeading({ eyebrow, title, description, align = "left" }: SectionHeadingProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        el.querySelectorAll("[data-reveal]"),
        { y: "110%" },
        {
          y: 0,
          duration: 1.1,
          ease: EASE.out,
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 92%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={align === "center" ? "text-center" : ""}>
      <div className="overflow-hidden">
        <p
          data-reveal
          className="mb-4 font-code text-xs tracking-[0.3em] text-secondary uppercase"
        >
          {"// "}
          {eyebrow}
        </p>
      </div>
      <div className="overflow-hidden pb-1">
        <h2 data-reveal className="font-display text-section font-bold text-balance">
          {title}
        </h2>
      </div>
      {description && (
        <div className="overflow-hidden">
          <p
            data-reveal
            className={`mt-5 max-w-xl text-base leading-relaxed text-muted md:text-lg ${
              align === "center" ? "mx-auto" : ""
            }`}
          >
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
