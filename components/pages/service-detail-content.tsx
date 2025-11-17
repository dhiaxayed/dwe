"use client"

import Link from "next/link"
import { useMemo } from "react"
import { notFound } from "next/navigation"

import { getService, getServices } from "@/data/services"
import { getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const copy = {
  fr: {
    results: "Résultats attendus",
    workTogether: "Travaillons ensemble",
    workIntro:
      "Détaillez votre contexte et vos objectifs. Nous préparons une proposition d’intervention en 72 heures.",
    kickOff: "Kick-off possible",
    within: "sous 7 jours",
    workshop: "1 atelier de cadrage (90 min) avec vos parties prenantes",
    diagnostic: "Diagnostic technique & fonctionnel remis sous 5 jours ouvrés",
    backlog: "Backlog priorisé et plan de delivery partagés",
    deliverables: "Livrables détaillés",
    deliverablesIntro:
      "Chaque livrable est documenté et accompagné d’une session de transfert pour faciliter la prise en main par vos équipes internes.",
    stackTitle: "Stack mobilisée",
    stackIntro: "Nous combinons technologies du marché et composants internes pour accélérer l’exécution.",
    routeTitle: "Feuille de route type",
    routeIntro: "Une approche pragmatique en quatre phases pour sécuriser votre ROI.",
    phase: "Phase",
    related: "Autres services complémentaires",
    relatedIntro: "Combinez plusieurs expertises pour couvrir vos besoins de bout en bout.",
    explore: "Explorer",
  },
  en: {
    results: "Expected outcomes",
    workTogether: "Work with us",
    workIntro:
      "Share your context and goals. We prepare a delivery proposal within 72 hours.",
    kickOff: "Kick-off ready",
    within: "within 7 days",
    workshop: "One 90-minute workshop with your stakeholders",
    diagnostic: "Technical & functional assessment delivered within 5 business days",
    backlog: "Prioritised backlog and delivery plan shared",
    deliverables: "Detailed deliverables",
    deliverablesIntro:
      "Each deliverable is documented and paired with a handover so your teams can move fast.",
    stackTitle: "Stack and tooling",
    stackIntro: "We blend proven technologies with internal components to accelerate execution.",
    routeTitle: "Typical delivery plan",
    routeIntro: "A pragmatic four-step approach to secure your ROI.",
    phase: "Phase",
    related: "Complementary services",
    relatedIntro: "Combine multiple expertises to cover end-to-end needs.",
    explore: "Explore",
  },
} as const

export function ServiceDetailContent({ slug }: { slug: string }) {
  const { locale } = useI18n()
  const service = getService(locale, slug)
  const site = getSite(locale)
  const labels = copy[locale]

  if (!service) {
    notFound()
  }

  const phases = useMemo(
    () =>
      locale === "fr"
        ? [
            "Cadrage & priorisation",
            "Design et prototypes testables",
            "Développement incrémental",
            "Recette, transfert et run assisté",
          ]
        : [
            "Scoping & prioritisation",
            "Design & testable prototypes",
            "Incremental development",
            "QA, handover & supported run",
          ],
    [locale]
  )

  const relatedServices = useMemo(
    () =>
      getServices(locale)
        .filter((entry) => entry.slug !== slug)
        .slice(0, 2),
    [locale, slug]
  )

  return (
    <div className="space-y-24 py-24">
      <section className="border-b border-border/40 bg-background py-24">
        <div className="container space-y-10">
          <div className="space-y-6">
            <Badge variant="accent" className="w-fit rounded-xl px-4 py-2 text-xs uppercase tracking-[0.3em]">
              {service.duration}
            </Badge>
            <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
              {service.title}
            </h1>
            <p className="max-w-3xl text-lg text-muted-foreground">{service.description}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <Card className="border-border/40 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">{labels.results}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 pt-0">
                {service.highlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-border/40 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">{labels.workTogether}</CardTitle>
                <CardDescription>{labels.workIntro}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-center justify-between rounded-2xl border border-dashed border-primary/40 bg-primary/10 px-4 py-3 text-primary">
                  <span>{labels.kickOff}</span>
                  <span className="text-sm font-semibold">{labels.within}</span>
                </div>
                <ul className="space-y-3">
                  {[labels.workshop, labels.diagnostic, labels.backlog].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex flex-wrap gap-3">
                <Button className="rounded-full px-6 py-5" asChild>
                  <Link href={site.cta.primary.href}>{site.cta.primary.label}</Link>
                </Button>
                <Button variant="outline" className="rounded-full px-6 py-5" asChild>
                  <Link href={site.cta.secondary.href}>{site.cta.secondary.label}</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      <section className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{labels.deliverables}</h2>
            <p className="text-sm text-muted-foreground">{labels.deliverablesIntro}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              {service.deliverables.map((deliverable) => (
                <div
                  key={deliverable}
                  className="rounded-2xl border border-border/40 bg-background/80 px-4 py-3 text-sm text-foreground shadow-sm"
                >
                  {deliverable}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{labels.stackTitle}</h2>
            <p className="text-sm text-muted-foreground">{labels.stackIntro}</p>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {service.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-border/40 px-3 py-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-border/40 bg-card/80">
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg">{labels.routeTitle}</CardTitle>
              <CardDescription>{labels.routeIntro}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              {phases.map((step, index) => (
                <div key={step} className="rounded-2xl border border-border/40 bg-background/70 px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">
                    {labels.phase} {index + 1}
                  </p>
                  <p className="mt-1 text-foreground">{step}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {relatedServices.length > 0 ? (
            <Card className="border-border/40 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">{labels.related}</CardTitle>
                <CardDescription>{labels.relatedIntro}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedServices.map((item) => (
                  <div key={item.slug} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Button variant="ghost" className="px-0" asChild>
                      <Link href={`/services/${item.slug}`}>{labels.explore}</Link>
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
