// import type React from "react"
// import type { Metadata } from "next"
// import { Inter, Plus_Jakarta_Sans, Poppins } from "next/font/google"
// import "./globals.css"
// import { ThemeProvider } from "@/components/theme-provider"

// const inter = Plus_Jakarta_Sans({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
// });

// export const metadata: Metadata = {
//   title: "PLATEAU - Espace Citoyen",
//   description: "Plateforme numérique pour les services citoyens du Plateau",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="fr" suppressHydrationWarning>
//       <body className={inter.className}>
//         <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
//           {children}
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }


"use client"

import type React from "react"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import LoadingBar from "@/components/loading-bar"
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { FloatingHelpButton } from "@/components/floatting-help-button"
import clsx from "clsx"
import { AuthGuard } from "@/providers/auth-guard"


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen ">
       <AuthGuard role="user">
      <LoadingBar />
     
      <div className="flex">
        <Sidebar isCollapsed={sidebarOpen} setIsCollapsed={setSidebarOpen}  className={sidebarOpen ? "block" : "hidden md:block"} />
   <main
  className={clsx(
    "flex-1 transition-all duration-300",
    sidebarOpen ? "ml-0 md:ml-20" : "ml-0 md:ml-72"
  )}
>
           <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <AnimatePresence  mode="wait">{children}</AnimatePresence>
        </main>
      </div>
      <FloatingHelpButton />
      </AuthGuard>
    </div>
  )
}
