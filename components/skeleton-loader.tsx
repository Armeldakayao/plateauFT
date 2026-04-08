"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SkeletonProps {
  className?: string
  variant?: "text" | "circular" | "rectangular" | "card"
  lines?: number
  animate?: boolean
}

export function Skeleton({ className, variant = "rectangular", lines = 1, animate = true }: SkeletonProps) {
  const baseClasses = "bg-gradient-to-r from-muted via-muted/50 to-muted rounded-md"

  const variantClasses = {
    text: "h-4 w-full",
    circular: "rounded-full",
    rectangular: "h-4",
    card: "h-32 w-full",
  }

  const shimmerAnimation = animate
    ? {
        backgroundPosition: ["200% 0", "-200% 0"],
      }
    : {}

  const shimmerTransition = animate
    ? {
        duration: 2,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }
    : {}

  if (variant === "text" && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            className={cn(
              baseClasses,
              variantClasses.text,
              i === lines - 1 && "w-3/4", // Last line shorter
              className,
            )}
            animate={shimmerAnimation}
            transition={shimmerTransition}
            style={{
              backgroundImage: animate
                ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
                : undefined,
              backgroundSize: animate ? "200% 100%" : undefined,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <motion.div
      className={cn(baseClasses, variantClasses[variant], className)}
      animate={shimmerAnimation}
      transition={shimmerTransition}
      style={{
        backgroundImage: animate
          ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)"
          : undefined,
        backgroundSize: animate ? "200% 100%" : undefined,
      }}
    />
  )
}

// Pre-built skeleton components for common use cases
export function CardSkeleton() {
  return (
    <div className="p-6 space-y-4 border rounded-lg">
      <div className="flex items-center space-x-4">
        <Skeleton variant="circular" className="w-12 h-12" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>
      <Skeleton variant="text" lines={3} />
    </div>
  )
}

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg">
          <Skeleton variant="circular" className="w-8 h-8" />
          <Skeleton className="h-4 flex-1" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  )
}

export function ListSkeleton({ items = 3 }: { items?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: items }).map((_, i) => (
        <div key={i} className="flex items-start space-x-4 p-4 border rounded-lg">
          <Skeleton variant="circular" className="w-10 h-10" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  )
}
