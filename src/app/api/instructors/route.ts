import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import type { Instructor, Transmission } from "@/lib/types";

async function resolvePostcode(postcode: string): Promise<{ city: string; coordinates: [number, number] } | null> {
  try {
    const res = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`,
      { next: { revalidate: 86400 } } // cache for 24h
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      city: data.result?.admin_district ?? data.result?.region ?? "UK",
      coordinates: [data.result.latitude, data.result.longitude],
    };
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      where: { role: "instructor" },
      select: {
        id: true, name: true, image: true, postcode: true,
        adiNumber: true, experience: true, transmission: true,
        bio: true, phone: true, pricePerHour: true,
        coverageRadius: true, specialisms: true, languages: true,
        vehicleMake: true, vehicleModel: true,
        vehicleYear: true, vehicleFuelType: true, vehicleTransmission: true,
        createdAt: true,
      },
    });

    const instructors: Instructor[] = await Promise.all(
      users.map(async (u) => {
        const location = u.postcode ? await resolvePostcode(u.postcode) : null;
        const name = u.name ?? "Instructor";
        const slug = name.toLowerCase().replace(/\s+/g, "-") + "-" + u.id.slice(-6);
        const transmission = (u.vehicleTransmission ?? u.transmission ?? "manual") as Transmission;

        return {
          id: u.id,
          slug,
          name,
          avatar: u.image ?? "/images/default-avatar.png",
          location: {
            city: location?.city ?? "UK",
            postcode: u.postcode ?? "",
            coverageRadius: 5,
            coordinates: location?.coordinates ?? [51.505, -0.09],
          },
          adiNumber: u.adiNumber ?? "",
          dvsaApproved: !!u.adiNumber,
          transmission,
          pricePerHour: u.pricePerHour ?? 3800,
          packages: [
            { id: "std-10", name: "10 Hour Block", hours: 10, priceInPence: Math.round((u.pricePerHour ?? 3800) * 9.5), popular: true },
            { id: "std-20", name: "20 Hour Block", hours: 20, priceInPence: Math.round((u.pricePerHour ?? 3800) * 18) },
          ],
          rating: 0,
          reviewCount: 0,
          lessonsGiven: 0,
          passRate: 0,
          experience: u.experience ?? 0,
          bio: u.bio ?? "",
          specialisms: u.specialisms ? u.specialisms.split(",").map((s) => s.trim()).filter(Boolean) : ["Standard lessons"],
          vehicle: {
            make: u.vehicleMake ?? "TBC",
            model: u.vehicleModel ?? "TBC",
            year: u.vehicleYear ?? new Date().getFullYear(),
            color: "TBC",
          },
          languages: u.languages ? u.languages.split(",").map((l) => l.trim()).filter(Boolean) : ["English"],
          availability: {
            monday: [], tuesday: [], wednesday: [], thursday: [],
            friday: [], saturday: [], sunday: [],
          },
          badges: ["new-instructor"],
          featured: false,
        } satisfies Instructor;
      })
    );

    return NextResponse.json(instructors);
  } catch (err) {
    console.error("[GET /api/instructors]", err);
    return NextResponse.json([], { status: 500 });
  }
}
