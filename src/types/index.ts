import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";

/** Any icon rendered as <Icon size={n} /> — Lucide or our brand SVGs. */
export type IconComponent = ComponentType<{ size?: number; className?: string }>;

export interface NavLink {
  label: string;
  href: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface TechItem {
  name: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  /** bento grid span */
  size: "lg" | "wide" | "md" | "sm";
}

export interface Project {
  id: number;
  title: string;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  year: string;
  highlight: string;
}

export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  summary: string;
  achievements: string[];
  stack: string[];
}

export interface SkillGroup {
  title: string;
  icon: LucideIcon;
  accent: string;
  /** what this group has actually shipped */
  proof: string;
  skills: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  year: string;
  image: string;
}

export interface Principle {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconComponent;
}
