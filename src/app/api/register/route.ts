import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, title, firstName, lastName,
      email, password, role, postcode,
      transmission, adiNumber, experience,
      vehicleMake, vehicleModel, vehicleYear, vehicleFuelType, vehicleTransmission,
    } = body;

    // Resolve display name — prefer explicit first+last, fall back to combined name
    const resolvedName = (firstName && lastName)
      ? `${firstName.trim()} ${lastName.trim()}`
      : name?.trim();

    if (!resolvedName || !email?.trim() || !password || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!["student", "instructor"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: resolvedName,
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        role,
        title: title?.trim() || null,
        postcode: postcode?.trim() || null,
        transmission: role === "student" ? (transmission ?? "manual") : null,
        adiNumber: role === "instructor" ? (adiNumber?.trim() || null) : null,
        experience: role === "instructor" && experience ? parseInt(experience) : null,
        vehicleMake: role === "instructor" ? (vehicleMake?.trim() || null) : null,
        vehicleModel: role === "instructor" ? (vehicleModel?.trim() || null) : null,
        vehicleYear: role === "instructor" && vehicleYear ? parseInt(vehicleYear) : null,
        vehicleFuelType: role === "instructor" ? (vehicleFuelType?.trim() || null) : null,
        vehicleTransmission: role === "instructor" ? (vehicleTransmission?.trim() || null) : null,
      },
    });

    return NextResponse.json(
      { id: user.id, email: user.email, role: user.role },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[POST /api/register]", err);
    return NextResponse.json(
      { error: "Internal server error", detail: message },
      { status: 500 }
    );
  }
}
