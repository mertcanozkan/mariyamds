import { notFound } from "next/navigation";
import Link from "next/link";
import {
  MapPin, Shield, Star, Clock, Car, Globe, CheckCircle, Award,
  ArrowLeft, Phone, Calendar
} from "lucide-react";
import { MOCK_INSTRUCTORS } from "@/lib/mock-data/instructors";
import { MOCK_REVIEWS } from "@/lib/mock-data/reviews";
import { prisma } from "@/lib/db";
import { formatPricePerHour, formatPrice, formatRelativeTime } from "@/lib/utils/formatters";
import StarRating from "@/components/ui/StarRating";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { Instructor, InstructorBadge, Transmission } from "@/lib/types";

export const dynamicParams = true;

export function generateStaticParams() {
  return MOCK_INSTRUCTORS.map((i) => ({ slug: i.slug }));
}

async function getInstructor(slug: string): Promise<Instructor | null> {
  // 1. Check mock data first
  const mock = MOCK_INSTRUCTORS.find((i) => i.slug === slug);
  if (mock) return mock;

  // 2. DB lookup — slug ends with last 6 chars of the user id
  const idSuffix = slug.split("-").pop();
  if (!idSuffix) return null;

  const user = await prisma.user.findFirst({
    where: { role: "instructor", id: { endsWith: idSuffix } },
    select: {
      id: true, name: true, image: true, postcode: true,
      adiNumber: true, experience: true, transmission: true,
      bio: true, pricePerHour: true, coverageRadius: true,
      specialisms: true, languages: true,
      vehicleMake: true, vehicleModel: true,
      vehicleYear: true, vehicleTransmission: true,
    },
  });
  if (!user) return null;

  // Resolve postcode → city + coordinates
  let city = "UK";
  let coordinates: [number, number] = [51.505, -0.09];
  if (user.postcode) {
    try {
      const r = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(user.postcode)}`);
      if (r.ok) {
        const d = await r.json();
        city = d.result?.admin_district ?? d.result?.region ?? "UK";
        coordinates = [d.result.latitude, d.result.longitude];
      }
    } catch {}
  }

  const name = user.name ?? "Instructor";
  const transmission = (user.vehicleTransmission ?? user.transmission ?? "manual") as Transmission;

  return {
    id: user.id,
    slug,
    name,
    avatar: user.image ?? "/images/default-avatar.png",
    location: { city, postcode: user.postcode ?? "", coverageRadius: user.coverageRadius ?? 5, coordinates },
    adiNumber: user.adiNumber ?? "",
    dvsaApproved: !!user.adiNumber,
    transmission,
    pricePerHour: user.pricePerHour ?? 3800,
    packages: [
      { id: "std-10", name: "10 Hour Block", hours: 10, priceInPence: Math.round((user.pricePerHour ?? 3800) * 9.5), popular: true },
      { id: "std-20", name: "20 Hour Block", hours: 20, priceInPence: Math.round((user.pricePerHour ?? 3800) * 18) },
    ],
    rating: 0,
    reviewCount: 0,
    lessonsGiven: 0,
    passRate: 0,
    experience: user.experience ?? 0,
    bio: user.bio ?? `${name} is a driving instructor based in ${city}.`,
    specialisms: user.specialisms ? user.specialisms.split(",").map((s: string) => s.trim()).filter(Boolean) : ["Standard lessons"],
    vehicle: {
      make: user.vehicleMake ?? "TBC",
      model: user.vehicleModel ?? "TBC",
      year: user.vehicleYear ?? new Date().getFullYear(),
      color: "TBC",
    },
    languages: user.languages ? user.languages.split(",").map((l: string) => l.trim()).filter(Boolean) : ["English"],
    availability: { monday: [], tuesday: [], wednesday: [], thursday: [], friday: [], saturday: [], sunday: [] },
    badges: ["new-instructor"] as InstructorBadge[],
    featured: false,
  };
}

const badgeConfig: Record<InstructorBadge, { label: string; icon: React.ReactNode; variant: "blue" | "amber" | "green" | "violet" | "outline" }> = {
  "top-rated": { label: "Top Rated", icon: <Star size={11} />, variant: "amber" },
  "dvsa-approved": { label: "DVSA Approved ADI", icon: <Shield size={11} />, variant: "blue" },
  "high-pass-rate": { label: "High Pass Rate", icon: <Award size={11} />, variant: "green" },
  "quick-responder": { label: "Quick Responder", icon: <Clock size={11} />, variant: "violet" },
  "new-instructor": { label: "New Instructor", icon: <CheckCircle size={11} />, variant: "outline" },
};

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

export default async function InstructorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const instructor = await getInstructor(slug);
  if (!instructor) notFound();

  const reviews = MOCK_REVIEWS.filter((r) => r.instructorId === instructor.id);

  return (
    <div className="min-h-screen pt-20">
      {/* Back nav */}
      <div className="border-b border-white/8 bg-[#0f1117]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
          <Link
            href="/instructors"
            className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            Back to search
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile hero */}
            <div className="rounded-xl border border-white/8 bg-[#0f1117] p-6 md:p-8">
              <div className="flex flex-col sm:flex-row gap-5">
                <Avatar src={instructor.avatar} name={instructor.name} size="xl" className="mx-auto sm:mx-0" />

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold text-white">{instructor.name}</h1>
                    {instructor.dvsaApproved && (
                      <Badge variant="blue">
                        <Shield size={10} />
                        ADI #{instructor.adiNumber}
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-slate-400 mb-3">
                    <span className="flex items-center gap-1"><MapPin size={13} />{instructor.location.city}, {instructor.location.postcode}</span>
                    <span className="flex items-center gap-1"><Clock size={13} />{instructor.experience} years experience</span>
                    <span className="flex items-center gap-1"><Globe size={13} />{instructor.languages.join(", ")}</span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
                    <StarRating rating={instructor.rating} showValue size="md" />
                    <span className="text-sm text-slate-500">{instructor.reviewCount} reviews</span>
                    <span className="text-sm text-slate-500">·</span>
                    <span className="text-sm text-slate-500">{instructor.lessonsGiven.toLocaleString()} lessons</span>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-white/4 p-3 text-center">
                      <div className="text-xl font-bold text-emerald-400">{instructor.passRate}%</div>
                      <div className="text-xs text-slate-500">pass rate</div>
                    </div>
                    <div className="rounded-lg bg-white/4 p-3 text-center">
                      <div className="text-xl font-bold text-blue-400">{instructor.lessonsGiven.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">lessons given</div>
                    </div>
                    <div className="rounded-lg bg-white/4 p-3 text-center">
                      <div className="text-xl font-bold text-amber-400">{instructor.rating}</div>
                      <div className="text-xs text-slate-500">avg rating</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/6">
                {instructor.badges.map((badge) => {
                  const config = badgeConfig[badge];
                  return (
                    <Badge key={badge} variant={config.variant} size="md">
                      {config.icon}
                      {config.label}
                    </Badge>
                  );
                })}
              </div>
            </div>

            {/* Bio */}
            <div className="rounded-xl border border-white/8 bg-[#0f1117] p-6">
              <h2 className="text-base font-semibold text-white mb-3">About {instructor.name.split(" ")[0]}</h2>
              <p className="text-sm text-slate-400 leading-relaxed">{instructor.bio}</p>

              {/* Specialisms */}
              <div className="mt-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Specialisms</h3>
                <div className="flex flex-wrap gap-2">
                  {instructor.specialisms.map((s) => (
                    <Badge key={s} variant="default" size="md">{s}</Badge>
                  ))}
                </div>
              </div>

              {/* Vehicle */}
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <Car size={14} className="text-slate-500" />
                Teaching in a {instructor.vehicle.year} {instructor.vehicle.make} {instructor.vehicle.model} ({instructor.vehicle.color}) ·{" "}
                <span className="capitalize">{instructor.transmission}</span>
              </div>
            </div>

            {/* Availability */}
            <div className="rounded-xl border border-white/8 bg-[#0f1117] p-6">
              <h2 className="text-base font-semibold text-white mb-4">Typical availability</h2>
              <div className="space-y-2">
                {DAYS.map((day) => {
                  const slots = instructor.availability[day];
                  const availableSlots = slots.filter((s) => s.available);
                  return (
                    <div key={day} className="flex items-center gap-3">
                      <div className="w-20 text-xs text-slate-500 capitalize">{day}</div>
                      <div className="flex gap-1.5 flex-wrap flex-1">
                        {slots.length === 0 ? (
                          <span className="text-xs text-slate-700">Unavailable</span>
                        ) : availableSlots.length === 0 ? (
                          <span className="text-xs text-slate-700">Fully booked</span>
                        ) : (
                          availableSlots.map((slot) => (
                            <span
                              key={slot.startTime}
                              className="text-xs px-2 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/20 text-emerald-400"
                            >
                              {slot.startTime}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Availability updates in real time. Book below to see exact available slots.
              </p>
            </div>

            {/* Reviews */}
            <div className="rounded-xl border border-white/8 bg-[#0f1117] p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-white">
                  Student reviews <span className="text-slate-500 font-normal">({reviews.length})</span>
                </h2>
                <div className="flex items-center gap-1.5">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <span className="font-bold text-white">{instructor.rating}</span>
                </div>
              </div>

              {reviews.length === 0 ? (
                <p className="text-sm text-slate-500">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-4 border-b border-white/6 last:border-0 last:pb-0">
                      <div className="flex items-start gap-3">
                        <Avatar name={review.studentName} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-medium text-white">{review.studentName}</span>
                            {review.passed && (
                              <Badge variant="green" size="sm">
                                <CheckCircle size={10} />
                                Passed
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <StarRating rating={review.rating} size="sm" />
                            <span className="text-xs text-slate-600">{formatRelativeTime(review.createdAt)}</span>
                          </div>
                          <p className="text-sm text-slate-400 leading-relaxed">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sticky booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Pricing card */}
              <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <div className="text-3xl font-bold text-white">{formatPricePerHour(instructor.pricePerHour)}</div>
                    <div className="text-xs text-slate-500">per hour · prices may vary</div>
                  </div>
                  <StarRating rating={instructor.rating} size="sm" />
                </div>

                {/* Packages */}
                <div className="space-y-2 mb-5">
                  {instructor.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`rounded-lg border p-3 relative ${
                        pkg.popular
                          ? "border-blue-500/40 bg-blue-500/8"
                          : "border-white/8 bg-white/3"
                      }`}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-blue-500 text-[10px] text-white font-medium">
                          Popular
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium text-white">{pkg.name}</div>
                          <div className="text-xs text-slate-500">{pkg.hours} hour{pkg.hours > 1 ? "s" : ""}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">{formatPrice(pkg.priceInPence)}</div>
                          {pkg.saving && (
                            <div className="text-xs text-emerald-400">Save {formatPrice(pkg.saving)}</div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Link href={`/booking?instructor=${instructor.slug}`}>
                  <Button className="w-full" size="lg">
                    <Calendar size={16} />
                    Book a Lesson
                  </Button>
                </Link>

                <div className="mt-3 flex items-center gap-1.5 justify-center">
                  <Phone size={11} className="text-slate-600" />
                  <span className="text-xs text-slate-600">Free cancellation up to 48 hrs before</span>
                </div>
              </div>

              {/* Quick stats */}
              <div className="rounded-xl border border-white/8 bg-[#0f1117] p-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                  Instructor details
                </h3>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">ADI Number</span>
                    <span className="text-slate-300 font-mono">{instructor.adiNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Coverage</span>
                    <span className="text-slate-300">{instructor.location.coverageRadius} mile radius</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Languages</span>
                    <span className="text-slate-300">{instructor.languages.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Vehicle</span>
                    <span className="text-slate-300">{instructor.vehicle.make} {instructor.vehicle.model}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Transmission</span>
                    <span className="text-slate-300 capitalize">{instructor.transmission}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
