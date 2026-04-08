// "use client"

// import { useState } from "react"
// import { useParams } from "next/navigation"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// import {
//   ArrowLeft,
//   Calendar,
//   Clock,
//   Download,
//   FileText,
//   Mail,
//   Phone,
//   Plus,
//   Settings,
//   Trash2,
//   Upload,
//   User,
//   Eye,
//   ExternalLink,
//   MoreVertical,
// } from "lucide-react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { format } from "date-fns"
// import { fr } from "date-fns/locale"
// import { useServiceRequest } from "@/hooks/services-requests/use-service-request"
// import { useDeleteServiceRequest } from "@/hooks"
// import { CreateTreatmentDialog } from "@/components/dashboard/create-treatment-dialog"
// import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-modal"
// import { ServiceRequestDocumentUpload } from "@/components/dashboard/service-request-document-upload"
// import { DocumentIcon } from "@/components/dashboard/document-icon"
// import Sidebar from "@/components/sidebar"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// const ETAT_OPTIONS = [
//   { value: "en_attente", label: "En attente", color: "bg-yellow-100 text-yellow-800" },
//   { value: "en_cours", label: "En cours", color: "bg-blue-100 text-blue-800" },
//   { value: "termine", label: "Terminé", color: "bg-green-100 text-green-800" },
//   { value: "annule", label: "Annulé", color: "bg-red-100 text-red-800" },
// ]

// export default function ServiceRequestDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const requestId = params.id as string

//   const [showUploadDialog, setShowUploadDialog] = useState(false)
//   const [showTreatmentDialog, setShowTreatmentDialog] = useState(false)
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false)
//   const [uploadMode, setUploadMode] = useState<"request" | "treatment" | "general">("request")

//   const { data: serviceRequest, isLoading } = useServiceRequest(requestId)
//   const deleteRequest = useDeleteServiceRequest()

//   if (isLoading) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="animate-pulse space-y-4">
//           <div className="h-8 bg-gray-200 rounded w-1/3"></div>
//           <div className="h-32 bg-gray-200 rounded"></div>
//         </div>
//       </div>
//     )
//   }

//   if (!serviceRequest) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="text-center py-8">
//           <p className="text-muted-foreground">Demande non trouvée</p>
//         </div>
//       </div>
//     )
//   }

//   const getEtatBadge = (etat: string) => {
//     const option = ETAT_OPTIONS.find((opt) => opt.value === etat)
//     return <Badge className={option?.color || "bg-gray-100 text-gray-800"}>{option?.label || etat}</Badge>
//   }

//   const handleDelete = async () => {
//     try {
//       await deleteRequest.mutateAsync(requestId)
//       router.push("/user/service-requests?success=request-deleted")
//     } catch (error) {
//       console.error("Erreur lors de la suppression:", error)
//     }
//   }

//   const handleDownload = (doc: any) => {
//     // Créer un lien de téléchargement et le déclencher
//     const link = document.createElement('a')
//     link.href = doc.url || doc.fileUrl || '#'
//     link.download = doc.fileName || 'document'
//     document.body.appendChild(link)
//     link.click()
//     document.body.removeChild(link)
//     console.log("Downloading document:", doc.fileName)
//   }

//   const handlePreview = (doc: any) => {
//     // Ouvrir le document dans un nouvel onglet pour prévisualisation
//     if (doc.url || doc.fileUrl) {
//       window.open(doc.url || doc.fileUrl, '_blank')
//     }
//   }

//   const existingTreatment = serviceRequest.traitements?.[0]

//   // Fonction pour afficher les détails de la demande de manière structurée
//   const renderRequestDetails = (demande: any) => {
//     if (typeof demande === 'string') {
//       return (
//         <div className="prose prose-sm max-w-none">
//           <p className="whitespace-pre-wrap">{demande}</p>
//         </div>
//       )
//     }

//     if (typeof demande === 'object' && demande !== null) {
//       return (
//         <div className="space-y-4">
//           {Object.entries(demande).map(([key, value]) => (
//             <div key={key} className="border-l-2 border-primary/20 pl-4">
//               <p className="text-sm font-medium text-muted-foreground capitalize">
//                 {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
//               </p>
//               <p className="font-medium mt-1">
//                 {typeof value === 'object' ? JSON.stringify(value, null, 2) : String(value)}
//               </p>
//             </div>
//           ))}
//         </div>
//       )
//     }

//     return (
//       <div className="text-center py-8 text-muted-foreground">
//         Aucun détail disponible
//       </div>
//     )
//   }
// function isDocumentRequiredMissing(serviceRequest: any) {
//   const requiredDocs = serviceRequest.service.requiredDocuments || [];
//   const uploadedDocs = serviceRequest.documents?.map((d: any) => d.type) || [];

//   // retourne true s'il existe au moins un document requis qui n'a pas été uploadé
//   return requiredDocs.some(
//     (doc: string) =>
//       !uploadedDocs.includes(doc.toUpperCase().replace(/ /g, "_")) // normalisation du type
//   );
// }


//   const formatFileSize = (bytes: number) => {
//     if (bytes === 0) return '0 Bytes'
//     const k = 1024
//     const sizes = ['Bytes', 'KB', 'MB', 'GB']
//     const i = Math.floor(Math.log(bytes) / Math.log(k))
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
//   }

//   return (
//    <div>
 
