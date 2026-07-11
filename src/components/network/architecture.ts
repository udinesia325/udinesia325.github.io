import {
  Globe,
  Cloud,
  Server,
  Workflow,
  Database,
  Boxes,
  GitBranch,
  Terminal,
  Cpu,
  type LucideIcon,
} from "lucide-react";

/**
 * Hand-authored production architecture — NOT procedurally generated.
 *
 * Positions are placed deliberately to read as tiers of a real system, with
 * intentional hierarchy and uneven spacing:
 *
 *        Globe (client)
 *           │
 *         Cloud (CDN/edge) ──── GitBranch (CI)
 *           │                        │
 *         Server (API) ──────────── Workflow (queue)
 *         ╱     │      ╲               │
 *   Terminal  Boxes   Cpu           (feeds)
 *              │                       │
 *           Database ──────────────── (writes)
 *
 * Coordinates are in a ~[-3.5, 3.5] world box centred on origin. `tier` only
 * documents intent; `scale` sets visual hierarchy (hubs are larger).
 */

export type ArchNode = {
  id: string;
  label: string;
  icon: LucideIcon;
  /** world position [x, y, z] */
  pos: [number, number, number];
  /** relative icon size; hubs > leaves */
  scale: number;
  /** true = core hub (violet), false = supporting service (indigo) */
  hub: boolean;
};

export const ARCH_NODES: ArchNode[] = [
  { id: "client", label: "Client", icon: Globe, pos: [0.6, 3.0, 0.4], scale: 0.9, hub: false },
  { id: "edge", label: "Edge / CDN", icon: Cloud, pos: [-0.4, 1.7, -0.6], scale: 1.0, hub: false },
  { id: "ci", label: "CI / CD", icon: GitBranch, pos: [2.6, 2.0, -0.3], scale: 0.85, hub: false },
  { id: "api", label: "API Gateway", icon: Server, pos: [0.2, 0.3, 0.3], scale: 1.25, hub: true },
  { id: "queue", label: "Event Bus", icon: Workflow, pos: [2.9, 0.0, -0.5], scale: 0.95, hub: false },
  { id: "worker", label: "Workers", icon: Cpu, pos: [1.7, -1.3, 0.6], scale: 0.9, hub: false },
  { id: "svc", label: "Services", icon: Boxes, pos: [-1.9, -0.6, -0.2], scale: 0.9, hub: false },
  { id: "shell", label: "Runtime", icon: Terminal, pos: [-2.7, 1.0, 0.5], scale: 0.8, hub: false },
  { id: "db", label: "Database", icon: Database, pos: [-0.5, -2.4, -0.4], scale: 1.2, hub: true },
];

/** Directed-ish edges by node id — the real request/data paths of the system. */
export const ARCH_EDGES: [string, string][] = [
  ["client", "edge"],
  ["edge", "api"],
  ["edge", "ci"],
  ["ci", "queue"],
  ["api", "queue"],
  ["api", "worker"],
  ["api", "svc"],
  ["api", "db"],
  ["queue", "worker"],
  ["worker", "db"],
  ["svc", "db"],
  ["svc", "shell"],
];
