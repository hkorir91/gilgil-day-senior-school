"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { demoAccounts, type Role } from "@/lib/data";

export default function LoginForm({ role, title, intro }: { role: Role; title: string; intro: string }) {
  const router = useRouter();
  const account = demoAccounts[role];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit() {
    if (email.trim().toLowerCase() === account.email && password === account.password) {
      localStorage.setItem("gdss-session", JSON.stringify({ role, at: Date.now() }));
      router.push(`/portals/${role}/dashboard`);
    } else {
      setError("Those details don't match the demo account. Use the demo credentials shown below.");
    }
  }

  return (
    <div className="shell grid gap-10 py-16 lg:grid-cols-2 lg:gap-16">
      <div>
        <p className="eyebrow">Portals</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-charcoal-900 md:text-4xl">{title}</h1>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-mist-600">{intro}</p>
        <div className="mt-8 rule-card max-w-md">
          <p className="text-xs font-semibold uppercase tracking-wider text-maroon-700">Demo credentials</p>
          <p className="mt-2 text-sm">Email: <code className="bg-mist-100 px-1.5 py-0.5">{account.email}</code></p>
          <p className="mt-1 text-sm">Password: <code className="bg-mist-100 px-1.5 py-0.5">{account.password}</code></p>
          <p className="mt-3 text-[12px] text-mist-500">Demo authentication only. Real accounts will be issued by the school when the portal launches.</p>
        </div>
      </div>
      <div className="max-w-md border border-mist-200 bg-white p-8">
        <div className="grid gap-4">
          <div>
            <label className="label" htmlFor="email">Email address</label>
            <input id="email" className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <div>
            <label className="label" htmlFor="password">Password</label>
            <input id="password" className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={(e) => e.key === "Enter" && submit()} />
          </div>
          {error && <p className="border-l-2 border-maroon-700 bg-maroon-50 p-3 text-[13px] text-maroon-800">{error}</p>}
          <button onClick={submit} className="btn-maroon w-full">Sign in</button>
          <p className="text-center text-[12px] text-mist-500">Forgot password? Contact the school office (placeholder).</p>
        </div>
      </div>
    </div>
  );
}
