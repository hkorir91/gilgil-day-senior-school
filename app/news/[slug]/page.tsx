import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Media } from "@/components/Placeholder";
import { news } from "@/lib/data";

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const n = news.find((x) => x.slug === params.slug);
  return { title: n ? n.title : "News" };
}

export default function Article({ params }: { params: { slug: string } }) {
  const n = news.find((x) => x.slug === params.slug);
  if (!n) notFound();
  const more = news.filter((x) => x.slug !== n.slug).slice(0, 3);

  return (
    <article className="shell max-w-3xl py-14 md:py-20">
      <p className="eyebrow">{n.category} · {n.date}</p>
      <h1 className="mt-4 font-display text-3xl font-semibold leading-tight md:text-5xl">{n.title}</h1>
      <div className="mt-8"><Media label="Article main photo" ratio="aspect-[16/8]" /></div>
      <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-charcoal-800">
        {n.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      <div className="mt-12 border-t border-mist-200 pt-8">
        <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-maroon-700">More news</h2>
        <ul className="mt-4 space-y-3">
          {more.map((m) => (
            <li key={m.slug}>
              <Link href={`/news/${m.slug}`} className="font-display text-base font-semibold hover:text-maroon-700">{m.title}</Link>
              <p className="text-[11px] uppercase tracking-wider text-mist-500">{m.category} · {m.date}</p>
            </li>
          ))}
        </ul>
        <Link href="/news" className="btn-outline mt-8">All news</Link>
      </div>
    </article>
  );
}
