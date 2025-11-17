"use client"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Erreur</p>
        <h1 className="font-display text-4xl font-semibold">Oups… une erreur s’est produite</h1>
        <p className="text-muted-foreground">
          {error.message || "Quelque chose s’est mal passé. Vous pouvez réessayer l’opération."}
        </p>
      </div>
      <Button onClick={() => reset()} className="rounded-full px-6 py-5">
        Réessayer
      </Button>
    </div>
  )
}
