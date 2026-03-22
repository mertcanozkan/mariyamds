"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

export default function DashboardRedirect() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    } else if (user?.role === "instructor") {
      router.push("/dashboard/instructor");
    } else {
      router.push("/dashboard/student");
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-slate-400">Redirecting…</div>
    </div>
  );
}
