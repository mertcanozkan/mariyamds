"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Calendar, BookOpen, TrendingUp, Users,
  DollarSign, Settings, Car, LogOut, ChevronLeft
} from "lucide-react";
import { useAuth } from "@/lib/hooks/useAuth";
import Avatar from "@/components/ui/Avatar";
import { cn } from "@/lib/utils/cn";

const studentNav = [
  { label: "Overview", href: "/dashboard/student", icon: LayoutDashboard },
  { label: "My Lessons", href: "/dashboard/student/lessons", icon: Calendar },
  { label: "Progress", href: "/dashboard/student/progress", icon: TrendingUp },
  { label: "Settings", href: "/dashboard/student/settings", icon: Settings },
];

const instructorNav = [
  { label: "Overview", href: "/dashboard/instructor", icon: LayoutDashboard },
  { label: "Schedule", href: "/dashboard/instructor/schedule", icon: Calendar },
  { label: "Students", href: "/dashboard/instructor/students", icon: Users },
  { label: "Earnings", href: "/dashboard/instructor/earnings", icon: DollarSign },
  { label: "Settings", href: "/dashboard/instructor/settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const nav = user?.role === "instructor" ? instructorNav : studentNav;

  return (
    <aside className="w-56 flex-shrink-0 flex flex-col border-r border-white/8 bg-[#0a0a0f] min-h-screen">
      {/* User profile */}
      {user && (
        <div className="p-4 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <Avatar name={user.name} size="sm" />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{user.name}</div>
              <div className="text-xs text-slate-500 capitalize">{user.role}</div>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all",
                active
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:text-white hover:bg-white/6"
              )}
            >
              <Icon size={15} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-white/8 space-y-1">
        <Link href="/instructors" className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/6 transition-colors">
          <BookOpen size={15} />
          Browse Instructors
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </aside>
  );
}
