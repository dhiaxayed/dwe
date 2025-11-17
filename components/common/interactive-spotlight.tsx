"use client"

import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion"
import { type PointerEvent as ReactPointerEvent, type PropsWithChildren, useCallback } from "react"

import { usePrefersMotion } from "@/lib/use-prefers-motion"
import { cn } from "@/lib/utils"

// Creates a soft spotlight that follows the pointer and adds depth to content.
type InteractiveSpotlightProps = PropsWithChildren<{
  className?: string
  spotlightClassName?: string
  size?: number
  color?: string
  fallbackIntensity?: number
}>

export function InteractiveSpotlight({
  children,
  className,
  spotlightClassName,
  size = 420,
  color = "rgba(56, 189, 248, 0.22)",
  fallbackIntensity = 0.12,
}: InteractiveSpotlightProps) {
  const prefersMotion = usePrefersMotion()
  // MotionValues store the spotlight origin so springs can smooth the movement.
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)

  const xSpring = useSpring(pointerX, { stiffness: 160, damping: 18, mass: 0.25 })
  const ySpring = useSpring(pointerY, { stiffness: 160, damping: 18, mass: 0.25 })

  const xPercent = useTransform(xSpring, (value) => `${value * 100}%`)
  const yPercent = useTransform(ySpring, (value) => `${value * 100}%`)

  // Map the animated coordinates to a radial gradient background.
  const background = useMotionTemplate`radial-gradient(${size}px circle at ${xPercent} ${yPercent}, ${color}, transparent 65%)`

  // Track pointer movement over the wrapper to reposition the light.
  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      const bounds = event.currentTarget.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width
      const y = (event.clientY - bounds.top) / bounds.height

      pointerX.set(x)
      pointerY.set(y)
    },
    [pointerX, pointerY]
  )

  const handlePointerLeave = useCallback(() => {
    pointerX.stop()
    pointerY.stop()
    pointerX.set(0.5)
    pointerY.set(0.5)
  }, [pointerX, pointerY])

  return (
    <div
      className={cn("group relative overflow-hidden rounded-[inherit]", className)}
      onPointerMove={prefersMotion ? handlePointerMove : undefined}
      onPointerLeave={prefersMotion ? handlePointerLeave : undefined}
    >
      {prefersMotion ? (
        <motion.div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-[1px] opacity-0 transition-opacity duration-700 group-hover:opacity-100",
            spotlightClassName
          )}
          style={{ background }}
        />
      ) : (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute -inset-[1px] bg-gradient-to-br from-primary/30 via-transparent to-primary/5",
            spotlightClassName
          )}
          style={{ opacity: fallbackIntensity }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}
