"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"

interface Step {
  id: string
  title: string
  description?: string
  component: React.ComponentType<any>
  validation?: (data: any) => boolean
}

interface MultiStepFormProps {
  steps: Step[]
  onSubmit: (data: any) => void
  initialData?: any
  isLoading?: boolean,
  email?: string
}

export function MultiStepForm({ steps, onSubmit, initialData = {}, isLoading,email }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState(initialData)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    const step = steps[currentStep]
    if (step.validation && !step.validation(formData)) {
      return
    }

    setCompletedSteps((prev) => new Set([...prev, currentStep]))

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onSubmit(formData)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep || completedSteps.has(stepIndex)) {
      setCurrentStep(stepIndex)
    }
  }

  const updateFormData = (data: any) => {
     //@ts-ignore
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-foreground">Nouvelle Demande</h1>
          <span className="text-sm text-muted-foreground">
            Étape {currentStep + 1} sur {steps.length}
          </span>
        </div>

        <Progress value={progress} className="mb-6" />

        {/* Step Indicators */}
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center cursor-pointer" onClick={() => handleStepClick(index)}>
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                  ${
                    index < currentStep || completedSteps.has(index)
                      ? "bg-primary text-primary-foreground"
                      : index === currentStep
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                  }
                `}
              >
                {index < currentStep || completedSteps.has(index) ? <Check className="w-5 h-5" /> : index + 1}
              </div>
              <div className="ml-3 hidden md:block">
                <p
                  className={`text-sm font-medium ${
                    index <= currentStep ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {step.title}
                </p>
                {step.description && <p className="text-xs text-muted-foreground">{step.description}</p>}
              </div>
              {index < steps.length - 1 && <div className="w-12 h-px bg-border mx-4 hidden md:block" />}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card className="shadow-lg">
        <CardHeader className="bg-card border-b">
          <CardTitle className="text-xl">{steps[currentStep].title}</CardTitle>
          {steps[currentStep].description && <p className="text-muted-foreground">{steps[currentStep].description}</p>}
        </CardHeader>
        <CardContent className="p-6 max-h-[55vh] overflow-y-auto">
          <CurrentStepComponent  data={formData} onChange={updateFormData} />
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center gap-2 bg-transparent"
        >
          <ChevronLeft className="w-4 h-4" />
          Précédent
        </Button>

        <Button onClick={handleNext} disabled={isLoading} className="flex items-center gap-2">
          {currentStep === steps.length - 1 ? (
            isLoading ? (
              "Envoi..."
            ) : (
              "Soumettre"
            )
          ) : (
            <>
              Suivant
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
