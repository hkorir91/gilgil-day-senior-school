"use client";

import PageHeader from "@/components/PageHeader";
import { SectionHeading, ProfileCard, Notice } from "@/components/Cards";
import { Avatar } from "@/components/Placeholder";
import { departments, sitePhotos } from "@/lib/data";
import { useContent, staticPeopleSections } from "@/lib/content";

export default function Staff() {
  const { peopleBySection } = useContent();
  const sections = peopleBySection ?? staticPeopleSections();
  const principalList = sections.principal ?? [];
  const deputies = sections.deputies ?? [];
  const academicLeadership = sections.academicLeadership ?? [];
  const pathwayHeads = sections.pathwayHeads ?? [];
  const trackHeads = sections.trackHeads ?? [];
  const coordinators = sections.coordinators ?? [];
  const teachers = sections.teachers ?? [];
  const executive = [...principalList, ...deputies];
  return (
    <>
      <PageHeader
        eyebrow="Our people"
        title="Staff of Gilgil Day Senior School."
        intro="School executive, academic leadership, pathway and track heads, coordinators, teachers and non-teaching staff. Portraits are placeholders until official photos are uploaded from the Admin dashboard."
      />

      {/* Executive */}
      <section className="shell py-16 md:py-20">
        <SectionHeading eyebrow="Executive" title="Principal and Deputies" />
        <div className="grid gap-5 sm:grid-cols-3">
          {executive.map((p) => <ProfileCard key={p.name} person={p} size="lg" />)}
        </div>
      </section>

      {/* Academic Leadership */}
      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Academic Leadership" title="Dean of Academics and Bursar" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {academicLeadership.map((p) => <ProfileCard key={p.name} person={p} />)}
          </div>
        </div>
      </section>

      {/* Pathway Heads */}
      <section className="shell py-16 md:py-20">
        <SectionHeading eyebrow="Pathway Heads" title="Heads of STEM, Social Sciences and Contemporary Issues" />
        <div className="grid gap-5 md:grid-cols-3">
          {pathwayHeads.map((p) => <ProfileCard key={p.name} person={p} />)}
        </div>
      </section>

      {/* Track Heads */}
      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Track Heads" title="Heads of tracks and subjects" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trackHeads.map((p) => <ProfileCard key={p.name} person={p} />)}
          </div>
        </div>
      </section>

      {/* Coordinators */}
      <section className="shell py-16 md:py-20">
        <SectionHeading eyebrow="Coordinators" title="Head of Class Teachers and Head of Games" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coordinators.map((p) => <ProfileCard key={p.name} person={p} />)}
        </div>
      </section>

      {/* Teachers by department */}
      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Teaching Staff" title="Teachers by department" sub="Names and portraits are uploaded by administration from the admin dashboard." />
          {teachers.length > 0 && (
            <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {teachers.map((t) => <ProfileCard key={t.name} person={t} />)}
            </div>
          )}
          <div className="grid gap-5 md:grid-cols-2">
            {departments.filter((d) => d.teachers && d.teachers.length > 0).map((d) => (
              <div key={d.slug} className="border border-mist-200 bg-white">
                <div className="border-b border-mist-200 bg-mist-50 p-4">
                  <h3 className="font-display text-lg font-semibold text-charcoal-900">{d.name}</h3>
                  <p className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-maroon-700">{d.head}</p>
                  <p className="mt-2 text-[12px] text-mist-600">Subjects: {d.items.join(", ")}</p>
                </div>
                <ul className="divide-y divide-mist-100">
                  {d.teachers!.map((t) => (
                    <li key={t.name} className="flex items-center gap-3 px-4 py-3">
                      <div className="w-11 shrink-0">
                        <Avatar name={t.name} src={sitePhotos.teacher} palette="charcoal" size="sm" ratio="aspect-square" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-charcoal-900">{t.name}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {t.subjects.map((s) => (
                            <span key={s} className="inline-block bg-maroon-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-maroon-700">{s}</span>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rule-card bg-white">
              <h3 className="font-display text-lg font-semibold">Non-Teaching Staff (NTS)</h3>
              <p className="mt-2 text-sm text-mist-600">Office, catering, grounds, security and support staff — list managed from the admin dashboard.</p>
            </div>
            <div className="rule-card bg-white">
              <h3 className="font-display text-lg font-semibold">Staff Portal</h3>
              <p className="mt-2 text-sm text-mist-600">Teachers manage notes, assignments, timetables and announcements in the Staff Portal.</p>
              <a href="/portals/staff" className="btn-maroon mt-4">Open Staff Portal</a>
            </div>
          </div>
          <div className="mt-8"><Notice>Portraits are initials-on-gradient placeholders. Real photos are uploaded from the Admin dashboard under Users &amp; Profiles.</Notice></div>
        </div>
      </section>
    </>
  );
}
