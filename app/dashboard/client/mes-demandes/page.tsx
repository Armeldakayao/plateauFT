"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Search, Eye, Upload, Calendar, Clock, CheckCircle, AlertCircle, Plus } from "lucide-react"
import Link from "next/link"
import { useMyServiceRequests } from "@/hooks/services-requests/use-service-request"
import Sidebar from "@/components/sidebar"


export default function ClientRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const { data: requestsData, isLoading } = useMyServiceRequests()
  const requests = requestsData?.data || []

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "valide":
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case "en_cours":
        return <Clock className="w-4 h-4 text-blue-600" />
      case "nouveau":
        return <AlertCircle className="w-4 h-4 text-orange-600" />
      default:
        return <FileText className="w-4 h-4 text-gray-600" />
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
      <Badge className={`${variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"} border`}>
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

  const filteredRequests = requests?.filter((request: any) => {
    const matchesSearch =
      request?.demande?.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getTypeLabel(request.type).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || request.status === statusFilter
    const matchesType = typeFilter === "all" || request.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <Sidebar/>
      <div className="ml-72 mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Mes Demandes</h1>
            <p className="text-muted-foreground">Suivez l'état de vos demandes de services</p>
          </div>
          <Link href="/dashboard/client/new-request">
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              Nouvelle Demande
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-6 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Rechercher par référence ou type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48 border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Filtrer par statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="nouveau">Nouveau</SelectItem>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="valide">Validé</SelectItem>
                  <SelectItem value="traite">Traité</SelectItem>
                  <SelectItem value="rejete">Rejeté</SelectItem>
                </SelectContent>
              </Select>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48 border-primary/20 focus:border-primary">
                  <SelectValue placeholder="Filtrer par type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="rdv">Rendez-vous</SelectItem>
                  <SelectItem value="partenariat">Partenariat</SelectItem>
                  <SelectItem value="mariage">Mariage</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Chargement de vos demandes...</p>
          </div>
        ) : filteredRequests?.length === 0 ? (
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">Aucune demande trouvée</h3>
              <p className="text-muted-foreground mb-6">
                {searchTerm || statusFilter !== "all" || typeFilter !== "all"
                  ? "Aucune demande ne correspond à vos critères de recherche."
                  : "Vous n'avez pas encore fait de demande de service."}
              </p>
              <Link href="/client/new-request">
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Créer ma première demande
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredRequests?.map((request: any) => (
              <Card key={request.id} className="border rounded-[5px] hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      {getStatusIcon(request.status)}
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{getTypeLabel(request.type)}</h3>
                        <p className="text-sm text-muted-foreground">Réf: {request?.numeroReference}</p>
                      </div>
                    </div>
                    {getStatusBadge(request.status)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Créée le {new Date(request.createdAt).toLocaleDateString("fr-FR")}</span>
                    </div>

                    {request.treatments?.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{request.treatments.length} traitement(s)</span>
                      </div>
                    )}

                    {request.documents?.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <FileText className="w-4 h-4" />
                        <span>{request.documents.length} document(s)</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Dernière mise à jour: {new Date(request.updatedAt).toLocaleDateString("fr-FR")}
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/dashboard/client/mes-demandes/${request.id}`}>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="w-4 h-4 mr-1" />
                          Voir détails
                        </Button>
                      </Link>

                      {request.status === "en_cours" && (
                        <Link href={`/client/requests/${request.id}/documents`}>
                          <Button variant="outline" size="sm" className="bg-transparent">
                            <Upload className="w-4 h-4 mr-1" />
                            Documents
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
