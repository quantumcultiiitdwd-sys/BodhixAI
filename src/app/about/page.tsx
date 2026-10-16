import type { Metadata } from "next";
import { PageHero, Reveal } from "@/components/ui";
import { ContactCTA, FounderSection, Pillars, TechnologyStack } from "@/components/sections";

export const metadata: Metadata = {
  title: "About",
  description: "BodhixAI: intelligence guided by deeper understanding. Learn about our philosophy and the people behind the company.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About BodhixAI" title="Built for the curious. Designed for the ambitious." subtitle="We believe advanced technology should be secure, purposeful, accessible, and commercially meaningful." />

      <section className="bg-night text-white section" aria-labelledby="name-title">
        <div className="container-page grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-electric mb-5">The name</p>
            <h2 id="name-title" className="text-display">Bodhi × AI</h2>
          </Reveal>
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
            <Reveal>
              <p className="text-[40px] font-semibold tracking-tight">Bodhi</p>
              <p className="mt-3 text-white/60">Knowledge, understanding, and awakening — the clarity that comes from seeing a problem as it really is.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-[40px] font-semibold tracking-tight">AI</p>
              <p className="mt-3 text-white/60">Intelligent technology and computational innovation — the tools that turn understanding into action at scale.</p>
            </Reveal>
            <Reveal delay={0.2} className="sm:col-span-2">
              <p className="text-lead border-t border-white/10 pt-8 text-white/80">Together, BodhixAI stands for intelligence guided by deeper understanding: systems that are not only capable, but considered — secure by design, honest about uncertainty, and built to serve real people.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <Pillars />
      <FounderSection />
      <TechnologyStack />
      <ContactCTA />
    </>
  );
}
