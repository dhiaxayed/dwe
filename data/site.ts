import { Locale } from "@/lib/i18n"

const CONTACT_EMAIL = "contact.dwecreation@gmail.com"
const CONTACT_PHONE = "+216 26 320 486"
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dwecreation.tn"

export type SiteContent = {
  name: string
  tagline: string
  description: string
  founded: string
  url: string
  email: string
  phone: string
  address: {
    city: string
    country: string
  }
  hero: {
    title: string
    subtitle: string
  }
  cta: {
    primary: { label: string; href: string }
    secondary: { label: string; href: string }
  }
  socials: {
    linkedin?: string
    github?: string
    twitter?: string
  }
  stack: string[]
  seo: {
    defaultTitle: string
    defaultDescription: string
  }
  marketingQuotes: string[]
}

type NavigationContent = {
  main: { label: string; href: string }[]
  footer: { label: string; href: string }[]
}

const siteContent: Record<Locale, SiteContent> = {
  fr: {
    name: "DWE Creation",
    tagline: "Solutions logicielles sur mesure",
    description:
      "DWE Creation accompagne les entreprises ambitieuses de la strategie digitale a la mise en production : discovery, design, developpement, automatisation et run.",
    founded: "2023",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
    address: {
      city: "Tunis",
      country: "Tunisie",
    },
    hero: {
      title: "Solutions logicielles sur mesure pour accelerer votre digitalisation",
      subtitle:
        "Nous concevons, developpons et operons des produits digitaux adaptes a vos processus metiers pour fiabiliser vos operations, reduire les frictions et creer de la valeur durable.",
    },
    cta: {
      primary: { label: "Contact", href: "/contact" },
      secondary: { label: "Parler a un expert", href: "/contact#prendre-rdv" },
    },
    socials: {
      linkedin: "https://www.linkedin.com/company/dwe-creation",
      github: "https://github.com",
      twitter: "https://twitter.com/dwecreation",
    },
    stack: [],
    seo: {
      defaultTitle: "DWE Creation - Solutions logicielles sur mesure",
      defaultDescription: "Une equipe hybride pour concevoir, developper et automatiser vos outils metiers.",
    },
    marketingQuotes: [
      "Chaque sprint livre un incremente exploitable, documente et pret a faire evoluer vos equipes.",
      "Nous parlons KPI, roadmap et scalabilite avant de parler features.",
      "Des talents seniors et des jeunes pousses reunis pour reagir vite et bien.",
    ],
  },
  en: {
    name: "DWE Creation",
    tagline: "Tailor-made software solutions",
    description:
      "DWE Creation guides ambitious companies from digital strategy to production: discovery, design, engineering, automation and run.",
    founded: "2023",
  url: SITE_URL,
  email: CONTACT_EMAIL,
  phone: CONTACT_PHONE,
    address: {
      city: "Tunis",
      country: "Tunisia",
    },
    hero: {
      title: "Custom software solutions to accelerate your digital agenda",
      subtitle:
        "We design, build and operate digital products aligned with your processes to remove friction, secure operations and create lasting value.",
    },
    cta: {
      primary: { label: "Contact", href: "/contact" },
      secondary: { label: "Talk to an expert", href: "/contact#prendre-rdv" },
    },
    socials: {
      linkedin: "https://www.linkedin.com/company/dwe-creation",
      github: "https://github.com",
      twitter: "https://twitter.com/dwecreation",
    },
    stack: [],
    seo: {
      defaultTitle: "DWE Creation - Tailor-made software solutions",
      defaultDescription: "A hybrid team to design, build and automate your business tools.",
    },
    marketingQuotes: [
      "Every sprint ships a usable, documented increment that grows with your team.",
      "We speak KPIs, roadmaps and scalability before talking about features.",
      "Experienced leads and rising talents working together to react fast and deliver better.",
    ],
  },
}

const navigationContent: Record<Locale, NavigationContent> = {
  fr: {
    main: [
      { label: "Services", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Process", href: "/process" },
      { label: "Equipe", href: "/equipe" },
    ],
    footer: [
      { label: "Mentions legales", href: "" },
      { label: "Politique de confidentialite", href: "" },
    ],
  },
  en: {
    main: [
      { label: "Services", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Process", href: "/process" },
      { label: "Team", href: "/equipe" },
    ],
    footer: [
      { label: "Legal notice", href: "" },
      { label: "Privacy policy", href: "" },
    ],
  },
}

export function getSite(locale: Locale): SiteContent {
  return siteContent[locale]
}

export function getNavigation(locale: Locale): NavigationContent {
  return navigationContent[locale]
}

export const site = getSite("fr")
export const navigation = getNavigation("fr")