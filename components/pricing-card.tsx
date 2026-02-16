import Link from "next/link";

import { cn } from "@/lib/utils";

type PricingCardProps = {
  title: string;
  price: string;
  subtitle: string;
  description: string;
  features: string[];
  popular?: boolean;
};

export default function PricingCard({ title, price, subtitle, description, features, popular = false }: PricingCardProps) {
  return (
    <article
      className={cn(
        "relative rounded-3xl border bg-white/90 p-6 text-brand-ink shadow-card transition hover:-translate-y-1 dark:border-white/10 dark:bg-brand-deep/70 dark:text-white",
        popular ? "border-brand-accent ring-2 ring-brand-accent/40" : "border-slate-200"
      )}
    >
      {popular ? (
        <span className="absolute -top-3 left-6 rounded-full bg-brand-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-brand-ink">
          Most Popular
        </span>
      ) : null}
      <h3 className="font-heading text-2xl">{title}</h3>
      <p className="mt-3 text-4xl font-bold">{price}</p>
      <p className="text-sm text-slate-600 dark:text-white/70">{subtitle}</p>
      <p className="mt-3 text-sm text-slate-700 dark:text-white/80">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-slate-700 dark:text-white/80">
        {features.map((feature) => (
          <li key={feature}>- {feature}</li>
        ))}
      </ul>
      <Link href="/contact" className="mt-6 inline-flex rounded-full bg-brand-ink px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-brand-deep dark:bg-brand-accent dark:text-brand-ink">
        Choose plan
      </Link>
    </article>
  );
}
