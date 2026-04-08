// // "use client"

// // import { usePathname } from "next/navigation"
// // import Link from "next/link"
// // import { useState } from "react"
// // import { Button } from "@/components/ui/button"
// // import { LayoutDashboard, FileText, Bell, MessageCircle, User, LogOut, Cog, Menu, X } from "lucide-react"
// // import Image from "next/image"

// // export default function Sidebar() {
// //   const pathname = usePathname()
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

// //   const menuItems = [
// //     { id: "tableau-de-bord", label: "Tableau de bord", icon: LayoutDashboard, href: "/dashboard/client/tableau-de-bord" },
// //     { id: "mes-demandes", label: "Mes demandes", icon: FileText, href: "/dashboard/client/mes-demandes" },
// //     { id: "notifications", label: "Notifications", icon: Bell, href: "/dashboard/client/notifications" },
// //     { id: "aide-assistant", label: "Aide & Assistant", icon: MessageCircle, href: "/dashboard/client/aide-assistant" },
// //     { id: "mon-profil", label: "Mon profil", icon: User, href: "/dashboard/client/mon-profil" },
// //   ]

// //   const handleLogout = () => {
// //     window.localStorage.removeItem("user")
// //     window.location.href = "/connexion"
// //     console.log("Déconnexion en cours...")
// //   }

// //   return (
// //     <>
// //       {/* Mobile Menu Button */}
// //       <Button
// //         variant="ghost"
// //         size="sm"
// //         className="fixed top-4 left-2 mr-10 z-50 md:hidden bg-blue-600 text-white hover:bg-blue-700"
// //         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
// //       >
// //         {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
// //       </Button>

// //       {/* Mobile Overlay */}
// //       {isMobileMenuOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
// //           onClick={() => setIsMobileMenuOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar */}
// //      <div
// //   className={`fixed left-0 top-0 h-full w-64 bg-[url('/images/bg-sidebar.svg')] bg-cover bg-center text-white flex flex-col shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
// //     isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
// //   } md:translate-x-0`}
// // >

// //         {/* Logo Section */}
// //         <div className="p-4">
// //           <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
// //               <div className="flex items-center gap-4">
// //               <div className="flex-shrink-0">
// //                 <Link href="/" className="flex items-center space-x-2">
// //                   <Image
// //                     src="/images/footer1.svg"
// //                     alt="Logo Commune du Plateau"
// //                     width={100}
// //                     height={100}
// //                   />
// //                 </Link>
// //               </div>
              
// //               <Link href="/" className="flex items-center space-x-2">
// //                 <Image
// //                   src="/images/footer2.svg"
// //                   alt="Logo Commune du Plateau"
// //                   width={150}
// //                   height={150}
// //                 />
// //               </Link>
// //             </div>
// //           </div>

// //           <div className="text-center mb-6">
// //             <h2 className="text-2xl font-semibold mb-1">Bonjour Awa</h2>
// //             <p className="text-blue-100 text-lg">
// //               Bienvenue sur votre
// //               <br />
// //               espace citoyen !
// //             </p>
// //           </div>
// //         </div>

// //         {/* Navigation */}
// //         <nav className="flex-1 px-3">
// //           <ul className="space-y-1">
// //             {menuItems.map((item) => {
// //               const Icon = item.icon
// //               const isActive =
// //                 pathname === item.href || (item.href === "/mes-demandes" && pathname.startsWith("/mes-demandes"))

// //               return (
// //                 <li key={item.id}>
// //                   <div  onClick={() => {setIsMobileMenuOpen(false); window.location.href = item.href}} title={item.label}>
// //                     <Button
// //                       variant="ghost"
// //                       className={`w-full justify-start text-lg text-left h-12 px-4 transition-all duration-200 ${
// //                         isActive ? "bg-white text-blue-600 hover:bg-white shadow-sm" : "text-white hover:bg-blue-600/50"
// //                       }`}
// //                     >
// //                       <Icon className="w-5 h-5 mr-3" />
// //                       {item.label}
// //                     </Button>
// //                   </div>
// //                 </li>
// //               )
// //             })}
// //           </ul>
// //         </nav>

