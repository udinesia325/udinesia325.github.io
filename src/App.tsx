import { lazy, Suspense, type ComponentType } from "react";
import { Noise } from "@/components/effects/Noise";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Hero } from "@/sections/Hero";

// Everything below the hero is a lazy chunk in its own Suspense boundary. The
// prerendered HTML is already on screen, and separate boundaries let React hydrate
// (and run each section's GSAP setup) one section per task instead of one long task.
const section = (load: () => Promise<ComponentType>) => lazy(() => load().then((C) => ({ default: C })));
const About = section(() => import("@/sections/About").then((m) => m.About));
const TechStack = section(() => import("@/sections/TechStack").then((m) => m.TechStack));
const Projects = section(() => import("@/sections/Projects").then((m) => m.Projects));
const Experience = section(() => import("@/sections/Experience").then((m) => m.Experience));
const Skills = section(() => import("@/sections/Skills").then((m) => m.Skills));
const Testimonials = section(() => import("@/sections/Testimonials").then((m) => m.Testimonials));
const Certificates = section(() => import("@/sections/Certificates").then((m) => m.Certificates));
const Contact = section(() => import("@/sections/Contact").then((m) => m.Contact));

const BELOW_FOLD = [About, TechStack, Projects, Experience, Skills, Testimonials, Certificates, Contact];

/** Reserves space while a lazy section loads, so ScrollTrigger doesn't jump. */
function SectionFallback() {
  return <div className="min-h-[60vh]" aria-hidden />;
}

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Noise />
      <Navbar />
      <main>
        <Hero />
        {BELOW_FOLD.map((Section, i) => (
          <Suspense key={i} fallback={<SectionFallback />}>
            <Section />
          </Suspense>
        ))}
      </main>
      <Footer />
    </>
  );
}
