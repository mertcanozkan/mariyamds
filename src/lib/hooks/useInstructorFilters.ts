"use client";

import { useMemo } from "react";
import { Instructor, FilterState } from "../types";
import { haversineDistanceMiles } from "../utils/haversine";

export function useInstructorFilters(
  instructors: Instructor[],
  filters: FilterState
) {
  return useMemo(() => {
    let result = [...instructors];

    // ── Location ─────────────────────────────────────────────────────────────
    if (filters.locationCoords) {
      // Postcode resolved: show instructors whose coverage area overlaps the
      // searched location, i.e. the instructor's home postcode is within
      // (search radius + instructor's own coverage radius) of the search point.
      const [sLat, sLng] = filters.locationCoords;
      result = result.filter((i) => {
        const [iLat, iLng] = i.location.coordinates;
        const dist = haversineDistanceMiles([sLat, sLng], [iLat, iLng]);
        return dist <= filters.locationRadiusMiles + i.location.coverageRadius;
      });
    } else if (filters.location.trim()) {
      // Fallback: plain text match against city or postcode
      const query = filters.location.toLowerCase();
      result = result.filter(
        (i) =>
          i.location.city.toLowerCase().includes(query) ||
          i.location.postcode.toLowerCase().includes(query)
      );
    }

    // ── Transmission ─────────────────────────────────────────────────────────
    if (filters.transmission !== "all") {
      result = result.filter(
        (i) =>
          i.transmission === filters.transmission ||
          i.transmission === "both"
      );
    }

    // ── Price ────────────────────────────────────────────────────────────────
    result = result.filter(
      (i) =>
        i.pricePerHour / 100 >= filters.minPrice &&
        i.pricePerHour / 100 <= filters.maxPrice
    );

    // ── Rating ───────────────────────────────────────────────────────────────
    if (filters.minRating > 0) {
      result = result.filter((i) => i.rating >= filters.minRating);
    }

    // ── DVSA ─────────────────────────────────────────────────────────────────
    if (filters.dvsaOnly) {
      result = result.filter((i) => i.dvsaApproved);
    }

    // ── Lesson types ─────────────────────────────────────────────────────────
    if (filters.lessonTypes.length > 0) {
      result = result.filter((i) =>
        filters.lessonTypes.some((lt) =>
          i.specialisms.some((s) =>
            s.toLowerCase().includes(lt.replace("-", " "))
          )
        )
      );
    }

    // ── Sort ─────────────────────────────────────────────────────────────────
    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "price-asc":
        result.sort((a, b) => a.pricePerHour - b.pricePerHour);
        break;
      case "price-desc":
        result.sort((a, b) => b.pricePerHour - a.pricePerHour);
        break;
      case "reviews":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [instructors, filters]);
}
