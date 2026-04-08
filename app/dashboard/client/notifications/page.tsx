"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Search, Filter, Trash2, Check, CheckCheck, Calendar, MessageSquare, AlertCircle } from 'lucide-react'
import Sidebar from "@/components/sidebar"
import NotificationCenter from "@/components/dashboard/notifications-center"

interface Notification {
  id: string
  titre: string
  message: string
  type: "info" | "success" | "warning" | "error"
  date: string
  isRead: boolean
  priority: "low" | "medium" | "high"
}

export default function NotificationsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])

  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      titre: "Demande approuvée",
      message: "Votre demande de certificat de résidence (LMJ-5-007) a été approuvée et est prête pour téléchargement.",
      type: "success",
      date: "28/07/2024 14:30",
      isRead: false,
      priority: "high"
    },
    {
      id: "2",
      titre: "Rendez-vous programmé",
      message: "Votre rendez-vous pour le 12/08/2024 à 14h00 a été confirmé. Merci de vous présenter 15 minutes avant l'heure.",
      type: "info",
      date: "27/07/2024 09:15",
      isRead: false,
      priority: "medium"
    },
    {
      id: "3",
      titre: "Document manquant",
      message: "Il manque un justificatif de domicile pour votre demande JAH-6-022. Veuillez le fournir dans les 48h.",
      type: "warning",
      date: "26/07/2024 16:45",
      isRead: true,
      priority: "high"
    },
    {
      id: "4",
      titre: "Maintenance programmée",
      message: "Une maintenance du système aura lieu le 30/07/2024 de 2h à 4h du matin. Les services seront temporairement indisponibles.",
      type: "info",
      date: "25/07/2024 11:20",
      isRead: true,
      priority: "low"
    },
    {
      id: "5",
      titre: "Invitation assemblée citoyenne",
      message: "Vous êtes invité à participer à l'assemblée citoyenne du 10/08/2024 à 18h à la mairie du Plateau.",
      type: "info",
      date: "24/07/2024 08:00",
      isRead: false,
      priority: "medium"
    },
    {
      id: "6",
      titre: "Demande rejetée",
      message: "Votre demande DOM-3-015 a été rejetée. Motif: Documents non conformes. Vous pouvez faire une nouvelle demande.",
      type: "error",
      date: "23/07/2024 13:10",
      isRead: true,
      priority: "high"
    }
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "success":
        return <Check className="w-4 h-4 text-green-500" />
      case "warning":
        return <AlertCircle className="w-4 h-4 text-orange-500" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Bell className="w-4 h-4 text-blue-500" />
    }
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "success":
        return <Badge className="bg-green-500 text-white hover:bg-green-500 text-xs">Succès</Badge>
      case "warning":
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500 text-xs">Attention</Badge>
      case "error":
        return <Badge className="bg-red-500 text-white hover:bg-red-500 text-xs">Erreur</Badge>
      default:
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500 text-xs">Info</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="outline" className="border-red-500 text-red-500 text-xs">Haute</Badge>
      case "medium":
        return <Badge variant="outline" className="border-orange-500 text-orange-500 text-xs">Moyenne</Badge>
      default:
        return <Badge variant="outline" className="border-gray-500 text-gray-500 text-xs">Basse</Badge>
    }
  }

  const filteredNotifications = notifications.filter((notification) => {
    const matchesSearch = notification.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || notification.type === typeFilter
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "read" && notification.isRead) ||
                         (statusFilter === "unread" && !notification.isRead)
    
    return matchesSearch && matchesType && matchesStatus
  })

  const unreadCount = notifications.filter(n => !n.isRead).length

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    )
    console.log(`Notification ${id} marquée comme lue`)
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
    console.log("Toutes les notifications marquées comme lues")
  }

  const handleDelete = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
    console.log(`Notification ${id} supprimée`)
  }

  const handleDeleteSelected = () => {
    setNotifications(prev => prev.filter(notification => !selectedNotifications.includes(notification.id)))
    setSelectedNotifications([])
    console.log("Notifications sélectionnées supprimées")
  }

  const handleSelectNotification = (id: string) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(notifId => notifId !== id)
        : [...prev, id]
    )
  }

  const handleSelectAll = () => {
    if (selectedNotifications.length === filteredNotifications.length) {
      setSelectedNotifications([])
    } else {
      setSelectedNotifications(filteredNotifications.map(n => n.id))
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 md:ml-64 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
     
      <div className="flex-1 ">
        {/* Header */}
       <NotificationCenter/>
      </div>
    </div>
  )
}
