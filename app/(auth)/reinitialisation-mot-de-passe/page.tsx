"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
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
import { BackgroundAnimated } from "@/app/(admin-auth)/admin-auth/layout"

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

export default function ResetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const [isSuccess, setIsSuccess] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const resetPasswordMutation = useResetPasswordMutation()
const {toast} = useToast()
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
        description: "Votre mot de passe a été réinitialisé avec succès.",
        
      })

      setAlertMessage(
        "Félicitations ! Votre mot de passe a été réinitialisé avec succès. Vous allez être redirigé vers la page de connexion.",
      )
      setShowSuccessAlert(true)
      setIsSuccess(true)

      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/connexion")
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
      <div className="min-h-screen flex items-center justify-center p-8">
        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-bold mb-4">Lien invalide</h1>
          <p className="text-muted-foreground mb-8">Le lien de réinitialisation est invalide ou a expiré.</p>
          <Button asChild>
            <Link href="/mot-de-passe-oublie">Demander un nouveau lien</Link>
          </Button>
        </motion.div>
      </div>
    )
  }

  if (isSuccess) {
    return (
      <>
        <div className="min-h-screen flex flex-col md:flex-row">
           <BackgroundAnimated/>
          <motion.div
            className="w-full md:w-1/2 bg-[#06223A] relative overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image src="/images/auth-fond.jpg" alt="Succès" fill className="object-contain" />
          </motion.div>

          <div className="w-full md:w-1/2 flex items-center justify-center p-8">
            <motion.div
              className="w-full max-w-md text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </div>
              </motion.div>

              <motion.h2
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                Mot de passe réinitialisé !
              </motion.h2>
              <motion.p
                className="text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Votre mot de passe a été mis à jour avec succès. Vous allez être redirigé vers la page de connexion.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Button asChild className="w-full transition-all duration-200 hover:scale-105">
                  <Link href="/connexion">Se connecter maintenant</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        

        <div className="w-full  flex items-center justify-center p-8">
          <motion.div
            className="w-full max-w-xl bg-white rounded-xl p-8 shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <Link
                href="/connexion"
                className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la connexion
              </Link>
            </motion.div>

            <motion.h2
              className="text-4xl text-center leading-10 font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Nouveau mot de passe
            </motion.h2>
            <motion.p
              className="text-center text-muted-foreground mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Choisissez un nouveau mot de passe sécurisé pour votre compte
            </motion.p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-normal">Nouveau mot de passe</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="••••••••"
                            {...field}
                            className="py-6 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        </FormControl>
                        <FormMessage />
                        <div className="text-xs text-muted-foreground mt-1">
                          Au moins 8 caractères avec une majuscule, une minuscule et un chiffre
                        </div>
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-normal">Confirmer le mot de passe</FormLabel>
                        <FormControl>
                          <PasswordInput
                            placeholder="••••••••"
                            {...field}
                            className="py-6 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                  <Button
                    type="submit"
                    className="w-full bg-secondary py-6 text-white text-lg rounded hover:bg-green-600 transition-all duration-200 transform hover:scale-[1.02]"
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
        </div>
      </div>

      {/* Success Alert Dialog */}
      <AlertDialog open={showSuccessAlert} onOpenChange={setShowSuccessAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <AlertDialogTitle>Mot de passe réinitialisé !</AlertDialogTitle>
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
              <AlertDialogTitle>Erreur de réinitialisation</AlertDialogTitle>
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
