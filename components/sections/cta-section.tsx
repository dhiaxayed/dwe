"use client"

import { useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm, type UseFormRegister } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { ArrowRight, Mail, Send } from "lucide-react"

import { getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import type { Locale } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { fadeInUp, staggerChildren } from "@/lib/motion"

const estimatorSchema = z.object({
  scope: z.enum(["dev_apps", "automation", "ux_ui", "modernisation", "maintenance"]),
  users: z.enum(["50", "200", "1000", "5000+"]),
  urgency: z.enum(["2_semaines", "1_mois", "3_mois"]),
  stack: z.enum(["existing", "from_scratch", "mixed"]),
  notes: z.string().max(400).optional(),
})

const copy = {
  fr: {
    badge: "Pret a demarrer ?",
    title: "Construisons votre prochaine experience digitale premium",
    intro:
      "Studio produit et tech base a Tunis, Paris et Montreal. Un seul interlocuteur strategique, des deliveries cadencees, un run securise.",
    timeline: [
      { label: "Kick-off", value: "72h", description: "Atelier de cadrage + backlog priorise" },
      { label: "Prototype", value: "2-3 semaines", description: "Parcours critiques testables" },
      { label: "Delivery", value: "6-12 semaines", description: "Increments shippees" },
    ],
    estimatorTitle: "Estimateur express",
    estimatorIntro:
      "Repondez a 5 questions pour obtenir une fourchette budgetaire et un delai indicatif. A confirmer lors du kick-off.",
    estimatorBadge: "2 minutes",
    fieldScope: "Type de mission",
    fieldUsers: "Volume utilisateurs",
    fieldUrgency: "Urgence",
    fieldStack: "Etat de la stack",
    fieldNotes: "Notes (optionnel)",
    projection: "Projection",
    budgetLabel: "Budget indicatif",
    delayLabel: "Delai",
    submit: "Recevoir une estimation detaillee",
    scopeOptions: ["Développement d'apps", "Automatisation", "Design UX/UI", "Modernisation", "Maintenance & Support"],
    urgencyOptions: ["2 semaines", "1 mois", "3 mois"],
    contactEmail: "Par e-mail",
    contactCall: "Prendre un rendez-vous",
    teaser: "Nous pouvons lancer un cadrage sous 7 jours.",
  },
  en: {
    badge: "Ready to start?",
    title: "Let's design your next premium digital experience",
    intro:
      "Product and tech studio based in Tunis, Paris and Montreal. One strategic point of contact, paced deliveries, secure run.",
    timeline: [
      { label: "Kick-off", value: "72h", description: "Discovery workshop + prioritised backlog" },
      { label: "Prototype", value: "2-3 weeks", description: "Testable critical journeys" },
      { label: "Delivery", value: "6-12 weeks", description: "Ship-ready increments" },
    ],
    estimatorTitle: "Quick estimator",
    estimatorIntro:
      "Answer 5 questions to get a budget range and indicative timeline. We refine it together during the kick-off.",
    estimatorBadge: "2 minutes",
    fieldScope: "Engagement type",
    fieldUsers: "User volume",
    fieldUrgency: "Urgency",
    fieldStack: "Stack status",
    fieldNotes: "Notes (optional)",
    projection: "Projection",
    budgetLabel: "Estimated budget",
    delayLabel: "Timeline",
    submit: "Receive a detailed estimate",
    scopeOptions: ["App Development", "Automation", "UX/UI Design", "Modernisation", "Maintenance & Support"],
    urgencyOptions: ["2 weeks", "1 month", "3 months"],
    contactEmail: "By email",
    contactCall: "Book a meeting",
    teaser: "We can launch a discovery within 7 days.",
  },
}

type EstimatorForm = z.infer<typeof estimatorSchema>

type ChoiceConfig = {
  label: string
  value: string
  name: keyof EstimatorForm
}

export function CtaSection() {
  const { locale } = useI18n()
  const labels = copy[locale]
  const site = getSite(locale)

  const timeline = labels.timeline

  return (
    <section id="contact" className="relative overflow-hidden py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-noise opacity-70" />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerChildren(0.12, 0.12)}
        className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr]"
      >
        <motion.div variants={fadeInUp} className="rounded-[38px] border border-border/40 bg-card/90 p-12 shadow-elevated">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground">{labels.badge}</p>
          <h2 className="mt-4 text-balance font-display text-4xl font-semibold">
            {labels.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{labels.intro}</p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button size="lg" variant="primary" className="rounded-full px-8" asChild>
              <Link href={`mailto:${site.email}`}>
                <Mail className="mr-2 h-4 w-4" />
                {site.email}
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
              <Link href={site.cta.secondary.href}>
                {labels.contactCall}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-3">
            {timeline.map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-2xl border border-border/30 bg-background/70 px-4 py-3 text-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{item.label}</p>
                  <p className="text-sm text-foreground">{item.description}</p>
                </div>
                <span className="rounded-full border border-highlight/40 bg-highlight/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-3xl border border-border/30 bg-background/80 p-4 text-sm text-muted-foreground">
            {labels.teaser}
          </div>
        </motion.div>
        <motion.div variants={fadeInUp} className="space-y-6">
          <Card className="shadow-elevated">
            <CardHeader className="space-y-2">
              <CardTitle className="flex items-center justify-between text-xl">
                {labels.estimatorTitle}
                <Badge variant="signal" className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
                  {labels.estimatorBadge}
                </Badge>
              </CardTitle>
              <p className="text-sm text-muted-foreground">{labels.estimatorIntro}</p>
            </CardHeader>
            <CardContent>
              <QuickEstimatorForm labels={labels} locale={locale} />
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}

type QuickEstimatorProps = {
  labels: typeof copy["fr"]
  locale: Locale
}

function QuickEstimatorForm({ labels, locale }: QuickEstimatorProps) {
  const router = useRouter()
  const site = getSite(locale)
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<EstimatorForm>({
    resolver: zodResolver(estimatorSchema),
    defaultValues: {
      scope: "dev_apps",
      users: "200",
      urgency: "1_mois",
      stack: "existing",
      notes: "",
    },
  })

  const scope = watch("scope")
  const users = watch("users")
  const urgency = watch("urgency")
  const stack = watch("stack")

  const estimate = useMemo(() => {
    const base = scope === "dev_apps" ? 2700 : scope === "automation" ? 1700 : scope === "ux_ui" ? 1000 : scope === "modernisation" ? 4000 : 800
    const multiplier = users === "50" ? 1 : users === "200" ? 1.15 : users === "1000" ? 1.35 : 1.6
    const urgencyFactor = urgency === "2_semaines" ? 1.25 : urgency === "1_mois" ? 1.1 : 1
    const budgetEur = Math.round(base * multiplier * urgencyFactor)
    const budgetDt = Math.round(budgetEur * 3.4)
    const duration = urgency === "2_semaines" ? (locale === "fr" ? "2 a 4 semaines" : "2 to 4 weeks") : urgency === "1_mois" ? (locale === "fr" ? "4 a 6 semaines" : "4 to 6 weeks") : locale === "fr" ? "6 a 10 semaines" : "6 to 10 weeks"
    return { budgetEur: budgetEur.toLocaleString("fr-FR"), budgetDt: budgetDt.toLocaleString("fr-FR"), duration }
  }, [locale, scope, urgency, users])

  const onSubmit = (values: EstimatorForm) => {
    console.info("Estimator submission", values)
    router.push(site.cta.primary.href)
  }

  const scopeChoices: ChoiceConfig[] = [
    { label: labels.scopeOptions[0], value: "dev_apps", name: "scope" },
    { label: labels.scopeOptions[1], value: "automation", name: "scope" },
    { label: labels.scopeOptions[2], value: "ux_ui", name: "scope" },
    { label: labels.scopeOptions[3], value: "modernisation", name: "scope" },
    { label: labels.scopeOptions[4], value: "maintenance", name: "scope" },
  ]

  const userChoices: ChoiceConfig[] = [
    { label: "50", value: "50", name: "users" },
    { label: "200", value: "200", name: "users" },
    { label: "1000", value: "1000", name: "users" },
    { label: "5000+", value: "5000+", name: "users" },
  ]

  const urgencyChoices: ChoiceConfig[] = [
    { label: labels.urgencyOptions[0], value: "2_semaines", name: "urgency" },
    { label: labels.urgencyOptions[1], value: "1_mois", name: "urgency" },
    { label: labels.urgencyOptions[2], value: "3_mois", name: "urgency" },
  ]

  const stackChoices: ChoiceConfig[] = [
    { label: locale === "fr" ? "Existant" : "Existing", value: "existing", name: "stack" },
    { label: locale === "fr" ? "From scratch" : "From scratch", value: "from_scratch", name: "stack" },
    { label: locale === "fr" ? "Mixte" : "Hybrid", value: "mixed", name: "stack" },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4">
        <Field label={labels.fieldScope}>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {scopeChoices.map((choice) => (
              <Choice
                key={choice.value}
                label={choice.label}
                value={choice.value}
                name={choice.name}
                register={register}
                active={scope === choice.value}
              />
            ))}
          </div>
        </Field>
        <Field label={labels.fieldUsers}>
          <div className="grid grid-cols-4 gap-2">
            {userChoices.map((choice) => (
              <Choice
                key={choice.value}
                label={choice.label}
                value={choice.value}
                name={choice.name}
                register={register}
                active={users === choice.value}
              />
            ))}
          </div>
        </Field>
        <Field label={labels.fieldUrgency}>
          <div className="grid grid-cols-3 gap-2">
            {urgencyChoices.map((choice) => (
              <Choice
                key={choice.value}
                label={choice.label}
                value={choice.value}
                name={choice.name}
                register={register}
                active={urgency === choice.value}
              />
            ))}
          </div>
        </Field>
        <Field label={labels.fieldStack}>
          <div className="grid grid-cols-3 gap-2">
            {stackChoices.map((choice) => (
              <Choice
                key={choice.value}
                label={choice.label}
                value={choice.value}
                name={choice.name}
                register={register}
                active={stack === choice.value}
              />
            ))}
          </div>
        </Field>
        <div className="space-y-2">
          <Label htmlFor="notes">{labels.fieldNotes}</Label>
          <Textarea
            id="notes"
            placeholder={locale === "fr" ? "Contexte, contraintes, KPIs..." : "Context, constraints, KPIs..."}
            rows={3}
            {...register("notes")}
          />
        </div>
      </div>
      <div className="rounded-3xl border border-border/40 bg-background/80 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.projection}</p>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <span className="rounded-2xl border border-border/40 bg-card/80 px-4 py-2 text-base font-semibold text-foreground">
            {labels.budgetLabel}: {estimate.budgetEur} EUR / {estimate.budgetDt} DT
          </span>
          <span className="rounded-2xl border border-border/40 bg-card/80 px-4 py-2 text-base font-semibold text-foreground">
            {labels.delayLabel}: {estimate.duration}
          </span>
        </div>
      </div>
      <Button type="submit" size="lg" variant="primary" className="w-full" disabled={isSubmitting}>
        {labels.submit}
        <Send className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

type FieldProps = {
  label: string
  children: React.ReactNode
}

function Field({ label, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{label}</p>
      {children}
    </div>
  )
}

type ChoiceProps = {
  label: string
  value: string
  name: keyof EstimatorForm
  register: UseFormRegister<EstimatorForm>
  active?: boolean
}

function Choice({ label, value, name, register, active }: ChoiceProps) {
  return (
    <label className={cnChoice(Boolean(active))}>
      <input type="radio" value={value} {...register(name)} className="sr-only" defaultChecked={active} />
      {label}
    </label>
  )
}

function cnChoice(active: boolean) {
  return active
    ? "flex items-center justify-center rounded-2xl border border-primary/60 bg-primary/15 px-3 py-2 text-sm font-semibold text-primary-foreground"
    : "flex items-center justify-center rounded-2xl border border-border/40 bg-card/70 px-3 py-2 text-sm text-muted-foreground hover:border-primary/40"
}
