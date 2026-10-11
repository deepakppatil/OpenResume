import { cn } from "@/utils/cn";

interface ProjectCoverProps {
  variant: string;
  index: number;
}

/**
 * Lightweight illustrated "screenshot" used when a project has no image. Pure SVG driven by the
 * theme tokens, so it adapts to light/dark mode and adds almost nothing to the bundle.
 * Add `image: "/images/your-shot.webp"` to a project in profile.js to show a real screenshot.
 */
export function ProjectCover({ variant, index }: ProjectCoverProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-accent-soft to-surface-2",
        index % 2 === 1 && "bg-gradient-to-tr",
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 320 180" className="h-full w-full" focusable="false">
        <Illustration variant={variant} />
      </svg>
    </div>
  );
}

const S = "var(--surface)";
const S2 = "var(--surface-2)";
const L = "var(--line)";
const A = "var(--accent-strong)";
const M = "var(--muted)";

function Window({ x = 56, y = 20, w = 208, h = 140 }: { x?: number; y?: number; w?: number; h?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx="12" fill={S} stroke={L} />
      <circle cx={x + 14} cy={y + 14} r="3.5" fill={L} />
      <circle cx={x + 26} cy={y + 14} r="3.5" fill={L} />
      <circle cx={x + 38} cy={y + 14} r="3.5" fill={L} />
      <line x1={x} y1={y + 28} x2={x + w} y2={y + 28} stroke={L} />
    </>
  );
}

function Illustration({ variant }: { variant: string }) {
  switch (variant) {
    case "chat":
      return (
        <>
          <Window />
          <rect x="72" y="58" width="104" height="22" rx="9" fill={S2} />
          <rect x="144" y="88" width="104" height="22" rx="9" fill={A} />
          <rect x="72" y="118" width="72" height="22" rx="9" fill={S2} />
          <rect x="84" y="66" width="60" height="5" rx="2.5" fill={L} />
          <rect x="156" y="96" width="72" height="5" rx="2.5" fill="var(--accent-fg)" opacity="0.8" />
          <path d="M252 30l3.2 8.8 8.8 3.2-8.8 3.2-3.2 8.8-3.2-8.8-8.8-3.2 8.8-3.2z" fill={A} />
          <path d="M276 62l1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6z" fill={A} opacity="0.6" />
        </>
      );
    case "network":
      return (
        <>
          <g stroke={A} strokeWidth="1.6" opacity="0.55" fill="none">
            <path d="M160 90L88 46M160 90L236 48M160 90L84 136M160 90L242 134M88 46L52 94M236 48L276 92M84 136L120 164M242 134L200 164" />
          </g>
          {[
            [88, 46, 11],
            [236, 48, 11],
            [84, 136, 11],
            [242, 134, 11],
            [52, 94, 7],
            [276, 92, 7],
            [120, 164, 7],
            [200, 164, 7],
          ].map(([cx, cy, r]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={S} stroke={A} strokeWidth="2" />
          ))}
          <circle cx="160" cy="90" r="24" fill={A} />
          <path d="M148 90h8l4-9 6 18 4-9h6" stroke="var(--accent-fg)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </>
      );
    case "ledger":
      return (
        <>
          <Window />
          <rect x="70" y="56" width="180" height="14" rx="4" fill={S2} />
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="70" y={78 + i * 20} width="180" height="14" rx="4" fill={i === 2 ? A : S2} opacity={i === 2 ? 0.95 : 1} />
              <rect x="78" y={83 + i * 20} width="44" height="4" rx="2" fill={i === 2 ? "var(--accent-fg)" : L} />
              <rect x="206" y={83 + i * 20} width="36" height="4" rx="2" fill={i === 2 ? "var(--accent-fg)" : L} />
            </g>
          ))}
          <rect x="78" y="61" width="30" height="4" rx="2" fill={M} opacity="0.6" />
        </>
      );
    case "terminal":
      return (
        <>
          <Window />
          <path d="M74 56l10 8-10 8" stroke={A} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <rect x="92" y="60" width="64" height="7" rx="3.5" fill={M} opacity="0.7" />
          <rect x="74" y="82" width="120" height="6" rx="3" fill={L} />
          <rect x="74" y="96" width="90" height="6" rx="3" fill={L} />
          <rect x="74" y="110" width="140" height="6" rx="3" fill={A} opacity="0.7" />
          <rect x="74" y="124" width="8" height="12" rx="2" fill={A} />
        </>
      );
    case "dashboard":
      return (
        <>
          <Window />
          <rect x="56" y="48" width="44" height="112" fill={S2} />
          <rect x="66" y="60" width="24" height="6" rx="3" fill={A} />
          <rect x="66" y="76" width="24" height="5" rx="2.5" fill={L} />
          <rect x="66" y="90" width="24" height="5" rx="2.5" fill={L} />
          {[26, 44, 34, 60, 48, 70].map((h, i) => (
            <rect key={i} x={116 + i * 24} y={148 - h} width="14" height={h} rx="3" fill={A} opacity={0.45 + i * 0.1} />
          ))}
          <rect x="116" y="58" width="60" height="8" rx="4" fill={L} />
          <rect x="116" y="72" width="36" height="5" rx="2.5" fill={S2} />
        </>
      );
    default: // "code"
      return (
        <>
          <Window />
          {[
            [74, 56, 60, A],
            [86, 70, 90, L],
            [86, 84, 70, L],
            [98, 98, 110, M],
            [86, 112, 54, L],
            [74, 126, 40, A],
          ].map(([x, y, w, fill], i) => (
            <rect key={i} x={x as number} y={y as number} width={w as number} height="6" rx="3" fill={fill as string} opacity={fill === M ? 0.55 : 1} />
          ))}
          <g stroke={A} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <circle cx="240" cy="110" r="5" />
            <circle cx="240" cy="136" r="5" />
            <circle cx="256" cy="122" r="5" />
            <path d="M240 115v16M256 117c0 6-16 4-16 10" />
          </g>
        </>
      );
  }
}
