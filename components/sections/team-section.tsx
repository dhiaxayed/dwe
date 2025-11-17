"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Github, Linkedin } from "lucide-react"
import { motion } from "framer-motion"

import { getTeam } from "@/data/team"
import { useI18n } from "@/lib/i18n"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { fadeIn, fadeInUp, staggerChildren } from "@/lib/motion"
import { getInitials } from "@/lib/utils"

const copy = {
  fr: {
    badge: "Equipe",
    title: "Un collectif hybride pour conjuguer strategie, design et engineering",
    intro:
      "Une equipe resserree, presente entre Tunis, Paris et Montreal. Leads seniors et talents en devenir, tous engages pour livrer des produits qui comptent.",
    expertiseLabel: "Expertises",
    languageSince: "Membre depuis 2023",
  },
  en: {
    badge: "Team",
    title: "A hybrid collective combining strategy, design and engineering",
    intro:
      "A tight-knit team based in Tunis, Paris and Montreal. Senior leads and rising talents committed to products that matter.",
    expertiseLabel: "Expertise",
    languageSince: "Member since 2023",
  },
}

export function TeamSection() {
  const { locale } = useI18n()
  const labels = copy[locale]
  const team = getTeam(locale)
  const highlight = useMemo(() => team.slice(0, 3).map((member) => member.name), [team])

  return (
    <section id="equipe" className="border-y border-border/30 bg-background py-28">
      <div className="container space-y-14">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={staggerChildren(0.12, 0.12)}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={fadeInUp} className="text-xs font-semibold uppercase tracking-[0.3em] text-highlight-foreground">
            {labels.badge}
          </motion.p>
          <motion.h2 variants={fadeInUp} className="mt-3 text-balance font-display text-4xl font-semibold">
            {labels.title}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-muted-foreground">
            {labels.intro}
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerChildren(0.12, 0.1)}
        >
          {team.map((member) => (
            <motion.div
              key={member.name}
              variants={fadeIn()}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <TeamCard member={member} featured={highlight.includes(member.name)} labels={labels} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

type TeamCardProps = {
  member: ReturnType<typeof getTeam>[number]
  featured: boolean
  labels: typeof copy["fr"]
}

function TeamCard({ member, featured, labels }: TeamCardProps) {
  return (
    <Card className="h-full overflow-hidden">
      <CardHeader className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Avatar className={featured ? "h-16 w-16 ring-2 ring-primary/50" : "h-14 w-14"}>
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-semibold text-foreground">{member.name}</CardTitle>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{member.role}</p>
            <Badge variant="outline" className="mt-2 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.3em]">
              {member.location}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{member.bio}</p>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col justify-between gap-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">{labels.expertiseLabel}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {member.expertise.map((skill) => (
              <span key={skill} className="rounded-full border border-border/40 px-3 py-1">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3">
          {member.linkedin ? (
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" asChild>
              <Link href={member.linkedin} target="_blank" rel="noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </Button>
          ) : null}
          {member.github ? (
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" asChild>
              <Link href={member.github} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
          ) : null}
          <div className="ml-auto text-right text-xs text-muted-foreground">
            <p>{labels.languageSince}</p>
            <p>{member.location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
