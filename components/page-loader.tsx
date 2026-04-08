"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Loader from "./app-loader"

interface PageLoaderProps {
  children: React.ReactNode
  title: string
}

export default function PageLoader({ children, title }: PageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gradient-to-t from-primary to-secondary flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-6">
          {/* Livre animé */}
                   {/* <Loader /> */}

          {/* Texte animé */}
          <motion.h2
            className="text-white text-2xl font-semibold tracking-wide"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {title}
          </motion.h2>
          <motion.p
            className="text-white/60 text animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Chargement...
          </motion.p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  )
}
