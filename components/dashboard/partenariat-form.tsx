"use client"

import { PartenaritRequest } from "@/lib/types/service-request"
import { MultiStepForm } from "./multi-step-form"
import { PartenaritPersonalStep } from "./forms/partenariat-personnal"
import { PartenaritOrganizationStep } from "./forms/partenariat-organisation"
import { PartenaritDetailsStep } from "./forms/partenariat-details-step"
import { PartenaritConfirmationStep } from "./forms/partenariat-confirmation-step"


interface PartenaritRequestFormProps {
  onSubmit: (data: PartenaritRequest) => void
  isLoading?: boolean
}

export function PartenaritRequestForm({ onSubmit, isLoading }: PartenaritRequestFormProps) {
  const steps = [
    {
      id: "personal-info",
      title: "Contact principal",
      description: "Informations du responsable de la demande",
      component: PartenaritPersonalStep,
      validation: (data: any) => {
        return !!(data.nom && data.prenom && data.email)
      },
    },
    {
      id: "organization",
      title: "Organisation",
      description: "Informations sur votre structure",
      component: PartenaritOrganizationStep,
      validation: (data: any) => {
        return !!(data.organizationName && data.organizationType && data.activitySector && data.originCountry)
      },
    },
    {
      id: "partnership-details",
      title: "Détails du partenariat",
      description: "Votre proposition de collaboration",
      component: PartenaritDetailsStep,
      validation: (data: any) => {
        return !!(data.partnershipNature && data.proposalDescription && data.partnershipDuration)
      },
    },
    {
      id: "confirmation",
      title: "Confirmation",
      description: "Vérifiez et confirmez votre demande",
      component: PartenaritConfirmationStep,
      validation: (data: any) => {
        return !!(data.certifyAccuracy && data.authorizeContact && data.acknowledgeNoValidation)
      },
    },
  ]

  return <MultiStepForm steps={steps} onSubmit={onSubmit} isLoading={isLoading} />
}
