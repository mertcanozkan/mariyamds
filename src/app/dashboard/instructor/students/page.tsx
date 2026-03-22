"use client";

import { useState } from "react";
import { Search, ChevronDown, ChevronUp, CheckCircle, Clock, BookOpen } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const MOCK_STUDENTS = [
  {
    id: "stu-001",
    name: "Tom Harrison",
    postcode: "SW1A 1AA",
    lessonsCompleted: 15,
    totalHours: 18,
    transmission: "manual",
    theoryStatus: "passed",
    practicalStatus: "booked",
    lastLesson: "14 Dec 2024",
    notes: "Excellent progress. Needs more practice on junctions under time pressure.",
  },
  {
    id: "stu-002",
    name: "Fatima Al-Hassan",
    postcode: "W1A 1AB",
    lessonsCompleted: 8,
    totalHours: 9,
    transmission: "both",
    theoryStatus: "passed",
    practicalStatus: "not-started",
    lastLesson: "10 Dec 2024",
    notes: "Building confidence well. Focus on motorway preparation next.",
  },
  {
    id: "stu-003",
    name: "Charlie Browning",
    postcode: "EC1A 1AB",
    lessonsCompleted: 22,
    totalHours: 25,
    transmission: "manual",
    theoryStatus: "passed",
    practicalStatus: "passed",
    lastLesson: "7 Dec 2024",
    notes: "Passed test on 7 Dec. Now booked for Pass Plus.",
  },
  {
    id: "stu-004",
    name: "Neha Sharma",
    postcode: "N1 1AA",
    lessonsCompleted: 6,
    totalHours: 7,
    transmission: "automatic",
    theoryStatus: "not-started",
    practicalStatus: "not-started",
    lastLesson: "5 Dec 2024",
    notes: "New learner. Very eager. Remind to start theory revision.",
  },
];

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = MOCK_STUDENTS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.postcode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Students</h1>
          <p className="text-slate-400 text-sm">{MOCK_STUDENTS.length} active students</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Search by name or postcode…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-white/10 bg-[#0f1117] text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
        />
      </div>

      {/* Student list */}
      <div className="space-y-3">
        {filtered.map((student) => (
          <div key={student.id} className="rounded-xl border border-white/8 bg-[#0f1117] overflow-hidden">
            <button
              onClick={() => setExpanded(expanded === student.id ? null : student.id)}
              className="w-full flex items-center gap-3 p-4 text-left hover:bg-white/3 transition-colors"
            >
              <Avatar name={student.name} size="md" />

              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-white mb-1">{student.name}</div>
                <div className="flex flex-wrap gap-2 items-center">
                  <span className="text-xs text-slate-500">{student.lessonsCompleted} lessons · {student.totalHours}h</span>
                  <Badge
                    variant={student.practicalStatus === "passed" ? "green" : student.practicalStatus === "booked" ? "blue" : "default"}
                    size="sm"
                  >
                    {student.practicalStatus === "passed" ? (
                      <><CheckCircle size={9} /> Passed</>
                    ) : student.practicalStatus === "booked" ? (
                      <><Clock size={9} /> Test booked</>
                    ) : (
                      "Pre-test"
                    )}
                  </Badge>
                  <Badge
                    variant={student.theoryStatus === "passed" ? "green" : "default"}
                    size="sm"
                  >
                    <BookOpen size={9} />
                    Theory: {student.theoryStatus === "passed" ? "Passed" : "Pending"}
                  </Badge>
                </div>
              </div>

              <div className="hidden sm:block text-right">
                <div className="text-xs text-slate-500">Last lesson</div>
                <div className="text-xs text-slate-300">{student.lastLesson}</div>
              </div>

              {expanded === student.id ? (
                <ChevronUp size={16} className="text-slate-500 flex-shrink-0" />
              ) : (
                <ChevronDown size={16} className="text-slate-500 flex-shrink-0" />
              )}
            </button>

            {expanded === student.id && (
              <div className="px-4 pb-4 border-t border-white/6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                  <div className="rounded-lg bg-white/4 p-2.5 text-center">
                    <div className="text-sm font-bold text-white">{student.lessonsCompleted}</div>
                    <div className="text-[10px] text-slate-500">Lessons</div>
                  </div>
                  <div className="rounded-lg bg-white/4 p-2.5 text-center">
                    <div className="text-sm font-bold text-white">{student.totalHours}h</div>
                    <div className="text-[10px] text-slate-500">Hours</div>
                  </div>
                  <div className="rounded-lg bg-white/4 p-2.5 text-center">
                    <div className="text-sm font-bold text-white capitalize">{student.transmission}</div>
                    <div className="text-[10px] text-slate-500">Gearbox</div>
                  </div>
                  <div className="rounded-lg bg-white/4 p-2.5 text-center">
                    <div className="text-sm font-bold text-white">{student.postcode}</div>
                    <div className="text-[10px] text-slate-500">Postcode</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs font-medium text-slate-500 mb-1.5">Instructor notes</div>
                  <textarea
                    defaultValue={student.notes}
                    rows={3}
                    className="w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-xs text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">Message</Button>
                  <Button size="sm" variant="outline">View history</Button>
                  <Button size="sm">Book lesson</Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
