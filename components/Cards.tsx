import Link from "next/link";
import { Avatar } from "./Placeholder";
import type { Person } from "@/lib/data";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  light = false,
  center = false,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <div className={`mb-10 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <p className={`eyebrow ${light ? "eyebrow-light" : ""} ${center ? "justify-center" : ""}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-display text-3xl font-semibold leading-tight md:text-[42px] ${light ? "text-white" : "text-charcoal-900"}`}>{title}</h2>
      {sub && <p className={`mt-4 text-[15px] leading-relaxed ${light ? "text-mist-300" : "text-mist-600"}`}>{sub}</p>}
    </div>
  );
}

export function ProfileCard({
  person,
  palette = "maroon",
  size = "md",
  compact = false,
}: {
  person: Person;
  palette?: "maroon" | "charcoal" | "green";
  size?: "sm" | "md" | "lg";
  compact?: boolean;
}) {
  return (
    <article className="group border border-mist-200 bg-white transition hover:border-maroon-500 hover:shadow-lg">
      <Avatar name={person.name} palette={palette} size={size} />
      <div className={compact ? "p-3.5" : "p-4"}>
        <h3 className={`font-display ${compact ? "text-sm" : "text-base"} font-semibold text-charcoal-900`}>{person.name}</h3>
        <p className={`mt-1 ${compact ? "text-[10.5px]" : "text-[11px]"} font-semibold uppercase tracking-[0.14em] text-maroon-700`}>
          {person.short ?? person.role}
        </p>
        {!compact && person.role && person.short && (
          <p className="mt-1 text-[12px] text-mist-600">{person.role}</p>
        )}
        {person.bio && <p className="mt-2 text-[13px] leading-relaxed text-mist-600">{person.bio}</p>}
      </div>
    </article>
  );
}

// Featured principal message card — big, warm, photo + signature.
export function PrincipalMessageCard({ person }: { person: Person }) {
  return (
    <article className="grid gap-0 overflow-hidden border border-mist-200 bg-white md:grid-cols-[240px_1fr]">
      <div className="relative">
        <Avatar name={person.name} palette="maroon" size="lg" ratio="aspect-square md:aspect-auto md:h-full" />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-maroon-100">Message from the Principal</p>
        </div>
      </div>
      <div className="p-6 md:p-8">
        <p className="eyebrow">Welcome</p>
        <blockquote className="mt-3 font-display text-[17px] leading-relaxed text-charcoal-800 md:text-[19px]">
          {person.message?.split("\n\n").map((para, i) => (
            <p key={i} className={i > 0 ? "mt-3" : ""}>{para}</p>
          ))}
        </blockquote>
        <div className="mt-5 flex items-center gap-3 border-t border-mist-200 pt-4">
          <div className="h-10 w-10">
            <Avatar name={person.name} palette="maroon" size="sm" />
          </div>
          <div>
            <p className="font-display text-base font-semibold text-charcoal-900">{person.name}</p>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-maroon-700">{person.role}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function MessageCard({ person }: { person: Person }) {
  return (
    <article className="rule-card">
      <p className="text-xs font-semibold uppercase tracking-wider text-maroon-700">{person.role}</p>
      <blockquote className="mt-3 font-display text-lg leading-relaxed text-charcoal-800">
        &ldquo;{person.message}&rdquo;
      </blockquote>
      <p className="mt-4 text-sm font-semibold text-charcoal-900">{person.name}</p>
    </article>
  );
}

export function LinkTile({ href, title, desc, cta = "Open" }: { href: string; title: string; desc: string; cta?: string }) {
  return (
    <Link href={href} className="group rule-card block hover:border-maroon-500 hover:shadow-md">
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

// KCSE performer card — grade badge + portrait + name.
export function PerformerCard({ position, grade, name = "Learner name", note, destination }: {
  position: string; grade: string; name?: string; note?: string; destination?: string;
}) {
  return (
    <article className="group relative overflow-hidden border border-mist-200 bg-white transition hover:border-maroon-500 hover:shadow-lg">
      <div className="relative">
        <Avatar name={name} palette="maroon" size="lg" />
        <div className="absolute right-3 top-3 grid h-14 w-14 place-items-center bg-white shadow-md ring-2 ring-maroon-700">
          <span className="font-display text-xl font-bold text-maroon-700">{grade}</span>
        </div>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-maroon-100">{position}</p>
          <p className="mt-1 font-display text-sm font-semibold text-white">{name}</p>
        </div>
      </div>
      <div className="p-4">
        {note && <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-700">{note}</p>}
        {destination && <p className="mt-1 text-[13px] text-mist-600">{destination}</p>}
      </div>
    </article>
  );
}

// Leadership hierarchy tier — displays a row of ProfileCards under a title.
export function HierarchyTier({
  tier,
  people,
  palette = "maroon",
  connector = false,
}: {
  tier: string;
  people: Person[];
  palette?: "maroon" | "charcoal" | "green";
  connector?: boolean;
}) {
  return (
    <div className="relative">
      {connector && (
        <div className="absolute left-1/2 -top-8 h-8 w-px -translate-x-1/2 bg-maroon-500" aria-hidden />
      )}
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px flex-1 bg-mist-200" aria-hidden />
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-maroon-700">{tier}</p>
        <span className="h-px flex-1 bg-mist-200" aria-hidden />
      </div>
      <div className={`grid gap-4 ${people.length === 1 ? "mx-auto max-w-xs" : people.length === 2 ? "sm:grid-cols-2 mx-auto max-w-2xl" : people.length === 3 ? "sm:grid-cols-2 md:grid-cols-3" : "sm:grid-cols-2 md:grid-cols-4"}`}>
        {people.map((p) => <ProfileCard key={p.name + p.role} person={p} palette={palette} compact />)}
      </div>
    </div>
  );
}
