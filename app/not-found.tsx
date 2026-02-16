import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-center justify-center px-4 text-center md:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">404</p>
      <h1 className="mt-3 font-heading text-4xl text-white">Page not found</h1>
      <p className="mt-3 text-sm text-white/75">The page you requested does not exist or has been moved.</p>
      <Link href="/" className="mt-6 rounded-full bg-brand-accent px-5 py-3 text-sm font-semibold text-brand-ink">
        Back to Home
      </Link>
    </section>
  );
}
