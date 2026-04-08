// // // // // "use client"

// // // // // import { useState } from "react"
// // // // // import { motion, AnimatePresence } from "framer-motion"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // // // // import { Badge } from "@/components/ui/badge"
// // // // // import { Bell, Eye, Trash2, Filter, Calendar, User, AlertTriangle, FileText } from "lucide-react"

// // // // // interface Notification {
// // // // //   id: string
// // // // //   type: string
// // // // //   title: string
// // // // //   description: string
// // // // //   date: string
// // // // //   time: string
// // // // //   status: "nouveau" | "lu" | "traité"
// // // // //   priority: "haute" | "normale" | "basse"
// // // // //   details: {
// // // // //     demandeur: string
// // // // //     service: string
// // // // //     reference: string
// // // // //     documents: string[]
// // // // //     commentaire: string
// // // // //   }
// // // // // }

// // // // // interface ConfirmDeleteModalProps {
// // // // //   isOpen: boolean
// // // // //   onClose: () => void
// // // // //   onConfirm: () => void
// // // // //   title: string
// // // // // }

// // // // // function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title }: ConfirmDeleteModalProps) {
// // // // //   return (
// // // // //     <Dialog open={isOpen} onOpenChange={onClose}>
// // // // //       <DialogContent className="sm:max-w-md">
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, scale: 0.95 }}
// // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // //           exit={{ opacity: 0, scale: 0.95 }}
// // // // //           transition={{ duration: 0.2 }}
// // // // //         >
// // // // //           <DialogHeader className="text-center">
// // // // //             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // // // //               <AlertTriangle className="w-8 h-8 text-red-600" />
// // // // //             </div>
// // // // //             <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">Confirmer la suppression</DialogTitle>
// // // // //             <p className="text-gray-600 mb-6">
// // // // //               Êtes-vous sûr de vouloir supprimer cette notification ?
// // // // //               <br />
// // // // //               <span className="font-medium">"{title}"</span>
// // // // //             </p>
// // // // //           </DialogHeader>
// // // // //           <div className="flex gap-3">
// // // // //             <Button
// // // // //               variant="outline"
// // // // //               onClick={onClose}
// // // // //               className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
// // // // //             >
// // // // //               Annuler
// // // // //             </Button>
// // // // //             <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
// // // // //               Supprimer
// // // // //             </Button>
// // // // //           </div>
// // // // //         </motion.div>
// // // // //       </DialogContent>
// // // // //     </Dialog>
// // // // //   )
// // // // // }

// // // // // interface NotificationDetailsModalProps {
// // // // //   isOpen: boolean
// // // // //   onClose: () => void
// // // // //   notification: Notification | null
// // // // // }

// // // // // function NotificationDetailsModal({ isOpen, onClose, notification }: NotificationDetailsModalProps) {
// // // // //   if (!notification) return null

// // // // //   return (
// // // // //     <Dialog open={isOpen} onOpenChange={onClose}>
// // // // //       <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, scale: 0.95 }}
// // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // //           exit={{ opacity: 0, scale: 0.95 }}
// // // // //           transition={{ duration: 0.2 }}
// // // // //         >
// // // // //           <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white -m-6 mb-6 p-6 rounded-t-lg">
// // // // //             <DialogTitle className="text-lg">Détails de la notification</DialogTitle>
// // // // //             <div className="flex items-center gap-2 mt-2">
// // // // //               <Badge variant="outline" className="bg-white/20 text-white border-white/30">
// // // // //                 {notification.type}
// // // // //               </Badge>
// // // // //               <Badge
// // // // //                 className={`${
// // // // //                   notification.priority === "haute"
// // // // //                     ? "bg-red-500"
// // // // //                     : notification.priority === "normale"
// // // // //                       ? "bg-blue-500"
// // // // //                       : "bg-gray-500"
// // // // //                 } text-white`}
// // // // //               >
// // // // //                 {notification.priority}
// // // // //               </Badge>
// // // // //             </div>
// // // // //           </DialogHeader>

// // // // //           <div className="space-y-6">
// // // // //             <div>
// // // // //               <h3 className="font-semibold text-gray-900 mb-2">{notification.title}</h3>
// // // // //               <p className="text-gray-600 mb-4">{notification.description}</p>
// // // // //               <div className="text-sm text-gray-500">
// // // // //                 {notification.date} à {notification.time}
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // // //               <div className="bg-gray-50 p-4 rounded-lg">
// // // // //                 <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
// // // // //                   <User className="w-4 h-4" />
// // // // //                   Demandeur
// // // // //                 </h4>
// // // // //                 <p className="text-gray-700">{notification.details.demandeur}</p>
// // // // //               </div>
// // // // //               <div className="bg-gray-50 p-4 rounded-lg">
// // // // //                 <h4 className="font-medium text-gray-900 mb-2">Service demandé</h4>
// // // // //                 <p className="text-gray-700">{notification.details.service}</p>
// // // // //               </div>
// // // // //               <div className="bg-gray-50 p-4 rounded-lg">
// // // // //                 <h4 className="font-medium text-gray-900 mb-2">Référence</h4>
// // // // //                 <p className="text-gray-700 font-mono text-sm">{notification.details.reference}</p>
// // // // //               </div>
// // // // //               <div className="bg-gray-50 p-4 rounded-lg">
// // // // //                 <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
// // // // //                   <FileText className="w-4 h-4" />
// // // // //                   Documents joints
// // // // //                 </h4>
// // // // //                 <div className="space-y-1">
// // // // //                   {notification.details.documents.map((doc, index) => (
// // // // //                     <p key={index} className="text-gray-700 text-sm">
// // // // //                       • {doc}
// // // // //                     </p>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </div>
// // // // //             </div>

// // // // //             {notification.details.commentaire && (
// // // // //               <div className="bg-blue-50 p-4 rounded-lg">
// // // // //                 <h4 className="font-medium text-blue-900 mb-2">Commentaire</h4>
// // // // //                 <p className="text-blue-800">{notification.details.commentaire}</p>
// // // // //               </div>
// // // // //             )}
// // // // //           </div>

// // // // //           <div className="flex gap-3 mt-8">
// // // // //             <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
// // // // //               Fermer
// // // // //             </Button>
// // // // //             <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
// // // // //               Marquer comme traité
// // // // //             </Button>
// // // // //           </div>
// // // // //         </motion.div>
// // // // //       </DialogContent>
// // // // //     </Dialog>
// // // // //   )
// // // // // }

// // // // // export default function NotificationCenter() {
// // // // //   const [filterType, setFilterType] = useState("all")
// // // // //   const [filterDate, setFilterDate] = useState("all")
// // // // //   const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; notification: Notification | null }>({
// // // // //     isOpen: false,
// // // // //     notification: null,
// // // // //   })
// // // // //   const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; notification: Notification | null }>({
// // // // //     isOpen: false,
// // // // //     notification: null,
// // // // //   })

// // // // //   const [notifications, setNotifications] = useState<Notification[]>([
// // // // //     {
// // // // //       id: "1",
// // // // //       type: "Demande citoyenne",
// // // // //       title: "Nouvelle demande de célébration de mariage",
// // // // //       description: "Demande reçue pour le 8/01/25",
// // // // //       date: "16/01/25",
// // // // //       time: "09:42",
// // // // //       status: "nouveau",
// // // // //       priority: "normale",
// // // // //       details: {
// // // // //         demandeur: "Jean Dupont & Marie Martin",
// // // // //         service: "Célébration de mariage",
// // // // //         reference: "MAR-2025-001",
// // // // //         documents: ["CNI des conjoints", "Certificat de célibat", "Acte de naissance"],
// // // // //         commentaire: "Demande urgente pour célébration le 8 janvier 2025",
// // // // //       },
// // // // //     },
// // // // //     {
// // // // //       id: "2",
// // // // //       type: "Demande citoyenne",
// // // // //       title: "Un document a été ajouté à la demande #2025-00034",
// // // // //       description: "(preuve de résidence)",
// // // // //       date: "16/01/25",
// // // // //       time: "09:42",
// // // // //       status: "nouveau",
// // // // //       priority: "haute",
// // // // //       details: {
// // // // //         demandeur: "Pierre Kouassi",
// // // // //         service: "Certificat de résidence",
// // // // //         reference: "RES-2025-034",
// // // // //         documents: ["Facture d'électricité", "Contrat de bail"],
// // // // //         commentaire: "Document manquant ajouté - dossier complet",
// // // // //       },
// // // // //     },
// // // // //     {
// // // // //       id: "3",
// // // // //       type: "Demande citoyenne",
// // // // //       title: "Nouvelle demande reçue pour le 20/07/25 à 16h00",
// // // // //       description: "Service: Acte de naissance",
// // // // //       date: "14/01/25",
// // // // //       time: "14:12",
// // // // //       status: "lu",
// // // // //       priority: "normale",
// // // // //       details: {
// // // // //         demandeur: "Aya Traoré",
// // // // //         service: "Acte de naissance",
// // // // //         reference: "ACT-2025-078",
// // // // //         documents: ["Déclaration de naissance", "CNI des parents"],
// // // // //         commentaire: "Première demande d'acte de naissance",
// // // // //       },
// // // // //     },
// // // // //   ])

// // // // //   const markAsRead = (id: string) => {
// // // // //     setNotifications(notifications.map((notif) => (notif.id === id ? { ...notif, status: "lu" } : notif)))
// // // // //   }

// // // // //   const openDeleteModal = (notification: Notification) => {
// // // // //     setDeleteModal({ isOpen: true, notification })
// // // // //   }

// // // // //   const confirmDelete = () => {
// // // // //     if (deleteModal.notification) {
// // // // //       setNotifications(notifications.filter((notif) => notif.id !== deleteModal.notification!.id))
// // // // //     }
// // // // //     setDeleteModal({ isOpen: false, notification: null })
// // // // //   }

// // // // //   const openDetailsModal = (notification: Notification) => {
// // // // //     setDetailsModal({ isOpen: true, notification })
// // // // //     markAsRead(notification.id)
// // // // //   }

// // // // //   const markAllAsRead = () => {
// // // // //     setNotifications(notifications.map((notif) => ({ ...notif, status: "lu" })))
// // // // //   }

// // // // //   const filteredNotifications = notifications.filter((notif) => {
// // // // //     if (filterType !== "all" && notif.type !== filterType) return false
// // // // //     return true
// // // // //   })

// // // // //   const getStatusColor = (status: string) => {
// // // // //     switch (status) {
// // // // //       case "nouveau":
// // // // //         return "bg-blue-500"
// // // // //       case "lu":
// // // // //         return "bg-gray-400"
// // // // //       case "traité":
// // // // //         return "bg-green-500"
// // // // //       default:
// // // // //         return "bg-gray-400"
// // // // //     }
// // // // //   }

// // // // //   const getPriorityColor = (priority: string) => {
// // // // //     switch (priority) {
// // // // //       case "haute":
// // // // //         return "border-l-red-500"
// // // // //       case "normale":
// // // // //         return "border-l-blue-500"
// // // // //       case "basse":
// // // // //         return "border-l-gray-400"
// // // // //       default:
// // // // //         return "border-l-gray-400"
// // // // //     }
// // // // //   }

// // // // //   const containerVariants = {
// // // // //     hidden: { opacity: 0, y: 20 },
// // // // //     visible: {
// // // // //       opacity: 1,
// // // // //       y: 0,
// // // // //       transition: {
// // // // //         duration: 0.6,
// // // // //         staggerChildren: 0.1,
// // // // //       },
// // // // //     },
// // // // //   }

