import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SectionHeading, ProfileCard, Notice } from "@/components/Cards";
import { Avatar } from "@/components/Placeholder";
import { principal, leadership, departments, sitePhotos } from "@/lib/data";

export const metadata: Metadata = { title: "Staff" };

export default function Staff() {
  const executive = [principal, ...leadership.deputies];
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
            {leadership.academicLeadership.map((p) => <ProfileCard key={p.name} person={p} />)}
          </div>
        </div>
      </section>

      {/* Pathway Heads */}
      <section className="shell py-16 md:py-20">
        <SectionHeading eyebrow="Pathway Heads" title="Heads of STEM, Social Sciences and Contemporary Issues" />
        <div className="grid gap-5 md:grid-cols-3">
          {leadership.pathwayHeads.map((p) => <ProfileCard key={p.name} person={p} />)}
        </div>
      </section>

      {/* Track Heads */}
      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Track Heads" title="Heads of tracks and subjects" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.trackHeads.map((p) => <ProfileCard key={p.name} person={p} />)}
          </div>
        </div>
      </section>

      {/* Coordinators */}
      <section className="shell py-16 md:py-20">
        <SectionHeading eyebrow="Coordinators" title="Head of Class Teachers and Head of Games" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.coordinators.map((p) => <ProfileCard key={p.name} person={p} />)}
        </div>
      </section>

      {/* Teachers by department */}
      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Teaching Staff" title="Teachers by department" sub="Names and portraits are uploaded by administration from the admin dashboard." />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <div key={d.slug} className="border border-mist-200 bg-white">
                <div className="border-b border-mist-200 p-4">
                  <h3 className="font-display text-lg font-semibold">{d.name}</h3>
                  <p className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-mist-500">{d.head}</p>
                </div>
                <div className="grid grid-cols-3 gap-0">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-r border-mist-200 last:border-r-0">
                      <Avatar name={`${d.name} Teacher ${i}`} src={sitePhotos.teacher} palette="charcoal" size="sm" />
                      <p className="border-t border-mist-200 px-2 py-2 text-center text-[11px] font-semibold text-charcoal-800">
                        Teacher {i}
                      </p>
                    </div>
                  ))}
                </div>
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
