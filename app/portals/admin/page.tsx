"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit() {
    setBusy(true); setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Sign-in failed");
      router.push("/portals/admin/dashboard");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="shell grid gap-10 py-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="eyebrow">Portals</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">Admin Login</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist-600">
          Platform administration: news &amp; announcements, gallery, downloads &amp; results files,
          leadership &amp; staff, students&apos; council, achievers, logo and admin accounts.
          Changes go live on the public website instantly.
        </p>
        <div className="mt-8 rule-card max-w-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-maroon-700">Authorised access only</p>
          <p className="mt-2 text-sm text-mist-600">Admin accounts are created inside the dashboard under Admin Accounts. Contact the school administrator if you need access or a password reset.</p>
        </div>
      </div>
      <div className="max-w-md border border-mist-200 bg-white p-8">
        <div className="grid gap-4">
          <div>
            <label className="label" htmlFor="email">Email address</label>
            <input id="email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@gilgilday.co.ke" />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input id="password" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={(e) => e.key === "Enter" && submit()} />
          </div>
          {error && <p className="border-l-2 border-maroon-700 bg-maroon-50 p-3 text-[13px] text-maroon-800">{error}</p>}
          <button onClick={submit} disabled={busy} className="btn-maroon w-full">{busy ? "Signing in…" : "Sign in"}</button>
        </div>
      </div>
    </div>
  );
}
