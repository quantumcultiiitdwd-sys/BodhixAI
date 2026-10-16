import type { Transition, Variants } from "motion/react";

// Centralised motion tokens — keep easing and timing consistent site-wide.
export const ease = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.2,
  standard: 0.4,
  reveal: 0.7,
  hero: 1.1,
  page: 0.4,
};

export const spring: Transition = { type: "spring", stiffness: 260, damping: 30, mass: 0.8 };
export const softSpring: Transition = { type: "spring", stiffness: 120, damping: 20 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: duration.reveal, ease } },
};

export const stagger = (gap = 0.12, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const viewportOnce = { once: true, margin: "0px 0px -12% 0px" } as const;
