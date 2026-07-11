import { useRef, type ReactNode, type MouseEvent } from "react";
import { gsap, prefersReducedMotion } from "@/animations/gsap";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees */
  intensity?: number;
}

/** 3D tilt toward the cursor with a tracked glow spot (via CSS vars). */
export function TiltCard({ children, className, intensity = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--glow-x", `${px * 100}%`);
    el.style.setProperty("--glow-y", `${py * 100}%`);
    gsap.to(el, {
      rotateY: (px - 0.5) * intensity * 2,
      rotateX: (0.5 - py) * intensity * 2,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 900,
    });
  };

  const onLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1, 0.4)" });
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("group relative will-change-transform [transform-style:preserve-3d]", className)}
    >
      {/* cursor-tracked glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(124,58,237,0.18), transparent 65%)",
        }}
      />
      {children}
    </div>
  );
}
