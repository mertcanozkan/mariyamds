"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Shield, Settings, Zap, Clock, Heart } from "lucide-react";
import { useState } from "react";
import { Instructor } from "@/lib/types";
import { formatPricePerHour, formatPrice } from "@/lib/utils/formatters";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const badgeConfig = {
  "top-rated": { label: "Top Rated", variant: "amber" as const },
  "dvsa-approved": { label: "DVSA ADI", variant: "blue" as const },
  "high-pass-rate": { label: "High Pass Rate", variant: "green" as const },
  "quick-responder": { label: "Quick Responder", variant: "violet" as const },
  "new-instructor": { label: "New", variant: "outline" as const },
};

interface InstructorCardProps {
  instructor: Instructor;
  index?: number;
}

export default function InstructorCard({ instructor, index = 0 }: InstructorCardProps) {
  const [saved, setSaved] = useState(false);
  const popularPackage = instructor.packages.find((p) => p.popular);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      aria-label={`${instructor.name}, driving instructor in ${instructor.location.city}`}
      className="group rounded-xl border border-white/8 bg-[#0f1117] hover:border-white/15 hover:shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar src={instructor.avatar} name={instructor.name} size="lg" />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <h3 className="font-semibold text-white text-sm leading-tight">{instructor.name}</h3>
                  {instructor.dvsaApproved && (
                    <Shield
                      size={13}
                      className="text-blue-400 flex-shrink-0"
                      aria-label="DVSA Approved ADI"
                    />
                  )}
                </div>
                <div className="flex items-center gap-1 text-xs text-slate-500 mb-1.5">
                  <MapPin size={10} aria-hidden="true" />
                  <span>{instructor.location.city} · {instructor.location.coverageRadius} mile radius</span>
                </div>
                <div className="flex items-center gap-2">
                  <StarRating rating={instructor.rating} showValue size="sm" />
                  <span className="text-xs text-slate-600" aria-label={`${instructor.reviewCount} reviews`}>
                    ({instructor.reviewCount})
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSaved(!saved)}
                aria-pressed={saved}
                aria-label={saved ? `Remove ${instructor.name} from saved` : `Save ${instructor.name}`}
                className="p-1.5 rounded-lg hover:bg-white/8 transition-colors flex-shrink-0"
              >
                <Heart
                  size={14}
                  aria-hidden="true"
                  className={cn(
                    "transition-colors",
                    saved ? "text-red-400 fill-red-400" : "text-slate-600 hover:text-slate-400"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Instructor badges */}
        <div className="flex flex-wrap gap-1.5 mb-4" aria-label="Instructor badges">
          {instructor.badges.slice(0, 3).map((badge) => {
            const config = badgeConfig[badge];
            return (
              <Badge key={badge} variant={config.variant} size="sm">
                {config.label}
              </Badge>
            );
          })}
        </div>

        {/* Details grid */}
        <dl className="grid grid-cols-3 gap-2 mb-4 text-center">
          <div className="rounded-lg bg-white/4 py-2 px-1">
            <dt className="text-[10px] text-slate-500">pass rate</dt>
            <dd className="text-sm font-bold text-white">{instructor.passRate}%</dd>
          </div>
          <div className="rounded-lg bg-white/4 py-2 px-1">
            <dt className="text-[10px] text-slate-500">experience</dt>
            <dd className="text-sm font-bold text-white">{instructor.experience} yrs</dd>
          </div>
          <div className="rounded-lg bg-white/4 py-2 px-1">
            <dt className="text-[10px] text-slate-500">gearbox</dt>
            <dd className="text-sm font-bold text-white capitalize">
              {instructor.transmission === "both" ? "Man/Auto" : instructor.transmission}
            </dd>
          </div>
        </dl>

        {/* Vehicle & transmission */}
        <div className="flex items-center gap-3 text-xs text-slate-500 mb-4" aria-hidden="true">
          <div className="flex items-center gap-1">
            {instructor.transmission !== "automatic" && <Settings size={10} />}
            {instructor.transmission === "both" && <span>&</span>}
            {instructor.transmission !== "manual" && <Zap size={10} />}
            <span className="capitalize">{instructor.transmission}</span>
          </div>
          <span>·</span>
          <div className="flex items-center gap-1">
            <Clock size={10} />
            <span>{instructor.lessonsGiven.toLocaleString()} lessons given</span>
          </div>
        </div>

        {/* Specialisms */}
        <ul className="flex flex-wrap gap-1 mb-4" aria-label="Specialisms">
          {instructor.specialisms.slice(0, 3).map((s) => (
            <li
              key={s}
              className="text-[10px] text-slate-500 px-2 py-0.5 rounded-full border border-white/6 bg-white/3"
            >
              {s}
            </li>
          ))}
        </ul>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-white/6">
          <div>
            <div className="text-xl font-bold text-white" aria-label={`${formatPricePerHour(instructor.pricePerHour)} per hour`}>
              {formatPricePerHour(instructor.pricePerHour)}
            </div>
            {popularPackage && (
              <div className="text-xs text-emerald-400">
                From {formatPrice(popularPackage.priceInPence)} block booking
              </div>
            )}
          </div>
          <Link href={`/instructors/${instructor.slug}`} aria-label={`View profile of ${instructor.name}`}>
            <Button size="sm" variant="outline">View Profile</Button>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
