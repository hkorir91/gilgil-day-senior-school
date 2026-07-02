import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SectionHeading, ProfileCard, Notice } from "@/components/Cards";
import { administration, departments } from "@/lib/data";

export const metadata: Metadata = { title: "Staff" };

export default function Staff() {
  return (
    <>
      <PageHeader
        eyebrow="Our people"
        title="Staff of Gilgil Day Senior School."
        intro="School administration, teaching staff and non-teaching staff. All portraits and names are placeholders to be replaced with official content."
      />
      <section className="shell py-16 md:py-20">
        <SectionHeading eyebrow="Administration" title="School leadership" />
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {administration.map((p) => <ProfileCard key={p.role} person={p} />)}
        </div>
      </section>
      <section className="bg-mist-50 py-16 md:py-20">
        <div className="shell">
          <SectionHeading eyebrow="Teaching staff" title="Teachers by department" />
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => (
              <div key={d.slug} className="rule-card bg-white">
                <h3 className="font-display text-lg font-semibold">{d.name}</h3>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-mist-500">{d.head}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-mist-600">
                  <li>Teacher name placeholder</li>
                  <li>Teacher name placeholder</li>
                  <li>Teacher name placeholder</li>
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rule-card bg-white">
              <h3 className="font-display text-lg font-semibold">Non-teaching staff (NTS)</h3>
              <p className="mt-2 text-sm text-mist-600">Office, catering, grounds, security and support staff — list placeholder managed from the admin dashboard.</p>
            </div>
            <div className="rule-card bg-white">
              <h3 className="font-display text-lg font-semibold">Staff portal</h3>
              <p className="mt-2 text-sm text-mist-600">Teachers manage notes, assignments, timetables and announcements in the Staff Portal.</p>
              <a href="/portals/staff" className="btn-maroon mt-4">Open Staff Portal</a>
            </div>
          </div>
          <div className="mt-8"><Notice>Staff lists and portraits are placeholders pending official school data.</Notice></div>
        </div>
      </section>
    </>
  );
}
