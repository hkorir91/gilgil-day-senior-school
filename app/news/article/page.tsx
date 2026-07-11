"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Media } from "@/components/Placeholder";
import { useContent } from "@/lib/content";

function Article() {
  const params = useSearchParams();
  const slug = params.get("slug") || "";
  const { news, loaded } = useContent();
  const post = news.find((n) => n.slug === slug);

  if (!post) {
    return (
      <div className="shell py-24">
        <p className="text-sm text-mist-600">{loaded ? "Article not found." : "Loading article…"}</p>
        <Link href="/news" className="btn-outline mt-6 !py-2 text-xs">← Back to News</Link>
      </div>
    );
  }

  return (
    <article className="shell max-w-3xl py-14 pb-20">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon-700">{post.category} · {post.date}</p>
      <h1 className="mt-4 font-display text-3xl font-semibold leading-tight text-charcoal-900 md:text-4xl">{post.title}</h1>
      <div className="mt-8">
        <Media label={post.title} src={post.photo || undefined} ratio="aspect-[16/8]" />
      </div>
      <div className="mt-8 space-y-5">
        {post.body.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-charcoal-800">{p}</p>
        ))}
      </div>
      <Link href="/news" className="btn-outline mt-10 !py-2 text-xs">← Back to News</Link>
    </article>
  );
}

export default function ArticlePage() {
  return (
    <Suspense fallback={<div className="shell py-24 text-sm text-mist-500">Loading article…</div>}>
      <Article />
    </Suspense>
  );
}
