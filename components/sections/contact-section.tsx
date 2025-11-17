"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

const copy = {
  fr: {
    badge: "Contact",
    title: "Discutons de vos objectifs et concevons la bonne trajectoire",
    intro: "Partagez votre contexte : nous analysons vos enjeux et revenons avec une recommandation sous 72 heures.",
    phoneLabel: "Telephone",
    phoneAvailability: "Disponible du lundi au vendredi, 9h - 18h.",
    emailLabel: "Email",
    emailAvailability: "Reponse sous 24h ouvres garantie.",
    formName: "Nom & prenom",
    formCompany: "Organisation",
    formEmail: "Email professionnel",
    formPhone: "Telephone",
    formProject: "Votre besoin",
    formPlaceholder: "Decrivez votre projet, vos objectifs et les echeances cles.",
    formBudget: "Budget estimatif (optionnel)",
    nda: "Nous signons un NDA sur simple demande avant tout partage de documents ou de donnees sensibles.",
    submit: "Envoyer ma demande",
    features: [
      {
        title: "Kick-off rapide",
        description: "Disponibilite sous 7 jours pour demarrer un atelier de cadrage ou une mission flash.",
      },
      {
        title: "Collaboration hybride",
        description: "Nous melons ingenieurs seniors et talents en devenir pour optimiser budget et impact.",
      },
      {
        title: "Suivi transparent",
        description: "Acces a un espace projet dedie, reporting hebdomadaire et KPIs partages.",
      },
    ],
  },
  en: {
    badge: "Contact",
    title: "Share your objectives and let us chart the right path",
    intro: "Tell us about your context: we analyse your challenges and come back with recommendations within 72 hours.",
    phoneLabel: "Phone",
    phoneAvailability: "Available Monday to Friday, 9am - 6pm.",
    emailLabel: "Email",
    emailAvailability: "Answer within 24 business hours guaranteed.",
    formName: "Full name",
    formCompany: "Organisation",
    formEmail: "Work email",
    formPhone: "Phone",
    formProject: "Your need",
    formPlaceholder: "Describe your project, objectives and key deadlines.",
    formBudget: "Estimated budget (optional)",
    nda: "We sign an NDA on request before any confidential material is shared.",
    submit: "Send my request",
    features: [
      {
        title: "Fast kick-off",
        description: "Availability within 7 days to run a discovery workshop or a flash mission.",
      },
      {
        title: "Hybrid collaboration",
        description: "Senior engineers and rising talents to balance budget and impact.",
      },
      {
        title: "Transparent follow-up",
        description: "Dedicated workspace, weekly reporting and shared KPIs.",
      },
    ],
  },
}

const contactSchema = z.object({
  fullname: z.string().min(2),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  project: z.string().min(10),
  budget: z.string().optional(),
})

type ContactForm = z.infer<typeof contactSchema>

export function ContactSection() {
  const { locale } = useI18n()
  const labels = copy[locale]
  const site = getSite(locale)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = () => {
    // form is posted via action attribute. Hook kept for potential custom handling.
  }

  return (
    <section className="space-y-24">
      <div className="container grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-6">
          <Badge variant="signal" className="w-fit rounded-xl px-4 py-2 text-xs uppercase tracking-[0.3em]">
            {labels.badge}
          </Badge>
          <h1 className="text-balance font-display text-4xl font-semibold leading-tight sm:text-5xl">{labels.title}</h1>
          <p className="text-lg text-muted-foreground">{labels.intro}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-border/40 bg-card/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.phoneLabel}</p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                <Link href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {site.phone}
                </Link>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{labels.phoneAvailability}</p>
            </div>
            <div className="rounded-3xl border border-border/40 bg-card/80 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.emailLabel}</p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                <Link href={`mailto:${site.email}`} className="hover:text-primary">
                  {site.email}
                </Link>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{labels.emailAvailability}</p>
            </div>
          </div>
        </div>

        <form
          method="POST"
          action={`https://formsubmit.co/${site.email}`}
          target="_blank"
          className="space-y-6 rounded-[32px] border border-border/40 bg-card/85 p-8 shadow-lg shadow-primary/5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullname">{labels.formName}</Label>
              <Input id="fullname" placeholder="Alex Martin" required autoComplete="name" {...register("fullname")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{labels.formCompany}</Label>
              <Input id="company" placeholder="Nom de votre societe" autoComplete="organization" {...register("company")} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">{labels.formEmail}</Label>
              <Input id="email" type="email" placeholder="vous@entreprise.com" required autoComplete="email" {...register("email")} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{labels.formPhone}</Label>
              <Input id="phone" type="tel" autoComplete="tel" {...register("phone")} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="project">{labels.formProject}</Label>
            <Textarea id="project" rows={6} placeholder={labels.formPlaceholder} required {...register("project")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="budget">{labels.formBudget}</Label>
            <Input id="budget" placeholder="Ex. 30 000" {...register("budget")} />
          </div>
          <div className="flex items-start gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
            <p>{labels.nda}</p>
          </div>
          <Button type="submit" size="lg" className="w-full rounded-full px-7 py-6" disabled={isSubmitting}>
            {labels.submit}
          </Button>
        </form>
      </div>

      <section className="border-y border-border/40 bg-muted/10 py-24">
        <div className="container grid gap-10 lg:grid-cols-3">
          {labels.features.map((item) => (
            <div key={item.title} className="rounded-3xl border border-border/40 bg-card/80 p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground">{item.title}</p>
              <p className="mt-3 text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
