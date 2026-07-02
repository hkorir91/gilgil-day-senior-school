import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { SectionHeading, LinkTile } from "@/components/Cards";
import { Media } from "@/components/Placeholder";
import { school, pathways, departments } from "@/lib/data";

export const metadata: Metadata = { title: "Academics" };

export default function Academics() {
  return (
    <>
      <PageHeader
        eyebrow="Academics"
        title="Structured learning across three cohorts."
        intro="Grade 10 under the CBE Senior School structure, alongside Form 3 and Form 4 completing the 8-4-4 cycle — each with a clear academic programme."
      />

      <section className="shell py-16 md:py-20">
        <SectionHeading eyebrow="Current classes" title="Who we teach" />
        <div className="grid gap-5 md:grid-cols-3">
          {[
            ["Grade 10", "The pioneer CBE Senior School class, admitted through government placement into the STEM or Social Sciences pathway."],
            ["Form 3", "Continuing the 8-4-4 curriculum with structured internal assessment and academic progress tracking."],
            ["Form 4", "The candidate class, supported by a dedicated examination preparation and revision programme."],
          ].map(([t, d]) => (
            <div key={t} className="rule-card">
              <h3 className="font-display text-xl font-semibold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Pathways" title="CBE Senior School pathways" sub={`${school.shortName} offers two pathways with defined tracks and subjects.`} />
          <div className="grid gap-6 md:grid-cols-2">
            {pathways.map((p) => (
              <Link key={p.slug} href={`/pathways#${p.slug}`} className="group border border-mist-200 bg-white hover:border-maroon-500">
                <Media label={`${p.name} photo`} ratio="aspect-[16/7]" />
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold group-hover:text-maroon-700">{p.name}</h3>
                  <p className="mt-2 text-sm text-mist-600">{p.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-16 md:py-20">
        <SectionHeading eyebrow="Departments" title="Six departments, one academic engine" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((d) => (
            <LinkTile key={d.slug} href={`/departments/${d.slug}`} title={d.name} desc={d.overview} cta="Department page" />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/exams" className="btn-maroon">Exams & Assessment</Link>
          <Link href="/careers" className="btn-outline">Career Guidance</Link>
        </div>
      </section>
    </>
  );
}
