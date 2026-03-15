import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import type { Transporter } from "nodemailer"
import type Mail from "nodemailer/lib/mailer"
import { z } from "zod"
import { readFileSync } from "fs"
import path from "path"

export const runtime = "nodejs"
export const maxDuration = 15

const normalizeValue = (value: unknown) => {
  if (typeof value === "string") return value.trim()
  if (typeof value === "number") return String(value).trim()
  return value
}

const optionalText = () =>
  z.preprocess((value) => {
    const normalized = normalizeValue(value)
    if (normalized === undefined || normalized === null) return undefined
    if (typeof normalized === "string" && normalized.length === 0) return undefined
    return normalized
  }, z.string().optional())

const requiredText = (min: number) =>
  z.preprocess((value) => normalizeValue(value), z.string().min(min))

const emailText = z.preprocess((value) => normalizeValue(value), z.string().email())

const contactSchema = z.object({
  fullname: requiredText(2),
  company: optionalText(),
  email: emailText,
  phone: optionalText(),
  project: requiredText(10),
  budget: optionalText(),
  locale: z
    .preprocess((value) => {
      const normalized = normalizeValue(value)
      return typeof normalized === "string" ? normalized.toLowerCase() : normalized
    }, z.enum(["fr", "en"]).default("fr"))
    .catch("fr"),
})

const emailCopy = {
  fr: {
    subject: "Votre demande a bien été reçue",
    preheader: "Merci pour votre confiance, nous revenons vers vous rapidement.",
    greeting: "Bonjour",
    intro: "Merci d'avoir contacté DWE Creation. Votre demande a bien été enregistrée et un membre de notre équipe va revenir vers vous dans les plus brefs délais.",
    recapTitle: "Récapitulatif partagé",
    messageLabel: "Votre besoin",
    closing: "Nous apprécions votre intérêt pour nos services. En attendant notre retour, n'hésitez pas à préparer les documents ou accès utiles pour accélérer notre atelier de cadrage.",
    signature: "L'équipe DWE Creation",
    heroCta: "Visiter notre site",
  },
  en: {
    subject: "We have received your request",
    preheader: "Thank you for reaching out — our team will follow up shortly.",
    greeting: "Hello",
    intro: "Thank you for contacting DWE Creation. Your request is logged and one of our team members will get back to you shortly.",
    recapTitle: "Summary",
    messageLabel: "Your project",
    closing: "We appreciate your interest in our studio. In the meantime, feel free to gather any materials that could help us accelerate the discovery workshop.",
    signature: "The DWE Creation team",
    heroCta: "Visit our site",
  },
}

const normalizedSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dwecreation.tn").replace(/\/$/, "")

type LogoAsset = {
  src: string
  attachment?: Mail.Attachment
}

function tryLoadLogoFromFile(fileName: string | undefined): LogoAsset | null {
  if (!fileName) return null
  const filePath = path.join(process.cwd(), "public", fileName)
  try {
    const buffer = readFileSync(filePath)
    const ext = path.extname(fileName).toLowerCase()
    const mime = ext === ".svg" ? "image/svg+xml" : ext === ".jpg" || ext === ".jpeg" ? "image/jpeg" : "image/png"
    const cid = `brand-logo-${Buffer.from(fileName).toString("hex")}`
    return {
      src: `cid:${cid}`,
      attachment: {
        filename: path.basename(fileName),
        content: buffer,
        contentType: mime,
        cid,
      },
    }
  } catch {
    return null
  }
}

function resolveLogoAsset(): LogoAsset {
  const filePreference = tryLoadLogoFromFile(process.env.BRAND_LOGO_FILE)
  if (filePreference) return filePreference

  const defaultFile = tryLoadLogoFromFile("dwe-logo.png")
  if (defaultFile) return defaultFile

  const hostedLogo = process.env.BRAND_LOGO_URL
  if (hostedLogo) {
    return { src: hostedLogo }
  }

  return { src: `${normalizedSiteUrl}/dwe-logo.png` }
}

