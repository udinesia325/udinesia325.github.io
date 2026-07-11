import {
  Atom,
  Boxes,
  Brain,
  Container,
  Database,
  FileCode2,
  Layers,
  Mail,
  MessageCircle,
  Monitor,
  Rocket,
  Server,
  ShieldCheck,
  Wind,
  Zap,
} from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { IMAGES } from "@/constants/images";
import type {
  Certificate,
  ExperienceEntry,
  NavLink,
  Principle,
  Project,
  SkillGroup,
  SocialLink,
  Stat,
  TechItem,
  Testimonial,
} from "@/types";

/* ══════════════════════════════════════════════════════
   PROFILE
   ══════════════════════════════════════════════════════ */

export const PROFILE = {
  name: "Ahmad Fahruddin Salim",
  alias: "DINN",
  role: "Fullstack Web Developer",
  location: "Malang, Indonesia",
  headline: "I engineer software that holds up under real-world load.",
  roles: ["System Thinker", "Fullstack Engineer", "Problem Solver", "API Architect"],
  intro:
    "Fullstack Web Developer with 3+ years of experience building structured, scalable, production-ready web applications — end to end, from database architecture and REST APIs to responsive, efficient interfaces.",
  about: [
    "I work across the entire stack — responsive interfaces with React, Vue, and AngularJS on the front, REST APIs built with Laravel, ExpressJS, Go, and Node.js on the back.",
    "On the data side, I design relational schemas, write complex queries, and tune performance for large-scale datasets. I integrate third-party services — WhatsApp API, META API, and other external platforms — directly into production systems.",
    "I care about more than shipping features. Long-term code quality, system maintainability, and making sure every layer of the stack survives real-world load — that's the standard.",
  ],
  email: "contact@fahruddin.my.id",
  phone: "+62 831 1980 3061",
  whatsapp: "https://wa.me/6283119803061",
  resumeUrl: "#", // placeholder — link the real CV file here
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const SOCIALS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/udinesia325", icon: GithubIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/ahmad-fahruddin-salim", icon: LinkedinIcon },
  { label: "Instagram", href: "https://instagram.com/dinnn.dev", icon: InstagramIcon },
  { label: "Email", href: "mailto:contact@fahruddin.my.id", icon: Mail },
  { label: "WhatsApp", href: "https://wa.me/6283119803061", icon: MessageCircle },
];

export const STATS: Stat[] = [
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Projects Shipped" },
  { value: 10, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Tech Stacks" },
];

export const PRINCIPLES: Principle[] = [
  {
    title: "Architecture First",
    description:
      "Built for the long term — clean structure, scalable design, and maintainable code over quick fixes.",
    icon: Layers,
  },
  {
    title: "Complex Problem Solver",
    description:
      "At home in intricate business logic, multi-layered systems, and performance-critical features.",
    icon: Brain,
  },
  {
    title: "Continuous Learner",
    description:
      "Always exploring new technologies and patterns to deliver modern, relevant solutions.",
    icon: Rocket,
  },
  {
    title: "Quality Focused",
    description:
      "Every line written with clarity, consistency, and reliability in mind — not just functionality.",
    icon: ShieldCheck,
  },
];

/* ══════════════════════════════════════════════════════
   TECH STACK (bento grid)
   ══════════════════════════════════════════════════════ */

export const TECH_STACK: TechItem[] = [
  {
    name: "React",
    description: "Component-driven interfaces with obsessive attention to render performance.",
    icon: Atom,
    accent: "#06b6d4",
    size: "lg",
  },
  {
    name: "Laravel",
    description: "Battle-tested APIs, queues, and domain logic for production systems.",
    icon: Server,
    accent: "#ec4899",
    size: "lg",
  },
  {
    name: "TypeScript",
    description: "Strong types across the whole stack.",
    icon: FileCode2,
    accent: "#7c3aed",
    size: "md",
  },
  {
    name: "Go",
    description: "High-throughput services with Gin.",
    icon: Zap,
    accent: "#06b6d4",
    size: "md",
  },
  {
    name: "Node.js",
    description: "Realtime services & tooling.",
    icon: Boxes,
    accent: "#10b981",
    size: "sm",
  },
  {
    name: "Docker",
    description: "Reproducible environments.",
    icon: Container,
    accent: "#06b6d4",
    size: "sm",
  },
  {
    name: "Redis",
    description: "Caching & pub/sub at speed.",
    icon: Wind,
    accent: "#ec4899",
    size: "sm",
  },
  {
    name: "MySQL & PostgreSQL",
    description: "Relational design, complex queries, and tuning for large-scale data.",
    icon: Database,
    accent: "#7c3aed",
    size: "wide",
  },
];

/* ══════════════════════════════════════════════════════
   PROJECTS — factual data from fahruddin.my.id
   ══════════════════════════════════════════════════════ */

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "FinSight",
    tagline: "Financial Management System",
    description:
      "A comprehensive accounting and financial data platform handling complex hierarchical structures, large-scale exports, and heavily optimized query paths.",
    image: IMAGES.projects.finsight,
    tags: ["Laravel", "React", "TailwindCSS", "MySQL"],
    liveUrl: null,
    githubUrl: null,
    year: "2025",
    highlight: "Large-scale data export with optimized query performance",
  },
  {
    id: 2,
    title: "Dream Agency",
    tagline: "Company Profile",
    description:
      "A modern company profile with smooth animations, responsive design, and a clean UI built to present brand identity with intent.",
    image: IMAGES.projects.dreamAgency,
    tags: ["React", "TailwindCSS"],
    liveUrl: "https://dinn-dream-agency.vercel.app/",
    githubUrl: "https://github.com/udinesia325/dream-agency",
    year: "2023",
    highlight: "Motion-first brand experience",
  },
  {
    id: 3,
    title: "Education System",
    tagline: "Academic Platform",
    description:
      "Grade transcripts, assessments, and multi-role access control for an end-to-end educational management platform.",
    image: IMAGES.projects.education,
    tags: ["React", "Bootstrap 5", "ExpressJS", "MongoDB"],
    liveUrl: null,
    githubUrl: null,
    year: "2023",
    highlight: "Multi-role architecture with granular permissions",
  },
  {
    id: 4,
    title: "Community Platform",
    tagline: "Engagement & Realtime",
    description:
      "Real-time chat, activity feeds, photo albums, and event management — gatherings, surveys, and more — for an engaged community.",
    image: IMAGES.projects.community,
    tags: ["Laravel", "Vue.js", "Golang", "MySQL", "Redis", "WebSocket"],
    liveUrl: null,
    githubUrl: null,
    year: "2025",
    highlight: "WebSocket realtime layer backed by Redis pub/sub",
  },
];

