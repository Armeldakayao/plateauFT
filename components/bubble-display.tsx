import React from "react"
import { motion } from "framer-motion"

type Particle = {
  id: number
  size: number
  left: number
  duration: number
  delay: number
  type: "pixel" | "fragment" | "line"
  color: string
}

export function Bubbles({ count = 30 }: { count?: number }) {
  const colors = ["#0ff", "#0af", "#5ff", "#3bf"] // couleurs futuristes

  const particles: Particle[] = Array.from({ length: count }).map((_, i) => ({
    id: i,
    size: Math.random() * 8 + 4, // 4px à 12px
    left: Math.random() * 100,
    duration: Math.random() * 6 + 6, // 6 à 12 secondes
    delay: Math.random() * 5,
    type: ["pixel", "fragment", "line"][Math.floor(Math.random() * 3)] as Particle["type"],
    color: colors[Math.floor(Math.random() * colors.length)],
  }))

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {particles.map(({ id, size, left, duration, delay, type, color }) => (
        <motion.div
          key={id}
          className="absolute"
          style={{
            left: `${left}%`,
            bottom: -50,
            width: type === "line" ? 2 : size,
            height: type === "line" ? size * 3 : size,
            backgroundColor: color,
            borderRadius: type === "pixel" ? 2 : type === "fragment" ? 0 : 1,
            opacity: 0.7,
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: "-120vh",
            rotate: type === "fragment" ? 360 : 0,
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}
