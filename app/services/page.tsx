import type { Metadata } from "next"

import { createMetadata } from "@/lib/seo"
import { ServicesSection } from "@/components/sections/services-section"
import { CtaSection } from "@/components/sections/cta-section"

export const metadata: Metadata = createMetadata({
  title: "Services",
  description:
    "Des offres sur mesure pour transformer vos ambitions en avantages competitifs : innovation, croissance et performance.",
  openGraph: {
    title: "Services - DWE Creation",
    description:
      "Accelerez votre transformation digitale avec des solutions qui creent de la valeur business mesurable.",
  },
})

export default function ServicesPage() {
  return (
    <div className="space-y-28 py-28">
      <ServicesSection />
      <CtaSection />
    </div>
  )
}
