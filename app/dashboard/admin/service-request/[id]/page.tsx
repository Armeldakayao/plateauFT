// // "use client"

// // import { useState } from "react"
// // import { useParams, useRouter } from "next/navigation"

// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Button } from "@/components/ui/button"
// // import { Badge } from "@/components/ui/badge"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Separator } from "@/components/ui/separator"
// // import { Calendar, FileText, Mail, Phone, User, Building, Trash2 } from "lucide-react"
// // import { format } from "date-fns"
// // import { fr } from "date-fns/locale"
// // import { useServiceRequest } from "@/hooks/services-requests/use-service-request"
// // import { useDeleteServiceRequest } from "@/hooks"
// // import { ServiceRequestDocuments } from "@/components/dashboard/service-request-documents"
// // import { CreateTreatmentDialog } from "@/components/dashboard/create-treatment-dialog"
// // import { UpdateTreatmentDialog } from "@/components/dashboard/update-treatment-dialog"
// // import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-modal"

// // export default function ServiceRequestDetailPage() {
// //   const params = useParams()
// //   const router = useRouter()
// //   const id = params.id as string

// //   const { data: request, isLoading } = useServiceRequest(id)
// //   const deleteServiceRequest = useDeleteServiceRequest()
// //   const [showCreateTreatment, setShowCreateTreatment] = useState(false)
// //   const [selectedTreatment, setSelectedTreatment] = useState<any>(null)
// //   const [showDeleteDialog, setShowDeleteDialog] = useState(false)

// //   const handleDelete = async () => {
// //     try {
// //       await deleteServiceRequest.mutateAsync(id)
// //       router.push("/admin/service-requests")
// //     } catch (error) {
// //       console.error("Erreur lors de la suppression:", error)
// //     }
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="container mx-auto p-6">
// //         <div className="flex justify-center py-8">
// //           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (!request) {
// //     return (
// //       <div className="container mx-auto p-6">
// //         <Card>
// //           <CardContent className="pt-6">
// //             <p className="text-center text-muted-foreground">Demande non trouvée</p>
// //           </CardContent>
// //         </Card>
// //       </div>
// //     )
// //   }

// //   const getEtatBadge = (etat: string) => {
// //     const colors = {
// //       en_attente: "bg-yellow-100 text-yellow-800",
// //       en_cours: "bg-blue-100 text-blue-800",
// //       termine: "bg-green-100 text-green-800",
// //       annule: "bg-red-100 text-red-800",
// //     }
// //     return (
// //       <Badge className={colors[etat as keyof typeof colors] || "bg-gray-100 text-gray-800"}>
// //         {etat.replace("_", " ")}
// //       </Badge>
// //     )
// //   }

// //   const existingTreatment = request.traitements && request.traitements.length > 0 ? request.traitements[0] : null

// //   return (
// //     <div className="container mx-auto p-6 space-y-6">
// //       {/* Header */}
// //       <div className="flex justify-between items-start">
// //         <div>
// //           <h1 className="text-3xl font-bold">Demande {request.numeroReference}</h1>
// //           <p className="text-muted-foreground">
// //             Créée le {format(new Date(request.createdAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
// //           </p>
// //         </div>
// //         <div className="flex gap-2">
// //           {getEtatBadge(request.etat)}
// //           <Badge variant="outline">{request.type.toUpperCase()}</Badge>
// //           <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>
// //             <Trash2 className="h-4 w-4 mr-2" />
// //             Supprimer
// //           </Button>
// //         </div>
// //       </div>

// //       <Tabs defaultValue="details" className="space-y-4">
// //         <TabsList>
// //           <TabsTrigger value="details">Détails</TabsTrigger>
// //           <TabsTrigger value="treatments">Traitements ({request.traitements?.length || 0})</TabsTrigger>
// //           <TabsTrigger value="documents">Documents</TabsTrigger>
// //         </TabsList>

// //         <TabsContent value="details" className="space-y-4">
// //           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //             {/* Informations du demandeur */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <User className="h-5 w-5" />
// //                   Informations du demandeur
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div>
// //                     <label className="text-sm font-medium text-muted-foreground">Nom</label>
// //                     <p className="font-medium">{request.nom}</p>
// //                   </div>
// //                   <div>
// //                     <label className="text-sm font-medium text-muted-foreground">Prénom</label>
// //                     <p className="font-medium">{request.prenom}</p>
// //                   </div>
// //                 </div>

// //                 <div className="flex items-center gap-2">
// //                   <Mail className="h-4 w-4 text-muted-foreground" />
// //                   <span>{request.email}</span>
// //                 </div>

// //                 <div className="flex items-center gap-2">
// //                   <Phone className="h-4 w-4 text-muted-foreground" />
// //                   <span>{request.telephone}</span>
// //                 </div>

// //                 {request.utilisateur && (
// //                   <>
// //                     <Separator />
// //                     <div className="space-y-3">
// //                       <h4 className="font-medium text-sm">Informations personnelles</h4>

// //                       {request.utilisateur.birthDate && (
// //                         <div className="grid grid-cols-2 gap-4">
// //                           <div>
// //                             <label className="text-sm font-medium text-muted-foreground">Date de naissance</label>
// //                             <p className="text-sm">
// //                               {format(new Date(request.utilisateur.birthDate), "dd/MM/yyyy", { locale: fr })}
// //                             </p>
// //                           </div>
// //                           <div>
// //                             <label className="text-sm font-medium text-muted-foreground">Lieu de naissance</label>
// //                             <p className="text-sm">{request.utilisateur.birthPlace}</p>
// //                           </div>
// //                         </div>
// //                       )}

// //                       <div className="grid grid-cols-2 gap-4">
// //                         <div>
// //                           <label className="text-sm font-medium text-muted-foreground">Nationalité</label>
// //                           <p className="text-sm">{request.utilisateur.nationality}</p>
// //                         </div>
// //                         <div>
// //                           <label className="text-sm font-medium text-muted-foreground">Ville</label>
// //                           <p className="text-sm">{request.utilisateur.city}</p>
// //                         </div>
// //                       </div>

