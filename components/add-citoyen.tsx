
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Upload, X, Plus } from "lucide-react"

import { getImageUrl } from "@/lib/api/client"
import { useUploadMultiple, useUploadSingle } from "@/hooks/uploads/use-upload-mutations"

interface AddCitoyenFormProps {
  onSubmit: (data: any) => void
  onCancel: () => void
  initialData?: any
  isEditing?: boolean
}

export function AddCitoyenForm({ onSubmit, onCancel, initialData, isEditing = false }: AddCitoyenFormProps) {
  const [formData, setFormData] = useState({
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    birthDate: initialData?.birthDate || "",
    birthPlace: initialData?.birthPlace || "",
    nationality: initialData?.nationality || "",
    city: initialData?.city || "",
    // role: initialData?.role || "citizen",
    // isVerified: initialData?.isVerified || false,
    // profileImage: initialData?.profileImage || "",
    // documents: initialData?.documents || [],
  })

  const [profilePreview, setProfilePreview] = useState<string | null>(
    initialData?.profileImage ? getImageUrl(initialData.profileImage) : null,
  )
  const [documentPreviews, setDocumentPreviews] = useState<string[]>(
    initialData?.documents?.map((doc: string) => getImageUrl(doc)) || [],
  )

  const uploadSingle = useUploadSingle()
  const uploadMultiple = useUploadMultiple()

  const handleProfileImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const result = await uploadSingle.mutateAsync(file)
      if (result.success) {
        setFormData((prev) => ({ ...prev, profileImage: result.data.url }))
        setProfilePreview(getImageUrl(result.data.url))
      }
    } catch (error) {
      console.error("Erreur upload photo de profil:", error)
    }
  }

  const handleDocumentsChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    try {
      const result = await uploadMultiple.mutateAsync(files)
      if (result.success) {
        //@ts-ignore
        const newDocuments = [...formData.documents, ...result.data.urls]
         //@ts-ignore
        const newPreviews = [...documentPreviews, ...result.data.urls.map((url) => getImageUrl(url))]

        setFormData((prev) => ({ ...prev, documents: newDocuments }))
        setDocumentPreviews(newPreviews)
      }
    } catch (error) {
      console.error("Erreur upload documents:", error)
    }
  }

  const removeDocument = (index: number) => {
     //@ts-ignore
    const newDocuments = formData.documents.filter((_: any, i: number) => i !== index)
    const newPreviews = documentPreviews.filter((_, i) => i !== index)

    setFormData((prev) => ({ ...prev, documents: newDocuments }))
    setDocumentPreviews(newPreviews)
  }

  const removeProfileImage = () => {
    setFormData((prev) => ({ ...prev, profileImage: "" }))
    setProfilePreview(null)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card className="w-full max-w-full mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "Modifier le citoyen" : "Ajouter un nouveau citoyen"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo de profil */}
          <div className="space-y-2">
            <Label>Photo de profil</Label>
            <div className="flex items-center hidden gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={profilePreview || undefined} />
                <AvatarFallback>
                  {formData.firstName?.[0]}
                  {formData.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("profile-upload")?.click()}
                  disabled={uploadSingle.isPending}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {profilePreview ? "Changer" : "Ajouter"}
                </Button>
                {profilePreview && (
                  <Button type="button" variant="outline" size="sm" onClick={removeProfileImage}>
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleProfileImageChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Informations personnelles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="birthDate">Date de naissance</Label>
              <Input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={(e) => setFormData((prev) => ({ ...prev, birthDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="birthPlace">Lieu de naissance</Label>
              <Input
                id="birthPlace"
                value={formData.birthPlace}
                onChange={(e) => setFormData((prev) => ({ ...prev, birthPlace: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nationality">Nationalité</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => setFormData((prev) => ({ ...prev, nationality: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Ville</Label>
              <Input
                id="city"
                value={formData.city}
                onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
              />
            </div>
          </div>

          {/* Rôle et statut */}
          <div className="grid grid-cols-1 hidden md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="role">Rôle</Label>
              <Select
               //@ts-ignore
                value={formData.role}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, role: value }))}
              >
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
            <div className="space-y-2">
              <Label htmlFor="isVerified">Statut de vérification</Label>
              <Select
               //@ts-ignore
                value={formData.isVerified ? "true" : "false"}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, isVerified: value === "true" }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Vérifié</SelectItem>
                  <SelectItem value="false">Non vérifié</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Documents */}
          <div className="space-y-2 hidden">
            <Label>Documents</Label>
            <div className="space-y-4">
              {documentPreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {documentPreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview || "/placeholder.svg"}
                        alt={`Document ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeDocument(index)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("documents-upload")?.click()}
                disabled={uploadMultiple.isPending}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Ajouter des documents
              </Button>
              <input
                id="documents-upload"
                type="file"
                accept="image/*,application/pdf"
                multiple
                onChange={handleDocumentsChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit" disabled={uploadSingle.isPending || uploadMultiple.isPending}>
              {isEditing ? "Modifier" : "Ajouter"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
