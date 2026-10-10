// Small decorative SVG "stickers" used to give every scene a layered,
// scrapbook-collage feel — bunting, balloons, stars, a disco ball, etc.
// Kept in the project's own palette rather than literal rainbow colors.

export function StarSticker({ color = "#D6305C", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 2 L24.5 15 L38 15 L27 23.5 L31 37 L20 28.5 L9 37 L13 23.5 L2 15 L15.5 15 Z"
        fill={color}
      />
    </svg>
  );
}

export function SparkleSticker({ color = "#F6A9BD", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" fill={color} />
    </svg>
  );
}

export function HeartSticker({ color = "#D6305C", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 21s-7-5.2-9.5-9.5C.5 7.6 3.2 4 7 4c2 0 3.8 1.1 5 2.8C13.2 5.1 15 4 17 4c3.8 0 6.5 3.6 4.5 7.5C19 15.8 12 21 12 21z"
        fill={color}
      />
    </svg>
  );
}

export function BalloonSticker({
  color = "#D6305C",
  pattern,
  className = "",
}: {
  color?: string;
  pattern?: "dots" | "stripes";
  className?: string;
}) {
  const patternId = `balloon-${color.replace("#", "")}-${pattern ?? "plain"}`;
  return (
    <svg viewBox="0 0 60 110" className={className} aria-hidden="true">
      {pattern === "dots" && (
        <pattern id={patternId} width="10" height="10" patternUnits="userSpaceOnUse">
          <rect width="10" height="10" fill={color} />
          <circle cx="5" cy="5" r="1.8" fill="white" opacity="0.5" />
        </pattern>
      )}
      {pattern === "stripes" && (
        <pattern id={patternId} width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="10" height="10" fill={color} />
          <rect width="5" height="10" fill="white" opacity="0.25" />
        </pattern>
      )}
      <ellipse cx="30" cy="38" rx="26" ry="34" fill={pattern ? `url(#${patternId})` : color} />
      <ellipse cx="22" cy="24" rx="7" ry="10" fill="white" opacity="0.25" />
      <path d="M30 72 L25 80 L35 80 Z" fill={color} />
      <path d="M30 80 Q26 92 30 108" stroke={color} strokeWidth="1.5" fill="none" opacity="0.6" />
    </svg>
  );
}

export function PartyHatSticker({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 100" className={className} aria-hidden="true">
      <path d="M40 4 L72 92 L8 92 Z" fill="#D6305C" />
      <path d="M40 4 L72 92 L8 92 Z" fill="url(#hat-dots)" />
      <pattern id="hat-dots" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#D6305C" />
        <circle cx="6" cy="6" r="2.4" fill="#E3D2FF" />
      </pattern>
      <circle cx="40" cy="4" r="7" fill="#FFF3DD" />
      <circle cx="40" cy="4" r="7" fill="none" stroke="#D6305C" strokeWidth="1.5" />
    </svg>
  );
}

export function DiscoBallSticker({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} aria-hidden="true">
      <line x1="50" y1="0" x2="50" y2="18" stroke="#3D2418" strokeWidth="2" />
      <circle cx="50" cy="60" r="40" fill="#F6A9BD" />
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => {
          const angle = (col / 10) * Math.PI * 2;
          const r = 40 - row * 6.5;
          const cx = 50 + r * Math.cos(angle);
          const cy = 60 - 33 + row * 11.5 + r * 0.12 * Math.sin(angle);
          return <rect key={`${row}-${col}`} x={cx - 2.2} y={cy - 2.2} width="4.4" height="4.4" fill="#FFF3DD" opacity={0.5 + (row % 2) * 0.3} />;
        })
      )}
      <circle cx="50" cy="60" r="40" fill="none" stroke="#3D2418" strokeOpacity="0.15" strokeWidth="1" />
    </svg>
  );
}

export function BuntingBanner({ className = "", colors }: { className?: string; colors?: string[] }) {
  const palette = colors ?? ["#D6305C", "#1F9D6E", "#F6A9BD", "#D6305C", "#1F9D6E", "#F6A9BD", "#D6305C"];
  const flagWidth = 60;
  const width = flagWidth * palette.length;
  return (
    <svg viewBox={`0 0 ${width} 70`} className={className} preserveAspectRatio="none" aria-hidden="true">
      <path d={`M0 2 Q${width / 2} 20 ${width} 2`} stroke="#3D2418" strokeOpacity="0.3" strokeWidth="2" fill="none" />
      {palette.map((c, i) => {
        const x = i * flagWidth + flagWidth / 2;
        const y = 2 + 18 * Math.sin((i / (palette.length - 1)) * Math.PI);
        return (
          <polygon
            key={i}
            points={`${x - flagWidth / 2 + 6},${y} ${x + flagWidth / 2 - 6},${y} ${x},${y + 46}`}
            fill={c}
          />
        );
      })}
    </svg>
  );
}

export function PawPrintSticker({ color = "#3D2418", className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <ellipse cx="20" cy="27" rx="11" ry="9" fill={color} opacity="0.6" />
      <ellipse cx="8" cy="14" rx="4.5" ry="5.5" fill={color} opacity="0.6" />
      <ellipse cx="18" cy="8" rx="4.5" ry="5.5" fill={color} opacity="0.6" />
      <ellipse cx="29" cy="10" rx="4.2" ry="5.2" fill={color} opacity="0.6" />
      <ellipse cx="34" cy="20" rx="4" ry="5" fill={color} opacity="0.6" />
    </svg>
  );
}

export type Sticker = {
  node: React.ReactNode;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  width: number;
  rotate?: number;
  animation?: "float-slow" | "sway-slow" | "spin-slow" | "twinkle" | "bob-slow" | "none";
  delay?: number;
  opacity?: number;
  z?: number;
};

export function StickerField({ stickers, className = "" }: { stickers: Sticker[]; className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {stickers.map((s, i) => (
        <div
          key={i}
          className={`absolute ${s.animation && s.animation !== "none" ? s.animation : ""}`}
          style={{
            top: s.top,
            left: s.left,
            right: s.right,
            bottom: s.bottom,
            width: s.width,
            transform: s.rotate ? `rotate(${s.rotate}deg)` : undefined,
            animationDelay: s.delay ? `${s.delay}s` : undefined,
            opacity: s.opacity ?? 1,
            zIndex: s.z ?? 0,
          }}
        >
          {s.node}
        </div>
      ))}
    </div>
  );
}
