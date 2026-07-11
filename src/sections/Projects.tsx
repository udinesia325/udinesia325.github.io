import { useEffect, useRef } from "react";
import { ArrowUpRight, Lock } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "@/animations/gsap";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROJECTS } from "@/data/content";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const flip = index % 2 === 1;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        el.querySelector("[data-project-media]"),
        { opacity: 0, x: flip ? 70 : -70, rotateY: flip ? -6 : 6 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1.2,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: "top 85%" },
        },
      );
      gsap.fromTo(
        el.querySelectorAll("[data-project-text]"),
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: EASE.out,
          stagger: 0.09,
          scrollTrigger: { trigger: el, start: "top 82%" },
        },
      );
      // slow image parallax inside its frame
      gsap.fromTo(
        el.querySelector("img"),
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, [flip]);

  return (
    <article
      ref={ref}
      className={cn(
        "grid items-center gap-10 lg:grid-cols-2 lg:gap-16",
        flip && "lg:[&>*:first-child]:order-2",
      )}
    >
      {/* media */}
      <div data-project-media className="group relative [perspective:1200px]">
        <div className="glow-border relative overflow-hidden rounded-3xl border border-line">
          <div className="overflow-hidden">
            <img
              src={project.image}
              alt={`${project.title} — ${project.tagline}`}
              width={960}
              height={640}
              loading="lazy"
              className="aspect-[3/2] w-full scale-[1.12] object-cover transition-transform duration-700 ease-out group-hover:scale-[1.18]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
          <span className="absolute top-5 left-5 glass rounded-full px-3 py-1 font-code text-xs text-secondary">
            {project.year}
          </span>
        </div>
        {/* offset glow slab behind media */}
        <div
          aria-hidden
          className={cn(
            "absolute -z-10 h-full w-full rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/10 blur-2xl transition-transform duration-700 group-hover:scale-105",
            flip ? "-top-4 -right-4" : "-top-4 -left-4",
          )}
        />
      </div>

      {/* copy */}
      <div>
        <p data-project-text className="font-code text-xs tracking-[0.25em] text-highlight uppercase">
          {String(project.id).padStart(2, "0")} · {project.tagline}
        </p>
        <h3 data-project-text className="mt-3 font-display text-3xl font-bold md:text-4xl">
          {project.title}
        </h3>
        <p data-project-text className="mt-4 text-base leading-relaxed text-muted md:text-lg">
          {project.description}
        </p>
        <p data-project-text className="mt-4 border-l-2 border-primary/60 pl-4 text-sm text-muted italic">
          {project.highlight}
        </p>
        <div data-project-text className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line bg-white/[0.04] px-3 py-1 font-code text-xs text-muted transition-colors duration-300 hover:border-primary/50 hover:text-ink"
            >
              {tag}
            </span>
          ))}
        </div>
        <div data-project-text className="mt-8 flex flex-wrap items-center gap-4">
          {project.liveUrl ? (
            <MagneticButton href={project.liveUrl} external>
              Live Demo
              <ArrowUpRight size={15} />
            </MagneticButton>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 font-code text-xs text-faint">
              <Lock size={13} />
              Private / Client Project
            </span>
          )}
          {project.githubUrl && (
            <MagneticButton href={project.githubUrl} variant="ghost" external>
              <GithubIcon size={15} />
              Source
            </MagneticButton>
          )}
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 -left-40 h-[600px] w-[500px] rounded-full bg-highlight/6 blur-[160px]"
      />
      <div className="container-site">
        <SectionHeading
          eyebrow="selected work"
          title="Built to ship. Built to last."
          description="A selection of production systems — financial platforms, realtime infrastructure, and polished brand experiences."
        />
        <div className="mt-20 flex flex-col gap-28 md:gap-36">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
