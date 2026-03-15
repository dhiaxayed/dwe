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
      name: "Mohamed Hedi Gaoua",
      role: "CEO",
      bio: "Contribue au developpement des initiatives de l'équipe avec un focus sur la qualite d'execution.",
      image: "/hedi.jpg",
      linkedin: "https://www.linkedin.com/in/mohamed-hedi-gaoua-7235bb253/",
      expertise: ["Execution", "Operations", "Suivi"],
      location: "Tunisie",
    },
    {
      name: "Dhia Ayed",
      role: "CO-FOUNDER",
      bio: "Intervient sur les projets du l'équipe et assure la collaboration avec les clients.",
      image: "/dhia.jpg",
      linkedin: "https://www.linkedin.com/in/dhia-ayed/",
      expertise: ["Conseil", "Collaboration", "Delivery"],
      location: "Tunisie",
    },
    {
      name: "Nidhal Haouari",
      role: "CO-FOUNDER",
      bio: "Participe a la conception et au suivi des missions avec une approche orientee impact.",
      image: "/nidhal.jpg",
      linkedin: "https://www.linkedin.com/in/nidhal-haouari-b1801124b/",
      expertise: ["Strategie", "Execution", "Coordination"],
      location: "Tunisie",
    },
    
  ],
  en: [
    {
      name: "Mohamed Hedi Gaoua",
      role: "CEO",
      bio: "Contributes to studio initiatives with a strong focus on execution quality.",
      image: "/hedi.jpg",
      linkedin: "https://www.linkedin.com/in/mohamed-hedi-gaoua-7235bb253/",
      expertise: ["Execution", "Operations", "Follow-through"],
      location: "Tunisia",
    },
    {
      name: "Dhia Ayed",
      role: "CO-FOUNDER",
      bio: "Contributes to studio engagements and supports close collaboration with clients.",
      image: "/dhia.jpg",
      linkedin: "https://www.linkedin.com/in/dhia-ayed/",
      expertise: ["Advisory", "Collaboration", "Delivery"],
      location: "Tunisia",
    },
    {
      name: "Nidhal Haouari",
      role: "CO-FOUNDER",
      bio: "Supports mission design and follow-through with an impact-oriented approach.",
      image: "/nidhal.jpg",
      linkedin: "https://www.linkedin.com/in/nidhal-haouari-b1801124b/",
      expertise: ["Strategy", "Execution", "Coordination"],
      location: "Tunisia",
    },
    
  ],
}

export function getTeam(locale: Locale) {
  return teamContent[locale]
}

export const team = getTeam("fr")