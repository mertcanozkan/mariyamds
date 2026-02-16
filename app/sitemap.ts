import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";

const routes = ["", "/about", "/lessons-courses", "/pricing", "/testimonials", "/contact", "/privacy-policy", "/terms-conditions"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8
  }));
}
