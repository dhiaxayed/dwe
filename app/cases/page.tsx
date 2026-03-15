import type { Metadata } from "next"

import { createMetadata } from "@/lib/seo"
import { CaseStudiesSection } from "@/components/sections/case-studies-section"
import { CtaSection } from "@/components/sections/cta-section"

export const metadata: Metadata = createMetadata({
  title: "Cas clients",
  description:
    "Découvrez comment nous avons accompagné des entreprises ambitieuses avec des solutions digitales à fort impact et des résultats mesurables.",
  openGraph: {
    title: "Cas clients — DWE Creation",
    description:
      "Des réussites concrètes qui prouvent notre capacité à accélérer la croissance de nos clients.",
  },
})

export default function CasesIndexPage() {
  return (
    <div className="space-y-28 py-28">
      <CaseStudiesSection />
      <CtaSection />
    </div>
  )
}
