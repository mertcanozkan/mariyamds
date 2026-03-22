"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/lib/hooks/useCountUp";
import { Users, Calendar, TrendingUp, Star } from "lucide-react";

const stats = [
  { icon: Users, label: "Instructors Nationwide", value: 1200, suffix: "+" },
  { icon: Calendar, label: "Lessons Booked", value: 45000, suffix: "+" },
  { icon: TrendingUp, label: "Pass Rate", value: 94, suffix: "%" },
  { icon: Star, label: "Average Rating", value: 48, suffix: "/5", divisor: 10 },
];

function StatItem({
  icon: Icon,
  label,
  value,
  suffix,
  divisor,
  animate,
}: (typeof stats)[0] & { animate: boolean }) {
  const count = useCountUp(value, 2000, animate);
  const display = divisor ? (count / divisor).toFixed(1) : count.toLocaleString("en-GB");

  return (
    <div className="flex flex-col items-center text-center px-6 py-6 relative">
      <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-3">
        <Icon size={20} className="text-blue-400" />
      </div>
      <div className="text-3xl font-bold text-white mb-1 tabular-nums">
        {display}{suffix}
      </div>
      <div className="text-sm text-slate-500">{label}</div>
    </div>
  );
}

export default function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-4 border-y border-white/8 bg-[#0f1117]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/8"
        >
          {stats.map((stat, i) => (
            <StatItem key={i} {...stat} animate={inView} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
