import type { MetadataRoute } from "next";
import { projects, site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/solutions", "/work", "/research", "/about", "/contact", "/privacy", "/terms"];
  return [
    ...routes.map((r) => ({ url: `${site.url}${r}`, priority: r === "" ? 1 : 0.7 })),
    ...projects.map((p) => ({ url: `${site.url}/work/${p.slug}`, priority: 0.6 })),
  ];
}
