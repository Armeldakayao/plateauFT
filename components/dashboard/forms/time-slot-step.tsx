"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react"

interface TimeSlotStepProps {
  data: any
  onChange: (data: any) => void
}

export function TimeSlotStep({ data, onChange }: TimeSlotStepProps) {
  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value })
  }

  const slots = [
    { key: "preferredSlot1", label: "Premier choix", priority: "Priorité 1" },
    { key: "preferredSlot2", label: "Deuxième choix", priority: "Priorité 2" },
    { key: "preferredSlot3", label: "Troisième choix", priority: "Priorité 3" },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Vos créneaux de disponibilité</h3>
        <p className="text-muted-foreground">Proposez 3 créneaux pour maximiser vos chances d'obtenir un rendez-vous</p>
      </div>

      <div className="space-y-4">
        {slots.map((slot, index) => (
          <Card key={slot.key} className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                    index === 0 ? "bg-green-500" : index === 1 ? "bg-blue-500" : "bg-orange-500"
                  }`}
                >
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{slot.label}</h4>
                  <p className="text-sm text-muted-foreground">{slot.priority}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <Clock className="w-5 h-5 text-primary" />
                <Label htmlFor={slot.key} className="font-medium">
                  Date et heure souhaitées *
                </Label>
              </div>

              <Input
                id={slot.key}
                type="datetime-local"
                value={data[slot.key] || ""}
                onChange={(e) => handleChange(slot.key, e.target.value)}
                className="border-primary/20 focus:border-primary"
                min={new Date().toISOString().slice(0, 16)}
              />

              <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  {index === 0 && "Votre créneau préféré - nous essaierons de le respecter en priorité"}
                  {index === 1 && "Votre alternative si le premier créneau n'est pas disponible"}
                  {index === 2 && "Votre dernier recours pour garantir l'obtention d'un rendez-vous"}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Conseils pour vos créneaux</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Évitez les heures de pointe (12h-14h)</li>
                <li>• Prévoyez au moins 48h à l'avance</li>
                <li>• Les matinées sont généralement plus disponibles</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
