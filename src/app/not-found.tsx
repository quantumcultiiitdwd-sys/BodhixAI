import { MagneticButton } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-start justify-center pt-32 pb-20">
      <p className="font-mono text-accent">404</p>
      <h1 className="text-display mt-4">This page doesn&apos;t exist.</h1>
      <p className="text-lead mt-4 text-muted">The link may be broken, or the page may have moved.</p>
      <div className="mt-10"><MagneticButton href="/">Back to home</MagneticButton></div>
    </section>
  );
}
