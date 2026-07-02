"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navigation, school } from "@/lib/data";
import Logo from "./Logo";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [portalsOpen, setPortalsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
      {/* Top strip */}
      <div className="bg-charcoal-900 text-mist-300">
        <div className="shell flex h-9 items-center justify-between text-[11px] tracking-wide">
          <p className="hidden sm:block">{school.type} · {school.location}</p>
          <p className="sm:hidden">{school.location}</p>
          <div className="flex items-center gap-4">
            <Link href="/admissions" className="hover:text-white">Admissions</Link>
            <Link href="/support" className="hover:text-white">Support a Student</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-mist-200 bg-white/95 backdrop-blur">
        <div className="shell flex h-[72px] items-center justify-between gap-6">
          <Logo />
          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button className={`px-3 py-2 text-[13px] font-semibold ${pathname.startsWith("/portals") ? "text-maroon-700" : "text-charcoal-800"} hover:text-maroon-700`}>
                    {item.label} <span aria-hidden>▾</span>
                  </button>
                  <div className="invisible absolute right-0 top-full w-52 border border-mist-200 bg-white opacity-0 shadow-lg transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                    {item.children.map((c) => (
                      <Link key={c.href} href={c.href} className="block px-4 py-3 text-[13px] font-medium hover:bg-maroon-50 hover:text-maroon-700">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-[13px] font-semibold hover:text-maroon-700 ${pathname === item.href ? "text-maroon-700" : "text-charcoal-800"}`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>
          <button
            onClick={() => setOpen(!open)}
            className="xl:hidden btn-outline !px-4 !py-2"
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-b border-mist-200 bg-white xl:hidden">
          <nav className="shell grid gap-1 py-4" aria-label="Mobile">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.label}>
                  <button
                    onClick={() => setPortalsOpen(!portalsOpen)}
                    className="flex w-full items-center justify-between px-2 py-3 text-sm font-semibold"
                    aria-expanded={portalsOpen}
                  >
                    {item.label} <span aria-hidden>{portalsOpen ? "−" : "+"}</span>
                  </button>
                  {portalsOpen &&
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
          </nav>
        </div>
      )}
    </header>
  );
}
