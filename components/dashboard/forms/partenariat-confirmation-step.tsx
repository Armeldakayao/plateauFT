"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertTriangle, FileText } from "lucide-react"

interface PartenaritConfirmationStepProps {
  data: any
  onChange: (data: any) => void
}

export function PartenaritConfirmationStep({ data, onChange }: PartenaritConfirmationStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Confirmation</h2>
        <p className="text-gray-600 mt-2">Vérifiez vos informations et confirmez votre demande</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            Résumé de votre demande
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Contact :</span>
              <p className="text-gray-600">
                {data.nom} {data.prenom}
              </p>
              <p className="text-gray-600">{data.email}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Organisation :</span>
              <p className="text-gray-600">{data.organizationName}</p>
              <p className="text-gray-600">{data.organizationType}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Type de partenariat :</span>
              <p className="text-gray-600">{data.partnershipNature}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Durée :</span>
              <p className="text-gray-600">{data.partnershipDuration}</p>
            </div>
          </div>

          {data.proposalDescription && (
            <div>
              <span className="font-medium text-gray-700">Description :</span>
              <p className="text-gray-600 text-sm mt-1">{data.proposalDescription}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
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
              J'autorise les services municipaux à me contacter concernant cette demande
            </Label>
          </div>

          <div className="flex items-start space-x-3">
            <Checkbox
              id="acknowledgeNoValidation"
              checked={data.acknowledgeNoValidation || false}
              onCheckedChange={(checked) => onChange({ acknowledgeNoValidation: checked })}
            />
            <Label htmlFor="acknowledgeNoValidation" className="text-sm leading-relaxed">
              Je comprends que cette demande ne constitue pas une validation automatique du partenariat
            </Label>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
