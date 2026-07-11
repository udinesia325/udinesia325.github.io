import { cn } from "@/lib/utils";

/** Ambient animated gradient blobs — pure CSS, GPU-composited. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="animate-aurora absolute -top-1/3 -left-1/4 h-[70vmax] w-[70vmax] rounded-full bg-primary/25 blur-[120px]" />
      <div
        className="animate-aurora absolute -right-1/4 top-1/4 h-[55vmax] w-[55vmax] rounded-full bg-secondary/15 blur-[130px]"
        style={{ animationDelay: "-6s", animationDuration: "22s" }}
      />
      <div
        className="animate-aurora absolute -bottom-1/3 left-1/4 h-[50vmax] w-[50vmax] rounded-full bg-highlight/12 blur-[140px]"
        style={{ animationDelay: "-12s", animationDuration: "26s" }}
      />
    </div>
  );
}
