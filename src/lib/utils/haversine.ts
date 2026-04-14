const EARTH_RADIUS_MILES = 3958.8;

/**
 * Calculate the great-circle distance in miles between two lat/lng points
 * using the Haversine formula.
 */
export function haversineDistanceMiles(
  [lat1, lon1]: [number, number],
  [lat2, lon2]: [number, number]
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  return EARTH_RADIUS_MILES * 2 * Math.asin(Math.sqrt(a));
}
