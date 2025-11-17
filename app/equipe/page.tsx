import type { Metadata } from "next"

import { createMetadata } from "@/lib/seo"
import { TeamPageContent } from "@/components/pages/team-page-content"

export const metadata: Metadata = createMetadata({
  title: "Équipe",
  description:
    "Une équipe hybride mêlant ingénieurs seniors, designers et talents en devenir pour propulser vos projets digitaux.",
  openGraph: {
    title: "Équipe — DWE Creation",
    description:
      "Découvrez les expertises de l’équipe DWE Creation et la culture qui guide nos collaborations.",
  },
})

export default function TeamPage() {
  return <TeamPageContent />
}
