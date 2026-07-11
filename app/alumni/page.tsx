"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { SectionHeading, PerformerCard, Notice } from "@/components/Cards";
import { Media, Avatar } from "@/components/Placeholder";
import { kcse2025, kcseHistory } from "@/lib/data";
import { useContent } from "@/lib/content";

export default function Alumni() {
  const { achievers, settings } = useContent();
  const [sent, setSent] = useState(false);
  const [activeYear, setActiveYear] = useState(kcseHistory[0].year);
  const current = kcseHistory.find((k) => k.year === activeYear) ?? kcseHistory[0];

  return (
    <>
      <PageHeader
        eyebrow="Alumni"
        title="Once of Gilgil Day, always of Gilgil Day."
        intro="Former students strengthen the school through stories, mentorship and contributions. This is also where we celebrate our KCSE performers — the candidates whose grades opened doors to university."
      />

      {/* ============ KCSE 2025 TOP PERFORMERS ============ */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Colourful gradient backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-maroon-50 via-amber-50 to-emerald-50" aria-hidden />
        <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-amber-200/40 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-emerald-200/40 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-200/30 blur-3xl" aria-hidden />

        <div className="shell relative">
          {/* Colourful header */}
          <div className="mb-10 text-center">
            <p className="inline-block bg-gradient-to-r from-maroon-700 via-amber-600 to-emerald-700 bg-clip-text text-[11px] font-semibold uppercase tracking-[0.28em] text-transparent">
              {settings.achievers_headline || kcse2025.headline}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-charcoal-900 md:text-5xl">
              Congratulations to the <span className="bg-gradient-to-r from-maroon-700 to-amber-600 bg-clip-text text-transparent">Class of 2025</span>.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-charcoal-700">
              {settings.achievers_summary || kcse2025.summary}
            </p>
          </div>

          {/* Stats strip */}
          <div className="mx-auto mb-14 grid max-w-3xl grid-cols-3 gap-4">
            {(["B", "B-", "C+"] as const).map((band) => {
              const count = achievers.filter((p) => (p.grade || "").trim().toUpperCase() === band).length;
              const cls = band === "B" ? "from-yellow-500 to-amber-500" : band === "B-" ? "from-emerald-600 to-emerald-400" : "from-sky-600 to-sky-400";
              return (
                <div key={band} className="border border-white/60 bg-white/70 p-5 text-center shadow-sm backdrop-blur">
                  <p className={`bg-gradient-to-r ${cls} bg-clip-text font-display text-4xl font-bold text-transparent`}>{count}</p>
                  <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal-700">Grade {band}</p>
                </div>
              );
            })}
          </div>

          {/* Grade-grouped grids */}
          {(() => {
            const groups: { band: string; label: string; ring: string; heading: string }[] = [
              { band: "B",  label: "Grade B — Top Achievers",        ring: "border-l-4 border-yellow-500",  heading: "text-yellow-800" },
              { band: "B-", label: "Grade B- — University-Bound",    ring: "border-l-4 border-emerald-500", heading: "text-emerald-800" },
              { band: "C+", label: "Grade C+ — University Threshold",ring: "border-l-4 border-sky-500",     heading: "text-sky-800" },
            ];
            return (
              <div className="space-y-12">
                {groups.map((grp) => {
                  const list = achievers.filter((p) => (p.grade || "").trim().toUpperCase() === grp.band);
                  if (list.length === 0) return null;
                  return (
                    <div key={grp.band}>
                      <div className={`mb-5 flex items-baseline gap-3 pl-4 ${grp.ring}`}>
                        <h3 className={`font-display text-xl font-semibold md:text-2xl ${grp.heading}`}>{grp.label}</h3>
                        <span className="text-[13px] font-semibold text-charcoal-600">({list.length})</span>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {list.map((p) => (
                          <PerformerCard
                            key={p.position}
                            position={p.position}
                            grade={p.grade}
                            note={p.note || undefined}
                            destination={p.destination || undefined}
                            photo={p.photo || undefined}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}

          {/* Photo upload hint */}
          <div className="mx-auto mt-14 max-w-3xl border border-dashed border-maroon-300 bg-white/80 p-5 text-center text-[13px] leading-relaxed text-charcoal-700 backdrop-blur">
            📸 <strong>Adding learner photos:</strong> sign in to the Admin dashboard → <strong>List of Achievers</strong> → click <strong>Edit</strong> on a learner → <strong>Upload photo</strong>. The portrait replaces the initials placeholder instantly.
          </div>
        </div>
      </section>

      {/* ============ KCSE 5-YEAR HISTORY ============ */}
      <section className="bg-mist-50 py-16 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Five-Year KCSE Record"
            title="Our university-bound candidates, year on year."
            sub="Each year we profile the candidates who transitioned to university — their KCSE grade, their chosen course, and their placement. Photos, names and destinations are uploaded from the Admin dashboard."
          />

          {/* Year tabs */}
          <div className="flex flex-wrap gap-2">
            {kcseHistory.map((k) => (
              <button
                key={k.year}
                onClick={() => setActiveYear(k.year)}
                className={`border px-5 py-2.5 text-sm font-semibold uppercase tracking-wide transition ${
                  activeYear === k.year
                    ? "border-maroon-700 bg-maroon-700 text-white"
                    : "border-mist-300 bg-white text-charcoal-800 hover:border-maroon-500 hover:text-maroon-700"
                }`}
              >
                KCSE {k.year}
              </button>
            ))}
          </div>

          {/* Year summary strip */}
          <div className="mt-6 grid grid-cols-2 gap-4 border border-mist-200 bg-white p-6 md:grid-cols-4">
            <YearStat label="Year" value={String(current.year)} />
            <YearStat label="Candidates" value={current.candidates ? String(current.candidates) : "TBA"} />
            <YearStat label="School Mean" value={current.mean} />
            <YearStat label="Joined University" value={current.universityJoiners ? String(current.universityJoiners) : "TBA"} />
          </div>

          {/* Performer cards for selected year */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {current.featured.map((p, i) => (
              <article key={i} className="group overflow-hidden border border-mist-200 bg-white transition hover:border-maroon-500 hover:shadow-lg">
                <div className="relative">
                  <Avatar name={`Class ${current.year} student ${i + 1}`} palette="maroon" size="lg" />
                  <div className="absolute right-3 top-3 grade-badge">{p.grade}</div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-maroon-100">Class of {current.year}</p>
                    <p className="mt-0.5 font-display text-sm font-semibold text-white">Learner name — pending upload</p>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-maroon-700">{p.course}</p>
                  <p className="mt-1 text-[13px] text-mist-600">{p.university}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8">
            <Notice>Names, portraits and destinations are uploaded by administration. The layout is ready and updates automatically as data is added.</Notice>
          </div>
        </div>
      </section>

      {/* ============ ALUMNI STORIES + REGISTRATION ============ */}
      <section className="shell grid gap-10 py-16 lg:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          <SectionHeading eyebrow="Alumni Stories" title="Where our former students are now" />
          <div className="grid gap-5 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <article key={i} className="rule-card">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-mist-500">Alumni story</p>
                <h3 className="mt-1 font-display text-lg font-semibold">Story placeholder {i}</h3>
                <p className="mt-2 text-sm text-mist-600">A former student's journey from Gilgil Day into study, work or enterprise. Stories are collected via the registration form.</p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rule-card">
              <h3 className="font-display text-lg font-semibold">Mentorship</h3>
              <p className="mt-2 text-sm text-mist-600">Alumni mentor current learners on careers and pathways — coordinated with the Dean of Academics.</p>
            </div>
            <div className="rule-card">
              <h3 className="font-display text-lg font-semibold">Contribute</h3>
              <p className="mt-2 text-sm text-mist-600">Support bursaries, learning materials and school projects through the Support page.</p>
              <a href="/support" className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-maroon-700">Support a student →</a>
            </div>
          </div>
          <div className="mt-10">
            <SectionHeading eyebrow="Alumni Gallery" title="Through the years" />
            <div className="grid grid-cols-3 gap-3">
              <Media label="Alumni event" ratio="aspect-square" kind="assembly" />
              <Media label="Class reunion" ratio="aspect-square" kind="book" />
              <Media label="Mentorship day" ratio="aspect-square" kind="classroom" />
            </div>
          </div>
        </div>
        <aside className="h-fit border border-mist-200 bg-white p-6 lg:sticky lg:top-32">
          <h3 className="font-display text-xl font-semibold">Alumni registration</h3>
          {sent ? (
            <p className="mt-4 border-l-2 border-maroon-700 bg-mist-50 p-4 text-sm">Registered (demo). Real registrations will be stored once the backend is connected.</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {["Full name", "Year completed / class", "Phone or email", "Current occupation / study"].map((l) => (
                <div key={l}><label className="label">{l}</label><input className="input" /></div>
              ))}
              <div><label className="label">Your short story (optional)</label><textarea className="input min-h-[90px]" /></div>
              <button onClick={() => setSent(true)} className="btn-maroon">Register as alumni</button>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}

function YearStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mist-500">{label}</p>
      <p className="mt-1 font-display text-2xl font-semibold text-charcoal-900">{value}</p>
    </div>
  );
}
