"use client";G

import Link from "next/link";
import { Media, Avatar } from "@/components/Placeholder";
import { school, pathways, clubs, sitePhotos } from "@/lib/data";
import { useContent } from "@/lib/content";

// ============================================================
// Inline icon set — no external icon library needed
// ============================================================
const I = {
  cap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  cal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>,
  img: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>,
  dl: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5M12 15V3"/></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2.06 4.18 2 2 0 0 1 4.05 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.64 2.62a2 2 0 0 1-.45 2.11L8 9.5a16 16 0 0 0 6.5 6.5l1.05-1.24a2 2 0 0 1 2.11-.45c.84.3 1.72.52 2.62.64A2 2 0 0 1 22 16.92Z"/></svg>,
  book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
  branch: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="3" r="3"/><circle cx="6" cy="21" r="3"/><circle cx="18" cy="12" r="3"/><path d="M6 6v6a6 6 0 0 0 6 6h0"/></svg>,
  activity: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>,
  clip: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>,
  trend: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M7 15l4-4 4 4 5-5"/></svg>,
  compass: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 8l-2 6-6 2 2-6 6-2z"/></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>,
  library: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>,
  place: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="10" r="3"/><path d="M12 22s-8-7.58-8-13a8 8 0 1 1 16 0c0 5.42-8 13-8 13Z"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  quote: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 2v5c0 1.25.75 2 2 2h2c0 3-2 4-3 4z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.75-2-2-2h-4c-1.25 0-2 .75-2 2v5c0 1.25.75 2 2 2h2c0 3-2 4-3 4z"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>,
  arrow: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>,
  cross: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M10 4h4v6h6v4h-6v6h-4v-6H4v-4h6z"/></svg>,
  scout: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.09 4.26L18.5 7l-3 3.14.79 4.36L12 12.77 7.71 14.5l.79-4.36L5.5 7l4.41-.74L12 2z"/></svg>,
  leaf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3c9 0 15 5 15 12-4 0-7-1-9-3M6 3c-1 5 1 12 6 15M6 3l6 6"/></svg>,
  mic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4"/></svg>,
  drama: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 5a8 8 0 0 1-16 0 8 8 0 0 1 16 0zM8 8a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2zm-8 4c1 2 3 3 4 3s3-1 4-3H8z"/></svg>,
  music: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  church: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 2h2v3h3v2h-3v3h5v11h-5v-4h-2v4H6V10h5V7H8V5h3V2z"/></svg>,
  moon: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 8 8 0 010-16 8 8 0 018 8 10 10 0 00-8-12z"/></svg>,
  bible: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 2h13v20H6a2 2 0 01-2-2V4a2 2 0 012-2zm5 5v10l2-1 2 1V7l-2 1z"/></svg>,
};

// ============================================================
// Static homepage data (school-editable content stays in DB)
// ============================================================
const QUICK_TILES = [
  { href: "/academics", icon: I.cap, colour: "bg-emerald-500", label: "Academics", blurb: "Quality learning for a brighter future" },
  { href: "/admissions", icon: I.users, colour: "bg-sky-600", label: "Admissions", blurb: "Information for prospective learners and parents" },
  { href: "/news", icon: I.cal, colour: "bg-amber-500", label: "News & Events", blurb: "Stay updated with our latest news and events" },
  { href: "/gallery", icon: I.img, colour: "bg-emerald-500", label: "School Gallery", blurb: "Explore moments of learning, talent and achievement" },
  { href: "/downloads", icon: I.dl, colour: "bg-sky-600", label: "Downloads", blurb: "Access important documents and resources" },
  { href: "/contact", icon: I.phone, colour: "bg-amber-500", label: "Contact Us", blurb: "Get in touch with us for enquiries and support" },
];

const STATS = [
  { icon: I.users, colour: "text-emerald-600", value: "860+", label: "Learners" },
  { icon: I.book, colour: "text-sky-600", value: "34", label: "Teachers" },
  { icon: I.branch, colour: "text-amber-500", value: "2", label: "Senior School Pathways" },
  { icon: I.activity, colour: "text-emerald-600", value: "20+", label: "Clubs and Activities" },
];

