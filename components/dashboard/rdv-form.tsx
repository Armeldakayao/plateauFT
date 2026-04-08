"use client"
import { RdvRequest } from "@/lib/types/service-request"
import { ConfirmationStep } from "./forms/confirmation-steps"
import { PersonalInfoStep } from "./forms/partenariat-info"
import { RdvDetailsStep } from "./forms/rdv-details"
import { TimeSlotStep } from "./forms/time-slot-step"
import { MultiStepForm } from "./multi-step-form"
import { useProfile } from "@/hooks"


interface RdvRequestFormProps {
  onSubmit: (data: RdvRequest) => void
  isLoading?: boolean
}

export function RdvRequestForm({ onSubmit, isLoading }: RdvRequestFormProps) {
  const { data: profileData } = useProfile()
  //@ts-ignore
  const userEmail = profileData?.email??""
  const steps = [
    {
      id: "personal-info",
      title: "Informations personnelles",
      description: "Vos coordonnées et informations de contact",
      component: PersonalInfoStep,
      validation: (data: any) => {
        return !!(
          data.nom &&
          data.prenom &&
          data.email &&
          data.telephone &&
          data.profession &&
          data.institution &&
          data.nationalId
        )
      },
    },
    {
      id: "rdv-details",
      title: "Détails du rendez-vous",
      description: "Objectif et sujet de votre demande",
      component: RdvDetailsStep,
      validation: (data: any) => {
        return !!(data.meetingTarget && data.subject && data.meetingType)
      },
    },
    {
      id: "time-slots",
      title: "Créneaux préférés",
      description: "Choisissez vos créneaux de disponibilité",
      component: TimeSlotStep,
      validation: (data: any) => {
        return !!(data.preferredSlot1 && data.preferredSlot2 && data.preferredSlot3)
      },
    },
    {
      id: "confirmation",
      title: "Confirmation",
      description: "Vérifiez vos informations et confirmez",
      component: ConfirmationStep,
      validation: (data: any) => {
        return !!(data.certifyAccuracy && data.authorizeContact)
      },
    },
  ]

  return <MultiStepForm email={userEmail} steps={steps} onSubmit={onSubmit} isLoading={isLoading} />
}
