"use client"

import Link from "next/link"

import { getProcessSteps } from "@/data/process"
import { getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from "@/components/common/icon"

const copy = {
  fr: {
    heroBadge: "Méthodologie",
    heroTitle: "Un process orchestré pour maximiser l’impact à chaque itération",
    heroIntro:
      "Notre approche combine rigueur produit, excellence design et delivery maîtrisé. Chaque phase est pensée pour sécuriser vos objectifs business tout en faisant monter vos équipes en compétence.",
    heroButtons: {
      primary: "Explorer nos services",
    },
    principleTitle: "Principes clés",
    principles: [
      "Collaboration continue avec vos parties prenantes",
      "Mesure de la valeur livrée à chaque étape",
      "Transparence sur la roadmap, les risques et les arbitrages",
      "Transfert de compétences pour rendre vos équipes autonomes",
    ],
    stepsBadge: "Étapes clés",
    stepsTitle: "Un déroulé en six phases pour cadrer, concevoir, développer et opérer vos produits digitaux",
    stepsIntro:
      "Chaque étape s’appuie sur des artefacts concrets qui facilitent la prise de décision et l’alignement des équipes.",
    deliverables: "Livrables",
    stepLabel: (index: number) => `Étape ${index + 1}`,
    ctaBadge: "Prêt à démarrer ?",
    ctaTitle: "Organisons un atelier de cadrage personnalisé",
    ctaIntro:
      "En 90 minutes, nous identifions vos enjeux prioritaires, évaluons votre maturité digitale et définissons un plan d’intervention adapté.",
    ctaSecondary: "Nous écrire",
    auditTitle: "Participants recommandés",
    auditValue: "4 à 6",
    auditItems: [
      "Sponsor métier / produit",
      "Responsable technique ou IT",
      "Représentants utilisateurs clés",
    ],
  },
  en: {
    heroBadge: "Methodology",
    heroTitle: "A guided process to maximise impact at every iteration",
    heroIntro:
      "Our approach blends product rigor, design excellence and disciplined delivery. Each phase protects your business goals while leveling up your teams.",
    heroButtons: {
      primary: "Explore our services",
    },
    principleTitle: "Guiding principles",
    principles: [
      "Continuous collaboration with your stakeholders",
      "Measuring delivered value at every step",
      "Transparency on roadmap, risks and trade-offs",
      "Capability transfer to empower your teams",
    ],
    stepsBadge: "Key stages",
    stepsTitle: "Six phases to scope, design, build and operate your digital products",
    stepsIntro:
      "Each step relies on tangible artefacts that support decision-making and team alignment.",
    deliverables: "Deliverables",
    stepLabel: (index: number) => `Step ${index + 1}`,
    ctaBadge: "Ready to kick off?",
    ctaTitle: "Let’s host a tailored scoping workshop",
    ctaIntro:
      "In 90 minutes we surface your priorities, assess digital maturity and outline a tailored intervention plan.",
    ctaSecondary: "Write to us",
    auditTitle: "Recommended participants",
    auditValue: "4 to 6",
    auditItems: [
      "Business / product sponsor",
      "Technical or IT lead",
      "Key user representatives",
    ],
  },
} as const

export function ProcessPageContent() {
  const { locale } = useI18n()
  const labels = copy[locale]
  const site = getSite(locale)
  const steps = getProcessSteps(locale)

  return (
    <main className="space-y-24 py-24">
      <section className="container grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <Badge variant="accent" className="w-fit rounded-xl px-4 py-2 text-xs uppercase tracking-[0.3em]">
            {labels.heroBadge}
          </Badge>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {labels.heroTitle}
          </h1>
          <p className="text-lg text-muted-foreground">{labels.heroIntro}</p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full px-7 py-6" asChild>
              <Link href={site.cta.primary.href}>{site.cta.primary.label}</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-7 py-6" asChild>
              <Link href="/services">{labels.heroButtons.primary}</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-[32px] border border-primary/20 bg-primary/10 p-8 text-primary">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{labels.principleTitle}</p>
          <ul className="mt-4 space-y-4 text-base font-medium">
            {labels.principles.map((principle) => (
              <li key={principle} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

  <section className="border-y border-border/60 bg-muted/20 py-24">
        <div className="container space-y-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{labels.stepsBadge}</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold">{labels.stepsTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{labels.stepsIntro}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {steps.map((step, index) => (
              <Card key={step.title} className="flex h-full flex-col">
                <CardHeader className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon name={step.icon} className="h-6 w-6" />
                  </div>
                  <Badge variant="outline" className="w-fit rounded-xl px-3 py-1 text-xs uppercase tracking-wide">
                    {labels.stepLabel(index)}
                  </Badge>
                  <CardTitle>{step.title}</CardTitle>
                  <CardDescription>{step.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto space-y-3">
                  <p className="text-sm font-semibold text-muted-foreground">{labels.deliverables}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {step.deliverables.map((deliverable) => (
                      <li key={deliverable} className="flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container">
        <div className="rounded-[32px] border border-border/60 bg-card/80 p-10 shadow-lg shadow-primary/5">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-5">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{labels.ctaBadge}</p>
              <h2 className="text-balance font-display text-3xl font-semibold sm:text-4xl">{labels.ctaTitle}</h2>
              <p className="text-lg text-muted-foreground">{labels.ctaIntro}</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full px-7 py-6" asChild>
                  <Link href={site.cta.secondary.href}>{site.cta.secondary.label}</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-7 py-6" asChild>
                  <Link href="/contact">{labels.ctaSecondary}</Link>
                </Button>
              </div>
            </div>
            <div className="space-y-4 rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>{labels.auditTitle}</span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {labels.auditValue}
                </span>
              </div>
              <ul className="space-y-3">
                {labels.auditItems.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
