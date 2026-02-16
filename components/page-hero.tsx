type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-8 pt-14 md:px-8 md:pt-20">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">{eyebrow}</p>
      <h1 className="mt-4 font-heading text-4xl text-white md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base text-white/80 md:text-lg">{description}</p>
    </section>
  );
}
