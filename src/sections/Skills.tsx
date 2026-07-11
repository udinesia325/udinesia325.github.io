import { useEffect, useRef } from "react";
import { gsap, EASE, prefersReducedMotion } from "@/animations/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { SKILL_GROUPS } from "@/data/content";
import type { SkillGroup } from "@/types";

function SkillCard({ group }: { group: SkillGroup }) {
  const { title, icon: Icon, accent, proof, skills } = group;
  return (
    <TiltCard className="rounded-3xl" intensity={4}>
      <div
        data-skill-card
        className="glow-border flex h-full flex-col rounded-3xl glass p-7 transition-colors duration-300 hover:bg-white/[0.07]"
      >
        <div className="mb-3 flex items-center gap-3">
          <div
            className="flex size-10 items-center justify-center rounded-xl"
            style={{ background: `color-mix(in srgb, ${accent} 15%, transparent)`, color: accent }}
          >
            <Icon size={19} />
          </div>
          <h3 className="font-display text-lg font-bold">{title}</h3>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-muted">{proof}</p>

        <div className="mt-auto flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              data-skill-badge
              className="inline-flex cursor-default items-center gap-2 rounded-full border border-line bg-white/[0.04] px-3 py-1.5 font-code text-xs text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `color-mix(in srgb, ${accent} 60%, transparent)`;
                e.currentTarget.style.boxShadow = `0 4px 18px color-mix(in srgb, ${accent} 25%, transparent)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <span aria-hidden className="size-1.5 rounded-full" style={{ background: accent }} />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </TiltCard>
  );
}

export function Skills() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.utils.toArray<HTMLElement>("[data-skill-card]").forEach((card) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
        tl.fromTo(
          card,
          { opacity: 0, y: 48 },
          { opacity: 1, y: 0, duration: 0.9, ease: EASE.out },
        ).fromTo(
          card.querySelectorAll("[data-skill-badge]"),
          { opacity: 0, y: 14, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: EASE.out, stagger: 0.05 },
          "-=0.45",
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={rootRef} className="relative py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[400px] rounded-full bg-secondary/6 blur-[150px]"
      />
      <div className="container-site">
        <SectionHeading
          eyebrow="capabilities"
          title="Depth across the stack."
          description="No self-assigned percentages — just the tools and problem spaces proven in production."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SKILL_GROUPS.map((group) => (
            <SkillCard key={group.title} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
