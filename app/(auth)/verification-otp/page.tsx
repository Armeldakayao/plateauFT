

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
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
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
import { BackgroundAnimated } from "@/app/(admin-auth)/admin-auth/layout"

const formSchema = z.object({
  digit1: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit2: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit3: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit4: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit5: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
  digit6: z.string().length(1, "Requis").regex(/^\d$/, "Seuls les chiffres sont autorisés"),
})

export default function VerificationOTPPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes en secondes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [pendingData, setPendingData] = useState<{ email: string; userId: string } | null>(null)
  const [isLogin, setIsLogin] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
const {toast} = useToast()
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

  // Check if we're coming from login or registration
  useEffect(() => {
    const pendingLogin = sessionStorage.getItem("pendingLogin")
    const pendingRegistration = sessionStorage.getItem("pendingRegistration")

    if (pendingLogin) {
      setPendingData(JSON.parse(pendingLogin))
      setIsLogin(true)
    } else if (pendingRegistration) {
      setPendingData(JSON.parse(pendingRegistration))
      setIsLogin(false)
    } else {
      // No pending data, redirect to login
      router.push("/connexion")
    }
  }, [router])

  // Timer pour le countdown
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  // Formatage du temps
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
        // Login OTP verification
        await loginWithOtpMutation.mutateAsync(
          {
            email: pendingData.email,
            otpCode: otpCode,
          },
          {
            onSuccess: () => {
              toast({
                title: "Code verifiée !",
                description: "Votre code a été verifiée avec succès. Vous allez être redirigé vers votre tableau de bord.",
                
              })

              // setAlertMessage(
              //   "Félicitations ! Votre connexion a été vérifiée avec succès. Vous allez être redirigé vers votre tableau de bord.",
              // )
              // setShowSuccessAlert(true)

              // Clear pending data and redirect
              sessionStorage.removeItem("pendingLogin")
              setTimeout(() => {
                router.push("/dashboard/client/tableau-de-bord")
              }, 2000)
            },
          },
        )
      } else {
        // Registration OTP verification
        await verifyOtpMutation.mutateAsync(
          {
            code: otpCode,
            userId: pendingData.userId,
          },
          {
            onSuccess: () => {
              toast({
                title: "Code verifié !",
                description: "Votre code a été verifiéeavec succès. Bienvenue dans votre Espace !",
              })

              // setAlertMessage(
              //   "Excellent ! Votre compte a été vérifié et activé avec succès. Bienvenue dans l'Espace Citoyen !",
              // )
              // setShowSuccessAlert(true)

              // Clear pending data and redirect
              sessionStorage.removeItem("pendingRegistration")
              setTimeout(() => {
                router.push("/dashboard/client/tableau-de-bord")
              }, 2000)
            },
          },
        )
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Code incorrect ou expiré"
      setError(errorMessage)

      toast({
        title: "Erreur",
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

  // Gérer l'input avec validation des chiffres uniquement
  const handleDigitInput = (e: React.ChangeEvent<HTMLInputElement>, fieldName: string, index: number) => {
    const value = e.target.value

    // N'accepter que les chiffres
    if (!/^\d*$/.test(value)) {
      return
    }

    // Si un chiffre est entré, passer au champ suivant
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Gérer la suppression (backspace)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  // Gérer le collage de code
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
        description: "Un nouveau code a été renvoyé par email",
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
      <div className="min-h-screen flex items-center justify-center">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-lg mb-4">Chargement...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-background">
        

        {/* Header avec bouton retour */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Link
              href={isLogin ? "/connexion" : "/inscription"}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Retour</span>
            </Link>
          </motion.div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-10 flex items-center justify-center px-4 py-8 sm:py-12">
          <motion.div
            className="w-full max-w-md sm:max-w-lg bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Titre */}
            <motion.div
              className="text-center mb-8 sm:mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary leading-tight">
                Nous avons envoyé un code de vérification
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-2">
                Saisissez le code à 6 chiffres envoyé à <strong>{pendingData.email}</strong>
              </p>
            </motion.div>

            {/* Message d'erreur */}
            {error && (
              <motion.div
                className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                {error}
              </motion.div>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Champs OTP */}
                <motion.div
                  className="flex justify-center gap-2 sm:gap-3 lg:gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
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
                                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-100 hover:bg-gray-200 focus:bg-white rounded-xl border-2 border-gray-200 focus:border-primary text-center text-lg sm:text-xl font-bold transition-all duration-200"
                                maxLength={1}
                                inputMode="numeric"
                                pattern="[0-9]*"
                                autoComplete="one-time-code"
                                onChange={(e) => {
                                  // Filtrer pour n'accepter que les chiffres
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
                          <FormMessage className="text-xs" />
                        </FormItem>
                      )}
                    />
                  ))}
                </motion.div>

                {/* Timer et lien de renvoi */}
                <motion.div
                  className="text-center space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-muted-foreground">
                    <span>Code valide pour</span>
                    <span className="font-mono font-bold text-primary">{formatTime(timeLeft)}</span>
                  </div>

                  {timeLeft > 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Vous n'avez pas reçu le code ?{" "}
                      <button
                        type="button"
                        onClick={resendCode}
                        className="text-primary font-semibold underline hover:no-underline transition-all"
                        disabled={isSubmitting || resendOtpMutation.isPending}
                      >
                        {resendOtpMutation.isPending ? "Envoi..." : "Renvoyer le code"}
                      </button>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={resendCode}
                      className="text-red-500 font-semibold underline hover:no-underline transition-all"
                      disabled={resendOtpMutation.isPending}
                    >
                      {resendOtpMutation.isPending ? "Envoi..." : "Code expiré - Renvoyer un nouveau code"}
                    </button>
                  )}
                </motion.div>

                {/* Bouton de confirmation */}
                <motion.div
                  className="flex justify-center pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    className="w-full sm:w-auto px-8 sm:px-16 bg-secondary hover:bg-secondary/90 rounded-xl py-3 sm:py-6 text-base sm:text-lg font-semibold transition-all duration-200 disabled:opacity-50 transform hover:scale-[1.02]"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Vérification...
                      </div>
                    ) : (
                      "Confirmer"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>

            {/* Indication de vérification automatique */}
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <p className="text-xs sm:text-sm text-muted-foreground">
                La vérification se fera automatiquement une fois tous les chiffres saisis
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <AlertDialogTitle>Vérification réussie !</AlertDialogTitle>
            </div>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessAlert(false)}>Continuer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Alert Dialog */}
      <AlertDialog open={showErrorAlert} onOpenChange={setShowErrorAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <AlertDialogTitle>Code invalide</AlertDialogTitle>
            </div>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorAlert(false)}>Réessayer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