// //                       <div className="grid grid-cols-2 gap-4">
// //                         <div>
// //                           <label className="text-sm font-medium text-muted-foreground">Type de pièce</label>
// //                           <p className="text-sm">{request.utilisateur.idType}</p>
// //                         </div>
// //                         <div>
// //                           <label className="text-sm font-medium text-muted-foreground">Numéro</label>
// //                           <p className="text-sm">{request.utilisateur.idNumber}</p>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </>
// //                 )}

// //                 {request.demande.profession && (
// //                   <div>
// //                     <label className="text-sm font-medium text-muted-foreground">Profession</label>
// //                     <p className="font-medium">{request.demande.profession}</p>
// //                   </div>
// //                 )}

// //                 {request.demande.institution && (
// //                   <div className="flex items-center gap-2">
// //                     <Building className="h-4 w-4 text-muted-foreground" />
// //                     <span>{request.demande.institution}</span>
// //                   </div>
// //                 )}

// //                 {request.demande.nationalId && (
// //                   <div>
// //                     <label className="text-sm font-medium text-muted-foreground">Numéro d'identité nationale</label>
// //                     <p className="font-medium">{request.demande.nationalId}</p>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>

// //             {/* Détails de la demande */}
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle className="flex items-center gap-2">
// //                   <FileText className="h-5 w-5" />
// //                   Détails de la demande
// //                 </CardTitle>
// //               </CardHeader>
// //               <CardContent className="space-y-4">
// //                 <div>
// //                   <label className="text-sm font-medium text-muted-foreground">Service</label>
// //                   <p className="font-medium">{request.service?.title}</p>
// //                   <p className="text-sm text-muted-foreground">{request.service?.description}</p>
// //                 </div>

// //                 {request.service?.requiredDocuments && request.service.requiredDocuments.length > 0 && (
// //                   <div>
// //                     <label className="text-sm font-medium text-muted-foreground">Documents requis</label>
// //                     <ul className="text-sm space-y-1 mt-1">
// //                       {request.service.requiredDocuments.map((doc, index) => (
// //                         <li key={index} className="flex items-center gap-2">
// //                           <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
// //                           {doc}
// //                         </li>
// //                       ))}
// //                     </ul>
// //                   </div>
// //                 )}

// //                 <Separator />

// //                 <div>
// //                   <label className="text-sm font-medium text-muted-foreground">Priorité</label>
// //                   <Badge variant={request.priorite === "urgente" ? "destructive" : "secondary"}>
// //                     {request.priorite}
// //                   </Badge>
// //                 </div>

// //                 <div className="flex items-center gap-2">
// //                   <Calendar className="h-4 w-4 text-muted-foreground" />
// //                   <div>
// //                     <label className="text-sm font-medium text-muted-foreground">Date limite</label>
// //                     <p>{format(new Date(request.dateLimiteTraitement), "dd/MM/yyyy", { locale: fr })}</p>
// //                   </div>
// //                 </div>

// //                 {request.type === "rdv" && request.demande.subject && (
// //                   <div>
// //                     <label className="text-sm font-medium text-muted-foreground">Sujet</label>
// //                     <p className="font-medium">{request.demande.subject}</p>
// //                   </div>
// //                 )}

// //                 {request.type === "rdv" && request.demande.meetingType && (
// //                   <div>
// //                     <label className="text-sm font-medium text-muted-foreground">Type de rencontre</label>
// //                     <p className="font-medium">{request.demande.meetingType}</p>
// //                   </div>
// //                 )}

// //                 {request.type === "rdv" && request.demande.meetingTarget && (
// //                   <div>
// //                     <label className="text-sm font-medium text-muted-foreground">Objectif de la rencontre</label>
// //                     <p className="font-medium">{request.demande.meetingTarget}</p>
// //                   </div>
// //                 )}

// //                 {request.type === "rdv" &&
// //                   (request.demande.preferredSlot1 ||
// //                     request.demande.preferredSlot2 ||
// //                     request.demande.preferredSlot3) && (
// //                     <div>
// //                       <label className="text-sm font-medium text-muted-foreground">Créneaux préférés</label>
// //                       <div className="space-y-1 mt-1">
// //                         {request.demande.preferredSlot1 && (
// //                           <p className="text-sm">
// //                             1. {format(new Date(request.demande.preferredSlot1), "dd/MM/yyyy à HH:mm", { locale: fr })}
// //                           </p>
// //                         )}
// //                         {request.demande.preferredSlot2 && (
// //                           <p className="text-sm">
// //                             2. {format(new Date(request.demande.preferredSlot2), "dd/MM/yyyy à HH:mm", { locale: fr })}
// //                           </p>
// //                         )}
// //                         {request.demande.preferredSlot3 && (
// //                           <p className="text-sm">
// //                             3. {format(new Date(request.demande.preferredSlot3), "dd/MM/yyyy à HH:mm", { locale: fr })}
// //                           </p>
// //                         )}
// //                       </div>
// //                     </div>
// //                   )}

// //                 {(request.demande.certifyAccuracy || request.demande.authorizeContact) && (
// //                   <div>
// //                     <label className="text-sm font-medium text-muted-foreground">Autorisations</label>
// //                     <div className="space-y-1 mt-1">
// //                       {request.demande.certifyAccuracy && (
// //                         <p className="text-sm text-green-600">✓ Exactitude des informations certifiée</p>
// //                       )}
// //                       {request.demande.authorizeContact && <p className="text-sm text-green-600">✓ Contact autorisé</p>}
// //                     </div>
// //                   </div>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           </div>

// //           {request.service?.workflow?.steps && request.service.workflow.steps.length > 0 && (
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Processus de traitement</CardTitle>
// //                 <CardDescription>Étapes du workflow pour ce type de service</CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="space-y-3">
// //                   {request.service.workflow.steps.map((step, index) => (
// //                     <div key={index} className="flex items-center gap-3">
// //                       <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
// //                         {index + 1}
// //                       </div>
// //                       <div>
// //                         <p className="font-medium">{step.name}</p>
// //                         <p className="text-sm text-muted-foreground">Responsable: {step.responsable}</p>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           )}

