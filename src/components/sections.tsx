"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowUpRight, FlaskConical, Layers, Route, ShieldCheck } from "lucide-react";
import { founders, pillars, research, solutions, techStack, type Research, type Solution } from "@/content/site";
import SolutionVisual from "./Visuals";
import { AnimatedText, MagneticButton, Reveal, SectionHeading, StaggerItem, StaggerList, Tag, TextLink } from "./ui";
import { ease } from "@/lib/motion";

/* ------------------------------- Brand intro -------------------------------- */

export function Intro() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bg = useTransform(scrollYProgress, [0, 0.5, 1], ["#07060b", "#110e1a", "#07060b"]);
  const statements = ["Built for intelligence.", "Designed for trust.", "Engineered to scale."];
  return (
    <motion.section ref={ref} style={{ backgroundColor: bg }} className="section" aria-labelledby="intro-title">
      <div className="container-page grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="eyebrow text-accent mb-5">Who we are</p>
          <h2 id="intro-title" className="sr-only">Complex technology. Beautifully simplified.</h2>
          <AnimatedText as="p" text="Complex technology. Beautifully simplified." className="text-display" />
          <Reveal delay={0.15}>
            <p className="text-lead mt-8 max-w-lg text-muted">
              BodhixAI is a research-driven technology company creating secure, intelligent, and scalable digital systems. We combine AI innovation, cybersecurity engineering, and modern software development to solve meaningful business challenges. We also bring that intelligence into the physical world, integrating AI with robotics and edge systems.
            </p>
          </Reveal>
        </div>
        <ul className="space-y-6 self-end overflow-x-clip lg:col-span-6 lg:col-start-7">
          {statements.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0.12, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ amount: 0.9, margin: "0px 0px -20% 0px" }}
              transition={{ duration: 0.8, ease }}
              className="border-b border-line pb-6 text-[clamp(2rem,4.4vw,4rem)] font-semibold leading-[1.05] tracking-[-0.04em]"
            >
              <span className="mr-4 align-top font-mono text-[13px] font-normal text-accent">0{i + 1}</span>
              {s}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
}

/* ------------------------------- Solutions bento ---------------------------- */

const bentoSpans = [
  "md:col-span-7 md:row-span-2",
  "md:col-span-5",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
];

