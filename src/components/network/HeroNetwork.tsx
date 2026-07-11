import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { NetworkScene } from "./NetworkScene";

/**
 * Isolated, reusable hero-side software-architecture visualization.
 *
 * - Pauses animation when scrolled out of view (IntersectionObserver → frameloop).
 * - Respects prefers-reduced-motion: renders one static frame, no motion.
 * - Fades into the hero gradient at the edges via a radial CSS mask.
 *
 * Fills its container; the icon chips are interactive (hover), the rest is inert.
 */
export function HeroNetwork({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const animate = inView && !reduced;

  return (
    <div
      ref={wrapRef}
      className={className}
      style={{
        maskImage:
          "radial-gradient(ellipse 78% 82% at 55% 50%, #000 52%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 78% 82% at 55% 50%, #000 52%, transparent 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 9], fov: 50 }}
        frameloop={animate ? "always" : "demand"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
      >
        <NetworkScene active={animate} />
      </Canvas>
    </div>
  );
}
