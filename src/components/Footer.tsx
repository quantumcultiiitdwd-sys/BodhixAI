import Link from "next/link";
import { cacheLife } from "next/cache";
import BackToTop from "./BackToTop";
import { nav, site } from "@/content/site";
import { Wordmark } from "./Navbar";

// Cached so the prerendered shell stays static; refreshes daily.
async function year() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function Footer() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark className="text-2xl" />
          <p className="mt-3 max-w-xs text-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <p className="eyebrow text-muted mb-4">Company</p>
          <ul className="space-y-2.5">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-ink/80 hover:text-accent">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-2">
          <p className="eyebrow text-muted mb-4">Legal</p>
          <ul className="space-y-2.5">
            <li><Link href="/privacy" className="text-ink/80 hover:text-accent">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-ink/80 hover:text-accent">Terms of Service</Link></li>
          </ul>
        </div>
        {site.socials.length > 0 && (
          <div className="md:col-span-2">
            <p className="eyebrow text-muted mb-4">Follow</p>
            <ul className="space-y-2.5">
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="text-ink/80 hover:text-accent">{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="container-page flex items-center justify-between border-t border-line py-6 text-[13px] text-muted">
        <p>© {await year()} {site.name}. All rights reserved.</p>
        <BackToTop />
      </div>
    </footer>
  );
}
