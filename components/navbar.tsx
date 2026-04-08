"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, User, Settings, LogOut, Menu, Building2 } from "lucide-react"
import Link from "next/link"
import { useProfile } from "@/hooks"
import { useNotificationsQuery } from "@/hooks/notifications/use-notification-queries"
import { useUserFiles } from "@/hooks/uploads/use-upload-mutations"

interface NavbarProps {
  onMenuClick?: () => void
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { data: profileData } = useProfile()
  const { data: notificationsData } = useNotificationsQuery()
const {data}=useUserFiles()
  const notifications = notificationsData?.data || []
  const unreadCount = notifications.filter((n) => !n.isRead).length
  const recentNotifications = notifications.slice(0, 5)
const handleLogout = () => {
    // Clear any stored tokens or user data here if necessary
    // For example: localStorage.removeItem('authToken');

    // Redirect to the logout endpoint
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('authData');
    window.location.href = '/connexion';
  }
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="sticky top-0 z-50 w-full border-b  bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side - Logo and Menu */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/dashboard/client/tableau-de-bord" className="flex items-center gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2">
              {/* <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                <Building2 className="w-5 h-5 text-white" />
              </div> */}
              {/* <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Espace Citoyen
              </span> */}
               <span className="font-bold text-2xl text-secondary">
                Espace Citoyen
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Right side - Notifications and Profile */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium"
                    >
                      {unreadCount > 9 ? "9+" : unreadCount}
                    </motion.div>
                  )}
                </Button>
              </motion.div>
            </PopoverTrigger>
           <PopoverContent
  className="w-80 p-0 z-[100] border shadow-2xl bg-white backdrop-blur-2xl rounded-xl"
  align="end"
  style={{ maxHeight: '400px', overflowY: 'auto', zIndex: 100 }}
>

              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                <div className="p-4 border-b border-border/50">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">Notifications</h3>
                    <Badge variant="secondary" className="text-xs">
                      {unreadCount} non lues
                    </Badge>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto">
                  {recentNotifications.length > 0 ? (
                    <div className="space-y-1">
                      {recentNotifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                          className="p-3 border-b border-border/30 last:border-0 cursor-pointer"
                          onClick={() => {
window.location.href="/dashboard/client/notifications"
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-2 ${!notification.isRead ? "bg-primary" : "bg-muted-foreground/30"}`}
                            />
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm ${!notification.isRead ? "font-medium text-foreground" : "text-muted-foreground"}`}
                              >
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(notification.createdAt).toLocaleDateString("fr-FR")}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center text-muted-foreground">
                      <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
                      <p className="text-sm">Aucune notification</p>
                    </div>
                  )}
                </div>

                <div className="p-3 border-t border-border/50">
                  <Link href="/dashboard/client/notifications">
                    <Button variant="ghost" className="w-full text-sm">
                      Voir toutes les notifications
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </PopoverContent>
          </Popover>

          {/* Profile Popover */}
          <Popover open={profileOpen} onOpenChange={setProfileOpen}>
            <PopoverTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-primary/20">
                    <AvatarImage src={data?.profilePhoto || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-secondary/20 text-primary font-semibold">
                      {profileData?.firstName?.[0]}
                      {profileData?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </motion.div>
            </PopoverTrigger>
           <PopoverContent
  className="w-80 p-0 z-[100] border shadow-2xl bg-white backdrop-blur-md rounded-xl"
  align="end"
  style={{ maxHeight: '400px', overflowY: 'auto', zIndex: 100 }}
>

              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
                <div className="px-3 py-2 border-b border-border/30">
                  <p className="text-sm font-medium">
                    {profileData?.firstName} {profileData?.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{profileData?.email}</p>
                </div>
                <div className="py-1">
                  <Link href="/dashboard/client/mon-profil" className="flex items-center px-3 py-2 text-sm hover:bg-muted">
                    <User className="mr-2 h-4 w-4" />
                    Mon profil
                  </Link>
                  <Link href="/dashboard/client/notifications" className="flex items-center px-3 py-2 text-sm hover:bg-muted">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Link>
                  
                </div>
                <div className="border-t border-border/30">
                  <div onClick={handleLogout} className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Se déconnecter
                  </div>
                </div>
              </motion.div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </motion.header>
  )
}
