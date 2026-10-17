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

function Humanoid() {
  // Joint-trajectory lines for one predicted action chunk.
  const joints = [
    "M0 30 C15 28 25 18 40 20 S70 34 100 26",
    "M0 38 C20 40 30 30 50 32 S80 22 100 24",
    "M0 22 C18 24 32 34 52 30 S78 14 100 16",
    "M0 44 C22 42 38 36 58 40 S82 44 100 38",
  ];
  return (
    <Chrome title="vla policy · inference trace">
      <div className="grid h-full grid-cols-12 gap-3">
        <div className="col-span-4 flex flex-col gap-3">
          <div className="grid flex-1 grid-cols-2 gap-2">
            {["head cam", "wrist cam"].map((c, i) => (
              <div key={c} className="relative overflow-hidden rounded-lg bg-[linear-gradient(160deg,#241a3d,#110d1c)] ring-1 ring-white/8">
                <span className="absolute top-1.5 left-1.5 text-[8px] text-white/45">{c}</span>
                <span className={`absolute rounded-[3px] border border-[#D8B4FE]/80 ${i ? "top-[45%] left-[30%] h-[30%] w-[38%]" : "top-[38%] left-[42%] h-[24%] w-[26%]"}`} />
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-white/[0.04] p-2.5 ring-1 ring-white/8">
            <p className="text-[9px] text-white/45">Instruction</p>
            <p className="mt-1 text-[10px] leading-snug text-white/80">Pick up the apple and place it on the plate</p>
          </div>
        </div>
        <div className="col-span-3 flex flex-col justify-center gap-1.5 rounded-xl bg-white/[0.03] p-2.5 ring-1 ring-white/8">
          {["Vision encoder", "Language model", "Action head"].map((l, i) => (
            <div key={l} className="flex flex-col items-center">
              <div className={`w-full rounded-md px-2 py-1.5 text-center text-[9px] ${i === 2 ? "bg-[#8B5CF6]/30 text-white ring-1 ring-[#A78BFA]/60" : "bg-white/[0.06] text-white/70 ring-1 ring-white/10"}`}>{l}</div>
              {i < 2 && <span className="h-2 w-px bg-white/20" />}
            </div>
          ))}
        </div>
        <div className="col-span-5 flex flex-col rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/8">
          <div className="flex items-center justify-between">
            <p className="text-[10px] text-white/45">Action chunk · joint targets</p>
            <span className="text-[9px] text-white/35">t+0 … t+16</span>
          </div>
          <svg viewBox="0 0 100 50" className="mt-2 w-full flex-1" preserveAspectRatio="none" aria-hidden>
            {[12.5, 25, 37.5].map((y) => <line key={y} x1={0} y1={y} x2={100} y2={y} stroke="rgba(255,255,255,.06)" strokeWidth={0.4} />)}
            {joints.map((d, i) => <path key={i} d={d} fill="none" stroke={["#D8B4FE", "#A78BFA", "#8B5CF6", "rgba(255,255,255,.35)"][i]} strokeWidth={0.9} vectorEffect="non-scaling-stroke" />)}
            <line x1={40} y1={0} x2={40} y2={50} stroke="#D8B4FE" strokeOpacity={0.4} strokeWidth={0.4} strokeDasharray="1.5 1.5" />
          </svg>
          <div className="mt-2 flex gap-3 text-[8px] text-white/45">
            {[["#D8B4FE", "shoulder"], ["#A78BFA", "elbow"], ["#8B5CF6", "wrist"], ["rgba(255,255,255,.35)", "hand"]].map(([c, l]) => (
              <span key={l} className="flex items-center gap-1"><span className="h-0.5 w-2.5 rounded-full" style={{ background: c }} />{l}</span>
            ))}
          </div>
        </div>
      </div>
    </Chrome>
  );
}

function Lidar() {
  const rays = Array.from({ length: 36 }, (_, i) => (i / 36) * Math.PI * 2);
  const tracks = [[24, 26, "#D8B4FE"], [72, 22, "#A78BFA"], [70, 64, "#D8B4FE"], [30, 66, "#FF5A5F"]] as const;
  return (
    <Chrome title="lidar perception · live tracks">
      <div className="grid h-full grid-cols-3 gap-3">
        <div className="col-span-2 rounded-xl bg-white/[0.03] ring-1 ring-white/8">
          <svg viewBox="0 0 100 85" className="h-full w-full" aria-hidden>
            {rays.map((a, i) => <line key={i} x1={50} y1={44} x2={50 + Math.cos(a) * 40} y2={44 + Math.sin(a) * 36} stroke="#8B5CF6" strokeOpacity={0.14} strokeWidth={0.4} />)}
            {rays.map((a, i) => <circle key={i} cx={50 + Math.cos(a) * 38} cy={44 + Math.sin(a) * 34} r={0.7} fill="rgba(255,255,255,.45)" />)}
            {tracks.map(([x, y, c], i) => (
              <g key={i}>
                <rect x={x - 5} y={y - 5} width={10} height={10} rx={1.5} fill="none" stroke={c} strokeWidth={0.6} />
                <circle cx={x} cy={y} r={1.6} fill={c} />
              </g>
            ))}
            <circle cx={50} cy={44} r={2.2} fill="#fff" />
          </svg>
        </div>
        <div className="space-y-2 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/8">
          <p className="text-[10px] text-white/45">Tracked</p>
          {[["person", "#D8B4FE"], ["person", "#A78BFA"], ["chair", "#D8B4FE"], ["unknown", "#FF5A5F"]].map(([l, c], i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.06] p-1.5">
              <span className="size-2 rounded-full" style={{ background: c }} />
              <span className="text-[9px] text-white/70">{l}</span>
              <span className="ml-auto text-[9px] text-white/40">#{i + 3}</span>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

function Rl() {
  return (
    <Chrome title="rl training · bimanual stack">
      <div className="grid h-full grid-cols-3 gap-3">
        <div className="col-span-2 rounded-xl bg-white/[0.04] p-3">
          <p className="text-[10px] text-white/45">Episode reward (illustrative)</p>
          <svg viewBox="0 0 100 50" className="mt-1 h-[75%] w-full" preserveAspectRatio="none" aria-hidden>
            <path d="M0 46 L8 44 L16 45 L24 40 L32 41 L40 34 L48 30 L56 31 L64 22 L72 18 L80 15 L90 11 L100 10" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth={2.5} />
            <path d="M0 46 L8 44 L16 45 L24 40 L32 41 L40 34 L48 30 L56 31 L64 22 L72 18 L80 15 L90 11 L100 10" fill="none" stroke="#A78BFA" strokeWidth={1} />
          </svg>
        </div>
        <div className="flex flex-col gap-3">
          {[["Task success", "w-3/4"], ["Grasp stability", "w-5/6"], ["Collision-free", "w-11/12"]].map(([l, w]) => (
            <div key={l} className="flex-1 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/8">
              <p className="text-[10px] text-white/45">{l}</p>
              <div className="mt-2 h-1.5 rounded-full bg-white/10"><div className={`h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#D8B4FE] ${w}`} /></div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

function Language() {
  return (
    <Chrome title="language policy · instruction">
      <div className="flex h-full flex-col gap-3">
        <div className="flex items-center gap-2 rounded-xl bg-white/[0.06] p-3 ring-1 ring-white/10">
          <span className="text-[11px] text-accent">›</span>
          <span className="text-[11px] text-white/80">Sort the blue cubes into the left tray</span>
          <span className="ml-auto h-3 w-px animate-pulse bg-white/60" />
        </div>
        <div className="grid flex-1 grid-cols-3 gap-3">
          {["Ground objects", "Plan grasp", "Place & verify"].map((s, i) => (
            <div key={s} className="flex flex-col rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/8">
              <span className={`flex size-5 items-center justify-center rounded-full text-[9px] ${i < 2 ? "bg-[#A78BFA] text-white" : "bg-white/10 text-white/50"}`}>{i + 1}</span>
              <p className="mt-2 text-[10px] text-white/70">{s}</p>
              <div className="mt-auto flex gap-1.5">
                {[0, 1, 2].map((j) => <span key={j} className="size-3 rounded-[3px]" style={{ background: (i + j) % 3 === 0 ? "#8B5CF6" : "rgba(255,255,255,.12)" }} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Chrome>
  );
}

export default function ProjectVisual({ kind }: { kind: ProjectVisualKind }) {
  const map = { ids: Ids, orbit: Orbit, crowdfund: Crowdfund, nft: Nft, federated: Federated, property: Property, humanoid: Humanoid, lidar: Lidar, rl: Rl, language: Language };
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
  humanoid: "bg-[radial-gradient(120%_90%_at_30%_0%,#2a2357_0%,#08090D_60%)]",
  lidar: "bg-[radial-gradient(120%_90%_at_70%_0%,#1a2c55_0%,#08090D_60%)]",
  rl: "bg-[radial-gradient(120%_90%_at_50%_0%,#1b2a4a_0%,#08090D_60%)]",
  language: "bg-[radial-gradient(120%_90%_at_30%_10%,#2c1858_0%,#07060B_62%)]",
};
