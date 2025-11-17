import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-semibold transition-all duration-fast ease-crafted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground shadow-elevated hover:bg-primary/90 hover:shadow-ring",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/85 hover:shadow-soft",
        outline: "border border-border/60 bg-transparent text-foreground hover:border-primary/60 hover:text-primary",
        ghost: "bg-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground",
        soft: "bg-highlight/15 text-highlight-foreground hover:bg-highlight/25",
        dark: "bg-foreground text-background hover:bg-foreground/90",
        link: "text-primary underline-offset-4 hover:text-primary/80 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 rounded-xl px-4 text-xs",
        lg: "h-12 rounded-2xl px-8 text-base",
        xl: "h-14 rounded-3xl px-10 text-base",
        icon: "h-11 w-11 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((
  { className, variant, size, asChild = false, ...props },
  ref
) => {
  const Comp = asChild ? Slot : "button"
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }
