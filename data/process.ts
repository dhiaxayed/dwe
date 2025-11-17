import { Locale } from "@/lib/i18n"

export type ProcessStep = {
  icon: string
  translations: Record<Locale, {
    title: string
    description: string
    deliverables: string[]
    duration: string
    outcome: string
    checkpoint: string
  }>
}

const processStepsContent: ProcessStep[] = [
  {
    icon: "search",
    translations: {
      fr: {
        title: "Decouverte",
        description: "Nous clarifions vos objectifs business, les irritants terrain et les KPIs qui guideront le projet.",
        deliverables: ["Kick-off strategique", "User interviews", "Priorisation des enjeux"],
        duration: "Semaine 1",
        outcome: "Vision cible partagee",
        checkpoint: "Validation sponsor",
      },
      en: {
        title: "Discovery",
        description: "We align on business goals, field pain points and KPIs that drive the engagement.",
        deliverables: ["Strategic kick-off", "User interviews", "Prioritised challenges"],
        duration: "Week 1",
        outcome: "Shared target vision",
        checkpoint: "Sponsor sign-off",
      },
    },
  },
  {
    icon: "workflow",
    translations: {
      fr: {
        title: "Cadrage UX",
        description: "Ateliers de co-construction, cartographie des parcours utilisateurs et redaction des user stories.",
        deliverables: ["Personas et parcours", "Backlog fonctionnel", "Architecture de l'information"],
        duration: "Semaines 2-3",
        outcome: "Backlog priorise",
        checkpoint: "Go roadmap",
      },
      en: {
        title: "UX framing",
        description: "Co-creation workshops, user journey mapping and user story drafting.",
        deliverables: ["Personas & journeys", "Functional backlog", "Information architecture"],
        duration: "Weeks 2-3",
        outcome: "Prioritised backlog",
        checkpoint: "Roadmap go",
      },
    },
  },
  {
    icon: "palette",
    translations: {
      fr: {
        title: "Design UI",
        description: "Creation d'un design system premium, maquettes haute fidelite et prototypes interactifs testables.",
        deliverables: ["Moodboard", "Design system tokenise", "Maquettes responsives"],
        duration: "Semaines 3-4",
        outcome: "Prototype teste",
        checkpoint: "Design review",
      },
      en: {
        title: "UI design",
        description: "Premium design system, high-fidelity mockups and testable interactive prototypes.",
        deliverables: ["Moodboard", "Tokenised design system", "Responsive mockups"],
        duration: "Weeks 3-4",
        outcome: "Validated prototype",
        checkpoint: "Design review",
      },
    },
  },
  {
    icon: "code",
    translations: {
      fr: {
        title: "Developpement",
        description: "Iterations agiles, revues de code systematiques et integration continue pour livrer de la valeur rapidement.",
        deliverables: ["Architecture technique", "Sprint demos", "Documentation technique"],
        duration: "Semaines 4-8",
        outcome: "Increments livrables",
        checkpoint: "Sprint review",
      },
      en: {
        title: "Engineering",
        description: "Agile iterations, systematic code reviews and continuous integration for fast value delivery.",
        deliverables: ["Technical architecture", "Sprint demos", "Technical documentation"],
        duration: "Weeks 4-8",
        outcome: "Ship-ready increments",
        checkpoint: "Sprint review",
      },
    },
  },
  {
    icon: "shield-check",
    translations: {
      fr: {
        title: "Tests et QA",
        description: "Tests unitaires, audit accessibilite, revues de performance et plan de remediation.",
        deliverables: ["Plan de tests", "Rapport d'accessibilite (WCAG 2.2)", "Tests E2E"],
        duration: "Semaines 6-8",
        outcome: "Parcours fiabilises",
        checkpoint: "Gate QA",
      },
      en: {
        title: "Testing & QA",
        description: "Unit tests, accessibility audit, performance review and remediation plan.",
        deliverables: ["Test plan", "Accessibility report (WCAG 2.2)", "End-to-end tests"],
        duration: "Weeks 6-8",
        outcome: "Hardened journeys",
        checkpoint: "QA gate",
      },
    },
  },
  {
    icon: "rocket",
    translations: {
      fr: {
        title: "Deploiement & MCO",
        description: "Mise en production securisee, transfert de competences et accompagnement run & amelioration continue.",
        deliverables: ["Playbook de deploiement", "Monitoring et alerting", "Roadmap d'evolution"],
        duration: "Semaines 8+",
        outcome: "Produit live & suivi",
        checkpoint: "Post-mortem",
      },
      en: {
        title: "Launch & run",
        description: "Secure go-live, knowledge transfer and continuous improvement support.",
        deliverables: ["Deployment playbook", "Monitoring & alerting", "Improvement roadmap"],
        duration: "Week 8+",
        outcome: "Live product & follow-up",
        checkpoint: "Post-mortem",
      },
    },
  },
]

export function getProcessSteps(locale: Locale) {
  return processStepsContent.map((step) => ({
    icon: step.icon,
    ...step.translations[locale],
  }))
}

export function getProcessEntries() {
  return processStepsContent
}

export const processSteps = getProcessSteps("fr")