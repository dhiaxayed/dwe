"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Clock, Phone } from "lucide-react"

import { InteractiveSpotlight } from "@/components/common/interactive-spotlight"
import { TiltCard } from "@/components/common/tilt-card"
import { getSite } from "@/data/site"
import type { SiteContent } from "@/data/site"
import { getServices } from "@/data/services"
import { useI18n } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import { floatPulse, perspectiveReveal, riseReveal, staggerChildren } from "@/lib/motion"
import { usePrefersMotion } from "@/lib/use-prefers-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Each preset describes a business focus so the hero can surface relevant services.

type SectorPreset = {
  id: string
  label: string
  description: string
  recommended: string[]
  metric: string
}

// Locale keyed presets feed the configurator buttons in the hero.
const sectorPresets: Record<Locale, SectorPreset[]> = {
  fr: [
    {
      id: "product",
      label: "Direction produit",
      description: "Priorisez les parcours critiques et livrez des increments tangibles toutes les 3 semaines.",
      recommended: ["developpement-applications", "design-ux-ui", "modernisation-refonte"],
      metric: "+30% time-to-market",
    },
    {
      id: "operations",
      label: "Operations",
      description: "Automatisez les workflows manuels et pilotez vos KPIs en temps reel.",
      recommended: ["automatisation-processus", "maintenance-support", "modernisation-refonte"],
      metric: "-45% temps de traitement",
    },
    {
      id: "direction",
      label: "Direction digitale",
      description: "Industrialisez votre roadmap digitale avec une equipe hybride senior.",
      recommended: ["developpement-applications", "maintenance-support", "design-ux-ui"],
      metric: "ROI constate en 4 mois",
    },
  ],
  en: [
    {
      id: "product",
      label: "Product leadership",
      description: "Prioritise critical journeys and ship tangible increments every three weeks.",
      recommended: ["developpement-applications", "design-ux-ui", "modernisation-refonte"],
      metric: "+30% time-to-market",
    },
    {
      id: "operations",
      label: "Operations",
      description: "Automate manual workflows and monitor your KPIs in real time.",
      recommended: ["automatisation-processus", "maintenance-support", "modernisation-refonte"],
      metric: "-45% processing time",
    },
    {
      id: "direction",
      label: "Digital leadership",
      description: "Industrialise your digital roadmap with a hybrid senior team.",
      recommended: ["developpement-applications", "maintenance-support", "design-ux-ui"],
      metric: "ROI observed in 4 months",
    },
  ],
}

// Dedicated copy per locale keeps the hero marketing message bilingual.
const copy = {
  fr: {
    badge: "Expertises",
    ctaSecondary: "Parler a un expert",
    modulesTitle: "Focus secteur",
    marketingLead: "Squad senior, sprints de 3 semaines, impact chiffre d'affaires mesurable.",
    availability: (year: number) => `Ouvert aux nouveaux projets ${year} - demarrage sous 7 jours`,
    atelierTitle: "Atelier 90 minutes",
    tagline: "Engineered in Tunisia",
    cardHeadline: "Un plan produit clair en moins de 10 jours.",
    cardBody: "Audit express, feuilles de route actionnables et delivery continue sans friction.",
    cardItems: [
      "Diagnostic 360",
      "Roadmap priorisee",
      "Transition Run",
    ],
    stackFocus: "Stack cle",
  },
  en: {
    badge: "Expertise",
    ctaSecondary: "Talk to an expert",
    modulesTitle: "Sector focus",
    marketingLead: "Senior squad, 3-week sprints, measurable revenue impact.",
    availability: (year: number) => `Open for new projects ${year} - kick-off within 7 days`,
    atelierTitle: "90-minute workshop",
    tagline: "Engineered in Tunisia",
    cardHeadline: "A clear product plan in under 10 days.",
    cardBody: "Fast audit, actionable roadmap and frictionless delivery.",
    cardItems: [
      "360 assessment",
      "Prioritised roadmap",
      "Run transition",
    ],
    stackFocus: "Stack focus",
  },
}

