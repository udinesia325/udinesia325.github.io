import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/data/content";
import type { Testimonial } from "@/types";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="glass w-[340px] shrink-0 rounded-3xl p-7 transition-colors duration-300 hover:bg-white/[0.08] md:w-[420px]">
      <Quote size={22} className="text-primary/70" />
      <blockquote className="mt-4 text-sm leading-relaxed text-muted md:text-base">
        "{testimonial.quote}"
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <div
          aria-hidden
          className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary font-display text-sm font-bold text-white"
        >
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-ink">{testimonial.name}</p>
          <p className="font-code text-xs text-faint">{testimonial.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

/** Infinite dual-direction marquee. Pauses on hover; static under reduced motion. */
export function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  const rowA = TESTIMONIALS.slice(0, half);
  const rowB = TESTIMONIALS.slice(half);

  return (
    <section id="testimonials" className="relative overflow-hidden py-28 md:py-40">
      <div className="container-site">
        <SectionHeading
          eyebrow="testimonials"
          title="What partners say."
          description="Feedback from the people I've built and shipped with."
          align="center"
        />
      </div>

      <div
        className="mt-16 flex flex-col gap-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"
        aria-label="Client testimonials"
      >
        {[
          { row: rowA, animation: "animate-marquee" },
          { row: rowB, animation: "animate-marquee-reverse" },
        ].map(({ row, animation }, i) => (
          <div key={i} className="group flex overflow-hidden">
            <div className={`flex w-max gap-5 pr-5 ${animation} group-hover:[animation-play-state:paused] motion-reduce:animate-none`}>
              {[...row, ...row].map((testimonial, j) => (
                <TestimonialCard key={`${testimonial.name}-${j}`} testimonial={testimonial} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
