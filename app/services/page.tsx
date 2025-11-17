import type { Metadata } from "next"

import { createMetadata } from "@/lib/seo"
import { ServicesSection } from "@/components/sections/services-section"
import { CtaSection } from "@/components/sections/cta-section"

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Des solutions sur mesure pour cadrer, designer, developper et operer vos outils digitaux.",
  openGraph: {
    title: "Services - DWE Creation",
    description:
      "Une equipe hybride pour construire vos produits digitaux, automatiser vos processus et securiser le run.",
  },
})

export default function ServicesPage() {
  return (
    <main className="space-y-28 py-28">
      <ServicesSection />
      <CtaSection />
    </main>
  )
}
