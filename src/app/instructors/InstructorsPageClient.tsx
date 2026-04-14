"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";
import { MOCK_INSTRUCTORS } from "@/lib/mock-data/instructors";
import { FilterState, Instructor } from "@/lib/types";
import { useInstructorFilters } from "@/lib/hooks/useInstructorFilters";
import InstructorCard from "@/components/instructors/InstructorCard";
import InstructorFilters from "@/components/instructors/InstructorFilters";
import { InstructorCardSkeleton } from "@/components/ui/Skeleton";
import { cn } from "@/lib/utils/cn";

const defaultFilters: FilterState = {
  location: "",
  locationCoords: undefined,
  locationRadiusMiles: 10,
  transmission: "all",
  minPrice: 20,
  maxPrice: 80,
  minRating: 0,
  lessonTypes: [],
  dvsaOnly: false,
  sortBy: "rating",
};

function InstructorsPageContent() {
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    location: searchParams.get("location") || "",
  });
  const [loading, setLoading] = useState(true);
  const [allInstructors, setAllInstructors] = useState<Instructor[]>(MOCK_INSTRUCTORS);
  const filtered = useInstructorFilters(allInstructors, filters);

  useEffect(() => {
    fetch("/api/instructors")
      .then((r) => r.json())
      .then((dbInstructors: Instructor[]) => {
        if (dbInstructors.length > 0) {
          const mockIds = new Set(MOCK_INSTRUCTORS.map((m) => m.id));
          const fresh = dbInstructors.filter((i) => !mockIds.has(i.id));
          setAllInstructors([...fresh, ...MOCK_INSTRUCTORS]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const sortOptions: { value: FilterState["sortBy"]; label: string }[] = [
    { value: "rating", label: "Top Rated" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "reviews", label: "Most Reviews" },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="border-b border-white/8 bg-[#0f1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <h1 className="text-2xl font-bold text-white mb-1">Find a Driving Instructor</h1>
          <p className="text-slate-400 text-sm">
            {allInstructors.length} DVSA-approved instructors across the UK
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-6">
          <InstructorFilters
            filters={filters}
            onChange={setFilters}
            resultCount={filtered.length}
            totalCount={allInstructors.length}
          />

          <div className="flex-1 min-w-0">
            <div className="hidden lg:flex items-center justify-between mb-5">
              <p className="text-sm text-slate-400">
                Showing <span className="text-white font-medium">{filtered.length}</span> of{" "}
                {allInstructors.length} instructors
              </p>

              <div className="flex items-center gap-2">
                <ArrowUpDown size={14} className="text-slate-500" />
                <div className="flex gap-1">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setFilters((f) => ({ ...f, sortBy: opt.value }))}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                        filters.sortBy === opt.value
                          ? "bg-blue-600 text-white"
                          : "text-slate-400 hover:text-white hover:bg-white/8"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <InstructorCardSkeleton key={i} />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-5xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-white mb-2">No instructors found</h3>
                <p className="text-slate-500 text-sm">
                  Try widening your search area or adjusting your filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map((instructor, i) => (
                  <InstructorCard key={instructor.id} instructor={instructor} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InstructorsPageClient() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-20 flex items-center justify-center text-slate-400">
          Loading...
        </div>
      }
    >
      <InstructorsPageContent />
    </Suspense>
  );
}