import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Media, Avatar } from "@/components/Placeholder";
import { SectionHeading, ProfileCard, MessageCard, PrincipalMessageCard, HierarchyTier, Notice } from "@/components/Cards";
import { school, principal, leadership, governance, studentsCouncil } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About the school"
        title="A public day senior school with a clear direction."
        intro={`${school.name} is a ${school.type.toLowerCase()} in ${school.location}, currently serving Grade 10, Form 3 and Form 4 within the transition to Competency-Based Education.`}
      />

      {/* Profile, vision, mission, values */}
      <section className="shell grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <SectionHeading eyebrow="School profile" title={school.motto} />
          <p className="max-w-xl text-[15px] leading-relaxed text-mist-600">
            Gilgil Day Senior School is a public mixed day school in Gilgil Town, {school.constituency},
            {" "}{school.county}. Under the Competency-Based Education framework, the school hosts the
            senior school (Grade 10 onwards) while completing the 8-4-4 cycle with Form 3 and Form 4
            candidates. The school serves learners from Gilgil Town, Kikopey, Karunga, Kwa Muhia,
            Kongasis and the surrounding community.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rule-card">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-maroon-700">Vision</h3>
              <p className="mt-2 text-sm leading-relaxed">{school.vision}</p>
            </div>
            <div className="rule-card">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-maroon-700">Mission</h3>
              <p className="mt-2 text-sm leading-relaxed">{school.mission}</p>
            </div>
          </div>
          <div className="mt-5 rule-card">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-maroon-700">Core values</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {school.coreValues.map((v) => (
                <span key={v} className="border border-mist-200 bg-mist-50 px-3 py-1.5 text-[12px] font-semibold">{v}</span>
              ))}
            </div>
          </div>
          <div className="mt-5 rule-card">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-maroon-700">School identity</h3>
            <dl className="mt-3 grid grid-cols-2 gap-y-2 text-[13px]">
              <dt className="text-mist-500">Category</dt><dd className="font-medium text-charcoal-800">{school.category}</dd>
              <dt className="text-mist-500">County</dt><dd className="font-medium text-charcoal-800">{school.county}</dd>
              <dt className="text-mist-500">Constituency</dt><dd className="font-medium text-charcoal-800">{school.constituency}</dd>
              <dt className="text-mist-500">Region</dt><dd className="font-medium text-charcoal-800">{school.region}</dd>
              <dt className="text-mist-500">Postal</dt><dd className="font-medium text-charcoal-800">{school.poBox}</dd>
              <dt className="text-mist-500">Motto</dt><dd className="font-medium text-charcoal-800">{school.motto}</dd>
            </dl>
          </div>
        </div>
        <div className="grid content-start gap-4">
          <Media label="School compound" />
          <Media label="Morning assembly" ratio="aspect-[16/8]" />
        </div>
      </section>

      {/* Principal message */}
      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Principal's welcome" title={`A word from ${principal.name}`} />
          <PrincipalMessageCard person={principal} />
        </div>
      </section>

      {/* Governance messages */}
      <section className="shell py-16 md:py-20">
        <SectionHeading eyebrow="Governance voices" title="Board and Parents' Association" />
        <div className="grid gap-5 md:grid-cols-2">
          {governance.map((g) => <MessageCard key={g.role} person={g} />)}
        </div>
      </section>

      {/* ============ LEADERSHIP HIERARCHY ============ */}
      <section id="leadership" className="relative bg-charcoal-900 py-20 text-white md:py-28">
        <div className="absolute inset-0 opacity-[0.05]" aria-hidden>
          <svg className="h-full w-full"><defs><pattern id="lh" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0v40" fill="none" stroke="#fff" strokeWidth="1" /></pattern></defs><rect width="100%" height="100%" fill="url(#lh)" /></svg>
        </div>
        <div className="shell relative">
          <SectionHeading
            eyebrow="Leadership Hierarchy"
            title="How the school is organised."
            sub="Top-down accountability from the Board of Management and Parents' Association through executive leadership, academic leadership, pathway heads, track heads, coordinators, class teachers, non-teaching staff, the Students' Council and every learner. Each tier answers to the one above; each tier answers for the one below."
            light
            center
          />

          <div className="mx-auto max-w-5xl space-y-12">
            {/* Tier 1: Governance */}
            <div>
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px flex-1 bg-white/15" aria-hidden />
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-maroon-100">Tier 1 · Governance</p>
                <span className="h-px flex-1 bg-white/15" aria-hidden />
              </div>
              <div className="mx-auto grid max-w-2xl gap-4 sm:grid-cols-2">
                {leadership.governance.map((g) => (
                  <div key={g.name} className="border border-white/15 bg-white/[0.03] p-5 text-center backdrop-blur-sm">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-maroon-100">{g.short}</p>
                    <p className="mt-2 font-display text-lg font-semibold">{g.name}</p>
                    <p className="mt-1 text-[12px] text-mist-400">{g.role}</p>
                  </div>
                ))}
              </div>
            </div>

            <Connector />

            {/* Tier 2: Principal */}
            <div>
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px flex-1 bg-white/15" aria-hidden />
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-maroon-100">Tier 2 · Principal</p>
                <span className="h-px flex-1 bg-white/15" aria-hidden />
              </div>
              <div className="mx-auto max-w-xs">
                <div className="border-2 border-maroon-500 bg-white/[0.04] p-4 text-center">
                  <div className="mx-auto h-20 w-20 overflow-hidden ring-2 ring-maroon-500">
                    <Avatar name={principal.name} palette="maroon" size="sm" />
                  </div>
                  <p className="mt-3 font-display text-lg font-semibold">{principal.name}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon-100">{principal.role}</p>
                </div>
              </div>
            </div>

            <Connector />

            {/* Tier 3: Deputies */}
            <TierDark tier="Tier 3 · Deputy Principals" people={leadership.deputies} />

            <Connector />

            {/* Tier 4: DoS + Bursar */}
            <TierDark tier="Tier 4 · Dean of Academics · Bursar" people={leadership.academicLeadership} />

            <Connector />

            {/* Tier 5: Pathway Heads */}
            <TierDark tier="Tier 5 · Heads of Pathway" people={leadership.pathwayHeads} />

            <Connector />

            {/* Tier 6: Track Heads */}
            <TierDark tier="Tier 6 · Heads of Track / Subject" people={leadership.trackHeads} />

            <Connector />

            {/* Tier 7: Coordinators */}
            <TierDark tier="Tier 7 · Coordinators" people={leadership.coordinators} />

            <Connector />

            {/* Tier 8-10: Teachers/NTS/Council/Students */}
            <div>
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px flex-1 bg-white/15" aria-hidden />
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-maroon-100">Tier 8 – 10 · Staff · Council · Learners</p>
                <span className="h-px flex-1 bg-white/15" aria-hidden />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border border-white/15 bg-white/[0.03] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-maroon-100">Tier 8</p>
                  <p className="mt-2 font-display text-lg font-semibold">Teachers & Non-Teaching Staff</p>
                  <p className="mt-2 text-[13px] text-mist-400">Class teachers, subject teachers and all NTS (office, catering, grounds, security, support).</p>
                  <Link href="/staff" className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon-100 hover:text-white">See Staff Page →</Link>
                </div>
                <div className="border border-white/15 bg-white/[0.03] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-maroon-100">Tier 9</p>
                  <p className="mt-2 font-display text-lg font-semibold">Students' Council</p>
                  <p className="mt-2 text-[13px] text-mist-400">School Captain, Deputy Captains and Portfolio Captains — the learner voice across all cohorts.</p>
                  <Link href="/students-council" className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon-100 hover:text-white">See Council →</Link>
                </div>
                <div className="border border-white/15 bg-white/[0.03] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-maroon-100">Tier 10</p>
                  <p className="mt-2 font-display text-lg font-semibold">Students</p>
                  <p className="mt-2 text-[13px] text-mist-400">Every Grade 10, Form 3 and Form 4 learner. The reason for every tier above.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Notice><span className="text-mist-400">Portraits will be swapped in as the school uploads official photos via the Admin dashboard.</span></Notice>
          </div>
        </div>
      </section>
    </>
  );
}

