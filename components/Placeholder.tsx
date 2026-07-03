// ============================================================
// Media + Avatar placeholders. Designed so that even without
// real photos the page looks intentional and premium.
// - Media: photo-frame with subtle grid + centered label.
// - Avatar: initials on a deterministic maroon/charcoal gradient.
//   When a real portrait `src` is passed, it renders that instead.
// ============================================================

export function Media({
  label,
  ratio = "aspect-[4/3]",
  dark = false,
  src,
  overlay = false,
}: {
  label: string;
  ratio?: string;
  dark?: boolean;
  src?: string;
  overlay?: boolean;
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
    <div
      className={`relative grid ${ratio} w-full place-items-center overflow-hidden ${
        dark ? "bg-gradient-to-br from-charcoal-800 to-charcoal-900" : "bg-gradient-to-br from-mist-100 to-mist-200"
      }`}
      role="img"
      aria-label={`${label} — photo placeholder`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.09]" aria-hidden="true">
        <defs>
          <pattern id="ph" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0v32" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ph)" />
      </svg>
      <div className="relative px-4 text-center">
        <svg viewBox="0 0 24 24" className={`mx-auto mb-2 h-8 w-8 ${dark ? "text-mist-500" : "text-mist-400"}`} fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="1" /><circle cx="9" cy="10" r="1.6" /><path d="m5 17 4.5-4.5 3 3L16 12l3 5" />
        </svg>
        <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-mist-400" : "text-mist-500"}`}>{label}</p>
      </div>
      {overlay && <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/85 via-charcoal-900/30 to-transparent" />}
    </div>
  );
}

// Deterministic initials + gradient. Placeholders that look intentional.
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
  return (
    <div
      className={`relative grid ${ratio} w-full place-items-center overflow-hidden`}
      style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      role="img"
      aria-label={`${name} — portrait placeholder`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-15" aria-hidden="true">
        <defs>
          <pattern id={`av-${name.replace(/[^A-Za-z]/g, "")}`} width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#av-${name.replace(/[^A-Za-z]/g, "")})`} />
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      <span className={`relative font-display font-semibold text-white/95 ${textSize} tracking-wide`}>
        {initials(name)}
      </span>
    </div>
  );
}
