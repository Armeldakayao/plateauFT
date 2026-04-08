"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FileText, Upload, Download, Eye } from "lucide-react"
import { useDropzone } from "react-dropzone"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useUploadServiceRequestDocuments } from "@/hooks/services-requests/use-create-service-request"

interface ServiceRequestDocumentsProps {
  requestId: string
  documents?: Array<{
    id: string
    type: string
    nom: string
    description: string
    url: string
    originalName: string
    mimeType: string
    size: number
    createdAt: string
  }>
}

export function ServiceRequestDocuments({ requestId, documents = [] }: ServiceRequestDocumentsProps) {
  const [showUploadDialog, setShowUploadDialog] = useState(false)
  const [uploadData, setUploadData] = useState({
    type: "",
    description: "",
  })
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])

  const uploadDocuments = useUploadServiceRequestDocuments()

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSelectedFiles(acceptedFiles)
    },
    multiple: true,
  })

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    try {
      await uploadDocuments.mutateAsync({
        requestId,
        files: selectedFiles,
        type: uploadData.type,
        description: uploadData.description,
      })
      setShowUploadDialog(false)
      setSelectedFiles([])
      setUploadData({ type: "", description: "" })
    } catch (error) {
      console.error("Erreur lors de l'upload:", error)
    }
  }

  const handleViewDocument = (document: any) => {
    // Ouvrir le document dans un nouvel onglet
    window.open(document.url, '_blank', 'noopener,noreferrer')
  }

  const handleDownloadDocument = async (doc: any) => {
  try {
    const response = await fetch(doc.url)
    const blob = await response.blob()
    
    const url = window.URL.createObjectURL(blob)
    const link = window.document.createElement('a')
    link.href = url
    link.download = doc.originalName || doc.nom
    window.document.body.appendChild(link)
    link.click()
    
    window.document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Erreur lors du téléchargement:', error)
    
    // Fallback: ouvrir le lien dans un nouvel onglet si le téléchargement échoue
    const link = window.document.createElement('a')
    link.href = doc.url
    link.download = doc.originalName || doc.nom
    link.target = '_blank'
    link.click()
  }
}


  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getFileTypeBadge = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return "bg-green-100 text-green-800"
    if (mimeType.includes("pdf")) return "bg-red-100 text-red-800"
    if (mimeType.includes("word") || mimeType.includes("document")) return "bg-blue-100 text-blue-800"
    return "bg-gray-100 text-gray-800"
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Documents ({documents.length})</h3>
        <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
          <DialogTrigger asChild>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Ajouter des documents
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter des documents</DialogTitle>
              <DialogDescription>Téléchargez des documents liés à cette demande</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="type">Type de document</Label>
                <Input
                  id="type"
                  value={uploadData.type}
                  onChange={(e) => setUploadData((prev) => ({ ...prev, type: e.target.value }))}
                  placeholder="Ex: Pièce d'identité, Justificatif..."
                />
              </div>

              <div>
                <Label htmlFor="description">Description (optionnel)</Label>
                <Textarea
                  id="description"
                  value={uploadData.description}
                  onChange={(e) => setUploadData((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Description du document..."
                />
              </div>

              <div>
                <Label>Fichiers</Label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                    isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25"
                  }`}
                >
                  <input {...getInputProps()} />
                  <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  {isDragActive ? (
                    <p>Déposez les fichiers ici...</p>
                  ) : (
                    <p>Glissez-déposez des fichiers ici, ou cliquez pour sélectionner</p>
                  )}
                </div>

                {selectedFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    <Label>Fichiers sélectionnés:</Label>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setShowUploadDialog(false)}>
                Annuler
              </Button>
              <Button
                onClick={handleUpload}
                disabled={selectedFiles.length === 0 || !uploadData.type || uploadDocuments.isPending}
              >
                {uploadDocuments.isPending ? "Upload..." : "Télécharger"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documents de la demande</CardTitle>
          <CardDescription>Documents associés à cette demande de service</CardDescription>
        </CardHeader>
        <CardContent>
          {documents.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4" />
              <p>Aucun document pour le moment</p>
              <p className="text-sm">Les documents téléchargés apparaîtront ici</p>
            </div>
          ) : (
            <div className="space-y-4">
              {documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium">{document.nom}</p>
                        <Badge className={getFileTypeBadge(document.mimeType)}>{document.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{document.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span>{formatFileSize(document.size)}</span>
                        <span>
                          Ajouté le {format(new Date(document.createdAt), "dd/MM/yyyy à HH:mm", { locale: fr })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleViewDocument(document)}
                      title="Ouvrir dans un nouvel onglet"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Voir
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDownloadDocument(document)}
                      title="Télécharger le document"
                    >
                      <Download className="h-4 w-4 mr-1" />
                      Télécharger
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}