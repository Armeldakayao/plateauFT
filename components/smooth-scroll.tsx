"use client"

import { useEffect, useState, type ReactNode } from "react"
import { initLenis } from "@/lib/lenis"

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<any>(null)

  useEffect(() => {
    const lenisInstance = initLenis()
    setLenis(lenisInstance)

    return () => {
      lenisInstance.destroy()
    }
  }, [])

  return <>{children}</>
}

