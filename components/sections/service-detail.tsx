"use client"

import Link from "next/link"
import { useI18n } from "@/lib/i18n"
import { getService, getServices } from "@/data/services"
import { getSite } from "@/data/site"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { buildBreadcrumbJsonLd } from "@/lib/seo"
import { notFound } from "next/navigation"
import Script from "next/script"
import { fadeInUp } from "@/lib/motion"
import { motion } from "framer-motion"

const copy = {
  fr: {
    results: "Resultats attendus",
    workTogether: "Travaillons ensemble",
    workIntro:
      "Detaillez votre contexte et vos objectifs. Nous preparons une proposition d'intervention en 72 heures.",
    kickOff: "Kick-off possible",
    within: "sous 7 jours",
    workshop: "1 atelier de cadrage (90 min) avec vos parties prenantes",
    diagnostic: "Diagnostic technique & fonctionnel remis sous 5 jours ouvres",
    backlog: "Backlog priorise et plan de delivery partages",
    deliverables: "Livrables detailles",
    deliverablesIntro:
      "Chaque livrable est documente et accompagne d'une session de transfert pour faciliter la prise en main par vos equipes internes.",
    stackTitle: "Expertise et savoir-faire",
    stackIntro:
      "Nous mobilisons les meilleures competences et methodologies pour accelerer votre reussite.",
    routeTitle: "Feuille de route type",
    routeIntro: "Une approche pragmatique en quatre phases pour securiser votre ROI.",
    phase: "Phase",
    related: "Autres services complementaires",
    relatedIntro: "Combinez plusieurs expertises pour couvrir vos besoins de bout en bout.",
    explore: "Explorer",
  },
  en: {
    results: "Expected outcomes",
    workTogether: "Work with us",
    workIntro:
      "Tell us about your context and goals. We prepare a delivery proposal within 72 hours.",
    kickOff: "Kick-off ready",
    within: "within 7 days",
    workshop: "One 90-minute workshop with your stakeholders",
    diagnostic: "Technical and functional assessment delivered within 5 business days",
    backlog: "Prioritised backlog and delivery plan shared",
    deliverables: "Detailed deliverables",
    deliverablesIntro:
      "Each deliverable is documented and paired with a handover session so your teams can move fast.",
    stackTitle: "Expertise & capabilities",
    stackIntro: "We bring together top talent and proven methodologies to accelerate your success.",
    routeTitle: "Typical delivery plan",
    routeIntro: "A pragmatic four-phase approach to secure your ROI.",
    phase: "Phase",
    related: "Complementary services",
    relatedIntro: "Combine expertise to cover end-to-end needs.",
    explore: "Explore",
  },
}

type ServiceDetailContentProps = {
  slug: string
}

export function ServiceDetailContent({ slug }: ServiceDetailContentProps) {
  const { locale } = useI18n()
  const service = getService(locale, slug)
  const site = getSite(locale)
  const labels = copy[locale]

  if (!service) {
    notFound()
  }

  const relatedEntries = ['developpement-applications', 'automatisation-processus', 'design-ux-ui', 'modernisation-refonte', 'maintenance-support']
    .filter((id) => id !== slug)
    .map((id) => getService(locale, id))
    .filter(Boolean)
    .slice(0, 2)

  const breadcrumb = buildBreadcrumbJsonLd([
    { name: site.name, url: site.url },
    { name: locale === 'fr' ? 'Services' : 'Services', url: `${site.url}/services` },
    { name: service.title, url: `${site.url}/services/${service.slug}` },
  ])

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Organization',
      name: site.name,
      url: site.url,
    },
    serviceType: service.title,
    areaServed: {
      '@type': 'Country',
      name: site.address.country,
    },
    offers: {
      '@type': 'Offer',
      url: `${site.url}/services/${service.slug}`,
      category: 'B2B Services',
      availability: 'https://schema.org/InStock',
    },
  }

  const phases = locale === 'fr'
    ? [
        'Cadrage & priorisation',
        'Design et prototypes testables',
        'Developpement incremental',
        'Recette, transfert et run assiste',
      ]
    : [
        'Scoping & prioritisation',
        'Design & testable prototypes',
        'Incremental development',
        'QA, handover & supported run',
      ]

  return (
    <div className="space-y-24 py-24">
      <Script
        id={`jsonld-service-${service.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <Script
        id={`jsonld-service-breadcrumb-${service.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

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
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    {labels.workshop}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    {labels.diagnostic}
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    {labels.backlog}
                  </li>
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
                <div key={deliverable} className="rounded-2xl border border-border/40 bg-background/80 px-4 py-3 text-sm text-foreground shadow-sm">
                  {deliverable}
                </div>
              ))}
            </div>
          </div>

          {service.stack.length > 0 ? (
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
          ) : null}
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

          {relatedEntries.length > 0 ? (
            <Card className="border-border/40 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">{labels.related}</CardTitle>
                <CardDescription>{labels.relatedIntro}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedEntries.map((relatedService) => (
                  <div key={relatedService!.slug} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{relatedService!.title}</p>
                      <p className="text-sm text-muted-foreground">{relatedService!.description}</p>
                    </div>
                    <Button variant="ghost" className="px-0" asChild>
                      <Link href={`/services/${relatedService!.slug}`}>{labels.explore}</Link>
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
