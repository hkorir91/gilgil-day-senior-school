"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Media } from "@/components/Placeholder";
import { gallery, galleryFilters } from "@/lib/data";

export default function Gallery() {
  const [filter, setFilter] = useState<string | null>(null);
  const items = filter ? gallery.filter((g) => g.filter === filter) : gallery;

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="The school in pictures."
        intro="Academic life, pathways, clubs, societies, sports, assemblies, labs, events, staff and the school compound. All images are placeholders for real photos."
      />
      <section className="shell py-12 pb-20">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilter(null)} className={`border px-3 py-1.5 text-[12px] font-semibold ${!filter ? "border-maroon-700 bg-maroon-700 text-white" : "border-mist-300"}`}>All</button>
          {galleryFilters.map((f) => (
            <button key={f} onClick={() => setFilter(f === filter ? null : f)} className={`border px-3 py-1.5 text-[12px] font-semibold ${filter === f ? "border-maroon-700 bg-maroon-700 text-white" : "border-mist-300 hover:border-maroon-700"}`}>
              {f}
            </button>
          ))}
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((g) => (
            <figure key={g.title}>
              <Media label={g.title} ratio="aspect-square" />
              <figcaption className="mt-2 text-[12px] font-semibold text-charcoal-800">{g.title}</figcaption>
              <p className="text-[11px] uppercase tracking-wider text-mist-500">{g.filter}</p>
            </figure>
          ))}
          {items.length === 0 && (
            <p className="col-span-full border border-dashed border-mist-300 bg-mist-50 p-8 text-center text-sm text-mist-600">No photos in this category yet.</p>
          )}
        </div>
      </section>
    </>
  );
}
