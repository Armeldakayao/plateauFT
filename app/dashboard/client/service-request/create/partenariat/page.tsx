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
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"

import { Handshake, ArrowLeft, Send, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { useCreatePartenaritRequest } from "@/hooks/services-requests/use-create-service-request"

const partenaritSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  organizationName: z.string().min(2, "Le nom de l'organisation est requis"),
  organizationType: z.string().min(1, "Le type d'organisation est requis"),
  otherOrganizationType: z.string().optional(),
  activitySector: z.string().min(1, "Le secteur d'activité est requis"),
  otherActivitySector: z.string().optional(),
  originCountry: z.string().min(2, "Le pays d'origine est requis"),
  originCity: z.string().min(2, "La ville d'origine est requise"),
  creationYear: z.coerce.number().min(1900, "Année invalide").max(new Date().getFullYear(), "Année invalide"),
  website: z.string().url("URL invalide").optional().or(z.literal("")),
  contactName: z.string().min(2, "Le nom du contact est requis"),
  contactFunction: z.string().min(2, "La fonction du contact est requise"),
  contactPhone: z.string().min(8, "Numéro de téléphone invalide"),
  contactEmail: z.string().email("Email invalide"),
  partnershipNature: z.string().min(1, "La nature du partenariat est requise"),
  otherPartnershipNature: z.string().optional(),
  concernedService: z.string().min(2, "Le service concerné est requis"),
  proposalDescription: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  mairieObjectives: z.string().min(10, "Les objectifs pour la mairie sont requis"),
  structureObjectives: z.string().min(10, "Les objectifs pour votre structure sont requis"),
  partnershipDuration: z.string().min(1, "La durée du partenariat est requise"),
  startDate: z.string().min(1, "La date de début est requise"),
  certifyAccuracy: z.boolean().refine((val) => val === true, "Vous devez certifier l'exactitude des informations"),
  authorizeContact: z.boolean().refine((val) => val === true, "Vous devez autoriser le contact"),
  acknowledgeNoValidation: z
    .boolean()
    .refine((val) => val === true, "Vous devez reconnaître que cette demande ne constitue pas une validation"),
})

type PartenaritFormData = z.infer<typeof partenaritSchema>

const STEPS = [
  { id: 1, title: "Informations du Demandeur", description: "Vos informations personnelles" },
  { id: 2, title: "Organisation", description: "Détails sur votre organisation" },
  { id: 3, title: "Contact & Partenariat", description: "Informations de contact et nature du partenariat" },
  { id: 4, title: "Détails du Projet", description: "Description détaillée de votre proposition" },
  { id: 5, title: "Confirmation", description: "Vérification et soumission" },
]

