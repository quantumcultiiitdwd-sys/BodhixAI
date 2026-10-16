"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef, type ComponentProps, type ReactNode } from "react";
import { ease, duration, fadeUp, stagger, viewportOnce } from "@/lib/motion";

/* ScrollReveal: fade + rise once when entering the viewport. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewportOnce}
      transition={{ duration: duration.reveal, ease, delay }}
    >
      {children}
    </M>
  );
}

/* AnimatedText: masked word-by-word reveal for headlines. */
export function AnimatedText({
  text,
  className,
  as = "h2",
  delay = 0,
  animateOnMount = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  delay?: number;
  animateOnMount?: boolean;
}) {
  const M = motion[as];
  const trigger = animateOnMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: viewportOnce };
  return (
    <M className={className} variants={stagger(0.07, delay)} {...trigger} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "105%", opacity: 0 },
              show: { y: "0%", opacity: 1, transition: { duration: 0.9, ease } },
            }}
          >
            {word}
            {" "}
          </motion.span>
        </span>
      ))}
    </M>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  dark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && (
        <Reveal>
          <p className={`eyebrow mb-5 ${dark ? "text-electric" : "text-accent"}`}>{eyebrow}</p>
        </Reveal>
      )}
      <AnimatedText text={title} className="text-display" />
      {subtitle && (
        <Reveal delay={0.15}>
          <p className={`text-lead mt-6 ${dark ? "text-white/60" : "text-muted"}`}>{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}

/* MagneticButton: restrained pointer-follow, disabled for reduced motion / touch. */
type Variant = "primary" | "secondary" | "dark" | "ghost-dark";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-white hover:bg-[#7C3AED] shadow-[0_8px_24px_-8px_rgba(139,92,246,0.55)]",
  secondary: "bg-white/5 text-ink ring-1 ring-white/15 hover:bg-white/10",
  dark: "bg-white text-night hover:bg-white/90",
  "ghost-dark": "bg-white/8 text-white ring-1 ring-white/15 hover:bg-white/14",
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = true,
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; arrow?: boolean; className?: string } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className" | "children"
>) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.18);
    y.set((e.clientY - r.top - r.height / 2) * 0.25);
  }

  return (
    <motion.span ref={ref} style={{ x, y }} onPointerMove={onMove} onPointerLeave={() => (x.set(0), y.set(0))} className="inline-flex">
      <Link
        href={href}
        className={`group inline-flex h-12 items-center gap-2 rounded-full px-6 text-[15px] font-medium transition-[background-color,box-shadow,color] duration-200 ${variants[variant]} ${className}`}
        {...rest}
      >
        {children}
        {arrow && <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />}
      </Link>
    </motion.span>
  );
}

export function TextLink({ href, children, dark = false }: { href: string; children: ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-1.5 text-[15px] font-medium ${dark ? "text-electric" : "text-accent"} hover:underline underline-offset-4`}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
    </Link>
  );
}

export function Tag({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[13px] ${dark ? "bg-white/8 text-white/75 ring-1 ring-white/10" : "bg-mist text-ink/75"}`}
    >
      {children}
    </span>
  );
}

export function StaggerList({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.ul className={className} variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={viewportOnce}>
      {children}
    </motion.ul>
  );
}

export function StaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.li className={className} variants={fadeUp}>
      {children}
    </motion.li>
  );
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <section className="container-page pt-36 pb-16 md:pt-44 md:pb-24">
      <p className="eyebrow text-accent mb-5">{eyebrow}</p>
      <AnimatedText as="h1" text={title} className="text-hero max-w-5xl" animateOnMount />
      <motion.p
        className="text-lead text-muted mt-8 max-w-2xl"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.reveal, ease, delay: 0.35 }}
      >
        {subtitle}
      </motion.p>
    </section>
  );
}
