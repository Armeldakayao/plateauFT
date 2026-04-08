import type React from "react"
import AdminSidebar from "@/components/admin-sidebar"
import AdminHeader from "@/components/admin-header"
import { useProfileQuery } from "@/hooks"
import { AuthGuard } from "@/providers/auth-guard"
// import { useProfile } from "@/hooks"
// import { useProfile } from "@/hooks"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <div className="flex min-h-screen bg-gray-50">
      <AuthGuard role="admin">

      <AdminSidebar />
      <div className="flex-1 lg:ml-72">
        <AdminHeader  />
        <main className="flex-1">{children}</main>
      </div>
      </AuthGuard>
    </div>
  )
}
