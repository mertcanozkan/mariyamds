import Link from "next/link";

type ServiceCardProps = {
  title: string;
  description: string;
  idealFor: string;
  price: string;
};

export default function ServiceCard({ title, description, idealFor, price }: ServiceCardProps) {
  return (
    <article className="group rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-card backdrop-blur transition hover:-translate-y-1 hover:border-brand-accent/50">
      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand-accent">{price}</p>
      <h3 className="mt-2 font-heading text-2xl text-white">{title}</h3>
      <p className="mt-3 text-sm text-white/75">{description}</p>
      <p className="mt-4 text-sm text-white/80">
        <span className="font-semibold text-white">Ideal for:</span> {idealFor}
      </p>
      <Link href="/contact" className="mt-6 inline-flex rounded-full bg-brand-accent px-4 py-2 text-sm font-semibold text-brand-ink transition group-hover:bg-brand-coral">
        Book this service
      </Link>
    </article>
  );
}
