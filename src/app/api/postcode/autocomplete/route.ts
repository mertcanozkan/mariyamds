import { NextRequest, NextResponse } from "next/server";

// Proxy for postcodes.io partial/autocomplete lookup — no API key required
// GET /api/postcode/autocomplete?q=SW1A
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    const res = await fetch(
      `https://api.postcodes.io/postcodes?query=${encodeURIComponent(q)}&limit=100`,
      { next: { revalidate: 3600 } }
    );

    const data = await res.json();

    if (data.status !== 200 || !Array.isArray(data.result)) {
      return NextResponse.json({ results: [] });
    }

    const results: string[] = data.result.map(
      (item: { postcode: string }) => item.postcode
    );

    return NextResponse.json({ results });
  } catch {
    return NextResponse.json({ results: [] });
  }
}