// //           {request.notifications && request.notifications.length > 0 && (
// //             <Card>
// //               <CardHeader>
// //                 <CardTitle>Notifications</CardTitle>
// //                 <CardDescription>Historique des notifications pour cette demande</CardDescription>
// //               </CardHeader>
// //               <CardContent>
// //                 <div className="space-y-3">
// //                   {request.notifications.map((notification) => (
// //                     <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
// //                       <div
// //                         className={`w-2 h-2 rounded-full mt-2 ${notification.isRead ? "bg-muted-foreground" : "bg-blue-500"}`}
// //                       ></div>
// //                       <div className="flex-1">
// //                         <p className="text-sm">{notification.message}</p>
// //                         <p className="text-xs text-muted-foreground mt-1">
// //                           {format(new Date(notification.createdAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
// //                         </p>
// //                       </div>
// //                       <Badge variant={notification.type === "info" ? "secondary" : "default"} className="text-xs">
// //                         {notification.type}
// //                       </Badge>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           )}
// //         </TabsContent>

// //         <TabsContent value="treatments" className="space-y-4">
// //           <div className="flex justify-between items-center">
// //             <h3 className="text-lg font-semibold">Traitements</h3>
// //             {!existingTreatment && <Button onClick={() => setShowCreateTreatment(true)}>Nouveau traitement</Button>}
// //           </div>

// //           <div className="space-y-4">
// //             {request.traitements?.map((treatment) => (
// //               <Card key={treatment.id}>
// //                 <CardHeader>
// //                   <div className="flex justify-between items-start">
// //                     <div>
// //                       <CardTitle className="text-lg">{treatment.numeroTraitement}</CardTitle>
// //                       <CardDescription>
// //                         Agent: {treatment.agentPrenom} {treatment.agentNom}
// //                       </CardDescription>
// //                     </div>
// //                     <div className="flex gap-2">
// //                       {getEtatBadge(treatment.etat)}
// //                       <Button variant="outline" size="sm" onClick={() => setSelectedTreatment(treatment)}>
// //                         Modifier
// //                       </Button>
// //                     </div>
// //                   </div>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                     <div>
// //                       <label className="text-sm font-medium text-muted-foreground">Message agent</label>
// //                       <p>{treatment.messageAgent}</p>
// //                     </div>
// //                     <div>
// //                       <label className="text-sm font-medium text-muted-foreground">Date d'échéance</label>
// //                       <p>{format(new Date(treatment.dateEcheance), "dd/MM/yyyy", { locale: fr })}</p>
// //                     </div>
// //                     {treatment.commentairesInternes && (
// //                       <div className="md:col-span-2">
// //                         <label className="text-sm font-medium text-muted-foreground">Commentaires internes</label>
// //                         <p className="text-sm">{treatment.commentairesInternes}</p>
// //                       </div>
// //                     )}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             ))}
// //           </div>
// //         </TabsContent>

// //         <TabsContent value="documents">
// //           <ServiceRequestDocuments requestId={request.id} documents={request.documents} />
// //         </TabsContent>
// //       </Tabs>

// //       {/* Dialogs */}
// //       <CreateTreatmentDialog
// //         open={showCreateTreatment}
// //         onOpenChange={setShowCreateTreatment}
// //         requestId={request.id}
// //         existingTreatment={existingTreatment}
// //       />

// //       {selectedTreatment && (
// //         <UpdateTreatmentDialog
// //           open={!!selectedTreatment}
// //           onOpenChange={() => setSelectedTreatment(null)}
// //           treatment={selectedTreatment}
// //         />
// //       )}

// //       <DeleteConfirmationDialog
// //         open={showDeleteDialog}
// //         onOpenChange={setShowDeleteDialog}
// //         onConfirm={handleDelete}
// //         title="Supprimer la demande"
// //         description={`Êtes-vous sûr de vouloir supprimer la demande ${request.numeroReference} ? Cette action est irréversible.`}
// //         isLoading={deleteServiceRequest.isPending}
// //       />
// //     </div>
// //   )
// // }


// "use client"

// import { useState } from "react"
// import { useParams, useRouter } from "next/navigation"

// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Separator } from "@/components/ui/separator"
// import { Calendar, FileText, Mail, Phone, User, Building, Trash2, Clock, CheckCircle2, AlertCircle } from "lucide-react"
// import { format } from "date-fns"
// import { fr } from "date-fns/locale"
// import { useServiceRequest } from "@/hooks/services-requests/use-service-request"
// import { useDeleteServiceRequest } from "@/hooks"
// import { ServiceRequestDocuments } from "@/components/dashboard/service-request-documents"
// import { CreateTreatmentDialog } from "@/components/dashboard/create-treatment-dialog"
// import { UpdateTreatmentDialog } from "@/components/dashboard/update-treatment-dialog"
// import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-modal"
// import { RequiredDocumentsTab } from "@/components/dashboard/required-documents-tab"


// export default function ServiceRequestDetailPage() {
//   const params = useParams()
//   const router = useRouter()
//   const id = params.id as string

//   const { data: request, isLoading } = useServiceRequest(id)
//   const deleteServiceRequest = useDeleteServiceRequest()
//   const [showCreateTreatment, setShowCreateTreatment] = useState(false)
//   const [selectedTreatment, setSelectedTreatment] = useState<any>(null)
//   const [showDeleteDialog, setShowDeleteDialog] = useState(false)

//   const handleDelete = async () => {
//     try {
//       await deleteServiceRequest.mutateAsync(id)
//       router.push("/admin/service-requests")
//     } catch (error) {
//       console.error("Erreur lors de la suppression:", error)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="flex justify-center py-12">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//         </div>
//       </div>
//     )
//   }

//   if (!request) {
//     return (
//       <div className="container mx-auto p-6">
//         <Card className="animate-fade-in">
//           <CardContent className="pt-8 text-center">
//             <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//             <p className="text-lg font-medium mb-2">Demande non trouvée</p>
//             <p className="text-muted-foreground">Cette demande n'existe pas ou a été supprimée.</p>
//           </CardContent>
//         </Card>
//       </div>
//     )
//   }

//   const getEtatBadge = (etat: string) => {
//     const configs = {
//       en_attente: {
//         className: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-50",
//         icon: Clock,
//         label: "En attente",
//       },
//       en_cours: {
//         className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
//         icon: Clock,
//         label: "En cours",
//       },
//       termine: {
//         className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50",
//         icon: CheckCircle2,
//         label: "Terminé",
//       },
//       validee: {
//         className: "bg-green-50 text-green-700 border-green-200 hover:bg-green-50",
//         icon: CheckCircle2,
//         label: "Validée",
//       },
//       annule: {
//         className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-50",
//         icon: AlertCircle,
//         label: "Annulé",
//       },
//     }

