"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { SectionHeading } from "@/components/Cards";
import { Media } from "@/components/Placeholder";

export default function Alumni() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageHeader
        eyebrow="Alumni"
        title="Once of Gilgil Day, always of Gilgil Day."
        intro="Former students strengthen the school through stories, mentorship and contributions. Register below to stay connected."
      />
      <section className="shell grid gap-10 py-16 lg:grid-cols-[1.1fr_1fr] md:py-20">
        <div>
          <SectionHeading eyebrow="Alumni stories" title="Where our former students are now" />
          <div className="grid gap-5 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <article key={i} className="rule-card">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-mist-500">Alumni story</p>
                <h3 className="mt-1 font-display text-lg font-semibold">Story placeholder {i}</h3>
                <p className="mt-2 text-sm text-mist-600">A former student's journey from Gilgil Day into study, work or enterprise. Stories are collected via the registration form.</p>
              </article>
            ))}
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <div className="rule-card">
              <h3 className="font-display text-lg font-semibold">Mentorship</h3>
              <p className="mt-2 text-sm text-mist-600">Alumni mentor current learners on careers and pathways — coordinated with the Director of Studies.</p>
            </div>
            <div className="rule-card">
              <h3 className="font-display text-lg font-semibold">Contribute</h3>
              <p className="mt-2 text-sm text-mist-600">Support bursaries, learning materials and school projects through the Support page.</p>
              <a href="/support" className="mt-3 inline-block text-xs font-semibold uppercase tracking-[0.16em] text-maroon-700">Support a student →</a>
            </div>
          </div>
          <div className="mt-10">
            <SectionHeading eyebrow="Alumni gallery" title="Through the years" />
            <div className="grid grid-cols-3 gap-3">
              <Media label="Alumni event" ratio="aspect-square" />
              <Media label="Class reunion" ratio="aspect-square" />
              <Media label="Mentorship day" ratio="aspect-square" />
            </div>
          </div>
        </div>
        <aside className="h-fit border border-mist-200 bg-white p-6 lg:sticky lg:top-32">
          <h3 className="font-display text-xl font-semibold">Alumni registration</h3>
          {sent ? (
            <p className="mt-4 border-l-2 border-maroon-700 bg-mist-50 p-4 text-sm">Registered (demo). Real registrations will be stored once the backend is connected.</p>
          ) : (
            <div className="mt-4 grid gap-3">
              {["Full name", "Year completed / class", "Phone or email", "Current occupation / study"].map((l) => (
                <div key={l}><label className="label">{l}</label><input className="input" /></div>
              ))}
              <div><label className="label">Your short story (optional)</label><textarea className="input min-h-[90px]" /></div>
              <button onClick={() => setSent(true)} className="btn-maroon">Register as alumni</button>
            </div>
          )}
        </aside>
      </section>
    </>
  );
}
