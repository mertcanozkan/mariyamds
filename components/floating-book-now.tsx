import Link from "next/link";

export default function FloatingBookNow() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-40 px-4 md:hidden">
      <Link
        href="/book"
        className="pointer-events-auto block rounded-full bg-brand-accent px-6 py-3 text-center text-sm font-semibold text-brand-ink shadow-lg"
      >
        Book Now
      </Link>
    </div>
  );
}
