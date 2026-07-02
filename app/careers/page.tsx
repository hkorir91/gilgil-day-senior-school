import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { SectionHeading } from "@/components/Cards";
import { pathways, careerArticles } from "@/lib/data";

export const metadata: Metadata = { title: "Careers Guidance" };

export default function Careers() {
  return (
    <>
      <PageHeader
        eyebrow="Career guidance"
        title="From pathway to profession."
        intro="Career guidance is coordinated by the Director of Studies through the Exams / Assessment / Careers department — helping every learner connect subjects to real futures."
      />

      <section className="shell py-16 md:py-20">
        <SectionHeading
          eyebrow="Grade 10 career guidance"
          title="Choosing with the end in mind"
          sub="Grade 10 learners receive structured guidance on subject combinations, pathway strengths and the opportunities each choice opens."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {pathways.map((p) => (
            <div key={p.slug} className="rule-card">
              <h3 className="font-display text-xl font-semibold">{p.name} careers</h3>
              <ul className="mt-4 grid gap-2">
                {p.careers.map((c) => (
                  <li key={c} className="flex gap-2 text-sm"><span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-maroon-700" aria-hidden />{c}</li>
                ))}
              </ul>
              <Link href={`/pathways#${p.slug}`} className="mt-5 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-maroon-700">
                Subjects in this pathway →
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8 rule-card">
          <h3 className="font-display text-lg font-semibold">Subject combinations & future opportunities</h3>
          <p className="mt-2 text-sm leading-relaxed text-mist-600">
            Placeholder for the official subject-combination guide: which subject clusters
            within STEM and Social Sciences map to which university programmes, TVET options
            and professional fields. The Director of Studies publishes this as a download.
          </p>
        </div>
      </section>

      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Career articles" title="Guidance reading" />
          <div className="grid gap-5 md:grid-cols-2">
            {careerArticles.map((a) => (
              <article key={a.title} className="rule-card bg-white">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-mist-500">{a.tag}</p>
                <h3 className="mt-1 font-display text-lg font-semibold">{a.title}</h3>
                <p className="mt-2 text-sm text-mist-600">Article placeholder — published through the News section under Career Guidance.</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/downloads" className="btn-maroon">Career downloads & resources</Link>
            <Link href="/exams" className="btn-outline">Exams & Assessment office</Link>
          </div>
        </div>
      </section>
    </>
  );
}
