import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy", alternates: { canonical: "/privacy" } };

export default function PrivacyPage() {
  return (
    <article className="container-page max-w-3xl pt-36 pb-28 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-3 [&_p]:text-ink/80">
      <h1 className="text-display">Privacy Policy</h1>
      <p className="text-muted">This policy explains what information BodhixAI collects through this website and how it is used.</p>
      <h2>Information you give us</h2>
      <p>When you submit the contact form we receive your name, email address, company, service of interest, project description, and optional budget range. We use this only to respond to your enquiry and discuss potential work.</p>
      <h2>How it is processed</h2>
      <p>Form submissions are delivered to our team by email through a third-party email delivery provider. We do not sell your information or use it for advertising.</p>
      <h2>Analytics and cookies</h2>
      <p>This website does not set tracking or advertising cookies.</p>
      <h2>Retention and your rights</h2>
      <p>We keep enquiry emails only as long as needed to handle your request and any resulting engagement. You may ask us to access, correct, or delete your information by replying to any email from us.</p>
      <h2>Changes</h2>
      <p>We may update this policy as the website evolves. Material changes will be reflected on this page.</p>
    </article>
  );
}
