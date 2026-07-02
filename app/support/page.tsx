import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { SectionHeading, Notice } from "@/components/Cards";
import { supportNeeds, mpesa } from "@/lib/data";

export const metadata: Metadata = { title: "Support a Student" };

export default function Support() {
  return (
    <>
      <PageHeader
        eyebrow="Support & donations"
        title="Keep a deserving learner in class."
        intro="Some of our learners face genuine need. Well-wishers, alumni and the community can support them with dignity — no student is ever publicly identified."
      />

      <section className="shell grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr] md:py-20">
        <div>
          <SectionHeading eyebrow="Where support goes" title="Four areas of need" />
          <div className="grid gap-5 sm:grid-cols-2">
            {supportNeeds.map((s) => (
              <div key={s.name} className="rule-card">
                <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist-600">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="rule-card">
              <h3 className="font-display text-lg font-semibold">How beneficiaries are chosen</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-600">
                The school administration maintains a confidential, admin-managed beneficiary
                list based on verified need. Donors receive general updates on impact — never
                personal details of individual learners.
              </p>
            </div>
            <div className="rule-card">
              <h3 className="font-display text-lg font-semibold">Privacy commitment</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-600">
                This page is deliberately designed to protect learners' dignity. No names,
                photos or identifying stories of supported students are published.
              </p>
            </div>
          </div>
        </div>

        <aside className="h-fit border border-mist-200 bg-charcoal-900 p-7 text-white lg:sticky lg:top-32">
          <p className="eyebrow eyebrow-light">Give via M-Pesa</p>
          <h3 className="mt-3 font-display text-2xl font-semibold">M-Pesa support</h3>
          <dl className="mt-5 space-y-3 text-sm">
            <div><dt className="text-[11px] uppercase tracking-wider text-mist-500">Paybill / Till</dt><dd className="font-semibold">{mpesa.paybill}</dd></div>
            <div><dt className="text-[11px] uppercase tracking-wider text-mist-500">Account / reference</dt><dd className="font-semibold">{mpesa.account}</dd></div>
            <div><dt className="text-[11px] uppercase tracking-wider text-mist-500">Donation reference</dt><dd>DONATION-[your name] (placeholder)</dd></div>
            <div><dt className="text-[11px] uppercase tracking-wider text-mist-500">Fee support reference</dt><dd>FEES-SUPPORT (placeholder)</dd></div>
          </dl>
          <p className="mt-5 border-l-2 border-maroon-500 bg-white/5 p-3 text-[13px] leading-relaxed text-mist-300">
            Confirmation message placeholder: “Thank you for supporting a learner at Gilgil
            Day Senior School. Your contribution has been received.”
          </p>
          <p className="mt-4 text-[12px] leading-relaxed text-mist-500">{mpesa.note}</p>
        </aside>
      </section>
      <div className="shell pb-16">
        <Notice>Payment details above are placeholders. Live M-Pesa (Daraja) integration is architecture-ready for a later phase.</Notice>
      </div>
    </>
  );
}
