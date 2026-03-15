import { Locale } from "@/lib/i18n"

export type CaseStudy = {
  slug: string
  title: string
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
    stack: ["Gestion unifiee", "Pilotage temps reel", "Processus optimises", "Formation integree", "Reporting avance"],
    tags: ["Croissance", "Performance", "Transformation"],
    kpis: [
      { label: "Productivite", value: "+35%" },
      { label: "Satisfaction client", value: "4.7/5" },
      { label: "Adoption", value: "100%" },
    ],
    translations: {
      fr: {
        title: "Plateforme de pilotage unifiee pour un reseau de franchises",
        sector: "Retail & Franchise",
        challenge:
          "Un reseau de 40 franchises perdait en efficacite avec des outils fragmentes, des processus manuels et aucune visibilite globale sur l'activite.",
        solution:
          "Nous avons concu une plateforme de gestion centralisee et intuitive qui unifie les operations, automatise les commandes et offre un pilotage en temps reel a chaque niveau de l'organisation.",
        results: [
          "+35% de productivite operationnelle des la premiere semaine",
          "Visibilite complete et instantanee sur l'ensemble du reseau",
          "Adoption totale par les 40 franchises en seulement 3 semaines",
        ],
        objectives: ["Unifier les operations du reseau", "Accelerer la prise de decision", "Booster la performance globale"],
        before: "Des outils disparates, aucune consolidation, des decisions prises a l'aveugle.",
        after: "Une vision 360° du reseau, des decisions eclairees et une croissance acceleree.",
        excerpt: "Comment nous avons transforme la gestion d'un reseau de 40 franchises en une machine de performance unifiee et intuitive.",
      },
      en: {
        title: "Unified management platform for a franchise network",
        sector: "Retail & Franchise",
        challenge:
          "A network of 40 franchisees was losing efficiency with fragmented tools, manual processes and no global visibility on operations.",
        solution:
          "We designed a centralized, intuitive management platform that unifies operations, automates ordering and provides real-time insights at every level.",
        results: [
          "+35% operational productivity from the first week",
          "Complete, real-time visibility across the entire network",
          "100% adoption by all 40 franchisees within just 3 weeks",
        ],
        objectives: ["Unify network operations", "Speed up decision-making", "Boost overall performance"],
        before: "Disconnected tools, no consolidation, decisions made in the dark.",
        after: "360° network visibility, data-driven decisions and accelerated growth.",
        excerpt: "How we turned a 40-franchise network into a unified, high-performance operation with intuitive management tools.",
      },
    },
  },
  {
    slug: "portail-client-b2b",
    stack: ["Vente digitale", "Experience client", "Self-service", "Signature electronique", "CRM intelligent"],
    tags: ["Revenue growth", "Experience client", "Innovation commerciale"],
    kpis: [
      { label: "Cycle de vente", value: "-66%" },
      { label: "Conversion", value: "+18%" },
      { label: "ROI", value: "4.5x" },
    ],
    translations: {
      fr: {
        title: "Portail commercial B2B qui accelere les ventes",
        sector: "Industrie & Services",
        challenge:
          "Un cycle de vente trop long, des devis complexes traites manuellement et une experience client en dessous des standards du marche freinaient la croissance.",
        solution:
          "Nous avons cree un portail client premium avec devis instantane, signature en ligne et suivi en temps reel — une experience d'achat fluide qui fidélise et convertit.",
        results: [
          "Cycle de vente reduit de 66%, les revenus suivent",
          "80% des devis signes en moins de 48h",
          "Les commerciaux se concentrent sur la relation client, plus sur l'admin",
        ],
        objectives: ["Accelerer le chiffre d'affaires", "Differencier l'experience client", "Liberer la force commerciale"],
        before: "Processus lent et manuel, clients frustres, opportunites perdues.",
        after: "Parcours d'achat moderne, ventes accelerees et clients ravis.",
        excerpt: "Comment nous avons divise par 3 le cycle de vente d'un leader industriel grace a un portail client innovant qui transforme l'experience d'achat B2B.",
      },
      en: {
        title: "B2B sales portal that accelerates revenue",
        sector: "Industry & Services",
        challenge:
          "A lengthy sales cycle, complex quotes handled manually and a below-market customer experience were holding back growth.",
        solution:
          "We built a premium customer portal with instant quoting, online signature and real-time tracking — a seamless buying experience that converts and retains.",
        results: [
          "Sales cycle cut by 66%, revenue follows",
          "80% of quotes signed within 48 hours",
          "Sales teams focus on relationships, not admin",
        ],
        objectives: ["Accelerate revenue", "Differentiate customer experience", "Empower the sales force"],
        before: "Slow manual process, frustrated clients, lost opportunities.",
        after: "Modern buying journey, faster sales and delighted customers.",
        excerpt: "How we cut an industry leader's sales cycle by 3x with an innovative portal that transforms the B2B buying experience.",
      },
    },
  },
  {
    slug: "rpa-operations",
    stack: ["Intelligence operationnelle", "Automatisation intelligente", "Pilotage decisonnel", "Zero erreur"],
    tags: ["Rentabilite", "Excellence operationnelle", "Innovation"],
    kpis: [
      { label: "Economie de temps", value: "-80%" },
      { label: "Erreurs", value: "0" },
      { label: "ROI", value: "4 mois" },
    ],
    translations: {
      fr: {
        title: "Automatisation intelligente pour liberer la performance financiere",
        sector: "Finance & Assurance",
        challenge:
          "Des equipes noyees dans la saisie manuelle, des erreurs couteuses et des retards de consolidation impactaient directement la rentabilite et la conformite.",
        solution:
          "Nous avons mis en place une solution d'automatisation intelligente qui elimine les taches repetitives, garantit zero erreur et offre des tableaux de bord decisionnels en temps reel.",
        results: [
          "3 200 heures liberees par an pour des taches a forte valeur ajoutee",
          "Zero erreur : fiabilite totale sur les reportings financiers",
          "Investissement rentabilise en seulement 4 mois",
        ],
        objectives: ["Maximiser la rentabilite", "Garantir la conformite", "Liberer le potentiel des equipes"],
        before: "Equipes surchargees, erreurs frequentes, consolidation en retard.",
        after: "Operations fluidifiees, donnees fiables et equipes focalisees sur la strategie.",
        excerpt: "Comment nous avons libere 3 200 heures/an et atteint zero erreur pour un groupe financier, avec un retour sur investissement en 4 mois.",
      },
      en: {
        title: "Intelligent automation to unlock financial performance",
        sector: "Finance & Insurance",
        challenge:
          "Teams overwhelmed by manual data entry, costly errors and reporting delays were directly impacting profitability and compliance.",
        solution:
          "We deployed an intelligent automation solution that eliminates repetitive tasks, achieves zero errors and delivers real-time decision dashboards.",
        results: [
          "3,200 hours freed per year for high-value activities",
          "Zero errors: total reliability on financial reporting",
          "Investment paid back in just 4 months",
        ],
        objectives: ["Maximize profitability", "Ensure compliance", "Unlock team potential"],
        before: "Overloaded teams, frequent errors, delayed consolidation.",
        after: "Streamlined operations, reliable data and teams focused on strategy.",
        excerpt: "How we freed 3,200 hours/year and achieved zero errors for a financial group, with ROI in just 4 months.",
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