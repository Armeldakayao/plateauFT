import { useRef } from "react"
import { useAnimationFrame, useMotionValue, useTransform, motion } from "framer-motion"

export function GridBackground({
  gridSize = 40,
  gridSpeed = 80, // vitesse de déplacement
  color1 = "rgba(255,255,255,0.05)", // couleur discrète
  color2 = "rgba(255,255,255,0.03)",
}: {
  gridSize?: number
  gridSpeed?: number
  color1?: string
  color2?: string
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

  // Couleur légèrement changeante pour un effet subtil
  const color = useTransform(colorCycle, [0, 0.5, 1], [color1, color2, color1])

  return (
    <motion.div
      ref={gridRef}
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundImage: color.get
          ? `linear-gradient(to right, ${color.get()} 1px, transparent 1px),
             linear-gradient(to bottom, ${color.get()} 1px, transparent 1px)`
          : `linear-gradient(to right, ${color1} 1px, transparent 1px),
             linear-gradient(to bottom, ${color1} 1px, transparent 1px)`,
      }}
    />
  )
}
