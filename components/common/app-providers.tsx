"use client"

import { ReactNode } from "react"

import { I18nProvider } from "@/lib/i18n"
import { ThemeProvider } from "@/components/common/theme-provider"

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  )
}
