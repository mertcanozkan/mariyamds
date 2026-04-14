"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CtaSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="py-20 md:py-28 px-4 sm:px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.97 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-950/40 via-[#0f1117] to-violet-950/30 p-10 md:p-16 text-center relative overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-blue-500/15 blur-3xl pointer-events-none" />

        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 relative">
          Ready to get your licence?
        </h2>
        <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto relative">
          Join over 45,000 students who found their perfect instructor through MCO-DS.
          Your first lesson is just a few clicks away.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center relative">
          <Link href="/instructors">
            <Button size="lg" className="rounded-xl">
              Find an Instructor
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href="/register?role=instructor">
            <Button variant="outline" size="lg" className="rounded-xl">
              Join as Instructor
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-sm text-slate-600 relative">
          Free to join · No credit card required · DVSA-approved network
        </p>
      </motion.div>
    </section>
  );
}
