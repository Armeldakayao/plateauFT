"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

import { toast } from "@/hooks/use-toast"
import { RdvRequest } from "@/lib/types/service-request"
import { useCreateRdvRequest } from "@/hooks/services-requests/use-create-service-request"


const rdvSchema = z.object({
  nom: z.string().min(2, "Le nom est requis"),
  prenom: z.string().min(2, "Le prénom est requis"),
  email: z.string().email("Email invalide"),
  telephone: z.string().min(8, "Numéro de téléphone invalide"),
  profession: z.string().min(2, "La profession est requise"),
  institution: z.string().min(2, "L'institution est requise"),
  nationalId: z.string().min(5, "Numéro d'identité requis"),
  meetingTarget: z.string().min(1, "Veuillez sélectionner un objectif"),
  otherMeetingTarget: z.string().optional(),
  subject: z.string().min(1, "Veuillez sélectionner un sujet"),
  otherSubject: z.string().optional(),
  preferredSlot1: z.string().min(1, "Premier créneau requis"),
  preferredSlot2: z.string().min(1, "Deuxième créneau requis"),
  preferredSlot3: z.string().min(1, "Troisième créneau requis"),
  meetingType: z.string().min(1, "Type de rendez-vous requis"),
  certifyAccuracy: z.boolean().refine((val) => val === true, "Vous devez certifier l'exactitude"),
  authorizeContact: z.boolean().refine((val) => val === true, "Vous devez autoriser le contact"),
})

interface RdvRequestFormProps {
  onSuccess?: () => void
}

export function RdvRequestForm({ onSuccess }: RdvRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const createRdvRequest = useCreateRdvRequest()

  const form = useForm<RdvRequest>({
    resolver: zodResolver(rdvSchema),
    defaultValues: {
      certifyAccuracy: false,
      authorizeContact: false,
    },
  })

  const onSubmit = async (data: RdvRequest) => {
    setIsSubmitting(true)
    try {
      await createRdvRequest.mutateAsync(data)
      toast({
        title: "Demande envoyée",
        description: "Votre demande de rendez-vous a été envoyée avec succès.",
      })
      form.reset()
      onSuccess?.()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre demande.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Demande de Rendez-vous</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Informations personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nom">Nom *</Label>
              <Input id="nom" {...form.register("nom")} placeholder="Votre nom" />
              {form.formState.errors.nom && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.nom.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="prenom">Prénom *</Label>
              <Input id="prenom" {...form.register("prenom")} placeholder="Votre prénom" />
              {form.formState.errors.prenom && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.prenom.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" {...form.register("email")} placeholder="votre.email@exemple.com" />
              {form.formState.errors.email && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="telephone">Téléphone *</Label>
              <Input id="telephone" {...form.register("telephone")} placeholder="+225 XX XX XX XX XX" />
              {form.formState.errors.telephone && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.telephone.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="profession">Profession *</Label>
              <Input id="profession" {...form.register("profession")} placeholder="Votre profession" />
              {form.formState.errors.profession && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.profession.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="institution">Institution *</Label>
              <Input id="institution" {...form.register("institution")} placeholder="Votre institution" />
              {form.formState.errors.institution && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.institution.message}</p>
              )}
            </div>
          </div>

          {/* Objectif et sujet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="meetingTarget">Objectif du rendez-vous *</Label>
              <Select onValueChange={(value) => form.setValue("meetingTarget", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un objectif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="information">Demande d'information</SelectItem>
                  <SelectItem value="plainte">Dépôt de plainte</SelectItem>
                  <SelectItem value="partenariat">Proposition de partenariat</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.meetingTarget && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.meetingTarget.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="subject">Sujet *</Label>
              <Select onValueChange={(value) => form.setValue("subject", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un sujet" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="urbanisme">Urbanisme</SelectItem>
                  <SelectItem value="etat-civil">État civil</SelectItem>
                  <SelectItem value="social">Affaires sociales</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.subject && (
                <p className="text-sm text-red-500 mt-1">{form.formState.errors.subject.message}</p>
              )}
            </div>
          </div>

          {/* Créneaux préférés */}
          <div>
            <Label className="text-lg font-semibold">Créneaux préférés *</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              <div>
                <Label htmlFor="preferredSlot1">1er choix</Label>
                <Input id="preferredSlot1" type="datetime-local" {...form.register("preferredSlot1")} />
              </div>
              <div>
                <Label htmlFor="preferredSlot2">2ème choix</Label>
                <Input id="preferredSlot2" type="datetime-local" {...form.register("preferredSlot2")} />
              </div>
              <div>
                <Label htmlFor="preferredSlot3">3ème choix</Label>
                <Input id="preferredSlot3" type="datetime-local" {...form.register("preferredSlot3")} />
              </div>
            </div>
          </div>

          {/* Type de rendez-vous */}
          <div>
            <Label htmlFor="meetingType">Type de rendez-vous *</Label>
            <Select onValueChange={(value) => form.setValue("meetingType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner le type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="presentiel">Présentiel</SelectItem>
                <SelectItem value="visio">Visioconférence</SelectItem>
                <SelectItem value="telephonique">Téléphonique</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.meetingType && (
              <p className="text-sm text-red-500 mt-1">{form.formState.errors.meetingType.message}</p>
            )}
          </div>

          {/* Confirmations */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="certifyAccuracy"
                checked={form.watch("certifyAccuracy")}
                onCheckedChange={(checked) => form.setValue("certifyAccuracy", !!checked)}
              />
              <Label htmlFor="certifyAccuracy" className="text-sm">
                Je certifie l'exactitude des informations fournies *
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="authorizeContact"
                checked={form.watch("authorizeContact")}
                onCheckedChange={(checked) => form.setValue("authorizeContact", !!checked)}
              />
              <Label htmlFor="authorizeContact" className="text-sm">
                J'autorise la mairie à me contacter pour ce rendez-vous *
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
