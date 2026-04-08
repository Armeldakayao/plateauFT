"use client"

import type React from "react"

import { useState } from "react"
// import { useUpdateTreatment, useFinalizeTreatment } from "@/hooks/use-service-request-mutations"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import type { UpdateTreatmentRequest, Treatment } from "@/lib/types/service-request"
import { useFinalizeTreatment, useUpdateTreatment } from "@/hooks/services-requests/use-create-service-request"
import { useParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"

interface UpdateTreatmentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  treatment: Treatment
}

const ETAT_OPTIONS = [
  // { value: "en_attente", label: "En attente" },
  { value: "en_cours", label: "En cours" },
  { value: "termine", label: "Terminé" },
  { value: "annule", label: "Annulé" },
]

const RESULTAT_OPTIONS = [
  // { value: "en_attente", label: "En attente" },
  { value: "validee", label: "Terminé" },
  { value: "refusee", label: "Rejeté" },
  // { value: "reportee", label: "Reporté" },
  { value: "incomplete", label: "En cours" },
]

export function UpdateTreatmentDialog({ open, onOpenChange, treatment }: UpdateTreatmentDialogProps) {
  const [formData, setFormData] = useState<UpdateTreatmentRequest>({
    etat: treatment.etat,
    resultat: treatment.resultat,
    etapeWorkflow: treatment.etapeWorkflow || "",
    commentairesInternes: treatment.commentairesInternes || "",
    commentairesPublics: treatment.commentairesPublics || "",
    messageAgent: treatment.messageAgent,
    dateEcheance: treatment.dateEcheance.split("T")[0] + "T" + treatment.dateEcheance.split("T")[1].slice(0, 5),
    notifyByEmail: treatment.notifyByEmail,
    notifyBySms: treatment.notifyBySms,
    documentsRequis: treatment.documentsRequis || [],
    tempsEstime: Number.parseFloat(treatment.tempsEstime || "0"),
  })

  const [newDocument, setNewDocument] = useState("")
  const updateTreatment = useUpdateTreatment()
  const finalizeTreatment = useFinalizeTreatment()
  const {toast} =useToast()
const {id} =useParams()
  const queryClient =useQueryClient()
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateTreatment.mutateAsync({ id: treatment.id, data: formData })
       toast({
        title: "Traitement mis à jour",
        description: "Le traitement a été mis à jour avec succès.",
       
      })
       queryClient.invalidateQueries({
      queryKey: ["service-requests", "detail", id],
    })
    queryClient.invalidateQueries({
      queryKey: ["service-requests"],
    })
      onOpenChange(false)
    } catch (error) {
      console.error("Erreur lors de la mise à jour du traitement:", error)
    }
  }

  const handleFinalize = async () => {
    try {
      await finalizeTreatment.mutateAsync({ id: treatment.id, data: formData })
       queryClient.invalidateQueries({
      queryKey: ["service-requests", "detail", id],
    })
     queryClient.invalidateQueries({
      queryKey: ["service-requests"],
    })
     toast({
        title: "Traitement finalisé",
        description: "Le traitement a été finalisé avec succès.",
       
      })
      onOpenChange(false)
    } catch (error) {
      console.error("Erreur lors de la finalisation du traitement:", error)
    }
  }

  const addDocument = () => {
    if (newDocument.trim()) {
      setFormData((prev) => ({
        ...prev,
        documentsRequis: [...(prev.documentsRequis || []), newDocument.trim()],
      }))
      setNewDocument("")
    }
  }

  const removeDocument = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      documentsRequis: (prev.documentsRequis || []).filter((_, i) => i !== index),
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier le traitement {treatment.numeroTraitement}</DialogTitle>
          <DialogDescription>Mettre à jour les informations du traitement</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* État et résultat */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="etat">État</Label>
              <Select
                value={formData.etat}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, etat: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ETAT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* <div>
              <Label htmlFor="resultat">Résultat</Label>
              <Select
                value={formData.resultat}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, resultat: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RESULTAT_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            {/* Si le traitement n'est pas terminé → modification classique */}

          </div>

          {/* Étape workflow */}
          <div>
            <Label htmlFor="etapeWorkflow">Étape du workflow</Label>
            <Input
              id="etapeWorkflow"
              value={formData.etapeWorkflow}
              onChange={(e) => setFormData((prev) => ({ ...prev, etapeWorkflow: e.target.value }))}
              placeholder="Étape actuelle du processus..."
            />
          </div>

          {/* Messages et commentaires */}
          <div>
            <Label htmlFor="messageAgent">Message pour le demandeur</Label>
            <Textarea
              id="messageAgent"
              value={formData.messageAgent}
              onChange={(e) => setFormData((prev) => ({ ...prev, messageAgent: e.target.value }))}
              placeholder="Message qui sera envoyé au demandeur..."
            />
          </div>

          <div>
            <Label htmlFor="commentairesPublics">Commentaires publics</Label>
            <Textarea
              id="commentairesPublics"
              value={formData.commentairesPublics}
              onChange={(e) => setFormData((prev) => ({ ...prev, commentairesPublics: e.target.value }))}
              placeholder="Commentaires visibles par le demandeur..."
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
              {(formData.documentsRequis || []).map((doc, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {doc}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeDocument(index)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="notifyByEmail"
                checked={formData.notifyByEmail}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, notifyByEmail: checked }))}
              />
              <Label htmlFor="notifyByEmail">Notifier par email</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="notifyBySms"
                checked={formData.notifyBySms}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, notifyBySms: checked }))}
              />
              <Label htmlFor="notifyBySms">Notifier par SMS</Label>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={updateTreatment.isPending}>
              {updateTreatment.isPending ? "Mise à jour..." : "Mettre à jour"}
            </Button>
            {formData.etat !== "termine" && (
              <Button
                type="button"
                onClick={handleFinalize}
                disabled={finalizeTreatment.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                {finalizeTreatment.isPending ? "Finalisation..." : "Finaliser"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
