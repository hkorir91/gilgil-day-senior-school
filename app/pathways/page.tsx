import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { Media, Avatar } from "@/components/Placeholder";
import { pathways } from "@/lib/data";

export const metadata: Metadata = { title: "Pathways" };

export default function Pathways() {
  return (
    <>
      <PageHeader
        eyebrow="Senior School pathways"
        title="STEM and Social Sciences."
        intro="Each pathway has its own head, tracks, subjects, career links and resources. Grade 10 learners are guided into the pathway that matches their strengths and ambitions."
      />
      {pathways.map((p, i) => (
        <section key={p.slug} id={p.slug} className={`${i % 2 ? "bg-mist-50" : ""} scroll-mt-28 py-16 md:py-20`}>
          <div className="shell">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
              <div>
                <p className="eyebrow">Pathway {i + 1} of 2</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">{p.name}</h2>
                <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-mist-600">{p.summary}</p>

                {/* Tracks */}
                <div className="mt-8 grid gap-5 sm:grid-cols-2">
                  {p.tracks.map((t) => (
                    <div key={t.name} className="rule-card bg-white">
                      <h3 className="font-display text-lg font-semibold">{t.name}</h3>
                      <p className="mt-1 text-[12px] font-semibold uppercase tracking-wider text-mist-500">{t.head}</p>
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {t.subjects.map((s) => (
                          <li key={s} className="border border-mist-200 bg-mist-50 px-2.5 py-1 text-[12px] font-semibold">{s}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Careers */}
                <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-maroon-700">Career links</h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {p.careers.map((c) => (
                    <li key={c} className="flex gap-2 text-sm text-charcoal-800">
                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-maroon-700" aria-hidden />{c}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/careers" className="btn-maroon">Pathway-to-career guidance</Link>
                  <Link href="/downloads" className="btn-outline">Pathway resources</Link>
                </div>
              </div>

              <div className="grid content-start gap-4">
                <div className="flex items-center gap-4 border border-mist-200 bg-white p-4">
                  <div className="w-20 shrink-0"><Avatar name={p.head.name} src="/photos/leader.jpg" /></div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-maroon-700">{p.head.role}</p>
                    <p className="font-display text-base font-semibold">{p.head.name}</p>
                    <p className="text-[12px] text-mist-500">Pathway lead</p>
                  </div>
                </div>
                <Media label={`${p.name} — learners at work`} ratio="aspect-[16/9]" src={p.photo} kind={p.slug === "stem" ? "lab" : "book"} />
                <Media label={`${p.name} — gallery & activities`} kind={p.slug === "stem" ? "lab" : "book"} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}
