"use client";

export default function IsoLogo({ size = 44 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Abdrezak Shemsedin monogram"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="isoFace" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#181512" />
          <stop offset="100%" stopColor="#241b13" />
        </linearGradient>
        <linearGradient id="isoEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C5A880" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D4C5B9" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Top face (isometric hexagon) */}
      <path
        d="M24 2 L36 8 L42 18 L42 30 L24 46 L6 30 L6 18 L12 8 Z"
        fill="url(#isoFace)"
        stroke="url(#isoEdge)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Inner beveled hexagon */}
      <path
        d="M24 12.5 L31.5 16.25 L35.25 22.5 L31.5 28.75 L24 35 L16.5 28.75 L12.75 22.5 L16.5 16.25 Z"
        fill="rgba(197,168,128,0.07)"
        stroke="#C5A880"
        strokeOpacity="0.55"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />

      {/* Soft inner glow */}
      <path
        d="M24 14.5 L30.5 17.75 L33.75 22.5 L30.5 27.25 L24 33.5 L17.5 27.25 L14.25 22.5 L17.5 17.75 Z"
        fill="rgba(224,180,130,0.05)"
      />

      {/* Code bracket — opening */}
      <text
        x="17.2"
        y="26"
        fontSize="9"
        fontWeight="700"
        fill="#D4C5B9"
        textAnchor="middle"
        fontFamily="Geist Mono, ui-monospace, monospace"
      >
        {"<"}
      </text>
      {/* Initials */}
      <text
        x="24"
        y="27.5"
        fontSize="10.5"
        fontWeight="800"
        fill="#C5A880"
        textAnchor="middle"
        letterSpacing="0.4"
        fontFamily="Geist, ui-sans-serif, system-ui, sans-serif"
      >
        AS
      </text>
      {/* Code bracket — closing */}
      <text
        x="30.8"
        y="26"
        fontSize="9"
        fontWeight="700"
        fill="#D4C5B9"
        textAnchor="middle"
        fontFamily="Geist Mono, ui-monospace, monospace"
      >
        {">"}
      </text>
    </svg>
  );
}
