
"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useLoginMutation } from "@/hooks/auth/use-auth-mutations"
import { toast } from "sonner"
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
import { BackgroundAnimated } from "@/app/(admin-auth)/admin-auth/layout"
import { Bubbles } from "@/components/bubble-display"

const formSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(6, "Le mot de passe doit contenir au moins 6 caractères"),
})

export default function ConnexionPage() {
  const router = useRouter()
  const loginMutation = useLoginMutation()
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
const {toast} = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await loginMutation.mutateAsync({
        email: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          toast({
            title: "Succès",
            description: `Connexion réussie. Redirection vers la page de vérification OTP...`,
          })
        },
        onError: (error: any) => {
          toast({
            title: "Erreur",
            description: error?.message || "Une erreur est survenue lors de la connexion",
            variant: "destructive",
          })
        },
      })

      // Stocker les infos pour OTP
      sessionStorage.setItem(
        "pendingLogin",
        JSON.stringify({
          //@ts-ignore
          email: response.email,
          //@ts-ignore
          userId: response.userId,
        }),
      )

      // <CHANGE> Added success toast and alert dialog
      toast({
        title: "Succès",
        description: `Connexion réussie. Redirection vers la page de vérification OTP...`,})

      setAlertMessage("Connexion réussie ! Vous allez être redirigé vers la page de vérification OTP.")
      setShowSuccessAlert(true)

      setTimeout(() => {
        router.push("/verification-otp")
      }, 2000)
    } catch (error: any) {
      // <CHANGE> Added error toast and alert dialog
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
      <div className="min-h-screen flex flex-col md:flex-row">
       

        <div className="w-full  flex items-center justify-center p-8">
          <motion.div
            className="w-full max-w-xl bg-white lg:mt-72 rounded-xl p-7"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* <motion.div 
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à l'accueil
              </Link>
            </motion.div> */}

            <motion.h2 
              className="text-4xl text-center leading-10 font-bold mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Connectez-vous en tant que Citoyen
            </motion.h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
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
                        <FormLabel className="text-lg font-normal">Email ou Numéro de telephone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="votre@email.com ou 06 00 00 00 00"
                            {...field}
                            className="py-6 rounded border border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                        </FormControl>
                        <FormMessage />
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-lg font-normal">Mot de passe</FormLabel>
                        <FormControl>
                            <PasswordInput 
                              placeholder="••••••••" 
                              {...field} 
                              className="py-6 w-full  focus:ring-0" 
                            />
                          
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
 <div className="flex gap-2 items-center">Mot de passe  <p className="">
                              <Link href="/mot-de-passe-oublie" className="underline flex font-semibold text-lg hover:text-blue-600 transition-colors">
                                Oublié?
                              </Link>
                            </p></div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <Button
                    type="submit"
                    className="w-full bg-secondary py-6 text-white text-lg rounded hover:bg-green-600 transition-all duration-200 transform hover:scale-[1.02]"
                    disabled={loginMutation.isPending}
                  >
                    {loginMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Connexion en cours...
                      </div>
                    ) : (
                      "Se connecter"
                    )}
                  </Button>
                </motion.div>
              </form>
            </Form>

            <motion.div 
              className="mt-6 "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
             
              <p className="text-lg text-black">
                Vous n'avez pas de compte ?{" "}
                <Link href="/inscription" className="text-black font-bold underline hover:text-blue-600 transition-colors">
                  Inscrivez-vous
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
              <AlertDialogTitle>Connexion réussie !</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              {alertMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSuccessAlert(false)}>
              Continuer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Error Alert Dialog */}
      <AlertDialog open={showErrorAlert} onOpenChange={setShowErrorAlert}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-6 w-6 text-red-600" />
              <AlertDialogTitle>Erreur de connexion</AlertDialogTitle>
            </div>
            <AlertDialogDescription>
              {alertMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowErrorAlert(false)}>
              Réessayer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
