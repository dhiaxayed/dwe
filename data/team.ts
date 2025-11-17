import { Locale } from "@/lib/i18n"

export type TeamMember = {
  name: string
  role: string
  image: string
  linkedin?: string
  github?: string
  expertise: string[]
  location: string
  bio: string
}

const teamContent: Record<Locale, TeamMember[]> = {
  fr: [
    {
      name: "Meriem Ben Salah",
      role: "CEO & Product Strategist",
      bio: "Vision produit, accompagnement des dirigeants et pilotage des projets strategiques.",
      image: "/team/meriem-ben-salah.jpg",
      linkedin: "https://www.linkedin.com/in/meriem-bensalah",
      expertise: ["Product strategy", "Discovery", "Roadmap"],
      location: "Tunis",
    },
    {
      name: "Youssef Amri",
      role: "Lead Engineer",
      bio: "Architecture logicielle, scalabilite cloud et coaching technique de l'equipe.",
      image: "/team/youssef-amri.jpg",
      linkedin: "https://www.linkedin.com/in/youssef-amri",
      github: "https://github.com/youssefamri",
      expertise: ["Architecture", "DevOps", "Coaching"],
      location: "Paris",
    },
    {
      name: "Nesrine Aouini",
      role: "Senior UI/UX Designer",
      bio: "Design systems premium, experiences utilisateur accessibles et test utilisateur.",
      image: "/team/nesrine-aouini.jpg",
      linkedin: "https://www.linkedin.com/in/nesrine-aouini",
      expertise: ["Design system", "Research", "Design ops"],
      location: "Lyon",
    },
    {
      name: "Karim Hrizi",
      role: "Software Engineer",
      bio: "Developpement full-stack, integrations API et automatisation des workflows.",
      image: "/team/karim-hrizi.jpg",
      linkedin: "https://www.linkedin.com/in/karim-hrizi",
      github: "https://github.com/karimhrizi",
      expertise: ["Full-stack", "API", "Automation"],
      location: "Tunis",
    },
    {
      name: "Sarra Kefi",
      role: "QA & Delivery Manager",
      bio: "Qualite logicielle, plans de tests, audits d'accessibilite et mise en production securisee.",
      image: "/team/sarra-kefi.jpg",
      linkedin: "https://www.linkedin.com/in/sarra-kefi",
      expertise: ["QA", "Delivery", "Release management"],
      location: "Remote",
    },
    {
      name: "Oussama Fakhfakh",
      role: "Data & Automation Engineer",
      bio: "Integrations data, dashboards et robots RPA pour automatiser les operations.",
      image: "/team/oussama-fakhfakh.jpg",
      linkedin: "https://www.linkedin.com/in/oussama-fakhfakh",
      github: "https://github.com/ofakhfakh",
      expertise: ["Data", "RPA", "Analytics"],
      location: "Montreal",
    },
  ],
  en: [
    {
      name: "Meriem Ben Salah",
      role: "CEO & Product Strategist",
      bio: "Product vision, executive alignment and leadership of strategic programs.",
      image: "/team/meriem-ben-salah.jpg",
      linkedin: "https://www.linkedin.com/in/meriem-bensalah",
      expertise: ["Product strategy", "Discovery", "Roadmap"],
      location: "Tunis",
    },
    {
      name: "Youssef Amri",
      role: "Lead Engineer",
      bio: "Software architecture, cloud scalability and technical coaching for the team.",
      image: "/team/youssef-amri.jpg",
      linkedin: "https://www.linkedin.com/in/youssef-amri",
      github: "https://github.com/youssefamri",
      expertise: ["Architecture", "DevOps", "Coaching"],
      location: "Paris",
    },
    {
      name: "Nesrine Aouini",
      role: "Senior UI/UX Designer",
      bio: "Premium design systems, accessible experiences and user testing initiatives.",
      image: "/team/nesrine-aouini.jpg",
      linkedin: "https://www.linkedin.com/in/nesrine-aouini",
      expertise: ["Design system", "Research", "Design ops"],
      location: "Lyon",
    },
    {
      name: "Karim Hrizi",
      role: "Software Engineer",
      bio: "Full-stack development, API integrations and workflow automation.",
      image: "/team/karim-hrizi.jpg",
      linkedin: "https://www.linkedin.com/in/karim-hrizi",
      github: "https://github.com/karimhrizi",
      expertise: ["Full-stack", "API", "Automation"],
      location: "Tunis",
    },
    {
      name: "Sarra Kefi",
      role: "QA & Delivery Manager",
      bio: "Quality assurance, test plans, accessibility audits and secure releases.",
      image: "/team/sarra-kefi.jpg",
      linkedin: "https://www.linkedin.com/in/sarra-kefi",
      expertise: ["QA", "Delivery", "Release management"],
      location: "Remote",
    },
    {
      name: "Oussama Fakhfakh",
      role: "Data & Automation Engineer",
      bio: "Data integrations, analytics dashboards and RPA bots for operations.",
      image: "/team/oussama-fakhfakh.jpg",
      linkedin: "https://www.linkedin.com/in/oussama-fakhfakh",
      github: "https://github.com/ofakhfakh",
      expertise: ["Data", "RPA", "Analytics"],
      location: "Montreal",
    },
  ],
}

export function getTeam(locale: Locale) {
  return teamContent[locale]
}

export const team = getTeam("fr")