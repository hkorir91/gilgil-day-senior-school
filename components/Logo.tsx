import Link from "next/link";

/** Placeholder crest — swap the inner <svg> for the real school logo image later. */
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Gilgil Day Senior School — Home">
      <span className="grid h-11 w-11 shrink-0 place-items-center bg-maroon-700">
        <svg viewBox="0 0 40 40" className="h-7 w-7" aria-hidden="true">
          <path d="M20 4 34 11v8c0 9-6 15-14 17C12 34 6 28 6 19v-8l14-7Z" fill="none" stroke="#fff" strokeWidth="2.4" />
          <path d="M13 20h14M20 13v14" stroke="#fff" strokeWidth="2.4" />
        </svg>
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-[15px] font-semibold ${light ? "text-white" : "text-charcoal-900"}`}>
          Gilgil Day Senior School
        </span>
        <span className={`block text-[10px] uppercase tracking-[0.28em] ${light ? "text-mist-300" : "text-mist-600"}`}>
          Knowledge is Power
        </span>
      </span>
    </Link>
  );
}
