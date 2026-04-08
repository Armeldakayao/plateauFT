"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, Mail, RefreshCw } from "lucide-react"
import { useResendOtpMutation, useVerifyOtpCitizenMutation, useVerifyOtpMutation } from "@/hooks"


interface EmailVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  email: string
  onSuccess: () => void
}

export function EmailVerificationModal({ isOpen, onClose, email, onSuccess }: EmailVerificationModalProps) {
  const [verificationCode, setVerificationCode] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const verifyOtpMutation = useVerifyOtpCitizenMutation()
  const resendOtpMutation = useResendOtpMutation()

  const handleVerification = async () => {
    if (verificationCode.length === 6) {
      try {
        await verifyOtpMutation.mutateAsync({
          userId: email, // This should be the actual userId, but using email as fallback
          code: verificationCode,
        })
        setIsSuccess(true)
        setTimeout(() => {
          onSuccess()
          onClose()
          setIsSuccess(false)
          setVerificationCode("")
        }, 2000)
      } catch (error) {
        console.error("Verification error:", error)
      }
    }
  }

  const handleResendCode = async () => {
    try {
       //@ts-ignore
      await resendOtpMutation.mutateAsync({ userId: email })
    } catch (error) {
      console.error("Resend error:", error)
    }
  }

  const handleManualConfirmation = () => {
    setIsSuccess(true)
    setTimeout(() => {
      onSuccess()
      onClose()
      setIsSuccess(false)
      setVerificationCode("")
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="text-center">
            <DialogTitle className="text-xl font-semibold text-blue-700 mb-4">Vérification de l'email</DialogTitle>
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <p className="text-gray-600 mb-6">
              Un code de vérification a été envoyé à <br />
              <span className="font-medium text-gray-900">{email}</span>
            </p>
          </DialogHeader>

          <AnimatePresence mode="wait">
            {!isSuccess ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code de vérification</label>
                  <Input
                    placeholder="Entrez le code à 6 chiffres"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    className="text-center text-lg tracking-widest"
                    maxLength={6}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={handleVerification}
                    disabled={verificationCode.length !== 6 || verifyOtpMutation.isPending}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {verifyOtpMutation.isPending ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                    ) : null}
                    Vérifier
                  </Button>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="outline"
                    onClick={handleResendCode}
                    disabled={resendOtpMutation.isPending}
                    className="w-full bg-transparent"
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${resendOtpMutation.isPending ? "animate-spin" : ""}`} />
                    Renvoyer le code
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={handleManualConfirmation}
                    className="w-full text-gray-600 hover:text-gray-900"
                  >
                    Confirmation manuelle
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <Check className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-green-700 mb-2">Email vérifié !</h3>
                <p className="text-gray-600">Le compte a été confirmé avec succès</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
