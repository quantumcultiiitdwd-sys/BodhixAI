import { contactSchema } from "@/lib/contact-schema";

const MIN_FILL_MS = 3000;

// ponytail: in-memory per-IP limiter resets on restart and isn't shared across instances; move to Redis/Upstash if abuse appears.
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return Response.json({ error: "Too many requests. Please try again later." }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Please check the highlighted fields.", issues: parsed.error.flatten().fieldErrors }, { status: 422 });
  }
  const d = parsed.data;

  // Bot heuristics: silently accept-and-drop would fake success, so reject explicitly instead.
  if (d.website || Date.now() - d.startedAt < MIN_FILL_MS) {
    return Response.json({ error: "Submission flagged as automated. Please try again." }, { status: 400 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("Contact form: RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL not configured.");
    return Response.json({ error: "Our contact service is not configured yet. Please try again later." }, { status: 503 });
  }

  const rows: [string, string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ["Company", d.company || "—"],
    ["Service", d.service],
    ["Budget", d.budget || "—"],
  ];
  const html = `<h2>New enquiry — BodhixAI</h2><table>${rows.map(([k, v]) => `<tr><td><b>${k}</b></td><td>${esc(v)}</td></tr>`).join("")}</table><p style="white-space:pre-wrap">${esc(d.message)}</p>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: CONTACT_TO_EMAIL.split(",").map((s) => s.trim()),
      reply_to: d.email,
      subject: `New enquiry: ${d.service} — ${d.name}`,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Contact form: email provider error", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "We couldn't send your message. Please try again shortly." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
