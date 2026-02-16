import Link from "next/link";

type CTASectionProps = {
  title: string;
  body: string;
};

export default function CTASection({ title, body }: CTASectionProps) {
  return (
    <section className="mx-auto my-16 w-full max-w-6xl px-4 md:px-8">
      <div className="force-light-text rounded-[2rem] border border-brand-accent/40 bg-gradient-to-r from-brand-deep via-brand-ink to-brand-deep p-8 text-center shadow-glow md:p-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">Ready to start?</p>
        <h2 className="mt-3 font-heading text-3xl text-white md:text-4xl">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-white/80 md:text-base">{body}</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/contact" className="rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-coral">
            Book Your First Lesson
          </Link>
          <Link href="/pricing" className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:border-brand-accent hover:text-brand-accent">
            See Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
