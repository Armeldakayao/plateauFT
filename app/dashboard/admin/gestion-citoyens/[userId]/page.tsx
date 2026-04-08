"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, FileText, Settings, Phone, Calendar, MapPin, Edit, Trash2, Plus, Shield } from "lucide-react"
import { useRouter } from "next/navigation"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useDeleteUser, useUpdateUser, useUser } from "@/hooks"
import { useDeleteDocument, useUserFilesAdmin } from "@/hooks/uploads/use-upload-mutations"
import { useToast } from "@/hooks/use-toast"
import { AdminDocumentUploadDialog } from "@/components/dashboard/admin-dialog-upload"
import { DocumentEditDialog } from "@/components/dashboard/edit-document-dialog"
import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-modal"
import { DocumentIcon } from "@/components/dashboard/document-icon"

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

export default function UserDetailsPage({ params }: { params: { userId: string } }) {
  const router = useRouter()
  const { toast } = useToast()

  // States
  const [isDocumentUploadOpen, setIsDocumentUploadOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState<Document | null>(null)
  const [deletingDocument, setDeletingDocument] = useState<Document | null>(null)
  const [isEditInfoOpen, setIsEditInfoOpen] = useState(false)
  const [isEditStatusOpen, setIsEditStatusOpen] = useState(false)
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false)
  const [editFormData, setEditFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: "",
    birthPlace: "",
    nationality: "",
    city: "",
  })

  // Hooks
  const { data: user, isLoading: userLoading, refetch: refetchUser } = useUser(params.userId)
  const {
    data: documentsData,
    isLoading: documentsLoading,
    refetch: refetchDocuments,
  } = useUserFilesAdmin(params.userId, "y")
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()
const updateUserStatusMutation = useUpdateUser()
const deleteDocument = useDeleteDocument()
 //@ts-ignore
  const documents = documentsData?.documents || []

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
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

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-500 text-white hover:bg-green-500">Actif</Badge>
      case "inactive":
        return <Badge className="bg-red-500 text-white hover:bg-red-500">Inactif</Badge>
      case "blocked":
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500">Bloqué</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 text-white hover:bg-yellow-500">En attente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
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

  const handleUpdateUserInfo = async () => {
    try {
      await updateUserMutation.mutateAsync({
        id: params.userId,
        data: editFormData,
      })
      toast({
        title: "Informations mises à jour",
        description: "Les informations de l'utilisateur ont été mises à jour avec succès.",
      })
      setIsEditInfoOpen(false)
      refetchUser()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour des informations.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateUserStatus = async (status: string) => {
    try {
      await updateUserMutation.mutateAsync({
        id: params.userId,
        data: { status },
      })
      toast({
        title: "Statut mis à jour",
        description: "Le statut de l'utilisateur a été mis à jour avec succès.",
      })
      refetchUser()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du statut.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateUserRole = async (role: string) => {
    try {
      await updateUserMutation.mutateAsync({
        id: params.userId,
        data: { role },
      })
      toast({
        title: "Rôle mis à jour",
        description: "Le rôle de l'utilisateur a été mis à jour avec succès.",
      })
      refetchUser()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour du rôle.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteUser = async () => {
    try {
      await deleteUserMutation.mutateAsync(params.userId)
      toast({
        title: "Utilisateur supprimé",
        description: "L'utilisateur a été supprimé avec succès.",
      })
      router.push("/admin/users")
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de l'utilisateur.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteDocument = async () => {
    if (!deletingDocument) return

    try {
      await deleteDocument.mutateAsync(deletingDocument.id)
      // Assuming useDeleteDocument hook exists
      toast({
        title: "Document supprimé",
        description: "Le document a été supprimé avec succès.",
      })
      refetchDocuments()
      setDeletingDocument(null)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression du document.",
        variant: "destructive",
      })
    }
  }

  if (userLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">Utilisateur non trouvé</p>
          <Button variant="outline" onClick={() => router.push("/admin/users")} className="mt-4">
            Retour aux utilisateurs
          </Button>
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
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <User className="w-8 h-8 text-primary" />
            { //@ts-ignore
            user.firstName} {user.lastName}
          </h1>
          <p className="text-gray-600 mt-1">Détails de l'utilisateur</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setEditFormData({
                 //@ts-ignore
                firstName: user.firstName || "",
                 //@ts-ignore
                lastName: user.lastName || "",
                 //@ts-ignore
                email: user.email || "",
                 //@ts-ignore
                phone: user.phone || "",
                 //@ts-ignore
                birthDate: user.birthDate || "",
                 //@ts-ignore
                birthPlace: user.birthPlace || "",
                 //@ts-ignore
                nationality: user.nationality || "",
                 //@ts-ignore
                city: user.city || "",
              })
              setIsEditInfoOpen(true)
            }}
            className="flex items-center gap-2"
          >
            <Edit className="w-4 h-4" />
            Modifier
          </Button>
          <Button
            variant="outline"
            onClick={() => setIsDeleteUserOpen(true)}
            className="flex items-center gap-2 text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Informations utilisateur */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profil
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center">
                <Avatar className="w-28 h-28 mb-4">
                  <AvatarImage src={
                     //@ts-ignore
                    documentsData && documentsData.profilePhoto || "/placeholder.svg"} />
                  <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {
                       //@ts-ignore
                    user.firstName?.[0]}
                    { //@ts-ignore
                    user.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-center">
                  { //@ts-ignore
                  user.firstName} {user.lastName}
                </h3>
                <p className="text-sm text-muted-foreground text-center">{
                   //@ts-ignore
                user.email}</p>
                <div className="mt-2">{
                   //@ts-ignore
                getStatusBadge(user.status)}</div>
              </div>

              <div className="space-y-3 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>{
                     //@ts-ignore
                  user.phone || "Non renseigné"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{
                     //@ts-ignore
                  user.birthDate ? formatDate(user.birthDate) : "Non renseigné"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>{
                     //@ts-ignore
                  user.city || "Non renseigné"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <Badge variant="outline">{
                     //@ts-ignore
                  user.role}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions rapides */}
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => setIsEditStatusOpen(true)}
              >
                <Settings className="w-4 h-4 mr-2" />
                Gérer le statut
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => setIsDocumentUploadOpen(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter un document
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent"
                onClick={() => router.push(`/dashboard/admin/gestion-citoyens/${params.userId}/documents`)}
              >
                <FileText className="w-4 h-4 mr-2" />
                Gérer tous les documents
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
              <TabsTrigger value="documents">Documents ({documents.length})</TabsTrigger>
              <TabsTrigger value="activity">Activité</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Informations personnelles */}
              <Card>
                <CardHeader>
                  <CardTitle>Informations personnelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Prénom</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      user.firstName || "Non renseigné"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nom</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      user.lastName || "Non renseigné"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Email</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      user.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      user.phone || "Non renseigné"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Date de naissance</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      user.birthDate ? formatDate(user.birthDate) : "Non renseigné"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Lieu de naissance</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      user.birthPlace || "Non renseigné"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Nationalité</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      user.nationality || "Non renseigné"}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Ville</label>
                      <p className="font-medium">{
                         //@ts-ignore
                      user.city || "Non renseigné"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Statistiques */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">{documents.length}</p>
                        <p className="text-sm text-muted-foreground">Documents</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">{
                           //@ts-ignore
                        formatDate(user.createdAt)}</p>
                        <p className="text-sm text-muted-foreground">Membre depuis</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-purple-500" />
                      <div>
                        <p className="text-2xl font-bold">{
                           //@ts-ignore
                        user.isVerified ? "Vérifié" : "Non vérifié"}</p>
                        <p className="text-sm text-muted-foreground">Statut de vérification</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Documents de l'utilisateur</CardTitle>
                    <Button onClick={() => setIsDocumentUploadOpen(true)} className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Ajouter un document
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {documentsLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                    </div>
                  ) : documents.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Aucun document trouvé</p>
                      <Button onClick={() => setIsDocumentUploadOpen(true)} className="mt-4">
                        Ajouter le premier document
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {
                         //@ts-ignore
                      documents.slice(0, 5).map((document) => (
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
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Badge variant={document.isActive ? "default" : "secondary"}>
                              {document.isActive ? "Actif" : "Inactif"}
                            </Badge>
                            <Button variant="outline" size="sm" onClick={() => handleDownload(document)}>
                              Télécharger
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setEditingDocument(document)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDeletingDocument(document)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                      {documents.length > 5 && (
                        <div className="text-center pt-4">
                          <Button
                            variant="outline"
                            onClick={() => router.push(`/admin/users/${params.userId}/documents`)}
                          >
                            Voir tous les documents ({documents.length})
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Aucune activité récente</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Dialogs */}
      <AdminDocumentUploadDialog
        open={isDocumentUploadOpen}
        onOpenChange={setIsDocumentUploadOpen}
        userId={params.userId}
        onSuccess={() => {
          refetchDocuments()
          setIsDocumentUploadOpen(false)
        }}
      />

      <DocumentEditDialog
        open={!!editingDocument}
        onOpenChange={(open) => !open && setEditingDocument(null)}
        document={editingDocument}
        onSuccess={() => {
          refetchDocuments()
          setEditingDocument(null)
        }}
      />

      <DeleteConfirmationDialog
        open={!!deletingDocument}
        onOpenChange={(open) => !open && setDeletingDocument(null)}
        onConfirm={handleDeleteDocument}
        title="Supprimer le document"
        description={`Êtes-vous sûr de vouloir supprimer le document "${deletingDocument?.originalName}" ?`}
      />

      {/* Edit User Info Dialog */}
      <Dialog open={isEditInfoOpen} onOpenChange={setIsEditInfoOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier les informations de l'utilisateur</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                value={editFormData.firstName}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, firstName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                value={editFormData.lastName}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, lastName: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={editFormData.email}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={editFormData.phone}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date de naissance</Label>
              <Input
                id="birthDate"
                type="date"
                value={editFormData.birthDate}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                value={editFormData.city}
                onChange={(e) => setEditFormData((prev) => ({ ...prev, city: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditInfoOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleUpdateUserInfo} disabled={updateUserMutation.isPending}>
              {updateUserMutation.isPending ? "Sauvegarde..." : "Sauvegarder"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Status Dialog */}
      <Dialog open={isEditStatusOpen} onOpenChange={setIsEditStatusOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gérer le statut et le rôle</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Statut</Label>
              <Select 
               //@ts-ignore
              value={user.status} onValueChange={handleUpdateUserStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="blocked">Bloqué</SelectItem>
                  <SelectItem value="pending">En attente</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Rôle</Label>
              <Select
               //@ts-ignore
               value={user.role} onValueChange={handleUpdateUserRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="citizen">Citoyen</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="moderator">Modérateur</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => setIsEditStatusOpen(false)}>
              Fermer
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation */}
      <DeleteConfirmationDialog
        open={isDeleteUserOpen}
        onOpenChange={setIsDeleteUserOpen}
        onConfirm={handleDeleteUser}
        isLoading={deleteUserMutation.isPending}
        title="Supprimer l'utilisateur"
         //@ts-ignore
        description={`Êtes-vous sûr de vouloir supprimer définitivement l'utilisateur ${user.firstName} ${user.lastName} ? Cette action est irréversible et supprimera également tous ses documents.`}
      />
    </div>
  )
}
