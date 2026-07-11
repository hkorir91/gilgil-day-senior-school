"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Media } from "@/components/Placeholder";
import { galleryFilters } from "@/lib/data";
import { useContent } from "@/lib/content";

// Map gallery filters to designed placeholder art kinds (used when no photo yet).
function kindFor(filter: string) {
  switch (filter) {
    case "Labs":
    case "STEM":
      return "lab" as const;
    case "Sports":
      return "field" as const;
    case "Assemblies":
      return "assembly" as const;
    case "Academics":
      return "book" as const;
    case "School compound":
      return "compound" as const;
    case "School farm":
    case "Agriculture":
      return "field" as const;
    default:
      return "generic" as const;
  }
}

export default function Gallery() {
  const { gallery } = useContent();
  const [filter, setFilter] = useState<string | null>(null);

  const filtered = gallery.filter((g) => !filter || g.filter === filter);

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Life at Gilgil Day, in pictures."
        intro="Assemblies, labs, clubs, sports, the school farm and everyday moments across the compound. New photos are added as school events happen."
      />

      <section className="shell py-12">
        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`border px-3 py-1.5 text-[12px] font-semibold ${
              !filter ? "border-maroon-700 bg-maroon-700 text-white" : "border-mist-300 hover:border-maroon-700"
            }`}
          >
            All
          </button>
          {galleryFilters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f === filter ? null : f)}
              className={`border px-3 py-1.5 text-[12px] font-semibold ${
                filter === f ? "border-maroon-700 bg-maroon-700 text-white" : "border-mist-300 hover:border-maroon-700"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-5 pb-16 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((g, i) => (
            <figure key={`${g.title}-${i}`} className="group border border-mist-200 hover:border-maroon-500">
              <Media label={g.title} ratio="aspect-[4/3]" src={g.photo || undefined} kind={kindFor(g.filter)} />
              <figcaption className="flex items-center justify-between gap-3 p-4">
                <span className="font-display text-sm font-semibold text-charcoal-900 group-hover:text-maroon-700">
                  {g.title}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-mist-500">{g.filter}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="pb-16 text-sm text-mist-600">No photos in this category yet. Check back soon.</p>
        )}
      </section>
    </>
  );
}
