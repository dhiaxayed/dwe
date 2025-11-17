"use client"

import Link from "next/link"

import { getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const copy = {
  fr: {
    badge: "A propos",
    title: "Studio produit et tech tailore pour les equipes ambitieuses",
    intro:
      "Nous rassemblons strategie, design, developpement et automatisation pour construire des experiences logicielles qui font progresser vos equipes.",
    bullets: [
      "Une equipe hybride seniors + jeunes talents pour conjuguer vision et cadence.",
      "Une gouvernance transparente : rituels, indicateurs, livrables actionnables.",
      "Des stacks modernes, industrialisees et documentees pour passer a l'echelle.",
    ],
    ctaPrimary: "Decouvrir nos services",
    ctaSecondary: "Nous contacter",
  },
  en: {
    badge: "About",
    title: "Product and tech studio tailored for ambitious teams",
    intro:
      "We blend strategy, design, engineering and automation to craft software experiences that move your teams forward.",
    bullets: [
      "Hybrid crew of senior leads and rising talents to mix vision and delivery pace.",
      "Transparent governance: rituals, KPIs and actionable deliverables.",
      "Modern, industrialised stacks documented to scale with confidence.",
    ],
    ctaPrimary: "Explore our services",
    ctaSecondary: "Get in touch",
  },
}

const pillars = {
  fr: [
    {
      title: "Ateliers immersifs",
      description: "Discovery guidee, priorisation par valeur, prototypage rapide pour valider vite.",
    },
    {
      title: "Engineering exigeant",
      description: "Architecture modulaire, pipelines CI/CD, revues de code syste matiques et tests automatise s.",
    },
    {
      title: "Run accompagne",
      description: "Monitoring, support, roadmap d'evolution et transfert de competences pour vos equipes internes.",
    },
  ],
  en: [
    {
      title: "Immersive workshops",
      description: "Guided discovery, value-based prioritisation and rapid prototyping for fast validation.",
    },
    {
      title: "Demanding engineering",
      description: "Modular architecture, CI/CD pipelines, systematic code reviews and automated testing.",
    },
    {
      title: "Supported run",
      description: "Monitoring, support, improvement roadmap and knowledge transfer for your internal teams.",
    },
  ],
}

export function AboutSection() {
  const { locale } = useI18n()
  const labels = copy[locale]
  const site = getSite(locale)
  const features = pillars[locale]

  return (
    <section className="space-y-12">
      <div className="rounded-[38px] border border-border/30 bg-card/85 p-10 shadow-elevated">
        <Badge variant="signal" className="rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em]">
          {labels.badge}
        </Badge>
        <div className="mt-6 space-y-5">
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">{labels.title}</h1>
          <p className="text-lg text-muted-foreground">{labels.intro}</p>
          <ul className="space-y-3 text-sm text-muted-foreground">
            {labels.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" variant="primary" className="rounded-full px-7 py-6" asChild>
              <Link href="/services">{labels.ctaPrimary}</Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-7 py-6" asChild>
              <Link href={site.cta.primary.href}>{labels.ctaSecondary}</Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature) => (
          <Card key={feature.title} className="shadow-soft">
            <CardHeader>
              <Badge variant="outline" className="w-fit rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
                {feature.title}
              </Badge>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">{feature.description}</CardContent>
          </Card>
        ))}
      </div>
      <div className="rounded-3xl border border-border/30 bg-background/80 p-6 text-sm text-muted-foreground">
        {site.marketingQuotes[2]}
      </div>
    </section>
  )
}
