import { Locale } from "@/lib/i18n"

export type ServiceImpact = "efficiency" | "experience" | "scale"

export type ServiceTranslation = {
  title: string
  description: string
  highlights: string[]
  deliverables: string[]
  duration: string
  category: string
  modules: string[]
  recommended: string[]
}

export type ServiceEntry = {
  slug: string
  impact: ServiceImpact
  stack: string[]
  translations: Record<Locale, ServiceTranslation>
}

const servicesContent: ServiceEntry[] = [
  {
    slug: "developpement-applications",
    impact: "scale",
    stack: ["Next.js", "NestJS", "PostgreSQL", "AWS", "CI/CD"],
    translations: {
      fr: {
        title: "Developpement d'applications sur mesure",
        description:
          "Du cadrage fonctionnel au deploiement, nous batissons des applications web et mobiles alignees sur vos processus metier.",
        highlights: [
          "Architecture scalable et securisee",
          "Parcours utilisateurs optimises",
          "Livraison continue et documentation",
        ],
        deliverables: [
          "Audit technique et fonctionnel",
          "Backlog priorise",
          "Design system et maquettes",
          "Application prete a deployer",
        ],
        duration: "6 a 16 semaines selon complexite",
        category: "Product Engineering",
        modules: ["MVP end-to-end", "Plateformes internes", "Portails clients"],
        recommended: ["Direction produit", "Equipe tech en capacite limitee", "Scale-ups et ETI"],
      },
      en: {
        title: "Tailor-made product engineering",
        description:
          "From discovery to deployment we build web and mobile apps aligned with your business workflows.",
        highlights: [
          "Secure, scalable architecture",
          "Optimised user journeys",
          "Continuous delivery and documentation",
        ],
        deliverables: [
          "Technical and functional audit",
          "Prioritised backlog",
          "Design system and mockups",
          "Deployment-ready application",
        ],
        duration: "6 to 16 weeks depending on scope",
        category: "Product Engineering",
        modules: ["End-to-end MVP", "Internal platforms", "Customer portals"],
        recommended: ["Product leadership", "Tech teams lacking capacity", "Scale-ups and mid-size firms"],
      },
    },
  },
  {
    slug: "automatisation-processus",
    impact: "efficiency",
    stack: ["Temporal", "n8n", "Make", "Azure Functions", "Power Automate"],
    translations: {
      fr: {
        title: "Automatisation et integrations",
        description:
          "Nous connectons vos outils, deployons des workflows intelligents et automatisons vos taches repetitives.",
        highlights: [
          "APIs REST/GraphQL",
          "ETL et orchestrations de jobs",
          "Connecteurs ERP/CRM/BI",
        ],
        deliverables: [
          "Cartographie des processus",
          "Blueprint d'architecture",
          "Scraping et bots RPA",
          "Dashboards de pilotage",
        ],
        duration: "4 a 10 semaines",
        category: "Automation & Data",
        modules: ["Robots RPA", "Pipelines data", "Connecteurs metier"],
        recommended: ["Direction operations", "Equipe finance", "Unites support"],
      },
      en: {
        title: "Automation & integrations",
        description:
          "We connect your tools, deploy smart workflows and automate repetitive tasks.",
        highlights: [
          "REST/GraphQL APIs",
          "Job orchestration and ETL",
          "ERP/CRM/BI connectors",
        ],
        deliverables: [
          "Process mapping",
          "Architecture blueprint",
          "Web scraping & RPA bots",
          "Executive dashboards",
        ],
        duration: "4 to 10 weeks",
        category: "Automation & Data",
        modules: ["RPA bots", "Data pipelines", "Business connectors"],
        recommended: ["Operations leaders", "Finance teams", "Support units"],
      },
    },
  },
  {
    slug: "design-ux-ui",
    impact: "experience",
    stack: ["Figma", "Storybook", "Radix", "Tailwind"],
    translations: {
      fr: {
        title: "Design UX/UI et design system",
        description:
          "Des interfaces premium, accessibles et fidele a votre identite, pretes a etre integrees.",
        highlights: [
          "Recherche utilisateur et ateliers",
          "Wireframes haute fidelite",
          "Design system tokenise",
        ],
        deliverables: [
          "Parcours et user stories",
          "Moodboard et univers visuel",
          "Maquettes responsives",
          "Kit d'assets et guidelines",
        ],
        duration: "3 a 6 semaines",
        category: "Product Design",
        modules: ["Design system", "Refonte UI", "Prototype interactif"],
        recommended: ["Direction design", "Product managers", "Founders"],
      },
      en: {
        title: "UX/UI design & design systems",
        description:
          "Premium, accessible interfaces faithful to your brand and ready for implementation.",
        highlights: [
          "User research & co-creation workshops",
          "High-fidelity wireframes",
          "Tokenised design systems",
        ],
        deliverables: [
          "User journeys & stories",
          "Moodboard and visual universe",
          "Responsive mockups",
          "Assets kit and guidelines",
        ],
        duration: "3 to 6 weeks",
        category: "Product Design",
        modules: ["Design system", "UI redesign", "Interactive prototype"],
        recommended: ["Design leadership", "Product managers", "Founders"],
      },
    },
  },
  {
    slug: "modernisation-refonte",
    impact: "scale",
    stack: ["Next.js", "Remix", "Docker", "Kubernetes", "Vercel"],
    translations: {
      fr: {
        title: "Refonte et modernisation",
        description:
          "Nous modernisons vos applications existantes pour ameliorer performances, UX et maintenabilite.",
        highlights: [
          "Audit code et infrastructure",
          "Migration progressive",
          "Renforcement securite et observabilite",
        ],
        deliverables: [
          "Rapport d'audit detaille",
          "Roadmap de migration",
          "Refonte UI/UX",
          "Pipeline CI/CD securise",
        ],
        duration: "6 a 12 semaines",
        category: "Modernisation",
        modules: ["Audit flash", "Migration progressive", "Observabilite renforcee"],
        recommended: ["DSI", "Responsables produit", "Equipes tech internes"],
      },
      en: {
        title: "Modernisation & platform redesign",
        description:
          "We upgrade existing apps to boost performance, UX and maintainability.",
        highlights: [
          "Code and infrastructure audit",
          "Progressive migration",
          "Security and observability hardening",
        ],
        deliverables: [
          "Detailed audit report",
          "Migration roadmap",
          "UI/UX redesign",
          "Hardened CI/CD pipeline",
        ],
        duration: "6 to 12 weeks",
        category: "Modernisation",
        modules: ["Rapid audit", "Progressive migration", "Observability uplift"],
        recommended: ["CIO/CTO", "Product owners", "Internal tech teams"],
      },
    },
  },
  {
    slug: "maintenance-support",
    impact: "efficiency",
    stack: ["Sentry", "Datadog", "Grafana", "AWS", "Vercel"],
    translations: {
      fr: {
        title: "Maintenance et support applicatif",
        description:
          "Nous prenons en charge l'exploitation, la supervision et l'amelioration continue de vos produits digitaux.",
        highlights: [
          "SLA personnalises",
          "Monitoring 24/7",
          "Plan d'amelioration continue",
        ],
        deliverables: [
          "Runbook operationnel",
          "Revue mensuelle",
          "Backlog d'evolution",
          "Rapports de performance",
        ],
        duration: "Engagement de 3 a 12 mois",
        category: "Reliability",
        modules: ["SLA custom", "Monitoring & alerting", "Roadmap run"],
        recommended: ["COO", "CTO", "Product ops"],
      },
      en: {
        title: "Application maintenance & support",
        description:
          "We operate, monitor and continuously improve your digital products.",
        highlights: [
          "Custom SLAs",
          "24/7 monitoring",
          "Continuous improvement plan",
        ],
        deliverables: [
          "Operational runbook",
          "Monthly review",
          "Improvement backlog",
          "Performance reports",
        ],
        duration: "Engagement 3 to 12 months",
        category: "Reliability",
        modules: ["Custom SLA", "Monitoring & alerting", "Run roadmap"],
        recommended: ["COO", "CTO", "Product ops"],
      },
    },
  },
]

export function getServices(locale: Locale) {
  return servicesContent.map((service) => ({
    slug: service.slug,
    impact: service.impact,
    stack: service.stack,
    ...service.translations[locale],
  }))
}

export function getServiceEntry(slug: string) {
  return servicesContent.find((service) => service.slug === slug)
}

export function getService(locale: Locale, slug: string) {
  const entry = getServiceEntry(slug)
  if (!entry) return undefined
  return {
    slug: entry.slug,
    impact: entry.impact,
    stack: entry.stack,
    ...entry.translations[locale],
  }
}

export function getServiceSlugs() {
  return servicesContent.map((service) => service.slug)
}

export const services = getServices("fr")