"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, Quote } from "lucide-react";
import { devPlaceholderTestimonials, testimonials as approved, type Testimonial } from "@/content/site";
import { MagneticButton, SectionHeading } from "./ui";

function Carousel({ items, placeholder }: { items: Testimonial[]; placeholder: boolean }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(!reduce);
  const touchX = useRef<number | null>(null);
  const go = (d: number) => setI((v) => (v + d + items.length) % items.length);

  useEffect(() => {
    if (!playing || items.length < 2) return;
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [playing, items.length]);

  const t = items[i];
  return (
    <div
      className="mt-16"
      role="region"
      aria-roledescription="carousel"
      aria-label="Testimonials"
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      {placeholder && <p className="mb-6 inline-block rounded-full bg-amber-400/15 px-3 py-1 text-[12px] text-amber-200">Development placeholder — not shown in production</p>}
      <Quote className="size-10 text-accent" aria-hidden />
      <div className="relative mt-6 min-h-[220px]" aria-live={playing ? "off" : "polite"}>
        <AnimatePresence mode="wait">
          <motion.figure key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45 }}>
            <blockquote className="text-title max-w-4xl !font-medium">{t.quote}</blockquote>
            <figcaption className="mt-8 flex items-center gap-4">
              <span className="flex size-12 items-center justify-center rounded-full bg-mist font-semibold text-ink/60">{t.name.charAt(0)}</span>
              <span>
                <span className="block font-semibold">{t.name}</span>
                <span className="block text-muted">{t.role}, {t.organization}</span>
              </span>
            </figcaption>
          </motion.figure>
        </AnimatePresence>
      </div>
      <div className="mt-10 flex items-center gap-4">
        <div className="flex gap-2">
          {items.map((_, d) => (
            <button key={d} type="button" onClick={() => setI(d)} aria-label={`Show testimonial ${d + 1}`} aria-current={d === i} className="flex h-6 items-center">
              <motion.span className="block h-1.5 rounded-full bg-ink" animate={{ width: d === i ? 28 : 8, opacity: d === i ? 1 : 0.25 }} />
            </button>
          ))}
        </div>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause autoplay" : "Start autoplay"} className="inline-flex size-11 items-center justify-center rounded-full bg-mist hover:bg-line">
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="inline-flex size-11 items-center justify-center rounded-full bg-mist hover:bg-line"><ArrowLeft className="size-4" /></button>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="inline-flex size-11 items-center justify-center rounded-full bg-mist hover:bg-line"><ArrowRight className="size-4" /></button>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection() {
  const placeholder = approved.length === 0 && process.env.NODE_ENV === "development";
  const items = approved.length ? approved : placeholder ? devPlaceholderTestimonials : [];

  if (!items.length) {
    return (
      <section className="section" aria-labelledby="story-title">
        <div className="container-page">
          <div className="card relative overflow-hidden bg-mist p-10 md:p-20">
            <div aria-hidden className="ambient absolute -right-20 -top-20 size-96 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.2),transparent_65%)]" />
            <p className="eyebrow mb-5 text-accent">Built on trust</p>
            <h2 id="story-title" className="text-display max-w-3xl">Let&apos;s create the next success story.</h2>
            <p className="text-lead mt-6 max-w-xl text-muted">Meaningful technology begins with meaningful partnerships. Tell us what you&apos;re building.</p>
            <div className="mt-10"><MagneticButton href="/contact">Discuss a Project</MagneticButton></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section" aria-label="Testimonials">
      <div className="container-page">
        <SectionHeading title="Built on trust. Driven by collaboration." subtitle="Meaningful technology begins with meaningful partnerships." />
        <Carousel items={items} placeholder={placeholder} />
      </div>
    </section>
  );
}
