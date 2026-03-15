"use client"

import { useEffect, useMemo } from "react"
import { ArrowRight, FileText, Mail, Sparkles } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"

import { getCaseStudies } from "@/data/cases"
import { getNavigation, getSite } from "@/data/site"
import { getServices } from "@/data/services"
import { useI18n } from "@/lib/i18n"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

const copy = {
  fr: {
    placeholder: "Rechercher une page, un service ou taper une action...",
    empty: "Aucun resultat. Essayez un autre terme.",
    navigation: "Navigation",
    services: "Services",
    cases: "Cas clients",
    actions: "Actions",
    quote: "Contact",
  },
  en: {
    placeholder: "Search a page, a service or trigger an action...",
    empty: "No results. Try another keyword.",
    navigation: "Navigation",
    services: "Services",
    cases: "Case studies",
    actions: "Actions",
    quote: "Contact",
  },
}

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const router = useRouter()
  const pathname = usePathname()
  const { locale } = useI18n()
  const labels = copy[locale]
  const site = getSite(locale)
  const navigation = getNavigation(locale)

  const primaryLinks = useMemo(
    () => [
      { label: locale === "fr" ? "Accueil" : "Home", href: "/" },
      ...navigation.main,
      { label: locale === "fr" ? "Contact" : "Contact", href: site.cta.primary.href },
    ],
    [locale, navigation.main, site.cta.primary.href]
  )

  const serviceLinks = useMemo(
    () =>
      getServices(locale).map((service) => ({
        label: service.title,
        description: service.description,
        href: `/services/${service.slug}`,
      })),
    [locale]
  )

  const caseLinks = useMemo(
    () =>
      getCaseStudies(locale).map((cs) => ({
        label: cs.title,
        description: cs.excerpt,
        href: `/cases/${cs.slug}`,
      })),
    [locale]
  )

  useEffect(() => {
    const down = (event: KeyboardEvent) => {
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !event.metaKey && !event.ctrlKey)) {
        event.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onOpenChange, open])

  useEffect(() => {
    if (!open) return
    onOpenChange(false)
  }, [onOpenChange, open, pathname])

  const handleSelect = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command>
        <CommandInput placeholder={labels.placeholder} />
        <CommandList>
          <CommandEmpty>{labels.empty}</CommandEmpty>
          <CommandGroup heading={labels.navigation}>
            {primaryLinks.map((item) => (
              <CommandItem key={item.href} onSelect={() => handleSelect(item.href)}>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <span>{item.label}</span>
                <CommandShortcut>{item.href}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={labels.services}>
            {serviceLinks.map((item) => (
              <CommandItem key={item.href} onSelect={() => handleSelect(item.href)}>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={labels.cases}>
            {caseLinks.map((item) => (
              <CommandItem key={item.href} onSelect={() => handleSelect(item.href)}>
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={labels.actions}>
            <CommandItem onSelect={() => handleSelect(site.cta.primary.href)}>
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{labels.quote}</span>
              <CommandShortcut>{locale === "fr" ? "Contact" : "Contact"}</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
