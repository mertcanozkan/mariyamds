"use client";

import { useState, useId } from "react";
import { X, SlidersHorizontal } from "lucide-react";
import { FilterState, LessonType } from "@/lib/types";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import PostcodeSearchInput, { PostcodeResult } from "./PostcodeSearchInput";

interface InstructorFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount: number;
  totalCount: number;
}

const lessonTypes: { value: LessonType; label: string }[] = [
  { value: "intro", label: "Intro Lesson" },
  { value: "standard", label: "Standard" },
  { value: "motorway", label: "Motorway" },
  { value: "test-prep", label: "Test Prep" },
  { value: "pass-plus", label: "Pass Plus" },
];

const RADIUS_OPTIONS = [5, 10, 15, 20, 30];

interface FiltersContentProps {
  filters: FilterState;
  update: (partial: Partial<FilterState>) => void;
  toggleLessonType: (type: LessonType) => void;
  hasActiveFilters: boolean;
  clearAll: () => void;
}

function FiltersContent({
  filters,
  update,
  toggleLessonType,
  hasActiveFilters,
  clearAll,
}: FiltersContentProps) {
  const uid = useId();
  const priceId = `${uid}-price`;

  const handleResolve = (result: PostcodeResult) => {
    update({ location: result.postcode, locationCoords: [result.lat, result.lng] });
  };

  const handleClear = () => {
    update({ location: "", locationCoords: undefined });
  };

  return (
    <div className="space-y-6">
      {/* Location */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" id={`${uid}-location-label`}>
          Location
        </p>
        <PostcodeSearchInput
          value={filters.location}
          resolvedCoords={filters.locationCoords}
          onResolve={handleResolve}
          onClear={handleClear}
          inputId={`${uid}-postcode`}
          labelledBy={`${uid}-location-label`}
        />

        {filters.locationCoords && (
          <div className="mt-3">
            <p className="text-xs text-slate-500 mb-2" id={`${uid}-radius-label`}>
              Search radius:{" "}
              <span className="text-slate-300 font-medium">{filters.locationRadiusMiles} miles</span>
            </p>
            <div className="flex gap-1.5 flex-wrap" role="group" aria-labelledby={`${uid}-radius-label`}>
              {RADIUS_OPTIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => update({ locationRadiusMiles: r })}
                  aria-pressed={filters.locationRadiusMiles === r}
                  className={cn(
                    "px-2.5 py-1 rounded-lg text-xs font-medium transition-all border",
                    filters.locationRadiusMiles === r
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-white/5 border-white/8 text-slate-400 hover:text-white"
                  )}
                >
                  {r} mi
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Transmission */}
      <fieldset>
        <legend className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Transmission
        </legend>
        <div className="flex gap-2" role="group">
          {(["all", "manual", "automatic"] as const).map((t) => (
            <button
              key={t}
              onClick={() => update({ transmission: t })}
              aria-pressed={filters.transmission === t}
              className={cn(
                "flex-1 py-2 rounded-lg text-xs font-medium capitalize transition-all border",
                filters.transmission === t
                  ? "bg-blue-600 border-blue-500 text-white"
                  : "bg-white/5 border-white/8 text-slate-400 hover:text-white hover:bg-white/10"
              )}
            >
              {t === "all" ? "Any" : t}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Price range */}
      <div>
        <label htmlFor={priceId} className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
          Price per hour: £{filters.minPrice} – £{filters.maxPrice}
        </label>
        <div className="space-y-2">
          <input
            id={priceId}
            type="range"
            min={20}
            max={80}
            step={5}
            value={filters.maxPrice}
            onChange={(e) => update({ maxPrice: parseInt(e.target.value) })}
            aria-valuemin={20}
            aria-valuemax={80}
            aria-valuenow={filters.maxPrice}
            aria-valuetext={`Up to £${filters.maxPrice} per hour`}
            className="w-full accent-blue-500 cursor-pointer"
            suppressHydrationWarning
          />
          <div className="flex justify-between text-xs text-slate-600" aria-hidden="true">
            <span>£20</span>
            <span>£80</span>
          </div>
        </div>
      </div>

      {/* Min rating */}
      <fieldset>
        <legend className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Minimum rating
        </legend>
        <div className="flex gap-2 flex-wrap" role="group">
          {[0, 4, 4.5, 5].map((r) => (
            <button
              key={r}
              onClick={() => update({ minRating: r })}
              aria-pressed={filters.minRating === r}
              className={cn(
                "px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border",
                filters.minRating === r
                  ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                  : "bg-white/5 border-white/8 text-slate-400 hover:text-white"
              )}
            >
              {r === 0 ? "Any" : `${r}+`}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Lesson types */}
      <fieldset>
        <legend className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
          Lesson type
        </legend>
        <div className="space-y-1.5">
          {lessonTypes.map((lt) => {
            const checked = filters.lessonTypes.includes(lt.value);
            return (
              <label
                key={lt.value}
                className="flex items-center gap-2.5 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleLessonType(lt.value)}
                  className="sr-only"
                />
                <div
                  aria-hidden="true"
                  className={cn(
                    "w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center transition-all",
                    checked ? "bg-blue-600 border-blue-500" : "border-white/20 bg-white/5"
                  )}
                >
                  {checked && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors">
                  {lt.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* DVSA only toggle */}
      <div>
        <label className="flex items-center justify-between cursor-pointer gap-3">
          <span className="text-sm text-slate-300">DVSA approved only</span>
          <button
            type="button"
            role="switch"
            aria-checked={filters.dvsaOnly}
            onClick={() => update({ dvsaOnly: !filters.dvsaOnly })}
            className={cn(
              "relative w-10 h-5 rounded-full transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0a0a0f]",
              filters.dvsaOnly ? "bg-blue-600" : "bg-white/10"
            )}
          >
            <span className="sr-only">{filters.dvsaOnly ? "On" : "Off"}</span>
            <div
              aria-hidden="true"
              className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-all"
              style={{ left: filters.dvsaOnly ? "22px" : "2px" }}
            />
          </button>
        </label>
      </div>

      {/* Clear all */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearAll} className="w-full text-slate-400">
          <X size={14} aria-hidden="true" />
          Clear all filters
        </Button>
      )}
    </div>
  );
}

export default function InstructorFilters({
  filters,
  onChange,
  resultCount,
  totalCount,
}: InstructorFiltersProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileDrawerId = "mobile-filters-drawer";

  const update = (partial: Partial<FilterState>) => onChange({ ...filters, ...partial });

  const toggleLessonType = (type: LessonType) => {
    const exists = filters.lessonTypes.includes(type);
    update({
      lessonTypes: exists
        ? filters.lessonTypes.filter((t) => t !== type)
        : [...filters.lessonTypes, type],
    });
  };

  const hasActiveFilters = Boolean(
    filters.location ||
      filters.locationCoords ||
      filters.transmission !== "all" ||
      filters.minPrice > 20 ||
      filters.maxPrice < 80 ||
      filters.minRating > 0 ||
      filters.lessonTypes.length > 0 ||
      filters.dvsaOnly
  );

  const clearAll = () =>
    onChange({
      location: "",
      locationCoords: undefined,
      locationRadiusMiles: 10,
      transmission: "all",
      minPrice: 20,
      maxPrice: 80,
      minRating: 0,
      lessonTypes: [],
      dvsaOnly: false,
      sortBy: filters.sortBy,
    });

  const contentProps: FiltersContentProps = { filters, update, toggleLessonType, hasActiveFilters, clearAll };

  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden flex items-center justify-between mb-4">
        <p className="text-sm text-slate-400">
          Showing <span className="text-white font-medium">{resultCount}</span> of {totalCount} instructors
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls={mobileDrawerId}
        >
          <SlidersHorizontal size={14} aria-hidden="true" />
          Filters
          {hasActiveFilters && (
            <span className="w-4 h-4 rounded-full bg-blue-500 text-[10px] text-white flex items-center justify-center" aria-hidden="true">
              !
            </span>
          )}
        </Button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div id={mobileDrawerId} className="lg:hidden mb-6 rounded-xl border border-white/8 bg-[#0f1117] p-5">
          <FiltersContent {...contentProps} />
        </div>
      )}

      {/* Desktop sidebar */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 rounded-xl border border-white/8 bg-[#0f1117] p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-white">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearAll}
                className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <FiltersContent {...contentProps} />
        </div>
      </div>
    </>
  );
}