// // // // //   const itemVariants = {
// // // // //     hidden: { opacity: 0, y: 20 },
// // // // //     visible: {
// // // // //       opacity: 1,
// // // // //       y: 0,
// // // // //       transition: { duration: 0.5 },
// // // // //     },
// // // // //   }

// // // // //   return (
// // // // //     <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
// // // // //       <motion.div variants={itemVariants}>
// // // // //         <Card className=" border-0 bg-white/80 backdrop-blur-sm">
// // // // //           <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
// // // // //             <div className="flex items-center justify-between">
// // // // //               <CardTitle className="flex items-center gap-2 text-blue-700">
// // // // //                 <Bell className="w-5 h-5" />
// // // // //                 Centre de Notifications
// // // // //               </CardTitle>
// // // // //               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
// // // // //                 <Button
// // // // //                   onClick={markAllAsRead}
// // // // //                   className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
// // // // //                 >
// // // // //                   Marquer tout comme lu
// // // // //                 </Button>
// // // // //               </motion.div>
// // // // //             </div>
// // // // //           </CardHeader>
// // // // //           <CardContent className="p-6">
// // // // //             {/* Filters */}
// // // // //             <div className="flex flex-wrap gap-4 mb-6">
// // // // //               <div className="flex items-center gap-2">
// // // // //                 <Filter className="w-4 h-4 text-gray-500" />
// // // // //                 <Select value={filterType} onValueChange={setFilterType}>
// // // // //                   <SelectTrigger className="w-48">
// // // // //                     <SelectValue placeholder="Filtrer par type" />
// // // // //                   </SelectTrigger>
// // // // //                   <SelectContent>
// // // // //                     <SelectItem value="all">Tous les types</SelectItem>
// // // // //                     <SelectItem value="Demande citoyenne">Demande citoyenne</SelectItem>
// // // // //                     <SelectItem value="Système">Système</SelectItem>
// // // // //                     <SelectItem value="Urgence">Urgence</SelectItem>
// // // // //                   </SelectContent>
// // // // //                 </Select>
// // // // //               </div>
// // // // //               <div className="flex items-center gap-2">
// // // // //                 <Calendar className="w-4 h-4 text-gray-500" />
// // // // //                 <Select value={filterDate} onValueChange={setFilterDate}>
// // // // //                   <SelectTrigger className="w-48">
// // // // //                     <SelectValue placeholder="Filtrer par date" />
// // // // //                   </SelectTrigger>
// // // // //                   <SelectContent>
// // // // //                     <SelectItem value="all">Toutes les dates</SelectItem>
// // // // //                     <SelectItem value="today">Aujourd'hui</SelectItem>
// // // // //                     <SelectItem value="week">Cette semaine</SelectItem>
// // // // //                     <SelectItem value="month">Ce mois</SelectItem>
// // // // //                   </SelectContent>
// // // // //                 </Select>
// // // // //               </div>
// // // // //             </div>

// // // // //             {/* Notifications List */}
// // // // //             <div className="space-y-4">
// // // // //               <AnimatePresence>
// // // // //                 {filteredNotifications.map((notification, index) => (
// // // // //                   <motion.div
// // // // //                     key={notification.id}
// // // // //                     initial={{ opacity: 0, x: -20 }}
// // // // //                     animate={{ opacity: 1, x: 0 }}
// // // // //                     exit={{ opacity: 0, x: 20 }}
// // // // //                     transition={{ duration: 0.3, delay: index * 0.1 }}
// // // // //                     className={`bg-white rounded-lg border-l-4 ${getPriorityColor(notification.priority)} shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer`}
// // // // //                     onClick={() => openDetailsModal(notification)}
// // // // //                   >
// // // // //                     <div className="flex items-start justify-between">
// // // // //                       <div className="flex items-start gap-4 flex-1">
// // // // //                         <div className="flex-shrink-0">
// // // // //                           <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
// // // // //                             <User className="w-6 h-6 text-gray-500" />
// // // // //                           </div>
// // // // //                         </div>
// // // // //                         <div className="flex-1 min-w-0">
// // // // //                           <div className="flex items-center gap-2 mb-1">
// // // // //                             <Badge variant="outline" className="text-xs">
// // // // //                               {notification.type}
// // // // //                             </Badge>
// // // // //                             <div className={`w-2 h-2 rounded-full ${getStatusColor(notification.status)}`} />
// // // // //                           </div>
// // // // //                           <h4 className="font-medium text-gray-900 mb-1">{notification.title}</h4>
// // // // //                           <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
// // // // //                           <div className="text-xs text-gray-500">
// // // // //                             {notification.date} - {notification.time}
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
// // // // //                         <motion.button
// // // // //                           whileHover={{ scale: 1.1 }}
// // // // //                           whileTap={{ scale: 0.9 }}
// // // // //                           onClick={() => openDetailsModal(notification)}
// // // // //                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// // // // //                           title="Voir les détails"
// // // // //                         >
// // // // //                           <Eye className="w-4 h-4" />
// // // // //                         </motion.button>
// // // // //                         <motion.button
// // // // //                           whileHover={{ scale: 1.1 }}
// // // // //                           whileTap={{ scale: 0.9 }}
// // // // //                           onClick={() => openDeleteModal(notification)}
// // // // //                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// // // // //                           title="Supprimer"
// // // // //                         >
// // // // //                           <Trash2 className="w-4 h-4" />
// // // // //                         </motion.button>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   </motion.div>
// // // // //                 ))}
// // // // //               </AnimatePresence>
// // // // //             </div>

// // // // //             {filteredNotifications.length === 0 && (
// // // // //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
// // // // //                 <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
// // // // //                 <h3 className="text-lg font-medium text-gray-500 mb-2">Aucune notification</h3>
// // // // //                 <p className="text-gray-400">Toutes les notifications ont été traitées</p>
// // // // //               </motion.div>
// // // // //             )}
// // // // //           </CardContent>
// // // // //         </Card>
// // // // //       </motion.div>

// // // // //       {/* Delete Confirmation Modal */}
// // // // //       <ConfirmDeleteModal
// // // // //         isOpen={deleteModal.isOpen}
// // // // //         onClose={() => setDeleteModal({ isOpen: false, notification: null })}
// // // // //         onConfirm={confirmDelete}
// // // // //         title={deleteModal.notification?.title || ""}
// // // // //       />

// // // // //       {/* Notification Details Modal */}
// // // // //       <NotificationDetailsModal
// // // // //         isOpen={detailsModal.isOpen}
// // // // //         onClose={() => setDetailsModal({ isOpen: false, notification: null })}
// // // // //         notification={detailsModal.notification}
// // // // //       />
// // // // //     </motion.div>
// // // // //   )
// // // // // }
// // // // "use client"

// // // // import { useState } from "react"
// // // // import { motion, AnimatePresence } from "framer-motion"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { Bell, Eye, Trash2, Filter, Calendar, User, AlertTriangle, FileText } from "lucide-react"
// // // // import { useDeleteNotificationMutation, useMarkAllAsReadMutation, useMarkAsReadMutation, useNotificationsQuery } from "@/hooks/notifications/use-notification-queries"


// // // // interface Notification {
// // // //   id: string
// // // //   type: string
// // // //   title: string
// // // //   description: string
// // // //   date: string
// // // //   time: string
// // // //   status: "nouveau" | "lu" | "traité"
// // // //   priority: "haute" | "normale" | "basse"
// // // //   details: {
// // // //     demandeur: string
// // // //     service: string
// // // //     reference: string
// // // //     documents: string[]
// // // //     commentaire: string
// // // //   }
// // // // }

// // // // interface ConfirmDeleteModalProps {
// // // //   isOpen: boolean
// // // //   onClose: () => void
// // // //   onConfirm: () => void
// // // //   title: string
// // // // }

// // // // function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title }: ConfirmDeleteModalProps) {
// // // //   return (
// // // //     <Dialog open={isOpen} onOpenChange={onClose}>
// // // //       <DialogContent className="sm:max-w-md">
// // // //         <motion.div
// // // //           initial={{ opacity: 0, scale: 0.95 }}
// // // //           animate={{ opacity: 1, scale: 1 }}
// // // //           exit={{ opacity: 0, scale: 0.95 }}
// // // //           transition={{ duration: 0.2 }}
// // // //         >
// // // //           <DialogHeader className="text-center">
// // // //             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // // //               <AlertTriangle className="w-8 h-8 text-red-600" />
// // // //             </div>
// // // //             <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">Confirmer la suppression</DialogTitle>
// // // //             <p className="text-gray-600 mb-6">
// // // //               Êtes-vous sûr de vouloir supprimer cette notification ?
// // // //               <br />
// // // //               <span className="font-medium">"{title}"</span>
// // // //             </p>
// // // //           </DialogHeader>
// // // //           <div className="flex gap-3">
// // // //             <Button
// // // //               variant="outline"
// // // //               onClick={onClose}
// // // //               className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
// // // //             >
// // // //               Annuler
// // // //             </Button>
// // // //             <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
// // // //               Supprimer
// // // //             </Button>
// // // //           </div>
// // // //         </motion.div>
// // // //       </DialogContent>
// // // //     </Dialog>
// // // //   )
// // // // }

// // // // interface NotificationDetailsModalProps {
// // // //   isOpen: boolean
// // // //   onClose: () => void
// // // //   notification: Notification | null
// // // // }

// // // // function NotificationDetailsModal({ isOpen, onClose, notification }: NotificationDetailsModalProps) {
// // // //   if (!notification) return null

// // // //   return (
// // // //     <Dialog open={isOpen} onOpenChange={onClose}>
// // // //       <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
// // // //         <motion.div
// // // //           initial={{ opacity: 0, scale: 0.95 }}
// // // //           animate={{ opacity: 1, scale: 1 }}
// // // //           exit={{ opacity: 0, scale: 0.95 }}
// // // //           transition={{ duration: 0.2 }}
// // // //         >
// // // //           <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white -m-6 mb-6 p-6 rounded-t-lg">
// // // //             <DialogTitle className="text-lg">Détails de la notification</DialogTitle>
// // // //             <div className="flex items-center gap-2 mt-2">
// // // //               <Badge variant="outline" className="bg-white/20 text-white border-white/30">
// // // //                 {notification.type}
// // // //               </Badge>
// // // //               <Badge
// // // //                 className={`${
// // // //                   notification.type === "haute"
// // // //                     ? "bg-red-500"
// // // //                     : notification.type === "normale"
// // // //                       ? "bg-blue-500"
// // // //                       : "bg-gray-500"
// // // //                 } text-white`}
// // // //               >
// // // //                 {notification.type}
// // // //               </Badge>
// // // //             </div>
// // // //           </DialogHeader>

// // // //           <div className="space-y-6">
// // // //             <div>
// // // //               <h3 className="font-semibold text-gray-900 mb-2">{notification.message}</h3>
// // // //               {/* <p className="text-gray-600 mb-4">{notification.description}</p> */}
// // // //               <div className="text-sm text-gray-500">
// // // //                 {notification.createdAt} à {notification.time}
// // // //               </div>
// // // //             </div>

