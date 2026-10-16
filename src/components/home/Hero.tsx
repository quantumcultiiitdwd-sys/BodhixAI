"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { AnimatedText, MagneticButton } from "@/components/ui";
import { ease } from "@/lib/motion";

const HeroCore3D = dynamic(() => import("./HeroCore3D"), { ssr: false, loading: () => <CoreFallback /> });

// Static fallback for no-WebGL, reduced motion, and while the 3D bundle loads.
function CoreFallback() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden>
      <defs>
        <radialGradient id="cf-glass" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#dfe8ff" />
          <stop offset="100%" stopColor="#b9ccff" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="none" stroke="#4F8CFF" strokeOpacity="0.18" />
      <polygon points="200,92 293,146 293,254 200,308 107,254 107,146" fill="url(#cf-glass)" stroke="#fff" strokeWidth="2" opacity="0.95" />
      <polygon points="200,92 293,146 200,200" fill="#fff" opacity="0.5" />
      <circle cx="200" cy="200" r="26" fill="#4F8CFF" />
      <circle cx="200" cy="200" r="44" fill="none" stroke="#786BFF" strokeOpacity="0.5" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return <circle key={i} cx={200 + Math.cos(a) * 150} cy={200 + Math.sin(a) * 150} r={i % 3 ? 4 : 6} fill={i % 3 ? "#0071E3" : "#786BFF"} />;
      })}
    </svg>
  );
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const reduce = useReducedMotion();
  const [use3D, setUse3D] = useState(false);
  const [inView, setInView] = useState(true);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capability check needs the DOM
    setUse3D(!reduce && hasWebGL());
  }, [reduce]);

  // Pause the render loop when the hero is off-screen.
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting));
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    pointer.current = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 };
  }

  return (
    <section ref={ref} onPointerMove={onPointerMove} className="relative isolate flex min-h-[100svh] items-center overflow-hidden pt-24 pb-16">
      {/* Ambient light */}
      <motion.div aria-hidden className="absolute inset-0 -z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }}>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff_0%,#F5F5F7_100%)]" />
        <div className="ambient absolute top-[8%] right-[-10%] size-[60vw] max-w-[820px] rounded-full bg-[radial-gradient(circle,rgba(79,140,255,0.22),transparent_62%)] blur-2xl" />
        <div className="ambient absolute bottom-[-20%] left-[-10%] size-[50vw] max-w-[700px] rounded-full bg-[radial-gradient(circle,rgba(120,107,255,0.14),transparent_60%)] blur-2xl [animation-delay:-6s]" />
      </motion.div>

      <div className="container-page grid w-full items-center gap-10 lg:grid-cols-12">
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 lg:col-span-7">
          <motion.p className="eyebrow text-accent mb-6" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease, delay: 0.1 }}>
            AI-native. Security-first. Built for scale.
          </motion.p>
          <AnimatedText as="h1" text="Intelligence, engineered for what's next." className="text-hero" animateOnMount delay={0.2} />
          <motion.p
            className="text-lead mt-8 max-w-xl text-muted"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
          >
            From autonomous AI agents to resilient cybersecurity platforms, BodhixAI builds the technology that powers tomorrow&apos;s enterprises.
          </motion.p>
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 1 } } }}
          >
            {[
              <MagneticButton key="a" href="/work">Explore Our Work</MagneticButton>,
              <MagneticButton key="b" href="/contact" variant="secondary" arrow={false}>Let&apos;s Build Together</MagneticButton>,
            ].map((btn, i) => (
              <motion.div key={i} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}>
                {btn}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div style={{ y: visualY, scale: visualScale }} className="relative mx-auto aspect-square w-full max-w-[560px] lg:col-span-5">
          <motion.div
            className="h-full w-full"
            initial={{ opacity: 0, scale: 0.86, rotate: -6 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.3 }}
          >
            {use3D ? <HeroCore3D active={inView} pointer={pointer} /> : <CoreFallback />}
          </motion.div>
        </motion.div>
      </div>

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
