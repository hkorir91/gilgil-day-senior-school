import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { LinkTile } from "@/components/Cards";
import { departments } from "@/lib/data";

export const metadata: Metadata = { title: "Departments" };

export default function Departments() {
  return (
    <>
      <PageHeader
        eyebrow="Departments"
        title="Six departments, clearly organised."
        intro="Four academic departments across the two pathways, the exams and careers office led by the Director of Studies, and Contemporary Issues for co-curricular life."
      />
      <section className="shell grid gap-5 py-16 sm:grid-cols-2 lg:grid-cols-3 md:py-20">
        {departments.map((d) => (
          <LinkTile key={d.slug} href={`/departments/${d.slug}`} title={d.name} desc={d.overview} cta="Open department" />
        ))}
      </section>
    </>
  );
}
