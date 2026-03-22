import { cn } from "@/lib/utils/cn";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "blue" | "green" | "violet" | "amber" | "red" | "outline";
  size?: "sm" | "md";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  size = "sm",
  className,
}: BadgeProps) {
  const variants = {
    default: "bg-white/10 text-slate-300 border border-white/10",
    blue: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
    green: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20",
    violet: "bg-violet-500/15 text-violet-400 border border-violet-500/20",
    amber: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
    red: "bg-red-500/15 text-red-400 border border-red-500/20",
    outline: "bg-transparent text-slate-400 border border-white/15",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
