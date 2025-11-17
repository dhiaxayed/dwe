import type { Metadata } from "next"

import { createMetadata } from "@/lib/seo"
import { ProcessPageContent } from "@/components/pages/process-page-content"

export const metadata: Metadata = createMetadata({
  title: "Process",
  description:
    "Une méthode claire en six étapes pour aligner vos parties prenantes, livrer vite et sécuriser le run.",
  openGraph: {
    title: "Process — DWE Creation",
    description:
      "Découvrez notre approche structurée : discovery, design, développement, QA et accompagnement run.",
  },
})

export default function ProcessPage() {
  return <ProcessPageContent />
}
