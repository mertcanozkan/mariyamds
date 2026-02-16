import { cn } from "@/lib/utils";

type StarsProps = {
  count?: number;
  className?: string;
};

export default function Stars({ count = 5, className }: StarsProps) {
  return (
    <div className={cn("flex items-center gap-1 text-brand-accent", className)} aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, index) => (
        <svg key={index} viewBox="0 0 20 20" className="h-4 w-4 fill-current" aria-hidden>
          <path d="M10 1.7l2.6 5.28 5.83.85-4.22 4.11 1 5.81L10 15.1l-5.21 2.74 1-5.81L1.57 7.83l5.83-.85L10 1.7z" />
        </svg>
      ))}
    </div>
  );
}
