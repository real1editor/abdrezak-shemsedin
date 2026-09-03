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

      {/* Outer — equal-angle regular pointy-top hexagon (radius 22, center 24,24) */}
      <path
        d="M24 2 L43.05 13 L43.05 35 L24 46 L4.95 35 L4.95 13 Z"
        fill="url(#isoFace)"
        stroke="url(#isoEdge)"
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* Inner beveled — regular hexagon (radius 13.5) */}
      <path
        d="M24 10.5 L35.69 17.25 L35.69 30.75 L24 37.5 L12.31 30.75 L12.31 17.25 Z"
        fill="rgba(197,168,128,0.07)"
        stroke="#C5A880"
        strokeOpacity="0.55"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />

      {/* Soft inner glow — regular hexagon (radius 9.5) */}
      <path
        d="M24 14.5 L32.23 19.25 L32.23 28.75 L24 33.5 L15.77 28.75 L15.77 19.25 Z"
        fill="rgba(224,180,130,0.05)"
      />

      {/* Code bracket — opening */}
      <text
        x="16.8"
        y="26.5"
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
        x="31.2"
        y="26.5"
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