const ACADEMIC_SUPPORT = [
  { icon: I.clip, label: "Internal Assessments" },
  { icon: I.trend, label: "Academic Progress" },
  { icon: I.compass, label: "Career Guidance" },
  { icon: I.clock, label: "Timetables" },
  { icon: I.file, label: "Past Papers" },
  { icon: I.library, label: "Revision Resources" },
  { icon: I.place, label: "Learner Placement Support" },
];

const CLUB_ICONS: Record<string, { icon: JSX.Element; colour: string }> = {
  "first-responders": { icon: I.cross, colour: "text-red-600" },
  scouts:             { icon: I.scout, colour: "text-amber-500" },
  environment:        { icon: I.leaf, colour: "text-emerald-600" },
  debating:           { icon: I.mic, colour: "text-sky-600" },
  drama:              { icon: I.drama, colour: "text-fuchsia-600" },
  music:              { icon: I.music, colour: "text-indigo-600" },
  cu:                 { icon: I.church, colour: "text-maroon-700" },
  sda:                { icon: I.bible, colour: "text-emerald-700" },
  "muslim-society":   { icon: I.moon, colour: "text-emerald-600" },
};

const TESTIMONIALS = [
  { role: "Parent",  name: "Mary Wanjiku",     quote: "Gilgil Day Senior School has transformed my child. The discipline, care and quality of education are outstanding." },
  { role: "Learner", name: "Brian Kiprotich (Form 4)", quote: "The teachers are supportive and the environment makes learning enjoyable. I am proud to be a Gilgilian." },
  { role: "Teacher", name: "Jane Chepkorir",   quote: "It is a wonderful place to teach and inspire. The school values teamwork and professional growth." },
];

const PATHWAY_STYLES: Record<string, { bar: string; text: string; button: string }> = {
  stem:              { bar: "bg-emerald-600", text: "text-emerald-700", button: "bg-emerald-600 hover:bg-emerald-700" },
  "social-sciences": { bar: "bg-sky-700",     text: "text-sky-800",     button: "bg-sky-700 hover:bg-sky-800" },
};

