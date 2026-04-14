"use client";

import { useSession, signOut } from "next-auth/react";
import type { UserRole } from "@/lib/types";

export function useAuth() {
  const { data: session, status } = useSession();
  const user = session?.user ?? null;

  return {
    user: user
      ? {
          id: user.id,
          name: user.name ?? "",
          email: user.email ?? "",
          role: (user.role ?? "student") as UserRole,
          avatar: user.image ?? undefined,
        }
      : null,
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    logout: () => signOut({ callbackUrl: "/" }),
  };
}
