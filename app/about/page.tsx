import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { Media } from "@/components/Placeholder";
import { SectionHeading, ProfileCard, MessageCard, Notice } from "@/components/Cards";
import { school, administration, governance, studentsCouncil } from "@/lib/data";

export const metadata: Metadata = { title: "About" };

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About the school"
        title="A public Senior School with a clear direction."
        intro={`${school.name} is a ${school.type.toLowerCase()} in ${school.location}, currently serving Grade 10, Form 3 and Form 4.`}
      />

      {/* Profile, vision, mission, values */}
      <section className="shell grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <SectionHeading eyebrow="School profile" title={school.motto} />
          <p className="max-w-xl text-[15px] leading-relaxed text-mist-600">
            School history placeholder. This section will carry the story of the school —
            its founding, growth within Gilgil Town, transition into a CBE Senior School,
            and the milestones that define its academic and community record.
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
            <h3 className="text-xs font-semibold uppercase tracking-wider text-maroon-700">Core values (placeholder)</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {school.coreValues.map((v) => (
                <span key={v} className="border border-mist-200 bg-mist-50 px-3 py-1.5 text-[12px] font-semibold">{v}</span>
              ))}
            </div>
          </div>
        </div>
        <div className="grid content-start gap-4">
          <Media label="School compound" />
          <Media label="Morning assembly" ratio="aspect-[16/8]" />
        </div>
      </section>

      {/* Messages */}
      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Leadership voices" title="Messages to the school community" />
          <div className="grid gap-5 lg:grid-cols-3">
            <MessageCard person={administration[0]} />
            {governance.map((g) => <MessageCard key={g.role} person={g} />)}
          </div>
        </div>
      </section>

      {/* Administration */}
      <section className="shell py-16 md:py-20" id="administration">
        <SectionHeading
          eyebrow="Administration"
          title="The team behind the school"
          sub="Profiles and portraits are placeholders and will be replaced with official photos and names."
        />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {administration.map((p) => <ProfileCard key={p.role} person={p} />)}
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <div className="rule-card">
            <h3 className="font-display text-lg font-semibold">Heads of track & heads of subjects</h3>
            <p className="mt-2 text-sm text-mist-600">
              Languages track, Humanities & Business track, and subject heads across both
              pathways. Names and portraits placeholder — managed from the admin dashboard.
            </p>
          </div>
          <div className="rule-card">
            <h3 className="font-display text-lg font-semibold">Teachers & non-teaching staff</h3>
            <p className="mt-2 text-sm text-mist-600">
              The full staff list, including NTS, appears on the Staff page with department
              groupings. Placeholder profiles for now.
            </p>
          </div>
          <div className="rule-card">
            <h3 className="font-display text-lg font-semibold">Students' Council & students</h3>
            <p className="mt-2 text-sm text-mist-600">
              Learner leadership representing Grade 10, Form 3 and Form 4 — including the
              School Captain. See the Students' Council page for the Captain's message.
            </p>
          </div>
          <div className="rule-card">
            <h3 className="font-display text-lg font-semibold">Contemporary Issues</h3>
            <p className="mt-2 text-sm text-mist-600">
              The department in charge of non-academic life: games, guidance & counselling,
              clubs and societies.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Notice>All names, portraits and profiles on this page are placeholders pending official school content.</Notice>
        </div>
      </section>
    </>
  );
}
