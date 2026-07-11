import { useEffect, useRef, useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MapPin, Phone, Send } from "lucide-react";
import { gsap, revealOnScroll } from "@/animations/gsap";
import { Aurora } from "@/components/effects/Aurora";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PROFILE, SOCIALS } from "@/data/content";

type SubmitState = "idle" | "sending" | "sent";

export function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<SubmitState>("idle");

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      revealOnScroll("[data-contact-item]", el);
    }, el);
    return () => ctx.revert();
  }, []);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio inquiry from ${data.get("name")}`);
    const body = encodeURIComponent(`${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`);

    setState("sending");
    // ponytail: no backend — the form hands off to a mailto: draft.
    // Swap for a POST to Formspree/Resend when a real endpoint exists.
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setState("sent");
      form.reset();
      setTimeout(() => setState("idle"), 4000);
    }, 800);
  };

  const inputClasses =
    "w-full rounded-xl border border-line bg-white/[0.04] px-4 py-3.5 text-sm text-ink placeholder:text-faint transition-all duration-300 focus:border-primary/60 focus:bg-white/[0.06] focus:outline-none focus:ring-2 focus:ring-primary/25";

  return (
    <section id="contact" ref={rootRef} className="relative overflow-hidden py-28 md:py-40">
      <Aurora className="opacity-60" />
      <div className="container-site relative z-10">
        <SectionHeading
          eyebrow="contact"
          title="Let's build something that lasts."
          description="Have a system that needs to scale, a product that needs shipping, or a database that needs saving? I'm one message away."
          align="center"
        />

        <div className="mx-auto mt-16 grid max-w-4xl gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,4fr)]">
          {/* direct channels */}
          <div className="flex flex-col justify-center gap-6">
            <a
              data-contact-item
              href={`mailto:${PROFILE.email}`}
              className="glass group rounded-2xl p-5 transition-all duration-300 hover:border-primary/40 hover:bg-white/[0.08]"
            >
              <p className="font-code text-xs text-faint uppercase tracking-widest">Email</p>
              <p className="mt-1 font-display font-semibold group-hover:text-gradient-accent transition-colors">
                {PROFILE.email}
              </p>
            </a>
            <div data-contact-item className="flex gap-4">
              <div className="glass flex-1 rounded-2xl p-5">
                <p className="flex items-center gap-1.5 font-code text-xs text-faint uppercase tracking-widest">
                  <Phone size={11} /> Phone
                </p>
                <p className="mt-1 text-sm font-medium">{PROFILE.phone}</p>
              </div>
              <div className="glass flex-1 rounded-2xl p-5">
                <p className="flex items-center gap-1.5 font-code text-xs text-faint uppercase tracking-widest">
                  <MapPin size={11} /> Base
                </p>
                <p className="mt-1 text-sm font-medium">{PROFILE.location}</p>
              </div>
            </div>
            <div data-contact-item className="flex gap-3">
              {SOCIALS.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="glass flex size-12 items-center justify-center rounded-full text-muted transition-all duration-300 hover:-translate-y-1 hover:text-ink hover:shadow-[0_8px_24px_rgba(124,58,237,0.35)]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* form */}
          <form data-contact-item onSubmit={onSubmit} className="glass rounded-3xl p-7 md:p-9">
            <div className="grid gap-5">
              <div>
                <label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Name
                </label>
                <input id="name" name="name" required placeholder="Your name" className={inputClasses} autoComplete="name" />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  className={inputClasses}
                  autoComplete="email"
                />
              </div>
              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the system you want to build…"
                  className={`${inputClasses} resize-none`}
                />
              </div>
              <MagneticButton type="submit" className="w-full">
                {state === "sending" && <Loader2 size={16} className="animate-spin" />}
                {state === "sent" && <CheckCircle2 size={16} className="text-success" />}
                {state === "idle" && <Send size={15} />}
                {state === "sent" ? "Draft opened — send it!" : state === "sending" ? "Opening…" : "Send Message"}
              </MagneticButton>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
