"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Handshake, Target, Clock } from "lucide-react"

interface PartenaritDetailsStepProps {
  data: any
  onChange: (data: any) => void
}

export function PartenaritDetailsStep({ data, onChange }: PartenaritDetailsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
          <Handshake className="w-6 h-6 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Détails du partenariat</h2>
        <p className="text-gray-600 mt-2">Décrivez votre proposition de collaboration</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Nature du partenariat
            </CardTitle>
            <CardDescription>Quel type de collaboration souhaitez-vous établir ?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="partnershipNature">Type de partenariat *</Label>
              <Select
                value={data.partnershipNature || ""}
                onValueChange={(value) => onChange({ partnershipNature: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type de partenariat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="technique">Technique</SelectItem>
                  <SelectItem value="culturel">Culturel</SelectItem>
                  <SelectItem value="educatif">Éducatif</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="proposalDescription">Description de la proposition *</Label>
              <Textarea
                id="proposalDescription"
                placeholder="Décrivez en détail votre proposition de partenariat..."
                value={data.proposalDescription || ""}
                onChange={(e) => onChange({ proposalDescription: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <Label htmlFor="expectedBenefits">Bénéfices attendus</Label>
              <Textarea
                id="expectedBenefits"
                placeholder="Quels sont les bénéfices mutuels attendus ?"
                value={data.expectedBenefits || ""}
                onChange={(e) => onChange({ expectedBenefits: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              Durée et modalités
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="partnershipDuration">Durée du partenariat *</Label>
              <Select
                value={data.partnershipDuration || ""}
                onValueChange={(value) => onChange({ partnershipDuration: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la durée" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6-mois">6 mois</SelectItem>
                  <SelectItem value="1-an">1 an</SelectItem>
                  <SelectItem value="2-ans">2 ans</SelectItem>
                  <SelectItem value="3-ans">3 ans</SelectItem>
                  <SelectItem value="5-ans">5 ans</SelectItem>
                  <SelectItem value="indefinie">Durée indéfinie</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="investmentAmount">Montant d'investissement prévu</Label>
              <Input
                id="investmentAmount"
                placeholder="Ex: 50 000 €"
                value={data.investmentAmount || ""}
                onChange={(e) => onChange({ investmentAmount: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="additionalInfo">Informations complémentaires</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Toute information supplémentaire pertinente..."
                value={data.additionalInfo || ""}
                onChange={(e) => onChange({ additionalInfo: e.target.value })}
                rows={3}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
