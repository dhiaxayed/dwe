"use client"

import { motion } from "framer-motion"

import { getFaqs } from "@/data/faqs"
import { useI18n } from "@/lib/i18n"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { fadeInUp } from "@/lib/motion"

const copy = {
  fr: {
    badge: "FAQ",
    title: "Questions frequentes",
    intro: "Transparence totale sur nos modalites de collaboration et notre capacite a livrer rapidement.",
  },
  en: {
    badge: "FAQ",
    title: "Frequently asked questions",
    intro: "Full transparency on the way we collaborate and how fast we deliver.",
  },
}

export function FaqSection() {
  const { locale } = useI18n()
  const labels = copy[locale]
  const faqs = getFaqs(locale)

  return (
    <section id="faq" className="bg-background py-24">
      <div className="container space-y-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-highlight-foreground">{labels.badge}</p>
          <h2 className="mt-3 text-balance font-display text-4xl font-semibold">{labels.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{labels.intro}</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInUp}
        >
          <Accordion type="single" collapsible className="grid gap-4">
            {faqs.map((faq, index) => (
                <AccordionItem key={faq.question} value={`faq-${index + 1}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
