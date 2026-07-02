import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { SectionHeading, Notice } from "@/components/Cards";
import { school } from "@/lib/data";

export const metadata: Metadata = { title: "Admissions" };

const checklist = [
  "Official placement letter / admission letter",
  "Original and copy of Grade 9 (KJSEA) result slip",
  "Birth certificate (original and copy)",
  "Duly filled admission and bio data forms",
  "Fee payment evidence as per the fee structure",
  "Full school uniform as per uniform guidelines",
  "Personal effects as listed in the reporting checklist",
];

export default function Admissions() {
  return (
    <>
      <PageHeader
        eyebrow="Admissions"
        title="Joining Gilgil Day Senior School."
        intro="As a public Senior School, admission into Grade 10 is primarily through the government placement process. This page explains how placement works and what admitted learners need when reporting."
      />

      <section className="shell grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <SectionHeading eyebrow="How admission works" title="Government Grade 10 placement" />
          <ol className="grid gap-4">
            {[
              ["Placement by the Ministry of Education", "Learners are placed into Senior Schools through the official government placement system based on KJSEA performance, pathway selection and available capacity."],
              ["Placement list release", "Admitted learners appear on the official placement list. The school communicates reporting dates through circulars, this website and the News section."],
              ["Confirmation & bio data", "Parents complete the admission forms and submit learner bio data. A parent bio data upload feature will be available in the Parent Portal (placeholder for now)."],
              ["Reporting day", "The learner reports with all required documents and items on the communicated date. The admissions office guides pathway and subject confirmation."],
            ].map(([t, d], i) => (
              <li key={t} className="rule-card">
                <p className="text-xs font-semibold uppercase tracking-wider text-maroon-700">Step {i + 1}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-600">{d}</p>
              </li>
            ))}
          </ol>

          <h3 className="mt-12 font-display text-2xl font-semibold">Grade 10 reporting checklist</h3>
          <ul className="mt-5 grid gap-2.5">
            {checklist.map((c) => (
              <li key={c} className="flex gap-3 border border-mist-200 bg-white px-4 py-3 text-sm">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center bg-maroon-700 text-[11px] font-bold text-white" aria-hidden>✓</span>
                {c}
              </li>
            ))}
          </ul>
        </div>

        <aside className="grid content-start gap-5">
          <div className="rule-card">
            <h3 className="font-display text-lg font-semibold">Admission documents</h3>
            <p className="mt-2 text-sm text-mist-600">Download the admission letter template, reporting checklist and bio data forms.</p>
            <Link href="/downloads" className="btn-maroon mt-4">Downloads centre</Link>
          </div>
          <div className="rule-card">
            <h3 className="font-display text-lg font-semibold">Fee structure</h3>
            <p className="mt-2 text-sm text-mist-600">Fee structure placeholder — the official government-guided fee structure will be published here and in Downloads.</p>
          </div>
          <div className="rule-card">
            <h3 className="font-display text-lg font-semibold">Uniform information</h3>
            <p className="mt-2 text-sm text-mist-600">Uniform guidelines placeholder — colours, items and approved suppliers will be listed here.</p>
          </div>
          <div className="rule-card">
            <h3 className="font-display text-lg font-semibold">Document upload / request</h3>
            <p className="mt-2 text-sm text-mist-600">Placeholder for the parent document upload and request feature, to be activated with the Parent Portal.</p>
            <button className="btn-outline mt-4 cursor-not-allowed opacity-60" aria-disabled>Coming soon</button>
          </div>
          <div className="rule-card">
            <h3 className="font-display text-lg font-semibold">Admissions office</h3>
            <p className="mt-2 text-sm">{school.admissionsEmail}</p>
            <p className="text-sm">{school.phone}</p>
            <Link href="/contact" className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-maroon-700">Contact page →</Link>
          </div>
        </aside>
      </section>
      <div className="shell pb-16">
        <Notice>
          This is a public school. Admission is through official government placement — the school does not run a private admission campaign. Details on this page are placeholders pending official circulars.
        </Notice>
      </div>
    </>
  );
}
