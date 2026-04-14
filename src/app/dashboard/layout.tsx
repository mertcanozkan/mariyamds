import type { Metadata } from "next";
import DashboardSidebar from "@/components/layout/DashboardSidebar";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen pt-16">
      <DashboardSidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </div>
  );
}