// // // //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// // // //               <div className="bg-gray-50 p-4 rounded-lg">
// // // //                 <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
// // // //                   <User className="w-4 h-4" />
// // // //                   Demandeur
// // // //                 </h4>
// // // //                 <p className="text-gray-700">{notification.details.demandeur}</p>
// // // //               </div>
// // // //               <div className="bg-gray-50 p-4 rounded-lg">
// // // //                 <h4 className="font-medium text-gray-900 mb-2">Service demandé</h4>
// // // //                 <p className="text-gray-700">{notification.details.service}</p>
// // // //               </div>
// // // //               <div className="bg-gray-50 p-4 rounded-lg">
// // // //                 <h4 className="font-medium text-gray-900 mb-2">Référence</h4>
// // // //                 <p className="text-gray-700 font-mono text-sm">{notification.details.reference}</p>
// // // //               </div>
// // // //               <div className="bg-gray-50 p-4 rounded-lg">
// // // //                 <h4 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
// // // //                   <FileText className="w-4 h-4" />
// // // //                   Documents joints
// // // //                 </h4>
// // // //                 <div className="space-y-1">
// // // //                   {notification.details.documents.map((doc, index) => (
// // // //                     <p key={index} className="text-gray-700 text-sm">
// // // //                       • {doc}
// // // //                     </p>
// // // //                   ))}
// // // //                 </div>
// // // //               </div>
// // // //             </div>

// // // //             {notification.details.commentaire && (
// // // //               <div className="bg-blue-50 p-4 rounded-lg">
// // // //                 <h4 className="font-medium text-blue-900 mb-2">Commentaire</h4>
// // // //                 <p className="text-blue-800">{notification.details.commentaire}</p>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           <div className="flex gap-3 mt-8">
// // // //             <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
// // // //               Fermer
// // // //             </Button>
// // // //             <Button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
// // // //               Marquer comme traité
// // // //             </Button>
// // // //           </div>
// // // //         </motion.div>
// // // //       </DialogContent>
// // // //     </Dialog>
// // // //   )
// // // // }

// // // // export default function NotificationCenter() {
// // // //   const [filterType, setFilterType] = useState("all")
// // // //   const [filterDate, setFilterDate] = useState("all")
// // // //   const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; notification: any }>({
// // // //     isOpen: false,
// // // //     notification: null,
// // // //   })
// // // //   const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; notification: any }>({
// // // //     isOpen: false,
// // // //     notification: null,
// // // //   })

// // // //   const { data: notificationsData, isLoading } = useNotificationsQuery()
// // // //   const markAsReadMutation = useMarkAsReadMutation()
// // // //   const markAllAsReadMutation = useMarkAllAsReadMutation()
// // // //   const deleteNotificationMutation = useDeleteNotificationMutation()

// // // //   const notifications = notificationsData?.data || []

// // // //   const markAsRead = async (id: string) => {
// // // //     try {
// // // //       await markAsReadMutation.mutateAsync(id)
// // // //     } catch (error) {
// // // //       console.error("Error marking notification as read:", error)
// // // //     }
// // // //   }

// // // //   const openDeleteModal = (notification: any) => {
// // // //     setDeleteModal({ isOpen: true, notification })
// // // //   }

// // // //   const confirmDelete = async () => {
// // // //     if (deleteModal.notification) {
// // // //       try {
// // // //         await deleteNotificationMutation.mutateAsync(deleteModal.notification.id)
// // // //       } catch (error) {
// // // //         console.error("Error deleting notification:", error)
// // // //       }
// // // //     }
// // // //     setDeleteModal({ isOpen: false, notification: null })
// // // //   }

// // // //   const openDetailsModal = (notification: any) => {
// // // //     setDetailsModal({ isOpen: true, notification })
// // // //     markAsRead(notification.id)
// // // //   }

// // // //   const markAllAsRead = async () => {
// // // //     try {
// // // //       await markAllAsReadMutation.mutateAsync()
// // // //     } catch (error) {
// // // //       console.error("Error marking all notifications as read:", error)
// // // //     }
// // // //   }

// // // //   const filteredNotifications = notifications.filter((notif) => {
// // // //     if (filterType !== "all" && notif.type !== filterType) return false
// // // //     return true
// // // //   })

// // // //   const getStatusColor = (status: string) => {
// // // //     switch (status) {
// // // //       case "nouveau":
// // // //         return "bg-blue-500"
// // // //       case "lu":
// // // //         return "bg-gray-400"
// // // //       case "traité":
// // // //         return "bg-green-500"
// // // //       default:
// // // //         return "bg-gray-400"
// // // //     }
// // // //   }

// // // //   const getPriorityColor = (priority: string) => {
// // // //     switch (priority) {
// // // //       case "haute":
// // // //         return "border-l-red-500"
// // // //       case "normale":
// // // //         return "border-l-blue-500"
// // // //       case "basse":
// // // //         return "border-l-gray-400"
// // // //       default:
// // // //         return "border-l-gray-400"
// // // //     }
// // // //   }

// // // //   const containerVariants = {
// // // //     hidden: { opacity: 0, y: 20 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       y: 0,
// // // //       transition: {
// // // //         duration: 0.6,
// // // //         staggerChildren: 0.1,
// // // //       },
// // // //     },
// // // //   }

// // // //   const itemVariants = {
// // // //     hidden: { opacity: 0, y: 20 },
// // // //     visible: {
// // // //       opacity: 1,
// // // //       y: 0,
// // // //       transition: { duration: 0.5 },
// // // //     },
// // // //   }

// // // //   if (isLoading) {
// // // //     return (
// // // //       <div className="flex items-center justify-center h-64">
// // // //         <div className="text-lg">Chargement des notifications...</div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
// // // //       <motion.div variants={itemVariants}>
// // // //         <Card className=" border-0 bg-white/80 backdrop-blur-sm">
// // // //           <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
// // // //             <div className="flex items-center justify-between">
// // // //               <CardTitle className="flex items-center gap-2 text-blue-700">
// // // //                 <Bell className="w-5 h-5" />
// // // //                 Centre de Notifications
// // // //               </CardTitle>
// // // //               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
// // // //                 <Button
// // // //                   onClick={markAllAsRead}
// // // //                   className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
// // // //                 >
// // // //                   Marquer tout comme lu
// // // //                 </Button>
// // // //               </motion.div>
// // // //             </div>
// // // //           </CardHeader>
// // // //           <CardContent className="p-6">
// // // //             {/* Filters */}
// // // //             <div className="flex flex-wrap gap-4 mb-6">
// // // //               <div className="flex items-center gap-2">
// // // //                 <Filter className="w-4 h-4 text-gray-500" />
// // // //                 <Select value={filterType} onValueChange={setFilterType}>
// // // //                   <SelectTrigger className="w-48">
// // // //                     <SelectValue placeholder="Filtrer par type" />
// // // //                   </SelectTrigger>
// // // //                   <SelectContent>
// // // //                     <SelectItem value="all">Tous les types</SelectItem>
// // // //                     <SelectItem value="Demande citoyenne">Demande citoyenne</SelectItem>
// // // //                     <SelectItem value="Système">Système</SelectItem>
// // // //                     <SelectItem value="Urgence">Urgence</SelectItem>
// // // //                   </SelectContent>
// // // //                 </Select>
// // // //               </div>
// // // //               <div className="flex items-center gap-2">
// // // //                 <Calendar className="w-4 h-4 text-gray-500" />
// // // //                 <Select value={filterDate} onValueChange={setFilterDate}>
// // // //                   <SelectTrigger className="w-48">
// // // //                     <SelectValue placeholder="Filtrer par date" />
// // // //                   </SelectTrigger>
// // // //                   <SelectContent>
// // // //                     <SelectItem value="all">Toutes les dates</SelectItem>
// // // //                     <SelectItem value="today">Aujourd'hui</SelectItem>
// // // //                     <SelectItem value="week">Cette semaine</SelectItem>
// // // //                     <SelectItem value="month">Ce mois</SelectItem>
// // // //                   </SelectContent>
// // // //                 </Select>
// // // //               </div>
// // // //             </div>

// // // //             {/* Notifications List */}
// // // //             <div className="space-y-4">
// // // //               <AnimatePresence>
// // // //                 {filteredNotifications.map((notification, index) => (
// // // //                   <motion.div
// // // //                     key={notification.id}
// // // //                     initial={{ opacity: 0, x: -20 }}
// // // //                     animate={{ opacity: 1, x: 0 }}
// // // //                     exit={{ opacity: 0, x: 20 }}
// // // //                     transition={{ duration: 0.3, delay: index * 0.1 }}
// // // //                     className={`bg-white rounded-lg border-l-4 ${getPriorityColor(notification.type)} shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer`}
// // // //                     onClick={() => openDetailsModal(notification)}
// // // //                   >
// // // //                     <div className="flex items-start justify-between">
// // // //                       <div className="flex items-start gap-4 flex-1">
// // // //                         <div className="flex-shrink-0">
// // // //                           <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
// // // //                             <User className="w-6 h-6 text-gray-500" />
// // // //                           </div>
// // // //                         </div>
// // // //                         <div className="flex-1 min-w-0">
// // // //                           <div className="flex items-center gap-2 mb-1">
// // // //                             <Badge variant="outline" className="text-xs">
// // // //                               {notification.type}
// // // //                             </Badge>
// // // //                             <div className={`w-2 h-2 rounded-full ${getStatusColor(notification.type)}`} />
// // // //                           </div>
// // // //                           <h4 className="font-medium text-gray-900 mb-1">{notification.message}</h4>
// // // //                           {/* <p className="text-sm text-gray-600 mb-2">{notification.description}</p> */}
// // // //                           <div className="text-xs text-gray-500">
// // // //                             {notification.createdAt} 
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                       <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
// // // //                         <motion.button
// // // //                           whileHover={{ scale: 1.1 }}
// // // //                           whileTap={{ scale: 0.9 }}
// // // //                           onClick={() => openDetailsModal(notification)}
// // // //                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// // // //                           title="Voir les détails"
// // // //                         >
// // // //                           <Eye className="w-4 h-4" />
// // // //                         </motion.button>
// // // //                         <motion.button
// // // //                           whileHover={{ scale: 1.1 }}
// // // //                           whileTap={{ scale: 0.9 }}
// // // //                           onClick={() => openDeleteModal(notification)}
// // // //                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// // // //                           title="Supprimer"
// // // //                         >
// // // //                           <Trash2 className="w-4 h-4" />
// // // //                         </motion.button>
// // // //                       </div>
// // // //                     </div>
// // // //                   </motion.div>
// // // //                 ))}
// // // //               </AnimatePresence>
// // // //             </div>

// // // //             {filteredNotifications.length === 0 && (
// // // //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
// // // //                 <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
// // // //                 <h3 className="text-lg font-medium text-gray-500 mb-2">Aucune notification</h3>
// // // //                 <p className="text-gray-400">Toutes les notifications ont été traitées</p>
// // // //               </motion.div>
// // // //             )}
// // // //           </CardContent>
// // // //         </Card>
// // // //       </motion.div>

// // // //       {/* Delete Confirmation Modal */}
// // // //       <ConfirmDeleteModal
// // // //         isOpen={deleteModal.isOpen}
// // // //         onClose={() => setDeleteModal({ isOpen: false, notification: null })}
// // // //         onConfirm={confirmDelete}
// // // //         title={deleteModal.notification?.title || ""}
// // // //       />

// // // //       {/* Notification Details Modal */}
// // // //       <NotificationDetailsModal
// // // //         isOpen={detailsModal.isOpen}
// // // //         onClose={() => setDetailsModal({ isOpen: false, notification: null })}
// // // //         notification={detailsModal.notification}
// // // //       />
// // // //     </motion.div>
// // // //   )
// // // // }
// // // "use client"

// // // import { useState } from "react"
// // // import { motion, AnimatePresence } from "framer-motion"
// // // import { Button } from "@/components/ui/button"
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Bell, Eye, Trash2, Filter, Calendar, User, AlertTriangle } from "lucide-react"
// // // import { useDeleteNotificationMutation, useMarkAllAsReadMutation, useMarkAsReadMutation, useNotificationsQuery } from "@/hooks/notifications/use-notification-queries"


