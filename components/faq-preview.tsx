import { faqs } from "@/lib/site";

export default function FAQPreview() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8">
      <div className="mb-8 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-accent">FAQ</p>
        <h2 className="mt-2 font-heading text-3xl text-white md:text-4xl">Common Questions</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <article key={faq.question} className="rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
            <h3 className="font-semibold text-white">{faq.question}</h3>
            <p className="mt-2 text-sm text-white/75">{faq.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
