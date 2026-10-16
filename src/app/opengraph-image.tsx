import { ImageResponse } from "next/og";

export const alt = "BodhixAI — Intelligence, engineered with purpose.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "radial-gradient(circle at 80% 10%, #1a2c55 0%, #08090D 60%)", color: "white", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", fontSize: 40, fontWeight: 600, letterSpacing: -1 }}>
          Bodhi<span style={{ color: "#4F8CFF" }}>x</span>AI
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1 }}>Intelligence, engineered for what&apos;s next.</div>
          <div style={{ fontSize: 30, marginTop: 28, color: "rgba(255,255,255,0.6)" }}>Agentic AI · AI Cybersecurity · SaaS Engineering</div>
        </div>
      </div>
    ),
    size,
  );
}
