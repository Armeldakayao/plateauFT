"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Target, MessageSquare, Video, Users, Phone } from "lucide-react"

interface RdvDetailsStepProps {
  data: any
  onChange: (data: any) => void
}

export function RdvDetailsStep({ data, onChange }: RdvDetailsStepProps) {
  const handleChange = (field: string, value: string) => {
    onChange({ [field]: value })
  }

  const meetingTargets = [
    { value: "information", label: "Demande d'information", icon: MessageSquare },
    { value: "plainte", label: "Dépôt de plainte", icon: Target },
    { value: "partenariat", label: "Proposition de partenariat", icon: Users },
    { value: "autre", label: "Autre motif", icon: MessageSquare },
  ]

  const subjects = [
    { value: "urbanisme", label: "Urbanisme et aménagement" },
    { value: "etat-civil", label: "État civil" },
    { value: "social", label: "Affaires sociales" },
    { value: "economie", label: "Développement économique" },
    { value: "culture", label: "Culture et sport" },
    { value: "autre", label: "Autre sujet" },
  ]

  const meetingTypes = [
    { value: "presentiel", label: "Présentiel", icon: Users, desc: "Rendez-vous en personne à la mairie" },
    { value: "visio", label: "Visioconférence", icon: Video, desc: "Rendez-vous par vidéo en ligne" },
    { value: "telephonique", label: "Téléphonique", icon: Phone, desc: "Entretien par téléphone" },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Détails de votre rendez-vous</h3>
        <p className="text-muted-foreground">Précisez l'objectif et le sujet de votre demande</p>
      </div>

      <Card className="border-primary/20">
        <CardContent className="p-6">
          <Label className="text-base font-semibold mb-4 block">Objectif du rendez-vous *</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meetingTargets.map((target) => {
              const IconComponent = target.icon
              return (
                <div
                  key={target.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/60 ${
                    data.meetingTarget === target.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => handleChange("meetingTarget", target.value)}
                >
                  <div className="flex items-center gap-3">
                    <IconComponent
                      className={`w-5 h-5 ${data.meetingTarget === target.value ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <span
                      className={`font-medium ${data.meetingTarget === target.value ? "text-primary" : "text-foreground"}`}
                    >
                      {target.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          {data.meetingTarget === "autre" && (
            <div className="mt-4">
              <Label htmlFor="otherMeetingTarget">Précisez votre objectif</Label>
              <Textarea
                id="otherMeetingTarget"
                value={data.otherMeetingTarget || ""}
                onChange={(e) => handleChange("otherMeetingTarget", e.target.value)}
                placeholder="Décrivez brièvement votre objectif..."
                className="mt-2"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardContent className="p-6">
          <Label className="text-base font-semibold mb-4 block">Sujet concerné *</Label>
          <Select value={data.subject || ""} onValueChange={(value) => handleChange("subject", value)}>
            <SelectTrigger className="border-primary/20 focus:border-primary">
              <SelectValue placeholder="Sélectionnez le domaine concerné" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject.value} value={subject.value}>
                  {subject.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {data.subject === "autre" && (
            <div className="mt-4">
              <Label htmlFor="otherSubject">Précisez le sujet</Label>
              <Textarea
                id="otherSubject"
                value={data.otherSubject || ""}
                onChange={(e) => handleChange("otherSubject", e.target.value)}
                placeholder="Décrivez le sujet de votre demande..."
                className="mt-2"
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardContent className="p-6">
          <Label className="text-base font-semibold mb-4 block">Type de rendez-vous *</Label>
          <div className="grid grid-cols-1 gap-4">
            {meetingTypes.map((type) => {
              const IconComponent = type.icon
              return (
                <div
                  key={type.value}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:border-primary/60 ${
                    data.meetingType === type.value ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                  }`}
                  onClick={() => handleChange("meetingType", type.value)}
                >
                  <div className="flex items-center gap-4">
                    <IconComponent
                      className={`w-6 h-6 ${data.meetingType === type.value ? "text-primary" : "text-muted-foreground"}`}
                    />
                    <div className="flex-1">
                      <div
                        className={`font-medium ${data.meetingType === type.value ? "text-primary" : "text-foreground"}`}
                      >
                        {type.label}
                      </div>
                      <div className="text-sm text-muted-foreground">{type.desc}</div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
