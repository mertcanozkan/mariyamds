import { NextRequest, NextResponse } from "next/server";

// Proxy for postcodes.io single lookup — no API key required
// GET /api/postcode?q=SW1A1AA
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim().replace(/\s+/g, "");

  if (!q) {
    return NextResponse.json({ error: "q parameter required" }, { status: 400 });
  }

  try {
    const res = await fetch(`https://api.postcodes.io/postcodes/${encodeURIComponent(q)}`, {
      next: { revalidate: 86400 }, // cache for 24h — postcodes rarely change
    });

    if (res.status === 404) {
      return NextResponse.json({ error: "Postcode not found" }, { status: 404 });
    }

    const data = await res.json();

    if (data.status !== 200 || !data.result) {
      return NextResponse.json({ error: "Invalid postcode" }, { status: 400 });
    }

    return NextResponse.json({
      postcode: data.result.postcode as string,
      lat: data.result.latitude as number,
      lng: data.result.longitude as number,
      district: (data.result.admin_district ?? data.result.parliamentary_constituency ?? "") as string,
      region: (data.result.region ?? "") as string,
    });
  } catch {
    return NextResponse.json({ error: "Lookup failed" }, { status: 502 });
  }
}
