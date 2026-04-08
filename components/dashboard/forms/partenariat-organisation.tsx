"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Building } from "lucide-react"

interface PartenaritOrganizationStepProps {
  data: any
  onChange: (data: any) => void
}

export function PartenaritOrganizationStep({ data, onChange }: PartenaritOrganizationStepProps) {
  const handleChange = (field: string, value: string | number) => {
    onChange({ [field]: value })
  }

  const organizationTypes = [
    { value: "association", label: "Association" },
    { value: "entreprise", label: "Entreprise privée" },
    { value: "ong", label: "ONG" },
    { value: "institution", label: "Institution publique" },
    { value: "autre", label: "Autre" },
  ]

  const activitySectors = [
    { value: "education", label: "Éducation" },
    { value: "sante", label: "Santé" },
    { value: "environnement", label: "Environnement" },
    { value: "culture", label: "Culture" },
    { value: "sport", label: "Sport" },
    { value: "social", label: "Social" },
    { value: "economie", label: "Économie" },
    { value: "autre", label: "Autre" },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Votre organisation</h3>
        <p className="text-muted-foreground">Informations sur la structure qui souhaite établir un partenariat</p>
      </div>

      <Card className="border-primary/20">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="organizationName" className="font-medium">
                Nom de l'organisation *
              </Label>
              <Input
                id="organizationName"
                value={data.organizationName || ""}
                onChange={(e) => handleChange("organizationName", e.target.value)}
                placeholder="Nom complet de votre organisation"
                className="mt-2 border-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <Label htmlFor="organizationType" className="font-medium">
                Type d'organisation *
              </Label>
              <Select
                value={data.organizationType || ""}
                onValueChange={(value) => handleChange("organizationType", value)}
              >
                <SelectTrigger className="mt-2 border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Sélectionnez le type" />
                </SelectTrigger>
                <SelectContent>
                  {organizationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="activitySector" className="font-medium">
                Secteur d'activité *
              </Label>
              <Select
                value={data.activitySector || ""}
                onValueChange={(value) => handleChange("activitySector", value)}
              >
                <SelectTrigger className="mt-2 border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Sélectionnez le secteur" />
                </SelectTrigger>
                <SelectContent>
                  {activitySectors.map((sector) => (
                    <SelectItem key={sector.value} value={sector.value}>
                      {sector.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="creationYear" className="font-medium">
                Année de création
              </Label>
              <Input
                id="creationYear"
                type="number"
                value={data.creationYear || ""}
                onChange={(e) => handleChange("creationYear", Number.parseInt(e.target.value) || 0)}
                placeholder="2020"
                className="mt-2 border-primary/20 focus:border-primary"
                min="1900"
                max={new Date().getFullYear()}
              />
            </div>

            <div>
              <Label htmlFor="originCountry" className="font-medium">
                Pays d'origine *
              </Label>
              <Input
                id="originCountry"
                value={data.originCountry || ""}
                onChange={(e) => handleChange("originCountry", e.target.value)}
                placeholder="Côte d'Ivoire"
                className="mt-2 border-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <Label htmlFor="originCity" className="font-medium">
                Ville d'origine
              </Label>
              <Input
                id="originCity"
                value={data.originCity || ""}
                onChange={(e) => handleChange("originCity", e.target.value)}
                placeholder="Abidjan"
                className="mt-2 border-primary/20 focus:border-primary"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="website" className="font-medium">
                Site web
              </Label>
              <Input
                id="website"
                type="url"
                value={data.website || ""}
                onChange={(e) => handleChange("website", e.target.value)}
                placeholder="https://www.votre-organisation.com"
                className="mt-2 border-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
