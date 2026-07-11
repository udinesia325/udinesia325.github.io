import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/animations/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { TECH_STACK } from "@/data/content";
import { cn } from "@/lib/utils";
import type { TechItem } from "@/types";

/* 8-col bento: rows fill exactly — 4+4 / 3+3+2 / 2+2+4 */
const SPAN: Record<TechItem["size"], string> = {
  lg: "md:col-span-4 md:row-span-2",
  wide: "md:col-span-4",
  md: "md:col-span-3",
  sm: "md:col-span-2",
};

function TechCard({ item }: { item: TechItem }) {
  const { name, description, icon: Icon, accent, size } = item;
  return (
    <TiltCard className={cn("rounded-3xl", SPAN[size])} intensity={5}>
      <div
        data-tech-card
        className="glow-border relative flex h-full flex-col justify-between overflow-hidden rounded-3xl glass p-7 transition-colors duration-300 hover:bg-white/[0.07]"
      >
        {/* ambient corner glow in the card's accent */}
        <div
          aria-hidden
          className="absolute -top-16 -right-16 size-48 rounded-full opacity-[0.13] blur-3xl transition-opacity duration-500 group-hover:opacity-30"
          style={{ background: accent }}
        />
        <div
          className="mb-6 flex size-12 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:-translate-y-1.5 group-hover:scale-110"
          style={{ background: `color-mix(in srgb, ${accent} 15%, transparent)`, color: accent }}
        >
          <Icon size={size === "lg" ? 26 : 22} />
        </div>
        <div>
          <h3 className={cn("font-display font-bold", size === "lg" ? "text-2xl" : "text-lg")}>
            {name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
        </div>
      </div>
    </TiltCard>
  );
}

export function TechStack() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-tech-card]",
        { opacity: 0, y: 56, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 85%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="stack" ref={rootRef} className="relative py-28 md:py-40">
      {/* section ambience */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[min(700px,100vw)] -translate-x-1/2 rounded-full bg-primary/8 blur-[140px]"
      />
      <div className="container-site">
        <SectionHeading
          eyebrow="stack"
          title="Tools I bet production on."
          description="A stack chosen for reliability under load — not hype. Every tool here has shipped real systems."
        />
        <div className="mt-16 grid auto-rows-[minmax(150px,auto)] gap-5 md:grid-cols-8">
          {TECH_STACK.map((item) => (
            <TechCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