// //         {/* Bottom Section */}
// //         <div className="p-4 border-t border-blue-400/30">
// //           <Button
// //             variant="ghost"
// //             className="w-full justify-start text-white hover:bg-blue-600/50 mb-4 transition-colors duration-200"
// //             onClick={handleLogout}
// //           >
// //             <LogOut className="w-4 h-4 mr-3" />
// //             Déconnexion
// //           </Button>

// //           {/* <div className="text-xs text-blue-100 text-center leading-tight">
// //             <p>Version d'Aide & Logiciels Citoyen !</p>
// //             <p>Assistance Support ! Vos services</p>
// //           </div> */}
// //         </div>
// //       </div>
// //     </>
// //   )
// // }

// "use client"

// import { usePathname } from "next/navigation"
// import Link from "next/link"
// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { 
//   LayoutDashboard, 
//   FileText, 
//   Bell, 
//   MessageCircleQuestion, 
//   User, 
//   LogOut, 
//   Menu, 
//   X,
//   ChevronRight,
//   Home
// } from "lucide-react"
// import Image from "next/image"
// import { useProfile } from "@/hooks"

// export default function Sidebar() {
//   const pathname = usePathname()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
// const { data: profile } = useProfile()
//   const menuItems = [
//     { 
//       id: "tableau-de-bord", 
//       label: "Tableau de bord", 
//       icon: LayoutDashboard, 
//       href: "/dashboard/client/tableau-de-bord",
//       color: "from-blue-500 to-blue-600"
//     },
//     { 
//       id: "mes-demandes", 
//       label: "Mes demandes", 
//       icon: FileText, 
//       href: "/dashboard/client/service-request",
//       color: "from-emerald-500 to-emerald-600"
//     },
//     { 
//       id: "notifications", 
//       label: "Notifications", 
//       icon: Bell, 
//       href: "/dashboard/client/notifications",
//       color: "from-orange-500 to-orange-600"
//     },
//     { 
//       id: "aide-assistant", 
//       label: "Aide & Assistant", 
//       icon: MessageCircleQuestion, 
//       href: "/dashboard/client/aide-assistant",
//       color: "from-purple-500 to-purple-600"
//     },
//     { 
//       id: "mon-profil", 
//       label: "Mon profil", 
//       icon: User, 
//       href: "/dashboard/client/mon-profil",
//       color: "from-pink-500 to-pink-600"
//     },
//   ]

//   const handleLogout = () => {
//     window.localStorage.removeItem("user")
//     window.location.href = "/connexion"
//     console.log("Déconnexion en cours...")
//   }

//   return (
//     <>
//       {/* Mobile Menu Button */}
//       <Button
//         variant="ghost"
//         size="sm"
//         className="fixed top-4 left-4 z-50 md:hidden bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white shadow-lg border border-gray-200/50 rounded-xl transition-all duration-300"
//         onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//       >
//         {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
//       </Button>

//       {/* Mobile Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`fixed left-0 top-0 h-full w-72 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white flex flex-col shadow-2xl z-40 transform transition-all duration-500 ease-out ${
//           isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
//         } md:translate-x-0`}
//       >
//         {/* Decorative Elements */}
//         <div className="absolute inset-0 bg-[url('/images/bg-sidebar.svg')] bg-cover bg-center opacity-10"></div>
//         <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/5 to-transparent"></div>
        
//         {/* Logo Section */}
//         <div className="relative p-6">
//           <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5 mb-6 shadow-xl border border-white/20">
//             <div className="flex items-center justify-center gap-3">
//               <div className="flex-shrink-0">
//                 <Link href="/" className="flex items-center space-x-2">
//                   <Image
//                     src="/images/footer1.svg"
//                     alt="Logo Commune du Plateau"
//                     width={80}
//                     height={80}
//                     className="drop-shadow-sm"
//                   />
//                 </Link>
//               </div>
              
//               <Link href="/" className="flex items-center space-x-2">
//                 <Image
//                   src="/images/footer2.svg"
//                   alt="Logo Commune du Plateau"
//                   width={120}
//                   height={120}
//                   className="drop-shadow-sm"
//                 />
//               </Link>
//             </div>
//           </div>

