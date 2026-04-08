

"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, Mail, CheckCircle, AlertCircle } from "lucide-react"
import Image from "next/image"
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
import { BackgroundAnimated } from "@/app/(admin-auth)/admin-auth/layout"

const formSchema = z.object({
  email: z.string().email("Email invalide"),
})

export default function MotDePasseOubliePage() {
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const forgotPasswordMutation = useForgotPasswordMutation()
const {toast} = useToast()
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
        description: "Un lien de réinitialisation a été envoyé à votre adresse email.",
       
      })

      setAlertMessage(`Un lien de réinitialisation a été envoyé à ${values.email}. Vérifiez votre boîte de réception.`)
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
      <>
        <div className="min-h-screen flex flex-col md:flex-row">
          

          <div className="w-full  flex items-center justify-center p-8">
            <motion.div
              className="w-full max-w-xl bg-white rounded-xl p-8 shadow-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  href="/connexion"
                  className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à la connexion
                </Link>
              </motion.div>

              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-10 h-10 text-green-600" />
                </div>
              </motion.div>

              <motion.h2
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                Email envoyé !
              </motion.h2>
              <motion.p
                className="text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                Nous avons envoyé un lien de réinitialisation à <strong>{form.getValues("email")}</strong>
              </motion.p>
              <motion.p
                className="text-sm text-muted-foreground mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                Vérifiez votre boîte de réception et cliquez sur le lien pour réinitialiser votre mot de passe.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                <Button
                  onClick={() => setIsEmailSent(false)}
                  variant="outline"
                  className="w-full mb-4 transition-all duration-200 hover:scale-105"
                >
                  Essayer avec un autre email
                </Button>

                <Link
                  href="/connexion"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Retour à la connexion
                </Link>
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
            className="w-full max-w-xl bg-white lg:mt-72 p-8 rounded-xl"
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
              Mot de passe oublié ?
            </motion.h2>
            <motion.p
              className="text-center text-muted-foreground mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Saisissez votre adresse email pour recevoir un lien de réinitialisation
            </motion.p>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-normal">Adresse email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="votre@email.com"
                            {...field}
                            className="py-6 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                  <Button
                    type="submit"
                    className="w-full bg-secondary py-6 text-white text-lg rounded hover:bg-green-600 transition-all duration-200 transform hover:scale-[1.02]"
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
              transition={{ delay: 0.9 }}
            >
              <p className="text-lg text-black">
                Vous vous souvenez de votre mot de passe ?{" "}
                <Link
                  href="/connexion"
                  className="text-black font-bold underline hover:text-blue-600 transition-colors"
                >
                  Se connecter
                </Link>
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
              <AlertDialogTitle>Email envoyé !</AlertDialogTitle>
            </div>
            <AlertDialogDescription>{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessAlert(false)}>Compris</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Alert Dialog */}
      <AlertDialog open={showErrorAlert} onOpenChange={setShowErrorAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <AlertDialogTitle>Erreur d'envoi</AlertDialogTitle>
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