// // // interface Notification {
// // //   id: string
// // //   message: string
// // //   type: "info" | "success" | "warning" | "error"
// // //   isRead: boolean
// // //   userId: string
// // //   createdAt: string
// // // }

// // // interface ConfirmDeleteModalProps {
// // //   isOpen: boolean
// // //   onClose: () => void
// // //   onConfirm: () => void
// // //   title: string
// // // }

// // // function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title }: ConfirmDeleteModalProps) {
// // //   return (
// // //     <Dialog open={isOpen} onOpenChange={onClose}>
// // //       <DialogContent className="sm:max-w-md">
// // //         <motion.div
// // //           initial={{ opacity: 0, scale: 0.95 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //           exit={{ opacity: 0, scale: 0.95 }}
// // //           transition={{ duration: 0.2 }}
// // //         >
// // //           <DialogHeader className="text-center">
// // //             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// // //               <AlertTriangle className="w-8 h-8 text-red-600" />
// // //             </div>
// // //             <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">Confirmer la suppression</DialogTitle>
// // //             <p className="text-gray-600 mb-6">
// // //               Êtes-vous sûr de vouloir supprimer cette notification ?
// // //               <br />
// // //               <span className="font-medium">"{title}"</span>
// // //             </p>
// // //           </DialogHeader>
// // //           <div className="flex gap-3">
// // //             <Button
// // //               variant="outline"
// // //               onClick={onClose}
// // //               className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
// // //             >
// // //               Annuler
// // //             </Button>
// // //             <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
// // //               Supprimer
// // //             </Button>
// // //           </div>
// // //         </motion.div>
// // //       </DialogContent>
// // //     </Dialog>
// // //   )
// // // }

// // // interface NotificationDetailsModalProps {
// // //   isOpen: boolean
// // //   onClose: () => void
// // //   notification: Notification | null
// // // }

// // // function NotificationDetailsModal({ isOpen, onClose, notification }: NotificationDetailsModalProps) {
// // //   if (!notification) return null

// // //   return (
// // //     <Dialog open={isOpen} onOpenChange={onClose}>
// // //       <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
// // //         <motion.div
// // //           initial={{ opacity: 0, scale: 0.95 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //           exit={{ opacity: 0, scale: 0.95 }}
// // //           transition={{ duration: 0.2 }}
// // //         >
// // //           <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white -m-6 mb-6 p-6 rounded-t-lg">
// // //             <DialogTitle className="text-lg">Détails de la notification</DialogTitle>
// // //             <div className="flex items-center gap-2 mt-2">
// // //               <Badge variant="outline" className="bg-white/20 text-white border-white/30">
// // //                 {notification.type}
// // //               </Badge>
// // //             </div>
// // //           </DialogHeader>

// // //           <div className="space-y-6">
// // //             <div>
// // //               <h3 className="font-semibold text-gray-900 mb-2">{notification.message}</h3>
// // //               <div className="text-sm text-gray-500">
// // //                 {new Date(notification.createdAt).toLocaleDateString("fr-FR")} à{" "}
// // //                 {new Date(notification.createdAt).toLocaleTimeString("fr-FR")}
// // //               </div>
// // //             </div>
// // //           </div>

// // //           <div className="flex gap-3 mt-8">
// // //             <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
// // //               Fermer
// // //             </Button>
// // //           </div>
// // //         </motion.div>
// // //       </DialogContent>
// // //     </Dialog>
// // //   )
// // // }

// // // export default function NotificationCenter() {
// // //   const [filterType, setFilterType] = useState("all")
// // //   const [filterDate, setFilterDate] = useState("all")
// // //   const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; notification: any }>({
// // //     isOpen: false,
// // //     notification: null,
// // //   })
// // //   const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; notification: any }>({
// // //     isOpen: false,
// // //     notification: null,
// // //   })

// // //   const { data: notificationsData, isLoading } = useNotificationsQuery()
// // //   const markAsReadMutation = useMarkAsReadMutation()
// // //   const markAllAsReadMutation = useMarkAllAsReadMutation()
// // //   const deleteNotificationMutation = useDeleteNotificationMutation()

// // //   const notifications = notificationsData?.data || []

// // //   const markAsRead = async (id: string) => {
// // //     try {
// // //       await markAsReadMutation.mutateAsync(id)
// // //     } catch (error) {
// // //       console.error("Error marking notification as read:", error)
// // //     }
// // //   }

// // //   const openDeleteModal = (notification: any) => {
// // //     setDeleteModal({ isOpen: true, notification })
// // //   }

// // //   const confirmDelete = async () => {
// // //     if (deleteModal.notification) {
// // //       try {
// // //         await deleteNotificationMutation.mutateAsync(deleteModal.notification.id)
// // //       } catch (error) {
// // //         console.error("Error deleting notification:", error)
// // //       }
// // //     }
// // //     setDeleteModal({ isOpen: false, notification: null })
// // //   }

// // //   const openDetailsModal = (notification: any) => {
// // //     setDetailsModal({ isOpen: true, notification })
// // //     markAsRead(notification.id)
// // //   }

// // //   const markAllAsRead = async () => {
// // //     try {
// // //       await markAllAsReadMutation.mutateAsync()
// // //     } catch (error) {
// // //       console.error("Error marking all notifications as read:", error)
// // //     }
// // //   }

// // //   const filteredNotifications = notifications.filter((notif) => {
// // //     if (filterType !== "all" && notif.type !== filterType) return false
// // //     return true
// // //   })

// // //   const getStatusColor = (isRead: boolean) => {
// // //     return isRead ? "bg-gray-400" : "bg-blue-500"
// // //   }

// // //   const getTypeColor = (type: string) => {
// // //     switch (type) {
// // //       case "error":
// // //         return "border-l-red-500"
// // //       case "warning":
// // //         return "border-l-yellow-500"
// // //       case "success":
// // //         return "border-l-green-500"
// // //       case "info":
// // //       default:
// // //         return "border-l-blue-500"
// // //     }
// // //   }

// // //   const containerVariants = {
// // //     hidden: { opacity: 0, y: 20 },
// // //     visible: {
// // //       opacity: 1,
// // //       y: 0,
// // //       transition: {
// // //         duration: 0.6,
// // //         staggerChildren: 0.1,
// // //       },
// // //     },
// // //   }

// // //   const itemVariants = {
// // //     hidden: { opacity: 0, y: 20 },
// // //     visible: {
// // //       opacity: 1,
// // //       y: 0,
// // //       transition: { duration: 0.5 },
// // //     },
// // //   }

// // //   if (isLoading) {
// // //     return (
// // //       <div className="flex items-center justify-center h-64">
// // //         <div className="text-lg">Chargement des notifications...</div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
// // //       <motion.div variants={itemVariants}>
// // //         <Card className=" border-0 bg-white/80 backdrop-blur-sm">
// // //           <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
// // //             <div className="flex items-center justify-between">
// // //               <CardTitle className="flex items-center gap-2 text-blue-700">
// // //                 <Bell className="w-5 h-5" />
// // //                 Centre de Notifications
// // //               </CardTitle>
// // //               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
// // //                 <Button
// // //                   onClick={markAllAsRead}
// // //                   className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
// // //                 >
// // //                   Marquer tout comme lu
// // //                 </Button>
// // //               </motion.div>
// // //             </div>
// // //           </CardHeader>
// // //           <CardContent className="p-6">
// // //             {/* Filters */}
// // //             <div className="flex flex-wrap gap-4 mb-6">
// // //               <div className="flex items-center gap-2">
// // //                 <Filter className="w-4 h-4 text-gray-500" />
// // //                 <Select value={filterType} onValueChange={setFilterType}>
// // //                   <SelectTrigger className="w-48">
// // //                     <SelectValue placeholder="Filtrer par type" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     <SelectItem value="all">Tous les types</SelectItem>
// // //                     <SelectItem value="info">Info</SelectItem>
// // //                     <SelectItem value="success">Succès</SelectItem>
// // //                     <SelectItem value="warning">Avertissement</SelectItem>
// // //                     <SelectItem value="error">Erreur</SelectItem>
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>
// // //               <div className="flex items-center gap-2">
// // //                 <Calendar className="w-4 h-4 text-gray-500" />
// // //                 <Select value={filterDate} onValueChange={setFilterDate}>
// // //                   <SelectTrigger className="w-48">
// // //                     <SelectValue placeholder="Filtrer par date" />
// // //                   </SelectTrigger>
// // //                   <SelectContent>
// // //                     <SelectItem value="all">Toutes les dates</SelectItem>
// // //                     <SelectItem value="today">Aujourd'hui</SelectItem>
// // //                     <SelectItem value="week">Cette semaine</SelectItem>
// // //                     <SelectItem value="month">Ce mois</SelectItem>
// // //                   </SelectContent>
// // //                 </Select>
// // //               </div>
// // //             </div>

// // //             {/* Notifications List */}
// // //             <div className="space-y-4">
// // //               <AnimatePresence>
// // //                 {filteredNotifications.map((notification, index) => (
// // //                   <motion.div
// // //                     key={notification.id}
// // //                     initial={{ opacity: 0, x: -20 }}
// // //                     animate={{ opacity: 1, x: 0 }}
// // //                     exit={{ opacity: 0, x: 20 }}
// // //                     transition={{ duration: 0.3, delay: index * 0.1 }}
// // //                     className={`bg-white rounded-lg border-l-4 ${getTypeColor(notification.type)} shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer`}
// // //                     onClick={() => openDetailsModal(notification)}
// // //                   >
// // //                     <div className="flex items-start justify-between">
// // //                       <div className="flex items-start gap-4 flex-1">
// // //                         <div className="flex-shrink-0">
// // //                           <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
// // //                             <User className="w-6 h-6 text-gray-500" />
// // //                           </div>
// // //                         </div>
// // //                         <div className="flex-1 min-w-0">
// // //                           <div className="flex items-center gap-2 mb-1">
// // //                             <Badge variant="outline" className="text-xs">
// // //                               {notification.type}
// // //                             </Badge>
// // //                             <div className={`w-2 h-2 rounded-full ${getStatusColor(notification.isRead)}`} />
// // //                           </div>
// // //                           <h4 className="font-medium text-gray-900 mb-1">{notification.message}</h4>
// // //                           <div className="text-xs text-gray-500">
// // //                             {new Date(notification.createdAt).toLocaleDateString("fr-FR")} -{" "}
// // //                             {new Date(notification.createdAt).toLocaleTimeString("fr-FR")}
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                       <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
// // //                         <motion.button
// // //                           whileHover={{ scale: 1.1 }}
// // //                           whileTap={{ scale: 0.9 }}
// // //                           onClick={() => openDetailsModal(notification)}
// // //                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// // //                           title="Voir les détails"
// // //                         >
// // //                           <Eye className="w-4 h-4" />
// // //                         </motion.button>
// // //                         <motion.button
// // //                           whileHover={{ scale: 1.1 }}
// // //                           whileTap={{ scale: 0.9 }}
// // //                           onClick={() => openDeleteModal(notification)}
// // //                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// // //                           title="Supprimer"
// // //                         >
// // //                           <Trash2 className="w-4 h-4" />
// // //                         </motion.button>
// // //                       </div>
// // //                     </div>
// // //                   </motion.div>
// // //                 ))}
// // //               </AnimatePresence>
// // //             </div>

// // //             {filteredNotifications.length === 0 && (
// // //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
// // //                 <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
// // //                 <h3 className="text-lg font-medium text-gray-500 mb-2">Aucune notification</h3>
// // //                 <p className="text-gray-400">Toutes les notifications ont été traitées</p>
// // //               </motion.div>
// // //             )}
// // //           </CardContent>
// // //         </Card>
// // //       </motion.div>

