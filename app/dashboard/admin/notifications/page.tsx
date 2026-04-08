"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Bell, Eye, Trash2, Filter, Calendar, User, AlertTriangle, Check } from "lucide-react"
import {
  useDeleteNotificationMutation,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
  useNotificationsQuery,
} from "@/hooks/notifications/use-notification-queries"
import { toast } from "sonner"

interface Notification {
  id: string
  message: string
  type: "info" | "success" | "warning" | "error"
  isRead: boolean
  userId: string
  createdAt: string
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
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <DialogTitle className="text-xl font-semibold text-gray-900 mb-2">Confirmer la suppression</DialogTitle>
            <p className="text-gray-600 mb-6">
              Êtes-vous sûr de vouloir supprimer cette notification ?
              <br />
              <span className="font-medium">"{title}"</span>
            </p>
          </DialogHeader>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
            >
              Annuler
            </Button>
            <Button onClick={onConfirm} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
              Supprimer
            </Button>
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
        >
          <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white -m-6 mb-6 p-6 rounded-t-lg">
            <DialogTitle className="text-lg">Détails de la notification</DialogTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                {notification.type}
              </Badge>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">{notification.message}</h3>
              <div className="text-sm text-gray-500">
                {new Date(notification.createdAt).toLocaleDateString("fr-FR")} à{" "}
                {new Date(notification.createdAt).toLocaleTimeString("fr-FR")}
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
              Fermer
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}

export default function NotificationCenter() {
  const [filterType, setFilterType] = useState("all")
  const [filterDate, setFilterDate] = useState("all")
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
    return true
  })

  const getStatusColor = (isRead: boolean) => {
    return isRead ? "bg-gray-400" : "bg-blue-500"
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "error":
        return "border-l-red-500"
      case "warning":
        return "border-l-yellow-500"
      case "success":
        return "border-l-green-500"
      case "info":
      default:
        return "border-l-blue-500"
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
        <div className="text-lg">Chargement des notifications...</div>
      </div>
    )
  }

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="space-y-6">
      <motion.div variants={itemVariants}>
        <Card className=" border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-blue-700">
                <Bell className="w-5 h-5" />
                Centre de Notifications
              </CardTitle>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={markAllAsRead}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                >
                  Marquer tout comme lu
                </Button>
              </motion.div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les types</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="success">Succès</SelectItem>
                    <SelectItem value="warning">Avertissement</SelectItem>
                    <SelectItem value="error">Erreur</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <Select value={filterDate} onValueChange={setFilterDate}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filtrer par date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les dates</SelectItem>
                    <SelectItem value="today">Aujourd'hui</SelectItem>
                    <SelectItem value="week">Cette semaine</SelectItem>
                    <SelectItem value="month">Ce mois</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-4">
              <AnimatePresence>
                {filteredNotifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`bg-white rounded-lg border-l-4 ${getTypeColor(notification.type)} shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer`}
                    onClick={() => openDetailsModal(notification)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <User className="w-6 h-6 text-gray-500" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {notification.type}
                            </Badge>
                            <div className={`w-2 h-2 rounded-full ${
                             //@ts-ignore
                            getStatusColor(notification.isRead)}`} />
                          </div>
                          <h4 className="font-medium text-gray-900 mb-1">{notification.message}</h4>
                          <div className="text-xs text-gray-500">
                            {new Date(notification.createdAt).toLocaleDateString("fr-FR")} -{" "}
                            {new Date(notification.createdAt).toLocaleTimeString("fr-FR")}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4" onClick={(e) => e.stopPropagation()}>
                        {
                           //@ts-ignore
                        !notification.isRead && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => markAsRead(notification.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Marquer comme lu"
                          >
                            <Check className="w-4 h-4" />
                          </motion.button>
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDetailsModal(notification)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Voir les détails"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openDeleteModal(notification)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredNotifications.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <Bell className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">Aucune notification</h3>
                <p className="text-gray-400">Toutes les notifications ont été traitées</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, notification: null })}
        onConfirm={confirmDelete}
        title={deleteModal.notification?.message || ""}
      />

      {/* Notification Details Modal */}
      <NotificationDetailsModal
        isOpen={detailsModal.isOpen}
        onClose={() => setDetailsModal({ isOpen: false, notification: null })}
        notification={detailsModal.notification}
      />
    </motion.div>
  )
}
