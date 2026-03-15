"use client"

import Link from "next/link"
import { notFound } from "next/navigation"

import { getCaseStudies, getCaseStudy } from "@/data/cases"
import { getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const copy = {
  fr: {
    challengeTitle: "Defi initial",
    challengeDesc: "Les irritants et objectifs exprimes par les equipes.",
    solutionTitle: "Solution deployee",
    solutionDesc: "Architecture, parcours et automatisations mises en place.",
    resultsTitle: "Resultats obtenus",
    techTitle: "Technologies mobilisees",
    replayTitle: "Reproduire un succes similaire",
    replayDesc: "Partagez vos enjeux. Nous evaluons ensemble la transposabilite de ce cas a votre organisation.",
    replayBullets: [
      "Audit flash de vos outils actuels et des flux de donnees",
      "Projection des gains envisageables et estimation budgetaire",
      "Proposition d'un plan de delivery adapte",
    ],
    schedule: "Planifier un echange",
    otherCasesTitle: "Autres projets marquants",
    otherCasesDesc: "Decouvrez des cas complementaires menes par DWE Creation.",
    see: "Voir",
  },
  en: {
    challengeTitle: "Initial challenge",
    challengeDesc: "Pain points and goals expressed by the teams.",
    solutionTitle: "Delivered solution",
    solutionDesc: "Architecture, journeys and automations implemented.",
    resultsTitle: "Results achieved",
    techTitle: "Technologies used",
    replayTitle: "Replicate a similar success",
    replayDesc: "Share your challenges. We assess how this case can be adapted to your organization.",
    replayBullets: [
      "Rapid audit of your current tools and data flows",
      "Projection of potential gains and budget estimate",
      "A delivery plan tailored to your context",
    ],
    schedule: "Schedule a call",
    otherCasesTitle: "Other standout projects",
    otherCasesDesc: "Discover complementary cases delivered by DWE Creation.",
    see: "View",
  },
} as const

export function CaseStudyDetailContent({ slug }: { slug: string }) {
  const { locale } = useI18n()
  const labels = copy[locale]
  const site = getSite(locale)
  const caseStudy = getCaseStudy(locale, slug)

  if (!caseStudy) {
    notFound()
  }

  const otherCases = getCaseStudies(locale).filter((item) => item.slug !== caseStudy.slug).slice(0, 2)

  return (
    <div className="space-y-24 py-24">
      <section className="border-b border-border/60 bg-background py-24">
        <div className="container space-y-10">
          <div className="space-y-6">
            <Badge variant="accent" className="w-fit rounded-xl px-4 py-2 text-xs uppercase tracking-[0.3em]">
              {caseStudy.sector}
            </Badge>
            <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {caseStudy.title}
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground">{caseStudy.excerpt}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {caseStudy.kpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-3xl border border-border/60 bg-card/80 p-5 text-center"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{kpi.label}</p>
                <p className="mt-3 text-3xl font-semibold text-primary">{kpi.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-10">
          <Card className="border-border/60 bg-card/80">
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg">{labels.challengeTitle}</CardTitle>
              <CardDescription>{labels.challengeDesc}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{caseStudy.challenge}</CardContent>
          </Card>

          <Card className="border-border/60 bg-card/80">
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg">{labels.solutionTitle}</CardTitle>
              <CardDescription>{labels.solutionDesc}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{caseStudy.solution}</CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{labels.resultsTitle}</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {caseStudy.results.map((result) => (
                <li key={result} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>

          {caseStudy.stack.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">{labels.techTitle}</h2>
              <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                {caseStudy.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-border/60 px-3 py-1">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <Card className="border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="text-lg">{labels.replayTitle}</CardTitle>
              <CardDescription>{labels.replayDesc}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <ul className="space-y-3">
                {labels.replayBullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Button className="rounded-full px-6 py-5" asChild>
                <Link href={site.cta.primary.href}>{site.cta.primary.label}</Link>
              </Button>
              <Button variant="outline" className="rounded-full px-6 py-5" asChild>
                <Link href="/contact">{labels.schedule}</Link>
              </Button>
            </CardFooter>
          </Card>

          {otherCases.length > 0 ? (
            <Card className="border-border/60 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">{labels.otherCasesTitle}</CardTitle>
                <CardDescription>{labels.otherCasesDesc}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {otherCases.map((other) => (
                  <div key={other.slug} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{other.title}</p>
                      <p className="text-sm text-muted-foreground">{other.excerpt}</p>
                    </div>
                    <Button variant="ghost" className="px-0" asChild>
                      <Link href={`/cases/${other.slug}`}>{labels.see}</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </section>
    </div>
  )
}
