"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield, Search, Calendar, Star, MessageSquare, TrendingUp, Clock, CreditCard
} from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "DVSA-Verified ADIs",
    description: "Every instructor on our platform holds a valid ADI licence, verified directly with the DVSA. You're always in safe hands.",
    color: "blue",
  },
  {
    icon: Search,
    title: "Smart Search & Filters",
    description: "Filter by location, price, transmission type, languages spoken, and specialist skills to find your perfect match.",
    color: "violet",
  },
  {
    icon: Calendar,
    title: "Instant Online Booking",
    description: "See real-time availability and book your lesson in under two minutes. No phone calls, no back-and-forth.",
    color: "emerald",
  },
  {
    icon: Star,
    title: "Verified Reviews",
    description: "All reviews come from confirmed students who completed lessons. No fake ratings — just honest, transparent feedback.",
    color: "amber",
  },
  {
    icon: MessageSquare,
    title: "Theory Test Support",
    description: "Access mock theory tests, hazard perception practice, and revision resources directly from your student dashboard.",
    color: "cyan",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Track your driving hours, lesson history, and practical skills progress all in one place as you work towards your test.",
    color: "pink",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book morning, afternoon, or evening lessons seven days a week. Reschedule up to 48 hours in advance, no charge.",
    color: "orange",
  },
  {
    icon: CreditCard,
    title: "Block Booking Savings",
    description: "Save up to 12% by booking lessons in blocks of 5 or 10. Payments are secure and refundable if unused.",
    color: "teal",
  },
];

const colorMap: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
  violet: { bg: "bg-violet-500/10", border: "border-violet-500/20", text: "text-violet-400" },
  emerald: { bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
  amber: { bg: "bg-amber-500/10", border: "border-amber-500/20", text: "text-amber-400" },
  cyan: { bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-400" },
  pink: { bg: "bg-pink-500/10", border: "border-pink-500/20", text: "text-pink-400" },
  orange: { bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
  teal: { bg: "bg-teal-500/10", border: "border-teal-500/20", text: "text-teal-400" },
};

export default function FeaturesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section id="features" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-4">
            <span className="text-xs text-violet-300 font-medium">Everything you need</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Built for modern learners
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            From finding your first instructor to booking your test-prep lesson,
            MCO-DS makes every step of your driving journey simple.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => {
            const colors = colorMap[feature.color];
            const Icon = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group p-5 rounded-xl border border-white/8 bg-[#0f1117] hover:border-white/15 hover:bg-[#161b27] transition-all duration-300"
              >
                <div
                  className={`w-10 h-10 rounded-lg border ${colors.bg} ${colors.border} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon size={18} className={colors.text} />
                </div>
                <h3 className="text-sm font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
