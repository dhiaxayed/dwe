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
    stack: ["Strategie produit", "Innovation digitale", "Growth marketing", "Transformation agile", "Go-to-market"],
    translations: {
      fr: {
        title: "Création de produits digitaux sur mesure",
        description:
          "De la vision stratégique au lancement, nous créons des produits digitaux qui transforment vos idées en avantages compétitifs durables et en croissance mesurable.",
        highlights: [
          "Accélération du time-to-market",
          "Expérience utilisateur qui fidélise et convertit",
          "Scalabilité pour accompagner votre croissance",
        ],
        deliverables: [
          "Étude de marché et cadrage stratégique",
          "Parcours utilisateurs validés",
          "Produit prêt au lancement",
          "Plan de croissance et KPIs de succès",
        ],
        duration: "6 a 16 semaines selon complexite",
        category: "Product Engineering",
        modules: ["Lancement de produit digital", "Plateforme de fidélisation", "Portail client innovant"],
        recommended: ["Direction produit", "Equipe tech en capacite limitee", "Scale-ups et ETI"],
      },
      en: {
        title: "Custom digital product creation",
        description:
          "From strategic vision to launch, we build digital products that turn your ideas into lasting competitive advantages and measurable growth.",
        highlights: [
          "Faster time-to-market",
          "User experience that drives loyalty and conversion",
          "Built to scale with your ambitions",
        ],
        deliverables: [
          "Market study and strategic scoping",
          "Validated user journeys",
          "Launch-ready product",
          "Growth plan and success KPIs",
        ],
        duration: "6 to 16 weeks depending on scope",
        category: "Product Engineering",
        modules: ["Digital product launch", "Loyalty platform", "Innovative customer portal"],
        recommended: ["Product leadership", "Tech teams lacking capacity", "Scale-ups and mid-size firms"],
      },
    },
  },
  {
    slug: "automatisation-processus",
    impact: "efficiency",
    stack: ["Lean management", "Business intelligence", "Process mining", "Excellence opérationnelle", "Change management"],
    translations: {
      fr: {
        title: "Automatisation et intelligence opérationnelle",
        description:
          "Nous éliminons les tâches à faible valeur ajoutée, connectons vos outils et libérons vos équipes pour qu'elles se concentrent sur la stratégie et l'innovation.",
        highlights: [
          "Réduction des coûts opérationnels jusqu'à 60%",
          "Décisions éclairées grâce aux données en temps réel",
          "Agilité organisationnelle renforcée",
        ],
        deliverables: [
          "Diagnostic des gisements de productivité",
          "Feuille de route d'optimisation",
          "Workflows automatisés opérationnels",
          "Tableaux de bord décisionnels",
        ],
        duration: "4 a 10 semaines",
        category: "Automation & Data",
        modules: ["Excellence opérationnelle", "Intelligence décisionnelle", "Intégration de l'écosystème métier"],
        recommended: ["Direction operations", "Equipe finance", "Unites support"],
      },
      en: {
        title: "Automation & operational intelligence",
        description:
          "We eliminate low-value tasks, connect your tools and free your teams to focus on strategy and innovation.",
        highlights: [
          "Operational cost reduction up to 60%",
          "Smarter decisions powered by real-time data",
          "Enhanced organizational agility",
        ],
        deliverables: [
          "Productivity opportunity assessment",
          "Optimization roadmap",
          "Operational automated workflows",
          "Executive decision dashboards",
        ],
        duration: "4 to 10 weeks",
        category: "Automation & Data",
        modules: ["Operational excellence", "Decision intelligence", "Business ecosystem integration"],
        recommended: ["Operations leaders", "Finance teams", "Support units"],
      },
    },
  },
  {
    slug: "design-ux-ui",
    impact: "experience",
    stack: ["Brand strategy", "Design thinking", "UX research", "Conversion optimization"],
    translations: {
      fr: {
        title: "Design d'expérience et identité de marque",
        description:
          "Nous créons des expériences digitales mémorables qui renforcent votre image de marque, augmentent l'engagement et convertissent vos visiteurs en clients fidèles.",
        highlights: [
          "Taux de conversion en hausse mesurable",
          "Expérience de marque cohérente et premium",
          "Engagement utilisateur multiplié",
        ],
        deliverables: [
          "Stratégie d'expérience utilisateur",
          "Identité visuelle digitale",
          "Interfaces haute conversion",
          "Guide de marque et standards",
        ],
        duration: "3 a 6 semaines",
        category: "Product Design",
        modules: ["Expérience de marque digitale", "Parcours de conversion optimisés", "Innovation d'interface"],
        recommended: ["Direction design", "Product managers", "Founders"],
      },
      en: {
        title: "Experience design & brand identity",
        description:
          "We craft memorable digital experiences that strengthen your brand, boost engagement and convert visitors into loyal customers.",
        highlights: [
          "Measurable conversion rate uplift",
          "Consistent, premium brand experience",
          "Multiplied user engagement",
        ],
        deliverables: [
          "User experience strategy",
          "Digital brand identity",
          "High-conversion interfaces",
          "Brand guide and standards",
        ],
        duration: "3 to 6 weeks",
        category: "Product Design",
        modules: ["Digital brand experience", "Optimized conversion journeys", "Interface innovation"],
        recommended: ["Design leadership", "Product managers", "Founders"],
      },
    },
  },
  {
    slug: "modernisation-refonte",
    impact: "scale",
    stack: ["Conduite du changement", "Stratégie digitale", "Performance business", "Innovation continue", "Digital roadmap"],
    translations: {
      fr: {
        title: "Transformation et modernisation digitale",
        description:
          "Nous transformons vos outils existants en leviers de croissance pour gagner en performance, en agilité et en avantage concurrentiel.",
        highlights: [
          "Performance et réactivité décuplées",
          "Expérience utilisateur repensée pour fidéliser",
          "Résilience et pérennité garanties",
        ],
        deliverables: [
          "Diagnostic de maturité digitale",
          "Stratégie de transformation",
          "Refonte de l'expérience utilisateur",
          "Plan de déploiement progressif",
        ],
        duration: "6 a 12 semaines",
        category: "Modernisation",
        modules: ["Diagnostic express", "Transformation progressive", "Pilotage de la performance"],
        recommended: ["DSI", "Responsables produit", "Equipes tech internes"],
      },
      en: {
        title: "Digital transformation & modernization",
        description:
          "We turn your existing tools into growth levers for better performance, agility and competitive advantage.",
        highlights: [
          "Dramatically improved performance and responsiveness",
          "Reimagined user experience that builds loyalty",
          "Guaranteed resilience and longevity",
        ],
        deliverables: [
          "Digital maturity assessment",
          "Transformation strategy",
          "User experience redesign",
          "Progressive deployment plan",
        ],
        duration: "6 to 12 weeks",
        category: "Modernisation",
        modules: ["Express diagnostic", "Progressive transformation", "Performance management"],
        recommended: ["CIO/CTO", "Product owners", "Internal tech teams"],
      },
    },
  },
  {
    slug: "maintenance-support",
    impact: "efficiency",
    stack: ["Business continuity", "Performance KPIs", "Amélioration continue", "Risk management", "SLA management"],
    translations: {
      fr: {
        title: "Continuité et évolution de vos produits digitaux",
        description:
          "Nous assurons la performance, la fiabilité et l'évolution continue de vos produits pour que vous restiez concentrés sur votre cœur de métier.",
        highlights: [
          "Disponibilité garantie et zéro interruption",
          "Évolution continue alignée sur vos objectifs business",
          "Visibilité complète sur la performance et le ROI",
        ],
        deliverables: [
          "Stratégie de continuité sur mesure",
          "Revue de performance mensuelle",
          "Roadmap d'évolution continue",
          "Rapports d'impact business",
        ],
        duration: "Engagement de 3 a 12 mois",
        category: "Reliability",
        modules: ["Garantie de disponibilité", "Suivi proactif", "Évolution stratégique"],
        recommended: ["COO", "CTO", "Product ops"],
      },
      en: {
        title: "Digital product continuity & evolution",
        description:
          "We ensure the performance, reliability and continuous evolution of your products so you stay focused on your core business.",
        highlights: [
          "Guaranteed uptime and zero disruption",
          "Continuous evolution aligned with your business goals",
          "Full visibility on performance and ROI",
        ],
        deliverables: [
          "Tailored continuity strategy",
          "Monthly performance review",
          "Continuous evolution roadmap",
          "Business impact reports",
        ],
        duration: "Engagement 3 to 12 months",
        category: "Reliability",
        modules: ["Uptime guarantee", "Proactive monitoring", "Strategic evolution"],
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