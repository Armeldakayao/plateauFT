"use client"
import React from 'react'





import { useRef } from "react"
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion"


export function BackgroundAnimated({
  gridSpeed = 60,
  gridSize = 40,
  bubbleCount = 20, // plus de bulles
}: {
  gridSpeed?: number
  gridSize?: number
  bubbleCount?: number
}) {
  const gridRef = useRef<HTMLDivElement>(null)
  const colorCycle = useMotionValue(0)

  useAnimationFrame((t) => {
    // Déplacement continu de la grille
    if (gridRef.current) {
      const offset = ((t / 1000) * gridSpeed) % gridSize
      gridRef.current.style.backgroundPosition = `${-offset}px ${-offset}px`
    }
    colorCycle.set((t / 1000) % 1)
  })

  const color = useTransform(colorCycle, [0, 0.33, 0.66, 1], [
    "rgba(99,102,241,0.15)", // indigo
    "rgba(139,92,246,0.15)", // purple
    "rgba(236,72,153,0.15)", // pink
    "rgba(99,102,241,0.15)", // retour indigo
  ])

  // Génération de bulles aléatoires
  const bubbles = Array.from({ length: bubbleCount }).map((_, i) => {
    const size = Math.floor(Math.random() * 50) + 15 // 15px à 65px
    const left = Math.random() * 100
    const duration = Math.random() * 12 + 10 // 10s à 22s
    const delay = Math.random() * 5
    const opacity = Math.random() * 0.5 + 0.3 // 0.3 à 0.8
    return { id: i, size, left, duration, delay, opacity }
  })

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Grille animée */}
      <motion.div
        ref={gridRef}
        className="absolute inset-0"
        style={{
          backgroundSize: `${gridSize}px ${gridSize}px`,
          backgroundImage: color.get
            ? color.get() &&
              `linear-gradient(to right, ${color.get()} 1px, transparent 1px),
               linear-gradient(to bottom, ${color.get()} 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(99,102,241,0.15) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(99,102,241,0.15) 1px, transparent 1px)`,
          backgroundPosition: `-${Math.random() * gridSize}px -${Math.random() * gridSize}px`,
        }}
      />

      {/* Bulles flottantes */}
      {bubbles.map(({ id, size, left, duration, delay, opacity }) => (
        <motion.span
          key={id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: size,
            height: size,
            left: `${left}%`,
            bottom: -100,
            opacity,
          }}
          initial={{ y: 0, scale: 1 }}
          animate={{ y: "-120vh", scale: 1.2, opacity: [opacity, opacity / 2, 0] }}
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



// export function GridBackground({
//   speed = 50, // pixels par seconde
//   size = 40,  // taille de la grille (px)
//   color = "#8080800f" // couleur des lignes
// }: {
//   speed?: number
//   size?: number
//   color?: string
// }) {
//   const ref = useRef<HTMLDivElement>(null)

//   // Défilement continu : on met à jour la position via useAnimationFrame
//   useAnimationFrame((t) => {
//     if (ref.current) {
//       const offset = ((t / 1000) * speed) % size // boucle infinie
//       ref.current.style.backgroundPosition = `${-offset}px ${-offset}px`
//     }
//   })

//   return (
//     <div
//       ref={ref}
//       className="absolute inset-0 z-0"
//       style={{
//         backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px),
//                           linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
//         backgroundSize: `${size}px ${size}px`,
//         backgroundPosition: `-${Math.random() * size}px -${Math.random() * size}px`, // démarre quelque part
//       }}
//     />
//   )
// }

// export function BackgroundAnimated({
//   gridSpeed = 60,
//   gridSize = 40,
//   gridColor = "rgba(0,0,0,0.1)",
//   bubbleCount = 8,
// }: {
//   gridSpeed?: number
//   gridSize?: number
//   gridColor?: string
//   bubbleCount?: number
// }) {
//   const gridRef = useRef<HTMLDivElement>(null)

//   // Animation de la grille (translation infinie)
//   useAnimationFrame((t) => {
//     if (gridRef.current) {
//       const offset = ((t / 1000) * gridSpeed) % gridSize
//       gridRef.current.style.backgroundPosition = `${-offset}px ${-offset}px`
//     }
//   })

//   // Génère des bulles aléatoires
//   const bubbles = Array.from({ length: bubbleCount }).map((_, i) => {
//     const size = Math.floor(Math.random() * 40) + 20
//     const left = Math.random() * 100
//     const duration = Math.random() * 10 + 12
//     const delay = Math.random() * 5
//     return { id: i, size, left, duration, delay }
//   })

//   return (
//     <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
//       {/* Grille animée */}
//       <div
//         ref={gridRef}
//         className="absolute inset-0"
//         style={{
//           backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px),
//                             linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
//           backgroundSize: `${gridSize}px ${gridSize}px`,
//           backgroundPosition: `-${Math.random() * gridSize}px -${Math.random() * gridSize}px`,
//         }}
//       />

//       {/* Bulles flottantes */}
//       {bubbles.map(({ id, size, left, duration, delay }) => (
//         <motion.span
//           key={id}
//           className="absolute rounded-full bg-blue-400/30"
//           style={{
//             width: size,
//             height: size,
//             left: `${left}%`,
//             bottom: -100,
//           }}
//           initial={{ y: 0, opacity: 0.6, scale: 1 }}
//           animate={{ y: "-120vh", opacity: [0.6, 0.3, 0], scale: 1.2 }}
//           transition={{
//             duration,
//             delay,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//         />
//       ))}
//     </div>
//   )
// }

export default function Layout({ children }: { children: React.ReactNode }) {
  // Génère des bulles avec des paramètres aléatoires
  const bubbles = Array.from({ length: 8 }).map((_, i) => {
    const size = Math.floor(Math.random() * 40) + 20 // taille 20px à 60px
    const left = Math.random() * 100 // position horizontale %
    const duration = Math.random() * 10 + 12 // 12s à 22s
    const delay = Math.random() * 5 // décalage animation
    return { id: i, size, left, duration, delay }
  })

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
      {/* Conteneur bulles en arrière-plan */}
     <div className="absolute inset-0 z-0 overflow-hidden">
  <BackgroundAnimated />
</div>

      {children}
    </div>
  )
}
