import { Locale } from "@/lib/i18n"

export type FaqItem = {
  question: string
  answer: string
}

const faqsContent: Record<Locale, FaqItem[]> = {
  fr: [
    {
      question: "Quels types de projets prenez-vous en charge ?",
      answer:
        "Des plateformes web et mobiles B2B/B2C, des outils internes, des integrations d'APIs, des dashboards data et des automatisations de processus.",
    },
    {
      question: "Travaillez-vous avec des startups ou des grands comptes ?",
      answer:
        "Notre format hybride etudiants/ingenieurs nous permet d'accompagner aussi bien des scale-ups que des directions metiers de grands groupes.",
    },
    {
      question: "Proposez-vous un engagement long terme ?",
      answer:
        "Oui, via un contrat de Maintenance en Conditions Operationnelles avec indicateurs de qualite, support et amelioration continue.",
    },
    {
      question: "Quel est votre delai de demarrage ?",
      answer:
        "Nous pouvons lancer un cadrage sous 7 jours ouvres apres validation du devis et constitution de l'equipe projet.",
    },
  ],
  en: [
    {
      question: "What kind of projects do you take on?",
      answer:
        "B2B/B2C web and mobile platforms, internal tools, API integrations, data dashboards and process automation.",
    },
    {
      question: "Do you work with startups or enterprise teams?",
      answer:
        "Our hybrid seniors/junior model lets us support both scale-ups and business units in large organisations.",
    },
    {
      question: "Do you offer long-term engagement?",
      answer:
        "Yes, via a run & maintenance agreement with quality KPIs, support and continuous improvement.",
    },
    {
      question: "How fast can you start?",
      answer:
        "We can launch a discovery within 7 business days after quote validation and team alignment.",
    },
  ],
}

export function getFaqs(locale: Locale) {
  return faqsContent[locale]
}

export const faqs = getFaqs("fr")