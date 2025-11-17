"use client"

import { useEffect, useState } from "react"

export function usePrefersMotion() {
  const [prefersMotion, setPrefersMotion] = useState(true)

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    const handler = () => setPrefersMotion(!mediaQuery.matches)
    handler()
    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [])

  return prefersMotion
}
