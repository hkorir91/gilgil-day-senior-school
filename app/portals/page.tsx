import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { LinkTile } from "@/components/Cards";

export const metadata: Metadata = { title: "Portals" };

export default function Portals() {
  return (
    <>
      <PageHeader
        eyebrow="Portals"
        title="One school, four portals."
        intro="The staff portal, parent portal and student LMS launch in phases. Demo access is available now so the school community can preview each portal."
      />
      <section className="shell grid gap-5 py-16 sm:grid-cols-2 lg:grid-cols-4 md:py-20">
        <LinkTile href="/portals/staff" title="Staff Portal" desc="Timetables, notes, assignments, announcements and department resources." cta="Sign in (demo)" />
        <LinkTile href="/portals/parent" title="Parent Portal" desc="Announcements, circulars, results, fees, meetings and the school calendar." cta="Sign in (demo)" />
        <LinkTile href="/portals/student" title="Student LMS" desc="Notes, assignments, quizzes, past papers and career resources." cta="Sign in (demo)" />
        <LinkTile href="/portals/admin" title="Admin Login" desc="Manage users, content, results, downloads and every platform section." cta="Sign in (demo)" />
      </section>
    </>
  );
}
