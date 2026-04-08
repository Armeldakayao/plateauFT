"use client"

import type React from "react"

import { useState, useEffect } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import type { CreateTreatmentRequest } from "@/lib/types/service-request"
import { useProfile } from "@/hooks"
import { useCreateTreatment } from "@/hooks/services-requests/use-create-service-request"
import { useParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

interface CreateTreatmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  requestId: string
  existingTreatment?: any // Check if treatment already exists
}

export function CreateTreatmentDialog({ open, onOpenChange, requestId, existingTreatment }: CreateTreatmentDialogProps) {
  const { data: profile } = useProfile() // Get current user profile
  const {id} =useParams()
  const queryClient =useQueryClient()
  const {toast} =useToast()
  const [formData, setFormData] = useState<CreateTreatmentRequest>({
    demandeId: requestId,
     //@ts-ignore
    agentNom: profile?.lastName || "",
     //@ts-ignore
    agentPrenom: profile?.firstName || "",
     //@ts-ignore
    agentEmail: profile?.email || "",
    agentService: "",
    commentairesInternes: "",
    messageAgent: "",
    dateEcheance: "",
    notifyByEmail: true,
    documentsRequis: [],
    tempsEstime: 0,
  })

  const [newDocument, setNewDocument] = useState("")
  const createTreatment = useCreateTreatment()

  useEffect(() => {
    if (profile) {
      setFormData(prev => ({
        ...prev,
         //@ts-ignore
        agentNom: profile.lastName,
         //@ts-ignore
        agentPrenom: profile.firstName,
         //@ts-ignore
        agentEmail: profile.email,
      }))
    }
  }, [profile])

  if (existingTreatment) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Traitement existant</DialogTitle>
            <DialogDescription>
              Cette demande a déjà un traitement en cours. Vous pouvez le modifier depuis l'onglet Traitements.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createTreatment.mutateAsync(formData)
      queryClient.invalidateQueries({
      queryKey: ["service-requests", "detail", id],
    })
    queryClient.invalidateQueries({
      queryKey: ["service-requests"],
    })
    toast({
        title: "Traitement créé",
        description: "Le traitement a été créé avec succès.",
       
      })
      onOpenChange(false)
      // Reset form
      setFormData({
        demandeId: requestId,
         //@ts-ignore
        agentNom: profile?.lastName || "",
         //@ts-ignore
        agentPrenom: profile?.firstName || "",
         //@ts-ignore
        agentEmail: profile?.email || "",
        agentService: "",
        commentairesInternes: "",
        messageAgent: "",
        dateEcheance: "",
        notifyByEmail: true,
        documentsRequis: [],
        tempsEstime: 0,
      })
    } catch (error) {
       queryClient.invalidateQueries({
      queryKey: ["service-requests", "detail", id],
    })
    queryClient.invalidateQueries({
      queryKey: ["service-requests"],
    })
    toast({
        title: "Traitement créé",
        description: "Le traitement a été créé avec succès.",
       
      })
      window.location.reload()
      onOpenChange(false)
      // Reset form
      console.error("Erreur lors de la création du traitement:", error)
    }
  }

  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData((prev) => ({
        ...prev,
         //@ts-ignore
        documentsRequis: [...prev.documentsRequis, newDocument.trim()],
      }))
      setNewDocument("")
    }
  }

  const removeDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
       //@ts-ignore
      documentsRequis: prev.documentsRequis.filter((_, i) => i !== index),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un nouveau traitement</DialogTitle>
          <DialogDescription>Assignez cette demande à un agent pour traitement</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agentPrenom">Prénom de l'agent</Label>
              <Input
                id="agentPrenom"
                value={formData.agentPrenom}
                readOnly
                className="bg-muted"
                disabled={true}
              />
            </div>
            <div>
              <Label htmlFor="agentNom">Nom de l'agent</Label>
              <Input
                id="agentNom"
                value={formData.agentNom}
                readOnly
                className="bg-muted"
                disabled={true}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="agentEmail">Email de l'agent</Label>
              <Input
                id="agentEmail"
                type="email"
                value={formData.agentEmail}
                readOnly
                className="bg-muted"
                disabled={true}
              />
            </div>
            <div>
              <Label htmlFor="agentService">Service</Label>
              <Input
                id="agentService"
                value={formData.agentService}
                onChange={(e) => setFormData((prev) => ({ ...prev, agentService: e.target.value }))}
              />
            </div>
          </div>

          {/* Message et commentaires */}
          <div>
            <Label htmlFor="messageAgent">Message pour le demandeur</Label>
            <Textarea
              id="messageAgent"
              value={formData.messageAgent}
              onChange={(e) => setFormData((prev) => ({ ...prev, messageAgent: e.target.value }))}
              placeholder="Message qui sera envoyé au demandeur..."
              required
            />
          </div>

          <div>
            <Label htmlFor="commentairesInternes">Commentaires internes</Label>
            <Textarea
              id="commentairesInternes"
              value={formData.commentairesInternes}
              onChange={(e) => setFormData((prev) => ({ ...prev, commentairesInternes: e.target.value }))}
              placeholder="Commentaires visibles uniquement par les agents..."
            />
          </div>

          {/* Date d'échéance et temps estimé */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateEcheance">Date d'échéance</Label>
              <Input
                id="dateEcheance"
                type="datetime-local"
                value={formData.dateEcheance}
                onChange={(e) => setFormData((prev) => ({ ...prev, dateEcheance: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="tempsEstime">Temps estimé (heures)</Label>
              <Input
                id="tempsEstime"
                type="number"
                min="0"
                step="0.5"
                value={formData.tempsEstime}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, tempsEstime: Number.parseFloat(e.target.value) || 0 }))
                }
              />
            </div>
          </div>

          {/* Documents requis */}
          <div>
            <Label>Documents requis</Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={newDocument}
                onChange={(e) => setNewDocument(e.target.value)}
                placeholder="Nom du document..."
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addDocument())}
              />
              <Button type="button" onClick={addDocument} variant="outline">
                Ajouter
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              { //@ts-ignore
              formData.documentsRequis.map((doc, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {doc}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeDocument(index)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="flex items-center space-x-2">
            <Switch
              id="notifyByEmail"
              checked={formData.notifyByEmail}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, notifyByEmail: checked }))}
            />
            <Label htmlFor="notifyByEmail">Notifier par email</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={createTreatment.isPending}>
              {createTreatment.isPending ? "Création..." : "Créer le traitement"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
