"use client"

import Link from "next/link"

import { getCaseStudies } from "@/data/cases"
import { getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const copy = {
  fr: {
    heroBadge: "Solutions",
    heroTitle: "Des produits sur mesure qui livrent des résultats mesurables",
    heroIntro:
      "Nos équipes multidisciplinaires orchestrent chaque projet autour d’objectifs business précis, en combinant recherche utilisateur, excellence design et ingénierie fiable.",
    heroStats: [
      {
        title: "Adoption",
        description: "+85% d’utilisateurs actifs à J+30 sur nos lancements récents.",
      },
      {
        title: "ROI",
        description: "Retour sur investissement moyen constaté en 4 à 6 mois.",
      },
      {
        title: "Satisfaction",
        description: "Score NPS moyen de 58 sur les projets accompagnés.",
      },
    ],
    approachTitle: "Notre approche",
    approachPoints: [
      "Discovery et cadrage centrés utilisateurs",
      "Prototypage rapide pour valider les parcours critiques",
      "Delivery incrémental avec indicateurs suivis chaque sprint",
      "Run assisté et amélioration continue post-lancement",
    ],
    casesBadge: "Études de cas",
    casesTitle: "Trois projets pour des directions produit, opérations et finance",
    casesIntro:
      "Explorez les défis rencontrés, les solutions déployées et les indicateurs obtenus pour chaque organisation.",
    challenge: "Défi",
    solution: "Solution",
    results: "Résultats",
    readMore: "Lire le détail",
    closingBadge: "Envie d’aller plus loin ?",
    closingTitle: "Analysez votre situation avec un expert produit & tech",
    closingIntro:
      "Nous passons en revue vos parcours critiques, vos outils existants et vos objectifs pour vous proposer un plan d’action concret.",
    closingPrimary: "Écrire à l’équipe",
    auditTitle: "Livrables de l’audit flash",
    auditValue: "72 h",
    auditItems: [
      "Synthèse de vos irritants et opportunités clés",
      "Proposition d’architecture cible & quick wins",
      "Plan d’intervention et lotissement recommandé",
    ],
  },
  en: {
    heroBadge: "Solutions",
    heroTitle: "Tailor-made products that deliver measurable results",
    heroIntro:
      "Our multidisciplinary teams structure each project around precise business goals, mixing user research, design excellence and reliable engineering.",
    heroStats: [
      {
        title: "Adoption",
        description: "+85% active users at D+30 across recent launches.",
      },
      {
        title: "ROI",
        description: "Average return on investment achieved within 4 to 6 months.",
      },
      {
        title: "Satisfaction",
        description: "Average NPS score of 58 on supported projects.",
      },
    ],
    approachTitle: "Our approach",
    approachPoints: [
      "User-centred discovery and scoping",
      "Rapid prototyping to validate critical journeys",
      "Incremental delivery with tracked KPIs each sprint",
      "Assisted run and continuous improvement after launch",
    ],
    casesBadge: "Case studies",
    casesTitle: "Three projects for product, operations and finance leaders",
    casesIntro:
      "Discover the challenges, deployed solutions and resulting metrics for each organisation.",
    challenge: "Challenge",
    solution: "Solution",
    results: "Outcomes",
    readMore: "Read the story",
    closingBadge: "Want to go further?",
    closingTitle: "Review your situation with a product & tech expert",
    closingIntro:
      "We analyse your critical journeys, existing tools and objectives to propose a concrete action plan.",
    closingPrimary: "Write to the team",
    auditTitle: "Flash audit deliverables",
    auditValue: "72 h",
    auditItems: [
      "Summary of key pains and opportunities",
      "Target architecture proposal & quick wins",
      "Recommended plan and phasing",
    ],
  },
} as const

export function SolutionsPageContent() {
  const { locale } = useI18n()
  const labels = copy[locale]
  const site = getSite(locale)
  const caseStudies = getCaseStudies(locale)

  return (
    <main className="space-y-24 py-24">
      <section className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <Badge variant="accent" className="w-fit rounded-xl px-4 py-2 text-xs uppercase tracking-[0.3em]">
            {labels.heroBadge}
          </Badge>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {labels.heroTitle}
          </h1>
          <p className="text-lg text-muted-foreground">{labels.heroIntro}</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-7 py-6" asChild>
              <Link href={site.cta.primary.href}>{site.cta.primary.label}</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-7 py-6" asChild>
              <Link href="/contact">{locale === "fr" ? "Présenter un projet" : "Share your project"}</Link>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {labels.heroStats.map((stat) => (
              <div key={stat.title} className="rounded-3xl border border-border/60 bg-card/80 p-4 text-sm text-muted-foreground">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{stat.title}</p>
                <p className="mt-1 text-foreground">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[32px] border border-primary/20 bg-primary/10 p-8 text-primary">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{labels.approachTitle}</p>
          <ul className="mt-4 space-y-4 text-base font-medium">
            {labels.approachPoints.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/10 py-24">
        <div className="container space-y-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{labels.casesBadge}</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold">{labels.casesTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{labels.casesIntro}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {caseStudies.map((caseStudy) => (
              <Card key={caseStudy.slug} className="flex h-full flex-col">
                <CardHeader className="gap-4">
                  <Badge variant="outline" className="w-fit rounded-xl px-3 py-1 text-xs uppercase tracking-wide">
                    {caseStudy.sector}
                  </Badge>
                  <CardTitle className="text-2xl">{caseStudy.title}</CardTitle>
                  <CardDescription>{caseStudy.excerpt}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col gap-5">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">{labels.challenge}</p>
                    <p>{caseStudy.challenge}</p>
                  </div>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">{labels.solution}</p>
                    <p>{caseStudy.solution}</p>
                  </div>
                  <div className="grow space-y-2">
                    <p className="text-sm font-semibold text-foreground">{labels.results}</p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {caseStudy.results.map((result) => (
                        <li key={result} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {caseStudy.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-border/60 px-3 py-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="gap-2 px-0" asChild>
                    <Link href={`/cases/${caseStudy.slug}`}>{labels.readMore}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="rounded-[32px] border border-border/60 bg-card/80 p-10 shadow-lg shadow-primary/5">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{labels.closingBadge}</p>
              <h2 className="text-balance font-display text-3xl font-semibold sm:text-4xl">{labels.closingTitle}</h2>
              <p className="text-lg text-muted-foreground">{labels.closingIntro}</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full px-7 py-6" asChild>
                  <Link href={site.cta.secondary.href}>{site.cta.secondary.label}</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-7 py-6" asChild>
                  <Link href="mailto:talents@dwe-creation.com">{labels.closingPrimary}</Link>
                </Button>
              </div>
            </div>
            <div className="space-y-4 rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>{labels.auditTitle}</span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {labels.auditValue}
                </span>
              </div>
              <ul className="space-y-3">
                {labels.auditItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