// // //       {/* Delete Confirmation Modal */}
// // //       <ConfirmDeleteModal
// // //         isOpen={deleteModal.isOpen}
// // //         onClose={() => setDeleteModal({ isOpen: false, notification: null })}
// // //         onConfirm={confirmDelete}
// // //         title={deleteModal.notification?.message || ""}
// // //       />

// // //       {/* Notification Details Modal */}
// // //       <NotificationDetailsModal
// // //         isOpen={detailsModal.isOpen}
// // //         onClose={() => setDetailsModal({ isOpen: false, notification: null })}
// // //         notification={detailsModal.notification}
// // //       />
// // //     </motion.div>
// // //   )
// // // }



















// // "use client"

// // import { useState } from "react"
// // import { motion, AnimatePresence } from "framer-motion"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// // import { Badge } from "@/components/ui/badge"
// // import { Bell, Eye, Trash2, Filter, Calendar, User, AlertTriangle, Check } from "lucide-react"
// // import { useDeleteNotificationMutation, useMarkAllAsReadMutation, useMarkAsReadMutation, useNotificationsQuery } from "@/hooks/notifications/use-notification-queries"
// // import { toast } from "sonner"


// // interface Notification {
// //   id: string
// //   message: string
// //   type: "info" | "success" | "warning" | "error"
// //   isRead: boolean
// //   userId: string
// //   createdAt: string
// // }

// // interface ConfirmDeleteModalProps {
// //   isOpen: boolean
// //   onClose: () => void
// //   onConfirm: () => void
// //   title: string
// // }

// // function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title }: ConfirmDeleteModalProps) {
// //   return (
// //     <Dialog open={isOpen} onOpenChange={onClose}>
// //       <DialogContent className="sm:max-w-md">
// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.95 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           exit={{ opacity: 0, scale: 0.95 }}
// //           transition={{ duration: 0.2 }}
// //         >
// //           <DialogHeader className="text-center">
// //             <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <AlertTriangle className="w-8 h-8 text-red-600" />
// //             </div>
// //             <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">Confirmer la suppression</DialogTitle>
// //             <p className="text-gray-600 mb-6">
// //               Êtes-vous sûr de vouloir supprimer cette notification ?
// //               <br />
// //               <span className="font-medium">"{title}"</span>
// //             </p>
// //           </DialogHeader>
// //           <div className="flex gap-3">
// //             <Button
// //               variant="outline"
// //               onClick={onClose}
// //               className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
// //             >
// //               Annuler
// //             </Button>
// //             <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
// //               Supprimer
// //             </Button>
// //           </div>
// //         </motion.div>
// //       </DialogContent>
// //     </Dialog>
// //   )
// // }

// // interface NotificationDetailsModalProps {
// //   isOpen: boolean
// //   onClose: () => void
// //   notification: Notification | null
// // }

// // function NotificationDetailsModal({ isOpen, onClose, notification }: NotificationDetailsModalProps) {
// //   if (!notification) return null

// //   return (
// //     <Dialog open={isOpen} onOpenChange={onClose}>
// //       <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
// //         <motion.div
// //           initial={{ opacity: 0, scale: 0.95 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           exit={{ opacity: 0, scale: 0.95 }}
// //           transition={{ duration: 0.2 }}
// //         >
// //           <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white -m-6 mb-6 p-6 rounded-t-lg">
// //             <DialogTitle className="text-lg">Détails de la notification</DialogTitle>
// //             <div className="flex items-center gap-2 mt-2">
// //               <Badge variant="outline" className="bg-white/20 text-white border-white/30">
// //                 {notification.type}
// //               </Badge>
// //             </div>
// //           </DialogHeader>

// //           <div className="space-y-6">
// //             <div>
// //               <h3 className="font-semibold text-gray-900 mb-2">{notification.message}</h3>
// //               <div className="text-sm text-gray-500">
// //                 {new Date(notification.createdAt).toLocaleDateString("fr-FR")} à{" "}
// //                 {new Date(notification.createdAt).toLocaleTimeString("fr-FR")}
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex gap-3 mt-8">
// //             <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
// //               Fermer
// //             </Button>
// //           </div>
// //         </motion.div>
// //       </DialogContent>
// //     </Dialog>
// //   )
// // }

// // export default function NotificationCenter() {
// //   const [filterType, setFilterType] = useState("all")
// //   const [filterDate, setFilterDate] = useState("all")
// //   const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; notification: any }>({
// //     isOpen: false,
// //     notification: null,
// //   })
// //   const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; notification: any }>({
// //     isOpen: false,
// //     notification: null,
// //   })

// //   const { data: notificationsData, isLoading } = useNotificationsQuery()
// //   const markAsReadMutation = useMarkAsReadMutation()
// //   const markAllAsReadMutation = useMarkAllAsReadMutation()
// //   const deleteNotificationMutation = useDeleteNotificationMutation()

// //   const notifications = notificationsData?.data || []

// //   const markAsRead = async (id: string) => {
// //     try {
// //       await markAsReadMutation.mutateAsync(id)
// //       toast.success("Notification marquée comme lue")
// //     } catch (error) {
// //       console.error("Error marking notification as read:", error)
// //       toast.error("Erreur lors du marquage de la notification")
// //     }
// //   }

// //   const openDeleteModal = (notification: any) => {
// //     setDeleteModal({ isOpen: true, notification })
// //   }

// //   const confirmDelete = async () => {
// //     if (deleteModal.notification) {
// //       try {
// //         await deleteNotificationMutation.mutateAsync(deleteModal.notification.id)
// //          toast.success("Notification supprimée avec succès")
// //       } catch (error) {
// //         console.error("Error deleting notification:", error)
// //         toast.error("Erreur lors de la suppression")
// //       }
// //     }
// //     setDeleteModal({ isOpen: false, notification: null })
// //   }

// //   const openDetailsModal = (notification: any) => {
// //     setDetailsModal({ isOpen: true, notification })
// //     markAsRead(notification.id)
// //   }

// //   const markAllAsRead = async () => {
// //     try {
// //       await markAllAsReadMutation.mutateAsync()
// //        toast.success("Toutes les notifications marquées comme lues")
// //     } catch (error) {
// //       console.error("Error marking all notifications as read:", error)
// //       toast.error("Erreur lors du marquage des notifications")
// //     }
// //   }

// //   const filteredNotifications = notifications.filter((notif) => {
// //     if (filterType !== "all" && notif.type !== filterType) return false
// //     return true
// //   })

// //   const getStatusColor = (isRead: boolean) => {
// //     return isRead ? "bg-gray-400" : "bg-blue-500"
// //   }

// //   const getTypeColor = (type: string) => {
// //     switch (type) {
// //       case "error":
// //         return "border-l-red-500"
// //       case "warning":
// //         return "border-l-yellow-500"
// //       case "success":
// //         return "border-l-green-500"
// //       case "info":
// //       default:
// //         return "border-l-blue-500"
// //     }
// //   }

// //   const containerVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: {
// //         duration: 0.6,
// //         staggerChildren: 0.1,
// //       },
// //     },
// //   }

// //   const itemVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: {
// //       opacity: 1,
// //       y: 0,
// //       transition: { duration: 0.5 },
// //     },
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="flex items-center justify-center h-64">
// //         <div className="text-lg">Chargement des notifications...</div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
// //       <motion.div variants={itemVariants}>
// //         <Card className=" border-0 bg-white/80 backdrop-blur-sm">
// //           <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
// //             <div className="flex items-center justify-between">
// //               <CardTitle className="flex items-center gap-2 text-blue-700">
// //                 <Bell className="w-5 h-5" />
// //                 Centre de Notifications
// //               </CardTitle>
// //               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
// //                 <Button
// //                   onClick={markAllAsRead}
// //                   className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
// //                 >
// //                   Marquer tout comme lu
// //                 </Button>
// //               </motion.div>
// //             </div>
// //           </CardHeader>
// //           <CardContent className="p-6">
// //             {/* Filters */}
// //             <div className="flex flex-wrap gap-4 mb-6">
// //               <div className="flex items-center gap-2">
// //                 <Filter className="w-4 h-4 text-gray-500" />
// //                 <Select value={filterType} onValueChange={setFilterType}>
// //                   <SelectTrigger className="w-48">
// //                     <SelectValue placeholder="Filtrer par type" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     <SelectItem value="all">Tous les types</SelectItem>
// //                     <SelectItem value="info">Info</SelectItem>
// //                     <SelectItem value="success">Succès</SelectItem>
// //                     <SelectItem value="warning">Avertissement</SelectItem>
// //                     <SelectItem value="error">Erreur</SelectItem>
// //                   </SelectContent>
// //                 </Select>
// //               </div>
// //               <div className="flex items-center gap-2">
// //                 <Calendar className="w-4 h-4 text-gray-500" />
// //                 <Select value={filterDate} onValueChange={setFilterDate}>
// //                   <SelectTrigger className="w-48">
// //                     <SelectValue placeholder="Filtrer par date" />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     <SelectItem value="all">Toutes les dates</SelectItem>
// //                     <SelectItem value="today">Aujourd'hui</SelectItem>
// //                     <SelectItem value="week">Cette semaine</SelectItem>
// //                     <SelectItem value="month">Ce mois</SelectItem>
// //                   </SelectContent>
// //                 </Select>
// //               </div>
// //             </div>

// //             {/* Notifications List */}
// //             <div className="space-y-4">
// //               <AnimatePresence>
// //                 {filteredNotifications.map((notification, index) => (
// //                   <motion.div
// //                     key={notification.id}
// //                     initial={{ opacity: 0, x: -20 }}
// //                     animate={{ opacity: 1, x: 0 }}
// //                     exit={{ opacity: 0, x: 20 }}
// //                     transition={{ duration: 0.3, delay: index * 0.1 }}
// //                     className={`bg-white rounded-lg border-l-4 ${getTypeColor(notification.type)} shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer`}
// //                     onClick={() => openDetailsModal(notification)}
// //                   >
// //                     <div className="flex items-start justify-between">
// //                       <div className="flex items-start gap-4 flex-1">
// //                         <div className="flex-shrink-0">
// //                           <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
// //                             <User className="w-6 h-6 text-gray-500" />
// //                           </div>
// //                         </div>
// //                         <div className="flex-1 min-w-0">
// //                           <div className="flex items-center gap-2 mb-1">
// //                             <Badge variant="outline" className="text-xs">
// //                               {notification.type}
// //                             </Badge>
// //                             <div className={`w-2 h-2 rounded-full ${getStatusColor(notification.isRead)}`} />
// //                           </div>
// //                           <h4 className="font-medium text-gray-900 mb-1">{notification.message}</h4>
// //                           <div className="text-xs text-gray-500">
// //                             {new Date(notification.createdAt).toLocaleDateString("fr-FR")} -{" "}
// //                             {new Date(notification.createdAt).toLocaleTimeString("fr-FR")}
// //                           </div>
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
// //                         {!notification.isRead && (
// //                           <motion.button
// //                             whileHover={{ scale: 1.1 }}
// //                             whileTap={{ scale: 0.9 }}
// //                             onClick={() => markAsRead(notification.id)}
// //                             className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
// //                             title="Marquer comme lu"
// //                           >
// //                             <Check className="w-4 h-4" />
// //                           </motion.button>
// //                         )}
// //                         <motion.button
// //                           whileHover={{ scale: 1.1 }}
// //                           whileTap={{ scale: 0.9 }}
// //                           onClick={() => openDetailsModal(notification)}
// //                           className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
// //                           title="Voir les détails"
// //                         >
// //                           <Eye className="w-4 h-4" />
// //                         </motion.button>
// //                         <motion.button
// //                           whileHover={{ scale: 1.1 }}
// //                           whileTap={{ scale: 0.9 }}
// //                           onClick={() => openDeleteModal(notification)}
// //                           className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
// //                           title="Supprimer"
// //                         >
// //                           <Trash2 className="w-4 h-4" />
// //                         </motion.button>
// //                       </div>
// //                     </div>
// //                   </motion.div>
// //                 ))}
// //               </AnimatePresence>
// //             </div>

