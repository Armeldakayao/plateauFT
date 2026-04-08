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
import { Heart, Send, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCreateMariageRequest } from "@/hooks/services-requests/use-create-service-request"
import { useQueryClient } from "@tanstack/react-query"

const mariageSchema = z.object({
  // Conjoint 1
  conjoint1: z.object({
    nom: z.string().min(2, "Le nom est requis"),
    prenom: z.string().min(2, "Le prénom est requis"),
    dob: z.string().min(1, "La date de naissance est requise"),
    pob: z.string().min(2, "Le lieu de naissance est requis"),
    nationality: z.string().min(2, "La nationalité est requise"),
    profession: z.string().min(2, "La profession est requise"),
    address: z.string().min(5, "L'adresse est requise"),
    phone: z.string().min(8, "Le numéro de téléphone est requis"),
    email: z.string().email("Email invalide"),
    idNumber: z.string().min(5, "Le numéro d'identité est requis"),
    maritalStatus: z.string().min(1, "Le statut matrimonial est requis"),
  }),
  // Conjoint 2
  conjoint2: z.object({
    nom: z.string().min(2, "Le nom est requis"),
    prenom: z.string().min(2, "Le prénom est requis"),
    dob: z.string().min(1, "La date de naissance est requise"),
    pob: z.string().min(2, "Le lieu de naissance est requis"),
    nationality: z.string().min(2, "La nationalité est requise"),
    profession: z.string().min(2, "La profession est requise"),
    address: z.string().min(5, "L'adresse est requise"),
    phone: z.string().min(8, "Le numéro de téléphone est requis"),
    email: z.string().email("Email invalide"),
    idNumber: z.string().min(5, "Le numéro d'identité est requis"),
    maritalStatus: z.string().min(1, "Le statut matrimonial est requis"),
  }),
  // Marriage details
  marriageType: z.string().min(1, "Le type de mariage est requis"),
  guestEstimate: z.coerce.number().min(1, "Le nombre d'invités est requis"),
  celebrationLanguage: z.string().min(1, "La langue de célébration est requise"),
  otherCelebrationLanguage: z.string().optional(),
  // Preferred dates
  date1: z.string().min(1, "La première date est requise"),
  time1: z.string().min(1, "L'heure de la première date est requise"),
  date2: z.string().min(1, "La deuxième date est requise"),
  time2: z.string().min(1, "L'heure de la deuxième date est requise"),
  date3: z.string().min(1, "La troisième date est requise"),
  time3: z.string().min(1, "L'heure de la troisième date est requise"),
  // Additional services
  reserveRoom: z.boolean(),
  roomType: z.string().optional(),
  photoSpace: z.boolean(),
  onlinePayment: z.boolean(),
  // Confirmations
  certifyAccuracy: z.boolean().refine((val) => val === true, "Vous devez certifier l'exactitude des informations"),
  authorizeContact: z.boolean().refine((val) => val === true, "Vous devez autoriser le contact"),
})

type MariageFormData = z.infer<typeof mariageSchema>

const STEPS = [
  { id: 1, title: "Premier Conjoint", description: "Informations du premier conjoint" },
  { id: 2, title: "Deuxième Conjoint", description: "Informations du deuxième conjoint" },
  { id: 3, title: "Détails du Mariage", description: "Type et langue de célébration" },
  { id: 4, title: "Dates Préférées", description: "Vos créneaux souhaités" },
  { id: 5, title: "Services Additionnels", description: "Options supplémentaires" },
  { id: 6, title: "Confirmation", description: "Vérification et soumission" },
]

