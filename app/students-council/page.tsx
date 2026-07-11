"use client";

import PageHeader from "@/components/PageHeader";
import { SectionHeading, ProfileCard } from "@/components/Cards";
import { Media } from "@/components/Placeholder";
import { studentsCouncil, sitePhotos } from "@/lib/data";
import { useContent } from "@/lib/content";

export default function StudentsCouncil() {
  const { council, settings } = useContent();
  const captainMessage = settings.captain_message || studentsCouncil.captainMessage;
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
            &ldquo;{captainMessage}&rdquo;
            <footer className="mt-4 text-sm font-semibold not-italic">— School Captain, {new Date().getFullYear()}</footer>
          </blockquote>
        </div>
        <Media label="Students' Council group photo" kind="assembly" src={sitePhotos.assembly} />
      </section>
      {/* ==== EXECUTIVE: School Captain + Deputies ==== */}
      <section className="bg-charcoal-900 py-16 text-white md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="School Executive" title="School Captain and Deputies" light />
          <div className="grid gap-6 sm:grid-cols-3">
            {studentsCouncil.executive.map((exec) => {
              const dbMatch = council.find((m) => m.role === exec.role);
              const person: { name: string; role: string; photo?: string | null } = dbMatch || exec;
              return (
                <div key={exec.role} className="border border-white/10 bg-white/5 p-2">
                  <ProfileCard person={{ name: person.name, role: person.role, photo: person.photo || sitePhotos.student }} size="lg" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==== AREA COUNCILS: Captain + Deputy for each area ==== */}
      <section className="bg-gradient-to-br from-mist-50 via-amber-50/40 to-emerald-50/40 py-16 md:py-20">
        <div className="shell">
          <SectionHeading
            eyebrow="Area councils"
            title="Serving every corner of school life"
            sub="Each area of school life is led by a Captain and a Deputy — student leaders who take responsibility on behalf of the whole learner body."
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {studentsCouncil.areas.map((area, idx) => {
              // Colour rotation for the header stripe
              const stripes = [
                "from-maroon-700 to-maroon-500",
                "from-emerald-600 to-emerald-400",
                "from-amber-600 to-amber-400",
                "from-sky-600 to-sky-400",
                "from-rose-600 to-rose-400",
                "from-violet-600 to-violet-400",
                "from-teal-600 to-teal-400",
                "from-indigo-600 to-indigo-400",
                "from-orange-600 to-orange-400",
              ];
              const stripe = stripes[idx % stripes.length];
              const captainDbMatch = council.find((m) => m.role === `${area} Captain`);
              const deputyDbMatch = council.find((m) => m.role === `${area} Deputy`);
              const captain = captainDbMatch || { name: "Name — placeholder", role: `${area} Captain`, photo: undefined };
              const deputy  = deputyDbMatch  || { name: "Name — placeholder", role: `${area} Deputy`,  photo: undefined };

              return (
                <div key={area} className="border border-mist-200 bg-white shadow-sm">
                  <div className={`bg-gradient-to-r ${stripe} px-4 py-3`}>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-white">{area}</p>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-mist-200">
                    <div className="p-4 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-maroon-700">Captain</p>
                      <p className="mt-2 font-display text-base font-semibold leading-tight text-charcoal-900">{captain.name}</p>
                    </div>
                    <div className="p-4 text-center">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal-600">Deputy</p>
                      <p className="mt-2 font-display text-base font-semibold leading-tight text-charcoal-900">{deputy.name}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-10 border border-dashed border-mist-300 bg-white/70 p-4 text-center text-[12px] text-mist-600">
            Names are uploaded from the Admin dashboard → <strong>Students&apos; Council</strong>. Add each learner with the exact role name (e.g. <em>Academics Captain</em>, <em>Environment Deputy</em>) and they appear in the right slot automatically. Only the School Captain and Deputies show a portrait; area councils display names and dockets only.
          </p>
        </div>
      </section>
    </>
  );
}