// //             {filteredNotifications.length === 0 && (
// //               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
// //                 <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
// //                 <h3 className="text-lg font-medium text-gray-500 mb-2">Aucune notification</h3>
// //                 <p className="text-gray-400">Toutes les notifications ont été traitées</p>
// //               </motion.div>
// //             )}
// //           </CardContent>
// //         </Card>
// //       </motion.div>

// //       {/* Delete Confirmation Modal */}
// //       <ConfirmDeleteModal
// //         isOpen={deleteModal.isOpen}
// //         onClose={() => setDeleteModal({ isOpen: false, notification: null })}
// //         onConfirm={confirmDelete}
// //         title={deleteModal.notification?.message || ""}
// //       />

// //       {/* Notification Details Modal */}
// //       <NotificationDetailsModal
// //         isOpen={detailsModal.isOpen}
// //         onClose={() => setDetailsModal({ isOpen: false, notification: null })}
// //         notification={detailsModal.notification}
// //       />
// //     </motion.div>
// //   )
// // }




















// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { Bell, Eye, Trash2, Filter, Calendar, User, AlertTriangle, Check, Sparkles } from "lucide-react"
// import {
//   useDeleteNotificationMutation,
//   useMarkAllAsReadMutation,
//   useMarkAsReadMutation,
//   useNotificationsQuery,
// } from "@/hooks/notifications/use-notification-queries"
// import { toast } from "sonner"

// interface Notification {
//   id: string
//   message: string
//   type: "info" | "success" | "warning" | "error"
//   isRead: boolean
//   userId: string
//   createdAt: string
// }

// interface ConfirmDeleteModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onConfirm: () => void
//   title: string
// }

// function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title }: ConfirmDeleteModalProps) {
//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md glass-effect border-0 shadow-2xl">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.9, y: 20 }}
//           transition={{ duration: 0.3, type: "spring" }}
//         >
//           <DialogHeader className="text-center">
//             <motion.div
//               initial={{ scale: 0 }}
//               animate={{ scale: 1 }}
//               transition={{ delay: 0.2, type: "spring" }}
//               className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
//             >
//               <AlertTriangle className="w-10 h-10 text-red-600" />
//             </motion.div>
//             <DialogTitle className="text-xl font-bold text-foreground mb-2">Confirmer la suppression</DialogTitle>
//             <p className="text-muted-foreground mb-6 leading-relaxed">
//               Êtes-vous sûr de vouloir supprimer cette notification ?
//               <br />
//               <span className="font-semibold text-foreground">"{title}"</span>
//             </p>
//           </DialogHeader>
//           <div className="flex gap-3">
//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
//               <Button
//                 variant="outline"
//                 onClick={onClose}
//                 className="w-full border-border text-muted-foreground hover:bg-muted transition-smooth bg-transparent"
//               >
//                 Annuler
//               </Button>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
//               <Button
//                 onClick={onConfirm}
//                 className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
//               >
//                 Supprimer
//               </Button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// interface NotificationDetailsModalProps {
//   isOpen: boolean
//   onClose: () => void
//   notification: Notification | null
// }

// function NotificationDetailsModal({ isOpen, onClose, notification }: NotificationDetailsModalProps) {
//   if (!notification) return null

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto glass-effect border-0 shadow-2xl">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.9, y: 20 }}
//           transition={{ duration: 0.3, type: "spring" }}
//         >
//           <DialogHeader className="gradient-primary text-white -m-6 mb-6 p-6 rounded-t-xl shadow-lg">
//             <DialogTitle className="text-xl font-bold">Détails de la notification</DialogTitle>
//             <div className="flex items-center gap-2 mt-2">
//               <Badge variant="outline" className="bg-white/20 text-white border-white/30 shadow-md">
//                 {notification.type}
//               </Badge>
//             </div>
//           </DialogHeader>

//           <div className="space-y-6">
//             <div className="p-4 bg-gradient-to-r from-card to-muted/50 rounded-xl">
//               <h3 className="font-bold text-foreground mb-3 text-lg">{notification.message}</h3>
//               <div className="text-sm text-muted-foreground flex items-center gap-2">
//                 <Calendar className="w-4 h-4" />
//                 {new Date(notification.createdAt).toLocaleDateString("fr-FR")} à{" "}
//                 {new Date(notification.createdAt).toLocaleTimeString("fr-FR")}
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-3 mt-8">
//             <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
//               <Button variant="outline" onClick={onClose} className="w-full transition-smooth bg-transparent">
//                 Fermer
//               </Button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default function NotificationCenter() {
//   const [filterType, setFilterType] = useState("all")
//   const [filterDate, setFilterDate] = useState("all")
//   const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; notification: any }>({
//     isOpen: false,
//     notification: null,
//   })
//   const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; notification: any }>({
//     isOpen: false,
//     notification: null,
//   })

//   const { data: notificationsData, isLoading } = useNotificationsQuery()
//   const markAsReadMutation = useMarkAsReadMutation()
//   const markAllAsReadMutation = useMarkAllAsReadMutation()
//   const deleteNotificationMutation = useDeleteNotificationMutation()

//   const notifications = notificationsData?.data || []

//   const markAsRead = async (id: string) => {
//     try {
//       await markAsReadMutation.mutateAsync(id)
//       toast.success("Notification marquée comme lue")
//     } catch (error) {
//       console.error("Error marking notification as read:", error)
//       toast.error("Erreur lors du marquage de la notification")
//     }
//   }

//   const openDeleteModal = (notification: any) => {
//     setDeleteModal({ isOpen: true, notification })
//   }

//   const confirmDelete = async () => {
//     if (deleteModal.notification) {
//       try {
//         await deleteNotificationMutation.mutateAsync(deleteModal.notification.id)
//         toast.success("Notification supprimée avec succès")
//       } catch (error) {
//         console.error("Error deleting notification:", error)
//         toast.error("Erreur lors de la suppression")
//       }
//     }
//     setDeleteModal({ isOpen: false, notification: null })
//   }

//   const openDetailsModal = (notification: any) => {
//     setDetailsModal({ isOpen: true, notification })
//     markAsRead(notification.id)
//   }

//   const markAllAsRead = async () => {
//     try {
//       await markAllAsReadMutation.mutateAsync()
//       toast.success("Toutes les notifications marquées comme lues")
//     } catch (error) {
//       console.error("Error marking all notifications as read:", error)
//       toast.error("Erreur lors du marquage des notifications")
//     }
//   }

//   const filteredNotifications = notifications.filter((notif) => {
//     if (filterType !== "all" && notif.type !== filterType) return false
//     return true
//   })

//   const getStatusColor = (isRead: boolean) => {
//     return isRead ? "bg-muted-foreground" : "bg-gradient-to-r from-primary to-secondary"
//   }

//   const getTypeColor = (type: string) => {
//     const colors = {
//       error: "border-l-red-500 bg-gradient-to-r from-red-50 to-red-100/50",
//       warning: "border-l-amber-500 bg-gradient-to-r from-amber-50 to-amber-100/50",
//       success: "border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-100/50",
//       info: "border-l-blue-500 bg-gradient-to-r from-blue-50 to-blue-100/50",
//     }
//     return colors[type as keyof typeof colors] || "border-l-primary bg-gradient-to-r from-card to-muted/50"
//   }

//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.6,
//         staggerChildren: 0.1,
//       },
//     },
//   }

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.5 },
//     },
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
//         />
//       </div>
//     )
//   }

//   return (
//     <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8 md:p-4">
//       <motion.div variants={itemVariants}>
//         <Card className="glass-effect border shadow-none overflow-hidden">
//           <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-b border-gray-200 relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
//             <div className="flex items-center justify-between relative">
//               <div className="flex items-center gap-3">
//                 <motion.div
//                   animate={{ rotate: [0, 10, -10, 0] }}
//                   transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg"
//                 >
//                   <Bell className="w-6 h-6 text-white" />
//                 </motion.div>
//                 <div>
//                   <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
//                     Centre de Notifications
//                   </CardTitle>
//                   <p className="text-muted-foreground mt-1">Gérez toutes vos notifications</p>
//                 </div>
//               </div>
//               <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//                 <Button
//                   onClick={markAllAsRead}
//                   className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-smooth font-medium"
//                 >
//                   <Check className="w-4 h-4 mr-2" />
//                   Marquer tout comme lu
//                 </Button>
//               </motion.div>
//             </div>
//           </CardHeader>
//           <CardContent className="p-8">
//             <div className="flex flex-wrap gap-6 mb-8 p-4 bg-gradient-to-r from-card to-muted/50 rounded-xl border border-gray-200">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
//                   <Filter className="w-4 h-4 text-primary" />
//                 </div>
//                 <Select value={filterType} onValueChange={setFilterType}>
//                   <SelectTrigger className="w-48 shadow-md border-gray-200 hover:border-primary/50 transition-smooth">
//                     <SelectValue placeholder="Filtrer par type" />
//                   </SelectTrigger>
//                   <SelectContent className="glass-effect border-0 shadow-xl">
//                     <SelectItem value="all">Tous les types</SelectItem>
//                     <SelectItem value="info">Info</SelectItem>
//                     <SelectItem value="success">Succès</SelectItem>
//                     <SelectItem value="warning">Avertissement</SelectItem>
//                     <SelectItem value="error">Erreur</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
//                   <Calendar className="w-4 h-4 text-primary" />
//                 </div>
//                 <Select value={filterDate} onValueChange={setFilterDate}>
//                   <SelectTrigger className="w-48 shadow-md border-border/50 hover:border-primary/50 transition-smooth">
//                     <SelectValue placeholder="Filtrer par date" />
//                   </SelectTrigger>
//                   <SelectContent className="glass-effect border-0 shadow-xl">
//                     <SelectItem value="all">Toutes les dates</SelectItem>
//                     <SelectItem value="today">Aujourd'hui</SelectItem>
//                     <SelectItem value="week">Cette semaine</SelectItem>
//                     <SelectItem value="month">Ce mois</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="space-y-4">
//               <AnimatePresence>
//                 {filteredNotifications.map((notification, index) => (
//                   <motion.div
//                     key={notification.id}
//                     initial={{ opacity: 0, x: -20, scale: 0.95 }}
//                     animate={{ opacity: 1, x: 0, scale: 1 }}
//                     exit={{ opacity: 0, x: 20, scale: 0.95 }}
//                     transition={{ duration: 0.3, delay: index * 0.05, type: "spring" }}
//                     whileHover={{ scale: 1.02, x: 4 }}
//                     className={`rounded-xl border-l-4 shadow-lg hover:shadow-xl transition-smooth p-6 cursor-pointer group ${getTypeColor(notification.type)}`}
//                     onClick={() => openDetailsModal(notification)}
//                   >
//                     <div className="flex items-start justify-between">
//                       <div className="flex items-start gap-4 flex-1">
//                         <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex-shrink-0">
//                           <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-smooth">
//                             <User className="w-7 h-7 text-primary" />
//                           </div>
//                         </motion.div>
//                         <div className="flex-1 min-w-0">
//                           <div className="flex items-center gap-3 mb-2">
//                             <Badge variant="outline" className="text-xs font-medium shadow-sm bg-white/80">
//                               {notification.type}
//                             </Badge>
//                             <motion.div
//                               animate={!notification.isRead ? { scale: [1, 1.2, 1] } : {}}
//                               transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                               className={`w-3 h-3 rounded-full shadow-sm ${getStatusColor(notification.isRead)}`}
//                             />
//                           </div>
//                           <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth leading-relaxed">
//                             {notification.message}
//                           </h4>
//                           <div className="text-sm text-muted-foreground flex items-center gap-2">
//                             <Calendar className="w-4 h-4" />
//                             {new Date(notification.createdAt).toLocaleDateString("fr-FR")} -{" "}
//                             {new Date(notification.createdAt).toLocaleTimeString("fr-FR")}
//                           </div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
//                         {!notification.isRead && (
//                           <motion.button
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                             onClick={() => markAsRead(notification.id)}
//                             className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-smooth shadow-md hover:shadow-lg"
//                             title="Marquer comme lu"
//                           >
//                             <Check className="w-5 h-5" />
//                           </motion.button>
//                         )}
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => openDetailsModal(notification)}
//                           className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-smooth shadow-md hover:shadow-lg"
//                           title="Voir les détails"
//                         >
//                           <Eye className="w-5 h-5" />
//                         </motion.button>
//                         <motion.button
//                           whileHover={{ scale: 1.1 }}
//                           whileTap={{ scale: 0.9 }}
//                           onClick={() => openDeleteModal(notification)}
//                           className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-smooth shadow-md hover:shadow-lg"
//                           title="Supprimer"
//                         >
//                           <Trash2 className="w-5 h-5" />
//                         </motion.button>
//                       </div>
//                     </div>
//                   </motion.div>
//                 ))}
//               </AnimatePresence>
//             </div>