const logoAsset = resolveLogoAsset()

const PUBLIC_CONTACT_EMAIL = "contact.dwecreation@gmail.com"
const PUBLIC_CONTACT_PHONE = "+216 26 320 486"

const smtpConfig = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASSWORD,
  from: process.env.MAIL_FROM,
  notify: process.env.CONTACT_NOTIFICATION_EMAIL ?? process.env.MAIL_FROM,
  logo: logoAsset.src,
  logoAttachment: logoAsset.attachment,
  siteUrl: normalizedSiteUrl,
  brand: process.env.BRAND_NAME ?? "DWE Creation",
  contactEmail: PUBLIC_CONTACT_EMAIL,
  contactPhone: PUBLIC_CONTACT_PHONE,
}

type MailerMode = "smtp" | "console"

type MailerContext = {
  transporter: Transporter | null
  mode: MailerMode
  reason?: string
}

const mailerContext: MailerContext = createMailer()

function createMailer(): MailerContext {
  if (smtpConfig.host && smtpConfig.user && smtpConfig.pass && smtpConfig.from) {
    return {
      transporter: nodemailer.createTransport({
        host: smtpConfig.host,
        port: smtpConfig.port,
        secure: Number(smtpConfig.port) === 465,
        auth: {
          user: smtpConfig.user,
          pass: smtpConfig.pass,
        },
        connectionTimeout: 4000,
        socketTimeout: 4000,
      }),
      mode: "smtp",
    }
  }

  if (process.env.NODE_ENV !== "production") {
    return {
      transporter: nodemailer.createTransport({
        streamTransport: true,
        newline: "unix",
        buffer: true,
      }),
      mode: "console",
      reason: "SMTP configuration missing, falling back to console transport.",
    }
  }

  return {
    transporter: null,
    mode: "smtp",
    reason: "SMTP configuration missing in production.",
  }
}

export async function POST(request: Request) {
  if (!mailerContext.transporter) {
    console.error("Contact email rejected:", mailerContext.reason)
    return NextResponse.json({ error: "MAILER_NOT_CONFIGURED" }, { status: 503 })
  }

  const json = await request.json().catch(() => null)
  if (!json) {
    return NextResponse.json({ error: "INVALID_BODY" }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: "INVALID_INPUT", details: parsed.error.flatten() }, { status: 422 })
  }

  const data = parsed.data
  const copy = emailCopy[data.locale]

  const html = renderTemplate({
    ...data,
    copy,
    logoUrl: smtpConfig.logo,
    siteUrl: smtpConfig.siteUrl,
    brand: smtpConfig.brand,
    contactEmail: smtpConfig.contactEmail,
    contactPhone: smtpConfig.contactPhone,
    locale: data.locale,
  })

  const plainText = renderPlainText({
    data,
    copy,
    brand: smtpConfig.brand,
    siteUrl: smtpConfig.siteUrl,
    contactEmail: smtpConfig.contactEmail,
    contactPhone: smtpConfig.contactPhone,
  })

  try {
    const attachments: Mail.Attachment[] = []
    if (smtpConfig.logoAttachment) {
      attachments.push(smtpConfig.logoAttachment)
    }

    const info = await mailerContext.transporter.sendMail({
      from: smtpConfig.from,
      to: data.email,
      bcc: smtpConfig.notify,
      replyTo: data.email,
      subject: copy.subject,
      html,
      text: plainText,
      attachments: attachments.length ? attachments : undefined,
    })

    if (mailerContext.mode === "console") {
      console.info("[contact] Email captured by console transport", {
        message: info.message?.toString?.(),
      })
    }

    return NextResponse.json({ ok: true, simulated: mailerContext.mode === "console" })
  } catch (error) {
    console.error("Contact email failed", error)
    return NextResponse.json({ error: "EMAIL_FAILED" }, { status: 500 })
  }
}

