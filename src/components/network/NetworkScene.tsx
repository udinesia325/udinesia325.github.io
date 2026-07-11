import { useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ARCH_NODES, ARCH_EDGES } from "./architecture";

// edge palette: dim base -> bright travelling pulse
const BASE = new THREE.Color("#4c4f9e"); // dim indigo
const BASE_LIT = new THREE.Color("#6d70c9"); // hovered edge base
const PULSE = new THREE.Color("#c7b8ff"); // bright violet pulse head

// points per edge polyline — enough for a smooth gradient pulse
const SEG = 20;

// Bounding box the whole scene must stay inside (world units). Node drift is
// clamped to this minus a margin (plus parallax headroom) so nothing crosses
// the border or overlaps the headline.
const PARALLAX_X = 0.22;
const PARALLAX_Y = 0.16;
const BOUND_X = 3.4 - PARALLAX_X;
const BOUND_Y = 3.4 - PARALLAX_Y;

type Edge = { a: number; b: number; phase: number; rate: number };

/**
 * Living software-architecture visualization — 2D by design.
 *
 * - No 3D rotation. Nodes drift irregularly in the XY plane only; the group gets
 *   a tiny translational cursor parallax (never rotation). Each node is clamped
 *   to a bounding box so it can't cross the border.
 * - Nodes are real Lucide icons via drei <Html transform> with a SOLID (opaque)
 *   background, rendered on top; the connectors sit behind them (lower z / drawn
 *   first) so lines meet under each chip and read as firmly connected — no need
 *   to inset the line endpoints.
 * - Connectors are thicker gradient lines (drei/meshline). A bright pulse travels
 *   along each connector from one icon to the next, standing in for the old dot
 *   packets. Colour is recomputed per frame per vertex (12 short polylines — cheap).
 * - `active` gates all motion (viewport-paused + reduced-motion aware from parent).
 */
