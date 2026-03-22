import { cn } from "@/lib/utils/cn";
import Image from "next/image";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

export default function Avatar({ src, name, size = "md", className }: AvatarProps) {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const colors = [
    "from-blue-500 to-violet-500",
    "from-emerald-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-pink-500 to-rose-500",
    "from-cyan-500 to-blue-500",
  ];

  const colorIndex =
    name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;

  if (src) {
    const isExternal = src.startsWith("http") || src.startsWith("//");
    if (isExternal) {
      return (
        <div
          className={cn("relative rounded-full overflow-hidden flex-shrink-0", sizes[size], className)}
          role="img"
          aria-label={`${name}'s profile photo`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={name} className="w-full h-full object-cover" />
        </div>
      );
    }
    return (
      <div
        className={cn("relative rounded-full overflow-hidden flex-shrink-0", sizes[size], className)}
        role="img"
        aria-label={`${name}'s profile photo`}
      >
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center font-bold text-white bg-gradient-to-br flex-shrink-0",
        colors[colorIndex],
        sizes[size],
        className
      )}
      role="img"
      aria-label={`${name}'s avatar`}
    >
      <span aria-hidden="true">{initials}</span>
    </div>
  );
}
