import type { Metadata } from "next"

import { site } from "@/data/site"
import { AboutPageContent } from "@/components/pages/about-page-content"
import { createMetadata } from "@/lib/seo"

export const metadata: Metadata = createMetadata({
  title: "À propos",
  description:
    "Découvrez la mission, la vision et l’équipe de DWE Creation, studio produit premium basé à Tunis.",
})

export default function AboutPage() {
  return <AboutPageContent name={site.name} />
}
