import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import { Media, Avatar } from "@/components/Placeholder";
import { SectionHeading, Notice } from "@/components/Cards";
import { departments, clubs, news } from "@/lib/data";

export function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const d = departments.find((x) => x.slug === params.slug);
  return { title: d ? d.name : "Department" };
}

export default function DepartmentPage({ params }: { params: { slug: string } }) {
  const d = departments.find((x) => x.slug === params.slug);
  if (!d) notFound();
  const isContemporary = d.slug === "contemporary-issues";
  const departmentNews = news.slice(0, 2);

  return (
    <>
      <PageHeader eyebrow="Department" title={d.name} intro={d.overview} />

      <section className="shell grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <div className="flex items-center gap-4 border border-mist-200 bg-white p-4">
            <div className="w-20 shrink-0"><Avatar name={d.head} /></div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-maroon-700">Head of Department</p>
              <p className="font-display text-base font-semibold">{d.head}</p>
              <p className="text-[12px] text-mist-500">Profile placeholder</p>
            </div>
          </div>

          <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-maroon-700">{d.itemsLabel}</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {d.items.map((s) => (
              <li key={s} className="border border-mist-200 bg-mist-50 px-4 py-3 text-sm font-semibold">{s}</li>
            ))}
          </ul>

          <h2 className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-maroon-700">Teachers</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-center gap-3 border border-mist-200 bg-white px-4 py-3 text-sm">
                <span className="grid h-8 w-8 place-items-center bg-mist-100 text-mist-500" aria-hidden>—</span>
                Teacher name placeholder
              </li>
            ))}
          </ul>

          {isContemporary && (
            <div className="mt-14">
              <SectionHeading
                eyebrow="Clubs, societies & activities"
                title="Everything Contemporary Issues runs"
                sub="Each club and society has its own message, patron, activities, gallery and updates."
              />
              <div className="grid gap-5 sm:grid-cols-2">
                {clubs.map((c) => (
                  <article key={c.slug} id={c.slug} className="rule-card scroll-mt-28">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-mist-500">{c.kind}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold">{c.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-mist-600">{c.blurb}</p>
                    <p className="mt-3 border-l-2 border-maroon-700 bg-mist-50 p-3 text-[13px] italic text-mist-600">
                      Club message placeholder — a word from the members and leadership.
                    </p>
                    <ul className="mt-3 space-y-1 text-[13px] text-mist-600">
                      <li>Patron: placeholder profile</li>
                      <li>Activities: term programme placeholder</li>
                      <li>Gallery: photos placeholder</li>
                      <li>News: updates published under Clubs & Sports</li>
                    </ul>
                    <button className="btn-outline mt-4 !py-2 text-xs">Join {c.name} (placeholder)</button>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="grid content-start gap-5">
          <Media label={`${d.name} — gallery photo`} />
          <div className="rule-card">
            <h3 className="font-display text-lg font-semibold">Downloads & resources</h3>
            <p className="mt-2 text-sm text-mist-600">Department documents live in the Downloads centre under Academic resources.</p>
            <Link href="/downloads" className="btn-maroon mt-4">Downloads centre</Link>
          </div>
          <div className="rule-card">
            <h3 className="font-display text-lg font-semibold">Department news</h3>
            <ul className="mt-3 space-y-3">
              {departmentNews.map((n) => (
                <li key={n.slug}>
                  <Link href={`/news/${n.slug}`} className="text-sm font-semibold hover:text-maroon-700">{n.title}</Link>
                  <p className="text-[11px] uppercase tracking-wider text-mist-500">{n.category} · {n.date}</p>
                </li>
              ))}
            </ul>
          </div>
          {d.slug === "exams-assessment-careers" && (
            <div className="rule-card">
              <h3 className="font-display text-lg font-semibold">Full exams section</h3>
              <p className="mt-2 text-sm text-mist-600">Notices, timetables, results access and career guidance.</p>
              <Link href="/exams" className="btn-maroon mt-4">Exams & Assessment</Link>
            </div>
          )}
        </aside>
      </section>
      <div className="shell pb-16">
        <Notice>Department content is placeholder and admin-editable. Real teacher lists, photos and documents replace these entries later.</Notice>
      </div>
    </>
  );
}
