"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, CheckCircle, AlertCircle, Shield, Lock } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLoginMutation } from "@/hooks/auth/use-auth-mutations"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { PasswordInput } from "@/components/ui/password-input"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export default function AdminConnexionPage() {
  const router = useRouter()
  const loginMutation = useLoginMutation()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await loginMutation.mutateAsync(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            toast({
              title: "Succès",
              description: `Connexion administrateur réussie. Redirection vers le tableau de bord...`,
            })
          },
          onError: (error: any) => {
            toast({
              title: "Erreur",
              description: error?.message || "Une erreur est survenue lors de la connexion",
              variant: "destructive",
            })
          },
        },
      )

      sessionStorage.setItem(
        "pendingAdminLogin",
        JSON.stringify({
          //@ts-ignore
          email: response.email,
          //@ts-ignore
          userId: response.userId,
        }),
      )

      toast({
        title: "Succès",
        description: `Connexion administrateur réussie. Redirection vers la vérification OTP...`,
      })

      setAlertMessage("Connexion administrateur réussie ! Vous allez être redirigé vers la page de vérification OTP.")
      setShowSuccessAlert(true)

      setTimeout(() => {
        router.push("/admin-auth/verification-otp")
      }, 2000)
    } catch (error: any) {
      const errorMessage = error?.message || "Une erreur est survenue lors de la connexion"

      toast({
        title: "Erreur",
        description: errorMessage,
        variant: "destructive",
      })

      setAlertMessage(errorMessage)
      setShowErrorAlert(true)
    }
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Administration</h1>
              <p className="text-slate-400">Accès sécurisé au panneau d'administration</p>
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
                {/* <Link href="/" className="flex items-center text-sm text-slate-400 hover:text-white transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour à l'accueil
                </Link> */}
              </motion.div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Email administrateur</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="admin@exemple.com"
                              {...field}
                              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl h-12"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white font-medium">Mot de passe</FormLabel>
                          <FormControl>
                            <PasswordInput
                              placeholder="••••••••"
                              {...field}
                              className="bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 rounded-xl h-12"
                            />
                          </FormControl>
                          <FormMessage className="text-red-400" />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <div className="flex justify-between items-center">
                      <Link
                      href="/admin-auth/inscription"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      S'inscrire
                    </Link>
                    <Link
                      href="/admin-auth/mot-de-passe-oublie"
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Mot de passe oublié ?
                    </Link>
                   
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white h-12 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]"
                      disabled={loginMutation.isPending}
                    >
                      {loginMutation.isPending ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Connexion en cours...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Lock className="w-4 h-4" />
                          Accéder au panneau
                        </div>
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
              <AlertDialogTitle className="text-white">Connexion réussie !</AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-slate-300">{alertMessage}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessAlert(false)} className="bg-blue-600 hover:bg-blue-700">
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
              <AlertDialogTitle className="text-white">Erreur de connexion</AlertDialogTitle>
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
