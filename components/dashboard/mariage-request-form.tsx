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
import { MariageRequest } from "@/lib/types/service-request"
import { useCreateMariageRequest } from "@/hooks/services-requests/use-create-service-request"
import { useToast } from "@/hooks/use-toast"


const mariageSchema = z.object({
  conjoint1: z.object({
    nom: z.string().min(2, "Nom requis"),
    prenom: z.string().min(2, "Prénom requis"),
    dob: z.string().min(1, "Date de naissance requise"),
    pob: z.string().min(2, "Lieu de naissance requis"),
    nationality: z.string().min(2, "Nationalité requise"),
    profession: z.string().min(2, "Profession requise"),
    address: z.string().min(5, "Adresse requise"),
    phone: z.string().min(8, "Téléphone requis"),
    email: z.string().email("Email invalide"),
    idNumber: z.string().min(5, "Numéro d'identité requis"),
    maritalStatus: z.string().min(1, "Statut matrimonial requis"),
  }),
  conjoint2: z.object({
    nom: z.string().min(2, "Nom requis"),
    prenom: z.string().min(2, "Prénom requis"),
    dob: z.string().min(1, "Date de naissance requise"),
    pob: z.string().min(2, "Lieu de naissance requis"),
    nationality: z.string().min(2, "Nationalité requise"),
    profession: z.string().min(2, "Profession requise"),
    address: z.string().min(5, "Adresse requise"),
    phone: z.string().min(8, "Téléphone requis"),
    email: z.string().email("Email invalide"),
    idNumber: z.string().min(5, "Numéro d'identité requis"),
    maritalStatus: z.string().min(1, "Statut matrimonial requis"),
  }),
  marriageType: z.string().min(1, "Type de mariage requis"),
  guestEstimate: z.number().min(1, "Nombre d'invités requis"),
  celebrationLanguage: z.string().min(1, "Langue de célébration requise"),
  date1: z.string().min(1, "Première date requise"),
  time1: z.string().min(1, "Première heure requise"),
  date2: z.string().min(1, "Deuxième date requise"),
  time2: z.string().min(1, "Deuxième heure requise"),
  date3: z.string().min(1, "Troisième date requise"),
  time3: z.string().min(1, "Troisième heure requise"),
  reserveRoom: z.boolean(),
  photoSpace: z.boolean(),
  onlinePayment: z.boolean(),
  certifyAccuracy: z.boolean().refine((val) => val === true, "Certification requise"),
  authorizeContact: z.boolean().refine((val) => val === true, "Autorisation requise"),
})

interface MariageRequestFormProps {
  onSuccess?: () => void
}

