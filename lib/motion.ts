// These shared motion presets keep timing consistent across the site.
import { Variants } from "framer-motion"

// Gentle upward reveal used for section intros and headlines.
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Helper that staggers nested animations so blocks enter in sequence.
export const staggerChildren = (delay: number = 0.1, stagger: number = 0.08) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: delay,
      staggerChildren: stagger,
    },
  },
})

// Direction aware fade that we reuse for timeline and card reveals.
export const fadeIn = (direction: "up" | "down" | "left" | "right" = "up") => {
  const distance = 24
  const axis = direction === "left" || direction === "right" ? "x" : "y"
  const value = direction === "left" || direction === "up" ? distance : -distance

  return {
    hidden: { opacity: 0, [axis]: value },
    visible: {
      opacity: 1,
      [axis]: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  } as Variants
}

// Adds subtle perspective to make hero copy feel more dimensional.
export const perspectiveReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    rotateX: -15,
    transformPerspective: 900,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transformPerspective: 900,
    transition: {
      duration: 0.7,
      ease: [0.2, 0.8, 0.2, 1],
    },
  },
}

// Slightly exaggerates motion with blur to highlight key stats and chips.
export const riseReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    skewY: 6,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

// Slow orbital loop for background blobs and decorative lights.
export const floatPulse: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    rotate: [0, 2, -1, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}
