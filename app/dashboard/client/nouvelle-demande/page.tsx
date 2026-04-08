"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Handshake, ArrowRight, Clock, FileText, CheckCircle } from "lucide-react"
import { RdvRequestForm } from "@/components/dashboard/rdv-request-form"
import { MariageRequestForm } from "@/components/dashboard/mariage-request-form"


type ServiceType = "rdv" | "mariage" | "partenariat" | null

export default function NouvelleDemandesPage() {
  const [selectedService, setSelectedService] = useState<ServiceType>(null)

  const services = [
    {
      id: "rdv",
      title: "Demande de Rendez-vous",
      description: "Prendre rendez-vous avec un service de la mairie",
      icon: Calendar,
      color: "bg-blue-500",
      features: ["Choix de créneaux", "Confirmation automatique", "Rappel par email", "Modification possible"],
      duration: "5-10 minutes",
      processing: "24-48h",
    },
    {
      id: "mariage",
      title: "Célébration de Mariage",
      description: "Demande de célébration de mariage civil",
      icon: Users,
      color: "bg-pink-500",
      features: ["Informations des conjoints", "Choix de dates", "Options de célébration", "Réservation de salle"],
      duration: "15-20 minutes",
      processing: "5-10 jours",
    },
    {
      id: "partenariat",
      title: "Proposition de Partenariat",
      description: "Proposer un partenariat avec la mairie",
      icon: Handshake,
      color: "bg-green-500",
      features: [
        "Présentation de l'organisation",
        "Détails du partenariat",
        "Objectifs et bénéfices",
        "Durée et modalités",
      ],
      duration: "10-15 minutes",
      processing: "7-14 jours",
    },
  ]

  const handleServiceSelect = (serviceId: ServiceType) => {
    setSelectedService(serviceId)
  }

  const handleFormSuccess = () => {
    setSelectedService(null)
  }

  if (selectedService === "rdv") {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setSelectedService(null)} className="mb-4">
              ← Retour aux services
            </Button>
          </div>
          <RdvRequestForm onSuccess={handleFormSuccess} />
        </div>
      </div>
    )
  }

  if (selectedService === "mariage") {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Button variant="outline" onClick={() => setSelectedService(null)} className="mb-4">
              ← Retour aux services
            </Button>
          </div>
          <MariageRequestForm onSuccess={handleFormSuccess} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">Nouvelle Demande de Service</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choisissez le type de service que vous souhaitez demander. Nos formulaires sont conçus pour être simples et
            rapides à remplir.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20 group"
                onClick={() => handleServiceSelect(service.id as ServiceType)}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 ${service.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Inclus dans cette demande :</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Info badges */}
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {service.duration}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <FileText className="w-3 h-3 mr-1" />
                      Traitement: {service.processing}
                    </Badge>
                  </div>

                  {/* Action button */}
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 group-hover:bg-primary/90 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleServiceSelect(service.id as ServiceType)
                    }}
                  >
                    Commencer la demande
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Help Section */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Besoin d'aide ?</h3>
            <p className="text-blue-700 mb-4">
              Notre équipe est là pour vous accompagner dans vos démarches administratives.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent">
                📞 Nous appeler
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent">
                💬 Chat en ligne
              </Button>
              <Button variant="outline" className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent">
                📧 Nous écrire
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
