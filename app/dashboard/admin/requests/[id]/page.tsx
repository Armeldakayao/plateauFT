// "use client"

// import { useState } from "react"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { FileText, Search, Eye, Clock, CheckCircle, AlertCircle, Users } from "lucide-react"
// import Link from "next/link"
// import { useServiceRequests } from "@/hooks"


// export default function AdminRequestsPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [statusFilter, setStatusFilter] = useState("all")
//   const [typeFilter, setTypeFilter] = useState("all")

//   const { data: requestsData, isLoading } = useServiceRequests()
//   const requests = requestsData?.data
// console.log(requests,"requests")
//   const getStatusIcon = (status: string) => {
//     switch (status) {
//       case "valide":
//         return <CheckCircle className="w-4 h-4 text-green-600" />
//       case "en_cours":
//         return <Clock className="w-4 h-4 text-blue-600" />
//       case "nouveau":
//         return <AlertCircle className="w-4 h-4 text-orange-600" />
//       default:
//         return <FileText className="w-4 h-4 text-gray-600" />
//     }
//   }

//   const getStatusBadge = (status: string) => {
//     const variants = {
//       valide: "bg-green-100 text-green-800 border-green-200",
//       en_cours: "bg-blue-100 text-blue-800 border-blue-200",
//       nouveau: "bg-orange-100 text-orange-800 border-orange-200",
//       traite: "bg-purple-100 text-purple-800 border-purple-200",
//       rejete: "bg-red-100 text-red-800 border-red-200",
//     }

//     const labels = {
//       valide: "Validé",
//       en_cours: "En cours",
//       nouveau: "Nouveau",
//       traite: "Traité",
//       rejete: "Rejeté",
//     }

//     return (
//       <Badge className={`${variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800"} border`}>
//         {labels[status as keyof typeof labels] || status}
//       </Badge>
//     )
//   }

//   const getTypeLabel = (type: string) => {
//     const labels = {
//       rdv: "Rendez-vous",
//       partenariat: "Partenariat",
//       mariage: "Mariage",
//     }
//     return labels[type as keyof typeof labels] || type
//   }

//   const filteredRequests = Array.isArray(requests) && requests?.filter((request: any) => {
//     const matchesSearch =
//       request?.demande?.nom?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       (request.data?.nom && request.data.nom.toLowerCase().includes(searchTerm.toLowerCase())) ||
//       (request.data?.prenom && request.data.prenom.toLowerCase().includes(searchTerm.toLowerCase()))
//     const matchesStatus = statusFilter === "all" || request.status === statusFilter
//     const matchesType = typeFilter === "all" || request.type === typeFilter

//     return matchesSearch && matchesStatus && matchesType
//   })

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
//       <div className="px-2 mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-foreground mb-2">Gestion des Demandes</h1>
//             <p className="text-muted-foreground">Gérez toutes les demandes de services des citoyens</p>
//           </div>
//           <div className="flex gap-2">
//             <Link href="/admin/services/new">
//               <Button variant="outline" className="bg-transparent">
//                 <Users className="w-4 h-4 mr-2" />
//                 Nouveau Service
//               </Button>
//             </Link>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//           <Card className=" border-2 rounded-[10px]">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Total</p>
//                   <p className="text-2xl font-bold text-foreground">{Array.isArray(requests) && requests?.length || 0}</p>
//                 </div>
//                 <FileText className="w-8 h-8 text-blue-500" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-2 rounded-[10px]">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">En attente</p>
//                   <p className="text-2xl font-bold text-foreground">
//                     {Array.isArray(requests) && requests?.filter((r: any) => r.status === "nouveau").length || 0}
//                   </p>
//                 </div>
//                 <AlertCircle className="w-8 h-8 text-orange-500" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-2 rounded-[10px]">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">En cours</p>
//                   <p className="text-2xl font-bold text-foreground">
//                     {Array.isArray(requests) && requests?.filter((r: any) => r.status === "en_cours").length || 0}
//                   </p>
//                 </div>
//                 <Clock className="w-8 h-8 text-blue-500" />
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="border-2 rounded-[10px]">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Validées</p>
//                   <p className="text-2xl font-bold text-foreground">
//                     {Array.isArray(requests) && requests?.filter((r: any) => r.status === "valide").length || 0}
//                   </p>
//                 </div>
//                 <CheckCircle className="w-8 h-8 text-green-500" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters */}
//         <Card className="mb-6 border-2 rounded-[10px]">
//           <CardContent className="p-6">
//             <div className="flex flex-col md:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
//                   <Input
//                     placeholder="Rechercher par référence, nom ou prénom..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10 border-primary/20 focus:border-primary"
//                   />
//                 </div>
//               </div>

