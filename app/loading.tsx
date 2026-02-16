export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-16 md:px-8" aria-live="polite" aria-busy="true">
      <div className="h-10 w-1/2 animate-pulse rounded-xl bg-white/20" />
      <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-white/20" />
      <div className="mt-2 h-4 w-1/2 animate-pulse rounded bg-white/20" />
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-44 animate-pulse rounded-3xl bg-white/15" />
        ))}
      </div>
    </div>
  );
}
