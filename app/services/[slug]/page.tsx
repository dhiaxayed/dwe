import type { Metadata } from "next"
import Script from "next/script"
import { notFound } from "next/navigation"

import { getService, getServiceSlugs } from "@/data/services"
import { getSite } from "@/data/site"
import { buildBreadcrumbJsonLd, createMetadata } from "@/lib/seo"
import { ServiceDetailContent } from "@/components/pages/service-detail-content"

type ServicePageParams = {
  slug: string
}

type ServicePageProps = {
  params: Promise<ServicePageParams>
}

export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params
  const site = getSite("fr")
  const service = getService("fr", slug)

  if (!service) {
    return createMetadata({
      title: "Service introuvable",
      description: "Le service que vous recherchez n'existe pas ou plus.",
    })
  }

  const url = `${site.url}/services/${service.slug}`

  return createMetadata({
    title: service.title,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      url,
    },
    alternates: {
      canonical: url,
    },
  })
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params
  const site = getSite("fr")
  const service = getService("fr", slug)

  if (!service) {
    notFound()
  }

  const pageUrl = `${site.url}/services/${service.slug}`
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: site.name, url: site.url },
    { name: "Services", url: `${site.url}/services` },
    { name: service.title, url: pageUrl },
  ])

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    serviceType: service.title,
    areaServed: {
      "@type": "Country",
      name: site.address.country,
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      category: "B2B Services",
      availability: "https://schema.org/InStock",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} - Livrables` as const,
      itemListElement: service.deliverables.map((deliverable, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: deliverable,
        },
      })),
    },
  }

  return (
    <>
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServiceDetailContent slug={service.slug} />
    </>
  )
}