//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-full md:w-48 border-primary/20 focus:border-primary">
//                   <SelectValue placeholder="Filtrer par statut" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Tous les statuts</SelectItem>
//                   <SelectItem value="nouveau">Nouveau</SelectItem>
//                   <SelectItem value="en_cours">En cours</SelectItem>
//                   <SelectItem value="valide">Validé</SelectItem>
//                   <SelectItem value="traite">Traité</SelectItem>
//                   <SelectItem value="rejete">Rejeté</SelectItem>
//                 </SelectContent>
//               </Select>

//               <Select value={typeFilter} onValueChange={setTypeFilter}>
//                 <SelectTrigger className="w-full md:w-48 border-primary/20 focus:border-primary">
//                   <SelectValue placeholder="Filtrer par type" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Tous les types</SelectItem>
//                   <SelectItem value="rdv">Rendez-vous</SelectItem>
//                   <SelectItem value="partenariat">Partenariat</SelectItem>
//                   <SelectItem value="mariage">Mariage</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Requests Table */}
//         <Card className="border-2 rounded-[10px]">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <FileText className="w-5 h-5" />
//               Liste des demandes
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="p-0">
//             {isLoading ? (
//               <div className="p-12 text-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//                 <p className="text-muted-foreground">Chargement des demandes...</p>
//               </div>
//             ) : filteredRequests?.length === 0 ? (
//               <div className="p-12 text-center">
//                 <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-foreground mb-2">Aucune demande trouvée</h3>
//                 <p className="text-muted-foreground">
//                   {searchTerm || statusFilter !== "all" || typeFilter !== "all"
//                     ? "Aucune demande ne correspond à vos critères de recherche."
//                     : "Aucune demande n'a été soumise pour le moment."}
//                 </p>
//               </div>
//             ) : (
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-muted/50 border-b">
//                     <tr>
//                       <th className="text-left py-4 px-6 font-semibold text-foreground">Demandeur</th>
//                       <th className="text-left py-4 px-6 font-semibold text-foreground">Type</th>
//                       <th className="text-left py-4 px-6 font-semibold text-foreground">Référence</th>
//                       <th className="text-left py-4 px-6 font-semibold text-foreground">Date</th>
//                       <th className="text-left py-4 px-6 font-semibold text-foreground">Statut</th>
//                       <th className="text-left py-4 px-6 font-semibold text-foreground">Actions</th>
//                     </tr>
//                   </thead>
//                   <tbody className="">
//                     {Array.isArray(filteredRequests) && filteredRequests?.map((request: any) => (
//                       <tr key={request.id} className="hover:bg-muted/30 transition-colors">
//                         <td className="py-4 px-6">
//                           <div>
//                             <p className="font-medium text-foreground">
//                               {request?.utilisateur?.firstName}{request?.utilisateur?.lastName}
//                             </p>
//                             <p className="text-sm text-muted-foreground">{request.data?.email}</p>
//                           </div>
//                         </td>
//                         <td className="py-4 px-6">
//                           <div className="flex items-center gap-2">
//                             {getStatusIcon(request.type)}
//                             <span className="font-medium">{getTypeLabel(request.type)}</span>
//                           </div>
//                         </td>
//                         <td className="py-4 px-6">
//                           <code className="text-sm bg-muted px-2 py-1 rounded">{request?.numeroReference}</code>
//                         </td>
//                         <td className="py-4 px-6 text-sm text-muted-foreground">
//                           {new Date(request.createdAt).toLocaleDateString("fr-FR")}
//                         </td>
//                         <td className="py-4 px-6">{getStatusBadge(request.status)}</td>
//                         <td className="py-4 px-6">
//                           <Link href={`/admin/requests/${request.id}`}>
//                             <Button variant="outline" size="sm" className="bg-transparent">
//                               <Eye className="w-4 h-4 mr-1" />
//                               Voir
//                             </Button>
//                           </Link>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  FileText,
  User,
  Phone,
  Mail,
  Upload,
  Download,
  Eye,
  Edit,
  Save,
  X,
  Plus,
  Clock,
  AlertCircle,
} from "lucide-react"
import { useServiceRequest } from "@/hooks/services-requests/use-service-request"
import { useUpdateServiceRequest } from "@/hooks"
import { useCreateTreatment, useUpdateTreatment } from "@/hooks/services-requests/use-create-service-request"

