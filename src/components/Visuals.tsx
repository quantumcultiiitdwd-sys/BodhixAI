"use client";

import { motion } from "motion/react";
import type { VisualKind } from "@/content/site";

// Original, lightweight SVG illustrations. Animation is transform/opacity/dash only.

const C = { accent: "#8B5CF6", electric: "#A78BFA", violet: "#D8B4FE", danger: "#FF5A5F" };

function Node({ x, y, r = 6, fill = C.accent, pulse = false }: { x: number; y: number; r?: number; fill?: string; pulse?: boolean }) {
  return (
    <g>
      {pulse && <circle className="pulse-ring" cx={x} cy={y} r={r + 4} fill={fill} opacity={0.25} />}
      <circle cx={x} cy={y} r={r} fill={fill} />
    </g>
  );
}

function Workflow({ dark }: { dark?: boolean }) {
  const stroke = dark ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.14)";
  const box = dark ? "#1a1427" : "#fff";
  const steps = [
    { x: 30, y: 90, label: "Goal" },
    { x: 130, y: 40, label: "Plan" },
    { x: 130, y: 140, label: "Retrieve" },
    { x: 230, y: 90, label: "Act" },
    { x: 320, y: 90, label: "Verify" },
  ];
  const edges = [[0, 1], [0, 2], [1, 3], [2, 3], [3, 4]];
  return (
    <svg viewBox="0 0 380 180" className="h-full w-full" aria-hidden>
      {edges.map(([a, b], i) => (
        <path key={i} className="flow-line" d={`M${steps[a].x + 40} ${steps[a].y} C ${steps[a].x + 70} ${steps[a].y}, ${steps[b].x - 30} ${steps[b].y}, ${steps[b].x} ${steps[b].y}`} stroke={C.accent} strokeOpacity={0.55} strokeWidth={1.5} fill="none" />
      ))}
      {steps.map((s, i) => (
        <motion.g key={s.label} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 * i, duration: 0.5 }}>
          <rect x={s.x} y={s.y - 15} width={40 + (s.label.length > 5 ? 20 : 0)} height={30} rx={10} fill={box} stroke={stroke} />
          <circle cx={s.x + 10} cy={s.y} r={3} fill={i === 4 ? C.violet : C.accent} />
          <text x={s.x + 17} y={s.y + 4} fontSize={10} fill={dark ? "#fff" : "#111"} fontFamily="inherit">{s.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

const graphNodes = [
  [60, 50], [140, 30], [220, 60], [300, 40], [90, 120], [180, 110], [260, 130], [330, 110], [150, 165], [240, 175],
];
const graphEdges = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 2], [5, 6], [6, 7], [3, 7], [4, 8], [8, 5], [8, 9], [9, 6], [1, 5]];

export function NetworkGraph({ dark, suspicious = 5, highlightEdges = true }: { dark?: boolean; suspicious?: number | null; highlightEdges?: boolean }) {
  const stroke = dark ? "rgba(255,255,255,.16)" : "rgba(255,255,255,.12)";
  return (
    <svg viewBox="0 0 380 200" className="h-full w-full" aria-hidden>
      {graphEdges.map(([a, b], i) => {
        const hot = highlightEdges && suspicious !== null && (a === suspicious || b === suspicious);
        return <line key={i} x1={graphNodes[a][0]} y1={graphNodes[a][1]} x2={graphNodes[b][0]} y2={graphNodes[b][1]} stroke={hot ? C.danger : stroke} strokeOpacity={hot ? 0.7 : 1} strokeWidth={hot ? 1.6 : 1} className={hot ? "flow-line" : undefined} />;
      })}
      {graphNodes.map(([x, y], i) => (
        <Node key={i} x={x} y={y} r={i === suspicious ? 7 : 5} fill={i === suspicious ? C.danger : i % 3 === 0 ? C.violet : C.electric} pulse={i === suspicious} />
      ))}
    </svg>
  );
}

function Dashboard({ dark }: { dark?: boolean }) {
  const surface = dark ? "#1a1427" : "#fff";
  const line = dark ? "rgba(255,255,255,.1)" : "#E5E5E7";
  const bars = [40, 62, 48, 80, 66, 92, 74];
  return (
    <svg viewBox="0 0 380 200" className="h-full w-full" aria-hidden>
      <rect x={10} y={10} width={360} height={180} rx={14} fill={surface} stroke={line} />
      <rect x={10} y={10} width={80} height={180} rx={14} fill={dark ? "#120e1c" : "#F5F5F7"} />
      {[40, 62, 84, 106].map((y, i) => <rect key={y} x={24} y={y} width={i === 0 ? 50 : 40} height={8} rx={4} fill={i === 0 ? C.accent : line} />)}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={106 + i * 86} y={28} width={76} height={44} rx={10} fill="none" stroke={line} />
          <rect x={116 + i * 86} y={40} width={30} height={6} rx={3} fill={line} />
          <rect x={116 + i * 86} y={52} width={44} height={10} rx={3} fill={[C.accent, C.violet, C.electric][i]} opacity={0.85} />
        </g>
      ))}
      {bars.map((h, i) => (
        <motion.rect key={i} x={112 + i * 34} width={20} rx={5} fill={i === 5 ? C.accent : C.electric} fillOpacity={i === 5 ? 1 : 0.35}
          initial={{ height: 0, y: 176 }} whileInView={{ height: h, y: 176 - h }} viewport={{ once: true }} transition={{ delay: 0.06 * i, duration: 0.7, ease: [0.22, 1, 0.36, 1] }} />
      ))}
    </svg>
  );
}

