import type { Metadata } from "next"
import { site } from "@/data/site"

export type JsonLd = Record<string, unknown>

const defaultMetadata: Metadata = {
  title: {
    default: `${site.name} · ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
  description:
    "DWE Creation conçoit et déploie des solutions logicielles sur mesure pour accélérer la digitalisation des entreprises.",
  metadataBase: new URL(site.url),
  keywords: [
    "développement sur mesure",
    "digitalisation",
    "automatisation",
    "applications web",
    "DWE Creation",
  ],
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · ${site.tagline}`,
    description:
      "Accélérez votre transformation digitale avec une équipe d'ingénieurs et d'étudiants passionnés.",
    images: [
      {
        url: `${site.url}/dwe-logo.png`,
        width: 1200,
        height: 630,
        alt: `${site.name} - ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · ${site.tagline}`,
    description:
      "Solutions logicielles sur mesure pour les entreprises ambitieuses.",
    creator: site.socials.twitter ?? undefined,
    images: [`${site.url}/dwe-logo.png`],
  },
  alternates: {
    canonical: site.url,
  },
}

export function createMetadata(metadata: Metadata = {}): Metadata {
  return {
    ...defaultMetadata,
    ...metadata,
    title:
      typeof metadata.title === "string"
        ? {
            default: metadata.title,
            template: metadata.title.includes("%s") ? metadata.title : `%s · ${site.name}`,
          }
        : metadata.title ?? defaultMetadata.title,
    description: metadata.description ?? defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...metadata.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...metadata.twitter,
    },
  }
}

export function buildOrganizationJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    description: site.tagline,
    foundingDate: site.founded,
    email: `mailto:${site.email}`,
    telephone: site.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    sameAs: Object.values(site.socials).filter(Boolean),
    logo: `${site.url}/dwe-logo.png`,
  }
}

export function buildWebSiteJsonLd(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: site.url,
    name: site.name,
    alternateName: site.tagline,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}