//     const config = configs[etat as keyof typeof configs] || configs.en_attente
//     const Icon = config.icon

//     return (
//       <Badge variant="outline" className={config.className}>
//         <Icon className="h-3 w-3 mr-1" />
//         {config.label}
//       </Badge>
//     )
//   }

//   const existingTreatment = request.traitements && request.traitements.length > 0 ? request.traitements[0] : null

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
//       <div className="container mx-auto p-6 space-y-8 animate-fade-in">
//         <div className="bg-card rounded-xl p-8 shadow-sm border animate-slide-up">
//           <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
//             <div className="space-y-3">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 rounded-lg bg-primary/10">
//                   <FileText className="h-6 w-6 text-primary" />
//                 </div>
//                 <div>
//                   <h1 className="text-3xl font-bold text-balance">Demande {request.numeroReference}</h1>
//                   <p className="text-muted-foreground text-pretty">
//                     Créée le {format(new Date(request.createdAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               {getEtatBadge(request.etat)}
//               <Badge variant="outline" className="bg-secondary/10 text-secondary-foreground border-secondary/20">
//                 {request.type.toUpperCase()}
//               </Badge>
//               <Button
//                 variant="destructive"
//                 size="sm"
//                 onClick={() => setShowDeleteDialog(true)}
//                 className="hover:scale-105 transition-transform"
//               >
//                 <Trash2 className="h-4 w-4 mr-2" />
//                 Supprimer
//               </Button>
//             </div>
//           </div>
//         </div>

//         <Tabs defaultValue="details" className="space-y-6">
//           <TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1 rounded-xl">
//             <TabsTrigger
//               value="details"
//               className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
//             >
//               Détails
//             </TabsTrigger>
//             <TabsTrigger
//               value="treatments"
//               className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
//             >
//               Traitements ({request.traitements?.length || 0})
//             </TabsTrigger>
//             <TabsTrigger
//               value="required-documents"
//               className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
//             >
//               Documents requis
//             </TabsTrigger>
//             <TabsTrigger
//               value="documents"
//               className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
//             >
//               Documents
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="details" className="space-y-6 animate-fade-in">
//             <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
//               <Card className="shadow-sm hover:shadow-md transition-shadow duration-200 animate-slide-up">
//                 <CardHeader className="pb-4">
//                   <CardTitle className="flex items-center gap-3">
//                     <div className="p-2 rounded-lg bg-primary/10">
//                       <User className="h-5 w-5 text-primary" />
//                     </div>
//                     Informations du demandeur
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-1">
//                       <label className="text-sm font-medium text-muted-foreground">Nom</label>
//                       <p className="font-medium">{request.nom}</p>
//                     </div>
//                     <div className="space-y-1">
//                       <label className="text-sm font-medium text-muted-foreground">Prénom</label>
//                       <p className="font-medium">{request.prenom}</p>
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
//                       <Mail className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm">{request.email}</span>
//                     </div>

//                     <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
//                       <Phone className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm">{request.telephone}</span>
//                     </div>
//                   </div>

//                   {request.utilisateur && (
//                     <>
//                       <Separator />
//                       <div className="space-y-4">
//                         <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
//                           Informations personnelles
//                         </h4>

//                         {request.utilisateur.birthDate && (
//                           <div className="grid grid-cols-2 gap-4">
//                             <div className="space-y-1">
//                               <label className="text-sm font-medium text-muted-foreground">Date de naissance</label>
//                               <p className="text-sm">
//                                 {format(new Date(request.utilisateur.birthDate), "dd/MM/yyyy", { locale: fr })}
//                               </p>
//                             </div>
//                             <div className="space-y-1">
//                               <label className="text-sm font-medium text-muted-foreground">Lieu de naissance</label>
//                               <p className="text-sm">{request.utilisateur.birthPlace}</p>
//                             </div>
//                           </div>
//                         )}

//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="space-y-1">
//                             <label className="text-sm font-medium text-muted-foreground">Nationalité</label>
//                             <p className="text-sm capitalize">{request.utilisateur.nationality}</p>
//                           </div>
//                           <div className="space-y-1">
//                             <label className="text-sm font-medium text-muted-foreground">Ville</label>
//                             <p className="text-sm capitalize">{request.utilisateur.city}</p>
//                           </div>
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                           <div className="space-y-1">
//                             <label className="text-sm font-medium text-muted-foreground">Type de pièce</label>
//                             <p className="text-sm capitalize">{request.utilisateur.idType}</p>
//                           </div>
//                           <div className="space-y-1">
//                             <label className="text-sm font-medium text-muted-foreground">Numéro</label>
//                             <p className="text-sm">{request.utilisateur.idNumber}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                   {request.demande.profession && (
//                     <div className="space-y-1">
//                       <label className="text-sm font-medium text-muted-foreground">Profession</label>
//                       <p className="font-medium">{request.demande.profession}</p>
//                     </div>
//                   )}

//                   {request.demande.institution && (
//                     <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
//                       <Building className="h-4 w-4 text-muted-foreground" />
//                       <span className="text-sm">{request.demande.institution}</span>
//                     </div>
//                   )}

//                   {request.demande.nationalId && (
//                     <div className="space-y-1">
//                       <label className="text-sm font-medium text-muted-foreground">Numéro d'identité nationale</label>
//                       <p className="font-medium">{request.demande.nationalId}</p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>

//               <Card
//                 className="shadow-sm hover:shadow-md transition-shadow duration-200 animate-slide-up"
//                 style={{ animationDelay: "0.1s" }}
//               >
//                 <CardHeader className="pb-4">
//                   <CardTitle className="flex items-center gap-3">
//                     <div className="p-2 rounded-lg bg-secondary/10">
//                       <FileText className="h-5 w-5 text-secondary-foreground" />
//                     </div>
//                     Détails de la demande
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-2">
//                     <label className="text-sm font-medium text-muted-foreground">Service</label>
//                     <div className="p-4 rounded-lg bg-muted/50">
//                       <p className="font-medium text-balance">{request.service?.title}</p>
//                       <p className="text-sm text-muted-foreground text-pretty">{request.service?.description}</p>
//                     </div>
//                   </div>

