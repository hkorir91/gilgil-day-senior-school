import Link from "next/link";
import Logo from "./Logo";
import { school, navigation } from "@/lib/data";

const footerLinks = [
  { label: "News & Events", href: "/news" },
  { label: "Gallery", href: "/gallery" },
  { label: "Downloads", href: "/downloads" },
  { label: "Student Portal", href: "/portals/student" },
  { label: "Contact Us", href: "/contact" },
];

export default function Footer() {
  return (
    <>
      {/* ===== CTA banner ===== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-sky-900 via-sky-800 to-sky-900 py-10 text-white">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-maroon-700/30 blur-3xl" aria-hidden />
        <div className="shell relative grid gap-6 sm:grid-cols-[1.4fr_1fr] sm:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold leading-tight text-amber-300 md:text-3xl">Building Knowledge, Character and Opportunity</h2>
            <p className="mt-3 max-w-xl text-sm text-mist-200">At Gilgil Day Senior School, every learner is encouraged to discover their strengths, pursue excellence and contribute positively to society.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:justify-end">
            <Link href="/contact" className="inline-flex items-center gap-1.5 bg-amber-500 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-charcoal-900 hover:bg-amber-400">Contact the School →</Link>
            <Link href="/academics" className="inline-flex items-center gap-1.5 border border-white/40 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-white hover:bg-white hover:text-charcoal-900">Explore Academics →</Link>
          </div>
        </div>
      </section>

      {/* ===== Main footer ===== */}
      <footer className="bg-charcoal-900 text-mist-300">
        <div className="shell grid gap-10 py-14 md:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-5 text-sm leading-relaxed text-mist-300">{school.type}</p>
            <p className="mt-2 text-sm">{school.location}</p>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              {navigation.filter((n) => !n.children).slice(1, 8).map((n) => (
                <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white">Community</h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.map((n) => (
                <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white">Contact Us</h3>
            <p className="text-sm">📞 {school.phone}</p>
            <p className="mt-1 text-sm">✉ {school.emailAlt}</p>
            <p className="mt-2 text-sm">{school.poBox}</p>
            <p className="mt-4 text-xs italic text-mist-400">"Education is the most powerful weapon which you can use to change the world."<br/>— Nelson Mandela</p>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="shell flex flex-col items-start justify-between gap-2 py-5 text-xs sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {school.name}. All rights reserved.</p>
            <p className="uppercase tracking-[0.22em] text-mist-500">{school.motto}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
