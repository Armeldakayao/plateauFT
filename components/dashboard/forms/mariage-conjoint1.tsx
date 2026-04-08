"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, User, Calendar, MapPin, Phone, Mail, CreditCard } from "lucide-react"

interface MariageConjoint1StepProps {
  data: any
  onChange: (data: any) => void
}

export function MariageConjoint1Step({ data, onChange }: MariageConjoint1StepProps) {
  const handleChange = (field: string, value: string) => {
    onChange({
      conjoint1: {
        ...data.conjoint1,
        [field]: value,
      },
    })
  }

  const conjoint1 = data.conjoint1 || {}

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-pink-600" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Premier conjoint</h3>
        <p className="text-muted-foreground">Informations personnelles du premier conjoint</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint1-nom" className="font-medium">
                Nom *
              </Label>
            </div>
            <Input
              id="conjoint1-nom"
              value={conjoint1.nom || ""}
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
              <Label htmlFor="conjoint1-prenom" className="font-medium">
                Prénom *
              </Label>
            </div>
            <Input
              id="conjoint1-prenom"
              value={conjoint1.prenom || ""}
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
              <Label htmlFor="conjoint1-dob" className="font-medium">
                Date de naissance *
              </Label>
            </div>
            <Input
              id="conjoint1-dob"
              type="date"
              value={conjoint1.dob || ""}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="border-primary/20 focus:border-primary"
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <Label htmlFor="conjoint1-pob" className="font-medium">
                Lieu de naissance *
              </Label>
            </div>
            <Input
              id="conjoint1-pob"
              value={conjoint1.pob || ""}
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
              <Label htmlFor="conjoint1-nationality" className="font-medium">
                Nationalité *
              </Label>
            </div>
            <Input
              id="conjoint1-nationality"
              value={conjoint1.nationality || ""}
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
              <Label htmlFor="conjoint1-profession" className="font-medium">
                Profession *
              </Label>
            </div>
            <Input
              id="conjoint1-profession"
              value={conjoint1.profession || ""}
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
              <Label htmlFor="conjoint1-address" className="font-medium">
                Adresse complète *
              </Label>
            </div>
            <Input
              id="conjoint1-address"
              value={conjoint1.address || ""}
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
              <Label htmlFor="conjoint1-phone" className="font-medium">
                Téléphone *
              </Label>
            </div>
            <Input
              id="conjoint1-phone"
              value={conjoint1.phone || ""}
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
              <Label htmlFor="conjoint1-email" className="font-medium">
                Email *
              </Label>
            </div>
            <Input
              id="conjoint1-email"
              type="email"
              value={conjoint1.email || ""}
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
              <Label htmlFor="conjoint1-idNumber" className="font-medium">
                N° Pièce d'identité *
              </Label>
            </div>
            <Input
              id="conjoint1-idNumber"
              value={conjoint1.idNumber || ""}
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
              <Label htmlFor="conjoint1-maritalStatus" className="font-medium">
                Statut matrimonial *
              </Label>
            </div>
            <Select
              value={conjoint1.maritalStatus || ""}
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
