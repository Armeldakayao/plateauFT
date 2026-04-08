"use client"


import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, FileText, Home, LogOut, MessageSquare, User } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export function Sidebar() {
  
  const pathname = usePathname()

  const menuItems = [
    { icon: Home, label: "Tableau de bord", href: "/dashboard" },
    { icon: FileText, label: "Mes demandes", href: "/dashboard/demandes" },
    { icon: Bell, label: "Notifications", href: "/dashboard/notifications" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/messages" },
    { icon: User, label: "Mon profil", href: "/dashboard/profil" },
  ]

  return (
    <motion.div
      className="w-64 bg-primary text-white flex flex-col h-screen sticky top-0"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-4 border-b border-primary">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
             <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Link href="/" className="flex items-center space-x-2">
                  <Image
                    src="/images/footer1.svg"
                    alt="Logo Commune du Plateau"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
              
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/images/footer2.svg"
                  alt="Logo Commune du Plateau"
                  width={150}
                  height={150}
                />
              </Link>
            </div>
          </div>
          <div>
            <p className="font-medium">Bonjour user</p>
            <p className="text-xs text-blue-200">Espace CITOYEN</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center rounded gap-3 px-3 py-2  transition-colors",
                    isActive ? "bg-secondary text-white" : "text-blue-100 hover:bg-blue-700",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-blue-700">
        <button
         
          className="flex items-center gap-3 px-3 py-2 w-full text-left rounded-md text-blue-100 hover:bg-blue-700 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Déconnexion</span>
        </button>
        <div className="mt-4 text-xs text-blue-300">
          <p>© 2024 Mairie du Plateau</p>
          <p>Version 1.0.0</p>
        </div>
      </div>
    </motion.div>
  )
}
