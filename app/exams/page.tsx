import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { SectionHeading, Notice } from "@/components/Cards";
import { Avatar } from "@/components/Placeholder";
import { news, downloads } from "@/lib/data";

export const metadata: Metadata = { title: "Exams & Assessment" };

export default function Exams() {
  const notices = news.filter((n) => n.category === "Assessment" || n.category === "Announcements").slice(0, 3);
  const examDocs = downloads.filter((d) => ["Timetables", "Assessment documents", "Past papers"].includes(d.category));

  return (
    <>
      <PageHeader
        eyebrow="Exams / Assessment / Careers"
        title="The academic engine room."
        intro="Led by the Director of Studies: exams, internal assessment, academic progress tracking, results, reports, timetables and career guidance coordination."
      />

      {/* DoS + exams office */}
      <section className="shell grid gap-10 py-16 lg:grid-cols-[1fr_1.3fr] md:py-20">
        <div className="h-fit border border-mist-200 bg-white p-6">
          <div className="flex items-center gap-4">
            <div className="w-24 shrink-0"><Avatar name="Director of Studies" /></div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-maroon-700">Director of Studies</p>
              <p className="font-display text-lg font-semibold">Name Placeholder</p>
              <p className="text-[12px] text-mist-500">Profile placeholder</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-mist-600">
            The exams office coordinates all internal assessment for Grade 10, Form 3 and
            Form 4 — setting, moderation, administration, marking, analysis and reporting —
            and leads career guidance across both pathways.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["Assessment notices", "Official notices for CATs, mid-term and end-term assessment, published here and in News."],
            ["Exam timetables", "Class and exam timetables, downloadable from the Downloads centre."],
            ["Internal assessment", "How school-based assessment works per class, including CBE assessment for Grade 10."],
            ["Academic reports", "Term reports and academic progress tracking for every learner."],
            ["Results access", "Class results uploaded as PDF/Excel by the admin, viewable by parents in the portal (view-only, not downloadable)."],
            ["Academic progress support", "Structured support for learners needing intervention, coordinated with class teachers."],
          ].map(([t, d]) => (
            <div key={t} className="rule-card">
              <h3 className="font-display text-base font-semibold">{t}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-mist-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Notices + docs */}
      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Latest" title="Assessment notices" />
            <ul className="space-y-4">
              {notices.map((n) => (
                <li key={n.slug} className="rule-card bg-white">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-maroon-700">{n.category} · {n.date}</p>
                  <Link href={`/news/${n.slug}`} className="mt-1 block font-display text-base font-semibold hover:text-maroon-700">{n.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Documents" title="Exam downloads" />
            <ul className="divide-y divide-mist-200 border border-mist-200 bg-white">
              {examDocs.map((d) => (
                <li key={d.name} className="flex items-center justify-between gap-3 px-5 py-4">
                  <div>
                    <p className="text-sm font-semibold">{d.name}</p>
                    <p className="text-[11px] uppercase tracking-wider text-mist-500">{d.category} · {d.size}</p>
                  </div>
                  <Link href="/downloads" className="text-xs font-semibold uppercase tracking-[0.14em] text-maroon-700">Get →</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Results + careers + enquiry */}
      <section className="shell grid gap-5 py-16 md:grid-cols-3 md:py-20">
        <div className="rule-card">
          <h3 className="font-display text-lg font-semibold">Class results (parents)</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist-600">
            The admin uploads class results as PDF or Excel. Parents view them inside the
            Parent Portal — results are view-only and not downloadable, protecting learner data.
          </p>
          <Link href="/portals/parent" className="btn-maroon mt-4">Parent Portal</Link>
        </div>
        <div className="rule-card">
          <h3 className="font-display text-lg font-semibold">Career guidance</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist-600">
            Grade 10 career guidance, pathway-to-career mapping, STEM and Social Sciences
            career resources — coordinated by the Director of Studies.
          </p>
          <Link href="/careers" className="btn-outline mt-4">Careers section</Link>
        </div>
        <div className="rule-card">
          <h3 className="font-display text-lg font-semibold">Academic enquiry</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist-600">
            Parents and students can raise academic enquiries with the exams office through
            the enquiry form (placeholder) on the Contact page.
          </p>
          <Link href="/contact" className="btn-outline mt-4">Enquiry form</Link>
        </div>
      </section>
      <div className="shell pb-16">
        <Notice>No complex marks-entry system in this phase, by design — results move as uploaded PDF/Excel files with portal-gated, view-only parent access.</Notice>
      </div>
    </>
  );
}
