import Link from "next/link";
import { Media, Avatar } from "@/components/Placeholder";
import { SectionHeading, LinkTile, PrincipalMessageCard, ProfileCard } from "@/components/Cards";
import { school, pathways, news, principal, leadership, clubs, kcse2025, kcseHistory, sitePhotos } from "@/lib/data";

export default function Home() {
  const featured = news.find((n) => n.featured) ?? news[0];
  const latest = news.filter((n) => n.slug !== featured.slug).slice(0, 3);
  const kcse = kcseHistory[0];
  const topLeaders = [principal, ...leadership.deputies, leadership.academicLeadership[0]];

  return (
    <>
      {/* ================= HERO — photo-forward ================= */}
      <section className="relative overflow-hidden hero-gradient text-white">
        {/* Ambient photo layer */}
        <div className="absolute inset-0 hero-topo" aria-hidden />
        <div className="absolute inset-0 opacity-30" aria-hidden>
          <Media label="Aerial view of Gilgil Day" ratio="h-full" dark kind="hero" src={sitePhotos.hero} />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900/95 via-charcoal-900/70 to-charcoal-900/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-charcoal-900/40" />
        </div>

        {/* Top ribbon */}
        <div className="relative border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="shell flex flex-wrap items-center justify-between gap-3 py-2.5 text-[11px] uppercase tracking-[0.18em] text-mist-400">
            <span>{school.category}</span>
            <span className="hidden sm:inline">{school.constituency} · {school.county}</span>
            <span>{school.motto}</span>
          </div>
        </div>

        <div className="shell relative grid gap-14 py-20 md:py-32 lg:grid-cols-[1.15fr_.9fr] lg:items-center">
          {/* Copy */}
          <div className="fade-up">
            <p className="eyebrow eyebrow-light">Welcome to Gilgil Day</p>
            <h1 className="mt-6 font-display text-[44px] font-semibold leading-[1.02] md:text-[68px]">
              A public day senior school<br />
              <span className="text-maroon-100">in the heart of Gilgil.</span>
            </h1>
            <p className="mt-7 max-w-xl text-[16px] leading-relaxed text-mist-300">
              Two CBE pathways — STEM and Social Sciences — serving Grade 10 under the new
              Competency-Based Education, alongside our Form 3 and Form 4 candidates. Structured
              academics, active co-curricular life, and a school community built on one conviction:
              <em className="font-display not-italic text-white"> Knowledge is Power.</em>
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/admissions" className="btn-white">Grade 10 Admissions</Link>
              <Link href="/pathways" className="btn-ghost-light">Explore Pathways</Link>
              <Link href="/about" className="btn-ghost-light">About the School</Link>
            </div>
            {/* Stat strip */}
            <dl className="mt-14 grid max-w-2xl grid-cols-4 gap-4 border-t border-white/15 pt-7">
              {[
                ["2", "Pathways"],
                ["6", "Departments"],
                ["12", "Clubs & societies"],
                ["3", "Cohorts served"],
              ].map(([n, l]) => (
                <div key={l}>
                  <dt className="stat-num">{n}</dt>
                  <dd className="mt-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-mist-500">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right visual — photo card + principal chip */}
          <div className="relative hidden lg:block fade-up">
            <div className="relative overflow-hidden shadow-2xl ring-1 ring-white/10">
              <Media label="School main compound" ratio="aspect-[4/5]" dark kind="compound" src={sitePhotos.compound} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-maroon-100">Est. under CBE Senior School — 2026</p>
                <p className="mt-2 font-display text-2xl font-semibold text-white">Gilgil Day Senior School</p>
                <p className="mt-1 text-[13px] text-mist-300">{school.location}</p>
              </div>
            </div>
            {/* Principal chip floating */}
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 border border-mist-200 bg-white p-3 shadow-xl">
              <div className="h-14 w-14 shrink-0">
                <Avatar name={principal.name} palette="maroon" size="sm" />
              </div>
              <div className="pr-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-maroon-700">Principal</p>
                <p className="font-display text-base font-semibold text-charcoal-900">{principal.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRINCIPAL MESSAGE ================= */}
      <section className="bg-mist-50 py-20 md:py-28">
        <div className="shell">
          <SectionHeading
            eyebrow="From the Principal's Office"
            title="A word from Principal David Muhia"
            sub="Our Principal welcomes learners, parents and the wider Gilgil community to a school built on structure, discipline and shared conviction."
          />
          <PrincipalMessageCard person={principal} />
        </div>
      </section>

      {/* ================= KCSE 2025 ACHIEVEMENT ================= */}
      <section className="relative overflow-hidden bg-charcoal-900 text-white">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <svg className="h-full w-full">
            <defs>
              <pattern id="kcp" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1" fill="#fff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#kcp)" />
          </svg>
        </div>
        <div className="shell relative py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr] lg:items-center">
            <div>
              <p className="eyebrow eyebrow-light">KCSE {kcse.year}</p>
              <h2 className="mt-3 font-display text-4xl font-semibold leading-tight md:text-5xl">
                Our candidates. Their grades. University-bound.
              </h2>
              <p className="mt-5 text-[15px] leading-relaxed text-mist-300">
                A public day school is measured by what its learners do next. Every year we celebrate
                the KCSE candidates who cross the university threshold — their courses, their placements,
                their futures.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/alumni" className="btn-white">See All KCSE Performers</Link>
                <Link href="/exams" className="btn-ghost-light">Exams & Assessment</Link>
              </div>
            </div>
            {/* KCSE 2025 grid preview */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {kcse2025.performers.slice(0, 6).map((p) => (
                <div key={p.position} className="group relative overflow-hidden border border-white/15 bg-charcoal-800/60">
                  <Avatar name={`${p.position}`} src={p.photo} palette="maroon" size="md" ratio="aspect-[4/5]" />
                  <div className="absolute right-2 top-2 grade-badge scale-90">{p.grade}</div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-maroon-100">{p.position}</p>
                    <p className="mt-0.5 text-[12px] text-mist-400">Learner name — TBA</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= LEADERSHIP PREVIEW ================= */}
      <section className="shell py-20 md:py-24">
        <SectionHeading
          eyebrow="School Leadership"
          title="Our leadership team, top-down."
          sub="From the Board of Management and Parents' Association at the top, through Principal, Deputies, Dean of Academics, Pathway and Track Heads, down to class teachers and non-teaching staff — every level accountable, every learner accounted for."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {topLeaders.map((p) => <ProfileCard key={p.name + p.role} person={p} />)}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link href="/about#leadership" className="btn-outline">View Full Leadership Chart</Link>
          <Link href="/staff" className="btn-ghost-light !border-charcoal-800 !text-charcoal-800 hover:!bg-charcoal-800 hover:!text-white">All Staff</Link>
        </div>
      </section>

      {/* ================= PATHWAYS ================= */}
      <section className="bg-mist-50 py-20 md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Senior School Pathways"
            title="Two pathways. One standard of seriousness."
            sub="Every Grade 10 learner follows a structured pathway with clear subjects, tracks and career destinations."
          />
          <div className="grid gap-6 md:grid-cols-2">
            {pathways.map((p) => (
              <Link key={p.slug} href={`/pathways#${p.slug}`} className="group overflow-hidden border border-mist-200 bg-white transition hover:border-maroon-500 hover:shadow-lg">
                <div className="relative">
                  <Media label={`${p.name}`} ratio="aspect-[16/8]" kind={p.slug === "stem" ? "lab" : "book"} src={p.photo} />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-maroon-100">Head: {p.head.name}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-charcoal-900 group-hover:text-maroon-700">{p.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist-600">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tracks.flatMap((t) => t.subjects).slice(0, 6).map((s) => (
                      <span key={s} className="border border-mist-200 bg-mist-50 px-2.5 py-1 text-[11px] font-semibold text-charcoal-800">{s}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ================= QUICK LINKS ================= */}
      <section className="shell py-20 md:py-24">
        <SectionHeading eyebrow="Quick Links" title="Everything else, right here." />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          <LinkTile href="/exams" title="Exams & Assessment" desc="Notices, timetables and results — led by Dean Tirus Kinyua." />
          <LinkTile href="/careers" title="Career Guidance" desc="Pathway-to-career guidance for Grade 10 and beyond." />
          <LinkTile href="/downloads" title="Downloads Centre" desc="Circulars, timetables, past papers and admission documents." />
          <LinkTile href="/support" title="Support a Student" desc="Fee, uniform, materials and welfare support for learners in need." />
        </div>
      </section>

      {/* ================= NEWS ================= */}
      <section className="bg-mist-50 py-20 md:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="News & Updates" title="Life at Gilgil Day" />
            <Link href="/news" className="btn-outline mb-10">All news</Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <Link href={`/news/${featured.slug}`} className="group overflow-hidden border border-mist-200 bg-white transition hover:border-maroon-500 hover:shadow-lg">
              <Media label="Featured story" ratio="aspect-[16/8]" kind="assembly" src={sitePhotos.assembly} />
              <div className="p-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon-700">{featured.category} · {featured.date}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-charcoal-900 group-hover:text-maroon-700">{featured.title}</h3>
                <p className="mt-2 text-sm text-mist-600">{featured.excerpt}</p>
              </div>
            </Link>
            <div className="grid content-start gap-4">
              {latest.map((n) => (
                <Link key={n.slug} href={`/news/${n.slug}`} className="rule-card group block bg-white hover:border-maroon-500 hover:shadow-md">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon-700">{n.category} · {n.date}</p>
                  <h3 className="mt-1.5 font-display text-base font-semibold text-charcoal-900 group-hover:text-maroon-700">{n.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CO-CURRICULAR STRIP ================= */}
      <section className="bg-charcoal-900 py-20 text-white md:py-24">
        <div className="shell">
          <SectionHeading
            eyebrow="Contemporary Issues"
            title="Beyond the classroom"
            sub="Twelve clubs, societies and activities shape character, service and talent — led by Head of Contemporary Issues Njuguna J. and Head of Games Silvanus Gekonge."
            light
          />
          <div className="flex flex-wrap gap-2.5">
            {clubs.map((c) => (
              <Link key={c.slug} href={`/departments/contemporary-issues#${c.slug}`} className="border border-white/20 px-4 py-2.5 text-[13px] font-medium text-mist-300 transition hover:border-maroon-500 hover:bg-maroon-700 hover:text-white">
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