function Rag({ dark }: { dark?: boolean }) {
  const t = dark ? "#fff" : "#111";
  const box = dark ? "#1a1427" : "#fff";
  const stroke = dark ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.12)";
  return (
    <svg viewBox="0 0 380 200" className="h-full w-full" aria-hidden>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={20} y={36 + i * 46} width={84} height={34} rx={8} fill={box} stroke={stroke} />
          <rect x={30} y={47 + i * 46} width={50} height={5} rx={2} fill={stroke} />
          <rect x={30} y={56 + i * 46} width={34} height={5} rx={2} fill={i === 1 ? C.accent : stroke} />
          <path className="flow-line" d={`M104 ${53 + i * 46} C 140 ${53 + i * 46}, 140 100, 170 100`} stroke={C.accent} strokeOpacity={0.5} fill="none" />
        </g>
      ))}
      <circle cx={200} cy={100} r={30} fill="none" stroke={C.violet} strokeOpacity={0.5} />
      <motion.circle cx={200} cy={100} r={18} fill={C.violet} animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2.4, repeat: Infinity }} style={{ transformOrigin: "200px 100px" }} />
      <text x={200} y={104} textAnchor="middle" fontSize={10} fill="#fff">LLM</text>
      <path className="flow-line" d="M230 100 L 262 100" stroke={C.accent} strokeOpacity={0.6} fill="none" />
      <rect x={262} y={64} width={100} height={72} rx={12} fill={box} stroke={stroke} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x={274} y={78 + i * 12} width={i === 3 ? 44 : 76} height={5} rx={2} fill={i === 0 ? C.accent : stroke} />)}
      <text x={274} y={128} fontSize={8} fill={t} opacity={0.5}>grounded · cited</text>
    </svg>
  );
}

function Chain({ dark }: { dark?: boolean }) {
  const box = dark ? "#1a1427" : "#fff";
  const stroke = dark ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.12)";
  return (
    <svg viewBox="0 0 380 200" className="h-full w-full" aria-hidden>
      {[0, 1, 2, 3].map((i) => (
        <motion.g key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
          {i > 0 && <line x1={i * 88 - 10} y1={100} x2={i * 88 + 14} y2={100} stroke={C.accent} strokeOpacity={0.5} className="flow-line" />}
          <rect x={14 + i * 88} y={66} width={66} height={68} rx={12} fill={box} stroke={i === 3 ? C.accent : stroke} />
          <rect x={26 + i * 88} y={80} width={28} height={5} rx={2} fill={C.violet} opacity={0.7} />
          <rect x={26 + i * 88} y={92} width={42} height={5} rx={2} fill={stroke} />
          <rect x={26 + i * 88} y={104} width={36} height={5} rx={2} fill={stroke} />
          <text x={26 + i * 88} y={124} fontSize={8} fill={dark ? "#fff" : "#111"} opacity={0.45}>#{1024 + i}</text>
        </motion.g>
      ))}
    </svg>
  );
}

function Infra({ dark }: { dark?: boolean }) {
  const stroke = dark ? "rgba(255,255,255,.18)" : "rgba(255,255,255,.12)";
  const box = dark ? "#1a1427" : "#fff";
  const edge = [[40, 150], [120, 160], [200, 150], [280, 160], [340, 145]];
  return (
    <svg viewBox="0 0 380 200" className="h-full w-full" aria-hidden>
      <rect x={140} y={22} width={100} height={40} rx={12} fill={box} stroke={C.accent} strokeOpacity={0.6} />
      <text x={190} y={46} textAnchor="middle" fontSize={10} fill={dark ? "#fff" : "#111"}>Model serving</text>
      {[90, 190, 290].map((x) => (
        <g key={x}>
          <line x1={190} y1={62} x2={x} y2={90} stroke={stroke} />
          <rect x={x - 32} y={90} width={64} height={28} rx={8} fill={box} stroke={stroke} />
          <circle cx={x - 18} cy={104} r={3} fill={C.electric} />
          <rect x={x - 10} y={101} width={30} height={5} rx={2} fill={stroke} />
        </g>
      ))}
      {edge.map(([x, y], i) => (
        <g key={i}>
          <line x1={[90, 90, 190, 290, 290][i]} y1={118} x2={x} y2={y} stroke={C.accent} strokeOpacity={0.35} className="flow-line" />
          <Node x={x} y={y} r={5} fill={i % 2 ? C.violet : C.electric} />
        </g>
      ))}
    </svg>
  );
}

export default function SolutionVisual({ kind, dark = true }: { kind: VisualKind; dark?: boolean }) {
  switch (kind) {
    case "workflow": return <Workflow dark={dark} />;
    case "threat": return <NetworkGraph dark={dark} />;
    case "dashboard": return <Dashboard dark={dark} />;
    case "rag": return <Rag dark={dark} />;
    case "chain": return <Chain dark={dark} />;
    case "infra": return <Infra dark={dark} />;
  }
}
