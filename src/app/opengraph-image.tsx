import { ImageResponse } from "next/og";
import { credentials } from "@/data/masterPortfolio";
import {
  domainMetas,
  domainOrder,
  masterMeta,
  masterSiteData,
} from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${masterSiteData.name} — ${masterMeta.tagline}`;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(circle at 82% 0%, rgba(197,168,128,0.22), transparent 48%), radial-gradient(circle at 6% 100%, rgba(180,110,70,0.16), transparent 42%), #12100e",
          color: "#f3ece5",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 58,
              height: 58,
              border: "1px solid rgba(197,168,128,0.4)",
              background: "rgba(197,168,128,0.08)",
              color: "#c5a880",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 2,
            }}
          >
            AS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 26, fontWeight: 650, letterSpacing: -0.6 }}>
              {masterSiteData.name}
            </div>
            <div
              style={{
                fontSize: 15,
                color: "#b4a294",
                letterSpacing: 1.4,
                textTransform: "uppercase",
              }}
            >
              real1editor · Wolaita Sodo / Butajira, Ethiopia
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 17,
              fontWeight: 600,
              color: "#c5a880",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Master Portfolio · Six Domains
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2.4,
              marginTop: 14,
              maxWidth: 960,
            }}
          >
            <span>Six specialized domains.</span>
            <span style={{ color: "#b4a294" }}>One engineering standard.</span>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 28,
            }}
          >
            {domainOrder.map((slug) => (
              <div
                key={slug}
                style={{
                  border: "1px solid rgba(197,168,128,0.22)",
                  background: "rgba(197,168,128,0.06)",
                  padding: "8px 13px",
                  fontSize: 15,
                  color: "#d4c5b9",
                }}
              >
                {domainMetas[slug].label}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(197,168,128,0.18)",
            paddingTop: 18,
            fontSize: 15,
            color: "#94806f",
          }}
        >
          <span>{masterSiteData.role}</span>
          <span style={{ color: "#c5a880" }}>
            {`${credentials.length} credentials · ECE 2027`}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
