import { Locale } from "@/lib/i18n"

export type ValueItem = {
  title: string
  description: string
  icon: string
}

const valuesContent: Record<Locale, ValueItem[]> = {
  fr: [
    {
      title: "Accompagnement de bout en bout",
      description: "Une equipe integree qui gere strategie, design, developpement, QA et run continu.",
      icon: "compass",
    },
    {
      title: "Qualite mesurable",
      description: "Tests automatises, indicateurs clairs et plan d'amelioration continue a chaque livraison.",
      icon: "check-circle-2",
    },
    {
      title: "Automatisation utile",
      description: "Nous automatisons ce qui cree le plus de valeur et libere vos equipes des taches repetitives.",
      icon: "cpu",
    },
    {
      title: "Transparence & co-construction",
      description: "Des rituels hebdomadaires, un tableau de bord partage et des livrables actionnables.",
      icon: "sparkles",
    },
  ],
  en: [
    {
      title: "End-to-end partnership",
      description: "An integrated team covering strategy, design, engineering, QA and continuous run.",
      icon: "compass",
    },
    {
      title: "Measurable quality",
      description: "Automated tests, crystal-clear KPIs and improvement plans at every release.",
      icon: "check-circle-2",
    },
    {
      title: "Useful automation",
      description: "We automate what creates the most value and frees your teams from repetitive tasks.",
      icon: "cpu",
    },
    {
      title: "Transparency & co-creation",
      description: "Weekly rituals, shared dashboards and actionable deliverables.",
      icon: "sparkles",
    },
  ],
}

export function getValues(locale: Locale) {
  return valuesContent[locale]
}

export const values = getValues("fr")