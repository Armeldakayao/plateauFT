"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Download, MessageSquare, FileText, User, Clock } from "lucide-react"


import { toast } from "@/hooks/use-toast"
import { useServiceRequest } from "@/hooks/services-requests/use-service-request"
import { useCreateTreatment, useUpdateTreatment } from "@/hooks/services-requests/use-create-service-request"

export default function DetailDemandePage() {
  const params = useParams()
  const router = useRouter()
  const [treatmentComment, setTreatmentComment] = useState("")
  const [treatmentStatus, setTreatmentStatus] = useState("")

  const { data: demandeData, isLoading } = useServiceRequest(params.id as string)
  const createTreatment = useCreateTreatment()
  const updateTreatment = useUpdateTreatment()

  const demande = demandeData

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "validee":
        return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1">Validée</Badge>
      case "en_cours":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500 px-3 py-1">En cours</Badge>
      case "en_attente":
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500 px-3 py-1">En attente</Badge>
      case "refusee":
        return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1">Refusée</Badge>
      case "annulee":
        return <Badge className="bg-gray-500 text-white hover:bg-gray-500 px-3 py-1">Annulée</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "rdv":
        return "Demande de Rendez-vous"
      case "mariage":
        return "Demande de Mariage Civil"
      case "partenariat":
        return "Proposition de Partenariat"
      default:
        return type
    }
  }

  const handleStartTreatment = async () => {
    try {
      await createTreatment.mutateAsync({
         //@ts-ignore
        demandeId: demande.id,
        agentNom: "Agent", // À récupérer du contexte utilisateur
        agentPrenom: "Connecté",
        agentEmail: "agent@mairie.com",
        messageAgent: treatmentComment,
        notifyByEmail: true,
      })
      toast({
        title: "Traitement démarré",
        description: "Le traitement de la demande a été démarré avec succès.",
      })
      setTreatmentComment("")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du démarrage du traitement.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateStatus = async () => {
    if (!treatmentStatus) return

    try {
      // Logique pour mettre à jour le statut
      toast({
        title: "Statut mis à jour",
        description: "Le statut de la demande a été mis à jour avec succès.",
      })
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!demande) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Demande non trouvée</h1>
          <Link href="/admin/gestion-demandes">
            <Button>Retour à la liste</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="text-sm text-gray-600">
          <Link href="/admin" className="hover:text-blue-600">
            Tableau de bord
          </Link>
          <span className="mx-2">›</span>
          <Link href="/admin/gestion-demandes" className="hover:text-blue-600">
            Gestion des demandes
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Détail de la demande</span>
        </nav>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.back()}
          className="text-white hover:bg-primary text-lg p-2 bg-primary transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à la liste
        </Button>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{
           //@ts-ignore
        getTypeLabel(demande.type)}</h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-700">
            <span className="font-medium">Référence :</span> {
               //@ts-ignore
            demande.numeroReference}
          </p>
          <p className="text-gray-700">
            <span className="font-medium">Demandeur :</span> {
               //@ts-ignore
            demande.nom} {demande.prenom}
          </p>
          {
             //@ts-ignore
          getStatusBadge(demande.etat)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Informations sur le citoyen */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-xl font-semibold text-green-600 flex items-center gap-2">
                <User className="w-5 h-5" />
                Informations sur le citoyen
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Nom & Prénom</label>
                  <p className="text-gray-600">
                    {
                       //@ts-ignore
                    demande.nom} {demande.prenom}
                  </p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Email</label>
                  <p className="text-gray-600">{
                     //@ts-ignore
                  demande.email}</p>
                </div>
                {
                   //@ts-ignore
                demande.telephone && (
                  <div>
                    <label className="font-semibold text-gray-700 text-sm">Téléphone</label>
                    <p className="text-gray-600">{
                       //@ts-ignore
                    demande.telephone}</p>
                  </div>
                )}
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Date de demande</label>
                  <p className="text-gray-600">{
                     //@ts-ignore
                  new Date(demande.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Détails de la demande */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-orange-50 border-b border-orange-200">
              <CardTitle className="text-xl font-semibold text-orange-600 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Détails de la demande
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Type de demande</label>
                  <p className="text-gray-600">{
                     //@ts-ignore
                  getTypeLabel(demande.type)}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Priorité</label>
                  <p className="text-gray-600 capitalize">{
                     //@ts-ignore
                  demande.priorite || "Normale"}</p>
                </div>
                { //@ts-ignore
                demande.dateLimiteTraitement && (
                  <div>
                    <label className="font-semibold text-gray-700 text-sm">Date limite de traitement</label>
                    <p className="text-gray-600">{
                       //@ts-ignore
                    new Date(demande.dateLimiteTraitement).toLocaleDateString()}</p>
                  </div>
                )}
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Données de la demande</label>
                  <div className="bg-gray-50 p-4 rounded-lg mt-2">
                    <pre className="text-sm text-gray-600 whitespace-pre-wrap">
                      { //@ts-ignore
                      JSON.stringify(demande.demande, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Historique des traitements */}
          { //@ts-ignore
          demande.traitements && demande.traitements.length > 0 && (
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="bg-blue-50 border-b border-blue-200">
                <CardTitle className="text-xl font-semibold text-blue-600 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Historique des traitements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  { //@ts-ignore
                  demande.traitements.map((traitement) => (
                    <div key={traitement.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">
                          {traitement.agentNom} {traitement.agentPrenom}
                        </span>
                        <span className="text-sm text-gray-500">
                          {new Date(traitement.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{traitement.messageAgent}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          {traitement.etat}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {traitement.resultat}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Documents liés */}
          { //@ts-ignore
          demande.documents && demande.documents.length > 0 && (
            <Card className="shadow-sm border-gray-200">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Documents liés ({ //@ts-ignore
                  demande.documents.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  { //@ts-ignore
                  demande.documents.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900 text-sm">{doc.nom}</span>
                      </div>
                      <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white">
                  Télécharger tous les fichiers
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Actions de traitement */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-blue-50 border-b border-blue-200">
              <CardTitle className="text-lg font-semibold text-blue-600">Actions de traitement</CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              { //@ts-ignore
              demande.etat === "en_attente" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message pour le citoyen</label>
                    <Textarea
                      placeholder="Message à envoyer au citoyen..."
                      value={treatmentComment}
                      onChange={(e) => setTreatmentComment(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <Button
                    onClick={handleStartTreatment}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={createTreatment.isPending}
                  >
                    {createTreatment.isPending ? "Démarrage..." : "Démarrer le traitement"}
                  </Button>
                </>
              )}

              { //@ts-ignore
              demande.etat === "en_cours" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau statut</label>
                    <Select value={treatmentStatus} onValueChange={setTreatmentStatus}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choisir un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="validee">Valider</SelectItem>
                        <SelectItem value="refusee">Refuser</SelectItem>
                        <SelectItem value="incomplete">Demande incomplète</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleUpdateStatus}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    disabled={!treatmentStatus}
                  >
                    Mettre à jour le statut
                  </Button>
                </>
              )}

              <Button
                variant="outline"
                className="w-full border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contacter le citoyen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
