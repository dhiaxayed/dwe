"use client"

import { type HTMLMotionProps, motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion"
import { type MotionStyle } from "framer-motion"
import { type ReactNode, type PointerEvent as ReactPointerEvent, useCallback } from "react"

import { usePrefersMotion } from "@/lib/use-prefers-motion"
import { cn } from "@/lib/utils"

// Wrapper around motion.div that gives cards a gentle parallax hover.
type TiltCardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: ReactNode
  intensity?: number
  glare?: boolean
}

// We expose intensity and glare so every section can tune the effect.
export function TiltCard({
  children,
  className,
  intensity = 12,
  glare = true,
  style,
  ...props
}: TiltCardProps) {
  const prefersMotion = usePrefersMotion()
  // Pointer positions are stored as MotionValues so springs can animate smoothly.
  const pointerX = useMotionValue(0.5)
  const pointerY = useMotionValue(0.5)

  const xSpring = useSpring(pointerX, { stiffness: 200, damping: 20, mass: 0.2 })
  const ySpring = useSpring(pointerY, { stiffness: 200, damping: 20, mass: 0.2 })

  // Convert pointer offsets into rotation for the card surface.
  const rotateX = useTransform(ySpring, [0, 1], [intensity, -intensity])
  const rotateY = useTransform(xSpring, [0, 1], [-intensity, intensity])
  const xPercent = useTransform(xSpring, (value) => `${value * 100}%`)
  const yPercent = useTransform(ySpring, (value) => `${value * 100}%`)
  // The radial gradient simulates a moving light source when hover is active.
  const glareGradient = useMotionTemplate`radial-gradient(240px circle at ${xPercent} ${yPercent}, rgba(255, 255, 255, 0.18), transparent 60%)`

  // Track the pointer relative to the card to drive tilt and glare.
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

  const baseStyle = (style as MotionStyle | undefined) ?? {}
  // Respect reduced motion settings by bypassing the 3D transforms.
  const motionStyle: MotionStyle | undefined = prefersMotion
    ? {
        ...baseStyle,
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }
    : (style as MotionStyle | undefined)

  return (
    // motion.div lets us reuse this wrapper on any block-level element.
    <motion.div
      className={cn("group relative will-change-transform", className)}
      style={motionStyle}
      onPointerMove={prefersMotion ? handlePointerMove : undefined}
      onPointerLeave={prefersMotion ? handlePointerLeave : undefined}
      onPointerDown={prefersMotion ? (event) => event.preventDefault() : undefined}
      whileHover={prefersMotion ? { scale: 1.01 } : undefined}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      {...props}
    >
      {prefersMotion && glare && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundImage: glareGradient, mixBlendMode: "screen" }}
        />
      )}
      {children}
    </motion.div>
  )
}
