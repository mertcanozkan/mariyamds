"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ArrowRight, Shield, Star, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function HeroSection() {
  const [postcode, setPostcode] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/instructors${postcode ? `?location=${encodeURIComponent(postcode)}` : ""}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-violet-600/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-cyan-600/5 rounded-full blur-[80px] pointer-events-none" />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center pt-32 pb-16">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 mb-6">
            <Shield size={12} className="text-blue-400" />
            <span className="text-xs text-blue-300 font-medium">DVSA-Approved Instructor Network</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
        >
          Your Licence.{" "}
          <span className="gradient-text">Your Instructor.</span>{" "}
          <br className="hidden sm:block" />
          Your Road.
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Find and book DVSA-approved driving instructors near you. Compare ratings,
          prices, and availability — then book in minutes.
        </motion.p>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Enter your postcode or city…"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/6 border border-white/12 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/8 transition-all text-sm"
                suppressHydrationWarning
              />
            </div>
            <Button type="submit" size="lg" className="rounded-xl whitespace-nowrap">
              Find Instructors
              <ArrowRight size={16} />
            </Button>
          </form>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500"
        >
          <div className="flex items-center gap-1.5">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span>4.8 average rating</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Shield size={14} className="text-emerald-400" />
            <span>DVSA verified instructors</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Search size={14} className="text-blue-400" />
            <span>1,200+ instructors nationwide</span>
          </div>
        </motion.div>

        {/* Instructor CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6"
        >
          <Link
            href="/register?role=instructor"
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors underline underline-offset-4"
          >
            Are you a driving instructor? Join MCO-DS →
          </Link>
        </motion.div>

        {/* Floating cards */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/4"
        >
          <div className="glass rounded-xl p-3 shadow-xl text-left w-44">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xs font-bold text-white">P</div>
              <div>
                <div className="text-xs text-white font-medium">Priya P.</div>
                <div className="text-xs text-slate-500">Birmingham</div>
              </div>
            </div>
            <div className="flex gap-0.5 mb-1">
              {[1,2,3,4,5].map(i => <Star key={i} size={10} className="text-amber-400 fill-amber-400" />)}
            </div>
            <div className="text-xs text-slate-400">97% pass rate · £50/hr</div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="hidden lg:block absolute right-0 top-1/2 translate-y-4"
        >
          <div className="glass rounded-xl p-3 shadow-xl text-left w-44">
            <div className="text-xs text-emerald-400 font-semibold mb-1">✓ Lesson confirmed!</div>
            <div className="text-xs text-white font-medium mb-0.5">Saturday 10:00 AM</div>
            <div className="text-xs text-slate-400">With Sarah T. · 1 hour</div>
            <div className="text-xs text-slate-500 mt-1">Ref: DRV-2024-7134</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
