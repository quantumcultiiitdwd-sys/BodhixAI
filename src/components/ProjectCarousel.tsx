"use client";

import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/site";
import ProjectVisual, { projectBackdrop } from "./ProjectVisual";
import { Tag } from "./ui";

export function ProjectCard({ project, active = true }: { project: Project; active?: boolean }) {
  const dark = true;
  return (
    <motion.article
      animate={{ scale: active ? 1 : 0.94, opacity: active ? 1 : 0.8 }}
      transition={{ type: "spring", stiffness: 220, damping: 30 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-mist"
    >
      <Link href={`/work/${project.slug}`} className="absolute inset-0 z-10" aria-label={`View project: ${project.title}`} tabIndex={active ? 0 : -1} />
      <div className={`relative aspect-[16/10] overflow-hidden ${project.visual ? projectBackdrop[project.visual] : "bg-night"}`}>
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={project.image.src} alt={project.image.alt} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" />
        ) : (
          <>
            <div className="parallax absolute inset-[9%_7%] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.04]" style={{ translate: "var(--px, 0) 0" }}>
              {project.visual && <ProjectVisual kind={project.visual} />}
            </div>
            <span className={`absolute top-4 left-4 rounded-full px-3 py-1 text-[11px] backdrop-blur ${dark ? "bg-white/10 text-white/70" : "bg-white/70 text-ink/60"}`}>Illustrative concept</span>
          </>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px]">
          <span className="font-medium text-accent">{project.category}</span>
          <span className="text-muted">· {project.origin}</span>
        </div>
        <h3 className="text-title">{project.title}</h3>
        <p className="line-clamp-3 text-muted">{project.description}</p>
        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-2">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
          <span className="inline-flex items-center gap-1 text-[15px] font-medium text-accent">
            View Project <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, embla] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps", dragFree: false, skipSnaps: false });
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const onScroll = useCallback(() => {
    if (!embla) return;
    const p = Math.max(0, Math.min(1, embla.scrollProgress()));
    setProgress(p);
    // Subtle per-slide parallax on the visual.
    const snaps = embla.scrollSnapList();
    embla.slideNodes().forEach((node, i) => {
      const diff = (snaps[i] ?? 0) - p;
      node.style.setProperty("--px", `${diff * -40}px`);
    });
  }, [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setIndex(embla.selectedScrollSnap());
    setCanPrev(embla.canScrollPrev());
    setCanNext(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    // Sync initial state from the external carousel instance.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    onScroll();
    embla.on("select", onSelect).on("reInit", onSelect).on("scroll", onScroll).on("reInit", onScroll);
    return () => {
      embla.off("select", onSelect).off("reInit", onSelect).off("scroll", onScroll).off("reInit", onScroll);
    };
  }, [embla, onSelect, onScroll]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    if (e.key === "ArrowLeft") embla?.scrollPrev();
    else embla?.scrollNext();
  }

  const btn = "inline-flex size-12 items-center justify-center rounded-full bg-mist text-ink transition hover:bg-line disabled:opacity-35 disabled:hover:bg-mist";

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Selected projects" onKeyDown={onKeyDown}>
      <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef} tabIndex={0} aria-label="Use left and right arrow keys to browse projects">
        <div className="-ml-5 flex touch-pan-y">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              className="min-w-0 shrink-0 grow-0 basis-[88%] pl-5 sm:basis-[72%] lg:basis-[66%] xl:basis-[62%]"
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${projects.length}`}
            >
              <ProjectCard project={p} active={i === index} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 flex items-center gap-6">
        <div className="flex items-baseline gap-1 font-mono text-[13px] text-muted tabular-nums" aria-live="polite">
          <span className="relative inline-flex h-5 w-5 overflow-hidden text-ink">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={index} initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.35 }}>
                {projects[index]?.number}
              </motion.span>
            </AnimatePresence>
          </span>
          <span>/ {String(projects.length).padStart(2, "0")}</span>
        </div>
        <div className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-line" aria-hidden>
          <motion.div className="absolute inset-y-0 left-0 rounded-full bg-ink" style={{ width: `${Math.max(progress, 0.02) * 100}%` }} transition={{ duration: 0.2 }} />
        </div>
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => embla?.scrollPrev()} disabled={!canPrev} aria-label="Previous project">
            <ArrowLeft className="size-5" aria-hidden />
          </button>
          <button type="button" className={btn} onClick={() => embla?.scrollNext()} disabled={!canNext} aria-label="Next project">
            <ArrowRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  );
}
