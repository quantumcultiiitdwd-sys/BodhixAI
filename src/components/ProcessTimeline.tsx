"use client";

import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { processSteps } from "@/content/site";
import { SectionHeading } from "./ui";

export default function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 45%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(processSteps.length - 1, Math.floor(v * processSteps.length))));

  return (
    <section className="section bg-mist" aria-labelledby="process-title">
      <div className="container-page">
        <div id="process-title"><SectionHeading title="From possibility to production." /></div>

        <div ref={ref} className="relative mt-20">
          {/* Desktop: horizontal connector */}
          <div aria-hidden className="absolute top-[7px] right-0 left-0 hidden h-px bg-line md:block">
            <motion.div className="h-full origin-left bg-accent" style={{ scaleX: progress }} />
          </div>
          {/* Mobile: vertical connector */}
          <div aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-line md:hidden">
            <motion.div className="w-full origin-top bg-accent" style={{ scaleY: progress, height: "100%" }} />
          </div>

          <ol className="grid gap-12 md:grid-cols-4 md:gap-8">
            {processSteps.map((s, i) => {
              const on = i <= active;
              return (
                <li key={s.n} className="relative pl-10 md:pl-0 md:pt-12" aria-current={i === active ? "step" : undefined}>
                  <motion.span
                    aria-hidden
                    className="absolute top-0 left-0 block size-[15px] rounded-full border-2"
                    animate={{ backgroundColor: on ? "#8B5CF6" : "#110e1a", borderColor: on ? "#8B5CF6" : "#3a3048", scale: i === active ? 1.25 : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <p className={`font-mono text-[13px] transition-colors ${on ? "text-accent" : "text-muted"}`}>{s.n}</p>
                  <h3 className="text-title mt-2">{s.title}</h3>
                  <p className="mt-3 max-w-xs text-muted">{s.body}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
