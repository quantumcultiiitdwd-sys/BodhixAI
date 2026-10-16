import type { Metadata } from "next";
import { PageHero, Reveal } from "@/components/ui";
import { ContactCTA, ResearchCard } from "@/components/sections";
import { research, type ResearchStatus } from "@/content/site";

export const metadata: Metadata = {
  title: "Research & Innovation",
  description: "Peer-reviewed and ongoing research in graph-based intrusion detection, agentic AI, federated learning, and quantum machine learning.",
  alternates: { canonical: "/research" },
};

const order: ResearchStatus[] = ["Published", "Accepted", "Ongoing"];

export default function ResearchPage() {
  return (
    <>
      <PageHero eyebrow="Research & innovation" title="Where research meets reality." subtitle="We take ideas from the research frontier and engineer them into systems that hold up in production." />
      <div className="container-page pb-28">
        <p className="mb-14 max-w-3xl rounded-2xl bg-mist p-5 text-[14px] text-muted">
          The work below was led or co-authored by our co-founder with academic and institutional collaborators. It is individual research, not proprietary BodhixAI intellectual property. Each item is marked as published, accepted (forthcoming), or ongoing.
        </p>
        {order.map((status) => {
          const items = research.filter((r) => r.status === status);
          if (!items.length) return null;
          return (
            <section key={status} className="mb-20" aria-labelledby={`r-${status}`}>
              <h2 id={`r-${status}`} className="text-title mb-8">{status}</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((r, i) => <Reveal key={r.title} delay={(i % 3) * 0.06} className="flex"><ResearchCard r={r} /></Reveal>)}
              </div>
            </section>
          );
        })}
      </div>
      <ContactCTA />
    </>
  );
}