//      <div className=" p-6 space-y-6">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4">
//           <Link href="/user/service-requests">
//             <Button variant="ghost" size="sm">
//               <ArrowLeft className="h-4 w-4 mr-2" />
//               Retour
//             </Button>
//           </Link>
//           <div>
//             <h1 className="text-2xl font-bold">Détails de la Demande</h1>
//             <p className="text-muted-foreground">Référence: {serviceRequest.numeroReference}</p>
//           </div>
//         </div>

//         <div className="flex gap-2">
//           {/* <Button
//             variant="outline"
//             onClick={() => {
//               setUploadMode("general")
//               setShowUploadDialog(true)
//             }}
//           >
//             <Upload className="h-4 w-4 mr-2" />
//             Ajouter Document
//           </Button> */}
//           <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
//             <Trash2 className="h-4 w-4 mr-2" />
//             Supprimer
//           </Button>
//         </div>
//       </div>

//       {/* Status Card */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="p-2 bg-primary/10 rounded-lg">
//                 <FileText className="h-6 w-6 text-primary" />
//               </div>
//               <div>
//                 <CardTitle className="text-xl">{serviceRequest.type.toUpperCase()}</CardTitle>
//                 <CardDescription>
//                   Créée le {format(new Date(serviceRequest.createdAt), "dd MMMM yyyy", { locale: fr })}
//                 </CardDescription>
//               </div>
//             </div>
//             {getEtatBadge(serviceRequest.etat)}
//           </div>
//         </CardHeader>
//       </Card>

//       <Tabs defaultValue="details" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="details">Détails</TabsTrigger>
//           <TabsTrigger value="documents">Documents ({serviceRequest.documents?.length || 0})</TabsTrigger>
//           <TabsTrigger value="treatments">Traitements ({serviceRequest.traitements?.length || 0})</TabsTrigger>
//           <TabsTrigger value="timeline">Historique</TabsTrigger>
//         </TabsList>

//         {/* Details Tab */}
//         <TabsContent value="details" className="space-y-6">
//           <div className="grid md:grid-cols-2 gap-6">
//             {/* Informations générales */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <Settings className="h-5 w-5" />
//                   Informations Générales
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Type</p>
//                     <p className="font-medium">{serviceRequest.type}</p>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">État</p>
//                     {getEtatBadge(serviceRequest.etat)}
//                   </div>
//                 </div>
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Priorité</p>
//                     <Badge variant={serviceRequest.priorite === "urgente" ? "destructive" : "secondary"}>
//                       {serviceRequest.priorite}
//                     </Badge>
//                   </div>
//                   <div>
//                     <p className="text-sm font-medium text-muted-foreground">Date limite</p>
//                     <p className="font-medium">
//                       {format(new Date(serviceRequest.dateLimiteTraitement), "dd/MM/yyyy", { locale: fr })}
//                     </p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Informations du demandeur */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2">
//                   <User className="h-5 w-5" />
//                   Demandeur
//                 </CardTitle>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div>
//                   <p className="text-sm font-medium text-muted-foreground">Nom complet</p>
//                   <p className="font-medium">
//                     {serviceRequest.nom} {serviceRequest.prenom}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Mail className="h-4 w-4 text-muted-foreground" />
//                   <p>{serviceRequest.email}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Phone className="h-4 w-4 text-muted-foreground" />
//                   <p>{serviceRequest.telephone}</p>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Détails de la demande */}
//           <Card>
//             <CardHeader>
//               <CardTitle>Détails de la Demande</CardTitle>
//             </CardHeader>
//             <CardContent>
//               {renderRequestDetails(serviceRequest.demande)}
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Documents Tab */}
//         {/* <TabsContent value="documents" className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-semibold">Documents ({serviceRequest.documents?.length || 0})</h3>
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 onClick={() => {
//                   setUploadMode("request")
//                   setShowUploadDialog(true)
//                 }}
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Ajouter Document
//               </Button>
//               <Button asChild>
//                 <Link href={`/user/service-requests/${requestId}/documents`}>
//                   <FileText className="h-4 w-4 mr-2" />
//                   Voir Tous
//                 </Link>
//               </Button>
//             </div>
//           </div>

//           <div className="grid gap-4">
//             {serviceRequest.documents?.length === 0 ? (
//               <Card>
//                 <CardContent className="text-center py-8">
//                   <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                   <p className="text-muted-foreground">Aucun document attaché</p>
//                   <Button 
//                     className="mt-4"
//                     onClick={() => {
//                       setUploadMode("request")
//                       setShowUploadDialog(true)
//                     }}
//                   >
//                     <Plus className="h-4 w-4 mr-2" />
//                     Ajouter votre premier document
//                   </Button>
//                 </CardContent>
//               </Card>
//             ) : (
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//                 {serviceRequest.documents?.map((doc: any, index: number) => (
//                   <Card key={index} className="hover:shadow-md transition-shadow">
//                     <CardContent className="p-4">
//                       <div className="flex items-start gap-3">
//                         <DocumentIcon fileName={doc.fileName} mimeType={doc.mimeType} className="h-8 w-8 flex-shrink-0" />
//                         <div className="flex-1 min-w-0">
//                           <p className="font-medium truncate" title={doc.fileName}>
//                             {doc.fileName}
//                           </p>
//                           <p className="text-sm text-muted-foreground">
//                             {doc.fileSize ? formatFileSize(doc.fileSize) : "Taille inconnue"}
//                           </p>
//                           {doc.uploadedAt && (
//                             <p className="text-xs text-muted-foreground">
//                               {format(new Date(doc.uploadedAt), "dd/MM/yyyy", { locale: fr })}
//                             </p>
//                           )}
//                         </div>
//                       </div>
                      
//                       <div className="flex gap-2 mt-4">
//                         <Button 
//                           variant="outline" 
//                           size="sm" 
//                           className="flex-1"
//                           onClick={() => handlePreview(doc)}
//                         >
//                           <Eye className="h-4 w-4 mr-1" />
//                           Voir
//                         </Button>
//                         <Button 
//                           variant="default" 
//                           size="sm" 
//                           className="flex-1"
//                           onClick={() => handleDownload(doc)}
//                         >
//                           <Download className="h-4 w-4 mr-1" />
//                           Télécharger
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             )}
//           </div>
//         </TabsContent> */}
// <TabsContent value="documents" className="space-y-6">
//   <div className="flex justify-between items-center">
//     <h3 className="text-lg font-semibold">
//       Documents ({serviceRequest.documents?.length || 0})
//     </h3>
//     <div className="flex gap-2">
//       {serviceRequest.service.requiredDocuments?.length > 0 &&
//  isDocumentRequiredMissing(serviceRequest) && (
//   <Button
//     variant="outline"
//     onClick={() => {
//       setUploadMode("request")
//       setShowUploadDialog(true)
//     }}
//   >
//     <Plus className="h-4 w-4 mr-2" />
//     Ajouter Document
//   </Button>
// )}

