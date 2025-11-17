"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Filter } from "lucide-react"

import { InteractiveSpotlight } from "@/components/common/interactive-spotlight"
import { TiltCard } from "@/components/common/tilt-card"
import { getServices, type ServiceImpact } from "@/data/services"
import { useI18n } from "@/lib/i18n"
import { perspectiveReveal, riseReveal, staggerChildren } from "@/lib/motion"
import { usePrefersMotion } from "@/lib/use-prefers-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Translated labels so the section stays aligned with the chosen locale.
const copy = {
  fr: {
    label: "Services",
    title: "Des offres pretes a delivrer",
    intro: "Ingenierie, design et run alignes sur vos KPI prioritaires.",
    filterAll: "Tous les impacts",
    filterHint: "Filtrer par impact",
    viewImpact: "Impact",
    viewChrono: "Chronologie",
    viewStack: "Stack",
    results: "Gains cles",
    deliverables: "Livrables cles",
    modules: "Modules phares",
    stack: "Stack",
    explore: "Explorer le detail",
  },
  en: {
    label: "Services",
    title: "Offers built to launch fast",
    intro: "Engineering, design and run aligned with your top KPIs.",
    filterAll: "All impacts",
    filterHint: "Filter by impact",
    viewImpact: "Impact",
    viewChrono: "Timeline",
    viewStack: "Stack",
    results: "Key outcomes",
    deliverables: "Key deliverables",
    modules: "Hero modules",
    stack: "Stack",
    explore: "View details",
  },
}

// Map impact enums to human friendly chips in both languages.
const impactLabels: Record<ServiceImpact, { fr: string; en: string }> = {
  efficiency: { fr: "Efficacite", en: "Efficiency" },
  experience: { fr: "Experience", en: "Experience" },
  scale: { fr: "Scalabilite", en: "Scalability" },
}

// Lists core service offers with filters for impact, timeline and stack depth.
export function ServicesSection() {
  const prefersMotion = usePrefersMotion()
  // Locale driven hooks feed both the copy and the dataset we render.
  const { locale } = useI18n()
  const labels = copy[locale]
  const services = getServices(locale)
  // These toggles power the pills above the grid.
  const [impact, setImpact] = useState<ServiceImpact | "all">("all")
  const [view, setView] = useState<"impact" | "chrono" | "stack">("impact")

  // Recompute the grid whenever the user filters by impact or view mode.
  const filteredServices = useMemo(() => {
    const base = impact === "all" ? services : services.filter((service) => service.impact === impact)
    if (view === "chrono") {
      return [...base].sort((a, b) => a.duration.localeCompare(b.duration))
    }
    if (view === "stack") {
      return [...base].sort((a, b) => a.stack.length - b.stack.length)
    }
    return base
  }, [impact, services, view])

  const getImpactLabel = (value: ServiceImpact) => impactLabels[value][locale]

  const sectionInitial = prefersMotion ? "hidden" : undefined
  const sectionAnimate = prefersMotion ? "visible" : undefined
  // Variants are disabled when the visitor prefers reduced motion.

  return (
    // Section layout: intro copy, filters, then animated service cards.
    <section id="services" className="border-y border-border/30 bg-background py-28">
      <div className="container space-y-12">
        <motion.div
          // Intro headline explains the value proposition before the cards.
          initial={sectionInitial}
          whileInView={sectionAnimate}
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren(0.12, 0.12)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={riseReveal} className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground">
            {labels.label}
          </motion.p>
          <motion.h2 variants={perspectiveReveal} style={{ transformPerspective: 900 }} className="mt-3 text-balance font-display text-4xl font-semibold">
            {labels.title}
          </motion.h2>
          <motion.p variants={riseReveal} className="mt-4 text-lg text-muted-foreground">
            {labels.intro}
          </motion.p>
        </motion.div>

        <InteractiveSpotlight
          // Control bar groups filters and view toggles for quick exploration.
          className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-border/40 bg-card/80 p-4">
          <div className="flex flex-wrap items-center gap-2">
            {/* View toggles rearrange the grid to answer different questions. */}
            {/* Impact filters highlight the outcomes clients care about. */}
            <Badge variant="outline" className="rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.3em]">
              <Filter className="mr-2 h-3.5 w-3.5" /> {labels.filterHint}
            </Badge>
            <Button
              variant={impact === "all" ? "primary" : "soft"}
              size="sm"
              className="rounded-full px-4"
              onClick={() => setImpact("all")}
            >
              {labels.filterAll}
            </Button>
            {(Object.keys(impactLabels) as ServiceImpact[]).map((key) => (
              <Button
                key={key}
                variant={impact === key ? "primary" : "soft"}
                size="sm"
                className="rounded-full px-4"
                onClick={() => setImpact(key)}
              >
                {getImpactLabel(key)}
              </Button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: "impact", label: labels.viewImpact },
              { key: "chrono", label: labels.viewChrono },
              { key: "stack", label: labels.viewStack },
            ].map((option) => (
              <Button
                key={option.key}
                variant={view === option.key ? "dark" : "ghost"}
                size="sm"
                className="rounded-full px-4"
                onClick={() => setView(option.key as typeof view)}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </InteractiveSpotlight>

        <motion.div
          className="grid gap-8 lg:grid-cols-2"
          // Cards animate in as the section enters the viewport.
          initial={sectionInitial}
          whileInView={sectionAnimate}
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren(0.12, 0.1)}
        >
          <AnimatePresence mode="popLayout">
            {/* AnimatePresence keeps transitions smooth when filters change. */}
            {filteredServices.map((service) => (
              <TiltCard
                key={service.slug}
                layout
                layoutId={`service-${service.slug}`}
                intensity={10}
                glare={false}
                initial={prefersMotion ? { opacity: 0, y: 32, rotateX: -4 } : undefined}
                animate={prefersMotion ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
                exit={prefersMotion ? { opacity: 0, y: 32, scale: 0.94 } : undefined}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-[30px]"
              >
                <Card className="flex h-full flex-col rounded-[30px] border border-border/40 bg-card/85">
                  {/* Card structure mirrors our discovery template: category, outcomes, deliverables. */}
                  <CardHeader className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
                        {service.category}
                      </Badge>
                      <Badge variant="muted" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
                        {service.duration}
                      </Badge>
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription className="line-clamp-3">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col gap-6">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.results}</p>
                      <ul className="grid gap-2 text-sm text-muted-foreground">
                        {service.highlights.slice(0, 3).map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.deliverables}</p>
                      <ul className="grid gap-2 text-sm">
                        {service.deliverables.slice(0, 3).map((deliverable) => (
                          <li key={deliverable} className="rounded-2xl border border-border/40 bg-background/70 px-3 py-2 text-muted-foreground">
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.modules}</p>
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {service.modules.slice(0, 3).map((module) => (
                          <span key={module} className="rounded-full border border-border/40 px-3 py-1">
                            {module}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-auto flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      {service.stack.slice(0, 5).map((tech) => (
                        <span key={tech} className="rounded-full border border-border/40 px-3 py-1">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
                      {getImpactLabel(service.impact)}
                    </Badge>
                    <Button variant="ghost" className="gap-2 px-0" asChild>
                      <Link href={`/services/${service.slug}`}>
                        {labels.explore}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </TiltCard>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
