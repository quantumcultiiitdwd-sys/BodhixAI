import type { Metadata } from "next";
import { PageHero, Reveal } from "@/components/ui";
import { ProjectCard } from "@/components/ProjectCarousel";
import { ContactCTA } from "@/components/sections";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected research and engineering projects — AI cybersecurity, agentic AI, embodied AI and robotics, privacy-preserving ML, Web3, and SaaS.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="Selected work." subtitle="From ambitious ideas to engineered reality." />
      <div className="container-page pb-28">
        <p className="mb-10 max-w-3xl rounded-2xl bg-mist p-5 text-[14px] text-muted">
          Every project is labelled by origin. They are founder-led research, research prototypes, independent engineering by co-founder Sathwik Narkedimilli, or robotics and embodied-AI R&D from Xyon Labs, the lab co-founded by Sithija Vihanga Ranaraja. They show the expertise BodhixAI is built on and are not presented as commercial client engagements. Visuals marked “Illustrative concept” are mockups; the others are real simulation and system screenshots.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) * 0.08}><ProjectCard project={p} /></Reveal>
          ))}
        </div>
      </div>
      <ContactCTA />
    </>
  );
}
