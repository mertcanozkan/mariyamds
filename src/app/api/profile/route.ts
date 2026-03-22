import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true, name: true, email: true, image: true,
      title: true, postcode: true, phone: true, bio: true,
      adiNumber: true, experience: true, transmission: true,
      pricePerHour: true, coverageRadius: true,
      specialisms: true, languages: true,
      vehicleMake: true, vehicleModel: true,
      vehicleYear: true, vehicleFuelType: true, vehicleTransmission: true,
    },
  });

  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorised" }, { status: 401 });

  const body = await req.json();
  const {
    name, title, phone, bio, postcode,
    adiNumber, experience, transmission,
    pricePerHour, coverageRadius, specialisms, languages,
    vehicleMake, vehicleModel, vehicleYear, vehicleFuelType, vehicleTransmission,
  } = body;

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      name:               name?.trim()               || undefined,
      title:              title?.trim()              || null,
      phone:              phone?.trim()              || null,
      bio:                bio?.trim()                || null,
      postcode:           postcode?.trim()           || null,
      adiNumber:          adiNumber?.trim()          || null,
      experience:         experience != null ? Number(experience) : undefined,
      transmission:       transmission               || undefined,
      pricePerHour:       pricePerHour != null ? Number(pricePerHour) : undefined,
      coverageRadius:     coverageRadius != null ? Number(coverageRadius) : undefined,
      specialisms:        specialisms               || null,
      languages:          languages                 || null,
      vehicleMake:        vehicleMake?.trim()        || null,
      vehicleModel:       vehicleModel?.trim()       || null,
      vehicleYear:        vehicleYear != null ? Number(vehicleYear) : null,
      vehicleFuelType:    vehicleFuelType?.trim()    || null,
      vehicleTransmission:vehicleTransmission?.trim()|| null,
    },
  });

  return NextResponse.json({ ok: true, name: updated.name, image: updated.image });
}
