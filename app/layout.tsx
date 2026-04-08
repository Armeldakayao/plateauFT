import Footer from "@/components/layout/footer"
import Header from "@/components/layout/header"
import { Toaster } from "@/components/ui/toaster"
// import { AppProvider } from "@/providers/app-provider"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans, Poppins } from "next/font/google"
import type React from "react"
import "./globals.css"
import { QueryProvider } from "@/providers/query-provider"
import { Suspense } from "react"

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Commune du Plateau - Services en ligne",
  description: "Accédez à tous les services en ligne de votre commune",
   
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  
  return (
    <html lang="fr">
      <body className={font.className}>
        <QueryProvider>
          <div className="flex flex-col min-h-screen">
           <Suspense fallback={<div>Loading...</div>}>
           
            <main className="flex-grow">{children}</main>
           </Suspense>
           
          </div>
        </QueryProvider>
          <Toaster />
      </body>
    </html>
  )
}