export function NetworkScene({ active }: { active: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const [hovered, setHovered] = useState<number | null>(null);

  const basePos = useMemo(() => ARCH_NODES.map((n) => new THREE.Vector3(...n.pos)), []);
  const livePos = useMemo(() => basePos.map((v) => v.clone()), [basePos]);

  const edges = useMemo<Edge[]>(() => {
    const idx = new Map(ARCH_NODES.map((n, i) => [n.id, i]));
    return ARCH_EDGES.map(([a, b], i) => ({
      a: idx.get(a)!,
      b: idx.get(b)!,
      phase: (i * 0.37) % 1,
      rate: 0.28 + (i % 4) * 0.05,
    }));
  }, []);

  // one owned THREE.Line per edge, each backed by a BufferGeometry with SEG+1
  // points (1:1 position + color). Two Line objects share the geometry: a wide
  // dim glow + a bright core -> perceived thicker connector (GPU lineWidth is
  // unreliable). Straight initially; mutated each frame for drift + pulse.
  const { edgeGeoms, glowLines, coreLines } = useMemo(() => {
    const geoms: THREE.BufferGeometry[] = [];
    const glow: THREE.Line[] = [];
    const core: THREE.Line[] = [];
    edges.forEach((e) => {
      const a = basePos[e.a];
      const b = basePos[e.b];
      const positions = new Float32Array((SEG + 1) * 3);
      const colors = new Float32Array((SEG + 1) * 3);
      for (let s = 0; s <= SEG; s++) {
        const p = new THREE.Vector3().lerpVectors(a, b, s / SEG);
        positions.set([p.x, p.y, p.z], s * 3);
        colors.set([BASE.r, BASE.g, BASE.b], s * 3);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      const mat = (opacity: number) =>
        new THREE.LineBasicMaterial({
          vertexColors: true,
          transparent: true,
          opacity,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
      geoms.push(g);
      glow.push(new THREE.Line(g, mat(0.35)));
      core.push(new THREE.Line(g, mat(0.95)));
    });
    return { edgeGeoms: geoms, glowLines: glow, coreLines: core };
  }, [edges, basePos]);

  const _c = useMemo(() => new THREE.Color(), []);

  useFrame((_, raw) => {
    const group = groupRef.current;
    if (!group) return;
    const delta = Math.min(raw, 1 / 30);

    if (active) {
      // translational parallax only — no rotation
      group.position.x += (pointer.x * PARALLAX_X - group.position.x) * 0.04;
      group.position.y += (pointer.y * PARALLAX_Y - group.position.y) * 0.04;
    }

    edges.forEach((e, i) => {
      const a = livePos[e.a];
      const b = livePos[e.b];
      const lit = hovered !== null && (e.a === hovered || e.b === hovered);
      const base = lit ? BASE_LIT : BASE;

      if (active) {
        e.phase += e.rate * delta;
        if (e.phase >= 1) e.phase -= 1;
      }
      // pulse position eased slow->fast->slow along the edge
      const u = e.phase;
      const head = u * u * (3 - 2 * u);

      const g = edgeGeoms[i];
      const pos = g.getAttribute("position") as THREE.BufferAttribute;
      const col = g.getAttribute("color") as THREE.BufferAttribute;
      for (let s = 0; s <= SEG; s++) {
        const f = s / SEG;
        pos.setXYZ(
          s,
          a.x + (b.x - a.x) * f,
          a.y + (b.y - a.y) * f,
          a.z + (b.z - a.z) * f,
        );
        // bright gaussian pulse around `head`, riding on the dim base colour
        const dist = f - head;
        const glow = Math.exp(-(dist * dist) / 0.006);
        _c.copy(base).lerp(PULSE, Math.min(1, glow * (lit ? 1.3 : 1.1)));
        col.setXYZ(s, _c.r, _c.g, _c.b);
      }
      pos.needsUpdate = true;
      col.needsUpdate = true;
    });
  });

  return (
    <group ref={groupRef}>
      {/* connectors first = drawn behind the opaque icon chips */}
      {glowLines.map((ln, i) => (
        <primitive key={`g${i}`} object={ln} />
      ))}
      {coreLines.map((ln, i) => (
        <primitive key={`c${i}`} object={ln} />
      ))}

      {/* icon nodes — opaque, rendered on top */}
      {ARCH_NODES.map((n, i) => (
        <IconNode
          key={n.id}
          node={n}
          index={i}
          active={active}
          hovered={hovered === i}
          live={livePos[i]}
          onHover={() => setHovered(i)}
          onLeave={() => setHovered((h) => (h === i ? null : h))}
        />
      ))}
    </group>
  );
}

function IconNode({
  node,
  index,
  active,
  hovered,
  live,
  onHover,
  onLeave,
}: {
  node: (typeof ARCH_NODES)[number];
  index: number;
  active: boolean;
  hovered: boolean;
  live: THREE.Vector3;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const Icon = node.icon;
  const [bx, by, bz] = node.pos;

  // irregular 2D drift, clamped inside the bounding box
  useFrame(() => {
    const g = ref.current;
    if (!g) return;
    if (!active) {
      live.set(bx, by, bz);
      return;
    }
    const t = performance.now() * 0.001;
    const ph = index * 1.7;
    const amp = 0.14;
    let dx = (Math.sin(t * 0.5 + ph) + 0.4 * Math.cos(t * 0.83 + ph)) * amp;
    let dy = (Math.cos(t * 0.43 + ph) + 0.4 * Math.sin(t * 0.71 + ph)) * amp;
    const half = (0.5 * 44 * node.scale) / 8 / 2 + 0.15;
    dx = clampDrift(bx, dx, BOUND_X - half);
    dy = clampDrift(by, dy, BOUND_Y - half);
    g.position.set(dx, dy, 0);
    live.set(bx + dx, by + dy, bz);
  });

  return (
    <group position={node.pos}>
      <group ref={ref}>
        <Html center transform distanceFactor={8} zIndexRange={[20, 10]} pointerEvents="auto">
          <div
            onPointerEnter={onHover}
            onPointerLeave={onLeave}
            className="net-node"
            data-hub={node.hub ? "1" : "0"}
            data-hovered={hovered ? "1" : "0"}
            style={{ ["--s" as string]: node.scale }}
          >
            <Icon strokeWidth={1.6} />
          </div>
        </Html>
      </group>
    </group>
  );
}

/** Clamp a drift delta so base+delta stays within [-limit, limit]. */
function clampDrift(base: number, delta: number, limit: number): number {
  const lo = -limit - base;
  const hi = limit - base;
  return Math.min(hi, Math.max(lo, delta));
}
