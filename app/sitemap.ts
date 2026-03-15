import type { MetadataRoute } from "next"

import { site } from "@/data/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = [
    "",
    "/about",
    "/services",
    "/solutions",
    "/process",
    "/equipe",
    "/cases",
    "/contact",
  ]

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }))
}
