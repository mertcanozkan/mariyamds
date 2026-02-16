import Stars from "./stars";

type TestimonialCardProps = {
  name: string;
  content: string;
  rating: number;
  experience: string;
};

export default function TestimonialCard({ name, content, rating, experience }: TestimonialCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-card backdrop-blur">
      <Stars count={rating} />
      <p className="mt-4 text-sm leading-relaxed text-white/85">&quot;{content}&quot;</p>
      <div className="mt-5 border-t border-white/10 pt-4">
        <p className="font-semibold text-white">{name}</p>
        <p className="text-xs uppercase tracking-[0.12em] text-white/60">{experience}</p>
      </div>
    </article>
  );
}
