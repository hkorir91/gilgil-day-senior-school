"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { downloadCategories } from "@/lib/data";
import { useContent } from "@/lib/content";

export default function Downloads() {
  const { downloads } = useContent();
  const [cat, setCat] = useState<string | null>(null);
  const items = cat ? downloads.filter((d) => d.category === cat) : downloads;

  return (
    <>
      <PageHeader
        eyebrow="Downloads centre"
        title="Official documents in one place."
        intro="Admission documents, circulars, academic resources, timetables, past papers, policies, club forms, results files, career guidance and assessment documents."
      />
      <section className="shell py-12 pb-20">
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setCat(null)} className={`border px-3 py-1.5 text-[12px] font-semibold ${!cat ? "border-maroon-700 bg-maroon-700 text-white" : "border-mist-300"}`}>All</button>
          {downloadCategories.map((c) => (
            <button key={c} onClick={() => setCat(c === cat ? null : c)} className={`border px-3 py-1.5 text-[12px] font-semibold ${cat === c ? "border-maroon-700 bg-maroon-700 text-white" : "border-mist-300 hover:border-maroon-700"}`}>
              {c}
            </button>
          ))}
        </div>
        <ul className="mt-8 divide-y divide-mist-200 border border-mist-200 bg-white">
          {items.map((d) => (
            <li key={d.name} className="flex flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold">{d.name}</p>
                <p className="text-[11px] uppercase tracking-wider text-mist-500">{d.category} · {d.size}</p>
              </div>
              {d.restricted ? (
                <a href="/portals/parent" className="btn-outline !py-2 text-xs">View in Parent Portal</a>
              ) : d.url ? (
                <a href={`${d.url}?dl=1`} className="btn-maroon !py-2 text-xs">Download</a>
              ) : (
                <button onClick={() => alert("This document has not been attached yet. It will be available once uploaded from the admin dashboard.")} className="btn-maroon !py-2 text-xs">Download</button>
              )}
            </li>
          ))}
          {items.length === 0 && <li className="p-8 text-center text-sm text-mist-600">No files in this category yet. Files appear here once uploaded by the admin.</li>}
        </ul>
      </section>
    </>
  );
}
