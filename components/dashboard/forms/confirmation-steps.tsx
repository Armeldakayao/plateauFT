"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, User, Calendar, Target, Shield } from "lucide-react"

interface ConfirmationStepProps {
  data: any
  onChange: (data: any) => void
}

export function ConfirmationStep({ data, onChange }: ConfirmationStepProps) {
  const handleChange = (field: string, value: boolean) => {
    onChange({ [field]: value })
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      presentiel: "Présentiel",
      visio: "Visioconférence",
      telephonique: "Téléphonique",
    }
    return labels[type as keyof typeof labels] || type
  }

  const getTargetLabel = (target: string) => {
    const labels = {
      information: "Demande d'information",
      plainte: "Dépôt de plainte",
      partenariat: "Proposition de partenariat",
      autre: "Autre motif",
    }
    return labels[target as keyof typeof labels] || target
  }

  const getSubjectLabel = (subject: string) => {
    const labels = {
      urbanisme: "Urbanisme et aménagement",
      "etat-civil": "État civil",
      social: "Affaires sociales",
      economie: "Développement économique",
      culture: "Culture et sport",
      autre: "Autre sujet",
    }
    return labels[subject as keyof typeof labels] || subject
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Vérification et confirmation</h3>
        <p className="text-muted-foreground">Vérifiez vos informations avant de soumettre votre demande</p>
      </div>

      {/* Résumé des informations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Informations personnelles</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Nom:</span> {data.nom} {data.prenom}
              </p>
              <p>
                <span className="font-medium">Email:</span> {data.email}
              </p>
              <p>
                <span className="font-medium">Téléphone:</span> {data.telephone}
              </p>
              <p>
                <span className="font-medium">Profession:</span> {data.profession}
              </p>
              <p>
                <span className="font-medium">Institution:</span> {data.institution}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-primary" />
              <h4 className="font-semibold">Détails du rendez-vous</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Objectif:</span> {getTargetLabel(data.meetingTarget)}
              </p>
              <p>
                <span className="font-medium">Sujet:</span> {getSubjectLabel(data.subject)}
              </p>
              <p>
                <span className="font-medium">Type:</span> {getTypeLabel(data.meetingType)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h4 className="font-semibold">Créneaux proposés</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { key: "preferredSlot1", label: "1er choix" },
              { key: "preferredSlot2", label: "2ème choix" },
              { key: "preferredSlot3", label: "3ème choix" },
            ].map((slot) => (
              <div key={slot.key} className="p-3 bg-muted/50 rounded-lg">
                <p className="font-medium text-sm">{slot.label}</p>
                <p className="text-sm text-muted-foreground">
                  {data[slot.key] ? new Date(data[slot.key]).toLocaleString("fr-FR") : "Non défini"}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confirmations obligatoires */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h4 className="font-semibold">Confirmations requises</h4>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox
                id="certifyAccuracy"
                checked={data.certifyAccuracy || false}
                onCheckedChange={(checked) => handleChange("certifyAccuracy", !!checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="certifyAccuracy" className="text-sm font-medium cursor-pointer">
                  Je certifie l'exactitude des informations fournies *
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Toute fausse déclaration peut entraîner l'annulation de votre demande
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="authorizeContact"
                checked={data.authorizeContact || false}
                onCheckedChange={(checked) => handleChange("authorizeContact", !!checked)}
                className="mt-1"
              />
              <div className="flex-1">
                <Label htmlFor="authorizeContact" className="text-sm font-medium cursor-pointer">
                  J'autorise la mairie à me contacter pour ce rendez-vous *
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Nous vous contacterons uniquement dans le cadre de votre demande
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-200 bg-green-50/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900 mb-1">Prochaines étapes</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Vous recevrez un email de confirmation</li>
                <li>• Un agent vous contactera sous 48h</li>
                <li>• Votre rendez-vous sera confirmé par email</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