function Connector() {
  return <div className="mx-auto h-8 w-px bg-gradient-to-b from-maroon-500/70 to-white/10" aria-hidden />;
}

function TierDark({ tier, people }: { tier: string; people: { name: string; role: string; short?: string }[] }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-center gap-3">
        <span className="h-px flex-1 bg-white/15" aria-hidden />
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-maroon-100">{tier}</p>
        <span className="h-px flex-1 bg-white/15" aria-hidden />
      </div>
      <div className={`mx-auto grid gap-4 ${people.length === 2 ? "max-w-2xl sm:grid-cols-2" : people.length === 3 ? "max-w-3xl sm:grid-cols-3" : "max-w-4xl sm:grid-cols-2 md:grid-cols-4"}`}>
        {people.map((p) => (
          <div key={p.name + p.role} className="border border-white/15 bg-white/[0.03] p-4 text-center transition hover:border-maroon-500 hover:bg-white/[0.06]">
            <div className="mx-auto h-14 w-14 overflow-hidden">
              <Avatar name={p.name} palette="maroon" size="sm" />
            </div>
            <p className="mt-3 font-display text-sm font-semibold leading-tight">{p.name}</p>
            <p className="mt-1 text-[10.5px] font-semibold uppercase tracking-[0.14em] text-maroon-100">{p.short ?? p.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
