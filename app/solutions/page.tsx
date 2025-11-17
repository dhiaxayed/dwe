import type { Metadata } from "next"

import { createMetadata } from "@/lib/seo"
import { SolutionsPageContent } from "@/components/pages/solutions-page-content"

export const metadata: Metadata = createMetadata({
  title: "Solutions",
  description:
    "Trois études de cas illustrant notre approche produit, data et automatisation au service de la performance.",
  openGraph: {
    title: "Solutions — DWE Creation",
    description:
      "Découvrez comment DWE Creation conçoit et délivre des solutions digitales avec des résultats business tangibles.",
  },
})

export default function SolutionsPage() {
  return <SolutionsPageContent />
}
