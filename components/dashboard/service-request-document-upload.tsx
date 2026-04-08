// "use client"

// import { useState } from "react"
// import { useDropzone } from "react-dropzone"
// import { Button } from "@/components/ui/button"
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// import { Upload, FileText, X } from "lucide-react"
// import type { ServiceRequest } from "@/lib/types/service-request"
// import { useUploadServiceRequestDocuments, useUploadTreatmentDocuments } from "@/hooks/services-requests/use-create-service-request"
// import { useUploadDocumentForUser } from "@/hooks/uploads/use-upload-mutations"

// interface ServiceRequestDocumentUploadProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   serviceRequest: ServiceRequest
//   treatmentId?: string
//   mode: "request" | "treatment" | "general"
// }

// export function ServiceRequestDocumentUpload({
//   open,
//   onOpenChange,
//   serviceRequest,
//   treatmentId,
//   mode,
// }: ServiceRequestDocumentUploadProps) {
//   const [files, setFiles] = useState<File[]>([])
//   const [documentType, setDocumentType] = useState("")
//   const [description, setDescription] = useState("")

//   const uploadRequestDocs = useUploadServiceRequestDocuments()
//   const uploadTreatmentDocs = useUploadTreatmentDocuments()
//   const uploadGeneralDoc = useUploadDocumentForUser()

//   // Auto-fill description for general mode
//   const autoDescription = `Document lié à la demande ${serviceRequest.numeroReference} - ${serviceRequest.type}`

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     onDrop: (acceptedFiles) => {
//       setFiles((prev) => [...prev, ...acceptedFiles])
//     },
//     multiple: true,
//   })

//   const removeFile = (index: number) => {
//     setFiles((prev) => prev.filter((_, i) => i !== index))
//   }

//   const handleSubmit = async () => {
//     if (files.length === 0) return

//     try {
//       if (mode === "request") {
//         await uploadRequestDocs.mutateAsync({
//           requestId: serviceRequest.id,
//           files,
//           type: documentType,
//           description,
//         })
//       } else if (mode === "treatment" && treatmentId) {
//         await uploadTreatmentDocs.mutateAsync({
//           treatmentId,
//           files,
//           type: documentType,
//           description,
//         })
//       } else if (mode === "general") {
//         // Upload each file individually for general document system
//         for (const file of files) {
//           await uploadGeneralDoc.mutateAsync({
//             userId: serviceRequest.utilisateur_id,
//             file,
//             documentType: documentType || "DEMANDE_SERVICE",
//             description: description || autoDescription,
//           })
//         }
//       }

//       // Reset form
//       setFiles([])
//       setDocumentType("")
//       setDescription("")
//       onOpenChange(false)
//     } catch (error) {
//       console.error("Erreur lors de l'upload:", error)
//     }
//   }

//   const isLoading = uploadRequestDocs.isPending || uploadTreatmentDocs.isPending || uploadGeneralDoc.isPending

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-lg">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <Upload className="h-5 w-5" />
//             Ajouter des Documents
//           </DialogTitle>
//           <DialogDescription>
//             {mode === "request" && "Ajouter des documents à cette demande"}
//             {mode === "treatment" && "Ajouter des documents générés par l'agent"}
//             {mode === "general" && "Ajouter des documents au système général"}
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4">
//           {/* File Drop Zone */}
//           <div
//             {...getRootProps()}
//             className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
//               isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
//             }`}
//           >
//             <input {...getInputProps()} />
//             <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
//             {isDragActive ? (
//               <p>Déposez les fichiers ici...</p>
//             ) : (
//               <div>
//                 <p className="font-medium">Cliquez ou glissez-déposez vos fichiers</p>
//                 <p className="text-sm text-muted-foreground">PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
//               </div>
//             )}
//           </div>

//           {/* Selected Files */}
//           {files.length > 0 && (
//             <div className="space-y-2">
//               <Label>Fichiers sélectionnés ({files.length})</Label>
//               <div className="space-y-2 max-h-32 overflow-y-auto">
//                 {files.map((file, index) => (
//                   <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
//                     <div className="flex items-center gap-2">
//                       <FileText className="h-4 w-4" />
//                       <span className="text-sm truncate">{file.name}</span>
//                       <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
//                     </div>
//                     <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
//                       <X className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Document Type */}
//           <div className="space-y-2">
//             <Label>Type de document</Label>
//             <Select value={documentType} onValueChange={setDocumentType}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Sélectionnez le type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="PIECE_IDENTITE">Pièce d'identité</SelectItem>
//                 <SelectItem value="JUSTIFICATIF_DOMICILE">Justificatif de domicile</SelectItem>
//                 <SelectItem value="ACTE_NAISSANCE">Acte de naissance</SelectItem>
//                 <SelectItem value="CERTIFICAT_MEDICAL">Certificat médical</SelectItem>
//                 <SelectItem value="PHOTO">Photo</SelectItem>
//                 <SelectItem value="CONTRAT">Contrat</SelectItem>
//                 <SelectItem value="FACTURE">Facture</SelectItem>
//                 <SelectItem value="AUTRE">Autre</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {/* Description */}
//           <div className="space-y-2">
//             <Label>Description</Label>
//             <Textarea
//               placeholder={mode === "general" ? autoDescription : "Description du document..."}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows={3}
//             />
//             {mode === "general" && (
//               <p className="text-xs text-muted-foreground">Description par défaut: {autoDescription}</p>
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex justify-end gap-2">
//             <Button variant="outline" onClick={() => onOpenChange(false)}>
//               Annuler
//             </Button>
//             <Button onClick={handleSubmit} disabled={files.length === 0 || isLoading}>
//               {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : null}
//               Télécharger ({files.length})
//             </Button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Upload, FileText, X } from "lucide-react"
import type { ServiceRequest } from "@/lib/types/service-request"
import {
  useUploadServiceRequestDocuments,
  useUploadTreatmentDocuments,
} from "@/hooks/services-requests/use-create-service-request"
import { useUploadDocumentForUser } from "@/hooks/uploads/use-upload-mutations"

interface ServiceRequestDocumentUploadProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  serviceRequest: ServiceRequest
  treatmentId?: string
  mode: "request" | "treatment" | "general"
  preSelectedDocumentType?: string // Nouveau prop pour pré-sélectionner le type
}

