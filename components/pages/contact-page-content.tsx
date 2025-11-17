"use client"

import Link from "next/link"

import { getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const copy = {
  fr: {
    heroBadge: "Contact",
    heroTitle: "Discutons de vos objectifs et concevons la bonne trajectoire",
    heroIntro: "Partagez votre contexte : nous analysons vos enjeux et revenons avec une recommandation sous 72 heures.",
    phoneLabel: "Téléphone",
    phoneHelp: "Disponible du lundi au vendredi, 9h - 18h.",
    emailLabel: "Email",
    emailHelp: "Réponse sous 24h ouvrées garantie.",
    form: {
      fullname: "Nom & prénom",
      company: "Organisation",
      companyPlaceholder: "Nom de votre société",
      email: "Email professionnel",
      emailPlaceholder: "vous@entreprise.com",
      phone: "Téléphone",
      phonePlaceholder: "",
      project: "Votre besoin",
      projectPlaceholder: "Décrivez votre projet, vos objectifs et les échéances clés.",
      budget: "Budget estimatif (optionnel)",
      budgetPlaceholder: "Ex. 30 000 €",
      submit: "Envoyer ma demande",
    },
    privacy:
      "Nous signons un accord de confidentialité (NDA) sur simple demande avant tout partage de documents ou de données sensibles.",
    highlights: [
      {
        title: "Kick-off rapide",
        description: "Disponibilité sous 7 jours pour démarrer un atelier de cadrage ou une mission flash.",
      },
      {
        title: "Collaboration hybride",
        description: "Nous mêlons ingénieurs seniors et talents en devenir pour optimiser budget et impact.",
      },
      {
        title: "Suivi transparent",
        description: "Accès à un espace projet dédié, reporting hebdomadaire et KPIs partagés.",
      },
    ],
  },
  en: {
    heroBadge: "Contact",
    heroTitle: "Let’s discuss your goals and design the right path",
    heroIntro: "Share your context: we review your needs and return with a recommendation within 72 hours.",
    phoneLabel: "Phone",
    phoneHelp: "Available Monday to Friday, 9am - 6pm.",
    emailLabel: "Email",
    emailHelp: "Guaranteed response within 24 business hours.",
    form: {
      fullname: "Full name",
      company: "Organisation",
      companyPlaceholder: "Company name",
      email: "Work email",
      emailPlaceholder: "you@company.com",
      phone: "Phone",
      phonePlaceholder: "",
      project: "Your project",
      projectPlaceholder: "Describe your project, objectives and key milestones.",
      budget: "Estimated budget (optional)",
      budgetPlaceholder: "E.g. €30,000",
      submit: "Send my request",
    },
    privacy:
      "We sign a non-disclosure agreement (NDA) upon request before sharing any sensitive documents or data.",
    highlights: [
      {
        title: "Fast kick-off",
        description: "Availability within 7 days to start a scoping workshop or flash mission.",
      },
      {
        title: "Hybrid collaboration",
        description: "We combine senior engineers and emerging talent to balance budget and impact.",
      },
      {
        title: "Transparent follow-up",
        description: "Dedicated project space, weekly reporting and shared KPIs.",
      },
    ],
  },
} as const

export function ContactPageContent() {
  const { locale } = useI18n()
  const labels = copy[locale]
  const site = getSite(locale)

  return (
    <main className="space-y-24 py-24">
      <section className="container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <Badge variant="accent" className="w-fit rounded-xl px-4 py-2 text-xs uppercase tracking-[0.3em]">
            {labels.heroBadge}
          </Badge>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">
            {labels.heroTitle}
          </h1>
          <p className="text-lg text-muted-foreground">{labels.heroIntro}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border/60 bg-card/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.phoneLabel}</p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                <Link href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {site.phone}
                </Link>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{labels.phoneHelp}</p>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.emailLabel}</p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                <Link href={`mailto:${site.email}`} className="hover:text-primary">
                  {site.email}
                </Link>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{labels.emailHelp}</p>
            </div>
          </div>
        </div>

        <form
          method="POST"
          action={`https://formsubmit.co/${site.email}`}
          target="_blank"
          className="space-y-6 rounded-[32px] border border-border/60 bg-card/80 p-8 shadow-lg shadow-primary/5"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullname">{labels.form.fullname}</Label>
              <Input id="fullname" name="fullname" placeholder="Alex Martin" required autoComplete="name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{labels.form.company}</Label>
              <Input
                id="company"
                name="company"
                placeholder={labels.form.companyPlaceholder}
                autoComplete="organization"
              />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">{labels.form.email}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder={labels.form.emailPlaceholder}
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{labels.form.phone}</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder={labels.form.phonePlaceholder}
                autoComplete="tel"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="project">{labels.form.project}</Label>
            <Textarea
              id="project"
              name="project"
              placeholder={labels.form.projectPlaceholder}
              rows={6}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">{labels.form.budget}</Label>
            <Input id="budget" name="budget" placeholder={labels.form.budgetPlaceholder} />
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
            <p>{labels.privacy}</p>
          </div>
          <Button type="submit" size="lg" className="w-full rounded-full px-7 py-6">
            {labels.form.submit}
          </Button>
        </form>
      </section>

      <section className="border-y border-border/60 bg-muted/10 py-24">
        <div className="container grid gap-10 lg:grid-cols-3">
          {labels.highlights.map((item) => (
            <div key={item.title} className="rounded-3xl border border-border/60 bg-card/80 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{item.title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
