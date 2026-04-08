"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload, X } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { useUploadProfilePhoto } from "@/hooks/uploads/use-upload-mutations"

interface ProfilePhotoUploadProps {
  currentPhotoUrl?: string
  userInitials: string
  onPhotoUpdated?: (newPhotoUrl: string) => void
}

export function ProfilePhotoUpload({ currentPhotoUrl, userInitials, onPhotoUpdated }: ProfilePhotoUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()
  const uploadMutation = useUploadProfilePhoto()

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validation du fichier
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier image valide.",
        variant: "destructive",
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB max
      toast({
        title: "Erreur",
        description: "La taille du fichier ne doit pas dépasser 5MB.",
        variant: "destructive",
      })
      return
    }

    // Créer une preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload du fichier
    handleUpload(file)
  }

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      const response = await uploadMutation.mutateAsync(file)
      toast({
        title: "Photo mise à jour",
        description: "Votre photo de profil a été mise à jour avec succès.",
      })
       //@ts-ignore
      onPhotoUpdated?.(response.profilePhotoUrl)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour de la photo de profil.",
        variant: "destructive",
      })
      setPreviewUrl(null)
    } finally {
      setIsUploading(false)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleRemovePreview = () => {
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative group">
        <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
          <AvatarImage src={previewUrl || currentPhotoUrl} />
          <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
            {userInitials}
          </AvatarFallback>
        </Avatar>

        {/* Overlay pour hover */}
        <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <Camera className="w-6 h-6 text-white" />
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleButtonClick}
          disabled={isUploading}
          className="flex items-center rounded-[7px] gap-2 bg-transparent"
        >
          {isUploading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          {isUploading ? "Upload..." : "Changer la photo"}
        </Button>

        {/* {previewUrl && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleRemovePreview}
            className="flex items-center gap-2 bg-transparent"
          >
            <X className="w-4 h-4" />
            Annuler
          </Button>
        )} */}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      <p className="text-xs text-muted-foreground text-center">
        Formats acceptés: JPG, PNG, GIF
        <br />
        Taille maximum: 5MB
      </p>
    </div>
  )
}
