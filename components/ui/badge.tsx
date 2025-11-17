import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-colors duration-fast ease-crafted",
  {
    variants: {
      variant: {
        accent: "border-transparent bg-accent/15 text-accent-foreground",
        primary: "border-transparent bg-primary/20 text-primary",
        secondary: "border-transparent bg-secondary/40 text-secondary-foreground",
        outline: "border-border/60 bg-transparent text-muted-foreground",
        muted: "border-transparent bg-muted/40 text-muted-foreground",
        signal: "border-transparent bg-highlight/20 text-highlight-foreground",
      },
    },
    defaultVariants: {
      variant: "accent",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(({ className, variant, ...props }, ref) => (
  <div ref={ref} className={cn(badgeVariants({ variant }), className)} {...props} />
))
Badge.displayName = "Badge"

export { Badge, badgeVariants }
