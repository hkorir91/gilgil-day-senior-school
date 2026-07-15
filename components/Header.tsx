"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { school } from "@/lib/data";
import Logo from "./Logo";

// Inline SVG icons — no external dependency needed
const Icon = {
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M12 22s-8-7.58-8-13a8 8 0 1 1 16 0c0 5.42-8 13-8 13Z"/><circle cx="12" cy="9" r="3"/></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 2.06 4.18 2 2 0 0 1 4.05 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.64 2.62a2 2 0 0 1-.45 2.11L8 9.5a16 16 0 0 0 6.5 6.5l1.05-1.24a2 2 0 0 1 2.11-.45c.84.3 1.72.52 2.62.64A2 2 0 0 1 22 16.92Z"/></svg>,
  mail: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 6 10-6"/></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  fb: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309-.277.14-.507.328-.703.577-.322.42-.462.997-.462 1.703v1.393h3.797l-.089.386-.593 2.577-.115.703h-3v8.253c5.457-.671 9.664-5.343 9.664-11.024C24 5.928 18.626.548 12 .548S0 5.928 0 12.567c0 5.945 4.36 10.842 10.166 11.686"/></svg>,
  yt: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814ZM9.545 15.568V8.432L15.818 12l-6.273 3.568Z"/></svg>,
  wa: <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>,
  chevron: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3"><path d="m6 9 6 6 6-6"/></svg>,
};

type NavChild = { href: string; label: string };
type NavItem = { href: string; label: string; children?: NavChild[] };

// ==========================================================
// Full nav — nothing hidden. Dropdowns keep the top row compact.
// ==========================================================
const MAIN_NAV: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about", label: "About the School" },
      { href: "/support", label: "Support a Student" },
    ],
  },
  {
    href: "/academics",
    label: "Academics",
    children: [
      { href: "/academics", label: "Academic Programmes" },
      { href: "/pathways", label: "Pathways (STEM · Social Sciences)" },
      { href: "/departments", label: "Departments" },
      { href: "/exams", label: "Exams & Assessment" },
      { href: "/careers", label: "Careers Guidance" },
    ],
  },
  { href: "/admissions", label: "Admissions" },
  { href: "/staff", label: "Staff" },
  {
    href: "/students-council",
    label: "Students",
    children: [
      { href: "/students-council", label: "Students' Council" },
      { href: "/alumni", label: "KCSE 2025 Achievers" },
    ],
  },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/downloads", label: "Downloads" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const pathname = usePathname();

  const isActive = (item: NavItem) => {
    if (item.href === "/") return pathname === "/";
    if (pathname === item.href) return true;
    if (item.children && item.children.some((c) => pathname === c.href || pathname.startsWith(c.href + "/"))) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50">
      {/* ===== Utility top bar ===== */}
      <div className="bg-charcoal-900 text-mist-300">
        <div className="shell flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2 text-[11px]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="flex items-center gap-1.5"><span className="text-amber-400">{Icon.pin}</span> {school.location}</span>
            <span className="hidden sm:flex items-center gap-1.5"><span className="text-amber-400">{Icon.phone}</span> {school.phone}</span>
            <span className="hidden md:flex items-center gap-1.5"><span className="text-amber-400">{Icon.mail}</span> {school.emailAlt}</span>
            <span className="hidden lg:flex items-center gap-1.5"><span className="text-amber-400">{Icon.clock}</span> Mon–Fri · 8:00 AM–5:00 PM</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/portals/parent" className="hidden sm:inline-block whitespace-nowrap hover:text-white">Parent Portal</Link>
            <Link href="/portals/admin" className="hidden sm:inline-block whitespace-nowrap hover:text-white">Admin</Link>
            <span className="hidden sm:inline-block h-3 w-px bg-white/20" aria-hidden />
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-sky-400 hover:text-white">{Icon.fb}</a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-red-500 hover:text-white">{Icon.yt}</a>
            <a href="https://wa.me/254716851146" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-emerald-400 hover:text-white">{Icon.wa}</a>
          </div>
        </div>
      </div>

      {/* ===== Main nav ===== */}
      <div className="border-b border-mist-200 bg-white/95 backdrop-blur">
        <div className="shell flex h-[76px] items-center justify-between gap-3">
          <Logo />
          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main">
            {MAIN_NAV.map((item) =>
              item.children ? (
                // === Dropdown item ===
                <div key={item.label} className="group relative">
                  <button
                    className={`inline-flex items-center gap-1 whitespace-nowrap px-2.5 py-2 text-[12px] font-semibold uppercase tracking-wide hover:text-maroon-700 ${
                      isActive(item) ? "text-maroon-700 border-b-2 border-maroon-700" : "text-charcoal-800"
                    }`}
                  >
                    {item.label} <span className="opacity-70">{Icon.chevron}</span>
                  </button>
                  <div className="invisible absolute left-0 top-full z-50 w-64 border border-mist-200 bg-white opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className={`block px-4 py-3 text-[12px] font-medium hover:bg-maroon-50 hover:text-maroon-700 ${pathname === c.href ? "bg-maroon-50 text-maroon-700" : "text-charcoal-800"}`}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                // === Plain item ===
                <Link
                  key={item.href}
                  href={item.href}
                  className={`whitespace-nowrap px-2.5 py-2 text-[12px] font-semibold uppercase tracking-wide hover:text-maroon-700 ${
                    isActive(item) ? "text-maroon-700 border-b-2 border-maroon-700" : "text-charcoal-800"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <div className="hidden items-center gap-1.5 xl:flex">
            <Link href="/portals/student" className="whitespace-nowrap bg-emerald-600 px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-emerald-700">
              Student Portal
            </Link>
            <Link href="/portals/staff" className="whitespace-nowrap bg-sky-800 px-2.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-white hover:bg-sky-900">
              Staff Portal
            </Link>
          </div>
          <button onClick={() => setOpen(!open)} className="xl:hidden btn-outline !px-4 !py-2" aria-expanded={open} aria-label="Toggle menu">
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* ===== Mobile menu ===== */}
      {open && (
        <div className="border-b border-mist-200 bg-white xl:hidden">
          <nav className="shell grid gap-1 py-4" aria-label="Mobile">
            {MAIN_NAV.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setExpandedKey(expandedKey === item.label ? null : item.label)}
                    className="flex w-full items-center justify-between px-2 py-3 text-sm font-semibold"
                    aria-expanded={expandedKey === item.label}
                  >
                    {item.label} <span aria-hidden>{expandedKey === item.label ? "−" : "+"}</span>
                  </button>
                  {expandedKey === item.label &&
                    item.children.map((c) => (
                      <Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="block px-6 py-2.5 text-sm text-mist-600 hover:text-maroon-700">
                        {c.label}
                      </Link>
                    ))}
                </div>
              ) : (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="px-2 py-3 text-sm font-semibold hover:text-maroon-700">
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-3 grid grid-cols-2 gap-2 border-t border-mist-200 pt-3">
              <Link href="/portals/student" onClick={() => setOpen(false)} className="bg-emerald-600 px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-white">
                Student Portal
              </Link>
              <Link href="/portals/staff" onClick={() => setOpen(false)} className="bg-sky-800 px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-white">
                Staff Portal
              </Link>
              <Link href="/portals/parent" onClick={() => setOpen(false)} className="bg-amber-500 px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-white">
                Parent Portal
              </Link>
              <Link href="/portals/admin" onClick={() => setOpen(false)} className="border border-charcoal-800 px-3 py-2.5 text-center text-[11px] font-semibold uppercase tracking-wide text-charcoal-800">
                Admin Login
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
