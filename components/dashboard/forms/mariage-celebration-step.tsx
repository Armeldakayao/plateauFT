"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Globe } from "lucide-react"

interface MariageCelebrationStepProps {
  data: any
  onChange: (data: any) => void
}

export function MariageCelebrationStep({ data, onChange }: MariageCelebrationStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="mx-auto w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center mb-4">
          <Calendar className="w-6 h-6 text-rose-600" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900">Détails de la célébration</h2>
        <p className="text-gray-600 mt-2">Informations sur votre cérémonie de mariage</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-rose-600" />
              Type de cérémonie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="marriageType">Type de mariage *</Label>
              <Select value={data.marriageType || ""} onValueChange={(value) => onChange({ marriageType: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le type de mariage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="civil">Civil uniquement</SelectItem>
                  <SelectItem value="religieux">Religieux uniquement</SelectItem>
                  <SelectItem value="civil-religieux">Civil et religieux</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="guestEstimate">Nombre d'invités estimé *</Label>
              <Input
                id="guestEstimate"
                type="number"
                placeholder="Ex: 50"
                value={data.guestEstimate || ""}
                onChange={(e) => onChange({ guestEstimate: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="celebrationLanguage">Langue de célébration *</Label>
              <Select
                value={data.celebrationLanguage || ""}
                onValueChange={(value) => onChange({ celebrationLanguage: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez la langue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="francais">Français</SelectItem>
                  <SelectItem value="anglais">Anglais</SelectItem>
                  <SelectItem value="espagnol">Espagnol</SelectItem>
                  <SelectItem value="autre">Autre</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-rose-600" />
              Créneaux préférés
            </CardTitle>
            <CardDescription>Proposez 3 créneaux par ordre de préférence</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {[1, 2, 3].map((num) => (
              <div key={num} className="space-y-3">
                <Label className="text-base font-medium">Créneau {num} *</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor={`date${num}`}>Date</Label>
                    <Input
                      id={`date${num}`}
                      type="date"
                      value={data[`date${num}`] || ""}
                      onChange={(e) => onChange({ [`date${num}`]: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`time${num}`}>Heure</Label>
                    <Input
                      id={`time${num}`}
                      type="time"
                      value={data[`time${num}`] || ""}
                      onChange={(e) => onChange({ [`time${num}`]: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-rose-600" />
              Informations complémentaires
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="specialRequests">Demandes spéciales</Label>
              <Input
                id="specialRequests"
                placeholder="Musique, décoration, accessibilité..."
                value={data.specialRequests || ""}
                onChange={(e) => onChange({ specialRequests: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="witnessInfo">Informations sur les témoins</Label>
              <Input
                id="witnessInfo"
                placeholder="Noms et contacts des témoins"
                value={data.witnessInfo || ""}
                onChange={(e) => onChange({ witnessInfo: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