// ============================================================
// Home page
// ============================================================
export default function Home() {
  const { news } = useContent();
  const latest = news.slice(0, 3);
  const upcomingEvents = news.slice(0, 6);

  return (
    <>
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-charcoal-900 text-white">
        <div className="absolute inset-0 opacity-40" aria-hidden>
          <Media label="Gilgil Day school assembly" ratio="h-full" dark kind="assembly" src={sitePhotos.assembly} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal-900 via-charcoal-900/85 to-transparent" aria-hidden />
        <div className="shell relative py-20 md:py-28">
          <div className="max-w-2xl">
            <h1 className="font-display font-bold leading-tight">
              <span className="block text-4xl text-white md:text-6xl">GILGIL DAY</span>
              <span className="mt-1 block text-4xl text-amber-400 md:text-6xl">SENIOR SCHOOL</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-mist-200 md:text-lg">
              Empowering Learners for Academic Excellence, Leadership and Responsible Citizenship
            </p>
            <p className="mt-3 font-display text-lg italic text-amber-300 md:text-xl">&ldquo;Knowledge is Power&rdquo;</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="inline-flex items-center gap-2 bg-emerald-600 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white hover:bg-emerald-700">
                Explore Our School <span className="h-3.5 w-3.5">{I.arrow}</span>
              </Link>
              <Link href="/academics" className="inline-flex items-center gap-2 border border-white/50 bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur hover:bg-white hover:text-charcoal-900">
                View Academic Programmes <span className="h-3.5 w-3.5">{I.arrow}</span>
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-3 text-xs">
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 text-white backdrop-blur"><span className="h-3 w-3 text-amber-400">{I.cap}</span> {school.type}</span>
              <span className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1.5 text-white backdrop-blur"><span className="h-3 w-3 text-amber-400">{I.place}</span> Gilgil, Nakuru County</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= QUICK ACTION TILES ================= */}
      <section className="shell relative z-10 -mt-10 pb-10">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {QUICK_TILES.map((t) => (
            <Link key={t.href} href={t.href} className="group bg-white p-4 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
              <div className={`mx-auto grid h-11 w-11 place-items-center rounded-full text-white ${t.colour}`}>
                <span className="h-5 w-5">{t.icon}</span>
              </div>
              <h3 className="mt-3 text-[13px] font-semibold uppercase tracking-wide text-charcoal-900">{t.label}</h3>
              <p className="mt-1 text-[11px] leading-snug text-mist-600">{t.blurb}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ================= WELCOME + STATS ================= */}
      <section className="shell py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr_1fr] lg:items-center">
          <div className="relative">
            <div className="absolute -left-3 -top-3 h-full w-full bg-maroon-700/10" aria-hidden />
            <div className="relative border-4 border-white shadow-xl">
              <Media label="Principal David Muhia" ratio="aspect-[4/5]" src={sitePhotos.principal} />
            </div>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600">Welcome to</p>
            <h2 className="mt-2 font-display text-2xl font-semibold leading-tight text-charcoal-900 md:text-4xl">Gilgil Day Senior School</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-charcoal-700">
              Gilgil Day Senior School is committed to providing quality education, nurturing talent, promoting discipline and preparing learners for success in a changing world.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-charcoal-700">
              Our dedicated staff, supportive community and conducive environment ensure that every learner discovers their potential and thrives.
            </p>
            <div className="mt-6">
              <p className="font-display text-lg font-semibold italic text-maroon-700">Mr. David Joseph Muhia</p>
              <p className="text-xs uppercase tracking-wider text-mist-600">Principal</p>
            </div>
            <Link href="/about" className="mt-6 inline-flex items-center gap-2 bg-emerald-600 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-emerald-700">
              Read the Principal&apos;s Message <span className="h-3.5 w-3.5">{I.arrow}</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="border border-mist-200 bg-white p-4 text-center shadow-sm">
                <div className={`mx-auto h-8 w-8 ${s.colour}`}>{s.icon}</div>
                <p className="mt-2 font-display text-2xl font-bold text-charcoal-900">{s.value}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-mist-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= ACADEMIC PATHWAYS ================= */}
      <section className="bg-mist-50 py-14 md:py-20">
        <div className="shell">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-maroon-700">Our Academic Pathways</p>
            <div className="mx-auto mt-3 h-0.5 w-24 bg-gradient-to-r from-emerald-500 via-sky-600 to-amber-500" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pathways.map((p) => {
              const style = PATHWAY_STYLES[p.slug];
              return (
                <div key={p.slug} className="overflow-hidden border border-mist-200 bg-white shadow-sm transition hover:shadow-xl">
                  <div className={`${style.bar} px-5 py-3`}>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white">{p.name}</p>
                  </div>
                  <div className="p-6">
                    <p className="text-[13px] leading-relaxed text-mist-700">{p.summary}</p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      {p.tracks.map((track) => (
                        <div key={track.name}>
                          <p className={`text-[11px] font-semibold uppercase tracking-wider ${style.text}`}>{track.name}</p>
                          <ul className="mt-1.5 space-y-0.5">
                            {track.subjects.map((s) => (
                              <li key={s} className="flex items-center gap-1.5 text-[12px] text-charcoal-800">
                                <span className={`h-1.5 w-1.5 rounded-full ${style.bar}`} />
                                {s}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <Link href={`/pathways/${p.slug}`} className={`mt-6 inline-flex w-full items-center justify-center gap-2 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white ${style.button}`}>
                      View Departments <span className="h-3.5 w-3.5">{I.arrow}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
            {/* Contemporary Issues (3rd card) */}
            <div className="overflow-hidden border border-mist-200 bg-white shadow-sm transition hover:shadow-xl">
              <div className="bg-amber-500 px-5 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white">Contemporary Issues</p>
              </div>
              <div className="p-6">
                <p className="text-[13px] leading-relaxed text-mist-700">Nurturing holistic growth, leadership and community responsibility beyond the classroom.</p>
                <div className="mt-5 grid gap-1.5 sm:grid-cols-2">
                  {["Games and Sports", "Guidance and Counselling", "Clubs and Societies", "Leadership", "Community Service", "Student Welfare"].map((item) => (
                    <div key={item} className="flex items-center gap-1.5 text-[12px] text-charcoal-800">
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      {item}
                    </div>
                  ))}
                </div>
                <Link href="/departments" className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-amber-500 px-4 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-amber-600">
                  View Departments <span className="h-3.5 w-3.5">{I.arrow}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= ACADEMIC SUPPORT ================= */}
      <section className="shell py-14 md:py-20">
        <div className="mb-8 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-maroon-700">Academic Support</p>
          <h2 className="mt-2 font-display text-xl font-semibold text-charcoal-900 md:text-2xl">Examinations, Assessment and Careers Department</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {ACADEMIC_SUPPORT.map((s) => (
            <div key={s.label} className="border border-mist-200 bg-white p-4 text-center transition hover:border-maroon-500 hover:shadow-md">
              <div className="mx-auto h-8 w-8 text-maroon-700">{s.icon}</div>
              <p className="mt-2 text-[11px] font-semibold leading-tight text-charcoal-900">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/exams" className="inline-flex items-center gap-2 bg-sky-800 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-900">
            Visit Academic Resources <span className="h-3.5 w-3.5">{I.arrow}</span>
          </Link>
        </div>
      </section>

      {/* ================= LATEST NEWS + UPCOMING EVENTS ================= */}
      <section className="bg-mist-50 py-14 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[2fr_1fr]">
          <div>
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-2xl font-semibold text-charcoal-900 md:text-3xl">Latest News</h2>
              <Link href="/news" className="text-[11px] font-semibold uppercase tracking-wide text-maroon-700 hover:text-maroon-800">View All News →</Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {latest.map((n) => (
                <Link key={n.slug} href={`/news/article/?slug=${encodeURIComponent(n.slug)}`} className="group border border-mist-200 bg-white transition hover:border-maroon-500 hover:shadow-md">
                  <Media label="Article photo" src={n.photo || undefined} ratio="aspect-[16/10]" />
                  <div className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-maroon-700">{n.date} · {n.category}</p>
                    <h3 className="mt-2 font-display text-sm font-semibold leading-tight text-charcoal-900 group-hover:text-maroon-700">{n.title}</h3>
                    <p className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-mist-600">{n.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-6 flex items-end justify-between">
              <h2 className="font-display text-lg font-semibold text-charcoal-900">Upcoming Events</h2>
              <Link href="/news" className="text-[11px] font-semibold uppercase tracking-wide text-maroon-700">View Calendar →</Link>
            </div>
            <ul className="space-y-2 border border-mist-200 bg-white p-3">
              {upcomingEvents.map((e) => {
                const d = new Date(e.date);
                const day = isNaN(d.getTime()) ? "—" : d.getDate();
                const month = isNaN(d.getTime()) ? "" : d.toLocaleString("en-US", { month: "short" }).toUpperCase();
                return (
                  <li key={e.slug} className="flex items-center gap-3 border-l-4 border-emerald-500 bg-mist-50 p-2.5">
                    <div className="grid h-11 w-11 shrink-0 place-items-center bg-white text-center leading-tight shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase text-maroon-700">{month}</p>
                        <p className="-mt-0.5 font-display text-base font-bold text-charcoal-900">{day}</p>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-[12px] font-semibold text-charcoal-900">{e.title}</p>
                      <p className="text-[10px] text-mist-600">{e.category}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      {/* ================= GALLERY PREVIEW ================= */}
      <section className="shell py-14 md:py-20">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600">Life at Gilgil Day</p>
            <h2 className="mt-1 font-display text-2xl font-semibold text-charcoal-900 md:text-3xl">School Gallery</h2>
          </div>
          <Link href="/gallery" className="text-[11px] font-semibold uppercase tracking-wide text-maroon-700 hover:text-maroon-800">View Full Gallery →</Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {[sitePhotos.compound, sitePhotos.assembly, sitePhotos.stem, sitePhotos.social, sitePhotos.students, sitePhotos.hero].map((p, i) => (
            <div key={i} className="overflow-hidden">
              <Media label="School life" src={p} ratio="aspect-square" />
            </div>
          ))}
        </div>
      </section>

      {/* ================= CLUBS & SOCIETIES ================= */}
      <section className="bg-mist-50 py-14 md:py-20">
        <div className="shell">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-maroon-700">Clubs and Societies</p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-charcoal-900 md:text-3xl">Beyond the Classroom</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
            {clubs.filter((c) => CLUB_ICONS[c.slug]).map((c) => {
              const meta = CLUB_ICONS[c.slug];
              return (
                <div key={c.slug} className="flex flex-col items-center gap-2 border border-mist-200 bg-white p-3 text-center transition hover:shadow-md">
                  <div className={`h-8 w-8 ${meta.colour}`}>{meta.icon}</div>
                  <p className="text-[10px] font-semibold leading-tight text-charcoal-800">{c.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= PORTALS ================= */}
      <section className="shell py-14 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="grid grid-cols-2 border border-mist-200 bg-white shadow-sm">
            <div className="hidden sm:block">
              <Media label="Students" src={sitePhotos.students} ratio="h-full" />
            </div>
            <div className="col-span-2 p-6 sm:col-span-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-600">Student Portal</p>
              <p className="mt-2 text-[12px] leading-relaxed text-mist-600">Access your learning materials, assignments, quizzes, timetable and more.</p>
              <ul className="mt-4 space-y-1.5 text-[12px]">
                {["Access Notes", "Download Past Papers", "View Assignments", "View Academic Timetable", "Take Quizzes", "Receive Teacher Feedback"].map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-charcoal-800"><span className="h-3.5 w-3.5 text-emerald-600">{I.check}</span> {f}</li>
                ))}
              </ul>
              <Link href="/portals/student" className="mt-5 inline-flex items-center gap-2 bg-emerald-600 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-emerald-700">
                Open Student Portal <span className="h-3.5 w-3.5">{I.arrow}</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 border border-mist-200 bg-white shadow-sm">
            <div className="hidden sm:block">
              <Media label="Teacher" src={sitePhotos.teacher} ratio="h-full" />
            </div>
            <div className="col-span-2 p-6 sm:col-span-1">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-800">Staff Portal</p>
              <p className="mt-2 text-[12px] leading-relaxed text-mist-600">Manage your teaching resources, classes, assessments and school activities.</p>
              <ul className="mt-4 space-y-1.5 text-[12px]">
                {["Upload Notes", "View Timetable", "Post Assignments", "Upload Resources", "Create Assessments", "Manage Learner Activities"].map((f) => (
                  <li key={f} className="flex items-center gap-1.5 text-charcoal-800"><span className="h-3.5 w-3.5 text-sky-700">{I.check}</span> {f}</li>
                ))}
              </ul>
              <Link href="/portals/staff" className="mt-5 inline-flex items-center gap-2 bg-sky-800 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-900">
                Open Staff Portal <span className="h-3.5 w-3.5">{I.arrow}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="bg-mist-50 py-14 md:py-20">
        <div className="shell">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-maroon-700">What Our Community Says</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="relative border border-mist-200 bg-white p-6 shadow-sm">
                <div className="absolute right-4 top-4 h-8 w-8 text-amber-400 opacity-30">{I.quote}</div>
                <div className="flex items-center gap-3">
                  <Avatar name={t.name} src={sitePhotos.student} palette="maroon" size="sm" ratio="aspect-square" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600">{t.role}</p>
                    <p className="font-display text-sm font-semibold text-charcoal-900">{t.name}</p>
                  </div>
                </div>
                <p className="mt-4 text-[13px] italic leading-relaxed text-charcoal-700">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-3 flex gap-0.5 text-amber-400">
                  {[0,1,2,3,4].map((i) => <span key={i} className="h-4 w-4">{I.star}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
