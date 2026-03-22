"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuth = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      {!isAuth && !isDashboard && <Footer />}
    </>
  );
}
