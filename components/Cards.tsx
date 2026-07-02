import Link from "next/link";
import { Avatar } from "./Placeholder";
import type { Person } from "@/lib/data";

export function SectionHeading({ eyebrow, title, sub, light = false }: { eyebrow: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="mb-10 max-w-2xl">
      <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-2xl font-semibold md:text-4xl ${light ? "text-white" : "text-charcoal-900"}`}>{title}</h2>
      {sub && <p className={`mt-3 text-[15px] leading-relaxed ${light ? "text-mist-300" : "text-mist-600"}`}>{sub}</p>}
    </div>
  );
}

export function ProfileCard({ person }: { person: Person }) {
  return (
    <article className="border border-mist-200 bg-white">
      <Avatar name={person.name} />
      <div className="p-4">
        <h3 className="font-display text-base font-semibold text-charcoal-900">{person.name}</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-maroon-700">{person.role}</p>
        {person.bio && <p className="mt-2 text-[13px] leading-relaxed text-mist-600">{person.bio}</p>}
      </div>
    </article>
  );
}

export function MessageCard({ person }: { person: Person }) {
  return (
    <article className="rule-card">
      <p className="text-xs font-semibold uppercase tracking-wider text-maroon-700">{person.role}</p>
      <blockquote className="mt-3 font-display text-lg leading-relaxed text-charcoal-800">
        “{person.message}”
      </blockquote>
      <p className="mt-4 text-sm font-semibold text-charcoal-900">{person.name}</p>
    </article>
  );
}

export function LinkTile({ href, title, desc, cta = "Open" }: { href: string; title: string; desc: string; cta?: string }) {
  return (
    <Link href={href} className="group rule-card block hover:border-maroon-500">
      <h3 className="font-display text-lg font-semibold text-charcoal-900 group-hover:text-maroon-700">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-mist-600">{desc}</p>
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-maroon-700">{cta} →</p>
    </Link>
  );
}

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <p className="border border-dashed border-mist-300 bg-mist-50 px-4 py-3 text-[13px] text-mist-600">
      {children}
    </p>
  );
}
