import type { MetadataRoute } from "next";

const base = "https://limomint.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/fleet", "/services", "/faq", "/reservations", "/contact"];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
  }));
}