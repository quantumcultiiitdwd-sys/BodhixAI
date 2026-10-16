import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ProjectVisual, { projectBackdrop } from "@/components/ProjectVisual";
import { ProjectCard } from "@/components/ProjectCarousel";
import { AnimatedText, Reveal, Tag } from "@/components/ui";
import { ContactCTA } from "@/components/sections";
import { projects } from "@/content/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return { title: p.name, description: p.description, alternates: { canonical: `/work/${p.slug}` }, openGraph: { title: p.title, description: p.description } };
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-4 border-t border-line py-12 md:grid-cols-12">
      <h2 className="eyebrow text-muted md:col-span-3">{label}</h2>
      <div className="md:col-span-9">{children}</div>
    </Reveal>
  );
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const related = projects.filter((x) => x.slug !== p.slug).slice(0, 2);

  return (
    <>
      {/* ProjectDetailHero */}
      <section className="container-page pt-32 md:pt-40">
        <Link href="/work" className="inline-flex items-center gap-2 text-[14px] text-muted hover:text-ink">
          <ArrowLeft className="size-4" aria-hidden /> All work
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-[14px]">
          <span className="font-mono text-accent">{p.number}</span>
          <span className="font-medium">{p.category}</span>
          <span className="rounded-full bg-mist px-3 py-1 text-[12px] text-muted">{p.origin}</span>
        </div>
        <AnimatedText as="h1" text={p.title} className="text-hero mt-6 max-w-5xl !text-[clamp(2.5rem,6vw,5.5rem)]" animateOnMount />
        <Reveal delay={0.3}><p className="text-lead mt-8 max-w-3xl text-muted">{p.description}</p></Reveal>
        <Reveal delay={0.4} className="mt-14">
          <div className={`relative aspect-[16/9] overflow-hidden rounded-[28px] md:aspect-[21/9] ${projectBackdrop[p.visual]}`}>
            <div className="absolute inset-[8%_10%] md:inset-[10%_22%]"><ProjectVisual kind={p.visual} /></div>
            <span className="absolute top-4 left-4 rounded-full bg-white/70 px-3 py-1 text-[11px] text-ink/60 backdrop-blur">Illustrative concept</span>
          </div>
        </Reveal>
      </section>

      <div className="container-page mt-16 pb-20">
        <Block label="Overview"><p className="text-lead">{p.overview}</p></Block>
        <Block label="Challenge"><p className="text-lead text-ink/80">{p.challenge}</p></Block>
        <Block label="Approach">
          <ol className="space-y-5">
            {p.approach.map((a, i) => (
              <li key={i} className="flex gap-4"><span className="font-mono text-[13px] text-accent">0{i + 1}</span><span className="text-ink/85">{a}</span></li>
            ))}
          </ol>
        </Block>
        <Block label="Architecture">
          <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {p.architecture.map((a, i) => (
              <li key={a.label} className="relative rounded-2xl bg-mist p-5">
                <p className="font-mono text-[12px] text-muted">Layer {i + 1}</p>
                <p className="mt-1 font-semibold">{a.label}</p>
                <p className="mt-2 text-[14px] text-muted">{a.detail}</p>
              </li>
            ))}
          </ol>
        </Block>
        <Block label="Technologies"><div className="flex flex-wrap gap-2">{p.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div></Block>
        <Block label="Outcomes">
          <ul className="space-y-3">
            {p.outcomes.map((o) => <li key={o} className="flex gap-3"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />{o}</li>)}
          </ul>
          {p.links && (
            <div className="mt-6 flex flex-wrap gap-4">
              {p.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
                  {l.label} <ArrowUpRight className="size-4" aria-hidden />
                </a>
              ))}
            </div>
          )}
        </Block>
      </div>

      <section className="bg-mist section" aria-labelledby="related-title">
        <div className="container-page">
          <h2 id="related-title" className="text-title mb-10">Related projects</h2>
          <div className="grid gap-6 md:grid-cols-2">{related.map((r) => <ProjectCard key={r.slug} project={r} />)}</div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
