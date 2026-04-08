"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { LayoutDashboard, FileText, Users, Calendar, Settings, Bell, LogOut, Menu, X, Shield } from "lucide-react"
import Image from "next/image"
import { useProfile } from "@/hooks"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data } = useProfile()
  console.log(data)

  const menuItems = [
    { id: "tableau-de-bord", label: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard/admin" },
    {
      id: "gestion-demandes",
      label: "Gestion des demandes",
      icon: FileText,
      href: "/dashboard/admin/service-request",
    },
    { id: "gestion-citoyens", label: "Gestion des citoyens", icon: Users, href: "/dashboard/admin/gestion-citoyens" },
    {
      id: "services-formulaires",
      label: "Services & Formulaires",
      icon: Settings,
      href: "/dashboard/admin/services",
    },
    // { id: "rendez-vous", label: "Rendez-vous", icon: Calendar, href: "/dashboard/admin/rendez-vous" },
    {
      id: "actualites-communications",
      label: "Actualités & Communications",
      icon:  Calendar ,
      href: "/dashboard/admin/actualites",
    },
    {id:"places",label:"Gestion des places",icon:Shield,href:"/dashboard/admin/places"},
    { id: "notifications", label: "Notifications", icon: Bell, href: "/dashboard/admin/notifications" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    localStorage.removeItem("authData")
    router.push("/connexion")
    console.log("Déconnexion en cours...")
  }

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-primary shadow-lg rounded-full h-12 w-12"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full w-72 bg-primary text-white flex flex-col shadow-2xl z-40 transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/images/footer1.svg"
                    alt="Logo Commune du Plateau"
                    width={80}
                    height={80}
                    className="rounded-lg"
                  />
                </Link>
              </div>

              <Link href="/" className="flex items-center space-x-2">
                <Image src="/images/footer2.svg" alt="Logo Commune du Plateau" width={120} height={120} />
              </Link>
            </div>
          </div>

          {/* <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="w-16 h-16 border-4 border-white/20 shadow-xl">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" />
                  <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-xl font-bold">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full p-1">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
                  Administration
                </h2>
                <p className="text-purple-100/80 text-base leading-relaxed">
                  Panneau de contrôle
                  <br />
                  <span className="font-semibold text-amber-300">système</span>
                </p>
                <Badge className="mt-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-400/30">
                  Super Admin
                </Badge>
              </div>
            </div>
          </div> */}
        </div>

        <nav className="flex-1 lg:max-h-[90vh] overflow-auto px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (item.href !== "/dashboard/admin" && pathname.startsWith(item.href))

              return (
                <li title={item.label} key={item.id}>
                  <div
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      router.push(item.href)
                    }}
                    className="cursor-pointer"
                  >
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left h-14 px-4 rounded-xl transition-all duration-300 group ${
                        isActive
                          ? "bg-white/20 backdrop-blur-sm text-white shadow-lg border border-white/30"
                          : "text-purple-100 hover:bg-white/10 hover:text-white hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg mr-4 transition-all duration-300 ${
                          isActive
                            ? "text-white shadow-lg"
                            : "bg-white/10 group-hover:bg-white/20"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium text-sm truncate">{item.label}</span>
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-6 border-t border-white/20">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-red-500/20 hover:text-red-300 mb-6 transition-all duration-300 h-12 rounded-xl group"
            onClick={handleLogout}
          >
            <div className="p-2 rounded-lg mr-4 bg-red-500/20 group-hover:bg-red-500/30 transition-all duration-300">
              <LogOut className="w-4 h-4" />
            </div>
            <span className="font-medium">Déconnexion</span>
          </Button>

          <div className="text-xs text-purple-200/60 text-center leading-relaxed bg-white/5 rounded-xl p-4">
            <p className="font-medium text-purple-200">Commune du Plateau</p>
            <p>Administration système</p>
            <p className="mt-2 text-amber-300">Version Admin 2.0</p>
          </div>
        </div>
      </div>
    </>
  )
}