//       <Button asChild>
//         <Link href={`/user/service-requests/${requestId}/documents`}>
//           <FileText className="h-4 w-4 mr-2" />
//           Voir Tous
//         </Link>
//       </Button>
//     </div>
//   </div>

//   <div className="grid gap-4">
//     {serviceRequest.documents?.length === 0 ? (
//       <Card>
//         <CardContent className="text-center py-8">
//           <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//           <p className="text-muted-foreground">Aucun document attaché</p>
//           <Button 
//             className="mt-4"
//             onClick={() => {
//               setUploadMode("request")
//               setShowUploadDialog(true)
//             }}
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Ajouter votre premier document
//           </Button>
//         </CardContent>
//       </Card>
//     ) : (
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {serviceRequest.documents?.map((doc: any, index: number) => (
//          <Card key={doc.id} className="hover:shadow-lg transition-shadow border border-border/60">
//   <CardContent className="p-4">
//     <div className="flex items-start gap-3">
//       <DocumentIcon
//         fileName={doc.nom}
//         mimeType={doc.mimeType}
//         className="h-10 w-10 flex-shrink-0 text-primary"
//       />

//       <div className="flex-1 min-w-0">
//         <div className="flex items-center justify-between">
//           <p className="font-medium truncate" title={doc.nom}>
//             {doc.nom}
//           </p>
//           {doc.type && (
//             <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
//               {doc.type.replace(/_/g, " ")}
//             </span>
//           )}
//         </div>

//         <p className="text-sm text-muted-foreground">
//           {formatFileSize(doc.size)}
//         </p>
//         {doc.createdAt && (
//           <p className="text-xs text-muted-foreground">
//             {format(new Date(doc.createdAt), "dd/MM/yyyy", { locale: fr })}
//           </p>
//         )}
//       </div>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="icon" className="h-8 w-8">
//             <MoreVertical className="h-4 w-4" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-40">
//           <DropdownMenuItem onClick={() => handlePreview(doc)}>
//             <Eye className="h-4 w-4 mr-2" />
//             Voir
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => handleDownload(doc)}>
//             <Download className="h-4 w-4 mr-2" />
//             Télécharger
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   </CardContent>
// </Card>

//         ))}
//       </div>
//     )}
//   </div>
// </TabsContent>

//         {/* Treatments Tab */}
//         <TabsContent value="treatments" className="space-y-6">
//           <div className="flex justify-between items-center">
//             <h3 className="text-lg font-semibold">Traitements ({serviceRequest.traitements?.length || 0})</h3>
//             {!existingTreatment && (
//               <Button onClick={() => setShowTreatmentDialog(true)}>
//                 <Plus className="h-4 w-4 mr-2" />
//                 Créer Traitement
//               </Button>
//             )}
//           </div>

//           <div className="space-y-4">
//             {serviceRequest.traitements?.length === 0 ? (
//               <Card>
//                 <CardContent className="text-center py-8">
//                   <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
//                   <p className="text-muted-foreground">Aucun traitement en cours</p>
//                   <Button 
//                     className="mt-4"
//                     onClick={() => setShowTreatmentDialog(true)}
//                   >
//                     <Plus className="h-4 w-4 mr-2" />
//                     Créer le premier traitement
//                   </Button>
//                 </CardContent>
//               </Card>
//             ) : (
//               serviceRequest.traitements?.map((treatment: any) => (
//                 <Card key={treatment.id}>
//                   <CardHeader>
//                     <div className="flex items-center justify-between">
//                       <CardTitle className="text-lg">Traitement #{treatment.numeroTraitement}</CardTitle>
//                       <Badge variant={treatment.etat === "termine" ? "default" : "secondary"}>{treatment.etat}</Badge>
//                     </div>
//                   </CardHeader>
//                   <CardContent className="space-y-4">
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm font-medium text-muted-foreground">Agent</p>
//                         <p className="font-medium">
//                           {treatment.agentPrenom} {treatment.agentNom}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-muted-foreground">Service</p>
//                         <p className="font-medium">{treatment.agentService || "Non spécifié"}</p>
//                       </div>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-muted-foreground">Message</p>
//                       <div className="bg-muted p-3 rounded-lg mt-1">
//                         <p className="text-sm whitespace-pre-wrap">{treatment.messageAgent}</p>
//                       </div>
//                     </div>
//                     <div className="grid md:grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm font-medium text-muted-foreground">Date d'échéance</p>
//                         <p className="font-medium">
//                           {format(new Date(treatment.dateEcheance), "dd/MM/yyyy HH:mm", { locale: fr })}
//                         </p>
//                       </div>
//                       <div>
//                         <p className="text-sm font-medium text-muted-foreground">Temps estimé</p>
//                         <p className="font-medium">{treatment.tempsEstime || 0}h</p>
//                       </div>
//                     </div>
                    
//                     {/* Documents du traitement */}
//                     {treatment.documents && treatment.documents.length > 0 && (
//                       <div className="border-t pt-4">
//                         <p className="text-sm font-medium text-muted-foreground mb-3">
//                           Documents du traitement ({treatment.documents.length})
//                         </p>
//                         <div className="grid gap-2">
//                           {treatment.documents.map((doc: any, docIndex: number) => (
//                             <div key={docIndex} className="flex items-center justify-between p-2 bg-muted rounded">
//                               <div className="flex items-center gap-2">
//                                 <DocumentIcon fileName={doc.fileName} mimeType={doc.mimeType} className="h-4 w-4" />
//                                 <span className="text-sm">{doc.fileName}</span>
//                               </div>
//                               <div className="flex gap-1">
//                                 <Button 
//                                   variant="ghost" 
//                                   size="sm"
//                                   onClick={() => handlePreview(doc)}
//                                 >
//                                   <Eye className="h-3 w-3" />
//                                 </Button>
//                                 <Button 
//                                   variant="ghost" 
//                                   size="sm"
//                                   onClick={() => handleDownload(doc)}
//                                 >
//                                   <Download className="h-3 w-3" />
//                                 </Button>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               ))
//             )}
//           </div>
//         </TabsContent>

//         {/* Timeline Tab */}
//         <TabsContent value="timeline" className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Calendar className="h-5 w-5" />
//                 Historique de la Demande
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
//                   <div className="w-2 h-2 bg-primary rounded-full"></div>
//                   <div>
//                     <p className="font-medium">Demande créée</p>
//                     <p className="text-sm text-muted-foreground">
//                       {format(new Date(serviceRequest.createdAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
//                     </p>
//                   </div>
//                 </div>

//                 {serviceRequest.traitements?.map((treatment: any) => (
//                   <div key={treatment.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <div>
//                       <p className="font-medium">
//                         Traitement assigné à {treatment.agentPrenom} {treatment.agentNom}
//                       </p>
//                       <p className="text-sm text-muted-foreground">
//                         {format(new Date(treatment.createdAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       {/* Dialogs */}
//       <ServiceRequestDocumentUpload
//         open={showUploadDialog}
//         onOpenChange={setShowUploadDialog}
//         serviceRequest={serviceRequest}
//         mode={uploadMode}
//       />

//       <CreateTreatmentDialog
//         open={showTreatmentDialog}
//         onOpenChange={setShowTreatmentDialog}
//         requestId={requestId}
//         existingTreatment={existingTreatment}
//       />

//       <DeleteConfirmationDialog
//         open={showDeleteDialog}
//         onOpenChange={setShowDeleteDialog}
//         onConfirm={handleDelete}
//         title="Supprimer la demande"
//         description="Êtes-vous sûr de vouloir supprimer cette demande ? Cette action est irréversible."
//         isLoading={deleteRequest.isPending}
//       />
//     </div>
//    </div>
//   )
// }



"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  FileText,
  Mail,
  Phone,
  Plus,
  Settings,
  Trash2,
  Upload,
  User,
  Eye,
  MoreVertical,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useServiceRequest } from "@/hooks/services-requests/use-service-request"
import { useDeleteServiceRequest } from "@/hooks"
import { CreateTreatmentDialog } from "@/components/dashboard/create-treatment-dialog"
import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-modal"
import { ServiceRequestDocumentUpload } from "@/components/dashboard/service-request-document-upload"
import { DocumentIcon } from "@/components/dashboard/document-icon"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const ETAT_OPTIONS = [
  { value: "en_attente", label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  { value: "en_cours", label: "En cours", color: "bg-blue-100 text-blue-800" },
  { value: "termine", label: "Terminé", color: "bg-green-100 text-green-800" },
  { value: "annule", label: "Annulé", color: "bg-red-100 text-red-800" },
]

export default function ServiceRequestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const requestId = params.id as string

  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [showTreatmentDialog, setShowTreatmentDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [uploadMode, setUploadMode] = useState<"request" | "treatment" | "general">("request")
  const [selectedDocumentType, setSelectedDocumentType] = useState("")

  const { data: serviceRequest, isLoading } = useServiceRequest(requestId)
  const deleteRequest = useDeleteServiceRequest()

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  if (!serviceRequest) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Demande non trouvée</p>
        </div>
      </div>
    )
  }

  const getEtatBadge = (etat: string) => {
    const option = ETAT_OPTIONS.find((opt) => opt.value === etat)
    return <Badge className={option?.color || "bg-gray-100 text-gray-800"}>{option?.label || etat}</Badge>
  }

  const handleDelete = async () => {
    try {
      await deleteRequest.mutateAsync(requestId)
      router.push("/user/service-requests?success=request-deleted")
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
    }
  }

  const handleDownload = (doc: any) => {
    const link = document.createElement("a")
    link.href = doc.url || doc.fileUrl || "#"
    link.download = doc.nom || doc.fileName || "document"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }


const handlePreview = (doc: any) => {
  const BASE_URL = "http://localhost:3000"
  if (doc.url || doc.fileUrl) {
    const fullUrl = doc.url || doc.fileUrl
    let relativePath = fullUrl

    // Si l'URL contient déjà le base URL, on ne garde que le chemin
    if (fullUrl.startsWith(BASE_URL)) {
      relativePath = fullUrl.replace(BASE_URL, "")
    }

   if (typeof window !== "undefined") {
  window.open(`${BASE_URL}/${relativePath}`, "_blank")
}

  }
}


  const isDocumentMissing = (requiredDoc: string) => {
    //@ts-ignore
    const uploadedTypes = serviceRequest.documents?.map((d: any) => d.type?.toUpperCase().replace(/ /g, "_")) || []
    const normalizedRequired = requiredDoc.toUpperCase().replace(/ /g, "_")
    return !uploadedTypes.includes(normalizedRequired)
  }

  const handleUploadForRequiredDoc = (docType: string) => {
    setSelectedDocumentType(docType)
    setUploadMode("request")
    setShowUploadDialog(true)
  }
//@ts-ignore
  const existingTreatment = serviceRequest.traitements?.[0]

  // const renderRequestDetails = (demande: any) => {
  //   if (typeof demande === "string") {
  //     return (
  //       <div className="prose prose-sm max-w-none">
  //         <p className="whitespace-pre-wrap">{demande}</p>
  //       </div>
  //     )
  //   }

  //   if (typeof demande === "object" && demande !== null) {
  //     return (
  //       <div className="grid md:grid-cols-2 gap-6">
  //         {Object.entries(demande).map(([key, value]) => {
  //           if (value === null || value === undefined || value === "") return null

  //           return (
  //             <div key={key} className="space-y-2">
  //               <p className="text-sm font-medium text-muted-foreground capitalize">
  //                 {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
  //               </p>
  //               <div className="p-3 bg-muted/50 rounded-lg">
  //                 <p className="font-medium">
  //                   {typeof value === "boolean"
  //                     ? value
  //                       ? "Oui"
  //                       : "Non"
  //                     : typeof value === "object"
  //                       ? JSON.stringify(value, null, 2)
  //                       : String(value)}
  //                 </p>
  //               </div>
  //             </div>
  //           )
  //         })}
  //       </div>
  //     )
  //   }

  //   return <div className="text-center py-8 text-muted-foreground">Aucun détail disponible</div>
  // }
// const renderRequestDetails = (demande: any) => {
//   if (typeof demande === "string") {
//     return (
//       <div className="prose prose-sm max-w-none">
//         <p className="whitespace-pre-wrap">{demande}</p>
//       </div>
//     )
//   }

//   if (typeof demande === "object" && demande !== null) {
//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded-lg">
//           <tbody>
//             {Object.entries(demande).map(([key, value]) => {
//               if (value === null || value === undefined || value === "") return null

//               return (
//                 <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm font-medium text-gray-600 capitalize w-1/3">
//                     {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
//                   </td>
//                   <td className="px-4 py-3 text-sm font-semibold text-gray-800">
//                     {typeof value === "boolean"
//                       ? value ? "Oui" : "Non"
//                       : typeof value === "object"
//                         ? JSON.stringify(value, null, 2)
//                         : String(value)}
//                   </td>
//                 </tr>
//               )
//             })}
//           </tbody>
//         </table>
//       </div>
//     )
//   }

//   return <div className="text-center py-8 text-muted-foreground">Aucun détail disponible</div>
// }
// const renderRequestDetails = (demande: any) => {
//   if (typeof demande === "string") {
//     // Tenter de parser si c'est un JSON valide
//     try {
//       const parsed = JSON.parse(demande);
//       if (typeof parsed === "object" && parsed !== null) {
//         return renderRequestDetails(parsed); // Réutiliser la même fonction pour afficher l'objet
//       }
//     } catch {
//       // Pas du JSON, on affiche comme texte normal
//     }

//     return (
//       <div className="prose prose-sm max-w-none">
//         <p className="whitespace-pre-wrap">{demande}</p>
//       </div>
//     );
//   }

//   if (typeof demande === "object" && demande !== null) {
//     return (
//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200 rounded-lg">
//           <tbody>
//             {Object.entries(demande).map(([key, value]) => {
//               if (value === null || value === undefined || value === "") return null;

//               // Si value est une chaîne JSON
//               let parsedValue = value;
//               if (typeof value === "string") {
//                 try {
//                   const jsonValue = JSON.parse(value);
//                   if (typeof jsonValue === "object" && jsonValue !== null) {
//                     parsedValue = jsonValue;
//                   }
//                 } catch {
//                   // Ce n'est pas un JSON valide, on garde la chaîne telle quelle
//                 }
//               }

//               return (
//                 <tr key={key} className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="px-4 py-3 text-sm font-medium text-gray-600 capitalize w-1/3">
//                     {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
//                   </td>
//                   <td className="px-4 py-3 text-sm font-semibold text-gray-800">
//                     {typeof parsedValue === "boolean"
//                       ? parsedValue ? "Oui" : "Non"
//                       : typeof parsedValue === "object"
//                         ? renderRequestDetails(parsedValue) // Réutilisation pour sous-objets
//                         : String(parsedValue)}
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     );
//   }

