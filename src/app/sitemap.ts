import type { MetadataRoute } from "next";
import { prisma } from "@/lib/db";

const BASE = "https://mcodev.co.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/instructors`, lastModified: new Date(), changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/courses`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/login`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE}/register`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.4 },
  ];

  let instructorPages: MetadataRoute.Sitemap = [];
  try {
    const instructors = await prisma.user.findMany({
      where: { role: "instructor" },
      select: { id: true, name: true, updatedAt: true },
    });
    instructorPages = instructors.map((u) => {
      const slug =
        (u.name ?? "instructor").toLowerCase().replace(/\s+/g, "-") +
        "-" +
        u.id.slice(-6);
      return {
        url: `${BASE}/instructors/${slug}`,
        lastModified: u.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });
  } catch {
    // DB not available at build time — omit dynamic pages
  }

  return [...staticPages, ...instructorPages];
}