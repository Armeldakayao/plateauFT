"use client"

import { MariageRequest } from "@/lib/types/service-request"
import { MariageConjoint1Step } from "./forms/mariage-conjoint1"
import { MariageConjoint2Step } from "./forms/maraige-conjoint2"
import { MultiStepForm } from "./multi-step-form"
import { MariageCelebrationStep } from "./forms/mariage-celebration-step"
import { MariageConfirmationStep } from "./forms/mariage-confirmation-step"



interface MariageRequestFormProps {
  onSubmit: (data: MariageRequest) => void
  isLoading?: boolean
}

export function MariageRequestForm({ onSubmit, isLoading }: MariageRequestFormProps) {
  const steps = [
    {
      id: "conjoint1",
      title: "Premier conjoint",
      description: "Informations du premier conjoint",
      component: MariageConjoint1Step,
      validation: (data: any) => {
        const c1 = data.conjoint1
        return !!(
          c1?.nom &&
          c1?.prenom &&
          c1?.dob &&
          c1?.pob &&
          c1?.nationality &&
          c1?.profession &&
          c1?.address &&
          c1?.phone &&
          c1?.email &&
          c1?.idNumber &&
          c1?.maritalStatus
        )
      },
    },
    {
      id: "conjoint2",
      title: "Deuxième conjoint",
      description: "Informations du deuxième conjoint",
      component: MariageConjoint2Step,
      validation: (data: any) => {
        const c2 = data.conjoint2
        return !!(
          c2?.nom &&
          c2?.prenom &&
          c2?.dob &&
          c2?.pob &&
          c2?.nationality &&
          c2?.profession &&
          c2?.address &&
          c2?.phone &&
          c2?.email &&
          c2?.idNumber &&
          c2?.maritalStatus
        )
      },
    },
    {
      id: "celebration",
      title: "Détails de la célébration",
      description: "Type de mariage et créneaux préférés",
      component: MariageCelebrationStep,
      validation: (data: any) => {
        return !!(
          data.marriageType &&
          data.guestEstimate &&
          data.celebrationLanguage &&
          data.date1 &&
          data.time1 &&
          data.date2 &&
          data.time2 &&
          data.date3 &&
          data.time3
        )
      },
    },
    {
      id: "confirmation",
      title: "Confirmation",
      description: "Vérifiez vos informations et confirmez",
      component: MariageConfirmationStep,
      validation: (data: any) => {
        return !!(data.certifyAccuracy && data.authorizeContact)
      },
    },
  ]

  return <MultiStepForm steps={steps} onSubmit={onSubmit} isLoading={isLoading} />
}
