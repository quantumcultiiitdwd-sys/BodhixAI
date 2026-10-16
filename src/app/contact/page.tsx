import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Contact",
  description: "Have something ambitious in mind? Start a conversation with BodhixAI.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Have something ambitious in mind?" subtitle="Let's build something extraordinary. Tell us about your project and we'll be in touch." />
      <div className="container-page grid gap-12 pb-28 lg:grid-cols-12">
        <div className="lg:col-span-8"><ContactForm /></div>
        <aside className="space-y-8 lg:col-span-4">
          {[
            ["What happens next", "We read every enquiry and reply to discuss your goals, constraints, and whether we're the right fit."],
            ["Good to include", "The problem you're solving, who it's for, any existing systems, and your timeline."],
            ["Confidentiality", "Happy to sign an NDA before discussing sensitive details."],
          ].map(([t, b]) => (
            <div key={t} className="border-t border-line pt-6">
              <h2 className="font-semibold">{t}</h2>
              <p className="mt-2 text-muted">{b}</p>
            </div>
          ))}
        </aside>
      </div>
    </>
  );
}
