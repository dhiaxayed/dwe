import type { Metadata } from "next"
import Script from "next/script"
import { notFound } from "next/navigation"

import { getCaseStudies, getCaseStudy, getCaseStudySlugs } from "@/data/cases"
import { getSite } from "@/data/site"
import { buildBreadcrumbJsonLd, createMetadata } from "@/lib/seo"
import { CaseStudyDetailContent } from "@/components/pages/case-study-detail-content"

type CaseStudyPageParams = {
  slug: string
}

type CaseStudyPageProps = {
  params: Promise<CaseStudyPageParams>
}

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const site = getSite("fr")
  const caseStudy = getCaseStudy("fr", slug)

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
  const site = getSite("fr")
  const caseStudy = getCaseStudy("fr", slug)

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

  return (
    <>
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
      <CaseStudyDetailContent slug={caseStudy.slug} />
    </>
  )
}
