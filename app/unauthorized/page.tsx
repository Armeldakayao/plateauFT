"use client"

import { useRouter } from "next/navigation"

export default function UnauthorizedPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800 px-4 text-center">
      <h1 className="text-6xl font-bold mb-4">403</h1>
      <h2 className="text-2xl font-semibold mb-2">Accès refusé</h2>
      <p className="mb-6">
        Vous n'avez pas les droits nécessaires pour accéder à cette page.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Retour à l'accueil
      </button>
    </div>
  )
}
