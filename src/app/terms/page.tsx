import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service", alternates: { canonical: "/terms" } };

export default function TermsPage() {
  return (
    <article className="container-page max-w-3xl pt-36 pb-28 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-3 [&_p]:text-ink/80">
      <h1 className="text-display">Terms of Service</h1>
      <p className="text-muted">By using this website you agree to these terms.</p>
      <h2>Use of content</h2>
      <p>Content on this website is provided for general information about BodhixAI and its capabilities. Project visuals are illustrative concepts unless stated otherwise.</p>
      <h2>Research and project descriptions</h2>
      <p>Research and projects are labelled by origin. Founder-led and independent work describes individual experience and is not a representation of commercial engagements or endorsements by any institution.</p>
      <h2>No warranty</h2>
      <p>The website is provided “as is” without warranties of any kind. Any engagement with BodhixAI is governed by a separate written agreement.</p>
      <h2>Third-party links</h2>
      <p>Links to external sites are provided for convenience; we are not responsible for their content.</p>
      <h2>Changes</h2>
      <p>We may update these terms from time to time. Continued use of the site means you accept the current version.</p>
    </article>
  );
}
