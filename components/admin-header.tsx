"use client"

import { useState } from "react"
import { Bell, ChevronDown, User, Settings, Shield, LogOut, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { useMarkAllAsReadMutation, useMarkAsReadMutation, useNotificationsQuery, useUnreadCountQuery } from "@/hooks/notifications/use-notification-queries"
import { useProfile } from "@/hooks"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useUserFiles } from "@/hooks/uploads/use-upload-mutations"


export default function AdminHeader() {
  const { data:user } = useProfile()
  const { data: notificationsData,isPending:loading } = useNotificationsQuery()
  const notifications = notificationsData?.data || []
  const {data:unreadCountData}=useUnreadCountQuery()
  const unreadCount=unreadCountData?.unreadCount
  const {data}=useUserFiles()
const marksAsReadMutation = useMarkAllAsReadMutation()
const markAsReadMutation = useMarkAsReadMutation()
  const [searchQuery, setSearchQuery] = useState("")
  const {toast}=useToast()
const router =useRouter()
const handleLogout = async () => {
  localStorage.removeItem("user")
  localStorage.removeItem("auth_token")
  localStorage.removeItem("authData")
  toast({
    title: "Deconnexion en cours...",
    description: "Vous allez étre redirigé vers la page de connexion",
  })
  router.push("/admin-auth/connexion")
  console.log("Déconnexion en cours...")
}
const markAllAsRead = async () => {
  try {
    await marksAsReadMutation.mutateAsync()
  } catch (error) {
    console.error("Error marking notifications as read:", error)
  }
}

const markAsRead = async (id: string) => {
  try {
    await markAsReadMutation.mutateAsync(id)
  } catch (error) {
    console.error("Error marking notification as read:", error)
  }
}
  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          </div>
          <div className="flex items-center space-x-4">
            <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
            <div className="h-8 w-8 bg-muted animate-pulse rounded-full" />
            <div className="h-8 w-24 bg-muted animate-pulse rounded" />
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className="sticky top-0 z-20 w-full border-b bg-black/90 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className=" flex h-16 items-center justify-between px-4">
        {/* Logo et titre */}
        <div className="flex items-center pl-2">
          <div className="flex items-center space-x-2">
            {/* <div className="h-8 w-8 rounded-lg opacity-0 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <span className="text-secondary font-bold text-sm">A</span>
            </div> */}
            <h1 className="text-2xl font-bold text-primary">
              Admin Dashboard
            </h1>
          </div>
        </div>

        {/* Barre de recherche */}
        {/* <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div> */}

        {/* Actions utilisateur */}
        <div className="flex items-center space-x-4">
          {/* Dropdown Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative hover:bg-white/50 transition-colors">
                <Bell className="h-5 w-5" />
                {//@ts-ignore
                unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    {//@ts-ignore
                    unreadCount > 9 ? "9+" : unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white/95 backdrop-blur-xl border-gray-200">
              <div className="flex items-center justify-between p-3 border-b">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                {//@ts-ignore
                unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs text-blue-600 hover:text-blue-700">
                    Tout marquer comme lu
                  </Button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    Aucune notification
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors ${
                        !notification.read ? "bg-blue-50/50" : ""
                      }`}
                      onClick={() => {
                        markAsRead(notification.id);
                        router.push('/dashboard/admin/notifications');
                      }}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.type === "success" ? "bg-green-500" :
                          notification.type === "warning" ? "bg-yellow-500" :
                          notification.type === "error" ? "bg-red-500" : "bg-blue-500"
                        }`} />
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900">{//@ts-ignore
                          notification.title}</p>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(notification.createdAt).toLocaleString("fr-FR")}
                          </p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dropdown Profil */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 hover:bg-white/50 transition-colors">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  {//@ts-ignore
                  data?.profilePhoto ? (
                    <img src={//@ts-ignore
                      data.profilePhoto || "/placeholder.svg"} alt={user.name} className="h-12 w-12 rounded-full object-cover" />
                  ) : (
                    <span className="text-white font-medium text-sm">
                      {//@ts-ignore
                      user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900">{
                    //@ts-ignore
                  user?.firstName || "Utilisateur"}</p>
                  <p className="text-xs text-gray-500">{//@ts-ignore
                  user?.role || "Admin"}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border-gray-200">
              <div className="px-3 py-2 border-b">
                <p className="font-medium text-gray-900">{
                  //@ts-ignore
                user?.name || "Utilisateur"}</p>
                <p className="text-sm text-gray-500">{
                  //@ts-ignore
                user?.email || "email@example.com"}</p>
              </div>
              <DropdownMenuItem onClick={() => router.push("/dashboard/admin/profile")} className="cursor-pointer hover:bg-gray-50">
                <User className="mr-2 h-4 w-4" />
                Mon profil
              </DropdownMenuItem>
              {/* <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                <Settings className="mr-2 h-4 w-4" />
                Paramètres
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-gray-50">
                <Shield className="mr-2 h-4 w-4" />
                Sécurité
              </DropdownMenuItem> */}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer hover:bg-red-50 text-red-600 focus:text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
