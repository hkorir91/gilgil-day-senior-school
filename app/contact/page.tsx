"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Media } from "@/components/Placeholder";
import { school } from "@/lib/data";

function Form({ title, fields, button }: { title: string; fields: { label: string; type?: string; textarea?: boolean }[]; button: string }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="border border-mist-200 bg-white p-6">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      {sent ? (
        <p className="mt-4 border-l-2 border-maroon-700 bg-mist-50 p-4 text-sm">
          Received (demo). When the backend is connected, this will reach the school office and you'll get a confirmation.
        </p>
      ) : (
        <div className="mt-4 grid gap-3">
          {fields.map((f) => (
            <div key={f.label}>
              <label className="label">{f.label}</label>
              {f.textarea ? <textarea className="input min-h-[96px]" /> : <input className="input" type={f.type ?? "text"} />}
            </div>
          ))}
          <button onClick={() => setSent(true)} className="btn-maroon">{button}</button>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Reach the school."
        intro={`${school.name}, ${school.location}. We respond to parents, learners and the public through the office during school hours.`}
      />
      <section className="shell grid gap-10 py-16 lg:grid-cols-[1fr_1.2fr] md:py-20">
        <div className="grid content-start gap-5">
          <div className="rule-card">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-maroon-700">Location</h3>
            <p className="mt-2 text-sm">{school.location}</p>
            <p className="text-sm">{school.poBox}</p>
          </div>
          <div className="rule-card">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-maroon-700">Phone & email (placeholders)</h3>
            <p className="mt-2 text-sm">{school.phone}</p>
            <p className="text-sm">{school.email}</p>
            <p className="text-sm">{school.admissionsEmail}</p>
          </div>
          <a href={`https://wa.me/${school.phoneRaw.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white hover:opacity-90">
            WhatsApp the school
          </a>
          <div>
            <Media label="Google Map — Gilgil Town location" ratio="aspect-[4/3]" />
            <p className="mt-2 text-[12px] text-mist-500">Map placeholder — embed the Google Maps pin when ready.</p>
          </div>
        </div>
        <div className="grid content-start gap-5">
          <Form title="Contact form" button="Send message" fields={[{ label: "Full name" }, { label: "Email or phone" }, { label: "Message", textarea: true }]} />
          <Form title="Meeting request form" button="Request meeting" fields={[{ label: "Parent/guardian name" }, { label: "Learner name & class" }, { label: "Who would you like to meet? (Class teacher / Administration)" }, { label: "Reason for the meeting", textarea: true }]} />
          <Form title="Parent enquiry form" button="Send enquiry" fields={[{ label: "Parent/guardian name" }, { label: "Learner name & class" }, { label: "Enquiry (fees, academics, welfare…)", textarea: true }]} />
        </div>
      </section>
    </>
  );
}