type TemplateContext = {
  fullname: string
  company?: string
  email: string
  phone?: string
  project: string
  budget?: string
  copy: typeof emailCopy["fr"]
  logoUrl?: string
  siteUrl: string
  brand: string
  contactEmail: string
  contactPhone: string
  locale: "fr" | "en"
}

function renderTemplate({ fullname, company, email, phone, project, budget, copy, logoUrl, siteUrl, brand, contactEmail, contactPhone, locale }: TemplateContext) {
  const infoRows = [
    { label: "Nom / Name", value: fullname },
    { label: "Organisation", value: company },
    { label: "Email", value: email },
    { label: "Téléphone / Phone", value: phone },
    { label: "Budget", value: budget },
  ].filter((item) => item.value)

  return `<!DOCTYPE html>
  <html lang="${locale}">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${copy.subject}</title>
      <style>
        :root { color-scheme: light dark; supported-color-schemes: light dark; }
        * { box-sizing: border-box; }
        body { width: 100% !important; height: 100%; margin: 0; background-color: #f2f4f7; color: #0f172a; font-family: 'Inter', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif; }
        a { color: #0ea5e9; }
        table { border-collapse: collapse; }
        img { border: none; }
        .preheader { display: none !important; visibility: hidden; opacity: 0; height: 0; width: 0; }
        .email-wrapper { width: 100%; background-color: #0a1224; padding: 48px 0; }
        .email-content { width: 100%; margin: 0 auto; }
        .email-body { width: 100%; background-color: transparent; }
        .email-body_inner { width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 32px; overflow: hidden; box-shadow: 0 45px 90px rgba(3, 7, 18, 0.25); }
        .masthead { background: linear-gradient(135deg, #030711, #131f44); padding: 40px 32px; text-align: center; color: #f8fafc; }
  .masthead_logo-wrap { display: inline-flex; align-items: center; justify-content: center; padding: 16px 20px; background: rgba(255,255,255,0.95); border-radius: 28px; box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 15px 35px rgba(2,6,23,0.45); margin-bottom: 20px; }
  .masthead_logo { width: 136px; border-radius: 18px; display: block; }
        .masthead_name { letter-spacing: 0.4em; text-transform: uppercase; font-size: 12px; color: rgba(248,250,252,0.7); margin: 0; }
        .masthead_title { margin: 12px 0 0; font-size: 26px; font-weight: 600; }
        .masthead_subtitle { margin: 10px auto 0; max-width: 420px; color: rgba(248,250,252,0.75); line-height: 1.6; }
        .content-cell { padding: 44px; line-height: 1.7; }
        .eyebrow { letter-spacing: 0.45em; font-size: 11px; text-transform: uppercase; color: #818cf8; margin: 0 0 18px; }
        .card { border: 1px solid #e2e8f0; border-radius: 24px; padding: 24px; margin-top: 28px; }
        .recap-title { margin: 0 0 18px; letter-spacing: 0.3em; text-transform: uppercase; font-size: 12px; color: #475569; }
        .recap-table { width: 100%; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; }
        .recap-table tr { border-bottom: 1px solid #e2e8f0; }
        .recap-table tr:last-child { border-bottom: none; }
        .recap-table td { padding: 10px 0; font-size: 14px; }
        .recap-table td:first-child { color: #94a3b8; }
        .project-bloc { background: linear-gradient(135deg, #0f172a, #1d4ed8); color: #e0f2fe; border-radius: 20px; padding: 20px; margin-top: 18px; }
        .timeline { width: 100%; margin-top: 12px; }
        .timeline-step { padding: 14px 0; border-bottom: 1px solid rgba(148,163,184,0.25); }
        .timeline-step:last-child { border-bottom: none; }
        .timeline-title { font-weight: 600; color: #0f172a; }
        .timeline-desc { margin: 6px 0 0; color: #475569; font-size: 14px; }
        .cta-btn { display: inline-flex; align-items: center; justify-content: center; padding: 14px 32px; border-radius: 999px; background: #0ea5e9; color: #fff !important; font-weight: 600; letter-spacing: 0.05em; text-decoration: none; margin-top: 32px; }
        .contact-grid { display: flex; flex-wrap: wrap; gap: 16px; margin-top: 28px; }
        .contact-chip { flex: 1 1 160px; border-radius: 18px; border: 1px solid #e2e8f0; padding: 16px; }
        .contact-chip span { display: block; font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase; color: #94a3b8; margin-bottom: 8px; }
        .contact-chip a { color: #0f172a; font-weight: 600; text-decoration: none; }
        .email-footer { width: 100%; margin: 0 auto; text-align: center; color: #94a3b8; font-size: 12px; padding: 28px 0; }
        @media only screen and (max-width: 620px) {
          .email-body_inner { width: 100% !important; border-radius: 0; }
          .content-cell { padding: 28px !important; }
          .contact-grid { flex-direction: column; }
        }
        @media (prefers-color-scheme: dark) {
          body { background-color: #05070f !important; color: #e2e8f0 !important; }
          .email-wrapper { background-color: #01030a !important; }
          .email-body_inner { background-color: #0f172a !important; color: #e2e8f0 !important; }
          .card { border-color: rgba(255,255,255,0.1); background: rgba(15,23,42,0.7); }
          .recap-table td:first-child { color: rgba(226,232,240,0.7); }
          .timeline-title { color: #e0f2fe; }
          .timeline-desc { color: rgba(226,232,240,0.75); }
          .contact-chip { border-color: rgba(255,255,255,0.12); }
        }
      </style>
    </head>
    <body>
      <span class="preheader">${copy.preheader}</span>
      <table class="email-wrapper" width="100%" role="presentation">
        <tr>
          <td align="center">
            <table class="email-content" width="100%" role="presentation">
              <tr>
                <td class="email-body">
                  <table class="email-body_inner" align="center" width="100%" role="presentation">
                    <tr>
                      <td class="masthead">
                        ${logoUrl ? `<span class="masthead_logo-wrap"><img src="${logoUrl}" alt="${brand} logo" class="masthead_logo" /></span>` : ``}
                        <p class="masthead_name">${brand}</p>
                        <p class="masthead_title">${copy.subject}</p>
                        <p class="masthead_subtitle">${copy.preheader}</p>
                      </td>
                    </tr>
                    <tr>
                      <td class="content-cell">
                        <p class="eyebrow">${locale === "fr" ? "Confirmation" : "Confirmation"}</p>
                        <p style="font-size:16px;margin-top:0;">${copy.greeting} <strong>${fullname}</strong>,</p>
                        <p>${copy.intro}</p>
                        <div class="card">
                          <p class="recap-title">${copy.recapTitle}</p>
                          <table class="recap-table" role="presentation">
                            ${infoRows
                              .map(
                                (row) => `<tr>
                                <td>${row.label}</td>
                                <td style="text-align:right;font-weight:600;color:#0f172a;">${row.value}</td>
                              </tr>`
                              )
                              .join("")}
                          </table>
                          <div class="project-bloc">
                            <p style="margin:0;letter-spacing:0.3em;text-transform:uppercase;font-size:11px;color:rgba(224,242,254,0.85);">${copy.messageLabel}</p>
                            <p style="margin:10px 0 0;font-size:15px;">${project}</p>
                          </div>
                        </div>
                        <div class="card" style="background: #f8fafc;">
                          <p class="recap-title" style="color:#0f172a;">${locale === "fr" ? "Plan d'engagement" : "Engagement plan"}</p>
                          <table class="timeline" role="presentation">
                            <tr class="timeline-step">
                              <td>
                                <div class="timeline-title">${locale === "fr" ? "Analyse & cadrage" : "Discovery"}</div>
                                <p class="timeline-desc">${locale === "fr" ? "Revue des éléments transmis, clarification des objectifs et des contraintes." : "We audit what you sent and clarify priorities & constraints."}</p>
                              </td>
                            </tr>
                            <tr class="timeline-step">
                              <td>
                                <div class="timeline-title">${locale === "fr" ? "Retour expert (24h)" : "Expert response (24h)"}</div>
                                <p class="timeline-desc">${locale === "fr" ? "Partage d'un premier plan d'action et des hypothèses technologiques." : "We share an actionable plan and potential tech directions."}</p>
                              </td>
                            </tr>
                            <tr class="timeline-step">
                              <td>
                                <div class="timeline-title">${locale === "fr" ? "Atelier 45 min" : "45-min workshop"}</div>
                                <p class="timeline-desc">${locale === "fr" ? "Session interactive pour finaliser le scope, les livrables et le planning." : "Interactive session to finalize scope, deliverables, and schedule."}</p>
                              </td>
                            </tr>
                          </table>
                        </div>
                        <p style="margin-top:32px;">${copy.closing}</p>
                        <p style="margin-top:18px;font-weight:600;">${copy.signature}</p>
                        <a class="cta-btn" href="${siteUrl}" target="_blank" rel="noreferrer">${copy.heroCta}</a>
                        <div class="contact-grid">
                          <div class="contact-chip">
                            <span>Email</span>
                            <a href="mailto:${contactEmail}">${contactEmail}</a>
                          </div>
                          <div class="contact-chip">
                            <span>${locale === "fr" ? "Téléphone" : "Phone"}</span>
                            <a href="tel:${contactPhone.replace(/\s/g, "")}">${contactPhone}</a>
                          </div>
                          <div class="contact-chip">
                            <span>Site</span>
                            <a href="${siteUrl}" target="_blank" rel="noreferrer">${siteUrl.replace(/^https?:\/\//, "")}</a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <table class="email-footer" width="100%" role="presentation">
                    <tr>
                      <td>
                        ${brand} · ${siteUrl.replace(/^https?:\/\//, "")}<br />
                        © ${new Date().getFullYear()} · Tous droits réservés / All rights reserved
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`
}

