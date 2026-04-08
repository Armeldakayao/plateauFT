// "use client"

// import { useEffect, useRef } from "react"

// export default function GradientAnimation() {
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     const resizeCanvas = () => {
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight
//     }

//     resizeCanvas()
//     window.addEventListener("resize", resizeCanvas)

//     let time = 0

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height)

//       // Create animated gradient
//       const gradient = ctx.createRadialGradient(
//         canvas.width / 2 + Math.sin(time * 0.01) * 100,
//         canvas.height / 2 + Math.cos(time * 0.008) * 80,
//         0,
//         canvas.width / 2,
//         canvas.height / 2,
//         Math.max(canvas.width, canvas.height) / 2,
//       )

//       const hue1 = (time * 0.5) % 360
//       const hue2 = (time * 0.3 + 120) % 360
//       const hue3 = (time * 0.4 + 240) % 360

//       gradient.addColorStop(0, `hsla(${hue1}, 70%, 60%, 0.1)`)
//       gradient.addColorStop(0.5, `hsla(${hue2}, 70%, 60%, 0.05)`)
//       gradient.addColorStop(1, `hsla(${hue3}, 70%, 60%, 0.02)`)

//       ctx.fillStyle = gradient
//       ctx.fillRect(0, 0, canvas.width, canvas.height)

//       time += 1
//       requestAnimationFrame(animate)
//     }

//     animate()

//     return () => {
//       window.removeEventListener("resize", resizeCanvas)
//     }
//   }, [])

//   return (
//     <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ background: "transparent" }} />
//   )
// }
// components/horizontal-lines-animation.tsx
"use client"

import { useEffect, useRef } from "react"

export default function HorizontalLinesAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    const lines: { y: number; speed: number }[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      lines.length = 0
      for (let i = 0; i < 20; i++) {
        lines.push({
          y: Math.random() * canvas.height,
          speed: 0.2 + Math.random() * 0.8,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.08)"
      ctx.lineWidth = 1

      for (const line of lines) {
        ctx.beginPath()
        ctx.moveTo(0, line.y)
        ctx.lineTo(canvas.width, line.y)
        ctx.stroke()

        line.y += line.speed
        if (line.y > canvas.height) {
          line.y = 0
        }
      }

      animationFrameId = requestAnimationFrame(draw)
    }

    resizeCanvas()
    draw()
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  )
}
