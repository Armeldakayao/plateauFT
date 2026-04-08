"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "dots" | "pulse" | "bounce"
  className?: string
  text?: string
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
  xl: "w-12 h-12",
}

const textSizeClasses = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

export default function LoadingSpinner({
  size = "md",
  variant = "default",
  className = "",
  text,
}: LoadingSpinnerProps) {
  if (variant === "dots") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className={`bg-primary rounded-full ${size === "sm" ? "w-2 h-2" : size === "lg" ? "w-3 h-3" : "w-2.5 h-2.5"}`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
        {text && <span className={`text-muted-foreground ${textSizeClasses[size]}`}>{text}</span>}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <motion.div
          className={`bg-gradient-to-r from-primary to-secondary rounded-full ${sizeClasses[size]}`}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        {text && <span className={`text-muted-foreground ${textSizeClasses[size]}`}>{text}</span>}
      </div>
    )
  }

  if (variant === "bounce") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <motion.div
          className={`bg-primary rounded-full ${sizeClasses[size]}`}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        {text && <span className={`text-muted-foreground ${textSizeClasses[size]}`}>{text}</span>}
      </div>
    )
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className={`border-2 border-primary border-t-transparent rounded-full ${sizeClasses[size]}`}
      />
      {text && <span className={`text-muted-foreground ${textSizeClasses[size]}`}>{text}</span>}
    </div>
  )
}