function renderPlainText({
  data,
  copy,
  brand,
  siteUrl,
  contactEmail,
  contactPhone,
}: {
  data: z.infer<typeof contactSchema>
  copy: typeof emailCopy["fr"]
  brand: string
  siteUrl: string
  contactEmail: string
  contactPhone: string
}) {
  const engagementSteps = data.locale === "fr"
    ? [
        "Analyse & cadrage – Revue des éléments transmis, clarification des objectifs et contraintes.",
        "Retour expert (24h) – Premier plan d'action et hypothèses technologiques.",
        "Atelier 45 min – Session interactive pour verrouiller scope, livrables et planning.",
      ]
    : [
        "Discovery – We review your inputs and clarify priorities and constraints.",
        "Expert response (24h) – You receive an actionable plan plus technology directions.",
        "45-min workshop – Interactive session to finalize scope, deliverables, and schedule.",
      ]

  return `${copy.greeting} ${data.fullname},

${copy.intro}

${copy.recapTitle}:
- ${copy.messageLabel}: ${data.project}
- Email: ${data.email}${data.company ? `
- ${data.locale === "fr" ? "Organisation" : "Organization"}: ${data.company}` : ""}${data.phone ? `
- ${data.locale === "fr" ? "Téléphone" : "Phone"}: ${data.phone}` : ""}${data.budget ? `
- Budget: ${data.budget}` : ""}

${data.locale === "fr" ? "Plan d'engagement" : "Engagement plan"}:
${engagementSteps.map((step) => `- ${step}`).join("\n")}

${copy.closing}
${copy.signature}

${data.locale === "fr" ? "Nous restons joignables" : "Reach us anytime"}:
- Email : ${contactEmail}
- ${data.locale === "fr" ? "Téléphone" : "Phone"} : ${contactPhone}
- Site : ${siteUrl}

${brand}`
}
