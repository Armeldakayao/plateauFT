"use client"

import { CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SuccessMessageProps {
  message: string
  className?: string
}

export function SuccessMessage({ message, className }: SuccessMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className={cn("bg-green-50 border border-green-200 text-green-800 rounded-md p-4 flex items-start", className)}
    >
      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
      <div>
        <p className="font-medium">{message}</p>
      </div>
    </motion.div>
  )
}
