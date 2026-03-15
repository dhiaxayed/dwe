"use client"

import { motion } from "framer-motion"

import { getValues } from "@/data/values"
import { useI18n } from "@/lib/i18n"
import { Icon } from "@/components/common/icon"
import { fadeInUp, staggerChildren } from "@/lib/motion"

const copy = {
  fr: {
    badge: "Culture",
    title: "Nos convictions pour livrer mieux",
    intro: "Une culture produit exigeante, des feedbacks constants et la recherche du detail qui fait la difference.",
  },
  en: {
    badge: "Culture",
    title: "The principles that keep our delivery sharp",
    intro: "A demanding product mindset, constant feedback loops and the care for the detail that matters.",
  },
}

export function ValuesSection() {
  const { locale } = useI18n()
  const safeLocale = locale === "en" ? "en" : "fr"
  const labels = copy[safeLocale]
  const values = getValues(safeLocale) ?? getValues("fr")

  return (
    <section id="valeurs" className="bg-background py-24">
      <div className="container space-y-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-highlight-foreground">{labels.badge}</p>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold">{labels.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{labels.intro}</p>
        </div>

        <motion.div
          key={`values-grid-${safeLocale}`}
          className="grid gap-6 md:grid-cols-2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerChildren(0.1, 0.12)}
        >
          {values.map((value) => (
            <motion.div
              key={value.title}
              variants={fadeInUp}
              className="relative overflow-hidden rounded-3xl border border-border/40 bg-card/80 p-8 shadow-soft"
            >
              <div className="absolute -right-24 top-0 h-36 w-36 rounded-full bg-secondary/10 blur-3xl" />
              <div className="relative flex flex-col gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary-foreground">
                  <Icon name={value.icon} className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
