import Link from "next/link"
import type { Metadata } from "next"
import Script from "next/script"
import { notFound } from "next/navigation"

import { caseStudies } from "@/data/cases"
import { site } from "@/data/site"
import { buildBreadcrumbJsonLd, createMetadata } from "@/lib/seo"
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

type CaseStudyPageParams = {
  slug: string
}

type CaseStudyPageProps = {
  params: Promise<CaseStudyPageParams>
}

export function generateStaticParams() {
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = caseStudies.find((item) => item.slug === slug)

  if (!caseStudy) {
    return createMetadata({
      title: "Cas client introuvable",
      description: "Le projet que vous recherchez n’est pas disponible.",
    })
  }

  const url = `${site.url}/cases/${caseStudy.slug}`

  return createMetadata({
    title: caseStudy.title,
    description: caseStudy.excerpt,
    openGraph: {
      title: caseStudy.title,
      description: caseStudy.excerpt,
      url,
    },
    alternates: {
      canonical: url,
    },
  })
}

export default async function CaseStudyDetailPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = caseStudies.find((item) => item.slug === slug)

  if (!caseStudy) {
    notFound()
  }

  const pageUrl = `${site.url}/cases/${caseStudy.slug}`
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: site.name, url: site.url },
    { name: "Solutions", url: `${site.url}/solutions` },
    { name: caseStudy.title, url: pageUrl },
  ])

  const caseStudyJsonLd = {
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    name: caseStudy.title,
    description: caseStudy.excerpt,
    industry: caseStudy.sector,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    outcome: caseStudy.results,
    audience: "B2B",
  }

  const otherCases = caseStudies.filter((item) => item.slug !== caseStudy.slug).slice(0, 2)

  return (
    <main className="space-y-24 py-24">
      <Script
        id={`jsonld-case-${caseStudy.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudyJsonLd) }}
      />
      <Script
        id={`jsonld-case-breadcrumb-${caseStudy.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

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
              <CardTitle className="text-lg">Défi initial</CardTitle>
              <CardDescription>Les irritants et objectifs exprimés par les équipes.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{caseStudy.challenge}</CardContent>
          </Card>

          <Card className="border-border/60 bg-card/80">
            <CardHeader className="space-y-2">
              <CardTitle className="text-lg">Solution déployée</CardTitle>
              <CardDescription>Architecture, parcours et automatisations mises en place.</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{caseStudy.solution}</CardContent>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Résultats obtenus</h2>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {caseStudy.results.map((result) => (
                <li key={result} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{result}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Technologies mobilisées</h2>
            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
              {caseStudy.stack.map((tech) => (
                <span key={tech} className="rounded-full border border-border/60 px-3 py-1">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="border-border/60 bg-card/80">
            <CardHeader>
              <CardTitle className="text-lg">Reproduire un succès similaire</CardTitle>
              <CardDescription>
                Partagez vos enjeux. Nous évaluons ensemble la transposabilité de ce cas à votre organisation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  Audit flash de vos outils actuels et des flux de données
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  Projection des gains envisageables et estimation budgétaire
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  Proposition d’un plan de delivery adapté
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-3">
              <Button className="rounded-full px-6 py-5" asChild>
                <Link href={site.cta.primary.href}>{site.cta.primary.label}</Link>
              </Button>
              <Button variant="outline" className="rounded-full px-6 py-5" asChild>
                <Link href="/contact">Planifier un échange</Link>
              </Button>
            </CardFooter>
          </Card>

          {otherCases.length > 0 ? (
            <Card className="border-border/60 bg-card/80">
              <CardHeader>
                <CardTitle className="text-lg">Autres projets marquants</CardTitle>
                <CardDescription>Découvrez des cas complémentaires menés par DWE Creation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {otherCases.map((other) => (
                  <div key={other.slug} className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-foreground">{other.title}</p>
                      <p className="text-sm text-muted-foreground">{other.excerpt}</p>
                    </div>
                    <Button variant="ghost" className="px-0" asChild>
                      <Link href={`/cases/${other.slug}`}>Voir</Link>
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          ) : null}
        </div>
      </section>
    </main>
  )
}