//             {filteredNotifications.length === 0 && (
//               <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 className="text-center py-16"
//               >
//                 <motion.div
//                   animate={{ y: [0, -10, 0] }}
//                   transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   className="relative mb-6"
//                 >
//                   <Bell className="w-20 h-20 mx-auto text-muted-foreground/30" />
//                   <motion.div
//                     animate={{ rotate: [0, 10, -10, 0] }}
//                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                     className="absolute -top-2 -right-2"
//                   >
//                     <Sparkles className="w-8 h-8 text-primary/50" />
//                   </motion.div>
//                 </motion.div>
//                 <h3 className="text-xl font-bold text-muted-foreground mb-2">Aucune notification</h3>
//                 <p className="text-muted-foreground">Toutes les notifications ont été traitées</p>
//               </motion.div>
//             )}
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Modals remain the same but with enhanced styling */}
//       <ConfirmDeleteModal
//         isOpen={deleteModal.isOpen}
//         onClose={() => setDeleteModal({ isOpen: false, notification: null })}
//         onConfirm={confirmDelete}
//         title={deleteModal.notification?.message || ""}
//       />

//       <NotificationDetailsModal
//         isOpen={detailsModal.isOpen}
//         onClose={() => setDetailsModal({ isOpen: false, notification: null })}
//         notification={detailsModal.notification}
//       />
//     </motion.div>
//   )
// }




"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Eye,
  Trash2,
  Filter,
  Calendar,
  User,
  AlertTriangle,
  Check,
  Sparkles,
  Search,
  Download,
  Archive,
  Clock,
  Phone,
  Mail,
  Building,
  UserCheck,
  FileText,
  University as Priority,
  TrendingUp,
  Star,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Info,
  Zap,
  Users,
  Target,
} from "lucide-react"
import {
  useDeleteNotificationMutation,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
  useNotificationsQuery,
} from "@/hooks/notifications/use-notification-queries"
import { toast } from "sonner"

interface ServiceRequest {
  id: string
  type: string
  etat: string
  nom: string
  prenom: string
  email: string
  telephone: string
  demande: {
    nom: string
    email: string
    prenom: string
    subject: string
    telephone: string
    nationalId: string
    profession: string
    institution: string
    meetingType: string
    meetingTarget: string
    preferredSlot1: string
    preferredSlot2: string
    preferredSlot3: string
    certifyAccuracy: boolean
    authorizeContact: boolean
  }
  numeroReference: string
  priorite: string
  dateLimiteTraitement: string
  utilisateur_id: string
  service_id: string
  metadata: any
  createdAt: string
  updatedAt: string
}

interface Notification {
  id: string
  message: string
  type: "info" | "success" | "warning" | "error"
  isRead: boolean
  user_id: string
  service_request_id: string
  createdAt: string
  updatedAt: string
  serviceRequest: ServiceRequest
}