// Main entry point for the landing hero with product narrative and configurator.
export function HeroSection() {
  const prefersMotion = usePrefersMotion()
  // All data hooks are locale aware so the section reacts to language toggles.
  const { locale } = useI18n()
  const site = getSite(locale)
  const labels = copy[locale]
  const services = getServices(locale)
  const presets = sectorPresets[locale]
  const [selectedSector, setSelectedSector] = useState<SectorPreset>(presets[0])

  // Pre-compute the two services highlighted for the selected preset.
  const recommendedServices = useMemo(
    () =>
      selectedSector.recommended
        .map((slug) => services.find((service) => service.slug === slug))
        .filter(Boolean)
        .slice(0, 2),
    [selectedSector.recommended, services]
  )

  const heroInitial = prefersMotion ? "hidden" : undefined
  const heroAnimate = prefersMotion ? "visible" : undefined
  // Using conditional variants means we avoid animating for users who disable motion.

  return (
    // The hero is split into copy on the left and an interactive plan preview on the right.
    <section className="relative overflow-hidden pb-32 pt-40">
      <HeroBackground prefersMotion={prefersMotion} />
      <div className="container grid gap-18 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
        // Introductory badges and headline cascade in with staged motion.
          initial={heroInitial}
          animate={heroAnimate}
          variants={staggerChildren(0.12, 0.14)}
          className="space-y-8"
        >
          <motion.div variants={perspectiveReveal} className="flex flex-wrap items-center gap-3" style={{ transformPerspective: 900 }}>
            <Badge variant="signal" className="rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.3em]">
              {site.tagline}
            </Badge>
            <Badge variant="outline" className="rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.3em]">
              {site.stack.slice(0, 3).join(" - ")}
            </Badge>
          </motion.div>
          <motion.h1
            variants={perspectiveReveal}
            style={{ transformPerspective: 900, transformOrigin: "left center" }}
            className="text-balance font-display text-4xl leading-tight tracking-tight text-foreground sm:text-5xl lg:text-[3.4rem]"
          >
            {site.hero.title}
          </motion.h1>
          <motion.p variants={riseReveal} className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            {site.hero.subtitle}
          </motion.p>
          <motion.div variants={riseReveal} className="rounded-3xl border border-border/40 bg-card/80 p-4 text-sm text-muted-foreground">
            {/* Quick credibility line that explains the engagement model. */}
            {labels.marketingLead}
          </motion.div>
          <motion.div variants={perspectiveReveal} className="flex flex-wrap items-center gap-4" style={{ transformPerspective: 900 }}>
            {/* Primary and secondary calls to action stay side-by-side on desktop. */}
            <Button size="lg" variant="primary" className="rounded-full px-8" asChild>
              <Link href={site.cta.primary.href}>
                {site.cta.primary.label}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-dashed px-8" asChild>
              <Link href={site.cta.secondary.href}>
                <Phone className="mr-2 h-4 w-4" />
                {labels.ctaSecondary}
              </Link>
            </Button>
          </motion.div>
          <motion.div variants={staggerChildren(0.05, 0.08)} className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {/* Tech stack chips double as social proof for tooling expertise. */}
            {site.stack.slice(0, 6).map((tech) => (
              <motion.span
                key={tech}
                variants={riseReveal}
                className="rounded-full border border-border/40 px-4 py-2 font-semibold uppercase tracking-[0.3em]"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
          <motion.div variants={riseReveal} className="rounded-3xl border border-border/40 bg-card/70 p-6 shadow-soft">
            {/* Mini configurator lets prospects map our services to their context. */}
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.modulesTitle}</p>
            <HeroConfigurator
              presets={presets}
              selected={selectedSector.id}
              onSelect={(id) => setSelectedSector(presets.find((preset) => preset.id === id) ?? presets[0])}
            />
            <div className="mt-4 grid gap-3">
              {recommendedServices.map((service) => (
                <motion.div
                  key={service!.slug}
                  className="flex items-start justify-between gap-4 rounded-2xl border border-border/40 bg-background/70 px-4 py-3 text-sm"
                  whileHover={prefersMotion ? { y: -4, scale: 1.01 } : undefined}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                >
                  <div>
                    <p className="font-semibold text-foreground">{service!.title}</p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{service!.description}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-full px-4" asChild>
                    <Link href={`/services/${service!.slug}`}>{locale === "fr" ? "Explorer" : "Discover"}</Link>
                  </Button>
                </motion.div>
              ))}
              <p className="flex items-center gap-2 text-xs font-medium text-highlight-foreground">
                <Clock className="h-3.5 w-3.5" />
                {selectedSector.metric}
              </p>
            </div>
          </motion.div>
        </motion.div>
        <HeroVisualization prefersMotion={prefersMotion} labels={labels} site={site} />
      </div>
    </section>
  )
}

type HeroConfiguratorProps = {
  presets: SectorPreset[]
  selected: string
  onSelect: (id: string) => void
}

// Renders the preset pills and simply echoes the parent callback.
function HeroConfigurator({ presets, selected, onSelect }: HeroConfiguratorProps) {
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {presets.map((preset) => (
        <Button
          key={preset.id}
          variant={preset.id === selected ? "primary" : "soft"}
          size="sm"
          className="rounded-full px-4"
          onClick={() => onSelect(preset.id)}
        >
          {preset.label}
        </Button>
      ))}
    </div>
  )
}

type HeroVisualizationProps = {
  prefersMotion: boolean
  labels: typeof copy["fr"]
  site: SiteContent
}

// Visual card on the right mirrors the messaging and adds motion flourishes.
function HeroVisualization({ prefersMotion, labels, site }: HeroVisualizationProps) {
  return (
    <TiltCard
      intensity={14}
      glare
      className="relative rounded-[38px]"
      initial={prefersMotion ? { opacity: 0, y: 24, rotateX: -6 } : undefined}
      whileInView={prefersMotion ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <InteractiveSpotlight className="grain-overlay border border-border/40 bg-card/80 p-10 shadow-elevated">
        <div className="relative space-y-6">
          {prefersMotion && (
            <>
              {/* Floating blobs animate only when motion is allowed. */}
              <motion.div
                variants={floatPulse}
                initial="initial"
                animate="animate"
                className="absolute -top-24 right-12 h-44 w-44 rounded-full bg-highlight/25 blur-3xl"
              />
              <motion.div
                variants={floatPulse}
                initial="initial"
                animate="animate"
                className="absolute -bottom-32 left-0 h-48 w-48 rounded-full bg-primary/25 blur-3xl"
              />
            </>
          )}
          <div className="relative space-y-6">
            <div className="space-y-2">
              {/* Hero card summarises the promise and key deliverables. */}
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground">{labels.tagline}</p>
              <p className="font-display text-2xl text-foreground">{labels.cardHeadline}</p>
              <p className="text-sm text-muted-foreground">{labels.cardBody}</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Each item highlights what the team delivers during the first sprint. */}
              {labels.cardItems.map((item) => (
                <motion.div
                  key={item}
                  className="rounded-2xl border border-border/40 bg-background/70 px-4 py-3 text-sm font-medium text-foreground shadow-soft"
                  whileHover={prefersMotion ? { scale: 1.02, y: -2 } : undefined}
                  transition={{ type: "spring", stiffness: 280, damping: 22 }}
                >
                  {item}
                </motion.div>
              ))}
            </div>
            <div className="rounded-3xl border border-dashed border-primary/50 bg-primary/10 p-4 text-sm text-primary">
              {/* Availability reminder creates urgency for booking the squad. */}
              {labels.availability(new Date().getFullYear())}
            </div>
            <div className="grid gap-2 text-xs text-muted-foreground">
              {/* Stack chips reinforce engineering credibility. */}
              <p className="font-semibold uppercase tracking-[0.3em]">{labels.stackFocus}</p>
              <div className="flex flex-wrap gap-2">
                {site.stack.slice(0, 6).map((tech) => (
                  <span key={tech} className="rounded-full border border-border/40 px-3 py-1">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </InteractiveSpotlight>
    </TiltCard>
  )
}

type HeroBackgroundProps = {
  prefersMotion: boolean
}

// Soft gradient background reinforces depth without distracting from the content.
function HeroBackground({ prefersMotion }: HeroBackgroundProps) {
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      // Pulsing gradients subtly move behind the hero to keep the above-fold lively.
      initial={prefersMotion ? { opacity: 0 } : { opacity: 1 }}
      animate={prefersMotion ? { opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        variants={floatPulse}
        initial={prefersMotion ? "initial" : undefined}
        animate={prefersMotion ? "animate" : undefined}
        className="absolute -top-40 left-1/3 h-80 w-80 rounded-full bg-primary/20 blur-3xl"
      />
      <motion.div
        variants={floatPulse}
        initial={prefersMotion ? "initial" : undefined}
        animate={prefersMotion ? "animate" : undefined}
        className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-highlight/20 blur-3xl"
      />
      <div className="absolute inset-0 bg-gradient-noise opacity-60" />
      <div className="absolute inset-0 backdrop-blur-[1px]" />
    </motion.div>
  )
}
