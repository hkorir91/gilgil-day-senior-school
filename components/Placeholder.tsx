/** Media placeholder — replace with real <Image> / <video> when assets are ready. */
export function Media({ label, ratio = "aspect-[4/3]", dark = false }: { label: string; ratio?: string; dark?: boolean }) {
  return (
    <div
      className={`relative grid ${ratio} w-full place-items-center overflow-hidden border ${
        dark ? "border-white/10 bg-charcoal-800" : "border-mist-200 bg-mist-100"
      }`}
      role="img"
      aria-label={`${label} — photo placeholder`}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
        <defs>
          <pattern id="p" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0v28" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#p)" />
      </svg>
      <div className="relative px-4 text-center">
        <svg viewBox="0 0 24 24" className={`mx-auto mb-2 h-7 w-7 ${dark ? "text-mist-500" : "text-mist-300"}`} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="1" /><circle cx="9" cy="10" r="1.6" /><path d="m5 17 4.5-4.5 3 3L16 12l3 5" />
        </svg>
        <p className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${dark ? "text-mist-500" : "text-mist-500"}`}>{label}</p>
      </div>
    </div>
  );
}

export function Avatar({ name }: { name: string }) {
  return (
    <div className="grid aspect-square w-full place-items-center border border-mist-200 bg-mist-100" role="img" aria-label={`${name} — portrait placeholder`}>
      <svg viewBox="0 0 24 24" className="h-10 w-10 text-mist-300" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="8.2" r="3.6" /><path d="M4.5 20a7.5 7.5 0 0 1 15 0Z" />
      </svg>
    </div>
  );
}
