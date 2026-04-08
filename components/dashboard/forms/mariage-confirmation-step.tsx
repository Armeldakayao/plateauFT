"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckCircle, Heart, FileText } from "lucide-react"

interface MariageConfirmationStepProps {
  data: any
  onChange: (data: any) => void
}

export function MariageConfirmationStep({ data, onChange }: MariageConfirmationStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
          <Heart className="w-6 h-6 text-rose-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Confirmation</h2>
        <p className="text-gray-600 mt-2">Vérifiez vos informations et confirmez votre demande</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-rose-600" />
            Résumé de votre demande
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Premier conjoint</h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Nom :</span> {data.conjoint1?.nom} {data.conjoint1?.prenom}
                </p>
                <p>
                  <span className="font-medium">Date de naissance :</span> {data.conjoint1?.dob}
                </p>
                <p>
                  <span className="font-medium">Nationalité :</span> {data.conjoint1?.nationality}
                </p>
                <p>
                  <span className="font-medium">Email :</span> {data.conjoint1?.email}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-2">Deuxième conjoint</h4>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Nom :</span> {data.conjoint2?.nom} {data.conjoint2?.prenom}
                </p>
                <p>
                  <span className="font-medium">Date de naissance :</span> {data.conjoint2?.dob}
                </p>
                <p>
                  <span className="font-medium">Nationalité :</span> {data.conjoint2?.nationality}
                </p>
                <p>
                  <span className="font-medium">Email :</span> {data.conjoint2?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-2">Détails de la célébration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <span className="font-medium">Type :</span> {data.marriageType}
                </p>
                <p>
                  <span className="font-medium">Invités :</span> {data.guestEstimate}
                </p>
                <p>
                  <span className="font-medium">Langue :</span> {data.celebrationLanguage}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-medium">1er choix :</span> {data.date1} à {data.time1}
                </p>
                <p>
                  <span className="font-medium">2e choix :</span> {data.date2} à {data.time2}
                </p>
                <p>
                  <span className="font-medium">3e choix :</span> {data.date3} à {data.time3}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-rose-600" />
            Confirmations requises
          </CardTitle>
          <CardDescription>Veuillez confirmer les points suivants avant de soumettre votre demande</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="certifyAccuracy"
              checked={data.certifyAccuracy || false}
              onCheckedChange={(checked) => onChange({ certifyAccuracy: checked })}
            />
            <Label htmlFor="certifyAccuracy" className="text-sm leading-relaxed">
              Je certifie que toutes les informations fournies sont exactes et complètes
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="authorizeContact"
              checked={data.authorizeContact || false}
              onCheckedChange={(checked) => onChange({ authorizeContact: checked })}
            />
            <Label htmlFor="authorizeContact" className="text-sm leading-relaxed">
              J'autorise les services municipaux à me contacter concernant cette demande de mariage
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="acknowledgeDocuments"
              checked={data.acknowledgeDocuments || false}
              onCheckedChange={(checked) => onChange({ acknowledgeDocuments: checked })}
            />
            <Label htmlFor="acknowledgeDocuments" className="text-sm leading-relaxed">
              Je comprends que des documents justificatifs seront requis pour finaliser la demande
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
