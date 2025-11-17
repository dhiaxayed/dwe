"use client"

import { motion } from "framer-motion"

import { getProcessSteps } from "@/data/process"
import { useI18n } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/common/icon"
import { fadeIn, fadeInUp, staggerChildren } from "@/lib/motion"

// Static copy per locale that explains the delivery framework.
const copy = {
  fr: {
    badge: "Methodologie",
    title: "Un process agence pour maximiser l'impact a chaque iteration",
    intro:
      "Cercles d'alignement hebdomadaires, indicateurs partages et transfert de competences continue pour vos equipes.",
    stepsBadge: "Etapes cles",
    stepsTitle: "Un deroule en six phases pour cadrer, concevoir, developper et operer vos produits digitaux",
    stepsIntro:
      "Chaque etape s'appuie sur des artefacts concrets qui facilitent la prise de decision et l'alignement des equipes.",
    deliverablesLabel: "Livrables",
  },
  en: {
    badge: "Methodology",
    title: "A structured process to maximise impact at every iteration",
    intro:
      "Weekly alignment rituals, shared KPIs and continuous knowledge transfer for your teams.",
    stepsBadge: "Key stages",
    stepsTitle: "Six phases to frame, design, build and operate your digital products",
    stepsIntro:
      "Each step relies on tangible artefacts that accelerate decision-making and team alignment.",
    deliverablesLabel: "Deliverables",
  },
}

// Timeline view that walks prospects through our delivery rhythm.
export function ProcessSection() {
  const { locale } = useI18n()
  // Content changes with language so the narrative stays contextual.
  const labels = copy[locale]
  const steps = getProcessSteps(locale)
  // Steps come from structured data to keep copy maintainable.

  return (
    // Section includes a headline and a vertical roadmap with six entries.
    <section id="process" className="bg-background py-28">
      <div className="container space-y-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerChildren(0.12, 0.12)}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground">
            {/* Badge introduces the theme of the section. */}
            {labels.badge}
          </motion.p>
          <motion.h2 variants={fadeInUp} className="mt-3 text-balance font-display text-4xl font-semibold">
            {labels.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-muted-foreground">
            {/* Supporting paragraph positions the process as measurable. */}
            {labels.intro}
          </motion.p>
        </motion.div>

        <motion.ol
          // Ordered list renders the step-by-step delivery cadence.
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={staggerChildren(0.16, 0.14)}
          className="relative mx-auto max-w-4xl border-l border-border/40 pl-10"
        >
          <span className="absolute left-[-3px] top-0 h-full w-[6px] rounded-full bg-gradient-to-b from-primary/60 via-highlight/60 to-primary/10" />
          {steps.map((step, index) => (
            // Alternate fade directions to give the timeline more energy.
            <motion.li key={step.title} variants={fadeIn(index % 2 === 0 ? "left" : "right")}
              className="relative mb-12 last:mb-0"
            >
              <div className="absolute -left-[29px] top-0 flex h-12 w-12 items-center justify-center rounded-3xl border border-border/40 bg-card/90 text-primary shadow-soft">
                {/* Icon bubble anchors each timeline node. */}
                <Icon name={step.icon} className="h-5 w-5" />
              </div>
              <div className="rounded-3xl border border-border/40 bg-card/85 p-6 shadow-soft">
                {/* Card body summarises the phase, deliverables, and handoff signals. */}
                <div className="flex flex-wrap items-center gap-3">
                  {/* Badges call out the phase name and duration. */}
                  <Badge variant="muted" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
                    {locale === "fr" ? "Étape" : "Step"}
                  </Badge>
                  <Badge variant="outline" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
                    {step.duration}
                  </Badge>
                </div>
                <div className="mt-4 space-y-2">
                  {/* Title plus description explain what happens during the phase. */}
                  <h3 className="font-display text-2xl font-semibold text-foreground">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  {/* Columns split tangible deliverables from expected outcomes. */}
                  <div className="space-y-2">
                    {/* Bullet list communicates tangible assets produced. */}
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.deliverablesLabel}</p>
                    <ul className="grid gap-2 text-sm text-muted-foreground">
                      {step.deliverables.map((deliverable) => (
                        <li key={deliverable} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-3 rounded-2xl border border-border/30 bg-background/70 p-4">
                    {/* Outcome panel notes the checkpoint that closes the phase. */}
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                      {locale === "fr" ? "Sortie attendue" : "Outcome"}
                    </p>
                    <p className="text-sm font-medium text-foreground">{step.outcome}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{locale === "fr" ? "Checkpoint" : "Checkpoint"}</span>
                      <span className="font-semibold text-highlight-foreground">{step.checkpoint}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  )
}
