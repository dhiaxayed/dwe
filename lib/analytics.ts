export function trackEvent(name: string, payload: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[analytics] ${name}`, payload)
  }
  // TODO: plug into actual analytics provider (Vercel Web Analytics, GA4, etc.)
}
