"use client";

import { motion } from "framer-motion";
import { BookOpen, CheckCircle, Clock, AlertCircle, ExternalLink } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

const manoeuvres = [
  { name: "Moving off safely", confidence: 90 },
  { name: "Clutch control", confidence: 75 },
  { name: "Bay parking", confidence: 65 },
  { name: "Parallel parking", confidence: 55 },
  { name: "Reverse around a corner", confidence: 70 },
  { name: "Emergency stop", confidence: 80 },
  { name: "Dual carriageway driving", confidence: 60 },
  { name: "Roundabouts", confidence: 85 },
  { name: "Junctions", confidence: 88 },
  { name: "Pedestrian crossings", confidence: 92 },
];

const mockScores = [
  { date: "1 Dec", score: 38 },
  { date: "8 Dec", score: 41 },
  { date: "15 Dec", score: 43 },
];

export default function ProgressPage() {
  const maxScore = 50;
  const passThreshold = 43;
  const latestScore = mockScores[mockScores.length - 1].score;

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-1">My Progress</h1>
        <p className="text-slate-400 text-sm">Track your theory test readiness and practical skills.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Theory test */}
        <div className="lg:col-span-2 rounded-xl border border-white/8 bg-[#0f1117] p-5">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-blue-400" />
              <h2 className="text-base font-semibold text-white">Theory Test</h2>
            </div>
            <Badge variant={latestScore >= passThreshold ? "green" : "amber"}>
              {latestScore >= passThreshold ? "Pass ready" : "Keep practicing"}
            </Badge>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-5">
            {/* Ring */}
            <div className="relative w-24 h-24 mx-auto sm:mx-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
                <circle
                  cx="18" cy="18" r="15"
                  fill="none"
                  stroke={latestScore >= passThreshold ? "#22c55e" : "#f59e0b"}
                  strokeWidth="3"
                  strokeDasharray="94.2"
                  strokeDashoffset={94.2 - (94.2 * latestScore) / maxScore}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-bold text-white">{latestScore}</span>
                <span className="text-[10px] text-slate-500">/{maxScore}</span>
              </div>
            </div>

            {/* Bar chart */}
            <div className="flex-1 w-full">
              <div className="text-xs text-slate-500 mb-3">Mock test scores (last 3)</div>
              <div className="flex items-end gap-4 h-16">
                {mockScores.map((s, i) => {
                  const height = (s.score / maxScore) * 100;
                  const passing = s.score >= passThreshold;
                  return (
                    <div key={i} className="flex flex-col items-center gap-1 flex-1">
                      <span className="text-xs text-slate-400 font-medium">{s.score}</span>
                      <div
                        className={cn(
                          "w-full rounded-sm transition-all",
                          passing ? "bg-emerald-500" : "bg-amber-500"
                        )}
                        style={{ height: `${height}%` }}
                      />
                      <span className="text-[10px] text-slate-600">{s.date}</span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
                <div className="w-3 h-1 rounded bg-emerald-500" />
                Pass ({passThreshold}+)
                <div className="w-3 h-1 rounded bg-amber-500 ml-2" />
                Fail
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline">
              <ExternalLink size={12} />
              DVSA Official Mock Test
            </Button>
            <Button size="sm" variant="ghost">
              Hazard perception practice
            </Button>
          </div>
        </div>

        {/* Manoeuvres */}
        <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
          <h2 className="text-base font-semibold text-white mb-4">Practical skills</h2>
          <div className="space-y-3">
            {manoeuvres.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-slate-300">{m.name}</span>
                  <span className={cn(
                    "text-xs font-medium",
                    m.confidence >= 80 ? "text-emerald-400" : m.confidence >= 60 ? "text-amber-400" : "text-red-400"
                  )}>
                    {m.confidence}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/6 overflow-hidden">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      m.confidence >= 80 ? "bg-emerald-500" : m.confidence >= 60 ? "bg-amber-500" : "bg-red-500"
                    )}
                    style={{ width: `${m.confidence}%` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Hours log */}
        <div className="rounded-xl border border-white/8 bg-[#0f1117] p-5">
          <h2 className="text-base font-semibold text-white mb-4">Driving hours log</h2>

          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/4">
              <div>
                <div className="text-sm font-medium text-white">Total lessons</div>
                <div className="text-xs text-slate-500">Completed lessons</div>
              </div>
              <div className="text-xl font-bold text-blue-400">12</div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/4">
              <div>
                <div className="text-sm font-medium text-white">Total hours</div>
                <div className="text-xs text-slate-500">Lesson time only</div>
              </div>
              <div className="text-xl font-bold text-blue-400">14h</div>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-white/4">
              <div>
                <div className="text-sm font-medium text-white">Estimated remaining</div>
                <div className="text-xs text-slate-500">UK average ~47hrs</div>
              </div>
              <div className="text-xl font-bold text-amber-400">~33h</div>
            </div>
          </div>

          <div className="p-3 rounded-lg bg-blue-500/8 border border-blue-500/15">
            <div className="flex items-start gap-2">
              <AlertCircle size={13} className="text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-300">
                The DVSA recommends a minimum of 45 hours of professional lessons plus 22 hours of private practice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
