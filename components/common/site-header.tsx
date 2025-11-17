"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"

import { getNavigation, getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { CommandPalette } from "@/components/common/command-palette"
import { cn } from "@/lib/utils"

const copy = {
  fr: {
    languageToggle: "Passer en anglais",
    mobileCommand: "Palette de commande",
  },
  en: {
    languageToggle: "Switch to French",
    mobileCommand: "Command palette",
  },
}

export function SiteHeader() {
  const pathname = usePathname()
  const { locale, setLocale } = useI18n()
  const labels = copy[locale]
  const site = getSite(locale)
  const navigation = getNavigation(locale)
  const [commandOpen, setCommandOpen] = useState(false)
  const localeIndicator = locale === "fr" ? { code: "FR", flag: "FR" } : { code: "EN", flag: "EN" }
  const homeLabel = locale === "fr" ? "Retour a l'accueil" : "Back to homepage"

  const isActive = (href: string) => (href === "/" ? pathname === href : pathname.startsWith(href))

  const toggleLocale = () => setLocale(locale === "fr" ? "en" : "fr")

  return (
    <header className="sticky top-0 z-50 border-b border-border/30 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-20 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-2xl border border-border/40 bg-card/80 px-3 py-2 text-sm font-semibold text-foreground shadow-soft transition hover:border-primary/50 hover:shadow-elevated"
            aria-label={`${site.name} - ${homeLabel}`}
          >
            <Image
              src="/dwe-logo-transparent.png"
              alt={`${site.name} logo`}
              width={140}
              height={40}
              priority
              className="h-8 w-auto sm:h-9 transition dark:invert dark:brightness-110"
            />
            <div className="hidden flex-col leading-tight sm:flex">
              <span className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">{site.tagline}</span>
            </div>
          </Link>
          <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} />
          <div className="hidden lg:flex items-center gap-2">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.main.map((item) => (
                  <NavigationMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        navigationMenuTriggerStyle,
                        "px-4",
                        isActive(item.href) && "bg-muted/40 text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden items-center gap-2 rounded-full border border-border/50 bg-card/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-foreground transition hover:border-primary/60 hover:text-primary lg:inline-flex"
            onClick={toggleLocale}
          >
            <span aria-hidden className="text-base leading-none">
              {localeIndicator.flag}
            </span>
            <span aria-hidden>{localeIndicator.code}</span>
            <span className="sr-only">{labels.languageToggle}</span>
          </Button>
          <ThemeToggle />
          <Button variant="primary" size="sm" className="hidden lg:inline-flex rounded-full px-5" asChild>
            <Link href={site.cta.primary.href} className="flex items-center gap-2">
              {site.cta.primary.label}
            </Link>
          </Button>
          <div className="lg:hidden">
            <MobileMenu
              isActive={isActive}
              onSearch={() => setCommandOpen(true)}
              onToggleLocale={toggleLocale}
              localeLabel={labels.languageToggle}
              commandLabel={labels.mobileCommand}
              localeFlag={localeIndicator.flag}
              navigationItems={navigation.main}
              cta={site.cta.primary}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

function MobileMenu({
  isActive,
  onSearch,
  onToggleLocale,
  localeLabel,
  commandLabel,
  localeFlag,
  navigationItems,
  cta,
}: {
  isActive: (href: string) => boolean
  onSearch: () => void
  onToggleLocale: () => void
  localeLabel: string
  commandLabel: string
  localeFlag: string
  navigationItems: { label: string; href: string }[]
  cta: { label: string; href: string }
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Ouvrir le menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <DropdownMenuItem onSelect={onSearch} className="cursor-pointer">
          {commandLabel}
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onToggleLocale} className="cursor-pointer">
          <span className="mr-2" aria-hidden>
            {localeFlag}
          </span>
          {localeLabel}
        </DropdownMenuItem>
        {navigationItems.map((item) => (
          <DropdownMenuItem key={item.href} asChild>
            <Link
              href={item.href}
              className={cn(
                "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
                isActive(item.href) ? "bg-muted/60 text-foreground" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuItem asChild className="mt-2">
          <Link
            href={cta.href}
            className="flex w-full items-center justify-between rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {cta.label}
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
