import type { ProjectVisualKind } from "@/content/site";

// Conceptual product mockups, labelled as illustrative wherever shown. Pure CSS/SVG — no image weight.

function Chrome({ children, dark = true, title }: { children: React.ReactNode; dark?: boolean; title: string }) {
  return (
    <div className={`flex h-full w-full flex-col overflow-hidden rounded-[18px] ring-1 ${dark ? "bg-[#0f0b18] ring-white/10 text-white" : "bg-white ring-white/10 text-ink"} shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]`}>
      <div className={`flex items-center gap-1.5 border-b px-4 py-3 ${dark ? "border-white/8" : "border-line"}`}>
        {[0, 1, 2].map((i) => <span key={i} className={`size-2.5 rounded-full ${dark ? "bg-white/15" : "bg-white/10"}`} />)}
        <span className={`ml-3 text-[11px] ${dark ? "text-white/45" : "text-white/45"}`}>{title}</span>
      </div>
      <div className="relative min-h-0 flex-1 p-4">{children}</div>
    </div>
  );
}

const bar = (w: string, c = "bg-white/12") => <div className={`h-2 rounded-full ${c}`} style={{ width: w }} />;

function Ids() {
  const nodes = [[15, 30], [35, 15], [55, 35], [75, 20], [25, 65], [48, 60], [70, 70], [88, 50]];
  const edges = [[0, 1], [1, 2], [2, 3], [0, 4], [4, 5], [5, 2], [5, 6], [6, 7], [3, 7]];
  return (
    <Chrome title="sage-ids · network overview">
      <div className="grid h-full grid-cols-3 gap-3">
        <div className="col-span-2 rounded-xl bg-white/[0.03] ring-1 ring-white/8">
          <svg viewBox="0 0 100 85" className="h-full w-full" aria-hidden>
            {edges.map(([a, b], i) => <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={a === 5 || b === 5 ? "#FF5A5F" : "rgba(255,255,255,.18)"} strokeWidth={0.5} />)}
            {nodes.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i === 5 ? 2.6 : 1.8} fill={i === 5 ? "#FF5A5F" : "#A78BFA"} />)}
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/8">
            <p className="text-[10px] text-white/45">Risk set</p>
            <p className="mt-1 text-lg font-semibold text-[#FF5A5F]">Elevated</p>
            <div className="mt-2 h-1.5 rounded-full bg-white/10"><div className="h-full w-3/4 rounded-full bg-gradient-to-r from-[#A78BFA] to-[#FF5A5F]" /></div>
          </div>
          <div className="flex-1 space-y-2.5 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/8">
            {["68%", "90%", "52%", "80%"].map((w, i) => <div key={i}>{bar(w, i === 0 ? "bg-[#FF5A5F]/70" : "bg-white/12")}</div>)}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Orbit() {
  return (
    <Chrome title="orbit · evaluation run">
      <div className="grid h-full grid-cols-5 gap-3">
        <div className="col-span-3 space-y-2.5 rounded-xl bg-white/[0.03] p-3 ring-1 ring-white/8">
          {["Read telemetry", "Form hypothesis", "Query runbook", "Propose action", "Verify outcome"].map((s, i) => (
            <div key={s} className="flex items-center gap-2.5">
              <span className={`flex size-5 shrink-0 items-center justify-center rounded-full text-[9px] ${i < 4 ? "bg-[#A78BFA] text-white" : "bg-white/10 text-white/50"}`}>{i + 1}</span>
              <span className="text-[11px] text-white/75">{s}</span>
              <span className="ml-auto h-px flex-1 bg-white/8" />
            </div>
          ))}
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          {["Step accuracy", "Grounding", "Completion"].map((l, i) => (
            <div key={l} className="flex-1 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/8">
              <p className="text-[10px] text-white/45">{l}</p>
              <div className="mt-2 flex h-6 items-end gap-1">
                {[50, 70, 40, 85, 65].map((h, j) => <span key={j} className="w-full rounded-sm" style={{ height: `${(h + i * 7) % 100}%`, background: j === 3 ? "#D8B4FE" : "rgba(255,255,255,.15)" }} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

function Crowdfund() {
  return (
    <Chrome title="crowdfunding nexus · campaign">
      <div className="grid h-full grid-cols-3 gap-3">
        <div className="col-span-2 rounded-xl bg-white/[0.04] p-3">
          <p className="text-[10px] text-white/45">Funds raised (illustrative)</p>
          <svg viewBox="0 0 100 50" className="mt-1 h-[75%] w-full" preserveAspectRatio="none" aria-hidden>
            <path d="M0 45 L15 40 L30 36 L45 30 L60 24 L75 15 L100 8 L100 50 L0 50Z" fill="#8B5CF6" fillOpacity={0.12} />
            <path d="M0 45 L15 40 L30 36 L45 30 L60 24 L75 15 L100 8" fill="none" stroke="#8B5CF6" strokeWidth={1} />
          </svg>
        </div>
        <div className="space-y-2 rounded-xl bg-white/[0.04] p-3">
          <p className="text-[10px] text-white/45">On-chain activity</p>
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.06] p-1.5">
              <span className="size-4 rounded-full bg-gradient-to-br from-[#A78BFA] to-[#D8B4FE]" />
              <span className="h-1.5 flex-1 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

function Nft() {
  const hues = ["from-[#A78BFA] to-[#D8B4FE]", "from-[#D8B4FE] to-[#FF7AB6]", "from-[#8B5CF6] to-[#F0ABFC]", "from-[#111] to-[#A78BFA]", "from-[#FFB36B] to-[#D8B4FE]", "from-[#F0ABFC] to-[#8B5CF6]"];
  return (
    <Chrome title="nft marketspace · discover">
      <div className="grid h-full grid-cols-3 gap-3">
        {hues.map((h, i) => (
          <div key={i} className="flex flex-col rounded-xl bg-white/[0.04] p-2">
            <div className={`flex-1 rounded-lg bg-gradient-to-br ${h}`} />
            <div className="mt-2 flex items-center justify-between">
              <span className="h-1.5 w-1/2 rounded-full bg-white/10" />
              <span className="text-[9px] font-medium text-white/60">#{(i + 1) * 17}</span>
            </div>
          </div>
        ))}
      </div>
    </Chrome>
  );
}

function Federated() {
  const edge = [[12, 20], [12, 50], [12, 80], [88, 20], [88, 50], [88, 80]];
  return (
    <Chrome title="federated · training round">
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
        {edge.map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2={50} y2={50} stroke="#A78BFA" strokeOpacity={0.4} strokeWidth={0.5} className="flow-line" />
            <rect x={x - 7} y={y - 5} width={14} height={10} rx={2} fill="#1a1427" stroke="rgba(255,255,255,.15)" strokeWidth={0.4} />
            <circle cx={x - 3} cy={y} r={1.2} fill={i % 2 ? "#D8B4FE" : "#A78BFA"} />
          </g>
        ))}
        <circle cx={50} cy={50} r={13} fill="none" stroke="#D8B4FE" strokeOpacity={0.5} strokeWidth={0.5} />
        <circle cx={50} cy={50} r={8} fill="#D8B4FE" />
        <text x={50} y={52} fontSize={3.4} textAnchor="middle" fill="#fff">aggregate</text>
      </svg>
    </Chrome>
  );
}

function Property() {
  return (
    <Chrome title="dreamhome · listings">
      <div className="flex h-full gap-3">
        <div className="w-1/4 space-y-2.5 rounded-xl bg-white/[0.04] p-3">
          <p className="text-[10px] text-white/45">Filters</p>
          {["80%", "60%", "70%", "50%"].map((w, i) => <div key={i} className="h-2 rounded-full bg-white/10" style={{ width: w }} />)}
          <div className="h-5 rounded-md bg-accent/90" />
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3">
          {["from-[#3b2470] to-[#1a1230]", "from-[#4a1d6e] to-[#1d1230]", "from-[#2e1a5c] to-[#140f24]", "from-[#2a2040] to-[#120e1c]"].map((g, i) => (
            <div key={i} className="flex flex-col rounded-xl bg-white/[0.04] p-2">
              <div className={`relative flex-1 rounded-lg bg-gradient-to-br ${g}`}>
                <svg viewBox="0 0 40 24" className="absolute inset-0 m-auto h-1/2" aria-hidden><path d="M6 22 V11 L20 3 L34 11 V22 Z" fill="none" stroke="#8B5CF6" strokeOpacity={0.5} strokeWidth={1.4} /></svg>
              </div>
              <div className="mt-2 h-1.5 w-2/3 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

export default function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  const map = { ids: Ids, orbit: Orbit, crowdfund: Crowdfund, nft: Nft, federated: Federated, property: Property };
  const V = map[kind];
  return <V />;
}

export const projectBackdrop: Record<ProjectVisualKind, string> = {
  ids: "bg-[radial-gradient(120%_90%_at_70%_0%,#1a2c55_0%,#08090D_60%)]",
  orbit: "bg-[radial-gradient(120%_90%_at_30%_0%,#2a2357_0%,#08090D_60%)]",
  crowdfund: "bg-[radial-gradient(120%_90%_at_70%_10%,#2c1858_0%,#07060B_62%)]",
  nft: "bg-[radial-gradient(120%_90%_at_30%_10%,#2c1858_0%,#07060B_62%)]",
  federated: "bg-[radial-gradient(120%_90%_at_50%_0%,#1b2a4a_0%,#08090D_60%)]",
  property: "bg-[radial-gradient(120%_90%_at_70%_10%,#2c1858_0%,#07060B_62%)]",
};
