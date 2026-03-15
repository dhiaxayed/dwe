import type { Metadata } from "next"

import { createMetadata } from "@/lib/seo"
import { SolutionsPageContent } from "@/components/pages/solutions-page-content"

export const metadata: Metadata = createMetadata({
  title: "Solutions",
  description:
    "Decouvrez comment nous transformons les defis business en avantages competitifs avec des solutions digitales a fort impact.",
  openGraph: {
    title: "Solutions — DWE Creation",
    description:
      "Des reussites concretes qui prouvent notre capacite a accelerer la croissance de nos clients.",
  },
})

export default function SolutionsPage() {
  return <SolutionsPageContent />
}
