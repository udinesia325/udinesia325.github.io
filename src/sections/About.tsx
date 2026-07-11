import { useEffect, useRef } from "react";
import { gsap, revealOnScroll, prefersReducedMotion } from "@/animations/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { IMAGES } from "@/constants/images";
import { PRINCIPLES, PROFILE, STATS } from "@/data/content";

/** Count-up number that starts when scrolled into view. */
function Counter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = `${value}`;
      return;
    }
    const ctx = gsap.context(() => {
      gsap.to(
        { v: 0 },
        {
          v: value,
          duration: 2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
          onUpdate() {
            el.textContent = `${Math.round((this.targets()[0] as { v: number }).v)}`;
          },
        },
      );
    });
    return () => ctx.revert();
  }, [value]);

  return (
    <div className="text-center md:text-left">
      <div className="font-display text-4xl font-bold md:text-5xl">
        <span ref={ref} className="tabular-nums">0</span>
        <span className="text-gradient-accent">{suffix}</span>
      </div>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

export function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      revealOnScroll("[data-about-line]", el);
      revealOnScroll("[data-about-image]", el, { duration: 1.3 });
      revealOnScroll("[data-principle]", el, {
        scrollTrigger: { trigger: el.querySelector("[data-principles]"), start: "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={rootRef} className="relative py-28 md:py-40">
      <div className="container-site">
        <SectionHeading
          eyebrow="about"
          title="Systems over shortcuts."
          description={PROFILE.intro}
        />

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          {/* portrait */}
          <div data-about-image>
            <TiltCard className="rounded-3xl" intensity={4}>
              <div className="glow-border relative overflow-hidden rounded-3xl">
                <img
                  src={IMAGES.profile}
                  alt={`Portrait of ${PROFILE.name}`}
                  width={640}
                  height={800}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4">
                  <p className="font-display font-semibold">{PROFILE.name}</p>
                  <p className="font-code text-xs text-secondary">
                    {PROFILE.role} · {PROFILE.location}
                  </p>
                </div>
              </div>
            </TiltCard>
          </div>

          {/* story + stats */}
          <div className="flex flex-col justify-center">
            {PROFILE.about.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                data-about-line
                className="mb-5 text-base leading-relaxed text-muted md:text-lg"
              >
                {paragraph}
              </p>
            ))}

            <div
              data-about-line
              className="mt-6 grid grid-cols-2 gap-8 rounded-3xl glass p-8 md:grid-cols-4"
            >
              {STATS.map((stat) => (
                <Counter key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>

        {/* engineering principles */}
        <div data-principles className="mt-20 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              data-principle
              className="glow-border group rounded-2xl glass p-6 transition-colors duration-300 hover:bg-white/[0.07]"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                <Icon size={20} />
              </div>
              <h3 className="font-display font-semibold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
