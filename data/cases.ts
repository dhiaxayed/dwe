import { Locale } from "@/lib/i18n"

export type CaseStudy = {
  slug: string
  sector: string
  objectives: string[]
  before: string
  after: string
  tags: string[]
  challenge: string
  solution: string
  results: string[]
  kpis: { label: string; value: string }[]
  stack: string[]
  excerpt: string
}

export type CaseStudyEntry = {
  slug: string
  stack: string[]
  kpis: { label: string; value: string }[]
  tags: string[]
  translations: Record<Locale, {
    title: string
    sector: string
    challenge: string
    solution: string
    results: string[]
    objectives: string[]
    before: string
    after: string
    excerpt: string
  }>
}

const caseStudiesContent: CaseStudyEntry[] = [
  {
    slug: "erp-metiers-sur-mesure",
    stack: ["Next.js", "NestJS", "PostgreSQL", "Hasura", "Azure"],
    tags: ["Product", "ERP", "Scalabilite"],
    kpis: [
      { label: "Temps de traitement", value: "-35%" },
      { label: "Tickets SAV", value: "-42%" },
      { label: "Satisfaction", value: "4.7/5" },
    ],
    translations: {
      fr: {
        title: "ERP metier leger pour un reseau de franchises",
        sector: "Retail & Franchise",
        challenge:
          "Centraliser la gestion des stocks, des commandes et des formations pour 40 franchises avec des outils heterogenes.",
        solution:
          "Conception et developpement d'un ERP modulaire Next.js connecte a l'outil comptable, avec workflows d'approbation et reporting temps reel.",
        results: [
          "+25% de productivite sur la preparation des commandes",
          "Visibilite complete sur les stocks en temps reel",
          "Adoption par 100% des franchises en 3 semaines",
        ],
        objectives: ["Standardiser les processus", "Outiller le reseau", "Piloter la performance"],
        before: "Fichiers Excel disparates, zero consolidation en temps reel.",
        after: "Pilotage unifie, automatisation des commandes et formation onboardee.",
        excerpt: "Un outil metier moderne qui simplifie la vie des franchises et du siege, avec une interface intuitive et un reporting temps reel.",
      },
      en: {
        title: "Lightweight ERP for a franchise network",
        sector: "Retail & Franchise",
        challenge:
          "Centralise stock, orders and training for 40 franchisees working with fragmented tools.",
        solution:
          "Designed and built a modular Next.js ERP connected to accounting, with approval workflows and real-time reporting.",
        results: [
          "+25% productivity on order preparation",
          "Full real-time stock visibility",
          "100% franchise adoption in 3 weeks",
        ],
        objectives: ["Standardise processes", "Equip the network", "Drive performance"],
        before: "Scattered spreadsheets, no real-time consolidation.",
        after: "Unified operations, automated ordering and fast onboarding.",
        excerpt: "A modern business tool that simplifies franchise life with an intuitive interface and real-time reporting.",
      },
    },
  },
  {
    slug: "portail-client-b2b",
    stack: ["Next.js", "Supabase", "Stripe", "Hubspot", "Playwright"],
    tags: ["B2B", "Automation", "Experience"],
    kpis: [
      { label: "Temps de devis", value: "-66%" },
      { label: "Conversion", value: "+18%" },
      { label: "ROI", value: "4.5x" },
    ],
    translations: {
      fr: {
        title: "Portail client B2B avec automatisation des devis",
        sector: "Industrie & Services",
        challenge:
          "Reduire le temps de generation des devis complexes (20+ options) et offrir un suivi transparent aux clients.",
        solution:
          "Experience client redessinee, configurateur de devis dynamique, signature electronique et synchronisation CRM automatisee.",
        results: [
          "Delai de reponse divise par 3",
          "80% des devis signes en moins de 48h",
          "Suppression des ressaisies manuelles",
        ],
        objectives: ["Industrialiser le cycle de vente", "Augmenter la conversion", "Offrir un self-service"],
        before: "Processus manuel, echanges emails, peu de visibilite pour le client.",
        after: "Portail temps reel, calcul instantane et signature digitale integree.",
        excerpt: "Un portail B2B premium, 100% automatise, qui accelere les cycles de vente et ameliore l'experience client.",
      },
      en: {
        title: "B2B customer portal with automated quoting",
        sector: "Industry & Services",
        challenge:
          "Reduce the time to produce complex quotes (20+ options) and bring transparency to customers.",
        solution:
          "Redesigned client journey, dynamic quote configurator, e-signature and automated CRM sync.",
        results: [
          "Response time divided by 3",
          "80% of quotes signed within 48h",
          "Manual re-entry eliminated",
        ],
        objectives: ["Industrialise sales cycle", "Increase conversion", "Provide self-service"],
        before: "Manual process, long email threads, little visibility for the client.",
        after: "Real-time portal, instant calculation and integrated digital signature.",
        excerpt: "A premium B2B portal that automates the sales cycle and boosts customer experience.",
      },
    },
  },
  {
    slug: "rpa-operations",
    stack: ["Python", "UiPath", "Power BI", "Azure Functions"],
    tags: ["Finance", "RPA", "Data"],
    kpis: [
      { label: "Temps de traitement", value: "-80%" },
      { label: "Erreurs", value: "-100%" },
      { label: "Automatisation", value: "95%" },
    ],
    translations: {
      fr: {
        title: "Automatisation RPA pour un back-office finance",
        sector: "Finance & Assurance",
        challenge:
          "Eliminer la saisie manuelle de donnees comptables et fiabiliser les controles sur 12 filiales.",
        solution:
          "Mise en place de bots RPA orchestrés, normalisation des fichiers entrants et dashboards de pilotage avec alertes intelligentes.",
        results: [
          "3 200 heures economisees par an",
          "0 erreur critique post-deploiement",
          "ROI obtenu en 4 mois",
        ],
        objectives: ["Fiabiliser le reporting", "Automatiser les controles", "Reduire la charge humaine"],
        before: "Re-saisies manuelles, controles echantillonnes, retards de consolidation.",
        after: "Flux normalises, robots 24/7 et supervision centralisee.",
        excerpt: "Des workflows automatises de bout en bout qui fiabilisent les reportings financiers et liberent les equipes back-office.",
      },
      en: {
        title: "RPA automation for finance back-office",
        sector: "Finance & Insurance",
        challenge:
          "Remove manual accounting entries and secure controls across 12 subsidiaries.",
        solution:
          "Deployed orchestrated RPA bots, normalised incoming files and delivered dashboards with smart alerts.",
        results: [
          "3,200 hours saved per year",
          "0 critical errors after go-live",
          "ROI achieved in 4 months",
        ],
        objectives: ["Secure reporting", "Automate controls", "Reduce manual workload"],
        before: "Manual re-entry, sample-based controls, delayed consolidation.",
        after: "Normalised flows, 24/7 bots and centralised supervision.",
        excerpt: "End-to-end automation that secures financial reporting and frees back-office teams.",
      },
    },
  },
]

export function getCaseStudies(locale: Locale) {
  return caseStudiesContent.map((entry) => ({
    slug: entry.slug,
    stack: entry.stack,
    kpis: entry.kpis,
    tags: entry.tags,
    ...entry.translations[locale],
  }))
}

export function getCaseStudyEntry(slug: string) {
  return caseStudiesContent.find((entry) => entry.slug === slug)
}

export function getCaseStudy(locale: Locale, slug: string) {
  const entry = getCaseStudyEntry(slug)
  if (!entry) return undefined
  return {
    slug: entry.slug,
    stack: entry.stack,
    kpis: entry.kpis,
    tags: entry.tags,
    ...entry.translations[locale],
  }
}

export function getCaseStudySlugs() {
  return caseStudiesContent.map((entry) => entry.slug)
}

export const caseStudies = getCaseStudies("fr")