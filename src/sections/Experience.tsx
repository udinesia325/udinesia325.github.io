import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "@/animations/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EXPERIENCE } from "@/data/content";

const START_YEAR = 2023;
const NUMBER_WORDS = [
  "Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
];

function yearsOfShippingWord() {
  const diff = new Date().getFullYear() - START_YEAR;
  return NUMBER_WORDS[diff] ?? String(diff);
}

export function Experience() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;

      // the beam draws itself as you scroll
      gsap.fromTo(
        "[data-beam]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-timeline]",
            start: "top 70%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>("[data-entry]").forEach((entry) => {
        gsap.fromTo(
          entry,
          { opacity: 0, y: 56 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: EASE.out,
            scrollTrigger: { trigger: entry, start: "top 88%" },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={rootRef} className="relative py-28 md:py-40">
      <div className="container-site">
        <SectionHeading
          eyebrow="journey"
          title={`${yearsOfShippingWord()} years of shipping.`}
          description="From freelance foundations to owning end-to-end delivery of data-heavy production platforms."
        />

        <div data-timeline className="relative mt-20 ml-4 md:ml-0">
          {/* beam track + animated fill */}
          <div className="absolute top-0 bottom-0 left-0 w-px bg-line md:left-1/2" />
          <div
            data-beam
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-gradient-to-b from-primary via-highlight to-secondary shadow-[0_0_12px_rgba(124,58,237,0.8)] md:left-1/2"
          />

          <div className="flex flex-col gap-16 md:gap-24">
            {EXPERIENCE.map((entry, i) => {
              const right = i % 2 === 0;
              return (
                <div
                  key={entry.period}
                  data-entry
                  className={`relative pl-10 md:w-1/2 md:pl-0 ${
                    right ? "md:ml-auto md:pl-14" : "md:mr-auto md:pr-14 md:text-right"
                  }`}
                >
                  {/* node — sits on the beam (entry's inner edge = center line on md+) */}
                  <span
                    className={`absolute top-1.5 -left-[5px] size-[11px] rounded-full bg-primary ring-4 ring-primary/25 ${
                      right ? "md:-left-[5.5px]" : "md:left-auto md:-right-[5.5px]"
                    }`}
                  />
                  <p className="font-code text-xs tracking-[0.2em] text-secondary">{entry.period}</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">{entry.role}</h3>
                  <p className="mt-1 text-sm font-medium text-highlight">{entry.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">{entry.summary}</p>

                  <ul className="mt-4 space-y-2">
                    {entry.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className={`flex items-start gap-2 text-sm text-muted ${
                          right ? "" : "md:flex-row-reverse"
                        }`}
                      >
                        <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-success" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`mt-4 flex flex-wrap gap-2 ${right ? "" : "md:justify-end"}`}>
                    {entry.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line px-2.5 py-0.5 font-code text-[11px] text-faint"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