//           <div className="text-center mb-6">
//             <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mb-4 shadow-lg">
//               <User className="w-8 h-8 text-white" />
//             </div>
//             <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
//               Bonjour {profile?.firstName}
//             </h2>
//             <p className="text-blue-100/80 text-base leading-relaxed">
//               Bienvenue sur votre
//               <br />
//               <span className="font-medium text-blue-200">espace citoyen !</span>
//             </p>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="flex-1 px-4 pb-4">
//           <ul className="space-y-2">
//             {menuItems.map((item, index) => {
//               const Icon = item.icon
//               const isActive =
//                 pathname === item.href || (item.href === "/mes-demandes" && pathname.startsWith("/mes-demandes"))

//               return (
//                 <li key={item.id} style={{ animationDelay: `${index * 50}ms` }} className="animate-fade-in">
//                   <div onClick={() => {setIsMobileMenuOpen(false); window.location.href = item.href}} title={item.label}>
//                     <Button
//                       variant="ghost"
//                       className={`group relative w-full justify-start text-base text-left h-14 px-4 rounded-xl transition-all duration-300 overflow-hidden ${
//                         isActive 
//                           ? "bg-white/95 text-gray-800 hover:bg-white shadow-lg scale-[1.02]" 
//                           : "text-white/90 hover:bg-white/10 hover:text-white hover:scale-[1.01]"
//                       }`}
//                     >
//                       {/* Gradient background for active item */}
//                       {isActive && (
//                         <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-5`} />
//                       )}
                      
//                       {/* Icon with gradient background */}
//                       <div className={`relative flex items-center justify-center w-9 h-9 rounded-lg mr-4 transition-all duration-300 ${
//                         isActive 
//                           ? `bg-gradient-to-br ${item.color} text-white shadow-md` 
//                           : "bg-white/10 text-white/80 group-hover:bg-white/20"
//                       }`}>
//                         <Icon className="w-4 h-4" />
//                       </div>
                      
//                       <span className="font-medium flex-1">{item.label}</span>
                      
//                       {/* Arrow indicator */}
//                       <ChevronRight className={`w-4 h-4 transition-all duration-300 ${
//                         isActive ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0"
//                       }`} />
//                     </Button>
//                   </div>
//                 </li>
//               )
//             })}
//           </ul>
//         </nav>

//         {/* Bottom Section */}
//         <div className="relative p-4">
//           <div className="border-t border-white/20 pt-4">
//             <Button
//               variant="ghost"
//               className="group w-full justify-start text-white/90 hover:bg-red-500/20 hover:text-red-300 rounded-xl h-12 px-4 transition-all duration-300"
//               onClick={handleLogout}
//             >
//               <div className="flex items-center justify-center w-9 h-9 bg-red-500/20 rounded-lg mr-4 group-hover:bg-red-500/30 transition-all duration-300">
//                 <LogOut className="w-4 h-4" />
//               </div>
//               <span className="font-medium">Déconnexion</span>
//             </Button>

//             {/* Version info */}
//             <div className="mt-4 text-xs text-white/50 text-center leading-relaxed">
//               <p className="mb-1">Version 2.0 - Espace Citoyen</p>
//               <p>Support & Assistance disponible</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in {
//           from {
//             opacity: 0;
//             transform: translateX(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateX(0);
//           }
//         }
        
//         .animate-fade-in {
//           animation: fade-in 0.5s ease-out forwards;
//         }
//       `}</style>
//     </>
//   )
// }


"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Home,
  FileText,
  Calendar,
  User,
  Bell,
  Plus,
  Building2,
  ChevronLeft,
  ChevronRight,
  Heart,
  Users,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useNotificationsQuery } from "@/hooks/notifications/use-notification-queries"

interface SidebarProps {
  className?: string,
  isCollapsed?: boolean,
  setIsCollapsed?: (isCollapsed: boolean) => void
}

const menuItems = [
  {
    title: "Tableau de bord",
    href: "/dashboard/client/tableau-de-bord",
    icon: Home,
    badge: null,
  },
  {
    title: "Mes demandes",
    href: "/dashboard/client/service-request",
    icon: FileText,
    badge: null,
  },
  {
    title: "Nouvelle demande",
    href: "/dashboard/client/new-request",
    icon: Plus,
    badge: null,
    subItems: [
      {
        title: "Rendez-vous",
        href: "/dashboard/client/new-request/rdv",
        icon: Calendar,
      },
      {
        title: "Partenariat",
        href: "/dashboard/client/new-request/partenariat",
        icon: Users,
      },
      {
        title: "Mariage",
        href: "/dashboard/client/new-request/mariage",
        icon: Heart,
      },
    ],
  },
  {
    title: "Mon profil",
    href: "/dashboard/client/mon-profil",
    icon: User,
    badge: null,
  },
  {
    title: "Notifications",
    href: "/dashboard/client/notifications",
    icon: Bell,
    badge: 3,
  },
  {
    title: "Aide Assistant",
    href: "/dashboard/client/aide-assistant",
    icon: MessageSquare,
    badge: null,
  },
]

