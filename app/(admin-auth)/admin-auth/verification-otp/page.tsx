"use client"

import type React from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, CheckCircle, AlertCircle, Shield, Timer } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLoginWithOtpMutation, useVerifyOtpMutation, useResendOtpMutation } from "@/hooks/auth/use-auth-mutations"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  digit1: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit2: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit3: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit4: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit5: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit6: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
})

export default function AdminVerificationOTPPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(120)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [pendingData, setPendingData] = useState<{ email: string; userId: string } | null>(null)
  const [isLogin, setIsLogin] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const { toast } = useToast()

  const loginWithOtpMutation = useLoginWithOtpMutation()
  const verifyOtpMutation = useVerifyOtpMutation()
  const resendOtpMutation = useResendOtpMutation()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      digit1: "",
      digit2: "",
      digit3: "",
      digit4: "",
      digit5: "",
      digit6: "",
    },
  })

  useEffect(() => {
    const pendingAdminLogin = sessionStorage.getItem("pendingAdminLogin")
    const pendingAdminRegistration = sessionStorage.getItem("pendingAdminRegistration")

    if (pendingAdminLogin) {
      setPendingData(JSON.parse(pendingAdminLogin))
      setIsLogin(true)
    } else if (pendingAdminRegistration) {
      setPendingData(JSON.parse(pendingAdminRegistration))
      setIsLogin(false)
    } else {
      router.push("/admin-auth/connexion")
    }
  }, [router])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!pendingData) return

    setIsSubmitting(true)
    setError("")

    const otpCode = Object.values(values).join("")

    try {
      if (isLogin) {
        await loginWithOtpMutation.mutateAsync(
          {
            email: pendingData.email,
            otpCode: otpCode,
          },
          {
            onSuccess: () => {
              toast({
                title: "Accès autorisé !",
                description: "Authentification administrateur réussie. Redirection vers le panneau d'administration...",
              })

              sessionStorage.removeItem("pendingAdminLogin")
              setTimeout(() => {
                router.push("/dashboard/admin")
              }, 2000)
            },
          },
        )
      } else {
        await verifyOtpMutation.mutateAsync(
          {
            code: otpCode,
            userId: pendingData.userId,
          },
          {
            onSuccess: () => {
              toast({
                title: "Compte administrateur vérifié !",
                description: "Votre compte administrateur a été activé avec succès.",
              })

              sessionStorage.removeItem("pendingAdminRegistration")
              setTimeout(() => {
                router.push("/dashboard/admin")
              }, 2000)
            },
          },
        )
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Code incorrect ou expiré"
      setError(errorMessage)

      toast({
        title: "Erreur d'authentification",
        description: errorMessage,
        variant: "destructive",
      })

      setAlertMessage(errorMessage)
      setShowErrorAlert(true)

      form.reset()
      inputRefs.current[0]?.focus()
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDigitInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, index: number) => {
    const value = e.target.value

    if (!/^\d*$/.test(value)) {
      return
    }

    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)

    if (pastedData.length === 6) {
      const digits = pastedData.split("")
      digits.forEach((digit, index) => {
        form.setValue(`digit${index + 1}` as keyof z.infer<typeof formSchema>, digit)
      })
      inputRefs.current[5]?.focus()
    }
  }

  const resendCode = async () => {
    try {
       //@ts-ignore
      await resendOtpMutation.mutateAsync()
      setTimeLeft(120)
      setError("")
      form.reset()
      inputRefs.current[0]?.focus()

      toast({
        title: "Code renvoyé !",
        description: "Un nouveau code de sécurité a été envoyé",
      })
    } catch (error: any) {
      const errorMessage = "Erreur lors du renvoi du code"
      setError(errorMessage)

      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }

  if (!pendingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-lg mb-4 text-white">Chargement...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            className="w-full max-w-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Authentification sécurisée</h1>
              <p className="text-slate-400">Vérification d'accès administrateur</p>
            </motion.div>

            <motion.div
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.div
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href={isLogin ? "/admin/connexion" : "/admin/inscription"}
                  className="inline-flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Link>
              </motion.div>

              <motion.div
                className="text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-xl font-semibold text-white mb-2">Code de sécurité envoyé</h2>
                <p className="text-slate-300">
                  Saisissez le code à 6 chiffres envoyé à <strong className="text-white">{pendingData.email}</strong>
                </p>
              </motion.div>

              {error && (
                <motion.div
                  className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-xl mb-6 text-sm"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  {error}
                </motion.div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <motion.div
                    className="flex justify-center gap-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    {[1, 2, 3, 4, 5, 6].map((digit, index) => (
                      <FormField
                        key={`digit${digit}`}
                        control={form.control}
                        name={`digit${digit}` as keyof z.infer<typeof formSchema>}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <motion.div whileFocus={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Input
                                  {...field}
                                  ref={(el) => {
                                    inputRefs.current[index] = el
                                  }}
                                  className="w-14 h-14 bg-white/10 border-white/20 text-white text-center text-xl font-bold rounded-xl focus:border-emerald-400 focus:ring-emerald-400/20 transition-all duration-200"
                                  maxLength={1}
                                  inputMode="numeric"
                                  pattern="[0-9]*"
                                  autoComplete="one-time-code"
                                  onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, "")
                                    field.onChange(value)
                                    handleDigitInput(e, `digit${digit}`, index)
                                  }}
                                  onKeyDown={(e) => handleKeyDown(e, index)}
                                  onPaste={handlePaste}
                                  disabled={isSubmitting}
                                />
                              </motion.div>
                            </FormControl>
                            <FormMessage className="text-xs text-red-400" />
                          </FormItem>
                        )}
                      />
                    ))}
                  </motion.div>

                  <motion.div
                    className="text-center space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                      <Timer className="w-4 h-4" />
                      <span>Code valide pour</span>
                      <span className="font-mono font-bold text-emerald-400">{formatTime(timeLeft)}</span>
                    </div>

                    {timeLeft > 0 ? (
                      <p className="text-sm text-slate-400">
                        Vous n'avez pas reçu le code ?{" "}
                        <button
                          type="button"
                          onClick={resendCode}
                          className="text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
                          disabled={isSubmitting || resendOtpMutation.isPending}
                        >
                          {resendOtpMutation.isPending ? "Envoi..." : "Renvoyer le code"}
                        </button>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={resendCode}
                        className="text-red-400 font-semibold hover:text-red-300 transition-colors"
                        disabled={resendOtpMutation.isPending}
                      >
                        {resendOtpMutation.isPending ? "Envoi..." : "Code expiré - Renvoyer un nouveau code"}
                      </button>
                    )}
                  </motion.div>

                  <motion.div
                    className="flex justify-center pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white h-12 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 transform hover:scale-[1.02]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Vérification...
                        </div>
                      ) : (
                        "Confirmer l'accès"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>

              <motion.div
                className="text-center mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
              >
                <p className="text-xs text-slate-400">
                  La vérification se fera automatiquement une fois tous les chiffres saisis
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              <AlertDialogTitle className="text-white">Accès autorisé !</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-slate-300">{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessAlert(false)} className="bg-green-600 hover:bg-green-700">
              Continuer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Alert Dialog */}
      <AlertDialog open={showErrorAlert} onOpenChange={setShowErrorAlert}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-400" />
              <AlertDialogTitle className="text-white">Code invalide</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-slate-300">{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorAlert(false)} className="bg-red-600 hover:bg-red-700">
              Réessayer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
