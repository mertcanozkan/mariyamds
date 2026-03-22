import Link from "next/link";
import { Car } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-white/10 flex items-center justify-center mb-6">
        <Car size={36} className="text-blue-400" />
      </div>

      <div className="text-8xl font-bold gradient-text mb-4">404</div>
      <h1 className="text-2xl font-bold text-white mb-3">Page not found</h1>
      <p className="text-slate-400 mb-8 max-w-sm">
        Looks like you&apos;ve taken a wrong turn. Let&apos;s get you back on the right road.
      </p>

      <div className="flex gap-3">
        <Link href="/">
          <Button size="lg">Go home</Button>
        </Link>
        <Link href="/instructors">
          <Button variant="outline" size="lg">Find instructors</Button>
        </Link>
      </div>
    </div>
  );
}
