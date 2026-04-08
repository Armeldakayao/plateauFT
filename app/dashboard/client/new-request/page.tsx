"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Users, Heart, ArrowRight, Clock, FileText } from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"

export default function NewRequestPage() {
  const services = [
    {
      id: "rdv",
      title: "Demande de Rendez-vous",
      description: "Planifiez un rendez-vous avec un responsable municipal",
      icon: Calendar,
      color: "from-blue-500 to-blue-600",
      features: ["Choix de créneaux", "Confirmation automatique", "Rappel par email"],
      estimatedTime: "2-3 jours",
      href: "/dashboard/client/new-request/rdv",
    },
    {
      id: "partenariat",
      title: "Demande de Partenariat",
      description: "Proposez un partenariat avec la municipalité",
      icon: Users,
      color: "from-green-500 to-green-600",
      features: ["Évaluation détaillée", "Suivi personnalisé", "Réponse sous 15 jours"],
      estimatedTime: "15-30 jours",
      href: "/dashboard/client/new-request/partenariat",
    },
    {
      id: "mariage",
      title: "Demande de Mariage",
      description: "Organisez votre cérémonie de mariage civil",
      icon: Heart,
      color: "from-pink-500 to-pink-600",
      features: ["Réservation de salle", "Choix de dates", "Services additionnels"],
      estimatedTime: "7-14 jours",
      href: "/dashboard/client/new-request/mariage",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
       
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Nouvelle Demande de Service</h1>
          <p className="text-xl text-muted-foreground  mx-auto">
            Choisissez le type de service que vous souhaitez demander. Nos formulaires guidés vous accompagneront étape
            par étape.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service) => {
            const IconComponent = service.icon
            return (
              <Card
                key={service.id}
                className="group hover:shadow-2xl transition-all duration-300 border overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />

                <CardHeader className="pb-4">
                  <div
                    className={`w-16 h-16 rounded-full bg-gradient-to-r ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <CardTitle className="text-xl text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>

                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-foreground">Inclus :</h4>
                    <ul className="space-y-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Estimated Time */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>Délai estimé : {service.estimatedTime}</span>
                  </div>

                  {/* Action Button */}
                  <Link href={service.href} className="block">
                    <Button
                      className={`w-full bg-gradient-to-r ${service.color} hover:opacity-90 text-white border-0 group-hover:shadow-lg transition-all duration-300`}
                    >
                      Commencer
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Help Section */}
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-8 text-center">
            <FileText className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Besoin d'aide pour choisir ?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Notre équipe est là pour vous accompagner dans vos démarches. N'hésitez pas à nous contacter si vous avez
              des questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                Guide des services
              </Button>
              <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 bg-transparent">
                Nous contacter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