export default function CreatePartenaritPage() {
  const router = useRouter()
  const createPartenariat = useCreatePartenaritRequest()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<PartenaritFormData>({
    resolver: zodResolver(partenaritSchema),
    defaultValues: {
      certifyAccuracy: false,
      authorizeContact: false,
      acknowledgeNoValidation: false,
      creationYear: new Date().getFullYear(),
    },
  })

  const watchOrganizationType = form.watch("organizationType")
  const watchActivitySector = form.watch("activitySector")
  const watchPartnershipNature = form.watch("partnershipNature")

  const onSubmit = async (data: PartenaritFormData) => {
    try {
      await createPartenariat.mutateAsync(data)
      toast({
        title: "Demande soumise avec succès",
        description: "Votre demande de partenariat a été envoyée et sera traitée dans les plus brefs délais.",
      })
      router.push("/user/service-requests?success=partenariat-created")
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
        return values.nom && values.prenom && values.email
      case 2:
        return (
          values.organizationName &&
          values.organizationType &&
          values.activitySector &&
          values.originCountry &&
          values.originCity
        )
      case 3:
        return (
          values.contactName &&
          values.contactFunction &&
          values.contactPhone &&
          values.contactEmail &&
          values.partnershipNature &&
          values.concernedService
        )
      case 4:
        return (
          values.proposalDescription &&
          values.mairieObjectives &&
          values.structureObjectives &&
          values.partnershipDuration &&
          values.startDate
        )
      case 5:
        return values.certifyAccuracy && values.authorizeContact && values.acknowledgeNoValidation
      default:
        return true
    }
  }

  return (
    <div className=" mx-auto p-6">
      <div className="mb-6">
        <Link href="/user/service-requests/create">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour
          </Button>
        </Link>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <Handshake className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Demande de Partenariat</h1>
            <p className="text-muted-foreground">Proposez un partenariat avec la mairie</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step.id ? "bg-green-600 text-white" : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <div className="ml-2 hidden md:block">
                <p className={`text-sm font-medium ${currentStep >= step.id ? "text-green-600" : "text-gray-500"}`}>
                  {step.title}
                </p>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`w-12 h-0.5 mx-4 ${currentStep > step.id ? "bg-green-600" : "bg-gray-200"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Informations du demandeur */}
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle>Informations du Demandeur</CardTitle>
                <CardDescription>Vos informations personnelles</CardDescription>
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
              </CardContent>
            </Card>
          )}

          {/* Step 2: Informations de l'organisation */}
          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle>Informations de l'Organisation</CardTitle>
                <CardDescription>Détails sur votre organisation ou structure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de l'organisation *</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom de votre organisation" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type d'organisation *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="association">Association</SelectItem>
                          <SelectItem value="ong">ONG</SelectItem>
                          <SelectItem value="entreprise">Entreprise</SelectItem>
                          <SelectItem value="institution">Institution</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchOrganizationType === "autre" && (
                  <FormField
                    control={form.control}
                    name="otherOrganizationType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Précisez le type d'organisation</FormLabel>
                        <FormControl>
                          <Input placeholder="Décrivez votre type d'organisation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="activitySector"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Secteur d'activité *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez le secteur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="education">Éducation</SelectItem>
                          <SelectItem value="sante">Santé</SelectItem>
                          <SelectItem value="environnement">Environnement</SelectItem>
                          <SelectItem value="culture">Culture</SelectItem>
                          <SelectItem value="sport">Sport</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="economie">Économie</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchActivitySector === "autre" && (
                  <FormField
                    control={form.control}
                    name="otherActivitySector"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Précisez le secteur d'activité</FormLabel>
                        <FormControl>
                          <Input placeholder="Décrivez votre secteur d'activité" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="originCountry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Pays d'origine *</FormLabel>
                        <FormControl>
                          <Input placeholder="Pays d'origine" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="originCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ville d'origine *</FormLabel>
                        <FormControl>
                          <Input placeholder="Ville d'origine" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="creationYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année de création *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="2020"
                            {...field}
                            onChange={(e) => field.onChange(Number.parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site web (optionnel)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://www.exemple.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle>Contact & Partenariat</CardTitle>
                <CardDescription>Informations de contact et nature du partenariat</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du contact *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom de la personne de contact" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactFunction"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Fonction du contact *</FormLabel>
                        <FormControl>
                          <Input placeholder="Fonction dans l'organisation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone du contact *</FormLabel>
                        <FormControl>
                          <Input placeholder="+225 XX XX XX XX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email du contact *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="contact@organisation.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="partnershipNature"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nature du partenariat *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez la nature" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="technique">Partenariat technique</SelectItem>
                          <SelectItem value="financier">Partenariat financier</SelectItem>
                          <SelectItem value="logistique">Partenariat logistique</SelectItem>
                          <SelectItem value="communication">Partenariat communication</SelectItem>
                          <SelectItem value="formation">Partenariat formation</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchPartnershipNature === "autre" && (
                  <FormField
                    control={form.control}
                    name="otherPartnershipNature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Précisez la nature du partenariat</FormLabel>
                        <FormControl>
                          <Input placeholder="Décrivez la nature du partenariat" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="concernedService"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Service concerné *</FormLabel>
                      <FormControl>
                        <Input placeholder="Quel service de la mairie est concerné ?" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle>Détails du Projet</CardTitle>
                <CardDescription>Description détaillée de votre proposition</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="proposalDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description de la proposition *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Décrivez en détail votre proposition de partenariat..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mairieObjectives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objectifs pour la mairie *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Quels sont les bénéfices et objectifs pour la mairie ?"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="structureObjectives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objectifs pour votre structure *</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Quels sont vos objectifs et bénéfices attendus ?"
                          className="min-h-[80px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="partnershipDuration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Durée du partenariat *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionnez la durée" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="3-mois">3 mois</SelectItem>
                            <SelectItem value="6-mois">6 mois</SelectItem>
                            <SelectItem value="1-an">1 an</SelectItem>
                            <SelectItem value="2-ans">2 ans</SelectItem>
                            <SelectItem value="3-ans">3 ans</SelectItem>
                            <SelectItem value="plus-3-ans">Plus de 3 ans</SelectItem>
                            <SelectItem value="indeterminee">Durée indéterminée</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date de début souhaitée *</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} min={new Date().toISOString().split("T")[0]} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 5: Confirmation */}
          {currentStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle>Confirmation</CardTitle>
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

                <FormField
                  control={form.control}
                  name="acknowledgeNoValidation"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Je reconnais que cette demande ne constitue pas une validation *</FormLabel>
                        <FormDescription>
                          Cette demande sera étudiée et une réponse vous sera communiquée
                        </FormDescription>
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
                  disabled={createPartenariat.isPending || !canProceedToNext()}
                  className="min-w-32"
                >
                  {createPartenariat.isPending ? (
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
