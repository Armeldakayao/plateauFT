"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

const badgeSuccessVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-green-500 text-white hover:bg-green-600",
        outline: "text-green-600 border border-green-600 hover:bg-green-50",
        secondary: "bg-green-100 text-green-800 hover:bg-green-200",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

export interface BadgeSuccessProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeSuccessVariants> {}

function BadgeSuccess({ className, variant, ...props }: BadgeSuccessProps) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={cn(badgeSuccessVariants({ variant }), className)}
      {...props}
    />
  )
}

export { BadgeSuccess, badgeSuccessVariants }
