"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/content/site";
import { ease } from "@/lib/motion";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`text-[19px] font-semibold tracking-[-0.03em] ${className}`}>
      Bodhi<span className="text-accent">x</span>AI
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  // Lock scroll while the mobile menu is open; Escape closes it.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease }}
        className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,height] duration-300 ${
          scrolled || open ? "h-16 border-line/80 bg-white/80" : "h-[72px] border-transparent bg-white/40"
        }`}
      >
        <nav aria-label="Primary" className="container-page flex h-full items-center justify-between gap-6">
          <Link href="/" aria-label={`${site.name} home`} className="shrink-0">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-1 md:flex">
            {nav.slice(0, 4).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`group relative block rounded-full px-4 py-2 text-[14px] transition-colors ${
                    isActive(item.href) ? "text-ink" : "text-ink/65 hover:text-ink"
                  }`}
                >
                  {isActive(item.href) && (
                    <motion.span layoutId="nav-active" className="absolute inset-0 -z-10 rounded-full bg-mist" transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                  )}
                  {item.label}
                  <span className="absolute inset-x-4 bottom-1.5 h-px origin-left scale-x-0 bg-ink/40 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden h-9 items-center rounded-full bg-ink px-4 text-[14px] font-medium text-white transition-colors hover:bg-accent md:inline-flex"
            >
              Let&apos;s Talk
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex size-11 items-center justify-center rounded-full md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-40 bg-white/95 backdrop-blur-xl md:hidden"
            onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
          >
            <motion.ul
              className="container-page flex flex-col gap-1 pt-8"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
            >
              {[{ label: "Home", href: "/" }, ...nav].map((item) => (
                <motion.li key={item.href} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { ease, duration: 0.4 } } }}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block border-b border-line py-4 text-3xl font-semibold tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
            <div className="container-page mt-10">
              <Link href="/contact" className="inline-flex h-12 items-center rounded-full bg-accent px-6 font-medium text-white">
                Let&apos;s Talk
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