export default function Sidebar({ className, isCollapsed, setIsCollapsed }: SidebarProps) {
  // const [isCollapsed, setIsCollapsed] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const pathname = usePathname()
  const { data: notificationsData } = useNotificationsQuery()
 
    const notifications = notificationsData?.data || []
const unreadCount = notifications.filter((n) => !n.isRead).length
  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) => (prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]))
  }

  const sidebarVariants = {
    expanded: { width: "288px" },
    collapsed: { width: "80px" },
  }

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -20 },
  }

  return (
    <motion.aside
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ duration: 0.3, type: "spring", damping: 20 }}
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-secondary/10 border-r border backdrop-blur-sm",
        className,
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b ">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-lg bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Menu
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 hover:bg-primary/10"
          >
            <motion.div animate={{ rotate: isCollapsed ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronLeft className="h-4 w-4" />
            </motion.div>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              const isExpanded = expandedItems.includes(item.href)
              const hasSubItems = item.subItems && item.subItems.length > 0

              return (
                <div key={item.href}  title={item.title}>
                  
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                    title={item.title}
                      href={hasSubItems ? "#" : item.href}
                      onClick={(e) => {
                        if (hasSubItems) {
                          e.preventDefault()
                          toggleExpanded(item.href)
                        }
                      }}
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary group relative overflow-hidden",
                        isActive &&
                          "bg-gradient-to-r from-primary/20 to-secondary/20 text-primary shadow-lg border border-primary/20",
                        isCollapsed && "justify-center px-2",
                      )}
                    >
                      {/* Active indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary to-secondary rounded-r-full"
                          transition={{ type: "spring", damping: 20 }}
                        />
                      )}

                      <item.icon
                      
                        className={cn(
                          "h-5 w-5 transition-colors",
                          isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary",
                        )}
                      />

                      <AnimatePresence mode="wait">
                        {!isCollapsed && (
                          <motion.div
                            variants={contentVariants}
                            initial="collapsed"
                            animate="expanded"
                            exit="collapsed"
                            transition={{ duration: 0.2 }}
                            className="flex items-center justify-between flex-1"
                          >
                            <span
                              className={cn(
                                "transition-colors text-lg",
                                isActive ? "text-primary" : "text-foreground group-hover:text-primary",
                              )}
                            >
                              {item.title}
                            </span>

                            <div className="flex items-center gap-2">
                              {item.badge && unreadCount>0 && (
                                <Badge
                                  variant="secondary"
                                  className="h-5 px-2 text-xs bg-primary/20 text-primary border-primary/30"
                                >
                                  {unreadCount??0}
                                </Badge>
                              )}

                              {hasSubItems && (
                                <motion.div animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
                                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Link>
                  </motion.div>

                  {/* Sub-items */}
                  <AnimatePresence>
                    {hasSubItems && isExpanded && !isCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className="overflow-hidden"
                      >
                        <div className="ml-8 mt-2 space-y-4 border-l border-gray-300 pl-4">
                          {item.subItems?.map((subItem) => {
                            const isSubActive = pathname === subItem.href
                            return (
                              <motion.div
                                key={subItem.href}
                                whileHover={{ scale: 1.02, x: 4 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                <Link
                                  href={subItem.href}
                                  className={cn(
                                    "flex items-center  gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:bg-primary/10 hover:text-primary",
                                    isSubActive && "bg-primary/10 text-primary font-medium",
                                  )}
                                >
                                  <subItem.icon className="h-4 w-4" />
                                  <span className="text-[18px]">{subItem.title}</span>
                                </Link>
                              </motion.div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="border-t  p-4">
          <AnimatePresence mode="wait">
            {!isCollapsed && (
              <motion.div
                variants={contentVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground">Espace Citoyen v1.0</p>
                <p className="text-sm text-muted-foreground/60">© 2025 Mairie</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.aside>
  )
}
