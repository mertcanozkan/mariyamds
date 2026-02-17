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
        "relative rounded-3xl border bg-brand-deep/72 p-6 text-brand-soft shadow-card transition hover:-translate-y-1",
        popular ? "border-brand-accent ring-2 ring-brand-accent/40" : "border-brand-soft/20"
      )}
    >
      {popular ? (
        <span className="absolute -top-3 left-6 rounded-full bg-brand-accent px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-brand-ink">
          Most Popular
        </span>
      ) : null}
      <h3 className="font-heading text-2xl">{title}</h3>
      <p className="mt-3 text-4xl font-bold">{price}</p>
      <p className="text-sm text-brand-muted">{subtitle}</p>
      <p className="mt-3 text-sm text-brand-muted">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-brand-muted">
        {features.map((feature) => (
          <li key={feature}>- {feature}</li>
        ))}
      </ul>
      <Link href="/contact" className="mt-6 inline-flex rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-ink transition hover:bg-brand-coral">
        Choose plan
      </Link>
    </article>
  );
}
