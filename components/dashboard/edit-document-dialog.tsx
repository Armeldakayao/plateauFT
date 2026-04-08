"use client"

import { useState, useEffect } from "react"
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
import { Edit, Save } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { useUpdateDocument } from "@/hooks/uploads/use-upload-mutations"

interface DocumentEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document: {
    id: string
    documentType: string
    description?: string
  } | null
  onSuccess?: () => void
}

const documentTypes = [
  { value: "identity_card", label: "Pièce d'identité" },
  { value: "passport", label: "Passeport" },
  { value: "driving_license", label: "Permis de conduire" },
  { value: "proof_of_address", label: "Justificatif de domicile" },
  { value: "birth_certificate", label: "Acte de naissance" },
  { value: "other", label: "Autre" },
]

export function DocumentEditDialog({ open, onOpenChange, document, onSuccess }: DocumentEditDialogProps) {
  const [documentType, setDocumentType] = useState("")
  const [description, setDescription] = useState("")
  const updateMutation = useUpdateDocument()
  const { toast } = useToast()

  useEffect(() => {
    if (document) {
      setDocumentType(document.documentType)
      setDescription(document.description || "")
    }
  }, [document])

  const handleSubmit = async () => {
    if (!document || !documentType) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un type de document.",
        variant: "destructive",
      })
      return
    }

    try {
      await updateMutation.mutateAsync({
        id: document.id,
        data: {
          documentType,
          description: description.trim() || undefined,
        },
      })

      toast({
        title: "Document modifié",
        description: "Les informations du document ont été mises à jour.",
      })

      onSuccess?.()
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la modification du document.",
        variant: "destructive",
      })
    }
  }

  const getDocumentTypeLabel = (type: string) => {
    const docType = documentTypes.find((t) => t.value === type)
    return docType?.label || type
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Modifier le document
          </DialogTitle>
          <DialogDescription>Modifiez les informations de ce document.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="documentType">Type de document</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
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
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={updateMutation.isPending}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={updateMutation.isPending || !documentType}>
            {updateMutation.isPending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Sauvegarde...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Sauvegarder
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
