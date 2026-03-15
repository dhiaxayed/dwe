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
    heroTitle: "Transformez vos défis en avantages compétitifs",
    heroIntro:
      "Chaque projet est une opportunité de croissance. Nous créons des solutions digitales sur mesure qui génèrent des résultats concrets pour votre entreprise.",
    heroStats: [
      {
        title: "Adoption",
        description: "+85% d'utilisateurs actifs dès le premier mois après le lancement.",
      },
      {
        title: "ROI",
        description: "Retour sur investissement moyen constaté en 4 à 6 mois.",
      },
      {
        title: "Satisfaction",
        description: "Score NPS de 58 — nos clients nous recommandent.",
      },
    ],
    approachTitle: "Pourquoi nous choisir",
    approachPoints: [
      "Compréhension approfondie de vos enjeux business",
      "Validation rapide pour réduire les risques et accélérer le lancement",
      "Résultats mesurables à chaque étape du projet",
      "Accompagnement continu pour maximiser l'impact après le lancement",
    ],
    casesBadge: "Nos réussites",
    casesTitle: "Des entreprises qui ont accéléré leur croissance avec nous",
    casesIntro:
      "Découvrez comment nous avons aidé des organisations ambitieuses à se transformer et à obtenir des résultats exceptionnels.",
    challenge: "Défi business",
    solution: "Notre réponse",
    results: "Impact mesuré",
    readMore: "Découvrir l'histoire",
    closingBadge: "Prêt à passer à l'action ?",
    closingTitle: "Échangeons sur votre prochain défi de croissance",
    closingIntro:
      "En 72 heures, nous analysons votre situation et vous proposons un plan d'action concret pour atteindre vos objectifs.",
    closingPrimary: "Parlons de votre projet",
    auditTitle: "Ce que vous recevez en 72h",
    auditValue: "72 h",
    auditItems: [
      "Diagnostic de vos leviers de croissance clés",
      "Recommandations stratégiques et quick wins immédiats",
      "Plan d'action personnalisé avec ROI estimé",
    ],
  },
  en: {
    heroBadge: "Solutions",
    heroTitle: "Turn your challenges into competitive advantages",
    heroIntro:
      "Every project is a growth opportunity. We build tailor-made digital solutions that deliver concrete results for your business.",
    heroStats: [
      {
        title: "Adoption",
        description: "+85% active users within the first month after launch.",
      },
      {
        title: "ROI",
        description: "Average return on investment achieved within 4 to 6 months.",
      },
      {
        title: "Satisfaction",
        description: "NPS score of 58 — our clients recommend us.",
      },
    ],
    approachTitle: "Why choose us",
    approachPoints: [
      "Deep understanding of your business challenges",
      "Rapid validation to reduce risk and accelerate launch",
      "Measurable results at every project milestone",
      "Ongoing support to maximize impact after launch",
    ],
    casesBadge: "Success stories",
    casesTitle: "Companies that accelerated growth with us",
    casesIntro:
      "See how we helped ambitious organizations transform and achieve exceptional results.",
    challenge: "Business challenge",
    solution: "Our response",
    results: "Measured impact",
    readMore: "Read the story",
    closingBadge: "Ready to take action?",
    closingTitle: "Let's discuss your next growth challenge",
    closingIntro:
      "Within 72 hours, we analyze your situation and propose a concrete action plan to reach your goals.",
    closingPrimary: "Let's talk about your project",
    auditTitle: "What you get in 72h",
    auditValue: "72 h",
    auditItems: [
      "Assessment of your key growth levers",
      "Strategic recommendations and immediate quick wins",
      "Personalized action plan with estimated ROI",
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
                  <Link href={`mailto:${site.email}`}>{labels.closingPrimary}</Link>
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
