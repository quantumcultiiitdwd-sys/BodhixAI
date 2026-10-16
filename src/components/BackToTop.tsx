"use client";

import { ArrowUp } from "lucide-react";
import { motion } from "motion/react";

export default function BackToTop() {
  return (
    <motion.button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.94 }}
      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-ink/70 hover:text-ink"
    >
      Back to top <ArrowUp className="size-4" aria-hidden />
    </motion.button>
  );
}
