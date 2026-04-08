"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      <AnimatePresence>
        {toasts.map(({ id, title, description, action, variant, ...props }) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="mb-4"
          >
            <Toast
              {...props}
              variant={variant}
              className={`flex items-start justify-between p-4 rounded-xl shadow-lg ring-1 ring-black/5 
                ${variant === "destructive" ? "bg-red-600 text-white" : "bg-green-600 text-white"}
              `}
            >
              <div className="flex flex-col gap-1">
                {title && <ToastTitle className="font-semibold">{title}</ToastTitle>}
                {description && <ToastDescription className="text-sm opacity-90">{description}</ToastDescription>}
              </div>
              {action}
              <ToastClose className="ml-2" />
            </Toast>
          </motion.div>
        ))}
      </AnimatePresence>
      <ToastViewport className="fixed bottom-4 right-4 flex flex-col gap-2 w-96 max-w-full z-50" />
    </ToastProvider>
  )
}
