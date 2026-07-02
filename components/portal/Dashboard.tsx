"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { dashboards, demoAccounts, type Role } from "@/lib/data";

export default function Dashboard({ role }: { role: Role }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const cfg = dashboards[role];
  const account = demoAccounts[role];

  useEffect(() => {
    const raw = localStorage.getItem("gdss-session");
    const session = raw ? (JSON.parse(raw) as { role: Role }) : null;
    if (!session || session.role !== role) router.replace(`/portals/${role}`);
    else setReady(true);
  }, [role, router]);

  if (!ready) return <div className="shell py-24 text-sm text-mist-500">Checking your session…</div>;

  return (
    <div className="min-h-[70vh] bg-mist-50">
      <div className="border-b border-mist-200 bg-charcoal-900 text-white">
        <div className="shell flex flex-col justify-between gap-4 py-8 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow eyebrow-light">{cfg.heading}</p>
            <h1 className="mt-3 font-display text-2xl font-semibold md:text-3xl">
              Welcome, {account.name}
            </h1>
            <p className="mt-1 text-sm text-mist-300">{account.title} · {cfg.sub}</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="btn-ghost-light !py-2 text-xs">Public site</Link>
            <button
              onClick={() => { localStorage.removeItem("gdss-session"); router.push(`/portals/${role}`); }}
              className="btn !bg-maroon-700 !py-2 text-xs text-white hover:!bg-maroon-800"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="shell grid gap-5 py-10 md:grid-cols-2 xl:grid-cols-3">
        {cfg.modules.map((m) => (
          <section key={m.title} className="flex flex-col border border-mist-200 bg-white">
            <div className="border-b border-mist-100 px-5 py-4">
              <h2 className="font-display text-base font-semibold text-charcoal-900">{m.title}</h2>
              <p className="mt-1 text-[12px] text-mist-600">{m.desc}</p>
            </div>
            <ul className="flex-1 space-y-2.5 px-5 py-4">
              {m.items.map((item) => (
                <li key={item} className="flex gap-2 text-[13px] leading-snug text-charcoal-800">
                  <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-maroon-700" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            {m.action && (
              <button
                onClick={() => alert("Demo action. This will be wired to the backend in a later phase.")}
                className="border-t border-mist-100 px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-maroon-700 hover:bg-maroon-50"
              >
                {m.action} →
              </button>
            )}
          </section>
        ))}
      </div>
      <div className="shell pb-12">
        <p className="border border-dashed border-mist-300 bg-white px-4 py-3 text-[12px] text-mist-600">
          Demo dashboard with mock data. The layout, modules and permissions are production-ready; connecting a database (Supabase/PostgreSQL) activates each module.
        </p>
      </div>
    </div>
  );
}
