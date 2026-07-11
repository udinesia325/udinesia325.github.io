import { lazy, Suspense, useState } from "react";
import { Noise } from "@/components/effects/Noise";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { Preloader } from "@/components/Preloader";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { TechStack } from "@/sections/TechStack";
import { Projects } from "@/sections/Projects";

// below-fold sections load in a second chunk
const Experience = lazy(() =>
  import("@/sections/Experience").then((m) => ({ default: m.Experience })),
);
const Skills = lazy(() => import("@/sections/Skills").then((m) => ({ default: m.Skills })));
const Testimonials = lazy(() =>
  import("@/sections/Testimonials").then((m) => ({ default: m.Testimonials })),
);
const Certificates = lazy(() =>
  import("@/sections/Certificates").then((m) => ({ default: m.Certificates })),
);
const Contact = lazy(() => import("@/sections/Contact").then((m) => ({ default: m.Contact })));

/** Reserves space while a lazy section loads, so ScrollTrigger doesn't jump. */
function SectionFallback() {
  return <div className="min-h-[60vh]" aria-hidden />;
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll(loaded);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <Noise />
      <Navbar visible={loaded} />
      <main>
        <Hero started={loaded} />
        <About />
        <TechStack />
        <Projects />
        <Suspense fallback={<SectionFallback />}>
          <Experience />
          <Skills />
          <Testimonials />
          <Certificates />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
