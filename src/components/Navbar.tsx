import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap, EASE, prefersReducedMotion } from "@/animations/gsap";
import { NAV_LINKS, PROFILE, SOCIALS } from "@/data/content";
import { cn } from "@/lib/utils";

/** Floating glass pill navbar that condenses on scroll + full-screen mobile menu. */
export function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!visible || !navRef.current || prefersReducedMotion()) return;
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: EASE.out, delay: 0.3 },
    );
  }, [visible]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      gsap.to(menu, { clipPath: "circle(150% at calc(100% - 3rem) 3rem)", duration: 0.7, ease: EASE.inOut });
      gsap.fromTo(
        menu.querySelectorAll("[data-menu-link]"),
        { y: 48, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.07, delay: 0.25, ease: EASE.out },
      );
    } else {
      gsap.to(menu, { clipPath: "circle(0% at calc(100% - 3rem) 3rem)", duration: 0.5, ease: EASE.inOut });
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        ref={navRef}
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          visible ? "" : "pointer-events-none opacity-0",
          // full-width solid blur bar on scroll so logo + links + CTA stay legible
          // over any content passing beneath; transparent at the top of the page.
          // No border — a bottom border reads as a white line mid-transition; the
          // shadow alone separates the bar from content.
          scrolled && "bg-void/80 shadow-lg shadow-black/30 backdrop-blur-xl",
        )}
      >
        <nav
          className={cn(
            "container-site flex items-center justify-between transition-all duration-500",
            scrolled ? "py-3" : "py-6",
          )}
        >
          <a href="#hero" className="font-display text-xl font-bold tracking-tight" aria-label="Home">
            {PROFILE.alias}
            <span className="text-primary">.</span>
          </a>

          <div className="hidden items-center gap-1 rounded-full px-2 py-1 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted transition-colors duration-300 hover:bg-white/5 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden rounded-full border border-line bg-white/5 px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:border-primary/60 hover:bg-primary/15 hover:shadow-[0_0_24px_rgba(124,58,237,0.35)] md:inline-block"
          >
            Let's Talk
          </a>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="glass flex size-11 cursor-pointer items-center justify-center rounded-full md:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </nav>
      </header>

      {/* mobile menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-[150] flex flex-col justify-between bg-abyss/95 p-8 backdrop-blur-2xl md:hidden"
        style={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-xl font-bold">
            {PROFILE.alias}
            <span className="text-primary">.</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="glass flex size-11 cursor-pointer items-center justify-center rounded-full"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              data-menu-link
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 py-2 font-display text-4xl font-bold text-ink/90 transition-colors hover:text-primary"
            >
              <span className="font-code text-sm text-faint">0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>

        <div data-menu-link className="flex gap-3">
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="glass flex size-12 items-center justify-center rounded-full text-muted transition-colors hover:text-ink"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
