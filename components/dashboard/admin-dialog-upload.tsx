"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileText, X } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { useDropzone } from "react-dropzone"
import { useUploadDocumentForUser, useUserFilesAdmin } from "@/hooks/uploads/use-upload-mutations"

interface AdminDocumentUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  onSuccess?: () => void,
  children?: React.ReactNode
}

const documentTypes = [
  { value: "identity_card", label: "Pièce d'identité" },
  { value: "passport", label: "Passeport" },
  { value: "driving_license", label: "Permis de conduire" },
  { value: "proof_of_address", label: "Justificatif de domicile" },
  { value: "birth_certificate", label: "Acte de naissance" },
  { value: "other", label: "Autre" },
]

export function AdminDocumentUploadDialog({ open, onOpenChange, userId, onSuccess, children }: AdminDocumentUploadDialogProps) {
  const [file, setFile] = useState<File | null>(null)
  const [documentType, setDocumentType] = useState("")
  const [description, setDescription] = useState("")
  const uploadMutation = useUploadDocumentForUser()
  const { data: existingFiles } = useUserFilesAdmin(userId, "n")
  const { toast } = useToast()

  // Get existing document types to disable them
   //@ts-ignore
  const existingDocumentTypes = existingFiles?.documents?.map((doc) => doc.documentType) || []

  const onDrop = (acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0]
    if (selectedFile) {
      // Validation du fichier
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "Erreur",
          description: "La taille du fichier ne doit pas dépasser 10MB.",
          variant: "destructive",
        })
        return
      }
      setFile(selectedFile)
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
    },
    multiple: false,
  })

  const handleSubmit = async () => {
    if (!file || !documentType) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un fichier et un type de document.",
        variant: "destructive",
      })
      return
    }

    try {
      await uploadMutation.mutateAsync({
        userId,
        file,
        documentType,
        description: description.trim() || undefined,
      })

      toast({
        title: "Document ajouté",
        description: "Le document a été ajouté avec succès pour cet utilisateur.",
      })

      // Reset form
      setFile(null)
      setDocumentType("")
      setDescription("")

      onSuccess?.()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de l'ajout du document.",
        variant: "destructive",
      })
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const removeFile = () => {
    setFile(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Ajouter un document pour l'utilisateur
          </DialogTitle>
          <DialogDescription>
            Sélectionnez un fichier et renseignez les informations du document pour cet utilisateur.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Fichier</Label>
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragActive ? "border-primary bg-primary/5" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <input {...getInputProps()} />
              {file ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <FileText className="w-4 h-4" />
                    <span>{file.name}</span>
                    <span className="text-muted-foreground">({formatFileSize(file.size)})</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeFile()
                    }}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {isDragActive
                      ? "Déposez le fichier ici..."
                      : "Glissez-déposez un fichier ici, ou cliquez pour sélectionner"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, JPG, PNG, GIF (max. 10MB)</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentType">Type de document</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value} disabled={existingDocumentTypes.includes(type.value)}>
                    {type.label}
                    {existingDocumentTypes.includes(type.value) && " (Déjà existant)"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description (optionnel)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ajoutez une description pour ce document..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={uploadMutation.isPending}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={uploadMutation.isPending || !file || !documentType}>
            {uploadMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Upload...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Ajouter
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
