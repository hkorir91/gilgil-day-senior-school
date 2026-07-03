// ============================================================
// Media + Avatar placeholders. When src is provided → real image.
// Without src → designed art (Kenyan landscape gradients,
// architectural motifs, textural depth) that feels intentional.
// ============================================================

type MediaKind =
  | "hero"        // sunrise landscape (Rift Valley palette)
  | "compound"    // architectural building silhouette
  | "classroom"   // interior — desks + chalkboard motif
  | "lab"         // beakers + gridlines
  | "field"       // green field + sky
  | "assembly"    // crowd silhouettes
  | "book"        // open book motif
  | "generic";    // grid pattern (fallback)

export function Media({
  label,
  ratio = "aspect-[4/3]",
  dark = false,
  src,
  overlay = false,
  kind = "generic",
}: {
  label: string;
  ratio?: string;
  dark?: boolean;
  src?: string;
  overlay?: boolean;
  kind?: MediaKind;
}) {
  if (src) {
    return (
      <div className={`relative ${ratio} w-full overflow-hidden`}>
        <img src={src} alt={label} className="h-full w-full object-cover" />
        {overlay && <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/30 to-transparent" />}
      </div>
    );
  }
  return (
    <div className={`relative ${ratio} w-full overflow-hidden`} role="img" aria-label={`${label} — designed placeholder`}>
      <ArtLayer kind={kind} dark={dark} />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3">
        <p className={`text-[10px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-white/80" : "text-white/90"} drop-shadow`}>{label}</p>
        <span className={`text-[9px] uppercase tracking-[0.2em] ${dark ? "text-white/50" : "text-white/70"} drop-shadow`}>Photo pending</span>
      </div>
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/30 to-transparent" />}
    </div>
  );
}

// Designed background layer per kind — Rift Valley-inspired colour language.
function ArtLayer({ kind, dark }: { kind: MediaKind; dark: boolean }) {
  switch (kind) {
    case "hero":
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6c68a" />
              <stop offset="0.55" stopColor="#c46a4a" />
              <stop offset="1" stopColor="#5b1f2a" />
            </linearGradient>
            <linearGradient id="ridge1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#3a1a24" />
              <stop offset="1" stopColor="#2a1218" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#sky)" />
          <circle cx="620" cy="180" r="52" fill="#ffd9a4" opacity="0.85" />
          {/* Rift Valley ridges */}
          <path d="M0 340 L120 300 L220 330 L340 285 L470 320 L600 290 L800 315 L800 500 L0 500 Z" fill="#6b1e2c" opacity="0.85" />
          <path d="M0 380 L140 355 L280 380 L410 350 L560 375 L720 355 L800 370 L800 500 L0 500 Z" fill="url(#ridge1)" />
          <path d="M0 430 L200 415 L400 430 L620 410 L800 425 L800 500 L0 500 Z" fill="#1a0d12" />
        </svg>
      );
    case "compound":
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="csky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f4e6c8" />
              <stop offset="1" stopColor="#d9c7a1" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#csky)" />
          {/* distant hills */}
          <path d="M0 320 L120 290 L260 315 L400 285 L560 310 L720 290 L800 305 L800 500 L0 500 Z" fill="#8a6f4a" opacity="0.4" />
          {/* main school block */}
          <rect x="120" y="240" width="360" height="160" fill="#6E1423" />
          <rect x="480" y="270" width="220" height="130" fill="#8B1B2E" />
          {/* windows */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={`w1-${i}`} x={140 + i * 55} y="270" width="30" height="35" fill="#f4e6c8" opacity="0.9" />
          ))}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={`w2-${i}`} x={140 + i * 55} y="325" width="30" height="35" fill="#f4e6c8" opacity="0.9" />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <rect key={`w3-${i}`} x={500 + i * 50} y="295" width="26" height="30" fill="#f4e6c8" opacity="0.9" />
          ))}
          {/* roof lines */}
          <polygon points="120,240 300,200 480,240" fill="#3a1a24" />
          <polygon points="480,270 590,240 700,270" fill="#3a1a24" />
          {/* ground */}
          <rect x="0" y="400" width="800" height="100" fill="#8B6F47" />
          <rect x="0" y="400" width="800" height="10" fill="#3a2818" />
          {/* flagpole */}
          <line x1="300" y1="240" x2="300" y2="140" stroke="#3a1a24" strokeWidth="3" />
          <rect x="300" y="140" width="34" height="22" fill="#6E1423" />
        </svg>
      );
    case "classroom":
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <rect width="800" height="500" fill="#e8dfcf" />
          {/* back wall gradient */}
          <rect width="800" height="500" fill="url(#cw)" />
          <defs>
            <linearGradient id="cw" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f0e6d2" />
              <stop offset="1" stopColor="#c9b98c" />
            </linearGradient>
          </defs>
          {/* chalkboard */}
          <rect x="180" y="90" width="440" height="180" fill="#1a2b1a" />
          <rect x="180" y="90" width="440" height="180" fill="none" stroke="#5c3a1e" strokeWidth="10" />
          {/* chalk text lines */}
          <line x1="220" y1="140" x2="380" y2="140" stroke="#fff" strokeWidth="2" opacity="0.7" />
          <line x1="220" y1="170" x2="440" y2="170" stroke="#fff" strokeWidth="2" opacity="0.6" />
          <line x1="220" y1="200" x2="360" y2="200" stroke="#fff" strokeWidth="2" opacity="0.6" />
          {/* desks in perspective */}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3, 4].map((col) => {
              const y = 320 + row * 40;
              const scale = 1 + row * 0.15;
              const x = 120 + col * (120 * scale) - row * 30;
              return <rect key={`d-${row}-${col}`} x={x} y={y} width={90 * scale} height={20} fill="#6b4a2a" opacity={0.9 - row * 0.15} />;
            })
          )}
          {/* floor */}
          <polygon points="0,470 800,470 800,500 0,500" fill="#8B6F47" />
        </svg>
      );
    case "lab":
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <rect width="800" height="500" fill="#e9edf1" />
          {/* grid */}
          <defs>
            <pattern id="gp" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0v40" fill="none" stroke="#c8d1db" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="800" height="500" fill="url(#gp)" opacity="0.6" />
          {/* bench */}
          <rect x="0" y="360" width="800" height="30" fill="#a08865" />
          <rect x="0" y="390" width="800" height="110" fill="#8b6f47" />
          {/* beakers */}
          <g transform="translate(200 250)">
            <path d="M0 30 L0 100 Q0 110 10 110 L60 110 Q70 110 70 100 L70 30 Z" fill="#6E1423" opacity="0.6" stroke="#3a1a24" strokeWidth="2" />
            <rect x="-5" y="20" width="80" height="10" fill="#3a1a24" />
          </g>
          <g transform="translate(340 220)">
            <path d="M0 40 L0 130 Q0 140 12 140 L78 140 Q90 140 90 130 L90 40 Z" fill="#3a5a7a" opacity="0.5" stroke="#1a2b3a" strokeWidth="2" />
            <rect x="-8" y="30" width="106" height="12" fill="#1a2b3a" />
          </g>
          <g transform="translate(500 260)">
            <circle cx="35" cy="70" r="35" fill="#c48a1a" opacity="0.55" stroke="#5a3a10" strokeWidth="2" />
            <rect x="30" y="20" width="10" height="20" fill="#5a3a10" />
          </g>
          {/* atom */}
          <g transform="translate(650 130)" opacity="0.35">
            <circle cx="0" cy="0" r="8" fill="#6E1423" />
            <ellipse cx="0" cy="0" rx="35" ry="12" fill="none" stroke="#3a1a24" strokeWidth="1.5" />
            <ellipse cx="0" cy="0" rx="35" ry="12" fill="none" stroke="#3a1a24" strokeWidth="1.5" transform="rotate(60)" />
            <ellipse cx="0" cy="0" rx="35" ry="12" fill="none" stroke="#3a1a24" strokeWidth="1.5" transform="rotate(-60)" />
          </g>
        </svg>
      );
    case "field":
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="fsky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#a7d3f0" />
              <stop offset="1" stopColor="#e8f2f8" />
            </linearGradient>
            <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4a7a3a" />
              <stop offset="1" stopColor="#2a5a20" />
            </linearGradient>
          </defs>
          <rect width="800" height="240" fill="url(#fsky)" />
          {/* clouds */}
          <ellipse cx="150" cy="80" rx="60" ry="12" fill="#fff" opacity="0.7" />
          <ellipse cx="550" cy="60" rx="80" ry="14" fill="#fff" opacity="0.6" />
          {/* distant hills */}
          <path d="M0 240 L200 195 L400 220 L600 200 L800 225 L800 260 L0 260 Z" fill="#8ba18a" opacity="0.6" />
          {/* field */}
          <rect x="0" y="240" width="800" height="260" fill="url(#grass)" />
          {/* field markings */}
          <ellipse cx="400" cy="440" rx="240" ry="30" fill="none" stroke="#fff" strokeWidth="2" opacity="0.5" />
          <line x1="400" y1="270" x2="400" y2="500" stroke="#fff" strokeWidth="2" opacity="0.4" />
          {/* goal post */}
          <rect x="380" y="290" width="40" height="4" fill="#fff" opacity="0.7" />
          <rect x="378" y="290" width="4" height="30" fill="#fff" opacity="0.7" />
          <rect x="418" y="290" width="4" height="30" fill="#fff" opacity="0.7" />
        </svg>
      );
    case "assembly":
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id="asky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f6d896" />
              <stop offset="1" stopColor="#c96a3a" />
            </linearGradient>
          </defs>
          <rect width="800" height="500" fill="url(#asky)" />
          {/* flag pole and building silhouette */}
          <rect x="0" y="220" width="800" height="120" fill="#3a1a24" opacity="0.85" />
          <rect x="395" y="60" width="4" height="180" fill="#1a0d12" />
          <rect x="399" y="60" width="40" height="26" fill="#6E1423" />
          {/* crowd silhouettes */}
          {[...Array(60)].map((_, i) => {
            const x = 40 + (i % 20) * 38;
            const y = 400 + Math.floor(i / 20) * 22;
            return <ellipse key={i} cx={x} cy={y} rx="12" ry="18" fill="#1a0d12" opacity={0.7 + (i % 3) * 0.1} />;
          })}
          <rect x="0" y="430" width="800" height="70" fill="#1a0d12" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
          <rect width="800" height="500" fill="#f0e8d8" />
          {/* open book */}
          <g transform="translate(150 100)">
            <path d="M0 40 Q250 0 500 40 L500 300 Q250 260 0 300 Z" fill="#6E1423" />
            <path d="M0 40 Q250 20 500 40 L500 300 Q250 280 0 300 Z" fill="#fff" opacity="0.95" />
            <line x1="250" y1="30" x2="250" y2="290" stroke="#6E1423" strokeWidth="3" />
            {/* text lines */}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={`l-${i}`} x1="30" y1={70 + i * 30} x2="230" y2={70 + i * 30} stroke="#3a1a24" strokeWidth="2" opacity="0.5" />
            ))}
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <line key={`r-${i}`} x1="270" y1={70 + i * 30} x2="470" y2={70 + i * 30} stroke="#3a1a24" strokeWidth="2" opacity="0.5" />
            ))}
          </g>
          {/* pencil */}
          <g transform="translate(560 380) rotate(-25)">
            <rect x="0" y="0" width="120" height="12" fill="#f4c430" />
            <polygon points="120,0 140,6 120,12" fill="#3a1a24" />
            <rect x="-15" y="0" width="15" height="12" fill="#c62828" />
          </g>
        </svg>
      );
    default:
      return (
        <div className={`absolute inset-0 ${dark ? "bg-gradient-to-br from-charcoal-800 to-charcoal-900" : "bg-gradient-to-br from-mist-100 to-mist-200"}`}>
          <svg className="absolute inset-0 h-full w-full opacity-[0.09]" aria-hidden="true">
            <defs>
              <pattern id="phg" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M32 0H0v32" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#phg)" />
          </svg>
        </div>
      );
  }
}

