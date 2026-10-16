import type { Metadata } from "next";
import { Check } from "lucide-react";
import SolutionVisual from "@/components/Visuals";
import { PageHero, Reveal } from "@/components/ui";
import { ContactCTA } from "@/components/sections";
import ProcessTimeline from "@/components/ProcessTimeline";
import { solutions } from "@/content/site";

export const metadata: Metadata = {
  title: "Solutions",
  description: "Agentic AI, AI cybersecurity, custom SaaS, LLM engineering, Web3, and MLOps — engineered by BodhixAI.",
  alternates: { canonical: "/solutions" },
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero eyebrow="Solutions" title="What we build." subtitle="Powerful technology, thoughtfully engineered — from intelligent agents to the secure infrastructure they run on." />
      <div className="container-page space-y-6 pb-28">
        {solutions.map((s, i) => (
          <Reveal key={s.slug} as="article">
            <div id={s.slug} className={`card scroll-mt-28 grid items-center gap-10 overflow-hidden p-8 md:p-12 lg:grid-cols-2 ${i % 2 ? "bg-mist" : ""}`}>
              <div className={i % 2 ? "lg:order-2" : ""}>
                <p className="font-mono text-[13px] text-accent">0{i + 1}</p>
                <h2 className="text-display mt-3 !text-[clamp(2rem,3.6vw,3.25rem)]">{s.title}</h2>
                <p className="text-lead mt-5 text-muted">{s.description}</p>
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {s.capabilities.map((c) => (
                    <li key={c} className="flex items-start gap-2.5"><Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />{c}</li>
                  ))}
                </ul>
              </div>
              <div className="h-64 md:h-80"><SolutionVisual kind={s.visual} /></div>
            </div>
          </Reveal>
        ))}
      </div>
      <ProcessTimeline />
      <ContactCTA />
    </>
  );
}
