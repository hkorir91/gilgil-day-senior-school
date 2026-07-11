"use client";

// ============================================================
// Gilgil Day Senior School — Admin Panel
// Talks to /api/* (Cloudflare Pages Functions + D1 + R2).
// Changes go live on the public site instantly.
// ============================================================

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { downloadCategories, galleryFilters, newsCategories } from "@/lib/data";

type Admin = { id: number; email: string; name: string; created_at?: string };
type Row = Record<string, any>;

const SECTIONS = [
  { key: "news", label: "News & Announcements" },
  { key: "gallery", label: "Gallery Photos" },
  { key: "downloads", label: "Downloads & Results" },
  { key: "people", label: "Leadership & Staff" },
  { key: "council", label: "Students' Council" },
  { key: "achievers", label: "List of Achievers" },
  { key: "settings", label: "Logo & Page Content" },
  { key: "admins", label: "Admin Accounts" },
] as const;

const PEOPLE_SECTIONS: { value: string; label: string }[] = [
  { value: "principal", label: "Principal" },
  { value: "deputies", label: "Deputy Principals" },
  { value: "academicLeadership", label: "Academic Leadership (Dean/DoS, Bursar)" },
  { value: "pathwayHeads", label: "Pathway Heads" },
  { value: "trackHeads", label: "Track Heads" },
  { value: "coordinators", label: "Coordinators" },
  { value: "teachers", label: "Teachers" },
];