// ---------- Avatar (initials on maroon gradient) ----------
function initials(name: string) {
  const cleaned = name.replace(/[^A-Za-z ]/g, " ").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "GD";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function hueFor(name: string, palette: "maroon" | "charcoal" | "green") {
  let sum = 0;
  for (let i = 0; i < name.length; i++) sum = (sum + name.charCodeAt(i)) % 360;
  if (palette === "maroon") return { from: `hsl(${350 + (sum % 15)}, 55%, 22%)`, to: `hsl(${5 + (sum % 15)}, 60%, 32%)` };
  if (palette === "green") return { from: "hsl(150, 30%, 18%)", to: "hsl(160, 35%, 28%)" };
  return { from: "hsl(220, 12%, 15%)", to: "hsl(220, 12%, 28%)" };
}

export function Avatar({
  name,
  src,
  ratio = "aspect-square",
  palette = "maroon",
  size = "md",
}: {
  name: string;
  src?: string;
  ratio?: string;
  palette?: "maroon" | "charcoal" | "green";
  size?: "sm" | "md" | "lg";
}) {
  if (src) {
    return (
      <div className={`${ratio} w-full overflow-hidden`}>
        <img src={src} alt={`${name} portrait`} className="h-full w-full object-cover" />
      </div>
    );
  }
  const { from, to } = hueFor(name || "GD", palette);
  const textSize = size === "lg" ? "text-4xl" : size === "sm" ? "text-lg" : "text-2xl";
  const key = name.replace(/[^A-Za-z]/g, "") || "x";
  return (
    <div
      className={`relative grid ${ratio} w-full place-items-center overflow-hidden`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      role="img"
      aria-label={`${name} — portrait placeholder`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-15" aria-hidden="true">
        <defs>
          <pattern id={`av-${key}`} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#av-${key})`} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      <span className={`relative font-display font-semibold text-white/95 ${textSize} tracking-wide`}>
        {initials(name)}
      </span>
    </div>
  );
}
