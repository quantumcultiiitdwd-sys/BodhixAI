import type { Metadata } from "next";
import { PageHero, Reveal } from "@/components/ui";
import { ProjectCard } from "@/components/ProjectCarousel";
import { ContactCTA } from "@/components/sections";
import { projects } from "@/content/site";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected research and engineering projects — AI cybersecurity, agentic AI, privacy-preserving ML, Web3, and SaaS.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero eyebrow="Work" title="Selected work." subtitle="From ambitious ideas to engineered reality." />
      <div className="container-page pb-28">
        <p className="mb-10 max-w-3xl rounded-2xl bg-mist p-5 text-[14px] text-muted">
          Every project is labelled by origin. Most are founder-led research, research prototypes, or independent engineering by our co-founder, and they show the expertise BodhixAI is built on. They are not presented as commercial client engagements. Visuals are illustrative concepts.
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
