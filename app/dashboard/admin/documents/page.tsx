"use client"

import { DocumentList } from "@/components/document-list"

export default function DocumentsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des documents</h1>
        <p className="text-gray-600">Gérez tous vos documents en un seul endroit</p>
      </div>

      <DocumentList showAll={true} canManage={true} />
    </div>
  )
}
