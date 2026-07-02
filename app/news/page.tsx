"use client";

import Link from "next/link";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Media } from "@/components/Placeholder";
import { news, newsCategories } from "@/lib/data";

export default function News() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const featured = news.find((n) => n.featured) ?? news[0];
  const filtered = news.filter(
    (n) =>
      (!category || n.category === category) &&
      (n.title.toLowerCase().includes(query.toLowerCase()) || n.excerpt.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <>
      <PageHeader
        eyebrow="News & blog"
        title="Announcements, events and school life."
        intro="Official announcements, events, academic and assessment updates, clubs and sports, and career guidance news."
      />

      <section className="shell py-12">
        {/* Featured */}
        <Link href={`/news/${featured.slug}`} className="group grid gap-0 border border-mist-200 hover:border-maroon-500 lg:grid-cols-2">
          <Media label="Featured article photo" ratio="aspect-[16/9] lg:aspect-auto lg:h-full" />
          <div className="p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon-700">Featured · {featured.category} · {featured.date}</p>
            <h2 className="mt-3 font-display text-2xl font-semibold group-hover:text-maroon-700 md:text-3xl">{featured.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-mist-600">{featured.excerpt}</p>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-maroon-700">Read article →</p>
          </div>
        </Link>

        {/* Search + filters */}
        <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setCategory(null)} className={`border px-3 py-1.5 text-[12px] font-semibold ${!category ? "border-maroon-700 bg-maroon-700 text-white" : "border-mist-300"}`}>All</button>
            {newsCategories.map((c) => (
              <button key={c} onClick={() => setCategory(c === category ? null : c)} className={`border px-3 py-1.5 text-[12px] font-semibold ${category === c ? "border-maroon-700 bg-maroon-700 text-white" : "border-mist-300 hover:border-maroon-700"}`}>
                {c}
              </button>
            ))}
          </div>
          <input value={query} onChange={(e) => setQuery(e.target.value)} className="input md:max-w-xs" placeholder="Search news…" aria-label="Search news" />
        </div>

        {/* Listing */}
        <div className="mt-8 grid gap-5 pb-16 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((n) => (
            <Link key={n.slug} href={`/news/${n.slug}`} className="group border border-mist-200 hover:border-maroon-500">
              <Media label="Article photo" ratio="aspect-[16/8]" />
              <div className="p-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon-700">{n.category} · {n.date}</p>
                <h3 className="mt-2 font-display text-lg font-semibold group-hover:text-maroon-700">{n.title}</h3>
                <p className="mt-2 text-sm text-mist-600">{n.excerpt}</p>
              </div>
            </Link>
          ))}
          {filtered.length === 0 && (
            <p className="col-span-full border border-dashed border-mist-300 bg-mist-50 p-8 text-center text-sm text-mist-600">
              No articles match that search. Clear the filters to see all news.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
