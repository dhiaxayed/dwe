"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

import { InteractiveSpotlight } from "@/components/common/interactive-spotlight"
import { TiltCard } from "@/components/common/tilt-card"
import { getCaseStudies } from "@/data/cases"
import { getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import { floatPulse, perspectiveReveal, riseReveal, staggerChildren } from "@/lib/motion"
import { usePrefersMotion } from "@/lib/use-prefers-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Localised strings for the storytelling around each success story.
const copy = {
  fr: {
    badge: "Cas clients",
    title: "Des ROI documentes, rapides",
    subtitle: "Retail, industrie, finance : chaque mission suit des KPIs des la discovery.",
    cardResults: "Resultats cles",
    cardObjectives: "Objectifs servis",
    ctaLead: "Mission pilote possible en 3 semaines avec reporting integre.",
    ctaPrimary: "Lancer un projet pilote",
    ctaSecondary: "Voir toutes les reussites",
    viewProject: "Voir le projet",
  },
  en: {
    badge: "Case studies",
    title: "Documented ROI, fast",
    subtitle: "Retail, industry and finance teams tracked with KPIs from day one.",
    cardResults: "Key outcomes",
    cardObjectives: "Objectives served",
    ctaLead: "Pilot engagement ready within 3 weeks with built-in reporting.",
    ctaPrimary: "Start a pilot project",
    ctaSecondary: "Browse all stories",
    viewProject: "View project",
  },
}

// Showcases three highlighted missions plus an invite to explore all case studies.
export function CaseStudiesSection() {
  const prefersMotion = usePrefersMotion()
  // Everything below adapts to the selected language and data sets.
  const { locale } = useI18n()
  const labels = copy[locale]
  const caseStudies = getCaseStudies(locale)
  const site = getSite(locale)

  const sectionInitial = prefersMotion ? "hidden" : undefined
  const sectionAnimate = prefersMotion ? "visible" : undefined
  // Reduced motion visitors still get static content.

  return (
    // Section is composed of header copy, animated cards, and a CTA banner.
    <section id="solutions" className="relative border-y border-border/30 bg-muted/20 py-28">
      {prefersMotion && (
        <>
          {/* Animated halo reinforces the premium feel without blocking interactions. */}
          <motion.div
          aria-hidden
          variants={floatPulse}
          initial="initial"
          animate="animate"
          className="pointer-events-none absolute inset-x-0 top-16 mx-auto h-64 w-64 rounded-full bg-highlight/15 blur-3xl"
          />
        </>
      )}
      <div className="container relative space-y-14">
        <motion.div
          // Heading stack introduces the case study proof points.
          initial={sectionInitial}
          whileInView={sectionAnimate}
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerChildren(0.12, 0.12)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={riseReveal} className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground">
            {labels.badge}
          </motion.p>
          <motion.h2 variants={perspectiveReveal} style={{ transformPerspective: 900 }} className="mt-3 text-balance font-display text-4xl font-semibold">
            {labels.title}
          </motion.h2>
          <motion.p variants={riseReveal} className="mt-4 text-lg text-muted-foreground">
            {labels.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-8 lg:grid-cols-3"
          // Each case tilts and fades in as it becomes visible.
          initial={sectionInitial}
          whileInView={sectionAnimate}
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren(0.12, 0.1)}
        >
          {caseStudies.map((caseStudy) => (
            <TiltCard
              key={caseStudy.slug}
              intensity={12}
              className="h-full rounded-[30px]"
              initial={prefersMotion ? { opacity: 0, y: 32, rotateX: -4 } : undefined}
              whileInView={prefersMotion ? { opacity: 1, y: 0, rotateX: 0 } : undefined}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <CaseStudyCard caseStudy={caseStudy} labels={labels} prefersMotion={prefersMotion} />
            </TiltCard>
          ))}
        </motion.div>

        <InteractiveSpotlight className="rounded-3xl border border-border/40 bg-card/85 p-8 md:flex md:items-center md:justify-between md:gap-8">
          {/* Closing banner nudges visitors toward a pilot project. */}
          <div className="max-w-xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.badge}</p>
            <p className="text-lg text-foreground">{labels.ctaLead}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Button size="lg" className="rounded-full px-7" asChild>
              <Link href={site.cta.primary.href}>
                {labels.ctaPrimary}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-7" asChild>
              <Link href="/cases">{labels.ctaSecondary}</Link>
            </Button>
          </div>
        </InteractiveSpotlight>
      </div>
    </section>
  )
}

type CaseStudyCardProps = {
  caseStudy: ReturnType<typeof getCaseStudies>[number]
  labels: typeof copy["fr"]
  prefersMotion: boolean
}

// Renders the inner card displayed inside the tilt wrapper above.
function CaseStudyCard({ caseStudy, labels, prefersMotion }: CaseStudyCardProps) {
  return (
    <InteractiveSpotlight className="flex h-full flex-col justify-between rounded-[30px] border border-border/40 bg-card/85 p-6">
      {/* Spotlight keeps card responsive and highlights hover states. */}
      <div className="space-y-5">
        {/* Badge row shows the client sector and engagement type. */}
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
            {caseStudy.sector}
          </Badge>
          <Badge variant="muted" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
            {caseStudy.tags[0]}
          </Badge>
        </div>
        <div className="space-y-2">
          {/* Title plus excerpt summarise the business challenge. */}
          <p className="text-2xl font-semibold leading-tight text-foreground">{caseStudy.title}</p>
          <p className="text-sm text-muted-foreground line-clamp-3">{caseStudy.excerpt}</p>
        </div>
      </div>
      <div className="mt-6 space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {/* KPI cards surface two measurable wins. */}
          {caseStudy.kpis.slice(0, 2).map((kpi) => (
            <motion.div
              key={kpi.label}
              className="rounded-2xl border border-primary/25 bg-primary/10 p-4 text-center text-sm text-primary"
              whileHover={prefersMotion ? { scale: 1.04, y: -2 } : undefined}
              transition={{ type: "spring", stiffness: 280, damping: 22 }}
            >
              <p className="text-[11px] uppercase tracking-[0.3em] text-primary/80">{kpi.label}</p>
              <p className="mt-1 text-lg font-semibold">{kpi.value}</p>
            </motion.div>
          ))}
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          {/* Result bullets capture tangible impact in plain language. */}
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.cardResults}</p>
          <ul className="grid gap-2">
            {caseStudy.results.slice(0, 3).map((result) => (
              <li key={result} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 text-xs text-muted-foreground">
          {/* Objective chips show which goals the mission delivered on. */}
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.cardObjectives}</p>
          <div className="flex flex-wrap gap-2">
            {caseStudy.objectives.slice(0, 3).map((objective) => (
              <motion.span
                key={objective}
                className="rounded-full bg-highlight/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-highlight-foreground"
                whileHover={prefersMotion ? { y: -2 } : undefined}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                {objective}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-border/40 pt-4">
        {/* Footer lists tech stack and links to the full case details. */}
        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {caseStudy.stack.slice(0, 4).map((tech) => (
            <span key={tech} className="rounded-full border border-border/30 px-3 py-1">
              {tech}
            </span>
          ))}
        </div>
        <Button variant="ghost" className="gap-2 px-0" asChild>
          <Link href={`/cases/${caseStudy.slug}`}>
            {labels.viewProject}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </InteractiveSpotlight>
  )
}