export function ServiceRequestDocumentUpload({
  open,
  onOpenChange,
  serviceRequest,
  treatmentId,
  mode,
  preSelectedDocumentType, // Nouveau prop
}: ServiceRequestDocumentUploadProps) {
  const [files, setFiles] = useState<File[]>([])
  const [documentType, setDocumentType] = useState("")
  const [description, setDescription] = useState("")

  const uploadRequestDocs = useUploadServiceRequestDocuments()
  const uploadTreatmentDocs = useUploadTreatmentDocuments()
  const uploadGeneralDoc = useUploadDocumentForUser()

  useEffect(() => {
    if (preSelectedDocumentType && open) {
      // Normaliser le type de document pour correspondre aux options du select
      const normalizedType = preSelectedDocumentType.toUpperCase().replace(/ /g, "_")
      setDocumentType(normalizedType)
      setDescription(`Document requis: ${preSelectedDocumentType}`)
    }
  }, [preSelectedDocumentType, open])

  useEffect(() => {
    if (!open) {
      setFiles([])
      setDocumentType("")
      setDescription("")
    }
  }, [open])

  // Auto-fill description for general mode
  const autoDescription = `Document lié à la demande ${serviceRequest.numeroReference} - ${serviceRequest.type}`

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles((prev) => [...prev, ...acceptedFiles])
    },
    multiple: true,
  })

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (files.length === 0) return

    try {
      if (mode === "request") {
        await uploadRequestDocs.mutateAsync({
          requestId: serviceRequest.id,
          files,
          type: documentType,
          description,
        })
      } else if (mode === "treatment" && treatmentId) {
        await uploadTreatmentDocs.mutateAsync({
          treatmentId,
          files,
          type: documentType,
          description,
        })
      } else if (mode === "general") {
        // Upload each file individually for general document system
        for (const file of files) {
          await uploadGeneralDoc.mutateAsync({
            userId: serviceRequest.utilisateur_id,
            file,
            documentType: documentType || "DEMANDE_SERVICE",
            description: description || autoDescription,
          })
        }
      }

      // Reset form
      setFiles([])
      setDocumentType("")
      setDescription("")
      onOpenChange(false)
    } catch (error) {
      console.error("Erreur lors de l'upload:", error)
    }
  }

  const isLoading = uploadRequestDocs.isPending || uploadTreatmentDocs.isPending || uploadGeneralDoc.isPending

  const documentTypeOptions = [
    { value: "PIECE_IDENTITE", label: "Pièce d'identité" },
    { value: "JUSTIFICATIF_DOMICILE", label: "Justificatif de domicile" },
    { value: "ACTE_NAISSANCE", label: "Acte de naissance" },
    { value: "ACTE_MARIAGE", label: "Acte de mariage" },
    { value: "CERTIFICAT_NAISSANCE", label: "Certificat de naissance" },
    { value: "CERTIFICAT_MEDICAL", label: "Certificat médical" },
    { value: "PHOTO", label: "Photo" },
    { value: "CONTRAT", label: "Contrat" },
    { value: "FACTURE", label: "Facture" },
    { value: "DIPLOME", label: "Diplôme" },
    { value: "ATTESTATION", label: "Attestation" },
    { value: "AUTRE", label: "Autre" },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Ajouter des Documents
            {preSelectedDocumentType && (
              <span className="text-sm font-normal text-muted-foreground">- {preSelectedDocumentType}</span>
            )}
          </DialogTitle>
          <DialogDescription>
            {mode === "request" && "Ajouter des documents à cette demande"}
            {mode === "treatment" && "Ajouter des documents générés par l'agent"}
            {mode === "general" && "Ajouter des documents au système général"}
            {preSelectedDocumentType && (
              <div className="mt-2 p-2 bg-orange-50 border border-orange-200 rounded text-sm">
                Ce document est requis pour traiter votre demande.
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Drop Zone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
              isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            {isDragActive ? (
              <p>Déposez les fichiers ici...</p>
            ) : (
              <div>
                <p className="font-medium">Cliquez ou glissez-déposez vos fichiers</p>
                <p className="text-sm text-muted-foreground">PDF, DOC, DOCX, JPG, PNG (max 10MB)</p>
              </div>
            )}
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="space-y-2">
              <Label>Fichiers sélectionnés ({files.length})</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm truncate max-w-40">{file.name}</span>
                      <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(1)} MB)</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeFile(index)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Document Type */}
         {!preSelectedDocumentType &&  <div className="space-y-2">
            <Label>Type de document</Label>
            <Select value={documentType} onValueChange={setDocumentType}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez le type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {preSelectedDocumentType && (
              <p className="text-xs text-orange-600">
                Type suggéré basé sur le document requis: {preSelectedDocumentType}
              </p>
            )}
          </div>}

          {/* Description */}
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              placeholder={mode === "general" ? autoDescription : "Description du document..."}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            {mode === "general" && (
              <p className="text-xs text-muted-foreground">Description par défaut: {autoDescription}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button onClick={handleSubmit} disabled={files.length === 0 || isLoading}>
              {isLoading ? <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" /> : null}
              Télécharger ({files.length})
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