//                   <Separator />

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-muted-foreground">Priorité</label>
//                       <Badge variant={request.priorite === "urgente" ? "destructive" : "secondary"} className="w-fit">
//                         {request.priorite}
//                       </Badge>
//                     </div>

//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-muted-foreground">Date limite</label>
//                       <div className="flex items-center gap-2">
//                         <Calendar className="h-4 w-4 text-muted-foreground" />
//                         <p className="text-sm">
//                           {format(new Date(request.dateLimiteTraitement), "dd/MM/yyyy", { locale: fr })}
//                         </p>
//                       </div>
//                     </div>
//                   </div>

//                   {request.service?.requiredDocuments && request.service.requiredDocuments.length > 0 && (
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-muted-foreground">Documents requis</label>
//                       <ul className="text-sm space-y-1 mt-1">
//                         {request.service.requiredDocuments.map((doc, index) => (
//                           <li key={index} className="flex items-center gap-2">
//                             <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
//                             {doc}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}

//                   {(request.demande.certifyAccuracy || request.demande.authorizeContact) && (
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-muted-foreground">Autorisations</label>
//                       <div className="space-y-1 mt-1">
//                         {request.demande.certifyAccuracy && (
//                           <p className="text-sm text-green-600">✓ Exactitude des informations certifiée</p>
//                         )}
//                         {request.demande.authorizeContact && (
//                           <p className="text-sm text-green-600">✓ Contact autorisé</p>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </div>

//             {request.service?.workflow?.steps && request.service.workflow.steps.length > 0 && (
//               <Card
//                 className="shadow-sm hover:shadow-md transition-shadow duration-200 animate-slide-up"
//                 style={{ animationDelay: "0.2s" }}
//               >
//                 <CardHeader className="pb-4">
//                   <CardTitle>Processus de traitement</CardTitle>
//                   <CardDescription>Étapes du workflow pour ce type de service</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {request.service.workflow.steps.map((step, index) => (
//                       <div key={index} className="flex items-center gap-3">
//                         <div className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center justify-center">
//                           {index + 1}
//                         </div>
//                         <div>
//                           <p className="font-medium">{step.name}</p>
//                           <p className="text-sm text-muted-foreground">Responsable: {step.responsable}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {request.notifications && request.notifications.length > 0 && (
//               <Card
//                 className="shadow-sm hover:shadow-md transition-shadow duration-200 animate-slide-up"
//                 style={{ animationDelay: "0.3s" }}
//               >
//                 <CardHeader className="pb-4">
//                   <CardTitle>Notifications</CardTitle>
//                   <CardDescription>Historique des notifications pour cette demande</CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="space-y-3">
//                     {request.notifications.map((notification) => (
//                       <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
//                         <div
//                           className={`w-2 h-2 rounded-full mt-2 ${notification.isRead ? "bg-muted-foreground" : "bg-blue-500"}`}
//                         ></div>
//                         <div className="flex-1">
//                           <p className="text-sm">{notification.message}</p>
//                           <p className="text-xs text-muted-foreground mt-1">
//                             {format(new Date(notification.createdAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
//                           </p>
//                         </div>
//                         <Badge variant={notification.type === "info" ? "secondary" : "default"} className="text-xs">
//                           {notification.type}
//                         </Badge>
//                       </div>
//                     ))}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </TabsContent>

//           <TabsContent value="treatments" className="space-y-6 animate-fade-in">
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="text-xl font-semibold text-balance">Traitements</h3>
//                 <p className="text-muted-foreground text-pretty">Historique des traitements pour cette demande</p>
//               </div>
//               {!existingTreatment && (
//                 <Button onClick={() => setShowCreateTreatment(true)} className="hover:scale-105 transition-transform">
//                   Nouveau traitement
//                 </Button>
//               )}
//             </div>

//             <div className="space-y-4">
//               {request.traitements?.map((treatment, index) => (
//                 <Card
//                   key={treatment.id}
//                   className="shadow-sm hover:shadow-md transition-all duration-200 animate-slide-up"
//                   style={{ animationDelay: `${index * 0.1}s` }}
//                 >
//                   <CardHeader>
//                     <div className="flex justify-between items-start">
//                       <div className="space-y-2">
//                         <CardTitle className="text-lg">{treatment.numeroTraitement}</CardTitle>
//                         <CardDescription className="flex items-center gap-2">
//                           <User className="h-4 w-4" />
//                           Agent: {treatment.agentPrenom} {treatment.agentNom}
//                         </CardDescription>
//                       </div>
//                       <div className="flex gap-3">
//                         {getEtatBadge(treatment.etat)}
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => setSelectedTreatment(treatment)}
//                           className="hover:scale-105 transition-transform"
//                         >
//                           Modifier
//                         </Button>
//                       </div>
//                     </div>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-muted-foreground">Message agent</label>
//                         <div className="p-3 rounded-lg bg-muted/50">
//                           <p className="text-sm text-pretty">{treatment.messageAgent}</p>
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <label className="text-sm font-medium text-muted-foreground">Date d'échéance</label>
//                         <div className="flex items-center gap-2">
//                           <Calendar className="h-4 w-4 text-muted-foreground" />
//                           <p className="text-sm">
//                             {format(new Date(treatment.dateEcheance), "dd/MM/yyyy", { locale: fr })}
//                           </p>
//                         </div>
//                       </div>
//                       {treatment.commentairesInternes && (
//                         <div className="md:col-span-2 space-y-2">
//                           <label className="text-sm font-medium text-muted-foreground">Commentaires internes</label>
//                           <div className="p-3 rounded-lg bg-muted/50">
//                             <p className="text-sm text-pretty">{treatment.commentairesInternes}</p>
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}

//               {(!request.traitements || request.traitements.length === 0) && (
//                 <Card className="animate-fade-in">
//                   <CardContent className="p-8 text-center">
//                     <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                     <h4 className="font-medium mb-2">Aucun traitement</h4>
//                     <p className="text-sm text-muted-foreground mb-4">Cette demande n'a pas encore été traitée.</p>
//                     <Button onClick={() => setShowCreateTreatment(true)}>Créer un traitement</Button>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           </TabsContent>

