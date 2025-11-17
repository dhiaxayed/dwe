import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "prefix" | "suffix"> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

const baseInputClasses = "flex h-12 w-full items-center rounded-2xl border border-input/70 bg-card/70 px-4 text-sm text-foreground shadow-inner transition-all duration-fast ease-crafted placeholder:text-muted-foreground focus-visible:border-primary/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", prefix, suffix, ...props }, ref) => {
    if (prefix || suffix) {
      return (
        <div className={cn(baseInputClasses, "gap-3 px-3", className)}>
          {prefix ? <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{prefix}</span> : null}
          <input
            type={type}
            ref={ref}
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            {...props}
          />
          {suffix ? <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{suffix}</span> : null}
        </div>
      )
    }

    return <input type={type} className={cn(baseInputClasses, className)} ref={ref} {...props} />
  }
)
Input.displayName = "Input"

export { Input }
