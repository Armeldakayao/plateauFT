"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, User, Clock, CheckCircle, AlertCircle, Download, Upload, ArrowLeft } from "lucide-react"
import Link from "next/link"

import { useParams } from "next/navigation"
import { useServiceRequest } from "@/hooks/services-requests/use-service-request"
import Sidebar from "@/components/sidebar"

export default function RequestDetailPage() {
  const params = useParams()
  const requestId = params.id as string

  const { data: request, isLoading } = useServiceRequest(requestId)
console.log(request,"request");
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valide":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "en_cours":
        return <Clock className="w-5 h-5 text-blue-600" />
      case "nouveau":
        return <AlertCircle className="w-5 h-5 text-orange-600" />
      default:
        return <FileText className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      valide: "bg-green-100 text-green-800 border-green-200",
      en_cours: "bg-blue-100 text-blue-800 border-blue-200",
      nouveau: "bg-orange-100 text-orange-800 border-orange-200",
      traite: "bg-purple-100 text-purple-800 border-purple-200",
      rejete: "bg-red-100 text-red-800 border-red-200",
    }

    const labels = {
      valide: "Validé",
      en_cours: "En cours",
      nouveau: "Nouveau",
      traite: "Traité",
      rejete: "Rejeté",
    }

    return (
      <Badge
        className={`${variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"} border text-sm px-3 py-1`}
      >
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  const getTypeLabel = (type: string) => {
    const labels = {
      rdv: "Rendez-vous",
      partenariat: "Partenariat",
      mariage: "Mariage",
    }
    return labels[type as keyof typeof labels] || type
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement des détails...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Demande introuvable</h3>
              <p className="text-muted-foreground mb-6">Cette demande n'existe pas ou vous n'y avez pas accès.</p>
              <Link href="/client/requests">
                <Button className="bg-primary hover:bg-primary/90">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à mes demandes
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <Sidebar />
      <div className="ml-72 mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/client/mes-demandes">
            <Button variant="outline" size="sm" className="bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-foreground mb-2">Détails de la demande</h1>
            <p className="text-muted-foreground">Référence: {
               //@ts-ignore
            request.numeroReference}</p>
          </div>
        </div>

        {/* Request Overview */}
        <Card className="shadow-lg border-0 mb-6">
          <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                { //@ts-ignore
                getStatusIcon(request.status)}
                <div>
                  <CardTitle className="text-xl">{
                     //@ts-ignore
                  getTypeLabel(request.type)}</CardTitle>
                  <p className="text-white/80">Créée le {
                     //@ts-ignore
                  new Date(request.createdAt).toLocaleDateString("fr-FR")}</p>
                </div>
              </div>
              { //@ts-ignore
              getStatusBadge(request.status)}
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Date de création</p>
                  <p className="text-sm text-muted-foreground">
                    { //@ts-ignore
                    new Date(request.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Dernière mise à jour</p>
                  <p className="text-sm text-muted-foreground">
                    { //@ts-ignore
                    new Date(request.updatedAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium">Documents</p>
                  <p className="text-sm text-muted-foreground">{
                     //@ts-ignore
                  request.documents?.length || 0} fichier(s)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Request Data */}
        <Card className="shadow-lg border-0 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations de la demande
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              { //@ts-ignore
              request.demande &&
               //@ts-ignore
                Object.entries(request.demande).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                    <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1").toLowerCase()}:</span>
                    <span className="text-muted-foreground">{String(value)}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* Treatments */}
        { //@ts-ignore
        request.traitements && request.traitements.length > 0 && (
          <Card className="shadow-lg border-0 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Historique des traitements
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                { //@ts-ignore
                request.traitements.map((treatment: any, index: number) => (
                  <div key={treatment.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Traitement #{index + 1}</h4>
                      <Badge variant="outline">{treatment.etat}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Agent: {treatment.agentNom} {treatment.agentPrenom}
                    </p>
                    {treatment.messageAgent && (
                      <p className="text-sm bg-muted/50 p-3 rounded">{treatment.messageAgent}</p>
                    )}
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(treatment.createdAt).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Documents */}
        { //@ts-ignore
        request.documents && request.documents.length > 0 && (
          <Card className="shadow-lg border-0 mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                { //@ts-ignore
                request.documents.map((document: any) => (
                  <div key={document.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{document.nom}</h4>
                        <p className="text-sm text-muted-foreground">{document.type}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(document.createdAt).toLocaleDateString("fr-FR")}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Actions */}
        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              { //@ts-ignore
              request.status === "en_cours" && (
                 //@ts-ignore
                <Link href={`/client/requests/${request.id}/documents`} className="flex-1">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    <Upload className="w-4 h-4 mr-2" />
                    Ajouter des documents
                  </Button>
                </Link>
              )}

              <Link href="/client/requests" className="flex-1">
                <Button variant="outline" className="w-full bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour à mes demandes
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
