"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Shield } from "lucide-react";
import { MOCK_INSTRUCTORS } from "@/lib/mock-data/instructors";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import { formatPricePerHour } from "@/lib/utils/formatters";

export default function InstructorShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const featured = MOCK_INSTRUCTORS.filter((i) => i.featured);

  return (
    <section className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-10"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
              <span className="text-xs text-amber-300 font-medium">Top rated</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Featured instructors
            </h2>
            <p className="text-slate-400">Highest rated instructors across the UK</p>
          </div>
          <Link
            href="/instructors"
            className="hidden sm:flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            View all instructors
            <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map((instructor, i) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/instructors/${instructor.slug}`}>
                <div className="group rounded-xl border border-white/8 bg-[#0f1117] p-5 hover:border-blue-500/30 hover:bg-[#161b27] hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] transition-all duration-300 cursor-pointer h-full">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar src={instructor.avatar} name={instructor.name} size="lg" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <h3 className="text-sm font-semibold text-white truncate">{instructor.name}</h3>
                        {instructor.dvsaApproved && (
                          <Shield size={12} className="text-blue-400 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mb-1.5">
                        <MapPin size={10} />
                        {instructor.location.city}
                      </div>
                      <StarRating rating={instructor.rating} showValue size="sm" />
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="rounded-lg bg-white/4 px-2.5 py-2 text-center">
                      <div className="text-sm font-bold text-white">{instructor.passRate}%</div>
                      <div className="text-[10px] text-slate-500">pass rate</div>
                    </div>
                    <div className="rounded-lg bg-white/4 px-2.5 py-2 text-center">
                      <div className="text-sm font-bold text-white">{instructor.experience}yrs</div>
                      <div className="text-[10px] text-slate-500">experience</div>
                    </div>
                  </div>

                  {/* Specialisms */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {instructor.specialisms.slice(0, 2).map((s) => (
                      <Badge key={s} variant="default" size="sm">{s}</Badge>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/6">
                    <div>
                      <div className="text-base font-bold text-white">{formatPricePerHour(instructor.pricePerHour)}</div>
                      <div className="text-[10px] text-slate-500">{instructor.transmission} · {instructor.vehicle.make} {instructor.vehicle.model}</div>
                    </div>
                    <div className="text-xs text-blue-400 group-hover:text-blue-300 transition-colors font-medium">
                      View →
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link href="/instructors">
            <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 mx-auto">
              View all instructors <ArrowRight size={14} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
