"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function LoadingBar() {
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    setIsLoading(true)
    setProgress(0)

    const progressSteps = [
      { progress: 20, delay: 100 },
      { progress: 40, delay: 200 },
      { progress: 65, delay: 350 },
      { progress: 85, delay: 500 },
      { progress: 95, delay: 650 },
      { progress: 100, delay: 800 },
    ]

    const timers = progressSteps.map(({ progress: targetProgress, delay }) =>
      setTimeout(() => setProgress(targetProgress), delay),
    )

    const finishTimer = setTimeout(() => {
      setTimeout(() => setIsLoading(false), 200)
    }, 900)

    return () => {
      timers.forEach(clearTimeout)
      clearTimeout(finishTimer)
    }
  }, [pathname])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-50 h-1"
        >
          <div className="h-full bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20" />
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary via-secondary to-primary shadow-lg"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