// ---------------- small shared pieces ----------------
async function api(path: string, opts?: RequestInit) {
  const res = await fetch(`/api${path}`, { credentials: "same-origin", ...opts });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

function useCrud(resource: string) {
  const [items, setItems] = useState<Row[]>([]);
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    const data = await api(`/admin/${resource}`);
    setItems(data.items || []);
  }, [resource]);
  useEffect(() => { load().catch(() => {}); }, [load]);
  const save = async (row: Row) => {
    setBusy(true);
    try { await api(`/admin/${resource}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(row) }); await load(); }
    finally { setBusy(false); }
  };
  const remove = async (id: number) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    await api(`/admin/${resource}?id=${id}`, { method: "DELETE" });
    await load();
  };
  return { items, save, remove, busy, reload: load };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

function UploadButton({ onDone, accept, label = "Upload file" }: { onDone: (r: { url: string; size: string }) => void; accept?: string; label?: string }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  return (
    <>
      <input
        ref={ref} type="file" accept={accept} className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (!file) return;
          setBusy(true);
          try {
            const form = new FormData();
            form.append("file", file);
            const data = await api("/admin/upload", { method: "POST", body: form });
            onDone({ url: data.url, size: data.size });
          } catch (err: any) { alert(err.message); }
          finally { setBusy(false); if (ref.current) ref.current.value = ""; }
        }}
      />
      <button type="button" onClick={() => ref.current?.click()} className="btn-outline !py-2 text-xs" disabled={busy}>
        {busy ? "Uploading…" : label}
      </button>
    </>
  );
}

function Msg({ text, kind }: { text: string; kind: "ok" | "err" }) {
  if (!text) return null;
  return (
    <p className={`border-l-2 p-3 text-[13px] ${kind === "ok" ? "border-green-700 bg-green-50 text-green-900" : "border-maroon-700 bg-maroon-50 text-maroon-800"}`}>
      {text}
    </p>
  );
}

function EditorCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border border-mist-200 bg-white">
      <div className="border-b border-mist-100 px-5 py-3">
        <h2 className="font-display text-base font-semibold text-charcoal-900">{title}</h2>
      </div>
      <div className="grid gap-4 p-5">{children}</div>
    </section>
  );
}

function ItemList({ items, render, onEdit, onDelete }: { items: Row[]; render: (r: Row) => React.ReactNode; onEdit: (r: Row) => void; onDelete: (id: number) => void }) {
  return (
    <ul className="divide-y divide-mist-200 border border-mist-200 bg-white">
      {items.map((r) => (
        <li key={r.id} className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0 text-sm">{render(r)}</div>
          <div className="flex shrink-0 gap-2">
            <button onClick={() => onEdit(r)} className="border border-mist-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider hover:border-maroon-700">Edit</button>
            <button onClick={() => onDelete(r.id)} className="border border-mist-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-maroon-700 hover:border-maroon-700">Delete</button>
          </div>
        </li>
      ))}
      {items.length === 0 && <li className="p-6 text-center text-sm text-mist-500">Nothing here yet — the public site is showing its built-in defaults. Add your first item above.</li>}
    </ul>
  );
}

// ---------------- section editors ----------------
function NewsEditor() {
  const { items, save, remove, busy } = useCrud("news");
  const empty = { title: "", category: newsCategories[0], date: new Date().toISOString().slice(0, 10), excerpt: "", body: "", slug: "", photo: "", featured: 0, published: 1 };
  const [form, setForm] = useState<Row>(empty);
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="grid gap-6">
      <EditorCard title={form.id ? `Editing: ${form.title}` : "Publish a news post / announcement"}>
        <Field label="Title"><input className="input" value={form.title} onChange={(e) => { set("title", e.target.value); if (!form.id) set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")); }} /></Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Category">
            <select className="input" value={form.category} onChange={(e) => set("category", e.target.value)}>
              {newsCategories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Date"><input className="input" type="date" value={form.date} onChange={(e) => set("date", e.target.value)} /></Field>
          <Field label="Slug (link name)"><input className="input" value={form.slug} onChange={(e) => set("slug", e.target.value)} /></Field>
        </div>
        <Field label="Excerpt (short summary shown on the news page)">
          <textarea className="input" rows={2} value={form.excerpt} onChange={(e) => set("excerpt", e.target.value)} />
        </Field>
        <Field label="Body (leave a blank line between paragraphs)">
          <textarea className="input" rows={8} value={form.body} onChange={(e) => set("body", e.target.value)} />
        </Field>
        <div className="flex flex-wrap items-center gap-4">
          <UploadButton label={form.photo ? "Replace photo" : "Upload photo"} accept="image/*" onDone={({ url }) => set("photo", url)} />
          {form.photo && <img src={form.photo} alt="" className="h-12 w-16 border border-mist-200 object-cover" />}
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked ? 1 : 0)} /> Featured</label>
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.published} onChange={(e) => set("published", e.target.checked ? 1 : 0)} /> Published</label>
        </div>
        <div className="flex gap-3">
          <button className="btn-maroon !py-2 text-xs" disabled={busy || !form.title} onClick={async () => { await save(form); setForm(empty); }}>{form.id ? "Save changes" : "Publish post"}</button>
          {form.id && <button className="btn-outline !py-2 text-xs" onClick={() => setForm(empty)}>Cancel edit</button>}
        </div>
      </EditorCard>
      <ItemList
        items={items}
        onEdit={(r) => { setForm(r); window.scrollTo({ top: 0, behavior: "smooth" }); }}
        onDelete={remove}
        render={(r) => (<><span className="font-semibold">{r.title}</span><span className="ml-2 text-[11px] uppercase tracking-wider text-mist-500">{r.category} · {r.date}{r.published ? "" : " · draft"}{r.featured ? " · featured" : ""}</span></>)}
      />
    </div>
  );
}

function GalleryEditor() {
  const { items, save, remove, busy } = useCrud("gallery");
  const empty = { title: "", filter: galleryFilters[0], photo: "", sort: 0 };
  const [form, setForm] = useState<Row>(empty);
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="grid gap-6">
      <EditorCard title={form.id ? "Editing gallery item" : "Add a gallery photo"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Caption / title"><input className="input" value={form.title} onChange={(e) => set("title", e.target.value)} /></Field>
          <Field label="Category">
            <select className="input" value={form.filter} onChange={(e) => set("filter", e.target.value)}>
              {galleryFilters.map((f) => <option key={f}>{f}</option>)}
            </select>
          </Field>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <UploadButton label={form.photo ? "Replace photo" : "Upload photo"} accept="image/*" onDone={({ url }) => set("photo", url)} />
          {form.photo && <img src={form.photo} alt="" className="h-14 w-20 border border-mist-200 object-cover" />}
        </div>
        <div className="flex gap-3">
          <button className="btn-maroon !py-2 text-xs" disabled={busy || !form.title} onClick={async () => { await save(form); setForm(empty); }}>{form.id ? "Save changes" : "Add to gallery"}</button>
          {form.id && <button className="btn-outline !py-2 text-xs" onClick={() => setForm(empty)}>Cancel edit</button>}
        </div>
      </EditorCard>
      <ItemList items={items} onEdit={setForm} onDelete={remove}
        render={(r) => (
          <span className="flex items-center gap-3">
            {r.photo ? <img src={r.photo} alt="" className="h-10 w-14 border border-mist-200 object-cover" /> : <span className="grid h-10 w-14 place-items-center border border-dashed border-mist-300 text-[9px] uppercase text-mist-400">No photo</span>}
            <span><span className="font-semibold">{r.title}</span><span className="ml-2 text-[11px] uppercase tracking-wider text-mist-500">{r.filter}</span></span>
          </span>
        )}
      />
    </div>
  );
}

function DownloadsEditor() {
  const { items, save, remove, busy } = useCrud("downloads");
  const empty = { name: "", category: downloadCategories[0], size: "", url: "", restricted: 0, sort: 0 };
  const [form, setForm] = useState<Row>(empty);
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="grid gap-6">
      <EditorCard title={form.id ? "Editing file" : "Upload a document / results file"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Document name"><input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. Term 2 Opening Circular" /></Field>
          <Field label="Category">
            <select className="input" value={form.category} onChange={(e) => set("category", e.target.value)}>
              {downloadCategories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </Field>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <UploadButton label={form.url ? "Replace file" : "Upload file (PDF/Excel/Word)"} accept=".pdf,.doc,.docx,.xls,.xlsx,.zip" onDone={({ url, size }) => { set("url", url); set("size", size); }} />
          {form.url && <span className="text-[12px] text-mist-600">Attached · {form.size}</span>}
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={!!form.restricted} onChange={(e) => set("restricted", e.target.checked ? 1 : 0)} /> Restricted (parents&apos; portal only, e.g. results)</label>
        </div>
        <div className="flex gap-3">
          <button className="btn-maroon !py-2 text-xs" disabled={busy || !form.name || !form.url} onClick={async () => { await save(form); setForm(empty); }}>{form.id ? "Save changes" : "Add to Downloads centre"}</button>
          {form.id && <button className="btn-outline !py-2 text-xs" onClick={() => setForm(empty)}>Cancel edit</button>}
        </div>
      </EditorCard>
      <ItemList items={items} onEdit={setForm} onDelete={remove}
        render={(r) => (<><span className="font-semibold">{r.name}</span><span className="ml-2 text-[11px] uppercase tracking-wider text-mist-500">{r.category} · {r.size}{r.restricted ? " · restricted" : ""}</span></>)}
      />
    </div>
  );
}

function PeopleEditor() {
  const { items, save, remove, busy } = useCrud("people");
  const empty = { name: "", role: "", short: "", section: "deputies", photo: "", message: "", sort: 0 };
  const [form, setForm] = useState<Row>(empty);
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="grid gap-6">
      <p className="border border-dashed border-mist-300 bg-white px-4 py-3 text-[12px] text-mist-600">
        Once you add <strong>any</strong> person here, the Staff page switches from its built-in placeholder list to this database — so add the full leadership team when you start.
      </p>
      <EditorCard title={form.id ? `Editing: ${form.name}` : "Add a staff member / leader"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name"><input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="Position group">
            <select className="input" value={form.section} onChange={(e) => set("section", e.target.value)}>
              {PEOPLE_SECTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Role / title"><input className="input" value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="e.g. Deputy Principal — Academics" /></Field>
          <Field label="Short tag (badge)"><input className="input" value={form.short || ""} onChange={(e) => set("short", e.target.value)} placeholder="e.g. DP · Academics" /></Field>
        </div>
        {form.section === "principal" && (
          <Field label="Principal's message (shown on the homepage & About page)">
            <textarea className="input" rows={5} value={form.message || ""} onChange={(e) => set("message", e.target.value)} />
          </Field>
        )}
        <div className="flex flex-wrap items-center gap-4">
          <UploadButton label={form.photo ? "Replace portrait" : "Upload portrait"} accept="image/*" onDone={({ url }) => set("photo", url)} />
          {form.photo && <img src={form.photo} alt="" className="h-14 w-14 border border-mist-200 object-cover" />}
        </div>
        <div className="flex gap-3">
          <button className="btn-maroon !py-2 text-xs" disabled={busy || !form.name || !form.role} onClick={async () => { await save(form); setForm(empty); }}>{form.id ? "Save changes" : "Add person"}</button>
          {form.id && <button className="btn-outline !py-2 text-xs" onClick={() => setForm(empty)}>Cancel edit</button>}
        </div>
      </EditorCard>
      <ItemList items={items} onEdit={setForm} onDelete={remove}
        render={(r) => (<><span className="font-semibold">{r.name}</span><span className="ml-2 text-[11px] uppercase tracking-wider text-mist-500">{r.role} · {PEOPLE_SECTIONS.find((s) => s.value === r.section)?.label || r.section}</span></>)}
      />
    </div>
  );
}

function CouncilEditor() {
  const { items, save, remove, busy } = useCrud("council");
  const empty = { name: "", role: "", photo: "", sort: 0 };
  const [form, setForm] = useState<Row>(empty);
  const [captainMsg, setCaptainMsg] = useState("");
  const [saved, setSaved] = useState("");
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="grid gap-6">
      <EditorCard title="School Captain's message">
        <textarea className="input" rows={4} value={captainMsg} onChange={(e) => setCaptainMsg(e.target.value)} placeholder="Type the captain's message to fellow learners…" />
        <div className="flex items-center gap-3">
          <button className="btn-maroon !py-2 text-xs" onClick={async () => { await api("/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "captain_message", value: captainMsg }) }); setSaved("Captain's message saved — live on the Students' Council page."); }}>Save message</button>
          <Msg text={saved} kind="ok" />
        </div>
      </EditorCard>
      <EditorCard title={form.id ? "Editing council member" : "Add a council member"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name"><input className="input" value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="Council role"><input className="input" value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="e.g. School Captain, Games Captain" /></Field>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <UploadButton label={form.photo ? "Replace photo" : "Upload photo"} accept="image/*" onDone={({ url }) => set("photo", url)} />
          {form.photo && <img src={form.photo} alt="" className="h-14 w-14 border border-mist-200 object-cover" />}
        </div>
        <div className="flex gap-3">
          <button className="btn-maroon !py-2 text-xs" disabled={busy || !form.name || !form.role} onClick={async () => { await save(form); setForm(empty); }}>{form.id ? "Save changes" : "Add member"}</button>
          {form.id && <button className="btn-outline !py-2 text-xs" onClick={() => setForm(empty)}>Cancel edit</button>}
        </div>
      </EditorCard>
      <ItemList items={items} onEdit={setForm} onDelete={remove}
        render={(r) => (<><span className="font-semibold">{r.name}</span><span className="ml-2 text-[11px] uppercase tracking-wider text-mist-500">{r.role}</span></>)}
      />
    </div>
  );
}

function AchieversEditor() {
  const { items, save, remove, busy } = useCrud("achievers");
  const empty = { position: "", grade: "", destination: "", note: "", photo: "", sort: 0 };
  const [form, setForm] = useState<Row>(empty);
  const set = (k: string, v: any) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <div className="grid gap-6">
      <EditorCard title={form.id ? "Editing achiever" : "Add a KCSE achiever (Alumni page)"}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Learner name"><input className="input" value={form.position} onChange={(e) => set("position", e.target.value)} /></Field>
          <Field label="Grade"><input className="input" value={form.grade} onChange={(e) => set("grade", e.target.value)} placeholder="e.g. B+" /></Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Destination / course"><input className="input" value={form.destination || ""} onChange={(e) => set("destination", e.target.value)} placeholder="e.g. Bachelor of Education — Moi University" /></Field>
          <Field label="Note (optional)"><input className="input" value={form.note || ""} onChange={(e) => set("note", e.target.value)} /></Field>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <UploadButton label={form.photo ? "Replace photo" : "Upload photo"} accept="image/*" onDone={({ url }) => set("photo", url)} />
          {form.photo && <img src={form.photo} alt="" className="h-14 w-14 border border-mist-200 object-cover" />}
        </div>
        <div className="flex gap-3">
          <button className="btn-maroon !py-2 text-xs" disabled={busy || !form.position || !form.grade} onClick={async () => { await save(form); setForm(empty); }}>{form.id ? "Save changes" : "Add achiever"}</button>
          {form.id && <button className="btn-outline !py-2 text-xs" onClick={() => setForm(empty)}>Cancel edit</button>}
        </div>
      </EditorCard>
      <ItemList items={items} onEdit={setForm} onDelete={remove}
        render={(r) => (<><span className="font-semibold">{r.position}</span><span className="ml-2 text-[11px] uppercase tracking-wider text-mist-500">{r.grade}{r.destination ? ` · ${r.destination}` : ""}</span></>)}
      />
    </div>
  );
}

function SettingsEditor() {
  const [logo, setLogo] = useState("");
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [msg, setMsg] = useState("");
  const saveSetting = async (key: string, value: string, note: string) => {
    await api("/admin/settings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key, value }) });
    setMsg(note);
  };
  return (
    <div className="grid gap-6">
      <EditorCard title="School logo">
        <p className="text-[13px] text-mist-600">Upload the official school crest (PNG with transparent background works best). It replaces the placeholder crest in the header and footer instantly.</p>
        <div className="flex flex-wrap items-center gap-4">
          <UploadButton label="Upload logo" accept="image/*" onDone={async ({ url }) => { setLogo(url); await saveSetting("logo", url, "Logo saved — live in the site header and footer."); }} />
          {logo && <img src={logo} alt="New logo" className="h-14 w-14 border border-mist-200 bg-white object-contain" />}
        </div>
      </EditorCard>
      <EditorCard title="Achievers section text (Alumni page)">
        <Field label="Headline"><input className="input" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="e.g. KCSE 2025 — University-Bound Class" /></Field>
        <Field label="Summary"><textarea className="input" rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} /></Field>
        <button className="btn-maroon !py-2 text-xs w-fit" onClick={async () => { if (headline) await saveSetting("achievers_headline", headline, ""); if (summary) await saveSetting("achievers_summary", summary, ""); setMsg("Achievers section text saved."); }}>Save text</button>
      </EditorCard>
      <Msg text={msg} kind="ok" />
    </div>
  );
}

function AdminsEditor({ me }: { me: Admin }) {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [form, setForm] = useState({ email: "", name: "", password: "" });
  const [pw, setPw] = useState({ current: "", next: "" });
  const [msg, setMsg] = useState(""); const [errMsg, setErrMsg] = useState("");
  const load = useCallback(async () => { const d = await api("/admin/admins"); setAdmins(d.admins); }, []);
  useEffect(() => { load().catch(() => {}); }, [load]);
  return (
    <div className="grid gap-6">
      <EditorCard title="Add an admin account">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Name"><input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Email"><input className="input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></Field>
          <Field label="Password (min 8 chars)"><input className="input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></Field>
        </div>
        <button className="btn-maroon !py-2 text-xs w-fit" onClick={async () => {
          try { await api("/admin/admins", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) }); setForm({ email: "", name: "", password: "" }); setMsg("Admin account created."); setErrMsg(""); await load(); }
          catch (e: any) { setErrMsg(e.message); }
        }}>Create account</button>
      </EditorCard>
      <EditorCard title="Change my password">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Current password"><input className="input" type="password" value={pw.current} onChange={(e) => setPw({ ...pw, current: e.target.value })} /></Field>
          <Field label="New password (min 8 chars)"><input className="input" type="password" value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} /></Field>
        </div>
        <button className="btn-maroon !py-2 text-xs w-fit" onClick={async () => {
          try { await api("/admin/password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(pw) }); setPw({ current: "", next: "" }); setMsg("Password changed."); setErrMsg(""); }
          catch (e: any) { setErrMsg(e.message); }
        }}>Change password</button>
      </EditorCard>
      <Msg text={msg} kind="ok" /><Msg text={errMsg} kind="err" />
      <ul className="divide-y divide-mist-200 border border-mist-200 bg-white">
        {admins.map((a) => (
          <li key={a.id} className="flex items-center justify-between px-4 py-3 text-sm">
            <span><span className="font-semibold">{a.name}</span><span className="ml-2 text-mist-500">{a.email}{a.id === me.id ? " (you)" : ""}</span></span>
            {a.id !== me.id && (
              <button onClick={async () => { if (confirm(`Remove admin ${a.email}?`)) { try { await api(`/admin/admins?id=${a.id}`, { method: "DELETE" }); await load(); } catch (e: any) { setErrMsg(e.message); } } }}
                className="border border-mist-300 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-maroon-700 hover:border-maroon-700">Remove</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ---------------- shell ----------------
export default function AdminPanel() {
  const router = useRouter();
  const [me, setMe] = useState<Admin | null>(null);
  const [checked, setChecked] = useState(false);
  const [section, setSection] = useState<(typeof SECTIONS)[number]["key"]>("news");

  useEffect(() => {
    api("/auth/me").then((d) => { setMe(d.admin); setChecked(true); }).catch(() => router.replace("/portals/admin"));
  }, [router]);

  if (!checked || !me) return <div className="shell py-24 text-sm text-mist-500">Checking your session…</div>;

  return (
    <div className="min-h-[70vh] bg-mist-50">
      <div className="border-b border-mist-200 bg-charcoal-900 text-white">
        <div className="shell flex flex-col justify-between gap-4 py-8 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow eyebrow-light">Admin dashboard</p>
            <h1 className="mt-3 font-display text-2xl font-semibold md:text-3xl">Welcome, {me.name}</h1>
            <p className="mt-1 text-sm text-mist-300">Changes you save here go live on the public website instantly.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/" className="btn-ghost-light !py-2 text-xs">Public site</Link>
            <button onClick={async () => { await api("/auth/logout", { method: "POST" }); router.push("/portals/admin"); }}
              className="btn !bg-maroon-700 !py-2 text-xs text-white hover:!bg-maroon-800">Sign out</button>
          </div>
        </div>
      </div>

      <div className="shell py-8">
        <div className="flex flex-wrap gap-2">
          {SECTIONS.map((s) => (
            <button key={s.key} onClick={() => setSection(s.key)}
              className={`border px-3 py-1.5 text-[12px] font-semibold ${section === s.key ? "border-maroon-700 bg-maroon-700 text-white" : "border-mist-300 bg-white hover:border-maroon-700"}`}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="mt-8 pb-12">
          {section === "news" && <NewsEditor />}
          {section === "gallery" && <GalleryEditor />}
          {section === "downloads" && <DownloadsEditor />}
          {section === "people" && <PeopleEditor />}
          {section === "council" && <CouncilEditor />}
          {section === "achievers" && <AchieversEditor />}
          {section === "settings" && <SettingsEditor />}
          {section === "admins" && <AdminsEditor me={me} />}
        </div>
      </div>
    </div>
  );
}
