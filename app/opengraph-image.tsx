import { ImageResponse } from "next/og";
import { portfolioData } from "@/data/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${portfolioData.name} — ${portfolioData.role}`;

export default function OgImage() {
  const firstName = portfolioData.firstName;
  const lastName = portfolioData.lastName;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 72px",
          background:
            "radial-gradient(circle at 85% 10%, rgba(201,152,119,0.35), transparent 50%), linear-gradient(135deg, #181412 0%, #241b16 60%, #2a1e16 100%)",
          color: "#f3ece5",
          fontFamily: "Geist, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#c99877",
              color: "#161311",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 24,
            }}
          >
            {portfolioData.initials}
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>{portfolioData.name}</div>
            <div style={{ fontSize: 20, color: "#c7b8ad" }}>{portfolioData.role}</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 26, fontWeight: 600, color: "#e2b18e", letterSpacing: 3, textTransform: "uppercase" }}>
            {portfolioData.availability}
          </div>
          <div style={{ display: "flex", alignItems: "baseline", fontSize: 74, fontWeight: 800, lineHeight: 1.05 }}>
            {firstName}
            <span style={{ color: "#e2b18e" }}>
              {"\u202f"}
              {lastName}
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
            {["Web Apps", "AI & ML", "E-Commerce", "APIs"].map((tag) => (
              <div
                key={tag}
                style={{
                  borderRadius: 999,
                  border: "1px solid rgba(201,152,119,0.4)",
                  background: "rgba(201,152,119,0.12)",
                  padding: "10px 20px",
                  fontSize: 20,
                  color: "#e2b18e",
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