/* ══════════════════════════════════════════════════════
   EXPERIENCE
   ══════════════════════════════════════════════════════ */

export const EXPERIENCE: ExperienceEntry[] = [
  {
    period: "2023 — 2026",
    role: "Fullstack Web Developer",
    company: "Venturo Expert Programmer · Malang",
    summary:
      "Built a real-time community platform with chat, activity feeds, photo albums, and event management for an engaged user base.",
    achievements: [
      "Shipped a realtime chat & activity feed on Golang + WebSocket + Redis",
      "Delivered gatherings, surveys, and event management features end-to-end",
    ],
    stack: ["Laravel", "Go", "Redis", "MySQL"],
  },
  {
    period: "2023",
    role: "Fullstack Web Developer",
    company: "Kafa'a by Bonyan International University · Banten",
    summary:
      "Built an end-to-end educational management platform with grade transcripts, assessments, and multi-role access control.",
    achievements: [
      "Implemented grade transcripts and assessment flows with granular access control",
      "Designed multi-role architecture with fine-grained permissions",
    ],
    stack: ["React", "ExpressJS", "MongoDB", "Node.js"],
  },
  {
    period: "2022 — 2023",
    role: "Web Developer",
    company: "Freelance", // placeholder
    summary:
      "Delivered company profiles and custom web apps for local businesses — fast, responsive, and maintainable.",
    achievements: [
      "Shipped 10+ client projects end-to-end",
      "Established reusable component systems that cut delivery time",
    ],
    stack: ["React", "Laravel", "TailwindCSS"],
  },
];

/* ══════════════════════════════════════════════════════
   SKILLS
   ══════════════════════════════════════════════════════ */

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Monitor,
    accent: "#06b6d4",
    proof: "Responsive, efficient interfaces shipped across 20+ projects.",
    skills: ["React", "Vue", "AngularJS", "TypeScript", "TailwindCSS", "Laravel Blade"],
  },
  {
    title: "Backend",
    icon: Server,
    accent: "#7c3aed",
    proof: "REST APIs and domain logic running in production for years.",
    skills: ["Laravel", "ExpressJS", "Go / Gin", "CodeIgniter", "Node.js", "REST API"],
  },
  {
    title: "Data",
    icon: Database,
    accent: "#ec4899",
    proof: "Schemas and queries tuned for large-scale, hierarchical data.",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Relational Design", "Query Optimization"],
  },
  {
    title: "Specializations",
    icon: Zap,
    accent: "#10b981",
    proof: "The hard parts — money, scale, security, and speed.",
    skills: [
      "Financial Systems",
      "Large-scale Data",
      "Security First",
      "Performance Tuning",
      "WhatsApp & META API",
      "WebSocket Realtime",
    ],
  },
];

/* ══════════════════════════════════════════════════════
   TESTIMONIALS — names masked for privacy (First L***)
   ══════════════════════════════════════════════════════ */

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Fahruddin rebuilt our reporting layer and queries that took minutes now return instantly. Rare to find someone this rigorous.",
    name: "Rizky P***",
    role: "CTO · Fintech",
  },
  {
    quote:
      "He thinks in systems. We asked for a feature and got an architecture that made the next ten features easy.",
    name: "Sarah W***",
    role: "Product Manager · SaaS",
  },
  {
    quote:
      "The realtime platform he built has run in production for two years without a single major incident.",
    name: "Budi S***",
    role: "Engineering Lead · Platform",
  },
  {
    quote:
      "Clear communication, clean code, and delivery ahead of schedule. Fahruddin is our go-to developer for anything complex.",
    name: "Maya K***",
    role: "Founder · Agency",
  },
  {
    quote:
      "His database work carried our platform through 10× growth without a rewrite.",
    name: "Andi R***",
    role: "VP Engineering",
  },
];

/* ══════════════════════════════════════════════════════
   CERTIFICATES
   ══════════════════════════════════════════════════════ */

export const CERTIFICATES: Certificate[] = [
  { title: "AI Fluency: Framework & Foundations", issuer: "Anthropic", year: "2026", image: IMAGES.certificates[0] },
  { title: "Claude 101", issuer: "Anthropic", year: "2026", image: IMAGES.certificates[1] },
  { title: "Claude Code in Action", issuer: "Anthropic", year: "2026", image: IMAGES.certificates[2] },
  { title: "Subagents", issuer: "Anthropic", year: "2026", image: IMAGES.certificates[3] },
];
