"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, FileText, Handshake, Heart } from "lucide-react"
import Link from "next/link"
import Sidebar from "@/components/sidebar"

const SERVICE_TYPES = [
  {
    type: "rdv",
    title: "Demande de Rendez-vous",
    description: "Prendre rendez-vous avec un service de la mairie",
    icon: Calendar,
    href: "/dashboard/client/service-request/create/rdv",
    color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
  },
  {
    type: "partenariat",
    title: "Demande de Partenariat",
    description: "Proposer un partenariat avec la mairie",
    icon: Handshake,
    href: "/dashboard/client/service-request/create/partenariat",
    color: "bg-green-50 border-green-200 hover:bg-green-100",
  },
  {
    type: "mariage",
    title: "Demande de Mariage",
    description: "Déposer une demande de mariage civil",
    icon: Heart,
    href: "/dashboard/client/service-request/create/mariage",
    color: "bg-pink-50 border-pink-200 hover:bg-pink-100",
  },
]

export default function CreateServiceRequestPage() {
  return (
    <div>
      <Sidebar/>
      <div className="ml-72 p-6 space-y-6">
      {/* Header */}
      <div className="px-10 space-y-2">
        <h1 className="text-3xl font-bold">Nouvelle Demande</h1>
        <p className="text-muted-foreground">Choisissez le type de demande que vous souhaitez effectuer</p>
      </div>

      {/* Service Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-10 mx-auto">
        {SERVICE_TYPES.map((service) => {
          const Icon = service.icon
          return (
            <Card key={service.type} className={`cursor-pointer transition-colors ${service.color}`}>
              <Link href={service.href}>
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 p-3 rounded-full bg-white shadow-sm">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-center">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full bg-transparent" variant="outline">
                    Commencer
                  </Button>
                </CardContent>
              </Link>
            </Card>
          )
        })}
      </div>

      {/* Help Section */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Besoin d'aide ?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Si vous ne savez pas quel type de demande choisir ou si vous avez des questions, n'hésitez pas à nous
            contacter.
          </p>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/contact">Nous contacter</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/faq">FAQ</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </div>
  )
}
