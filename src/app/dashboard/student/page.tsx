"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar, Clock, TrendingUp, Award, ArrowRight, CheckCircle,
  BookOpen, Car, Star, AlertCircle
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import { MOCK_INSTRUCTORS } from "@/lib/mock-data/instructors";
import { MOCK_BOOKINGS } from "@/lib/mock-data/bookings";
import { formatPrice, formatDate, formatTime } from "@/lib/utils/formatters";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";
import StarRating from "@/components/ui/StarRating";

const statCards = [
  { label: "Lessons Completed", value: "12", icon: Calendar, color: "blue", change: "+2 this month" },
  { label: "Total Hours", value: "14h", icon: Clock, color: "violet", change: "+3h this month" },
  { label: "Theory Score", value: "86%", icon: BookOpen, color: "emerald", change: "Last mock test" },
  { label: "Days Until Test", value: "23", icon: Award, color: "amber", change: "15 Jan 2025" },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-500/15 border-blue-500/20 text-blue-400",
  violet: "bg-violet-500/15 border-violet-500/20 text-violet-400",
  emerald: "bg-emerald-500/15 border-emerald-500/20 text-emerald-400",
  amber: "bg-amber-500/15 border-amber-500/20 text-amber-400",
};

const recentActivity = [
  { text: "Lesson completed with Sarah Thompson", time: "2 days ago", icon: CheckCircle, color: "text-emerald-400" },
  { text: "Theory mock test completed — 43/50", time: "4 days ago", icon: BookOpen, color: "text-blue-400" },
  { text: "Lesson booked for 28 Dec 10:00", time: "1 week ago", icon: Calendar, color: "text-violet-400" },
  { text: "Joined MCO-DS UK", time: "3 weeks ago", icon: Car, color: "text-slate-400" },
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const instructor = MOCK_INSTRUCTORS[0];
  const upcomingBooking = MOCK_BOOKINGS.find((b) => b.status === "confirmed");
  const pastBookings = MOCK_BOOKINGS.filter((b) => b.status === "completed");

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const firstName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      {/* Greeting */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white mb-1">{greeting}, {firstName}! 👋</h1>
        <p className="text-slate-400 text-sm">Here&apos;s your driving journey at a glance.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded-xl border border-white/8 bg-[#0f1117] p-4"
            >
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mb-3 ${colorMap[stat.color]}`}>
                <Icon size={14} />
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-600">{stat.change}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Next lesson */}
          {upcomingBooking && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-xl border border-blue-500/25 bg-gradient-to-br from-blue-950/20 to-[#0f1117] p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">Next lesson</h2>
                <Badge variant="blue">Confirmed</Badge>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Avatar src={instructor.avatar} name={instructor.name} size="md" />
                <div>
                  <div className="text-base font-semibold text-white">{instructor.name}</div>
                  <div className="text-xs text-slate-500">{instructor.vehicle.make} {instructor.vehicle.model} · {instructor.transmission}</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-lg bg-white/4 p-2.5 text-center">
                  <Calendar size={14} className="text-blue-400 mx-auto mb-1" />
                  <div className="text-xs text-white font-medium">28 Dec</div>
                  <div className="text-[10px] text-slate-500">Saturday</div>
                </div>
                <div className="rounded-lg bg-white/4 p-2.5 text-center">
                  <Clock size={14} className="text-blue-400 mx-auto mb-1" />
                  <div className="text-xs text-white font-medium">{formatTime(upcomingBooking.startTime)}</div>
                  <div className="text-[10px] text-slate-500">{upcomingBooking.durationHours}h lesson</div>
                </div>
                <div className="rounded-lg bg-white/4 p-2.5 text-center">
                  <TrendingUp size={14} className="text-blue-400 mx-auto mb-1" />
                  <div className="text-xs text-white font-medium">{formatPrice(upcomingBooking.priceInPence)}</div>
                  <div className="text-[10px] text-slate-500">lesson fee</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Cancel lesson</Button>
                <Button size="sm" className="flex-1">View details</Button>
              </div>
            </motion.div>
          )}

          {/* Past lessons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-xl border border-white/8 bg-[#0f1117] p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">Recent lessons</h2>
              <Link href="/dashboard/student/lessons" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                View all <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-3">
              {pastBookings.map((booking) => (
                <div key={booking.id} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/6">
                  <CheckCircle size={14} className="text-emerald-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-white">{booking.lessonType.replace("-", " ")} lesson</div>
                    <div className="text-xs text-slate-500">{booking.date.split("-").reverse().join("/")} · {formatTime(booking.startTime)}</div>
                  </div>
                  <div className="text-sm font-medium text-slate-300">{formatPrice(booking.priceInPence)}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Theory prep */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="rounded-xl border border-white/8 bg-[#0f1117] p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white">Theory test preparation</h2>
              <Badge variant="amber">Booked</Badge>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="relative w-16 h-16">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                  <circle
                    cx="18" cy="18" r="15"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="94.2"
                    strokeDashoffset={94.2 - (94.2 * 86) / 100}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">86%</span>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold text-white mb-1">86% readiness score</div>
                <div className="text-xs text-slate-500">Based on your last 3 mock tests</div>
                <div className="text-xs text-emerald-400 mt-1">Pass threshold: 86% (43/50)</div>
              </div>
            </div>

            <Link href="/dashboard/student/progress">
              <Button variant="outline" size="sm" className="w-full">
                View theory resources
                <ArrowRight size={12} />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Instructor card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            className="rounded-xl border border-white/8 bg-[#0f1117] p-4"
          >
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Your instructor</h2>
            <div className="flex items-center gap-2.5 mb-3">
              <Avatar src={instructor.avatar} name={instructor.name} size="md" />
              <div>
                <div className="text-sm font-semibold text-white">{instructor.name}</div>
                <StarRating rating={instructor.rating} showValue size="sm" />
              </div>
            </div>
            <div className="text-xs text-slate-500 mb-3">{instructor.location.city} · {instructor.vehicle.make} {instructor.vehicle.model}</div>
            <Link href={`/instructors/${instructor.slug}`}>
              <Button variant="outline" size="sm" className="w-full">View profile</Button>
            </Link>
          </motion.div>

          {/* Activity feed */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-xl border border-white/8 bg-[#0f1117] p-4"
          >
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Recent activity</h2>
            <div className="space-y-3">
              {recentActivity.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <Icon size={13} className={`mt-0.5 flex-shrink-0 ${item.color}`} />
                    <div>
                      <div className="text-xs text-slate-300 leading-snug">{item.text}</div>
                      <div className="text-[10px] text-slate-600 mt-0.5">{item.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            className="rounded-xl border border-white/8 bg-[#0f1117] p-4"
          >
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick actions</h2>
            <div className="space-y-2">
              <Link href="/instructors">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Car size={13} />
                  Book a lesson
                </Button>
              </Link>
              <Link href="/dashboard/student/progress">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <BookOpen size={13} />
                  Theory practice
                </Button>
              </Link>
              <Link href="/dashboard/student/lessons">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Star size={13} />
                  Leave a review
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
