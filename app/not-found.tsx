import Link from "next/link";

export default function NotFound() {
  return (
    <div className="shell py-28 text-center">
      <p className="eyebrow justify-center">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold">This page isn't here.</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-mist-600">The page may have moved or hasn't been published yet. Head back home or browse the main sections from the menu.</p>
      <Link href="/" className="btn-maroon mt-8">Back to home</Link>
    </div>
  );
}