export function MariageRequestForm({ onSuccess }: MariageRequestFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const createMariageRequest = useCreateMariageRequest()
const { toast } = useToast()
  const form = useForm<MariageRequest>({
    resolver: zodResolver(mariageSchema),
    defaultValues: {
      reserveRoom: false,
      photoSpace: false,
      onlinePayment: false,
      certifyAccuracy: false,
      authorizeContact: false,
      guestEstimate: 0,
    },
  })

  const onSubmit = async (data: MariageRequest) => {
    setIsSubmitting(true)
    try {
      await createMariageRequest.mutateAsync(data)
      toast({
        title: "Demande envoyée",
        description: "Votre demande de mariage a été envoyée avec succès.",
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
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Demande de Célébration de Mariage</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Conjoint 1 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Informations du Premier Conjoint</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="conjoint1.nom">Nom *</Label>
                <Input id="conjoint1.nom" {...form.register("conjoint1.nom")} placeholder="Nom" />
              </div>
              <div>
                <Label htmlFor="conjoint1.prenom">Prénom *</Label>
                <Input id="conjoint1.prenom" {...form.register("conjoint1.prenom")} placeholder="Prénom" />
              </div>
              <div>
                <Label htmlFor="conjoint1.dob">Date de naissance *</Label>
                <Input id="conjoint1.dob" type="date" {...form.register("conjoint1.dob")} />
              </div>
              <div>
                <Label htmlFor="conjoint1.pob">Lieu de naissance *</Label>
                <Input id="conjoint1.pob" {...form.register("conjoint1.pob")} placeholder="Lieu de naissance" />
              </div>
              <div>
                <Label htmlFor="conjoint1.nationality">Nationalité *</Label>
                <Input
                  id="conjoint1.nationality"
                  {...form.register("conjoint1.nationality")}
                  placeholder="Nationalité"
                />
              </div>
              <div>
                <Label htmlFor="conjoint1.profession">Profession *</Label>
                <Input id="conjoint1.profession" {...form.register("conjoint1.profession")} placeholder="Profession" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="conjoint1.address">Adresse *</Label>
                <Input id="conjoint1.address" {...form.register("conjoint1.address")} placeholder="Adresse complète" />
              </div>
              <div>
                <Label htmlFor="conjoint1.phone">Téléphone *</Label>
                <Input id="conjoint1.phone" {...form.register("conjoint1.phone")} placeholder="+225 XX XX XX XX XX" />
              </div>
              <div>
                <Label htmlFor="conjoint1.email">Email *</Label>
                <Input
                  id="conjoint1.email"
                  type="email"
                  {...form.register("conjoint1.email")}
                  placeholder="email@exemple.com"
                />
              </div>
              <div>
                <Label htmlFor="conjoint1.idNumber">N° Pièce d'identité *</Label>
                <Input
                  id="conjoint1.idNumber"
                  {...form.register("conjoint1.idNumber")}
                  placeholder="Numéro CNI/Passeport"
                />
              </div>
              <div>
                <Label htmlFor="conjoint1.maritalStatus">Statut matrimonial *</Label>
                <Select onValueChange={(value) => form.setValue("conjoint1.maritalStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celibataire">Célibataire</SelectItem>
                    <SelectItem value="divorce">Divorcé(e)</SelectItem>
                    <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Conjoint 2 */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Informations du Deuxième Conjoint</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="conjoint2.nom">Nom *</Label>
                <Input id="conjoint2.nom" {...form.register("conjoint2.nom")} placeholder="Nom" />
              </div>
              <div>
                <Label htmlFor="conjoint2.prenom">Prénom *</Label>
                <Input id="conjoint2.prenom" {...form.register("conjoint2.prenom")} placeholder="Prénom" />
              </div>
              <div>
                <Label htmlFor="conjoint2.dob">Date de naissance *</Label>
                <Input id="conjoint2.dob" type="date" {...form.register("conjoint2.dob")} />
              </div>
              <div>
                <Label htmlFor="conjoint2.pob">Lieu de naissance *</Label>
                <Input id="conjoint2.pob" {...form.register("conjoint2.pob")} placeholder="Lieu de naissance" />
              </div>
              <div>
                <Label htmlFor="conjoint2.nationality">Nationalité *</Label>
                <Input
                  id="conjoint2.nationality"
                  {...form.register("conjoint2.nationality")}
                  placeholder="Nationalité"
                />
              </div>
              <div>
                <Label htmlFor="conjoint2.profession">Profession *</Label>
                <Input id="conjoint2.profession" {...form.register("conjoint2.profession")} placeholder="Profession" />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="conjoint2.address">Adresse *</Label>
                <Input id="conjoint2.address" {...form.register("conjoint2.address")} placeholder="Adresse complète" />
              </div>
              <div>
                <Label htmlFor="conjoint2.phone">Téléphone *</Label>
                <Input id="conjoint2.phone" {...form.register("conjoint2.phone")} placeholder="+225 XX XX XX XX XX" />
              </div>
              <div>
                <Label htmlFor="conjoint2.email">Email *</Label>
                <Input
                  id="conjoint2.email"
                  type="email"
                  {...form.register("conjoint2.email")}
                  placeholder="email@exemple.com"
                />
              </div>
              <div>
                <Label htmlFor="conjoint2.idNumber">N° Pièce d'identité *</Label>
                <Input
                  id="conjoint2.idNumber"
                  {...form.register("conjoint2.idNumber")}
                  placeholder="Numéro CNI/Passeport"
                />
              </div>
              <div>
                <Label htmlFor="conjoint2.maritalStatus">Statut matrimonial *</Label>
                <Select onValueChange={(value) => form.setValue("conjoint2.maritalStatus", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="celibataire">Célibataire</SelectItem>
                    <SelectItem value="divorce">Divorcé(e)</SelectItem>
                    <SelectItem value="veuf">Veuf/Veuve</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Détails du mariage */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Détails de la Célébration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="marriageType">Type de mariage *</Label>
                <Select onValueChange={(value) => form.setValue("marriageType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="civil">Civil</SelectItem>
                    <SelectItem value="religieux">Religieux</SelectItem>
                    <SelectItem value="mixte">Mixte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="guestEstimate">Nombre d'invités estimé *</Label>
                <Input
                  id="guestEstimate"
                  type="number"
                  {...form.register("guestEstimate", { valueAsNumber: true })}
                  placeholder="Ex: 50"
                />
              </div>
              <div>
                <Label htmlFor="celebrationLanguage">Langue de célébration *</Label>
                <Select onValueChange={(value) => form.setValue("celebrationLanguage", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="francais">Français</SelectItem>
                    <SelectItem value="anglais">Anglais</SelectItem>
                    <SelectItem value="autre">Autre</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Créneaux préférés */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Créneaux Préférés</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>1er choix</Label>
                <div className="flex gap-2">
                  <Input type="date" {...form.register("date1")} />
                  <Input type="time" {...form.register("time1")} />
                </div>
              </div>
              <div>
                <Label>2ème choix</Label>
                <div className="flex gap-2">
                  <Input type="date" {...form.register("date2")} />
                  <Input type="time" {...form.register("time2")} />
                </div>
              </div>
              <div>
                <Label>3ème choix</Label>
                <div className="flex gap-2">
                  <Input type="date" {...form.register("date3")} />
                  <Input type="time" {...form.register("time3")} />
                </div>
              </div>
            </div>
          </div>

          {/* Options supplémentaires */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Options Supplémentaires</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="reserveRoom"
                  checked={form.watch("reserveRoom")}
                  onCheckedChange={(checked) => form.setValue("reserveRoom", !!checked)}
                />
                <Label htmlFor="reserveRoom">Réserver une salle de réception</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="photoSpace"
                  checked={form.watch("photoSpace")}
                  onCheckedChange={(checked) => form.setValue("photoSpace", !!checked)}
                />
                <Label htmlFor="photoSpace">Espace photo souhaité</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="onlinePayment"
                  checked={form.watch("onlinePayment")}
                  onCheckedChange={(checked) => form.setValue("onlinePayment", !!checked)}
                />
                <Label htmlFor="onlinePayment">Paiement en ligne</Label>
              </div>
            </div>
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
                J'autorise la mairie à me contacter pour cette demande *
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isSubmitting}>
            {isSubmitting ? "Envoi en cours..." : "Envoyer la demande de mariage"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
