"use client";

import { useEffect, useRef, useState } from "react";

type Counter = {
  label: string;
  value: number;
  suffix?: string;
};

const counters: Counter[] = [
  { label: "Learners Supported", value: 320, suffix: "+" },
  { label: "Pass Rate Focus", value: 92, suffix: "%" },
  { label: "Weekly Slots", value: 12 }
];

export default function Counters() {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mt-10 grid gap-4 sm:grid-cols-3">
      {counters.map((counter) => (
        <article key={counter.label} className="rounded-2xl border border-white/15 bg-white/[0.08] p-4 text-center backdrop-blur">
          <p className="font-heading text-3xl text-brand-accent">{inView ? counter.value : 0}{counter.suffix ?? ""}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-white/70">{counter.label}</p>
        </article>
      ))}
    </div>
  );
}