//   return <div className="text-center py-8 text-muted-foreground">Aucun détail disponible</div>;
// };
const renderRequestDetails = (demande: any) => {
  const tryParseJSON = (str: string) => {
    try {
      const parsed = JSON.parse(str);
      if (typeof parsed === "object" && parsed !== null) return parsed;
    } catch {}
    return null;
  };

  if (typeof demande === "string") {
    const parsed = tryParseJSON(demande);
    if (parsed) return renderRequestDetails(parsed);

    return (
      <div className="prose prose-sm max-w-none">
        <p className="whitespace-pre-wrap text-gray-700">{demande}</p>
      </div>
    );
  }

  if (typeof demande === "object" && demande !== null) {
    return (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border border-gray-300 rounded-[10px] shadow-sm">
          <tbody>
            {Object.entries(demande).map(([key, value]) => {
              if (value === null || value === undefined || value === "") return null;

              const parsedValue = (typeof value === "string" && tryParseJSON(value)) || value;

              return (
                <tr
                  key={key}
                  className="border-b last:border-b-0 border-gray-200  transition-colors"
                >
                  <td className="px-4 py-3 text-sm font-medium text-indigo-700 bg-indigo-50 w-1/3 capitalize">
                    {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {typeof parsedValue === "boolean" ? (
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-sm font-semibold ${
                          parsedValue ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {parsedValue ? "Oui" : "Non"}
                      </span>
                    ) : typeof parsedValue === "object" ? (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-3  rounded-[7px] border border-gray-200">
                        {Object.entries(parsedValue).map(([subKey, subValue]) => (
                          <div key={subKey} className="flex flex-col ">
                            <span className="text-sm font-medium text-indigo-600 capitalize">
                              {subKey.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                            </span>
                            <span className="text-sm font-semibold text-gray-800">
                              {typeof subValue === "boolean"
                                ? subValue ? "Oui" : "Non"
                                : String(subValue)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="font-medium">{String(parsedValue)}</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="text-center py-8 text-gray-400 italic">
      Aucun détail disponible
    </div>
  );
};

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getAllRequiredDocuments = () => {
    //@ts-ignore
    const serviceRequiredDocs = serviceRequest.service?.requiredDocuments || []
    //@ts-ignore
    const treatmentRequiredDocs = serviceRequest.traitements?.flatMap((t: any) => t.documentsRequis || []) || []
    return [...new Set([...serviceRequiredDocs, ...treatmentRequiredDocs])]
  }
console.log(serviceRequest,getAllRequiredDocuments(),'player00')
  return (
    <div>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/user/service-requests">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold">Détails de la Demande</h1>
              <p className="text-muted-foreground">Référence: {
                //@ts-ignore
              serviceRequest.numeroReference}</p>
            </div>
          </div>

          <div className="flex gap-2">
            <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
              <Trash2 className="h-4 w-4 mr-2" />
              Supprimer
            </Button>
          </div>
        </div>

        {/* Status Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {//@ts-ignore
                    serviceRequest.service?.title || serviceRequest.type.toUpperCase()}
                  </CardTitle>
                  <CardDescription>
                    Créée le {//@ts-ignore
                    format(new Date(serviceRequest.createdAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
                  </CardDescription>
                </div>
              </div>
              {//@ts-ignore
              getEtatBadge(serviceRequest.traitements?.[0]?.etat || serviceRequest.etat)}
            </div>
          </CardHeader>
        </Card>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="details">Détails</TabsTrigger>
            <TabsTrigger value="documents">Documents ({
              //@ts-ignore
            serviceRequest.documents?.length || 0})</TabsTrigger>
            <TabsTrigger value="required-docs">Documents Requis</TabsTrigger>
            <TabsTrigger value="treatments">Traitements ({
              //@ts-ignore
            serviceRequest.traitements?.length || 0})</TabsTrigger>
            <TabsTrigger value="timeline">Historique</TabsTrigger>
          </TabsList>

          {/* Details Tab */}
          <TabsContent value="details" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Informations générales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Informations Générales
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Type</p>
                      <p className="font-medium">{
                        //@ts-ignore
                      serviceRequest.type}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">État</p>
                      {//@ts-ignore
                      getEtatBadge(serviceRequest.traitements?.[0]?.etat || serviceRequest.etat)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Priorité</p>
                      <Badge variant={//@ts-ignore
                        serviceRequest.priorite === "urgente" ? "destructive" : "secondary"}>
                        {//@ts-ignore
                        serviceRequest.priorite}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Date limite</p>
                      <p className="font-medium">
                        {//@ts-ignore
                        format(new Date(serviceRequest.dateLimiteTraitement), "dd/MM/yyyy", { locale: fr })}
                      </p>
                    </div>
                  </div>
                  {//@ts-ignore
                  serviceRequest.metadata && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Métadonnées</p>
                      <div className="bg-muted p-3 rounded-lg mt-1">
                        <pre className="text-xs">{//@ts-ignore
                        JSON.stringify(serviceRequest.metadata, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Demandeur
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Nom complet</p>
                    <p className="font-medium">
                      {//@ts-ignore
                      serviceRequest.nom} {serviceRequest.prenom}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p>{//@ts-ignore
                    serviceRequest.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <p>{//@ts-ignore
                    serviceRequest.telephone}</p>
                  </div>
                  {//@ts-ignore
                  serviceRequest.utilisateur && (
                    <div className="border-t pt-4 space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Informations utilisateur</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Lieu de naissance:</span>
                          <p className="font-medium">{//@ts-ignore
                          serviceRequest.utilisateur.birthPlace}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Nationalité:</span>
                          <p className="font-medium">{//@ts-ignore
                          serviceRequest.utilisateur.nationality}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Ville:</span>
                          <p className="font-medium">{//@ts-ignore
                          serviceRequest.utilisateur.city}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Type ID:</span>
                          <p className="font-medium">{//@ts-ignore
                          serviceRequest.utilisateur.idType}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {//@ts-ignore
            serviceRequest.service && (
              <Card>
                <CardHeader>
                  <CardTitle>Service Demandé</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Titre</p>
                      <p className="font-medium">{//@ts-ignore
                      serviceRequest.service.title}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Catégorie</p>
                      <p className="font-medium">{//@ts-ignore
                      serviceRequest.service.category}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Statut</p>
                      <Badge variant={//@ts-ignore
                        serviceRequest.service.isActive ? "default" : "secondary"}>
                        {//@ts-ignore
                        serviceRequest.service.isActive ? "Actif" : "Inactif"}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Description</p>
                    <p className="font-medium">{//@ts-ignore
                    serviceRequest.service.description}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Détails de la demande */}
            <Card>
              <CardHeader>
                <CardTitle>Détails de la Demande 00</CardTitle>
              </CardHeader>
              <CardContent>{//@ts-ignore
              renderRequestDetails(serviceRequest.demande)}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="required-docs" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Documents Requis</h3>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Voir Tous les Documents
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[800px] bg-white ">
                  <SheetHeader>
                    <SheetTitle>Tous les Documents</SheetTitle>
                    <SheetDescription>Documents liés à la demande {
                      //@ts-ignore
                    serviceRequest.numeroReference}</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4 overflow-y-auto max-h-[80vh] w-full">
                    {//@ts-ignore
                    serviceRequest.documents?.map((doc: any) => (
                      <Card key={doc.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <DocumentIcon
                              //@ts-ignore
                               fileName={doc.nom} mimeType={doc.mimeType} className="h-8 w-8" />
                              <div>
                                <p className="font-medium truncate max-w-40">{doc.nom}</p>
                                <p className="text-sm text-muted-foreground">
                                  {doc.type} • {formatFileSize(doc.size)}
                                </p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" className="rounded-[7px]" size="sm" onClick={() => handlePreview(doc)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm" className="rounded-[7px]" onClick={() => handleDownload(doc)}>
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="grid gap-4">
              {getAllRequiredDocuments().map((requiredDoc: string, index: number) => {
                const isMissing = isDocumentMissing(requiredDoc)
                //@ts-ignore
                const uploadedDoc = serviceRequest.documents?.find(
                  (d: any) => d.type?.toUpperCase().replace(/ /g, "_") === requiredDoc.toUpperCase().replace(/ /g, "_"),
                )

                return (
                  <Card
                    key={index}
                    //@ts-ignore
                    className={`transition-all duration-500 ${isMissing && !serviceRequest.traitements?.[0]?.etat === "termine" ? "animate-pulse border-blue-300 bg-blue-50" : "border-green-300 bg-green-50"}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isMissing ? (
                            <AlertCircle className="h-6 w-6 text-blue-500" />
                          ) : (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          )}
                          <div>
                            <p className="font-medium">{requiredDoc}</p>
                            <p className="text-sm text-muted-foreground">
                              {isMissing ? "Document requis non fourni" : "Document fourni"}
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          {isMissing ? (
                            <>
  {//@ts-ignore
  serviceRequest.traitements?.[0]?.etat !== "termine" ? (
    <Button
      onClick={() => handleUploadForRequiredDoc(requiredDoc)}
      className="bg-blue-500 text-white hover:bg-blue-600"
    >
      <Upload className="h-4 w-4 mr-2" />
      Uploader
    </Button>
  ) : (
    <p>Traitement déjà terminé</p>
  )}
</>

                          ) : (
                            <div className="flex gap-2">
                              <Button variant="outline" disabled className="opacity-50 bg-transparent">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Fourni
                              </Button>
                              {uploadedDoc && (
                                <>
                                  <Button variant="outline" size="sm" onClick={() => handlePreview(uploadedDoc)}>
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" onClick={() => handleDownload(uploadedDoc)}>
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Documents Uploadés ({
                //@ts-ignore
              serviceRequest.documents?.length || 0})</h3>
              {/* <Button
                variant="outline"
                onClick={() => {
                  setSelectedDocumentType("")
                  setUploadMode("request")
                  setShowUploadDialog(true)
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter Document
              </Button> */}
            </div>

            <div className="grid gap-4">
              {//@ts-ignore
              serviceRequest.documents?.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Aucun document attaché</p>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        setSelectedDocumentType("")
                        setUploadMode("request")
                        setShowUploadDialog(true)
                      }}
                      //@ts-ignore
                      disabled={
                        //@ts-ignore
                        serviceRequest.traitements?.[0]?.etat === "termine"}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter votre premier document
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {//@ts-ignore
                  serviceRequest.documents?.map((doc: any) => (
                    <Card key={doc.id} className="hover:shadow-lg transition-shadow border border-border/60">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <DocumentIcon
                          //@ts-ignore
                            fileName={doc.nom}
                            mimeType={doc.mimeType}
                            className="h-10 w-10 flex-shrink-0 text-primary"
                          />

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium truncate" title={doc.nom}>
                                {doc.nom}
                              </p>
                              {doc.type && (
                                <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  {doc.type.replace(/_/g, " ")}
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-muted-foreground">{formatFileSize(doc.size)}</p>
                            {doc.createdAt && (
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(doc.createdAt), "dd/MM/yyyy", { locale: fr })}
                              </p>
                            )}
                            {doc.description && <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>}
                          </div>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem onClick={() => handlePreview(doc)}>
                                <Eye className="h-4 w-4 mr-2" />
                                Voir
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownload(doc)}>
                                <Download className="h-4 w-4 mr-2" />
                                Télécharger
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Treatments Tab */}
          <TabsContent value="treatments" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Traitements ({
                //@ts-ignore
              serviceRequest.traitements?.length || 0})</h3>
              {!existingTreatment && false && (
                <Button onClick={() => setShowTreatmentDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Créer Traitement
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {//@ts-ignore
              serviceRequest.traitements?.length === 0 && false ? (
                <Card>
                  <CardContent className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Aucun traitement en cours</p>
                    <Button className="mt-4" onClick={() => setShowTreatmentDialog(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Créer le premier traitement
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                //@ts-ignore
                serviceRequest.traitements?.map((treatment: any) => (
                  <Card key={treatment.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Traitement #{treatment.numeroTraitement}</CardTitle>
                        <Badge variant={treatment.etat === "termine" ? "default" : "secondary"}>{treatment.etat}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Agent</p>
                          <p className="font-medium">
                            {treatment.agentPrenom} {treatment.agentNom}
                          </p>
                          <p className="text-sm text-muted-foreground">{treatment.agentEmail}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Service</p>
                          <p className="font-medium">{treatment.agentService || "Non spécifié"}</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Temps estimé</p>
                          <p className="font-medium">{treatment.tempsEstime || 0}h</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Temps réel</p>
                          <p className="font-medium">{treatment.tempsReel || "N/A"}h</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Notifications</p>
                          <div className="flex gap-2">
                            <Badge variant={treatment.notifyByEmail ? "default" : "secondary"}>
                              Email: {treatment.notifyByEmail ? "Oui" : "Non"}
                            </Badge>
                            <Badge variant={treatment.notifyBySms ? "default" : "secondary"}>
                              SMS: {treatment.notifyBySms ? "Oui" : "Non"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Message</p>
                        <div className="bg-muted p-3 rounded-lg mt-1">
                          <p className="text-sm whitespace-pre-wrap">{treatment.messageAgent}</p>
                        </div>
                      </div>

                      {treatment.commentairesInternes && (
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Commentaires internes</p>
                          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg mt-1">
                            <p className="text-sm whitespace-pre-wrap">{treatment.commentairesInternes}</p>
                          </div>
                        </div>
                      )}

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Date d'échéance</p>
                          <p className="font-medium">
                            {format(new Date(treatment.dateEcheance), "dd/MM/yyyy HH:mm", { locale: fr })}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Résultat</p>
                          <Badge variant={treatment.resultat === "en_attente" ? "secondary" : "default"}>
                            {treatment.resultat}
                          </Badge>
                        </div>
                      </div>

                      {/* {treatment.documentsRequis && treatment.documentsRequis.length > 0 && (
                        <div className="border-t pt-4">
                          <p className="text-sm font-medium text-muted-foreground mb-3">
                            Documents requis pour ce traitement
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {treatment.documentsRequis.map((docReq: string, idx: number) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className={
                                  isDocumentMissing(docReq)
                                    ? "border-orange-300 text-orange-700"
                                    : "border-green-300 text-green-700"
                                }
                              >
                                {docReq}
                                {isDocumentMissing(docReq) ? " ⚠️" : " ✅"}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )} */}

                      {/* Documents générés */}
                      {treatment.documentsGeneres && treatment.documentsGeneres.length > 0 && (
                        <div className="border-t pt-4">
                          <p className="text-sm font-medium text-muted-foreground mb-3">
                            Documents générés ({treatment.documentsGeneres.length})
                          </p>
                          <div className="grid gap-2">
                            {treatment.documentsGeneres.map((doc: any, docIndex: number) => (
                              <div key={docIndex} className="flex items-center justify-between p-2 bg-muted rounded">
                                <div className="flex items-center gap-2">
                                  <DocumentIcon
                                  //@ts-ignore
                                   fileName={doc.fileName} mimeType={doc.mimeType} className="h-4 w-4" />
                                  <span className="text-sm">{doc.fileName}</span>
                                </div>
                                <div className="flex gap-1">
                                  <Button variant="ghost" size="sm" onClick={() => handlePreview(doc)}>
                                    <Eye className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleDownload(doc)}>
                                    <Download className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Historique de la Demande
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">Demande créée</p>
                      <p className="text-sm text-muted-foreground">
                        {
                          //@ts-ignore
                        format(new Date(serviceRequest.createdAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
                      </p>
                    </div>
                  </div>

                  {
                    //@ts-ignore
                  serviceRequest.traitements?.map((treatment: any) => (
                    <div key={treatment.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="font-medium">
                          Traitement assigné à {treatment.agentPrenom} {treatment.agentNom}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(treatment.createdAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {
                    //@ts-ignore
                  serviceRequest.notifications?.map((notification: any) => (
                    <div key={notification.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(notification.createdAt), "dd MMMM yyyy à HH:mm", { locale: fr })}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <Badge variant="secondary" className="text-xs">
                          Non lu
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <ServiceRequestDocumentUpload
          open={showUploadDialog}
          onOpenChange={setShowUploadDialog}
          //@ts-ignore
          serviceRequest={serviceRequest}
          mode={uploadMode}
          preSelectedDocumentType={selectedDocumentType}
        />

        <CreateTreatmentDialog
          open={showTreatmentDialog}
          onOpenChange={setShowTreatmentDialog}
          requestId={requestId}
          existingTreatment={existingTreatment}
        />

        <DeleteConfirmationDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleDelete}
          title="Supprimer la demande"
          description="Êtes-vous sûr de vouloir supprimer cette demande ? Cette action est irréversible."
          isLoading={deleteRequest.isPending}
        />
      </div>
    </div>
  )
}
