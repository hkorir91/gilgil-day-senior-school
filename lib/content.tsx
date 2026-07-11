"use client";

// ============================================================
// Site content layer. Fetches live content from /api/content
// (Cloudflare D1 via Pages Functions). Any section with no rows
// in the database falls back to the static defaults in lib/data.ts
// — so the site always renders, even before the DB is populated.
// ============================================================

import { createContext, useContext, useEffect, useState } from "react";
import {
  news as defaultNews,
  gallery as defaultGallery,
  downloads as defaultDownloads,
  studentsCouncil,
  kcse2025,
  principal,
  leadership,
  type NewsPost,
} from "@/lib/data";

export type DbNews = {
  id: number; slug: string; title: string; category: string; date: string;
  excerpt: string; body: string; photo?: string | null; featured: number; published: number;
};
export type DbGallery = { id: number; title: string; filter: string; photo?: string | null; sort: number };
export type DbDownload = { id: number; name: string; category: string; size: string; url?: string | null; restricted: number; sort: number };
export type DbPerson = { id: number; name: string; role: string; short?: string | null; section: string; photo?: string | null; message?: string | null; sort: number };
export type DbCouncil = { id: number; name: string; role: string; photo?: string | null; sort: number };
export type DbAchiever = { id: number; position: string; grade: string; destination?: string | null; note?: string | null; photo?: string | null; sort: number };

export type PersonLike = { name: string; role: string; short?: string; photo?: string; message?: string };

export type SiteContent = {
  loaded: boolean;
  news: (NewsPost & { photo?: string | null })[];
  gallery: { title: string; filter: string; photo?: string | null }[];
  downloads: { name: string; category: string; size: string; url?: string | null; restricted?: boolean }[];
  peopleBySection: Record<string, PersonLike[]> | null; // null → use static leadership
  council: { name: string; role: string; photo?: string | null }[];
  achievers: { position: string; grade: string; destination?: string | null; note?: string | null; photo?: string | null }[];
  settings: Record<string, string>;
};

function newsFromDb(rows: DbNews[]): SiteContent["news"] {
  return rows.map((r) => ({
    slug: r.slug,
    title: r.title,
    category: r.category,
    date: r.date,
    excerpt: r.excerpt,
    body: (r.body || "").split(/\n\s*\n/).filter(Boolean),
    featured: !!r.featured,
    photo: r.photo,
  }));
}

const defaults: SiteContent = {
  loaded: false,
  news: defaultNews,
  gallery: defaultGallery,
  downloads: defaultDownloads.map((d) => ({ ...d })),
  peopleBySection: null,
  council: studentsCouncil.members,
  achievers: kcse2025.performers.map((p) => ({ ...p })),
  settings: {},
};

const ContentContext = createContext<SiteContent>(defaults);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaults);

  useEffect(() => {
    let alive = true;
    fetch("/api/content")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => {
        if (!alive) return;
        const bySection: Record<string, PersonLike[]> = {};
        for (const p of (data.people || []) as DbPerson[]) {
          (bySection[p.section] ||= []).push({
            name: p.name,
            role: p.role,
            short: p.short || undefined,
            photo: p.photo || undefined,
            message: p.message || undefined,
          });
        }
        setContent({
          loaded: true,
          news: data.news?.length ? newsFromDb(data.news) : defaults.news,
          gallery: data.gallery?.length ? data.gallery : defaults.gallery,
          downloads: data.downloads?.length
            ? data.downloads.map((d: DbDownload) => ({ ...d, restricted: !!d.restricted }))
            : defaults.downloads,
          peopleBySection: data.people?.length ? bySection : null,
          council: data.council?.length ? data.council : defaults.council,
          achievers: data.achievers?.length ? data.achievers : defaults.achievers,
          settings: data.settings || {},
        });
      })
      .catch(() => {
        // API unreachable (e.g. plain `next dev` without wrangler) → keep static defaults.
        if (alive) setContent((c) => ({ ...c, loaded: true }));
      });
    return () => { alive = false; };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

// Static leadership defaults, grouped the same way as DB sections.
export function staticPeopleSections(): Record<string, PersonLike[]> {
  return {
    principal: [principal],
    deputies: leadership.deputies,
    academicLeadership: leadership.academicLeadership,
    pathwayHeads: leadership.pathwayHeads,
    trackHeads: leadership.trackHeads,
    coordinators: leadership.coordinators,
  };
}
