"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, DollarSign, Users, TrendingUp, ArrowRight, Star, Clock, CheckCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils/formatters";
import { useAuth } from "@/lib/hooks/useAuth";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Avatar from "@/components/ui/Avatar";

const earningsData = [
  { month: "Jul", value: 3200 },
  { month: "Aug", value: 4100 },
  { month: "Sep", value: 3800 },
  { month: "Oct", value: 4600 },
  { month: "Nov", value: 5200 },
  { month: "Dec", value: 4800 },
];

const upcomingLessons = [
  { studentName: "Tom Harrison", time: "09:00", date: "Mon 23 Dec", type: "Standard", duration: 1 },
  { studentName: "Fatima Al-Hassan", time: "11:00", date: "Mon 23 Dec", type: "Test Prep", duration: 2 },
  { studentName: "Charlie Browning", time: "14:00", date: "Tue 24 Dec", type: "Standard", duration: 1 },
  { studentName: "Neha Sharma", time: "10:00", date: "Wed 25 Dec", type: "Pass Plus", duration: 6 },
];

type ProfileData = { name: string; image?: string | null; adiNumber?: string | null; slug: string };

export default function InstructorDashboard() {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "there";
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        const slug = (data.name ?? "instructor").toLowerCase().replace(/\s+/g, "-") + "-" + (data.id ?? "").slice(-6);
        setProfile({ name: data.name, image: data.image, adiNumber: data.adiNumber, slug });
      })
      .catch(() => {});
  }, []);

  const maxEarnings = Math.max(...earningsData.map((d) => d.value));

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white mb-1">Welcome back, {firstName}!</h1>
        <p className="text-slate-400 text-sm">Here&apos;s your business overview for December.</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: "This Week's Lessons", value: "8", icon: Calendar, color: "blue", change: "+2 vs last week" },
          { label: "Monthly Earnings", value: "£4,800", icon: DollarSign, color: "emerald", change: "+12% vs Nov" },
          { label: "Active Students", value: "24", icon: Users, color: "violet", change: "3 new this month" },
          { label: "Pass Rate (90 days)", value: "96%", icon: TrendingUp, color: "amber", change: "Industry avg: 51%" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          const colorMap: Record<string, string> = {
            blue: "bg-blue-500/15 border-blue-500/20 text-blue-400",
            emerald: "bg-emerald-500/15 border-emerald-500/20 text-emerald-400",
            violet: "bg-violet-500/15 border-violet-500/20 text-violet-400",
            amber: "bg-amber-500/15 border-amber-500/20 text-amber-400",
          };
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-white/8 bg-[#0f1117] p-4"
            >
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center mb-3 ${colorMap[stat.color]}`}>
                <Icon size={14} />
              </div>
              <div className="text-2xl font-bold text-white mb-0.5">{stat.value}</div>
              <div className="text-xs text-slate-500 mb-1">{stat.label}</div>
              <div className="text-xs text-emerald-400">{stat.change}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          {/* Earnings chart */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-white/8 bg-[#0f1117] p-5"
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-semibold text-white">Earnings (last 6 months)</h2>
              <Link href="/dashboard/instructor/earnings" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                Full report <ArrowRight size={12} />
              </Link>
            </div>

            <div className="flex items-end gap-2 h-32">
              {earningsData.map((d, i) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="text-xs text-slate-500">{formatPrice(d.value * 100).replace(".00", "")}</div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.value / maxEarnings) * 100}%` }}
                    transition={{ duration: 0.6, delay: i * 0.05 }}
                    className={`w-full rounded-t-md ${i === earningsData.length - 1 ? "bg-blue-500" : "bg-white/15"}`}
                  />
                  <div className="text-[10px] text-slate-600">{d.month}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-white/8 flex gap-4 text-sm">
              <div>
                <div className="text-slate-500 text-xs">Total (6 months)</div>
                <div className="font-bold text-white">{formatPrice(earningsData.reduce((s, d) => s + d.value, 0) * 100)}</div>
              </div>
              <div>
                <div className="text-slate-500 text-xs">After platform fee (10%)</div>
                <div className="font-bold text-emerald-400">{formatPrice(earningsData.reduce((s, d) => s + d.value, 0) * 90)}</div>
              </div>
            </div>
          </motion.div>

          {/* Upcoming lessons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-white/8 bg-[#0f1117] p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-white">Upcoming lessons</h2>
              <Link href="/dashboard/instructor/schedule" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                Full schedule <ArrowRight size={12} />
              </Link>
            </div>

            <div className="space-y-2">
              {upcomingLessons.map((lesson, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-white/3 border border-white/6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex flex-col items-center justify-center flex-shrink-0">
                    <div className="text-[10px] text-blue-400 font-bold">{lesson.time}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white">{lesson.studentName}</div>
                    <div className="text-xs text-slate-500">{lesson.date} · {lesson.type} · {lesson.duration}h</div>
                  </div>
                  <Badge variant="outline" size="sm">{lesson.type}</Badge>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Profile preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-xl border border-white/8 bg-[#0f1117] p-4"
          >
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Your profile</h2>
            <div className="flex items-center gap-2.5 mb-3">
              <Avatar src={profile?.image ?? user?.avatar} name={profile?.name ?? user?.name ?? "?"} size="md" />
              <div>
                <div className="text-sm font-semibold text-white">{profile?.name ?? user?.name ?? "—"}</div>
                <div className="text-xs text-slate-500">
                  {profile?.adiNumber ? `ADI #${profile.adiNumber}` : "Driving Instructor"}
                </div>
              </div>
            </div>

            <Link href={profile ? `/instructors/${profile.slug}` : "/dashboard/instructor/settings"}>
              <Button variant="outline" size="sm" className="w-full">View public profile</Button>
            </Link>
          </motion.div>

          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl border border-white/8 bg-[#0f1117] p-4"
          >
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick actions</h2>
            <div className="space-y-2">
              <Link href="/dashboard/instructor/schedule">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Calendar size={13} />
                  Update availability
                </Button>
              </Link>
              <Link href="/dashboard/instructor/students">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <Users size={13} />
                  View students
                </Button>
              </Link>
              <Link href="/dashboard/instructor/earnings">
                <Button variant="ghost" size="sm" className="w-full justify-start text-xs">
                  <DollarSign size={13} />
                  Earnings report
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Recent activity */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-xl border border-white/8 bg-[#0f1117] p-4"
          >
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Recent</h2>
            <div className="space-y-3">
              {[
                { text: "Tom Harrison passed his test!", icon: CheckCircle, color: "text-emerald-400" },
                { text: "New booking from Fatima Al-Hassan", icon: Calendar, color: "text-blue-400" },
                { text: "New 5★ review received", icon: Star, color: "text-amber-400" },
                { text: "£520 payout processed", icon: DollarSign, color: "text-emerald-400" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <Icon size={13} className={`mt-0.5 flex-shrink-0 ${item.color}`} />
                    <div className="text-xs text-slate-300 leading-snug">{item.text}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
