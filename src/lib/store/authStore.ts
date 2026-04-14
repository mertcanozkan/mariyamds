"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthUser, UserRole } from "../types";

const DEMO_STUDENT: AuthUser = {
  id: "stu-current",
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "student",
  avatar: undefined,
};

const DEMO_INSTRUCTOR: AuthUser = {
  id: "inst-001",
  name: "Sarah Thompson",
  email: "sarah.thompson@drivepass.co.uk",
  role: "instructor",
  avatar: undefined,
};

interface AuthStore {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  demoLogin: (role: UserRole) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email: string, _password: string) => {
        await new Promise((r) => setTimeout(r, 1000));
        const user: AuthUser = {
          id: "stu-current",
          name: email.split("@")[0].replace(/[._]/g, " "),
          email,
          role: "student",
        };
        set({ user, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      demoLogin: (role: UserRole) => {
        const user = role === "instructor" ? DEMO_INSTRUCTOR : DEMO_STUDENT;
        set({ user, isAuthenticated: true });
      },
    }),
    {
      name: "drivepass-auth",
    }
  )
);
