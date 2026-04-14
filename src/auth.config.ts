import type { NextAuthConfig } from "next-auth";

// Edge-safe auth config — no database imports, no Node.js-only modules.
// Used by middleware to validate JWT sessions.
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login", error: "/login" },
  providers: [],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
        session.user.role = (token.role as string) ?? "student";
      }
      return session;
    },
  },
};
