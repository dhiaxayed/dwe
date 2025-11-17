import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">404</p>
        <h1 className="font-display text-4xl font-semibold">Cette page n’existe pas encore</h1>
        <p className="text-muted-foreground">
          La page que vous recherchez est introuvable ou a peut-être été déplacée.
        </p>
      </div>
      <Button asChild className="rounded-full px-6 py-5">
        <Link href="/">Retour à l’accueil</Link>
      </Button>
    </div>
  )
}
