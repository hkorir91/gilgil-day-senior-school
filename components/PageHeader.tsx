export default function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="border-b border-mist-200 bg-mist-50">
      <div className="shell py-14 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight text-charcoal-900 md:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mist-600">{intro}</p>}
      </div>
    </section>
  );
}