function NotificationStats({ notifications }: { notifications: Notification[] }) {
  const stats = useMemo(() => {
    const total = notifications.length
    const unread = notifications.filter((n) => !n.isRead).length
    const byType = notifications.reduce(
      (acc, n) => {
        acc[n.type] = (acc[n.type] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )
    const urgent = notifications.filter((n) => n.serviceRequest?.priorite === "urgente").length

    return { total, unread, byType, urgent }
  }, [notifications])

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500 rounded-lg">
            <Bell className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
            <p className="text-sm text-blue-600">Total</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-500 rounded-lg">
            <Eye className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-700">{stats.unread}</p>
            <p className="text-sm text-orange-600">Non lues</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-500 rounded-lg">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-red-700">{stats.urgent}</p>
            <p className="text-sm text-red-600">Urgentes</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500 rounded-lg">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-2xl font-bold text-green-700">{stats.byType.success || 0}</p>
            <p className="text-sm text-green-600">Succès</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

interface ConfirmDeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
}

function ConfirmDeleteModal({ isOpen, onClose, onConfirm, title }: ConfirmDeleteModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-effect border-0 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <DialogHeader className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            >
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </motion.div>
            <DialogTitle className="text-xl font-bold text-foreground mb-2">Confirmer la suppression</DialogTitle>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Êtes-vous sûr de vouloir supprimer cette notification ?
              <br />
              <span className="font-semibold text-foreground">"{title}"</span>
            </p>
          </DialogHeader>
          <div className="flex gap-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full border-border text-muted-foreground hover:bg-muted transition-smooth bg-transparent"
              >
                Annuler
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button
                onClick={onConfirm}
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg"
              >
                Supprimer
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

interface NotificationDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  notification: Notification | null
}

function NotificationDetailsModal({ isOpen, onClose, notification }: NotificationDetailsModalProps) {
  if (!notification) return null

  const { serviceRequest } = notification
  const { demande } = serviceRequest

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      default:
        return <Info className="w-5 h-5 text-blue-500" />
    }
  }

  const getPriorityColor = (priorite: string) => {
    switch (priorite) {
      case "urgente":
        return "bg-red-100 text-red-800 border-red-200"
      case "haute":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "normale":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  // const getEtatColor = (etat: string) => {
  //   switch (etat) {
  //     case "en_attente":
  //       return "bg-yellow-100 text-yellow-800 border-yellow-200"
  //     case "en_cours":
  //       return "bg-blue-100 text-blue-800 border-blue-200"
  //     case "termine":
  //       return "bg-green-100 text-green-800 border-green-200"
  //     case "annule":
  //       return "bg-red-100 text-red-800 border-red-200"
  //     default:
  //       return "bg-gray-100 text-gray-800 border-gray-200"
  //   }
  // }
// Map statut → classes Tailwind
const typeToEtat = (type: string) => {
  switch (type) {
    case "error":
      return { etat: "annule", label: "Annulé" }
    case "success":
      return { etat: "termine", label: "Terminé" }
    case "info":
      return { etat: "en_cours", label: "En cours" }
    default:
      return { etat: "en_attente", label: "En attente" }
  }
}

// Map état → classes Tailwind
const getEtatColor = (etat: string) => {
  switch (etat) {
    case "en_attente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "en_cours":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "termine":
      return "bg-green-100 text-green-800 border-green-200"
    case "annule":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

 const { etat, label } = typeToEtat(notification.type)
  const badgeClasses = getEtatColor(etat)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto glass-effect border-0 shadow-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <DialogHeader className="gradient-primary text-gray-700 -m-6 mb-6 p-6 rounded-t-xl ">
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-xl font-bold mb-2">Détails de la notification</DialogTitle>
                <div className="flex items-center gap-3">
                  {getTypeIcon(notification.type)}
                  <Badge variant="outline" className="bg-white/20 text-black border-white/30 shadow-md">
                    {notification.type}
                  </Badge>
                  <Badge className={`${getPriorityColor(serviceRequest.priorite)} border`}>
                    <Priority className="w-3 h-3 mr-1" />
                    {serviceRequest.priorite}
                  </Badge>
                  {/* <Badge className={`${getEtatColor(serviceRequest.type=="error" ? "annule" : serviceRequest.type==="success" ? "termine" : serviceRequest.type===" info" ? "en_cours" : "en_attente")} border`}>
                    {serviceRequest.type.replace("_", " ") =="error" ? "Annulé" : serviceRequest.type==="success" ? "Terminé" : serviceRequest.type==="info" ? "En cours" : "En attente"}
                  </Badge> */}
                 <Badge key={serviceRequest.id} className={`${badgeClasses} border`}>
      {label}
    </Badge>

                </div>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-90">Référence</p>
                <p className="font-mono font-bold">{serviceRequest.numeroReference}</p>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Message principal */}
            <div className="p-4 bg-gradient-to-r from-card to-muted/50 rounded-xl border border-border/50">
              <h3 className="font-bold text-foreground mb-3 text-lg flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                {notification.message}
              </h3>
              <div className="text-sm text-muted-foreground flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(notification.createdAt).toLocaleDateString("fr-FR")} à{" "}
                  {new Date(notification.createdAt).toLocaleTimeString("fr-FR")}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Limite: {new Date(serviceRequest.dateLimiteTraitement).toLocaleDateString("fr-FR")}
                </div>
              </div>
            </div>

            {/* Informations du demandeur */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Informations du demandeur
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <UserCheck className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Nom complet</p>
                        <p className="font-semibold">
                          {demande.prenom} {demande.nom}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-semibold">{demande.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Téléphone</p>
                        <p className="font-semibold">{demande.telephone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <FileText className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">ID National</p>
                        <p className="font-semibold">{demande.nationalId}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Profession</p>
                        <p className="font-semibold">{demande.profession}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                      <Building className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Institution</p>
                        <p className="font-semibold">{demande.institution}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Détails de la demande */}
            <Card className="border-border/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Détails de la demande
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Sujet</p>
                      <p className="font-semibold capitalize">{demande.subject}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Type de rendez-vous</p>
                      <p className="font-semibold capitalize">{demande.meetingType}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-1">Objectif</p>
                      <p className="font-semibold capitalize">{demande.meetingTarget}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">Créneaux préférés</p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          <span className="text-sm">{new Date(demande.preferredSlot1).toLocaleString("fr-FR")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-secondary rounded-full"></span>
                          <span className="text-sm">{new Date(demande.preferredSlot2).toLocaleString("fr-FR")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-muted-foreground rounded-full"></span>
                          <span className="text-sm">{new Date(demande.preferredSlot3).toLocaleString("fr-FR")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 ${demande.certifyAccuracy ? "text-green-500" : "text-muted-foreground"}`}
                      />
                      <span className="text-sm">Exactitude certifiée</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2
                        className={`w-4 h-4 ${demande.authorizeContact ? "text-green-500" : "text-muted-foreground"}`}
                      />
                      <span className="text-sm">Contact autorisé</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-3 mt-8">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
              <Button variant="outline" onClick={onClose} className="w-full transition-smooth bg-transparent">
                Fermer
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="bg-gradient-to-r from-primary to-secondary text-white">
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default function NotificationCenter() {
  const [filterType, setFilterType] = useState("all")
  const [filterDate, setFilterDate] = useState("all")
  const [filterPriority, setFilterPriority] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; notification: any }>({
    isOpen: false,
    notification: null,
  })
  const [detailsModal, setDetailsModal] = useState<{ isOpen: boolean; notification: any }>({
    isOpen: false,
    notification: null,
  })

  const { data: notificationsData, isLoading } = useNotificationsQuery()
  const markAsReadMutation = useMarkAsReadMutation()
  const markAllAsReadMutation = useMarkAllAsReadMutation()
  const deleteNotificationMutation = useDeleteNotificationMutation()

  const notifications = notificationsData?.data || []

  const markAsRead = async (id: string) => {
    try {
      await markAsReadMutation.mutateAsync(id)
      toast.success("Notification marquée comme lue")
    } catch (error) {
      console.error("Error marking notification as read:", error)
      toast.error("Erreur lors du marquage de la notification")
    }
  }

  const openDeleteModal = (notification: any) => {
    setDeleteModal({ isOpen: true, notification })
  }

  const confirmDelete = async () => {
    if (deleteModal.notification) {
      try {
        await deleteNotificationMutation.mutateAsync(deleteModal.notification.id)
        toast.success("Notification supprimée avec succès")
      } catch (error) {
        console.error("Error deleting notification:", error)
        toast.error("Erreur lors de la suppression")
      }
    }
    setDeleteModal({ isOpen: false, notification: null })
  }

  const openDetailsModal = (notification: any) => {
    setDetailsModal({ isOpen: true, notification })
    markAsRead(notification.id)
  }

  const markAllAsRead = async () => {
    try {
      await markAllAsReadMutation.mutateAsync()
      toast.success("Toutes les notifications marquées comme lues")
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
      toast.error("Erreur lors du marquage des notifications")
    }
  }

  const filteredNotifications = notifications.filter((notif) => {
    if (filterType !== "all" && notif.type !== filterType) return false
     //@ts-ignore
    if (filterPriority !== "all" && notif.serviceRequest?.priorite !== filterPriority) return false
    if (
      searchQuery &&
      !notif.message.toLowerCase().includes(searchQuery.toLowerCase()) &&
       //@ts-ignore
      !notif.serviceRequest?.numeroReference.toLowerCase().includes(searchQuery.toLowerCase())
    )
      return false

    if (filterDate !== "all") {
      const notifDate = new Date(notif.createdAt)
      const now = new Date()

      switch (filterDate) {
        case "today":
          if (notifDate.toDateString() !== now.toDateString()) return false
          break
        case "week":
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          if (notifDate < weekAgo) return false
          break
        case "month":
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
          if (notifDate < monthAgo) return false
          break
      }
    }

    return true
  })

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map((n) => n.id))
    }
  }

  const handleBulkMarkAsRead = async () => {
    try {
      await Promise.all(selectedNotifications.map((id) => markAsReadMutation.mutateAsync(id)))
      toast.success(`${selectedNotifications.length} notifications marquées comme lues`)
      setSelectedNotifications([])
    } catch (error) {
      toast.error("Erreur lors du marquage en lot")
    }
  }

  const getStatusColor = (isRead: boolean) => {
    return isRead ? "bg-muted-foreground" : "bg-gradient-to-r from-primary to-secondary"
  }

  const getTypeColor = (type: string) => {
    const colors = {
      error: "border-l-red-500 bg-gradient-to-r from-red-50 to-red-100/50",
      warning: "border-l-amber-500 bg-gradient-to-r from-amber-50 to-amber-100/50",
      success: "border-l-emerald-500 bg-gradient-to-r from-emerald-50 to-emerald-100/50",
      info: "border-l-blue-500 bg-gradient-to-r from-blue-50 to-blue-100/50",
    }
    return colors[type as keyof typeof colors] || "border-l-primary bg-gradient-to-r from-card to-muted/50"
  }

  const getPriorityIcon = (priorite: string) => {
    switch (priorite) {
      case "urgente":
        return <Zap className="w-4 h-4 text-red-500" />
      case "haute":
        return <Star className="w-4 h-4 text-orange-500" />
      default:
        return <Priority className="w-4 h-4 text-blue-500" />
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-8 md:p-4">
      <motion.div variants={itemVariants}>
        <Card className="glass-effect border shadow-none overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 border-b border-gray-300 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
            <div className="flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg"
                >
                  <Bell className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    Centre de Notifications 
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">Gérez toutes vos notifications </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={markAllAsRead}
                    className="bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-smooth font-medium"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Marquer tout comme lu
                  </Button>
                </motion.div>
                {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" className="shadow-md bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Exporter
                  </Button>
                </motion.div> */}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <NotificationStats 
             //@ts-ignore
            notifications={notifications} />

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-card to-muted/50 rounded-xl border border-gray-300">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Rechercher par message ou référence..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10  border-gray-300 rounded-[8px] hover:border-primary/50 transition-smooth"
                    />
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={handleSelectAll} className="border-gray-300 rounded-[8px] bg-transparent">
                  <Checkbox
                    checked={
                      selectedNotifications.length === filteredNotifications.length && filteredNotifications.length > 0
                    }
                    className="mr-2"
                  />
                  Tout sélectionner
                </Button>
              </div>

              <div className="flex flex-wrap gap-4 p-4 bg-gradient-to-r from-card to-muted/50  border border-gray-300 rounded-[8px]">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
                    <Filter className="w-4 h-4 text-primary" />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-48 border-gray-300 rounded-[8px] hover:border-primary/50 transition-smooth">
                      <SelectValue placeholder="Filtrer par type" />
                    </SelectTrigger>
                    <SelectContent className="glass-effect border-0 shadow-xl">
                      <SelectItem value="all">Tous les types</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="success">Succès</SelectItem>
                      <SelectItem value="warning">Avertissement</SelectItem>
                      <SelectItem value="error">Erreur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
                    <Priority className="w-4 h-4 text-primary" />
                  </div>
                  <Select value={filterPriority} onValueChange={setFilterPriority}>
                    <SelectTrigger className="w-48 border-gray-300 rounded-[8px] hover:border-primary/50 transition-smooth">
                      <SelectValue placeholder="Filtrer par priorité" />
                    </SelectTrigger>
                    <SelectContent className="glass-effect border-0 shadow-xl">
                      <SelectItem value="all">Toutes les priorités</SelectItem>
                      <SelectItem value="urgente">Urgente</SelectItem>
                      <SelectItem value="haute">Haute</SelectItem>
                      <SelectItem value="normale">Normale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg">
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <Select value={filterDate} onValueChange={setFilterDate}>
                    <SelectTrigger className="w-48 border-gray-300 rounded-[8px] hover:border-primary/50 transition-smooth">
                      <SelectValue placeholder="Filtrer par date" />
                    </SelectTrigger>
                    <SelectContent className="glass-effect border-0 shadow-xl">
                      <SelectItem value="all">Toutes les dates</SelectItem>
                      <SelectItem value="today">Aujourd'hui</SelectItem>
                      <SelectItem value="week">Cette semaine</SelectItem>
                      <SelectItem value="month">Ce mois</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedNotifications.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl border border-primary/20"
                >
                  <p className="text-sm font-medium">{selectedNotifications.length} notification(s) sélectionnée(s)</p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={handleBulkMarkAsRead} className="shadow-md">
                      <Check className="w-4 h-4 mr-2" />
                      Marquer comme lues
                    </Button>
                    <Button size="sm" variant="outline" className="shadow-md bg-transparent">
                      <Archive className="w-4 h-4 mr-2" />
                      Archiver
                    </Button>
                    <Button size="sm" variant="destructive" className="shadow-md">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Supprimer
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 20, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: index * 0.05, type: "spring" }}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className={`rounded-xl   hover:shadow-xl border transition-smooth p-6 cursor-pointer group ${getTypeColor(notification.type)}`}
                    onClick={() => openDetailsModal(notification)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex items-center" onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            checked={selectedNotifications.includes(notification.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedNotifications([...selectedNotifications, notification.id])
                              } else {
                                setSelectedNotifications(selectedNotifications.filter((id) => id !== notification.id))
                              }
                            }}
                            className="mr-3"
                          />
                        </div>

                        <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="flex-shrink-0">
                          <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-smooth">
                            <User className="w-7 h-7 text-primary" />
                          </div>
                        </motion.div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <Badge variant="outline" className="text-xs font-medium shadow-sm bg-white/80">
                              {notification.type}
                            </Badge>
                            <div className="flex items-center gap-1">
                              { //@ts-ignore
                              getPriorityIcon(notification.serviceRequest?.priorite)}
                              <span className="text-xs font-medium capitalize">
                                { //@ts-ignore
                                notification.serviceRequest?.priorite}
                              </span>
                            </div>
                            <Badge variant="outline" className="text-xs font-mono">
                              { //@ts-ignore
                              notification.serviceRequest?.numeroReference}
                            </Badge>
                            <motion.div
                             //@ts-ignore
                              animate={!notification.isRead ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                               //@ts-ignore
                              className={`w-3 h-3 rounded-full shadow-sm ${getStatusColor(notification.isRead)}`}
                            />
                          </div>
                          <h4 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth leading-relaxed">
                            {notification.message}
                          </h4>
                          <div className="text-sm text-muted-foreground mb-2">
                            <p className="font-medium">
                              { //@ts-ignore
                              notification.serviceRequest?.prenom} {notification.serviceRequest?.nom}
                            </p>
                            <p>{
                               //@ts-ignore
                            notification.serviceRequest?.email}</p>
                          </div>
                          <div className="text-sm text-muted-foreground flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(notification.createdAt).toLocaleDateString("fr-FR")} -{" "}
                              {new Date(notification.createdAt).toLocaleTimeString("fr-FR")}
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              Limite:{" "}
                              { //@ts-ignore
                              new Date(notification.serviceRequest?.dateLimiteTraitement).toLocaleDateString("fr-FR")}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                        { //@ts-ignore
                        !notification.isRead && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => markAsRead(notification.id)}
                            className="p-3 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-smooth shadow-md hover:shadow-lg"
                            title="Marquer comme lu"
                          >
                            <Check className="w-5 h-5" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDetailsModal(notification)}
                          className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-smooth shadow-md hover:shadow-lg"
                          title="Voir les détails"
                        >
                          <Eye className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDeleteModal(notification)}
                          className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-smooth shadow-md hover:shadow-lg"
                          title="Supprimer"
                        >
                          <Trash2 className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredNotifications.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="relative mb-6"
                >
                  <Bell className="w-20 h-20 mx-auto text-muted-foreground/30" />
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-8 h-8 text-primary/50" />
                  </motion.div>
                </motion.div>
                <h3 className="text-xl font-bold text-muted-foreground mb-2">Aucune notification trouvée</h3>
                <p className="text-muted-foreground">
                  {searchQuery || filterType !== "all" || filterDate !== "all" || filterPriority !== "all"
                    ? "Essayez de modifier vos filtres de recherche"
                    : "Toutes les notifications ont été traitées"}
                </p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, notification: null })}
        onConfirm={confirmDelete}
        title={deleteModal.notification?.message || ""}
      />

      <NotificationDetailsModal
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, notification: null })}
        notification={detailsModal.notification}
      />
    </motion.div>
  )
}