//           <TabsContent value="required-documents">
//             <RequiredDocumentsTab
//               requestId={request.id}
//               requiredDocuments={request.service?.requiredDocuments || []}
//               uploadedDocuments={request.documents || []}
//               documentsRequis={existingTreatment?.documentsRequis || []}
//             />
//           </TabsContent>

//           <TabsContent value="documents" className="animate-fade-in">
//             <ServiceRequestDocuments requestId={request.id} documents={request.documents} />
//           </TabsContent>
//         </Tabs>

//         {/* Dialogs */}
//         <CreateTreatmentDialog
//           open={showCreateTreatment}
//           onOpenChange={setShowCreateTreatment}
//           requestId={request.id}
//           existingTreatment={existingTreatment}
//         />

//         {selectedTreatment && (
//           <UpdateTreatmentDialog
//             open={!!selectedTreatment}
//             onOpenChange={() => setSelectedTreatment(null)}
//             treatment={selectedTreatment}
//           />
//         )}

//         <DeleteConfirmationDialog
//           open={showDeleteDialog}
//           onOpenChange={setShowDeleteDialog}
//           onConfirm={handleDelete}
//           title="Supprimer la demande"
//           description={`Êtes-vous sûr de vouloir supprimer la demande ${request.numeroReference} ? Cette action est irréversible.`}
//           isLoading={deleteServiceRequest.isPending}
//         />
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Calendar, FileText, Mail, Phone, User, Building, Trash2, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useServiceRequest } from "@/hooks/services-requests/use-service-request"
import { useDeleteServiceRequest } from "@/hooks"
import { ServiceRequestDocuments } from "@/components/dashboard/service-request-documents"
import { CreateTreatmentDialog } from "@/components/dashboard/create-treatment-dialog"
import { UpdateTreatmentDialog } from "@/components/dashboard/update-treatment-dialog"
import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-modal"
import { RequiredDocumentsTab } from "@/components/dashboard/required-documents-tab"


