import Link from "next/link";
import { school, footerLinks, navigation } from "@/lib/data";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 text-mist-300">
      <div className="shell grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo light />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            A public mixed day Senior School in {school.location}. Modern, organised
            and ready for the CBC/CBE future.
          </p>
          <p className="mt-4 text-sm">{school.poBox}</p>
          <p className="text-sm">{school.phone} · {school.email}</p>
        </div>
        <div>
          <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white">Explore</h3>
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
      </div>
      <div className="border-t border-white/10">
        <div className="shell flex flex-col items-start justify-between gap-2 py-5 text-xs sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {school.name}. All rights reserved.</p>
          <p className="uppercase tracking-[0.22em] text-mist-500">{school.motto}</p>
        </div>
      </div>
    </footer>
  );
}
