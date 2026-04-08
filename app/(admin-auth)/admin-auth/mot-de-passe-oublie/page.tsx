"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle, AlertCircle, KeyRound } from "lucide-react"
import { useState } from "react"
import { useForgotPasswordMutation } from "@/hooks/auth/use-auth-mutations"
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
  email: z.string().email("Email invalide"),
})

export default function AdminMotDePasseOubliePage() {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const forgotPasswordMutation = useForgotPasswordMutation()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await forgotPasswordMutation.mutateAsync(values)

      toast({
        title: "Succès",
        description: "Un lien de réinitialisation a été envoyé à votre adresse email administrateur.",
      })

      setAlertMessage(
        `Un lien de réinitialisation sécurisé a été envoyé à ${values.email}. Vérifiez votre boîte de réception.`,
      )
      setShowSuccessAlert(true)
      setIsEmailSent(true)
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

  if (isEmailSent) {
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
                className="mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Link
                  href="/admin-auth/connexion"
                  className="flex items-center text-sm text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à la connexion
                </Link>
              </motion.div>

              <motion.div
                className="flex justify-center mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </motion.div>

              <motion.h2
                className="text-2xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Email envoyé !
              </motion.h2>
              <motion.p
                className="text-slate-300 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Nous avons envoyé un lien de réinitialisation sécurisé à{" "}
                <strong className="text-white">{form.getValues("email")}</strong>
              </motion.p>
              <motion.p
                className="text-sm text-slate-400 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Vérifiez votre boîte de réception et cliquez sur le lien pour réinitialiser votre mot de passe
                administrateur.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <Button
                  onClick={() => setIsEmailSent(false)}
                  variant="outline"
                  className="w-full mb-4 bg-white/10 border-white/20 text-white hover:bg-white/20 rounded-xl h-12"
                >
                  Essayer avec un autre email
                </Button>

                <Link href="/admin/connexion" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Retour à la connexion
                </Link>
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl mb-4">
                <KeyRound className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Récupération d'accès</h1>
              <p className="text-slate-400">Réinitialisation sécurisée du mot de passe administrateur</p>
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
                  href="/admin-auth/connexion"
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
                Saisissez votre adresse email administrateur pour recevoir un lien de réinitialisation sécurisé
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
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Email administrateur</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="admin@exemple.com"
                              {...field}
                              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-orange-400 focus:ring-orange-400/20 rounded-xl h-12"
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
                    transition={{ delay: 0.7 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white h-12 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]"
                      disabled={forgotPasswordMutation.isPending}
                    >
                      {forgotPasswordMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Envoi en cours...
                        </div>
                      ) : (
                        "Envoyer le lien de réinitialisation"
                      )}
                    </Button>
                  </motion.div>
                </form>
              </Form>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-slate-300">
                  Vous vous souvenez de votre mot de passe ?{" "}
                  <Link
                    href="/admin-auth/connexion"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                  >
                    Se connecter
                  </Link>
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
              <AlertDialogTitle className="text-white">Email envoyé !</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-slate-300">{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessAlert(false)} className="bg-green-600 hover:bg-green-700">
              Compris
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
              <AlertDialogTitle className="text-white">Erreur d'envoi</AlertDialogTitle>
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
