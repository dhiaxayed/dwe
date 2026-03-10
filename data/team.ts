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
      name: "Hedi Gawa",
      role: "CEO",
      bio: "CEO et leader stratégique.",
      image: "/photo/hedi.jpg",
      linkedin: "https://www.linkedin.com/in/hedi-gawa",
      expertise: ["Leadership", "Strategy", "Management"],
      location: "Tunis",
    },
    {
      name: "Nidhal Haouari",
      role: "Co-Founder",
      bio: "Co-fondateur et expert technique.",
      image: "/photo/nidhal.jpg",
      linkedin: "https://www.linkedin.com/in/nidhal-haouari",
      expertise: ["Entrepreneurship", "Development", "Innovation"],
      location: "Tunis",
    },
    {
      name: "Dhia Ayed",
      role: "Co-Founder",
      bio: "Co-fondateur et visionnaire produit.",
      image: "/photo/dhia.jpg",
      linkedin: "https://www.linkedin.com/in/dhia-ayed",
      expertise: ["Product", "Growth", "Operations"],
      location: "Tunis",
    },
  ],
  en: [
    {
      name: "Hedi Gawa",
      role: "CEO",
      bio: "CEO and strategic leader.",
      image: "/photo/hedi.jpg",
      linkedin: "https://www.linkedin.com/in/hedi-gawa",
      expertise: ["Leadership", "Strategy", "Management"],
      location: "Tunis",
    },
    {
      name: "Nidhal Haouari",
      role: "Co-Founder",
      bio: "Co-founder and technical expert.",
      image: "/photo/nidhal.jpg",
      linkedin: "https://www.linkedin.com/in/nidhal-haouari",
      expertise: ["Entrepreneurship", "Development", "Innovation"],
      location: "Tunis",
    },
    {
      name: "Dhia Ayed",
      role: "Co-Founder",
      bio: "Co-founder and product visionary.",
      image: "/photo/dhia.jpg",
      linkedin: "https://www.linkedin.com/in/dhia-ayed",
      expertise: ["Product", "Growth", "Operations"],
      location: "Tunis",
    },
  ],
}

export function getTeam(locale: Locale) {
  return teamContent[locale]
}

export const team = getTeam("fr")