"use client"

import Link from "next/link"

import { CaseStudiesSection } from "@/components/sections/case-studies-section"
import { ValuesSection } from "@/components/sections/values-section"
import { useI18n } from "@/lib/i18n"

const copy = {
  fr: {
    heroBadge: "À propos",
    heroIntro:
      "Nous réunissons stratégie, design, développement et amélioration continue pour concevoir des outils métiers digitaux qui délivrent un impact mesurable.",
    cards: [
      {
        title: "Positionnement",
        description:
          "Studio premium mêlant expertise d’ingénieurs seniors et énergie d’étudiants à fort potentiel.",
      },
      {
        title: "Engagement",
        description: "KPI suivis, rituels hebdomadaires, transparence totale sur l’avancée et la roadmap.",
      },
    ],
    motivationsTitle: "Ce qui nous anime",
    motivations: [
      "Des produits qui répondent vraiment aux irritants métier",
      "Une exigence design pour élever les standards des interfaces B2B",
      "L’automatisation au service des équipes, pas l’inverse",
      "Le partage de connaissance et la montée en compétences continue",
    ],
    ctaBadge: "Envie d’échanger ?",
    ctaTitle: "Programmez un échange avec un expert",
    ctaDescription: "Partagez vos enjeux et obtenez une recommandation concrète sous 72 heures.",
    ctaButton: "Parler à un expert →",
  },
  en: {
    heroBadge: "About",
    heroIntro:
      "We blend strategy, design, engineering and continuous improvement to craft digital tools that deliver measurable impact.",
    cards: [
      {
        title: "Positioning",
        description:
          "A premium studio combining senior engineering leadership with the energy of high-potential juniors.",
      },
      {
        title: "Commitment",
        description: "Tracked KPIs, weekly rituals and full transparency on roadmap, risks and trade-offs.",
      },
    ],
    motivationsTitle: "What drives us",
    motivations: [
      "Products that truly resolve business pains",
      "Design excellence to raise the bar for B2B interfaces",
      "Automation that empowers teams instead of replacing them",
      "Knowledge sharing and constant skill growth",
    ],
    ctaBadge: "Ready to talk?",
    ctaTitle: "Schedule a conversation with an expert",
    ctaDescription: "Share your challenges and receive a concrete recommendation within 72 hours.",
    ctaButton: "Talk with an expert →",
  },
} as const

export function AboutPageContent({ name }: { name: string }) {
  const { locale } = useI18n()
  const labels = copy[locale]

  return (
    <main className="space-y-24">
      <section className="border-b border-border/60 bg-background py-24">
        <div className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{labels.heroBadge}</p>
            <h1 className="text-balance font-display text-4xl font-semibold sm:text-5xl">
              {locale === "fr"
                ? `${name}, studio produit et tech pour organisations ambitieuses`
                : `${name}, product & tech studio for ambitious teams`}
            </h1>
            <p className="text-lg text-muted-foreground">{labels.heroIntro}</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {labels.cards.map((card) => (
                <div key={card.title} className="rounded-3xl border border-border/60 bg-card/80 p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{card.title}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{card.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[32px] border border-primary/20 bg-primary/10 p-10 text-primary">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">{labels.motivationsTitle}</p>
            <ul className="mt-4 space-y-4 text-base font-medium">
              {labels.motivations.map((motivation) => (
                <li key={motivation}>• {motivation}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <ValuesSection />
      </section>

      <section className="bg-background">
        <CaseStudiesSection />
      </section>

      <section className="bg-background py-24">
        <div className="container text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{labels.ctaBadge}</p>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold">{labels.ctaTitle}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{labels.ctaDescription}</p>
          <div className="mt-8 inline-flex rounded-full border border-primary/30 bg-primary/10 px-6 py-3 text-sm text-primary">
            <Link href="/contact" className="font-semibold">
              {labels.ctaButton}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
