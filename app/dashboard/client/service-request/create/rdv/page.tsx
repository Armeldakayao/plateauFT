"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"

import { Calendar, ArrowLeft, Send, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCreateRdvRequest } from "@/hooks/services-requests/use-create-service-request"

const rdvSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(8, "Numéro de téléphone invalide"),
  profession: z.string().min(2, "La profession est requise"),
  institution: z.string().min(2, "L'institution est requise"),
  nationalId: z.string().min(5, "Numéro d'identité invalide"),
  meetingTarget: z.string().min(1, "Veuillez sélectionner un objectif"),
  otherMeetingTarget: z.string().optional(),
  subject: z.string().min(1, "Veuillez sélectionner un sujet"),
  otherSubject: z.string().optional(),
  preferredSlot1: z.string().min(1, "Premier créneau requis"),
  preferredSlot2: z.string().optional(),
  preferredSlot3: z.string().optional(),
  meetingType: z.string().min(1, "Type de rendez-vous requis"),
  certifyAccuracy: z.boolean().refine((val) => val === true, "Vous devez certifier l'exactitude des informations"),
  authorizeContact: z.boolean().refine((val) => val === true, "Vous devez autoriser le contact"),
})

type RdvFormData = z.infer<typeof rdvSchema>

const STEPS = [
  { id: 1, title: "Informations Personnelles", description: "Vos informations de contact" },
  { id: 2, title: "Détails du Rendez-vous", description: "Objectif et sujet de votre rendez-vous" },
  { id: 3, title: "Créneaux Préférés", description: "Vos disponibilités" },
  { id: 4, title: "Confirmation", description: "Vérification et soumission" },
]

export default function CreateRdvPage() {
  const router = useRouter()
  const createRdv = useCreateRdvRequest()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<RdvFormData>({
    resolver: zodResolver(rdvSchema),
    defaultValues: {
      certifyAccuracy: false,
      authorizeContact: false,
    },
  })

  const watchMeetingTarget = form.watch("meetingTarget")
  const watchSubject = form.watch("subject")

  const onSubmit = async (data: RdvFormData) => {
    try {
      await createRdv.mutateAsync(data)
      toast({
        title: "Demande soumise avec succès",
        description: "Votre demande de rendez-vous a été envoyée et sera traitée dans les plus brefs délais.",
      })
      router.push("/user/service-requests?success=rdv-created")
    } catch (error) {
      console.error("Erreur lors de la création:", error)
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la soumission de votre demande. Veuillez réessayer.",
        variant: "destructive",
      })
    }
  }

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceedToNext = () => {
    const values = form.getValues()
    switch (currentStep) {
      case 1:
        return (
          values.nom &&
          values.prenom &&
          values.email &&
          values.telephone &&
          values.profession &&
          values.institution &&
          values.nationalId
        )
      case 2:
        return values.meetingTarget && values.subject && values.meetingType
      case 3:
        return values.preferredSlot1
      case 4:
        return values.certifyAccuracy && values.authorizeContact
      default:
        return true
    }
  }

  return (
    <div className=" mx-auto p-6 ">
      <div className="mb-6">
        <Link href="/user/service-requests/create">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Demande de Rendez-vous</h1>
            <p className="text-muted-foreground">Remplissez ce formulaire pour planifier un rendez-vous</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.id ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <div className="ml-2 hidden md:block">
                <p className={`text-sm font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-500"}`}>
                  {step.title}
                </p>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-blue-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Informations personnelles */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Informations Personnelles</CardTitle>
                <CardDescription>Vos informations de contact et d'identification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom *</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre nom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prenom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom *</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre prénom" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="votre@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone *</FormLabel>
                        <FormControl>
                          <Input placeholder="+225 XX XX XX XX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="profession"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Profession *</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre profession" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution *</FormLabel>
                        <FormControl>
                          <Input placeholder="Votre institution" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="nationalId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro d'identité nationale *</FormLabel>
                      <FormControl>
                        <Input placeholder="Votre numéro d'identité" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 2: Détails du rendez-vous */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Détails du Rendez-vous</CardTitle>
                <CardDescription>Précisez l'objet et le type de votre rendez-vous</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="meetingTarget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objectif du rendez-vous *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un objectif" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="consultation">Consultation administrative</SelectItem>
                          <SelectItem value="information">Demande d'information</SelectItem>
                          <SelectItem value="suivi">Suivi de dossier</SelectItem>
                          <SelectItem value="reclamation">Réclamation</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchMeetingTarget === "autre" && (
                  <FormField
                    control={form.control}
                    name="otherMeetingTarget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Précisez l'objectif</FormLabel>
                        <FormControl>
                          <Input placeholder="Décrivez votre objectif" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sujet du rendez-vous *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un sujet" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="documents">Documents administratifs</SelectItem>
                          <SelectItem value="services">Services publics</SelectItem>
                          <SelectItem value="procedures">Procédures légales</SelectItem>
                          <SelectItem value="partenariat">Partenariat</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchSubject === "autre" && (
                  <FormField
                    control={form.control}
                    name="otherSubject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Précisez le sujet</FormLabel>
                        <FormControl>
                          <Input placeholder="Décrivez le sujet" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="meetingType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de rendez-vous *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="presentiel">En présentiel</SelectItem>
                          <SelectItem value="visio">Visioconférence</SelectItem>
                          <SelectItem value="telephonique">Téléphonique</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 3: Créneaux préférés */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Créneaux Préférés</CardTitle>
                <CardDescription>Indiquez vos créneaux de disponibilité (au moins un requis)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="preferredSlot1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Premier choix *</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} min={new Date().toISOString().slice(0, 16)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredSlot2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Deuxième choix (optionnel)</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} min={new Date().toISOString().slice(0, 16)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="preferredSlot3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Troisième choix (optionnel)</FormLabel>
                      <FormControl>
                        <Input type="datetime-local" {...field} min={new Date().toISOString().slice(0, 16)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 4: Confirmations */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Confirmations</CardTitle>
                <CardDescription>Vérifiez et confirmez votre demande</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="certifyAccuracy"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Je certifie l'exactitude des informations fournies *</FormLabel>
                        <FormDescription>Vous confirmez que toutes les informations sont correctes</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="authorizeContact"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>J'autorise le contact pour le suivi de ma demande *</FormLabel>
                        <FormDescription>Nous pourrons vous contacter par email ou téléphone</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between gap-4">
            <div>
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Précédent
                </Button>
              )}
            </div>

            <div className="flex gap-4">
              <Link href="/user/service-requests/create">
                <Button variant="ghost">Annuler</Button>
              </Link>

              {currentStep < STEPS.length ? (
                <Button type="button" onClick={nextStep} disabled={!canProceedToNext()}>
                  Suivant
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button type="submit" disabled={createRdv.isPending || !canProceedToNext()} className="min-w-32">
                  {createRdv.isPending ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Soumettre la demande
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
