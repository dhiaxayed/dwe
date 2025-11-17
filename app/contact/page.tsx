import type { Metadata } from "next"

import { createMetadata } from "@/lib/seo"
import { ContactPageContent } from "@/components/pages/contact-page-content"

export const metadata: Metadata = createMetadata({
  title: "Contact",
  description:
    "Parlez-nous de vos enjeux digitaux : nous revenons vers vous sous 24h ouvrées avec un premier échange.",
  openGraph: {
    title: "Contact — DWE Creation",
    description:
      "Programmez un échange avec un expert DWE Creation pour cadrer votre projet et obtenir un plan d'action.",
  },
})

export default function ContactPage() {
  return <ContactPageContent />
}
