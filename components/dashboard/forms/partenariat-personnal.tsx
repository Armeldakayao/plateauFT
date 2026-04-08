"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { User, Mail, Users } from "lucide-react"
import { useProfile } from "@/hooks"
import { useEffect } from "react"

interface PartenaritPersonalStepProps {
  data: any
  onChange: (data: any) => void
}

export function PartenaritPersonalStep({ data, onChange }: PartenaritPersonalStepProps) {
  const { data: profileData } = useProfile()

  // Synchronise automatiquement data avec le profil
  useEffect(() => {
    if (profileData) {
      onChange({
        ...data,
         //@ts-ignore
        nom: profileData.lastName ?? data.nom,
         //@ts-ignore
        prenom: profileData.firstName ?? data.prenom,
         //@ts-ignore
        email: profileData.email ?? data.email,
         //@ts-ignore
        telephone: profileData.phone ?? data.telephone,
         //@ts-ignore
        nationalId: profileData.idNumber ?? data.nationalId,
        profession: data.profession, // laissé modifiable
        institution: data.institution // laissé modifiable
      })
    }
  }, [profileData])
  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Contact principal</h3>
        <p className="text-muted-foreground">Informations du responsable de cette demande de partenariat</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-primary" />
              <Label htmlFor="nom" className="font-medium">
                Nom *
              </Label>
            </div>
            <Input
              id="nom"
              value={data.nom || ""}
              onChange={(e) => handleChange("nom", e.target.value)}
              placeholder="Nom du responsable"
              className="border-primary/20 focus:border-primary"
               //@ts-ignore
              disabled={!!profileData?.lastName}
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-5 h-5 text-primary" />
              <Label htmlFor="prenom" className="font-medium">
                Prénom *
              </Label>
            </div>
            <Input
              id="prenom"
              value={data.prenom || ""}
              onChange={(e) => handleChange("prenom", e.target.value)}
              placeholder="Prénom du responsable"
              className="border-primary/20 focus:border-primary"
               //@ts-ignore
              disabled={!!profileData?.firstName}
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="w-5 h-5 text-primary" />
              <Label htmlFor="email" className="font-medium">
                Email *
              </Label>
            </div>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="email@organisation.com"
              className="border-primary/20 focus:border-primary"
               //@ts-ignore
              disabled={!!profileData?.email}
            />
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <Users className="w-5 h-5 text-primary" />
              <Label htmlFor="contactName" className="font-medium">
                Nom du contact
              </Label>
            </div>
            <Input
              id="contactName"
              value={data.contactName || ""}
              onChange={(e) => handleChange("contactName", e.target.value)}
              placeholder="Personne à contacter"
              className="border-primary/20 focus:border-primary"
              
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