export function SolutionCard({ solution, className = "", featured = false }: { solution: Solution; className?: string; featured?: boolean }) {
  const dark = true;
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
      className={`group relative flex flex-col overflow-hidden rounded-[28px] border transition-[border-color,box-shadow] duration-300 ${
        dark ? "border-accent/30 bg-[radial-gradient(120%_80%_at_80%_0%,#2b1650_0%,#0b0814_60%)] text-white hover:border-electric/60" : "border-line bg-mist hover:border-accent/50 hover:shadow-[0_24px_60px_-30px_rgba(139,92,246,0.45)]"
      } ${className}`}
    >
      <Link href={`/solutions#${solution.slug}`} className="absolute inset-0 z-10" aria-label={`Learn about ${solution.title}`} />
      <div className="p-7 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className={featured ? "text-title" : "text-[22px] font-semibold tracking-tight"}>{solution.title}</h3>
          <span className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full transition-colors ${dark ? "bg-white/10 group-hover:bg-electric" : "bg-mist group-hover:bg-accent group-hover:text-white"}`}>
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" aria-hidden />
          </span>
        </div>
        <p className={`mt-3 max-w-md ${dark ? "text-white/60" : "text-muted"}`}>{solution.description}</p>
      </div>
      <div className={`relative mt-auto flex items-center justify-center px-6 pb-6 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03] ${featured ? "min-h-56 flex-1" : "h-44"}`}>
        <div className={featured ? "w-full max-w-[520px]" : "h-full w-full"}>
          <SolutionVisual kind={solution.visual} />
        </div>
      </div>
    </motion.article>
  );
}

export function SolutionBento() {
  return (
    <section className="section" aria-labelledby="solutions-title">
      <div className="container-page">
        <div id="solutions-title"><SectionHeading title="What we build." subtitle="Powerful technology, thoughtfully engineered." /></div>
        <StaggerList className="mt-16 grid auto-rows-auto gap-5 md:grid-cols-12">
          {solutions.map((s, i) => (
            <StaggerItem key={s.slug} className={`flex ${bentoSpans[i]}`}>
              <SolutionCard solution={s} featured={i === 0} className="w-full" />
            </StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ---------------------------------- Pillars --------------------------------- */

const pillarIcons = { flask: FlaskConical, shield: ShieldCheck, layers: Layers, route: Route };

export function Pillars() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container-page">
        <div id="why-title"><SectionHeading eyebrow="Why BodhixAI" title="Deep technology. Real-world thinking." /></div>
        <StaggerList className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => {
            const Icon = pillarIcons[p.icon];
            return (
              <StaggerItem key={p.title} className="group bg-canvas p-8 md:p-10">
                <motion.span whileHover={{ rotate: -8, scale: 1.06 }} className="inline-flex size-12 items-center justify-center rounded-2xl bg-mist text-accent">
                  <Icon className="size-6" strokeWidth={1.6} aria-hidden />
                </motion.span>
                <h3 className="mt-8 text-[22px] font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-muted">{p.body}</p>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </div>
    </section>
  );
}

/* --------------------------------- Research --------------------------------- */

const statusStyle: Record<Research["status"], string> = {
  Published: "bg-emerald-400/10 text-emerald-300",
  Accepted: "bg-accent/15 text-electric",
  Ongoing: "bg-fuchsia-400/10 text-fuchsia-300",
};

export function ResearchCard({ r }: { r: Research }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-line bg-canvas transition-shadow duration-300 hover:shadow-[0_24px_60px_-34px_rgba(0,0,0,0.3)]">
      <div className="h-40 bg-[radial-gradient(100%_100%_at_50%_0%,#1d1333_0%,#110e1a_70%)] px-4 pt-4"><SolutionVisual kind={r.visual} /></div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-medium ${statusStyle[r.status]}`}>{r.status}</span>
          <span className="text-[13px] text-muted">{r.domain}</span>
        </div>
        <h3 className="mt-4 text-[20px] font-semibold leading-snug tracking-tight">{r.topic}</h3>
        <p className="mt-2 text-muted">{r.summary}</p>
        <p className="mt-4 text-[13px] leading-relaxed text-ink/70"><span className="italic">{r.title}</span></p>
        <div className="mt-auto flex items-center justify-between gap-3 pt-5 text-[13px]">
          <span className="text-muted">{r.venue}</span>
          {r.link && (
            <a href={r.link.href} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 font-medium text-accent hover:underline">
              {r.link.label} <ArrowUpRight className="size-3.5" aria-hidden />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

export function ResearchShowcase({ limit = 4 }: { limit?: number }) {
  return (
    <section className="section bg-mist" aria-labelledby="research-title">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div id="research-title">
            <SectionHeading eyebrow="Research & innovation" title="Where research meets reality." subtitle="Our foundations come from peer-reviewed work in AI security, connected systems, and quantum machine learning, led by co-founder Sathwik Narkedimilli and collaborators." />
          </div>
          <TextLink href="/research">All research</TextLink>
        </div>
        <StaggerList className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {research.slice(0, limit).map((r) => (
            <StaggerItem key={r.title} className="flex"><ResearchCard r={r} /></StaggerItem>
          ))}
        </StaggerList>
      </div>
    </section>
  );
}

/* ------------------------------- Technology --------------------------------- */

export function TechnologyStack() {
  const all = techStack.flatMap((c) => c.items);
  return (
    <section className="section overflow-hidden" aria-labelledby="tech-title">
      <div className="container-page">
        <div id="tech-title"><SectionHeading title="Engineered with the right tools." /></div>
      </div>
      <div className="marquee mt-14 border-y border-line py-6" aria-hidden>
        <div className="marquee-track flex w-max gap-12 whitespace-nowrap text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-tight text-ink/20">
          {[...all, ...all].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>
      <div className="container-page">
        <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {techStack.map((c, i) => (
            <Reveal key={c.category} delay={i * 0.05}>
              <dt className="eyebrow text-muted">{c.category}</dt>
              <dd className="mt-4 flex flex-wrap gap-2">{c.items.map((t) => <Tag key={t}>{t}</Tag>)}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* --------------------------------- Founders --------------------------------- */

export function FounderSection() {
  return (
    <section className="section" aria-labelledby="founders-title">
      <div className="container-page">
        <div id="founders-title"><SectionHeading eyebrow="Leadership" title="The people behind BodhixAI." /></div>
        <div className="mt-14 space-y-6">
          {founders.map((f) => (
            <Reveal key={f.name} className="card grid gap-10 p-8 md:grid-cols-12 md:p-12">
              <div className="md:col-span-4">
                <h3 className="text-title">{f.name}</h3>
                <p className="text-muted">{f.role}, {`BodhixAI`}</p>
                <div className="mt-4 flex gap-4">
                  {f.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="text-[15px] font-medium text-accent hover:underline">{l.label}</a>)}
                </div>
              </div>
              <div className="md:col-span-8">
                <p className="text-lead">{f.bio}</p>
                <ul className="mt-8 space-y-4">
                  {f.highlights.map((h) => (
                    <li key={h} className="flex gap-3 text-ink/80"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />{h}</li>
                  ))}
                </ul>
                <p className="mt-8 text-[13px] text-muted">These reflect the co-founder&apos;s individual academic and professional experience. They are not BodhixAI customers, partners, or institutional endorsements.</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- Closing CTA -------------------------------- */

export function ContactCTA() {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white" aria-labelledby="cta-title">
      <svg aria-hidden className="absolute inset-0 -z-10 h-full w-full opacity-40" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
        {Array.from({ length: 28 }, (_, i) => {
          const x = (i * 137) % 800, y = (i * 89) % 400, x2 = ((i + 5) * 137) % 800, y2 = ((i + 3) * 89) % 400;
          return (
            <g key={i}>
              <line x1={x} y1={y} x2={x2} y2={y2} stroke="#A78BFA" strokeOpacity={0.12} />
              <circle cx={x} cy={y} r={i % 4 ? 1.6 : 2.6} fill={i % 3 ? "#A78BFA" : "#D8B4FE"} />
            </g>
          );
        })}
      </svg>
      <div aria-hidden className="ambient absolute top-1/2 left-1/2 -z-10 size-[70vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.2),transparent_60%)]" />
      <div className="container-page section text-center">
        <AnimatedText as="h2" text="Have something ambitious in mind?" className="text-display mx-auto max-w-4xl" />
        <Reveal delay={0.2}><p className="text-lead mt-6 text-white/60">Let&apos;s build something extraordinary.</p></Reveal>
        <Reveal delay={0.3} className="mt-10 flex justify-center">
          <MagneticButton href="/contact">Start a Conversation</MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
