"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

import { getNavigation, getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"

const copy = {
  fr: {
    contact: "Contact",
    office: "Bureau",
    rights: (name: string) => `\u00A9 ${new Date().getFullYear()} ${name}. Tous droits reserves.`,
  },
  en: {
    contact: "Contact",
    office: "Office",
    rights: (name: string) => `\u00A9 ${new Date().getFullYear()} ${name}. All rights reserved.`,
  },
}

export function SiteFooter() {
  const { locale } = useI18n()
  const labels = copy[locale]
  const site = getSite(locale)
  const navigation = getNavigation(locale)

  return (
    <footer className="border-t border-border/30 bg-background/90">
      <div className="container grid gap-10 py-16 md:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="space-y-2">
            <Image
              src="/dwe-logo-transparent.png"
              alt={`${site.name} logo`}
              width={160}
              height={48}
              className="h-9 w-auto transition dark:invert dark:brightness-110"
            />
            <p className="text-sm text-muted-foreground">{site.description}</p>
          </div>
          <div className="grid gap-4 text-sm text-muted-foreground md:grid-cols-2">
            <div className="space-y-1">
              <p className="font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.contact}</p>
              <Link
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 text-foreground transition hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {site.email}
              </Link>
              <p>{site.phone}</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.office}</p>
              <p>{site.address.city}</p>
              <p>{site.address.country}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SocialButton href={site.socials.linkedin} label="LinkedIn">
              <Linkedin className="h-4 w-4" />
            </SocialButton>
            <SocialButton href={site.socials.github} label="GitHub">
              <Github className="h-4 w-4" />
            </SocialButton>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 text-sm text-muted-foreground">
          <nav className="flex flex-wrap gap-3">
            {navigation.footer.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-border/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] transition hover:border-primary/60 hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{labels.rights(site.name)}</p>
        </div>
      </div>
    </footer>
  )
}

type SocialButtonProps = {
  href?: string
  label: string
  children: React.ReactNode
}

function SocialButton({ href, label, children }: SocialButtonProps) {
  if (!href) return null
  return (
    <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" asChild>
      <Link href={href} target="_blank" rel="noreferrer" aria-label={label}>
        {children}
      </Link>
    </Button>
  )
}
