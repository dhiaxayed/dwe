"use client"

import Link from "next/link"

import { getTeam } from "@/data/team"
import { getValues } from "@/data/values"
import { getSite } from "@/data/site"
import { useI18n } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const copy = {
  fr: {
    heroBadge: "Équipe",
    heroTitle: "Un collectif engagé pour concevoir des produits qui comptent",
    heroIntro:
      "DWE Creation rassemble des profils complémentaires : stratèges produit, designers, ingénieurs software, experts data et QA. Nous combinons vision long terme et delivery précis pour des résultats tangibles.",
    heroSecondary: "Planifier une rencontre",
    cultureBadge: "Culture",
    cultureOutro:
      "Nous co-créons avec nos clients, partageons nos savoirs et formons les talents qui rejoignent le studio.",
    talentsBadge: "Talents",
    talentsTitle: "Une équipe resserrée, experte et disponible",
    talentsIntro:
      "Chaque mission est pilotée par un binôme senior et supportée par des talents en devenir pour conjuguer excellence et capacité d’exécution.",
    closingBadge: "Nous rejoindre ou collaborer",
    closingTitle: "Parlons de vos ambitions produit & carrière",
    closingIntro:
      "Nous cherchons en permanence des profils curieux, exigeants et orientés impact. Freelance, alternance ou CDI : discutons-en.",
    closingPrimary: "Écrire à l’équipe",
    closingSecondary: "Proposer une collaboration",
    ritualsTitle: "Rituels internes",
    ritualsFrequency: "Hebdomadaire",
    rituals: [
      "Studio lab : partage de retours d’expérience",
      "Revue design & technique croisée",
      "Mentorat pour les talents en devenir",
    ],
  },
  en: {
    heroBadge: "Team",
    heroTitle: "A dedicated crew building products that matter",
    heroIntro:
      "DWE Creation brings together complementary profiles: product strategists, designers, software engineers, data and QA specialists. We mix long-term vision with precise delivery for tangible outcomes.",
    heroSecondary: "Schedule a meeting",
    cultureBadge: "Culture",
    cultureOutro:
      "We co-create with clients, share knowledge and mentor the talent joining the studio.",
    talentsBadge: "Talent",
    talentsTitle: "A focused, expert and available team",
    talentsIntro:
      "Each engagement is led by a senior duo and supported by rising talent to combine excellence with execution capacity.",
    closingBadge: "Join or collaborate",
    closingTitle: "Let’s talk about your product & career ambitions",
    closingIntro:
      "We’re always looking for curious, driven profiles focused on impact. Freelance, internship or full-time: let’s talk.",
    closingPrimary: "Write to the team",
    closingSecondary: "Propose a collaboration",
    ritualsTitle: "Internal rituals",
    ritualsFrequency: "Weekly",
    rituals: [
      "Studio lab: sharing lessons learned",
      "Cross design & engineering reviews",
      "Mentoring for emerging talent",
    ],
  },
} as const

export function TeamPageContent() {
  const { locale } = useI18n()
  const labels = copy[locale]
  const site = getSite(locale)
  const team = getTeam(locale)
  const values = getValues(locale)

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
              <Link href="/contact">{labels.heroSecondary}</Link>
            </Button>
          </div>
        </div>
        <div className="rounded-[32px] border border-primary/20 bg-primary/10 p-8 text-primary">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary/70">{labels.cultureBadge}</p>
          <ul className="mt-4 space-y-4 text-base font-medium">
            {values.slice(0, 3).map((value) => (
              <li key={value.title} className="flex items-start gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{value.title}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-primary/80">{labels.cultureOutro}</p>
        </div>
      </section>

      <section className="border-y border-border/60 bg-muted/20 py-24">
        <div className="container space-y-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{labels.talentsBadge}</p>
            <h2 className="mt-3 text-balance font-display text-4xl font-semibold">{labels.talentsTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{labels.talentsIntro}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name} className="flex h-full flex-col">
                <CardHeader className="flex flex-col items-start gap-4">
                  <Avatar className="h-16 w-16 rounded-3xl">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{initialsFromName(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col justify-between gap-6 text-sm text-muted-foreground">
                  <p>{member.bio}</p>
                  <div className="flex flex-wrap gap-3 text-xs font-semibold">
                    {member.linkedin ? (
                      <Link
                        href={member.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                      >
                        LinkedIn
                      </Link>
                    ) : null}
                    {member.github ? (
                      <Link
                        href={member.github}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground transition hover:border-primary/40 hover:text-primary"
                      >
                        GitHub
                      </Link>
                    ) : null}
                  </div>
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
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{labels.closingBadge}</p>
              <h2 className="text-balance font-display text-3xl font-semibold sm:text-4xl">{labels.closingTitle}</h2>
              <p className="text-lg text-muted-foreground">{labels.closingIntro}</p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full px-7 py-6" asChild>
                  <Link href={`mailto:${site.email}`}>{labels.closingPrimary}</Link>
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-7 py-6" asChild>
                  <Link href="/contact">{labels.closingSecondary}</Link>
                </Button>
              </div>
            </div>
            <div className="space-y-4 rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-6 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>{labels.ritualsTitle}</span>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {labels.ritualsFrequency}
                </span>
              </div>
              <ul className="space-y-3">
                {labels.rituals.map((item) => (
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

function initialsFromName(name: string) {
  const [first = "", second = ""] = name.split(" ")
  return (first.charAt(0) + second.charAt(0)).toUpperCase()
}
