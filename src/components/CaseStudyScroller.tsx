"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import { NetworkGraph } from "./Visuals";
import { MagneticButton } from "./ui";

const steps = [
  { title: "Normal activity", body: "Thousands of hosts talk to each other every second. Most of it is routine." },
  { title: "Something unusual", body: "One interaction doesn't fit the structure the network has shown so far." },
  { title: "Relationships emerge", body: "Looking at its neighbours reveals who else is involved — context a flow-by-flow view misses." },
  { title: "Risk, quantified", body: "Calibrated risk estimates say not just what looks wrong, but how confident to be." },
  { title: "Action, with clarity", body: "Analysts see one coherent incident instead of a flood of isolated alerts." },
];

function Stage({ step }: { step: number }) {
  if (step === 4) {
    return (
      <motion.div key="dash" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="grid h-full grid-cols-3 gap-3 p-4">
        <div className="col-span-2 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
          <p className="text-[12px] text-white/50">Incident · lateral movement (simulated)</p>
          <div className="h-[85%]"><NetworkGraph dark suspicious={5} /></div>
        </div>
        <div className="flex flex-col gap-3">
          {[["Risk", "Elevated", "text-[#FF5A5F]"], ["Confidence", "Calibrated", "text-[#A78BFA]"], ["Hosts involved", "4", "text-white"]].map(([k, v, c]) => (
            <div key={k} className="flex-1 rounded-2xl bg-white/[0.04] p-4 ring-1 ring-white/10">
              <p className="text-[12px] text-white/50">{k}</p>
              <p className={`mt-1 text-xl font-semibold ${c}`}>{v}</p>
            </div>
          ))}
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div key="graph" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="relative h-full p-6">
      <NetworkGraph dark suspicious={step >= 1 ? 5 : null} highlightEdges={step >= 2} />
      <AnimatePresence>
        {step >= 3 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="absolute right-6 bottom-6 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10 backdrop-blur">
            <p className="text-[12px] text-white/50">Risk estimate</p>
            <div className="mt-2 h-1.5 w-44 rounded-full bg-white/10">
              <motion.div initial={{ width: 0 }} animate={{ width: "76%" }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-gradient-to-r from-[#A78BFA] to-[#FF5A5F]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function CaseStudyScroller() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setStep(Math.min(steps.length - 1, Math.floor(v * steps.length))));

  return (
    <section className="bg-night text-white" aria-labelledby="case-title">
      <div className="container-page pt-28 md:pt-40">
        <p className="eyebrow text-electric mb-5">Featured innovation</p>
        <h2 id="case-title" className="text-display max-w-4xl">Security that understands the network.</h2>
        <p className="text-lead mt-6 max-w-2xl text-white/60">
          Move beyond isolated alerts with intelligent security systems that analyze network relationships, behavioral signals, and emerging threats.
        </p>
      </div>

      {/* Sticky storytelling: native sticky, no scroll hijacking. */}
      <div ref={ref} className="container-page relative lg:h-[300vh]">
        <div className="grid gap-10 py-16 lg:sticky lg:top-0 lg:h-screen lg:grid-cols-12 lg:items-center lg:py-0">
          <ol className="space-y-2 lg:col-span-5">
            {steps.map((s, i) => (
              <li key={s.title} className={`rounded-2xl p-5 transition-colors duration-300 ${i === step ? "bg-white/[0.06]" : "lg:opacity-40"}`}>
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-[12px] ${i === step ? "text-electric" : "text-white/40"}`}>0{i + 1}</span>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                </div>
                <p className="mt-2 pl-8 text-white/60">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className="lg:col-span-7">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-night-2 ring-1 ring-white/10">
              <div aria-hidden className="ambient absolute -top-1/3 left-1/4 size-2/3 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.18),transparent_65%)]" />
              <AnimatePresence mode="wait">
                <Stage step={step} />
              </AnimatePresence>
              <span className="absolute top-4 left-4 rounded-full bg-white/8 px-3 py-1 text-[11px] text-white/55">Illustrative simulation</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-page pb-28 md:pb-40">
        <MagneticButton href="/research" variant="ghost-dark">Explore Our Research</MagneticButton>
      </div>
    </section>
  );
}
