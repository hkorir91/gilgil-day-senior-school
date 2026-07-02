import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SectionHeading, ProfileCard } from "@/components/Cards";
import { Media } from "@/components/Placeholder";
import { studentsCouncil } from "@/lib/data";

export const metadata: Metadata = { title: "Students' Council" };

export default function StudentsCouncil() {
  return (
    <>
      <PageHeader
        eyebrow="Learner leadership"
        title="The Students' Council."
        intro="Elected learner leaders representing Grade 10, Form 3 and Form 4 — the voice of the student body in school life."
      />
      <section className="shell grid gap-10 py-16 lg:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          <SectionHeading eyebrow="From the School Captain" title="A word to fellow learners" />
          <blockquote className="rule-card font-display text-lg leading-relaxed">
            “{studentsCouncil.captainMessage}”
            <footer className="mt-4 text-sm font-semibold not-italic">— School Captain, {new Date().getFullYear()}</footer>
          </blockquote>
        </div>
        <Media label="Students' Council group photo" />
      </section>
      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Council members" title="Serving the student body" />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
            {studentsCouncil.members.map((m) => <ProfileCard key={m.role} person={m} />)}
          </div>
        </div>
      </section>
    </>
  );
}
