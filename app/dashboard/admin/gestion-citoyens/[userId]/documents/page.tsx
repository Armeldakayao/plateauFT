"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Edit, Plus, Trash2, Search, ArrowLeft } from "lucide-react"

import { useToast } from "@/hooks/use-toast"

import { useRouter } from "next/navigation"
import { useDeleteDocument, useUserFilesAdmin } from "@/hooks/uploads/use-upload-mutations"
import { DocumentIcon } from "@/components/dashboard/document-icon"
import { AdminDocumentUploadDialog } from "@/components/dashboard/admin-dialog-upload"
import { DocumentEditDialog } from "@/components/dashboard/edit-document-dialog"
import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-modal"
import { useUser } from "@/hooks"

interface Document {
  id: string
  fileName: string
  originalName: string
  fileSize: number
  mimeType: string
  documentType: string
  description?: string
  isActive: boolean
  createdAt: string
  fileUrl: string
}

export default function UserDocumentsAdminPage({ params }: { params: { userId: string } }) {
  const router = useRouter()
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)
  const [deletingDocument, setDeletingDocument] = useState<Document | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const { data: filesData, isLoading, refetch } = useUserFilesAdmin(params.userId, "y")
  const { data: user, isLoading: userLoading } = useUser(params.userId)
  const deleteDocumentMutation = useDeleteDocument()
  const { toast } = useToast()
 //@ts-ignore
  const documents = filesData?.documents || []

  // Filtrage des documents
   //@ts-ignore
  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.originalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && doc.isActive) ||
      (statusFilter === "inactive" && !doc.isActive)
    const matchesType = typeFilter === "all" || doc.documentType === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  const getDocumentTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      identity_card: "Pièce d'identité",
      passport: "Passeport",
      driving_license: "Permis de conduire",
      proof_of_address: "Justificatif de domicile",
      birth_certificate: "Acte de naissance",
      other: "Autre",
    }
    return types[type] || type
  }

  const handleDownload = (document: Document) => {
     //@ts-ignore
    const link = document.createElement("a")
    link.href = document.fileUrl
    link.download = document.originalName
    link.target = "_blank"
     //@ts-ignore
    document.body.appendChild(link)
    link.click()
     //@ts-ignore
    document.body.removeChild(link)
  }

  const handleDelete = async () => {
    if (!deletingDocument) return

    try {
      await deleteDocumentMutation.mutateAsync(deletingDocument.id)
      toast({
        title: "Document supprimé",
        description: "Le document a été supprimé avec succès.",
      })
      refetch()
      setDeletingDocument(null)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression du document.",
        variant: "destructive",
      })
    }
  }
 //@ts-ignore
  const uniqueDocumentTypes = Array.from(new Set(documents.map((doc) => doc.documentType)))

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={() => router.back()} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Retour
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900"> {
             //@ts-ignore
          user?.firstName} {user?.lastName}</h1>
          <p className="text-gray-600">Gérez tous les documents de cet utilisateur</p>
        </div>
      </div>

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom ou description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select
                value={statusFilter}
                onValueChange={(value: "all" | "active" | "inactive") => setStatusFilter(value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="inactive">Inactifs</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  {uniqueDocumentTypes.map((type) => (
                     //@ts-ignore
                    <SelectItem key={type} value={type}>
                      {
                         //@ts-ignore
                      getDocumentTypeLabel(type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={() => setIsUploadOpen(true)} className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Ajouter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des documents */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Documents ({filteredDocuments.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredDocuments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <DocumentIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucun document trouvé</p>
            </div>
          ) : (
            <div className="space-y-4">
              {
                 //@ts-ignore
              filteredDocuments.map((document) => (
                <div
                  key={document.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <DocumentIcon
                        mimeType={document.mimeType}
                        documentType={document.documentType}
                        className="w-5 h-5"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{document.originalName}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{getDocumentTypeLabel(document.documentType)}</span>
                        <span>{formatFileSize(document.fileSize)}</span>
                        <span>{formatDate(document.createdAt)}</span>
                      </div>
                      {document.description && (
                        <p className="text-sm text-muted-foreground mt-1 truncate">{document.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={document.isActive ? "default" : "secondary"}>
                      {document.isActive ? "Actif" : "Inactif"}
                    </Badge>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownload(document)}
                      className="flex items-center gap-1"
                    >
                      <Download className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingDocument(document)}
                      className="flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setDeletingDocument(document)}
                      className="flex items-center gap-1 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      <AdminDocumentUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        userId={params.userId}
        onSuccess={() => {
          refetch()
          setIsUploadOpen(false)
        }}
      />

      <DocumentEditDialog
        open={!!editingDocument}
        onOpenChange={(open) => !open && setEditingDocument(null)}
        document={editingDocument}
        onSuccess={() => {
          refetch()
          setEditingDocument(null)
        }}
      />

      <DeleteConfirmationDialog
        open={!!deletingDocument}
        onOpenChange={(open) => !open && setDeletingDocument(null)}
        onConfirm={handleDelete}
        isLoading={deleteDocumentMutation.isPending}
      />
    </div>
  )
}