export default function CreateMariagePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const createMariageRequest = useCreateMariageRequest()
  const queryClient = useQueryClient()

  const form = useForm<MariageFormData>({
    //@ts-ignore
    resolver: zodResolver(mariageSchema),
    defaultValues: {
      conjoint1: {
        nom: "",
        prenom: "",
        dob: "",
        pob: "",
        nationality: "",
        profession: "",
        address: "",
        phone: "",
        email: "",
        idNumber: "",
        maritalStatus: "",
      },
      conjoint2: {
        nom: "",
        prenom: "",
        dob: "",
        pob: "",
        nationality: "",
        profession: "",
        address: "",
        phone: "",
        email: "",
        idNumber: "",
        maritalStatus: "",
      },
      marriageType: "",
      guestEstimate: 0,
      celebrationLanguage: "",
      otherCelebrationLanguage: "",
      date1: "",
      time1: "",
      date2: "",
      time2: "",
      date3: "",
      time3: "",
      reserveRoom: false,
      photoSpace: false,
      onlinePayment: false,
      certifyAccuracy: false,
      authorizeContact: false,
    },
    mode: "onChange",
  })

  const watchedValues = form.watch()
  const watchCelebrationLanguage = watchedValues.celebrationLanguage
  const watchReserveRoom = watchedValues.reserveRoom

  const onSubmit = async (data: MariageFormData) => {
    const payload = {
      ...data,
      time2: data.time2 || "",
      time3: data.time3 || "",
    }
    try {
      //@ts-ignore
      await createMariageRequest.mutateAsync(payload)
      queryClient.invalidateQueries({
        queryKey: ["notifications", "list", { filters: 1 }],
      })
      toast({
        title: "Demande soumise avec succès",
        description: "Votre demande de mariage a été envoyée et sera traitée dans les plus brefs délais.",
      })
      router.push("/dashboard/client/service-request?success=mariage-created")
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
    if (currentStep < STEPS.length) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const isConjointValid = (conjoint: MariageFormData["conjoint1"]) =>
    !!(
      conjoint.nom?.trim().length >= 2 &&
      conjoint.prenom?.trim().length >= 2 &&
      conjoint.email?.includes("@") &&
      conjoint.dob?.trim().length >= 1 &&
      conjoint.pob?.trim().length >= 2 &&
      conjoint.nationality?.trim().length >= 2 &&
      conjoint.profession?.trim().length >= 2 &&
      conjoint.address?.trim().length >= 5 &&
      conjoint.phone?.trim().length >= 8 &&
      conjoint.idNumber?.trim().length >= 5 &&
      conjoint.maritalStatus?.trim().length >= 1
    )

  const canProceedToNext = (): boolean => {
    const values = watchedValues
    switch (currentStep) {
      case 1:
        return isConjointValid(values.conjoint1)
      case 2:
        return isConjointValid(values.conjoint2)
      case 3:
        return !!(
          values.marriageType?.trim().length >= 1 &&
          values.guestEstimate > 0 &&
          values.celebrationLanguage?.trim().length >= 1 &&
          //@ts-ignore
          (values.celebrationLanguage !== "autre" || values.otherCelebrationLanguage?.trim().length >= 1)
        )
      case 4:
        return !!(
          values.date1?.trim().length >= 1 &&
          values.time1?.trim().length >= 1 &&
          values.date2?.trim().length >= 1 &&
          values.time2?.trim().length >= 1 &&
          values.date3?.trim().length >= 1 &&
          values.time3?.trim().length >= 1
        )
      case 5:
        return !!(
          //@ts-ignore
          !values.reserveRoom || (values.reserveRoom && values.roomType?.trim().length >= 1)
        )
      case 6:
        return !!(values.certifyAccuracy === true && values.authorizeContact === true)
      default:
        return true
    }
  }

  const renderConjointForm = (conjointKey: "conjoint1" | "conjoint2", title: string) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Informations personnelles et d'identification</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            //@ts-ignore
            control={form.control}
            name={`${conjointKey}.nom`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom *</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de famille" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            //@ts-ignore
            control={form.control}
            name={`${conjointKey}.prenom`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom *</FormLabel>
                <FormControl>
                  <Input placeholder="Prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            //@ts-ignore
            control={form.control}
            name={`${conjointKey}.dob`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de naissance *</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            //@ts-ignore
            control={form.control}
            name={`${conjointKey}.pob`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lieu de naissance *</FormLabel>
                <FormControl>
                  <Input placeholder="Ville, Pays" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            //@ts-ignore
            control={form.control}
            name={`${conjointKey}.nationality`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nationalité *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la nationalité" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ivoirienne">Ivoirienne</SelectItem>
                    <SelectItem value="francaise">Française</SelectItem>
                    <SelectItem value="malienne">Malienne</SelectItem>
                    <SelectItem value="burkinabe">Burkinabé</SelectItem>
                    <SelectItem value="senegalaise">Sénégalaise</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            //@ts-ignore
            control={form.control}
            name={`${conjointKey}.profession`}
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
        </div>

        <FormField
          //@ts-ignore
          control={form.control}
          name={`${conjointKey}.address`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse *</FormLabel>
              <FormControl>
                <Input placeholder="Adresse complète" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            //@ts-ignore
            control={form.control}
            name={`${conjointKey}.phone`}
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
          <FormField
            //@ts-ignore
            control={form.control}
            name={`${conjointKey}.email`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@exemple.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            //@ts-ignore
            control={form.control}
            name={`${conjointKey}.idNumber`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro d'identité *</FormLabel>
                <FormControl>
                  <Input placeholder="Numéro CNI ou passeport" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            //@ts-ignore
            control={form.control}
            name={`${conjointKey}.maritalStatus`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statut matrimonial *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez le statut" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="celibataire">Célibataire</SelectItem>
                    <SelectItem value="divorce">Divorcé(e)</SelectItem>
                    <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="mx-auto p-6 bg-pink-50/50 min-h-screen">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-pink-100 rounded-lg">
            <Heart className="h-6 w-6 text-pink-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Demande de Mariage</h1>
            <p className="text-muted-foreground">Remplissez ce formulaire pour votre demande de mariage civil</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 overflow-x-auto">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center min-w-0">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.id ? "bg-pink-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <div className="ml-2 hidden md:block">
                <p className={`text-sm font-medium ${currentStep >= step.id ? "text-pink-600" : "text-gray-500"}`}>
                  {step.title}
                </p>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`w-8 h-0.5 mx-2 ${currentStep > step.id ? "bg-pink-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={
            //@ts-ignore
            form.handleSubmit(onSubmit)
          }
          className="space-y-6"
        >
          {currentStep === 1 && renderConjointForm("conjoint1", "Premier Conjoint")}
          {currentStep === 2 && renderConjointForm("conjoint2", "Deuxième Conjoint")}

          {/* Step 3: Détails du Mariage */}
          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Détails du Mariage</CardTitle>
                <CardDescription>Type de mariage et préférences de célébration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  //@ts-ignore
                  control={form.control}
                  name="marriageType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de mariage *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="civil">Mariage civil</SelectItem>
                          <SelectItem value="civil-religieux">Mariage civil et religieux</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  //@ts-ignore
                  control={form.control}
                  name="guestEstimate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre d'invités estimé *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="50"
                          {...field}
                          onChange={(e) => field.onChange(Number.parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  //@ts-ignore
                  control={form.control}
                  name="celebrationLanguage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Langue de célébration *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la langue" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="francais">Français</SelectItem>
                          <SelectItem value="anglais">Anglais</SelectItem>
                          <SelectItem value="baoulé">Baoulé</SelectItem>
                          <SelectItem value="dioula">Dioula</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchCelebrationLanguage === "autre" && (
                  <FormField
                    //@ts-ignore
                    control={form.control}
                    name="otherCelebrationLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Précisez la langue *</FormLabel>
                        <FormControl>
                          <Input placeholder="Autre langue de célébration" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 4: Dates Préférées */}
          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Dates Préférées</CardTitle>
                <CardDescription>Indiquez vos trois créneaux souhaités (tous requis)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    //@ts-ignore
                    control={form.control}
                    name="date1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Première date souhaitée *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} min={new Date().toISOString().split("T")[0]} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    //@ts-ignore
                    control={form.control}
                    name="time1"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure souhaitée *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    //@ts-ignore
                    control={form.control}
                    name="date2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deuxième date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} min={new Date().toISOString().split("T")[0]} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    //@ts-ignore
                    control={form.control}
                    name="time2"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    //@ts-ignore
                    control={form.control}
                    name="date3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Troisième date *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} min={new Date().toISOString().split("T")[0]} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    //@ts-ignore
                    control={form.control}
                    name="time3"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heure *</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Services Additionnels */}
          {currentStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle>Services Additionnels</CardTitle>
                <CardDescription>Options supplémentaires pour votre mariage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  //@ts-ignore
                  control={form.control}
                  name="reserveRoom"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Réserver une salle de réception</FormLabel>
                        <FormDescription>Souhaitez-vous réserver une salle pour la réception ?</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {watchReserveRoom && (
                  <FormField
                    //@ts-ignore
                    control={form.control}
                    name="roomType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type de salle *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez le type de salle" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="petite">Petite salle (jusqu'à 50 personnes)</SelectItem>
                            <SelectItem value="moyenne">Salle moyenne (50-100 personnes)</SelectItem>
                            <SelectItem value="grande">Grande salle (100+ personnes)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  //@ts-ignore
                  control={form.control}
                  name="photoSpace"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Espace photo</FormLabel>
                        <FormDescription>Réserver un espace pour les photos officielles</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  //@ts-ignore
                  control={form.control}
                  name="onlinePayment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Paiement en ligne</FormLabel>
                        <FormDescription>Souhaitez-vous effectuer le paiement en ligne ?</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {/* Step 6: Confirmation */}
          {currentStep === 6 && (
            <Card>
              <CardHeader>
                <CardTitle>Confirmation</CardTitle>
                <CardDescription>Vérifiez et confirmez votre demande</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  //@ts-ignore
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
                  //@ts-ignore
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
                <Button
                  type="submit"
                  disabled={createMariageRequest.isPending || !canProceedToNext()}
                  className="min-w-32"
                >
                  {createMariageRequest.isPending ? (
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