export default function ServiceRequestDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  const { data: request, isLoading } = useServiceRequest(id)
  const deleteServiceRequest = useDeleteServiceRequest()
  const [showCreateTreatment, setShowCreateTreatment] = useState(false)
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handleDelete = async () => {
    try {
      await deleteServiceRequest.mutateAsync(id)
      router.push("/admin/service-requests")
    } catch (error) {
      console.error("Erreur lors de la suppression:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="container mx-auto p-6">
        <Card className="animate-fade-in bg-gradient-to-r from-red-50/50 to-orange-50/50 border-red-200/50">
          <CardContent className="pt-8 text-center">
            <AlertCircle className="h-12 w-12 text-red-500/70 mx-auto mb-4" />
            <p className="text-lg font-medium mb-2">Demande non trouvée</p>
            <p className="text-muted-foreground">Cette demande n'existe pas ou a été supprimée.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getEtatBadge = (etat: string) => {
    const configs = {
      en_attente: {
        className: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
        icon: Clock,
        label: "En attente",
      },
      en_cours: {
        className: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
        icon: Clock,
        label: "En cours",
      },
      termine: {
        className: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
        icon: CheckCircle2,
        label: "Terminé",
      },
      validee: {
        className: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
        icon: CheckCircle2,
        label: "Validée",
      },
      annule: {
        className: "bg-red-50 text-red-700 border-red-200 hover:bg-red-100",
        icon: AlertCircle,
        label: "Annulé",
      },
    }

    const config = configs[etat as keyof typeof configs] || configs.en_attente
    const Icon = config.icon

    return (
      <Badge variant="outline" className={config.className}>
        <Icon className="h-3 w-3 mr-1" />
        {config.label}
      </Badge>
    )
  }
 //@ts-ignore
  const existingTreatment = request.traitements && request.traitements.length > 0 ? request.traitements[0] : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      <div className="container mx-auto p-6 space-y-8 animate-fade-in">
        <div className="bg-gradient-to-r from-white to-slate-50/80 rounded-xl p-8 shadow-sm border border-slate-200/60 animate-slide-up">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-200/30">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-balance bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                    Demande {
                       //@ts-ignore
                    request.numeroReference}
                  </h1>
                  <p className="text-muted-foreground text-pretty">
                    Créée le {
                       //@ts-ignore
                    format(new Date(request.createdAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {
             getEtatBadge(
                 //@ts-ignore
  request.traitements?.[0]?.etat ?? request.etat
)
}
              <Badge variant="outline" className="bg-gradient-to-r from-violet-50 to-purple-50 text-violet-700 border-violet-200">
                {
                   //@ts-ignore
                request.type.toUpperCase()}
              </Badge>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteDialog(true)}
                className="hover:scale-105 transition-transform text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-slate-100/80 to-slate-50/80 p-1 rounded-xl border border-slate-200/60">
            <TabsTrigger
              value="details"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-blue-50/50 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-blue-200/30 transition-all"
            >
              Détails
            </TabsTrigger>
            <TabsTrigger
              value="treatments"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-green-50/50 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-green-200/30 transition-all"
            >
              Traitements ({
                 //@ts-ignore
              request.traitements?.length || 0})
            </TabsTrigger>
            <TabsTrigger
              value="required-documents"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-orange-50/50 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-orange-200/30 transition-all"
            >
              Documents requis
            </TabsTrigger>
            <TabsTrigger
              value="documents"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-white data-[state=active]:to-purple-50/50 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-purple-200/30 transition-all"
            >
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="border-2 hover:shadow-md transition-shadow duration-200 animate-slide-up bg-gradient-to-br from-white to-blue-50/30 border-gray-400/40">
                <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b rounded-t-[7px]">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-200/30">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    Informations du demandeur
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">Nom</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      request.nom}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-muted-foreground">Prénom</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      request.prenom}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-[7px] bg-gradient-to-r from-blue-50/50 to-slate-50/50 border-2">
                      <Mail className="h-4 w-4 text-blue-600" />
                      <span className="text-sm">{
                         //@ts-ignore
                      request.email}</span>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-[7px] bg-gradient-to-r from-green-50/50 to-slate-50/50  border-2">
                      <Phone className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{
                         //@ts-ignore
                      request.telephone}</span>
                    </div>
                  </div>

                  {
                     //@ts-ignore
                  request.utilisateur && (
                    <>
                      <Separator className="bg-gray-300" />
                      <div className="space-y-4 bg-gradient-to-r from-slate-50/40 to-blue-50/40 p-4 rounded-[7px] border-2">
                        <h4 className="font-medium text-sm text-slate-600 uppercase tracking-wide flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          Informations personnelles
                        </h4>

                        {
                           //@ts-ignore
                        request.utilisateur.birthDate && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-sm font-medium text-muted-foreground">Date de naissance</label>
                              <p className="text-sm">
                                {
                                   //@ts-ignore
                                format(new Date(request.utilisateur.birthDate), "dd/MM/yyyy", { locale: fr })}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <label className="text-sm font-medium text-muted-foreground">Lieu de naissance</label>
                              <p className="text-sm">{
                                 //@ts-ignore
                              request.utilisateur.birthPlace}</p>
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground">Nationalité</label>
                            <p className="text-sm capitalize">{
                               //@ts-ignore
                            request.utilisateur.nationality}</p>
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground">Ville</label>
                            <p className="text-sm capitalize">{
                               //@ts-ignore
                            request.utilisateur.city}</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground">Type de pièce</label>
                            <p className="text-sm capitalize">{
                               //@ts-ignore
                            request.utilisateur.idType}</p>
                          </div>
                          <div className="space-y-1">
                            <label className="text-sm font-medium text-muted-foreground">Numéro</label>
                            <p className="text-sm">{
                               //@ts-ignore
                            request.utilisateur.idNumber}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {
                     //@ts-ignore
                  request.demande.profession && (
                    <div className="space-y-1 bg-gradient-to-r from-indigo-50/40 to-purple-50/40 p-3 rounded-[7px] border-2">
                      <label className="text-sm font-medium text-muted-foreground">Profession</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      request.demande.profession}</p>
                    </div>
                  )}

                  { //@ts-ignore
                  request.demande.institution && (
                    <div className="flex items-center gap-3 p-3 rounded-[7px] bg-gradient-to-r from-orange-50/50 to-slate-50/50  border-2">
                      <Building className="h-4 w-4 text-orange-600" />
                      <span className="text-sm">{
                         //@ts-ignore
                      request.demande.institution}</span>
                    </div>
                  )}

                  {
                     //@ts-ignore
                  request.demande.nationalId && (
                    <div className="space-y-1 bg-gradient-to-r from-emerald-50/40 to-teal-50/40 p-3 rounded-[7px]  border-2">
                      <label className="text-sm font-medium text-muted-foreground">Numéro d'identité nationale</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      request.demande.nationalId}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card
                className="shadow-sm hover:shadow-md transition-shadow duration-200 animate-slide-up bg-gradient-to-br from-white to-green-50/30 border"
                style={{ animationDelay: "0.1s" }}
              >
                <CardHeader className="pb-4 bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-3">
                    <div className="p-2 rounded-[7px] bg-gradient-to-r from-green-500/10 to-emerald-500/10  border-2">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    Détails de la demande
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Service</label>
                    <div className="p-4 rounded-lg bg-gradient-to-r from-green-50/40 to-blue-50/40 border border-green-100/50">
                      <p className="font-medium text-balance">{
                         //@ts-ignore
                      request.service?.title}</p>
                      <p className="text-sm text-muted-foreground text-pretty">{
                         //@ts-ignore
                      request.service?.description}</p>
                    </div>
                  </div>

                  <Separator className="bg-gradient-to-r from-transparent via-green-200 to-transparent" />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2 bg-gradient-to-r from-amber-50/40 to-orange-50/40 p-3 rounded-lg border border-amber-100/50">
                      <label className="text-sm font-medium text-muted-foreground">Priorité</label>
                      <Badge variant={
                         //@ts-ignore
                        request.priorite === "urgente" ? "destructive" : "secondary"} className="w-fit">
                        { //@ts-ignore
                        request.priorite}
                      </Badge>
                    </div>

                    <div className="space-y-2 bg-gradient-to-r from-blue-50/40 to-cyan-50/40 p-3 rounded-lg border border-blue-100/50">
                      <label className="text-sm font-medium text-muted-foreground">Date limite</label>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                        <p className="text-sm">
                          { //@ts-ignore
                          format(new Date(request.dateLimiteTraitement), "dd/MM/yyyy", { locale: fr })}
                        </p>
                      </div>
                    </div>
                  </div>

                  { //@ts-ignore
                  request.service?.requiredDocuments && request.service.requiredDocuments.length > 0 && (
                    <div className="space-y-2 bg-gradient-to-r from-violet-50/40 to-purple-50/40 p-4 rounded-lg border border-violet-100/50">
                      <label className="text-sm font-medium text-violet-700 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-violet-500"></div>
                        Documents requis
                      </label>
                      <ul className="text-sm space-y-1 mt-1">
                        { //@ts-ignore
                        request.service.requiredDocuments.map((doc, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-violet-400 rounded-full"></div>
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  { //@ts-ignore
                  (request.demande.certifyAccuracy || request.demande.authorizeContact) && (
                    <div className="space-y-2 bg-gradient-to-r from-emerald-50/40 to-green-50/40 p-4 rounded-lg border border-emerald-100/50">
                      <label className="text-sm font-medium text-emerald-700 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        Autorisations
                      </label>
                      <div className="space-y-1 mt-1">
                        { //@ts-ignore
                        request.demande.certifyAccuracy && (
                          <p className="text-sm text-emerald-600 flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3" /> Exactitude des informations certifiée
                          </p>
                        )}
                        { //@ts-ignore
                        request.demande.authorizeContact && (
                          <p className="text-sm text-emerald-600 flex items-center gap-2">
                            <CheckCircle2 className="h-3 w-3" /> Contact autorisé
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            { //@ts-ignore
            request.service?.workflow?.steps && request.service.workflow.steps.length > 0 && (
              <Card
                className="shadow-sm hover:shadow-md transition-shadow duration-200 animate-slide-up bg-gradient-to-r from-white to-indigo-50/30 border-indigo-200/40"
                style={{ animationDelay: "0.2s" }}
              >
                <CardHeader className="pb-4 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-indigo-900">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    Processus de traitement
                  </CardTitle>
                  <CardDescription>Étapes du workflow pour ce type de service</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    { //@ts-ignore
                    request.service.workflow.steps.map((step, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-indigo-50/30 to-blue-50/30 border border-indigo-100/40">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium flex items-center justify-center shadow-sm">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{step.name}</p>
                          <p className="text-sm text-muted-foreground">Responsable: {step.responsable}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            { //@ts-ignore
            request.notifications && request.notifications.length > 0 && (
              <Card
                className="shadow-sm hover:shadow-md transition-shadow duration-200 animate-slide-up bg-gradient-to-r from-white to-orange-50/30 border-orange-200/40"
                style={{ animationDelay: "0.3s" }}
              >
                <CardHeader className="pb-4 bg-gradient-to-r from-orange-50/50 to-amber-50/50 rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-orange-900">
                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                    Notifications
                  </CardTitle>
                  <CardDescription>Historique des notifications pour cette demande</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    { //@ts-ignore
                    request.notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-orange-50/30 to-amber-50/30 border border-orange-100/40">
                        <div
                          className={`w-2 h-2 rounded-full mt-2 ${notification.isRead ? "bg-slate-400" : "bg-gradient-to-r from-blue-500 to-cyan-500"}`}
                        ></div>
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(notification.createdAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
                          </p>
                        </div>
                        <Badge variant={notification.type === "info" ? "secondary" : "default"} className="text-xs">
                          {notification.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="treatments" className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-gradient-to-r from-green-50/40 to-emerald-50/40 p-6 rounded-xl border border-green-200/40">
              <div>
                <h3 className="text-xl font-semibold text-balance text-green-900">Traitements</h3>
                <p className="text-muted-foreground text-pretty">Historique des traitements pour cette demande</p>
              </div>
              {!existingTreatment && (
                <Button 
                  onClick={() => setShowCreateTreatment(true)} 
                  className="hover:scale-105 transition-transform bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                >
                  Nouveau traitement
                </Button>
              )}
            </div>

            <div className="space-y-4">
              { //@ts-ignore
              request.traitements?.map((treatment, index) => (
                <Card
                  key={treatment.id}
                  className="shadow-sm hover:shadow-md transition-all duration-200 animate-slide-up bg-gradient-to-r from-white to-green-50/20 border-green-200/30"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="bg-gradient-to-r from-green-50/50 to-teal-50/50 rounded-t-lg">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-lg text-green-900">{treatment.numeroTraitement}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <User className="h-4 w-4 text-green-600" />
                          Agent: {treatment.agentPrenom} {treatment.agentNom}
                        </CardDescription>
                      </div>
                      <div className="flex gap-3">
                        {getEtatBadge(treatment.etat)}
                        <Button
                        title={treatment.etat === "termine" && treatment.resultat === "validee" ? "Ce traitement est finalisé et ne peut plus être modifié." : "Modifier ce traitement"}
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedTreatment(treatment)}
                          className={`hover:scale-105 transition-transform border-green-200 hover:bg-green-50 ${treatment.etat === "termine"  ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
                         
                        >
                          Modifier
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Message agent</label>
                        <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50/50 to-cyan-50/50 border border-blue-100/50">
                          <p className="text-sm text-pretty">{treatment.messageAgent}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Date d'échéance</label>
                        <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-orange-50/50 to-amber-50/50 border border-orange-100/50">
                          <Calendar className="h-4 w-4 text-orange-600" />
                          <p className="text-sm">
                            {format(new Date(treatment.dateEcheance), "dd/MM/yyyy", { locale: fr })}
                          </p>
                        </div>
                      </div>
                      {treatment.commentairesInternes && (
                        <div className="md:col-span-2 space-y-2">
                          <label className="text-sm font-medium text-muted-foreground">Commentaires internes</label>
                          <div className="p-3 rounded-lg bg-gradient-to-r from-violet-50/50 to-purple-50/50 border border-violet-100/50">
                            <p className="text-sm text-pretty">{treatment.commentairesInternes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              { //@ts-ignore
              (!request.traitements || request.traitements.length === 0) && (
                <Card className="animate-fade-in bg-gradient-to-r from-slate-50/50 to-blue-50/50 border-slate-200/50">
                  <CardContent className="p-8 text-center">
                    <Clock className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h4 className="font-medium mb-2">Aucun traitement</h4>
                    <p className="text-sm text-muted-foreground mb-4">Cette demande n'a pas encore été traitée.</p>
                    <Button 
                      onClick={() => setShowCreateTreatment(true)}
                      className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                    >
                      Créer un traitement
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="required-documents">
            <RequiredDocumentsTab
             //@ts-ignore
              requestId={request.id}
               //@ts-ignore
              requiredDocuments={request.service?.requiredDocuments || []}
               //@ts-ignore
              uploadedDocuments={request.documents || []}
              documentsRequis={existingTreatment?.documentsRequis || []}
            />
          </TabsContent>

          <TabsContent value="documents" className="animate-fade-in">
            <ServiceRequestDocuments
             //@ts-ignore
             requestId={request.id} 
              //@ts-ignore
             documents={request.documents} />
          </TabsContent>
        </Tabs>

        {/* Dialogs */}
        <CreateTreatmentDialog
          open={showCreateTreatment}
          onOpenChange={setShowCreateTreatment}
           //@ts-ignore
          requestId={request.id}
          existingTreatment={existingTreatment}
        />

        {selectedTreatment && (
          <UpdateTreatmentDialog
            open={!!selectedTreatment}
            onOpenChange={() => setSelectedTreatment(null)}
            treatment={selectedTreatment}
          />
        )}

        <DeleteConfirmationDialog
          open={showDeleteDialog}
          onOpenChange={setShowDeleteDialog}
          onConfirm={handleDelete}
          title="Supprimer la demande"
           //@ts-ignore
          description={`Êtes-vous sûr de vouloir supprimer la demande ${request.numeroReference} ? Cette action est irréversible.`}
          isLoading={deleteServiceRequest.isPending}
        />
      </div>
    </div>
  )
}