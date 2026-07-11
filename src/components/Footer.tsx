import { ArrowUp } from "lucide-react";
import { NAV_LINKS, PROFILE, SOCIALS } from "@/data/content";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="container-site flex flex-col items-center gap-8 py-14 md:flex-row md:justify-between">
        <div className="text-center md:text-left">
          <p className="font-display text-xl font-bold">
            {PROFILE.alias}
            <span className="text-primary">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted">
            © {new Date().getFullYear()} {PROFILE.name}. Engineered with intent in{" "}
            {PROFILE.location.split(",")[0]}.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2" aria-label="Footer">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors duration-300 hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {SOCIALS.slice(0, 3).map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              aria-label={label}
              className="text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-ink"
            >
              <Icon size={18} />
            </a>
          ))}
          <a
            href="#hero"
            aria-label="Back to top"
            className="glass ml-2 flex size-11 items-center justify-center rounded-full text-muted transition-all duration-300 hover:-translate-y-1 hover:text-ink"
          >
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}
