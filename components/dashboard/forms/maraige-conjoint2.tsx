"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, User, Calendar, MapPin, Phone, Mail, CreditCard } from "lucide-react"

interface MariageConjoint2StepProps {
  data: any
  onChange: (data: any) => void
}

export function MariageConjoint2Step({ data, onChange }: MariageConjoint2StepProps) {
  const handleChange = (field: string, value: string) => {
    onChange({
      conjoint2: {
        ...data.conjoint2,
        [field]: value,
      },
    })
  }

  const conjoint2 = data.conjoint2 || {}

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-pink-600" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Deuxième conjoint</h3>
        <p className="text-muted-foreground">Informations personnelles du deuxième conjoint</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint2-nom" className="font-medium">
                Nom *
              </Label>
            </div>
            <Input
              id="conjoint2-nom"
              value={conjoint2.nom || ""}
              onChange={(e) => handleChange("nom", e.target.value)}
              placeholder="Nom de famille"
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint2-prenom" className="font-medium">
                Prénom *
              </Label>
            </div>
            <Input
              id="conjoint2-prenom"
              value={conjoint2.prenom || ""}
              onChange={(e) => handleChange("prenom", e.target.value)}
              placeholder="Prénom"
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Calendar className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint2-dob" className="font-medium">
                Date de naissance *
              </Label>
            </div>
            <Input
              id="conjoint2-dob"
              type="date"
              value={conjoint2.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint2-pob" className="font-medium">
                Lieu de naissance *
              </Label>
            </div>
            <Input
              id="conjoint2-pob"
              value={conjoint2.pob || ""}
              onChange={(e) => handleChange("pob", e.target.value)}
              placeholder="Ville, Pays"
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint2-nationality" className="font-medium">
                Nationalité *
              </Label>
            </div>
            <Input
              id="conjoint2-nationality"
              value={conjoint2.nationality || ""}
              onChange={(e) => handleChange("nationality", e.target.value)}
              placeholder="Nationalité"
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint2-profession" className="font-medium">
                Profession *
              </Label>
            </div>
            <Input
              id="conjoint2-profession"
              value={conjoint2.profession || ""}
              onChange={(e) => handleChange("profession", e.target.value)}
              placeholder="Profession"
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors md:col-span-2">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint2-address" className="font-medium">
                Adresse complète *
              </Label>
            </div>
            <Input
              id="conjoint2-address"
              value={conjoint2.address || ""}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Adresse complète"
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Phone className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint2-phone" className="font-medium">
                Téléphone *
              </Label>
            </div>
            <Input
              id="conjoint2-phone"
              value={conjoint2.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="+225 XX XX XX XX XX"
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint2-email" className="font-medium">
                Email *
              </Label>
            </div>
            <Input
              id="conjoint2-email"
              type="email"
              value={conjoint2.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="email@exemple.com"
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <CreditCard className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint2-idNumber" className="font-medium">
                N° Pièce d'identité *
              </Label>
            </div>
            <Input
              id="conjoint2-idNumber"
              value={conjoint2.idNumber || ""}
              onChange={(e) => handleChange("idNumber", e.target.value)}
              placeholder="Numéro CNI/Passeport"
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Heart className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint2-maritalStatus" className="font-medium">
                Statut matrimonial *
              </Label>
            </div>
            <Select
              value={conjoint2.maritalStatus || ""}
              onValueChange={(value) => handleChange("maritalStatus", value)}
            >
              <SelectTrigger className="border-primary/20 focus:border-primary">
                <SelectValue placeholder="Sélectionner le statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="celibataire">Célibataire</SelectItem>
                <SelectItem value="divorce">Divorcé(e)</SelectItem>
                <SelectItem value="veuf">Veuf/Veuve</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
