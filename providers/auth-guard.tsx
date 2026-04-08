"use client"

import { ReactNode, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useProfile } from "@/hooks"
import Loader from "@/components/app-loader"


interface AuthGuardProps {
  children: ReactNode
  role?: "admin" | "user" // rôle requis pour accéder à la page
}

export const AuthGuard = ({ children, role }: AuthGuardProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { data: profile, isLoading: profileLoading, isError } = useProfile()

  useEffect(() => {
    const token = localStorage.getItem("auth_token")

    if (!token) {
     if(role==="admin"){
      router.replace("/admin-auth/connexion")
     }else{
      router.replace("/connexion")
     }
      return
    }

    if (!profileLoading) {
      if (isError || !profile) {
        if(role==="admin"){
      router.replace("/admin-auth/connexion")
     }else{
      router.replace("/connexion")
     }
        return
      }

      // Vérifie si le compte est vérifié
      if (!profile.isVerified) {
        router.replace("/unhauthorized") // Page indiquant que le compte n'est pas vérifié
        return
      }

      // Vérifie le rôle
      if (role && profile.role !== role) {
        router.replace("/unauthorized")
        return
      }

      setIsLoading(false)
    }
  }, [profile, profileLoading, isError, router, role])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    )
  }

  return <>{children}</>
}
