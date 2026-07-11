import { useEffect, useRef } from "react";
import { Award } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "@/animations/gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";
import { CERTIFICATES } from "@/data/content";

export function Certificates() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        "[data-cert]",
        { opacity: 0, y: 60, rotate: (i: number) => (i % 2 === 0 ? -2 : 2) },
        {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 1,
          ease: EASE.out,
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 85%" },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section id="certificates" ref={rootRef} className="relative py-28 md:py-40">
      <div className="container-site">
        <SectionHeading
          eyebrow="credentials"
          title="Proof of the craft."
          description="In the age of AI, staying sharp means proving it — certified by Anthropic across Claude and agentic AI workflows."
        />

        {/* horizontal scroll on mobile, grid on desktop */}
        <div className="mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
          {CERTIFICATES.map((cert) => (
            <TiltCard
              key={cert.title}
              className="w-[280px] shrink-0 snap-center rounded-3xl lg:w-auto"
              intensity={6}
            >
              <div
                data-cert
                className="glow-border overflow-hidden rounded-3xl glass transition-colors duration-300 hover:bg-white/[0.07]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={cert.image}
                    alt={`${cert.title} certificate from ${cert.issuer}`}
                    width={560}
                    height={560}
                    loading="lazy"
                    className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute bottom-4 right-4 flex size-9 items-center justify-center rounded-full bg-void text-white shadow-lg">
                    <Award size={16} />
                  </span>
                </div>
                <div className="p-5">
                  <p className="font-code text-xs text-faint">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
