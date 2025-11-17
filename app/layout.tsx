import type { Metadata } from "next"
import Script from "next/script"
import { ReactNode } from "react"

import "./globals.css"

import { SiteFooter } from "@/components/common/site-footer"
import { SiteHeader } from "@/components/common/site-header"
import { AppProviders } from "@/components/common/app-providers"
import { buildOrganizationJsonLd, buildWebSiteJsonLd, createMetadata } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { display, mono, sans } from "@/lib/fonts"

const organizationJsonLd = buildOrganizationJsonLd()
const websiteJsonLd = buildWebSiteJsonLd()

export const metadata: Metadata = createMetadata()

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans antialiased", sans.variable, display.variable, mono.variable)}>
        <AppProviders>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
          >
            Passer au contenu
          </a>
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </div>
        </AppProviders>
        <Script
          id="jsonld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <Script
          id="jsonld-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </body>
    </html>
  )
}