export default function AdminRequestDetailPage() {
  const params = useParams()
  const requestId = params.id as string

  const { data: request, isLoading } = useServiceRequest(requestId)
  const updateRequestMutation = useUpdateServiceRequest()
  const createTreatmentMutation = useCreateTreatment()
  const updateTreatmentMutation = useUpdateTreatment()

  const [editingTreatment, setEditingTreatment] = useState<string | null>(null)
  const [newTreatment, setNewTreatment] = useState({
    title: "",
    description: "",
    status: "en_cours" as const,
    assignedTo: "",
    dueDate: "",
  })
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: File[] }>({})

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Demande non trouvée</h3>
            <p className="text-gray-600">Cette demande n'existe pas ou a été supprimée.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "en_attente":
        return "bg-yellow-100 text-yellow-800"
      case "en_cours":
        return "bg-blue-100 text-blue-800"
      case "termine":
        return "bg-green-100 text-green-800"
      case "rejete":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleStatusUpdate = (newStatus: string) => {
    updateRequestMutation.mutate({
      id: requestId,
       //@ts-ignore
      data: { status: newStatus },
    })
  }

  const handleCreateTreatment = () => {
    createTreatmentMutation.mutate(
      {
         //@ts-ignore
        requestId,
        data: newTreatment,
      },
      {
        onSuccess: () => {
          setNewTreatment({
            title: "",
            description: "",
            status: "en_cours",
            assignedTo: "",
            dueDate: "",
          })
        },
      },
    )
  }

  const handleUpdateTreatment = (treatmentId: string, data: any) => {
    updateTreatmentMutation.mutate(
      {
        id: treatmentId,
        data,
      },
      {
        onSuccess: () => {
          setEditingTreatment(null)
        },
      },
    )
  }

  const handleFileUpload = (treatmentId: string, files: FileList) => {
    const fileArray = Array.from(files)
    setUploadingFiles((prev) => ({
      ...prev,
      [treatmentId]: fileArray,
    }))

    // Simulate file upload - replace with actual API call
    setTimeout(() => {
      setUploadingFiles((prev) => {
        const newState = { ...prev }
        delete newState[treatmentId]
        return newState
      })
    }, 2000)
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Demande #{
             //@ts-ignore
          request.numeroReference}</h1>
          <p className="text-gray-600 mt-1">
            { //@ts-ignore
            request?.type} • Créée le {
               //@ts-ignore
            new Date(request.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={
             //@ts-ignore
            getStatusColor(request.status?? "")}>{request?.status?.replace("_", " ")}</Badge>
          <Select
           //@ts-ignore
           value={request?.status} onValueChange={handleStatusUpdate}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en_attente">En attente</SelectItem>
              <SelectItem value="en_cours">En cours</SelectItem>
              <SelectItem value="termine">Terminé</SelectItem>
              <SelectItem value="rejete">Rejeté</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Détails</TabsTrigger>
          <TabsTrigger value="treatments">Traitements</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card className="bg-blue-50 border shadow rounded-[7px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Informations du demandeur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Nom complet :</span>
                    <span>
                      { //@ts-ignore
                      request.demande.nom} {request.demande.prenom}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Email :</span>
                    <span>{
                       //@ts-ignore
                    request.demande.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="font-medium">Téléphone :</span>
                    <span>{ //@ts-ignore
                    request.demande.telephone}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  { //@ts-ignore
                  request.demande.profession && (
                    <div>
                      <span className="font-medium">Profession :</span>
                      <span className="ml-2">{ //@ts-ignore
                      request.demande.profession}</span>
                    </div>
                  )}
                  { //@ts-ignore
                  request.demande.institution && (
                    <div>
                      <span className="font-medium">Institution :</span>
                      <span className="ml-2">{ //@ts-ignore
                      request.demande.institution}</span>
                    </div>
                  )}
                  { //@ts-ignore
                  request.demande.nationalId && (
                    <div>
                      <span className="font-medium">ID National :</span>
                      <span className="ml-2">{ //@ts-ignore
                      request.demande.nationalId}</span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border rounded-[7px]">
            <CardHeader>
              <CardTitle>Détails de la demande</CardTitle>
            </CardHeader>
            <CardContent className="bg-gray-50">
              <div className="space-y-4">
                { //@ts-ignore
                Object.entries(request?.demande).map(([key, value]) => {
                  if (
                    ["nom", "prenom", "email", "telephone", "profession", "institution", "nationalId"].includes(key)
                  ) {
                    return null
                  }
                  return (
                    <div key={key} className="border-b pb-2">
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, " $1")} :</span>
                      <span className="ml-2">{String(value)}</span>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="treatments" className="space-y-6">
          {/* Create New Treatment */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Nouveau traitement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="treatmentTitle">Titre du traitement</Label>
                  <Input
                    id="treatmentTitle"
                    value={newTreatment.title}
                    onChange={(e) => setNewTreatment((prev) => ({ ...prev, title: e.target.value }))}
                    placeholder="Ex: Vérification des documents"
                  />
                </div>
                <div>
                  <Label htmlFor="assignedTo">Assigné à</Label>
                  <Input
                    id="assignedTo"
                    value={newTreatment.assignedTo}
                    onChange={(e) => setNewTreatment((prev) => ({ ...prev, assignedTo: e.target.value }))}
                    placeholder="Nom de l'agent"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="treatmentDescription">Description</Label>
                <Textarea
                  id="treatmentDescription"
                  value={newTreatment.description}
                  onChange={(e) => setNewTreatment((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Description détaillée du traitement..."
                  rows={3}
                />
              </div>
              <div className="flex gap-4">
                <div>
                  <Label htmlFor="treatmentStatus">Statut</Label>
                  <Select
                    value={newTreatment.status}
                    onValueChange={(value: any) => setNewTreatment((prev) => ({ ...prev, status: value }))}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en_cours">En cours</SelectItem>
                      <SelectItem value="termine">Terminé</SelectItem>
                      <SelectItem value="en_attente">En attente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="dueDate">Date d'échéance</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTreatment.dueDate}
                    onChange={(e) => setNewTreatment((prev) => ({ ...prev, dueDate: e.target.value }))}
                  />
                </div>
              </div>
              <Button
                onClick={handleCreateTreatment}
                disabled={!newTreatment.title || createTreatmentMutation.isPending}
              >
                {createTreatmentMutation.isPending ? "Création..." : "Créer le traitement"}
              </Button>
            </CardContent>
          </Card>

          {/* Existing Treatments */}
          <div className="space-y-4">
            { //@ts-ignore
            request.treatments?.map((treatment: any) => (
              <Card key={treatment.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      {treatment.title}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(treatment.status)}>{treatment.status.replace("_", " ")}</Badge>
                      <Button variant="outline" size="sm" onClick={() => setEditingTreatment(treatment.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Assigné à {treatment.assignedTo} • Créé le {new Date(treatment.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {editingTreatment === treatment.id ? (
                    <div className="space-y-4">
                      <Textarea
                        value={treatment.description}
                        onChange={(e) => {
                          // Update treatment description
                        }}
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <Select
                          value={treatment.status}
                          onValueChange={(value) => handleUpdateTreatment(treatment.id, { status: value })}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en_cours">En cours</SelectItem>
                            <SelectItem value="termine">Terminé</SelectItem>
                            <SelectItem value="en_attente">En attente</SelectItem>
                          </SelectContent>
                        </Select>
                        <Button size="sm" onClick={() => setEditingTreatment(null)}>
                          <Save className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => setEditingTreatment(null)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600">{treatment.description}</p>
                  )}

                  {/* File Upload for Treatment */}
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Documents du traitement</h4>
                      <div className="flex items-center gap-2">
                        <input
                          type="file"
                          multiple
                          onChange={(e) => e.target.files && handleFileUpload(treatment.id, e.target.files)}
                          className="hidden"
                          id={`file-upload-${treatment.id}`}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => document.getElementById(`file-upload-${treatment.id}`)?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Ajouter des fichiers
                        </Button>
                      </div>
                    </div>

                    {uploadingFiles[treatment.id] && (
                      <div className="space-y-2">
                        {uploadingFiles[treatment.id].map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4" />
                            <span>{file.name}</span>
                            <span className="text-blue-600">Téléchargement...</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {treatment.documents && treatment.documents.length > 0 && (
                      <div className="space-y-2">
                        {treatment.documents.map((doc: any) => (
                          <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              <span className="text-sm">{doc.name}</span>
                              <span className="text-xs text-gray-500">
                                {new Date(doc.uploadedAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Documents de la demande
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => e.target.files && handleFileUpload("request", e.target.files)}
                    className="hidden"
                    id="request-file-upload"
                  />
                  <Button variant="outline" onClick={() => document.getElementById("request-file-upload")?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Ajouter des documents
                  </Button>
                </div>

                { //@ts-ignore
                request.documents && request.documents.length > 0 ? (
                  <div className="space-y-2">
                    { //@ts-ignore
                    request.documents.map((doc: any) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-gray-500" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-sm text-gray-500">
                              Téléchargé le {new Date(doc.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Aucun document téléchargé pour cette demande</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Historique des actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                { //@ts-ignore
                request.history?.map((entry: any, index: number) => (
                  <div key={index} className="flex items-start gap-3 pb-4 border-b last:border-b-0">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="font-medium">{entry.action}</p>
                      <p className="text-sm text-gray-600">{entry.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(entry.timestamp).toLocaleString()} • {entry.user}
                      </p>
                    </div>
                  </div>
                )) || <p className="text-gray-500 text-center py-8">Aucun historique disponible</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
