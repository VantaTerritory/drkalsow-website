/* Reusable eyebrow + SVG ornament + divider, ported from index.html.
   Decorative SVGs are aria-hidden. */

type OrnamentKind = "circle" | "leaf" | "diamond" | "compass" | "star" | "heart" | "pin" | "card" | "envelope";

const STROKE = "#5A4A6B";
const STROKE_DARK = "#C9B5D4";

function Ornament({ kind, dark }: { kind: OrnamentKind; dark?: boolean }) {
  const s = dark ? STROKE_DARK : STROKE;
  const common = { width: 22, height: 22, viewBox: "0 0 22 22", fill: "none", "aria-hidden": true } as const;
  switch (kind) {
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 11 Q 11 4, 17 11 Q 11 18, 5 11 Z" stroke={s} strokeWidth="0.8" fill="none" />
          <circle cx="11" cy="11" r="2" fill={s} />
        </svg>
      );
    case "diamond":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="14" height="14" stroke={s} strokeWidth="0.8" fill="none" transform="rotate(45 11 11)" />
          <circle cx="11" cy="11" r="2.5" fill={s} />
        </svg>
      );
    case "compass":
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="8" stroke={s} strokeWidth="0.8" fill="none" />
          <line x1="11" y1="3" x2="11" y2="19" stroke={s} strokeWidth="0.5" />
          <line x1="3" y1="11" x2="19" y2="11" stroke={s} strokeWidth="0.5" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M11 3 L13 8 L18 8 L14 12 L16 18 L11 14.5 L6 18 L8 12 L4 8 L9 8 Z" stroke={s} strokeWidth="0.8" fill="none" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M5 7 Q 11 2, 17 7 Q 17 12, 11 16 Q 5 12, 5 7 Z" stroke={s} strokeWidth="0.8" fill="none" />
          <circle cx="8" cy="9" r="1" fill={s} />
          <circle cx="14" cy="9" r="1" fill={s} />
        </svg>
      );
    case "pin":
      return (
        <svg {...common}>
          <path d="M11 4 C 7 4, 5 7, 5 10 C 5 14, 11 18, 11 18 C 11 18, 17 14, 17 10 C 17 7, 15 4, 11 4 Z" stroke={s} strokeWidth="0.8" fill="none" />
          <circle cx="11" cy="10" r="2" fill={s} />
        </svg>
      );
    case "card":
      return (
        <svg {...common}>
          <rect x="4" y="6" width="14" height="10" stroke={s} strokeWidth="0.8" fill="none" />
          <line x1="4" y1="9" x2="18" y2="9" stroke={s} strokeWidth="0.5" />
          <circle cx="11" cy="13" r="1.5" fill={s} />
        </svg>
      );
    case "envelope":
      return (
        <svg {...common}>
          <path d="M3 8 L11 13 L19 8 L19 16 L3 16 Z" stroke={s} strokeWidth="0.8" fill="none" />
          <path d="M3 8 L11 3 L19 8" stroke={s} strokeWidth="0.8" fill="none" />
        </svg>
      );
    case "circle":
    default:
      return (
        <svg {...common}>
          <circle cx="11" cy="11" r="6" stroke={s} strokeWidth="0.8" />
          <circle cx="11" cy="11" r="10" stroke={s} strokeWidth="0.5" strokeDasharray="2 2" />
          <circle cx="11" cy="11" r="2" fill={s} />
        </svg>
      );
  }
}

export function Eyebrow({
  children,
  // site-wide decision (Sep 2026): eyebrows carry no ornament icon
  ornament = "none",
  dark = false,
}: {
  children: React.ReactNode;
  ornament?: OrnamentKind | "none";
  dark?: boolean;
}) {
  return (
    <div className="eyebrow-group">
      {ornament !== "none" && <Ornament kind={ornament} dark={dark} />}
      <p className={`eyebrow-text${dark ? " eyebrow-on-dark" : ""}`}>{children}</p>
    </div>
  );
}

export function Divider({ center = false, width = 120 }: { center?: boolean; width?: number }) {
  const mid = width / 2;
  return (
    <svg
      className={`divider-svg${center ? " divider-svg-center" : ""}`}
      width={width}
      height="10"
      viewBox={`0 0 ${width} 10`}
      aria-hidden
    >
      <line x1="0" y1="5" x2={mid - 12} y2="5" stroke="#5A4A6B" strokeWidth="0.5" />
      <circle cx={mid} cy="5" r="2.5" fill="none" stroke="#5A4A6B" strokeWidth="0.5" />
      <circle cx={mid} cy="5" r="0.8" fill="#5A4A6B" />
      <line x1={mid + 12} y1="5" x2={width} y2="5" stroke="#5A4A6B" strokeWidth="0.5" />
    </svg>
  );
}
