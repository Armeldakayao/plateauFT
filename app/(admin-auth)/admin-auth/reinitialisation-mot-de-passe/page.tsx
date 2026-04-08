"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, CheckCircle, AlertCircle, Lock } from "lucide-react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useResetPasswordMutation } from "@/hooks/auth/use-auth-mutations"
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

const formSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre",
      ),
    confirmPassword: z.string().min(8, "La confirmation du mot de passe est requise"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  })

export default function AdminResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [isSuccess, setIsSuccess] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const resetPasswordMutation = useResetPasswordMutation()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!token) {
      return
    }

    try {
      await resetPasswordMutation.mutateAsync({
        token,
        newPassword: values.newPassword,
      })

      toast({
        title: "Succès",
        description: "Votre mot de passe administrateur a été réinitialisé avec succès.",
      })

      setAlertMessage(
        "Excellent ! Votre mot de passe administrateur a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.",
      )
      setShowSuccessAlert(true)
      setIsSuccess(true)

      setTimeout(() => {
        router.push("/admin-auth/connexion")
      }, 3000)
    } catch (error: any) {
      const errorMessage = error?.message || "Une erreur est survenue"

      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })

      setAlertMessage(errorMessage)
      setShowErrorAlert(true)
    }
  }

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-8">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl">
            <h1 className="text-2xl font-bold mb-4 text-white">Lien invalide</h1>
            <p className="text-slate-300 mb-8">Le lien de réinitialisation est invalide ou a expiré.</p>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href="/admin/mot-de-passe-oublie">Demander un nouveau lien</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            className="w-full max-w-md text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              <motion.h2
                className="text-2xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Mot de passe réinitialisé !
              </motion.h2>
              <motion.p
                className="text-slate-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Votre mot de passe administrateur a été mis à jour avec succès. Vous allez être redirigé vers la page de
                connexion.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-12 rounded-xl"
                >
                  <Link href="/admin/connexion">Se connecter maintenant</Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="flex items-center justify-center min-h-screen p-4">
          <motion.div
            className="w-full max-w-md"
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Nouveau mot de passe</h1>
              <p className="text-slate-400">Sécurisation de votre accès administrateur</p>
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
                  href="/admin/connexion"
                  className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à la connexion
                </Link>
              </motion.div>

              <motion.p
                className="text-center text-slate-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Choisissez un nouveau mot de passe sécurisé pour votre compte administrateur
              </motion.p>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Nouveau mot de passe</FormLabel>
                          <FormControl>
                            <PasswordInput
                              placeholder="••••••••"
                              {...field}
                              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                          <div className="text-xs text-slate-400 mt-1">
                            Au moins 8 caractères avec une majuscule, une minuscule et un chiffre
                          </div>
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Confirmer le mot de passe</FormLabel>
                          <FormControl>
                            <PasswordInput
                              placeholder="••••••••"
                              {...field}
                              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white h-12 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]"
                      disabled={resetPasswordMutation.isPending}
                    >
                      {resetPasswordMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Mise à jour...
                        </div>
                      ) : (
                        "Mettre à jour le mot de passe"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>
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
              <AlertDialogTitle className="text-white">Mot de passe réinitialisé !</AlertDialogTitle>
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
              <AlertDialogTitle className="text-white">Erreur de réinitialisation</AlertDialogTitle>
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
