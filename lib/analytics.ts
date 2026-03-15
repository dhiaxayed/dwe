type AnalyticsPayload = Record<string, unknown>

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>
    gtag?: (...args: unknown[]) => void
    plausible?: (eventName: string, options?: { props?: AnalyticsPayload }) => void
  }
}

function isBrowser() {
  return typeof window !== "undefined"
}

export function trackEvent(name: string, payload: AnalyticsPayload = {}) {
  if (!name || typeof name !== "string") return

  if (process.env.NODE_ENV !== "production") {
    console.debug(`[analytics] ${name}`, payload)
  }

  if (!isBrowser()) return

  const eventPayload = { event: name, ...payload }

  // GTM / dataLayer
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push(eventPayload)
  }

  // GA4 gtag
  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload)
  }

  // Plausible custom events
  if (typeof window.plausible === "function") {
    window.plausible(name, { props: payload })
  }
}
