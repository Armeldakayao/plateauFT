"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { FileText, CheckCircle, XCircle, MessageSquare, Eye, Send } from "lucide-react"

interface Document {
  id: string
  type: string
  nom: string
  description?: string
  url?: string
  originalName?: string
  mimeType?: string
  size?: number
  createdAt: string
}

interface RequiredDocumentsTabProps {
  requestId: string
  requiredDocuments: string[]
  uploadedDocuments: Document[]
  documentsRequis?: string[]
}

interface MessageDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  documentName: string
  messageType: "missing" | "finalize" | "reject"
  onSend: (message: string) => void
}

function MessageDialog({ open, onOpenChange, documentName, messageType, onSend }: MessageDialogProps) {
  const [message, setMessage] = useState("")

  const getPrefilledMessage = () => {
    switch (messageType) {
      case "missing":
        return `Bonjour,\n\nNous avons remarqué que le document "${documentName}" n'a pas encore été fourni pour votre demande.\n\nPourriez-vous s'il vous plaît le télécharger dès que possible afin que nous puissions traiter votre demande ?\n\nCordialement,\nL'équipe administrative`
      case "finalize":
        return `Bonjour,\n\nVotre demande a été finalisée avec succès. Le document "${documentName}" a été traité et approuvé.\n\nVous pouvez maintenant procéder aux étapes suivantes.\n\nCordialement,\nL'équipe administrative`
      case "reject":
        return `Bonjour,\n\nMalheureusement, le document "${documentName}" ne répond pas aux critères requis.\n\nVeuillez le corriger et le soumettre à nouveau.\n\nCordialement,\nL'équipe administrative`
      default:
        return ""
    }
  }

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      setMessage(getPrefilledMessage())
    }
    onOpenChange(isOpen)
  }

  const handleSend = () => {
    onSend(message)
    onOpenChange(false)
    setMessage("")
  }

  const getDialogTitle = () => {
    switch (messageType) {
      case "missing":
        return "Envoyer un rappel"
      case "finalize":
        return "Finaliser le traitement"
      case "reject":
        return "Rejeter le document"
      default:
        return "Envoyer un message"
    }
  }

  const getButtonColor = () => {
    switch (messageType) {
      case "missing":
        return "bg-blue-600 hover:bg-blue-700"
      case "finalize":
        return "bg-green-600 hover:bg-green-700"
      case "reject":
        return "bg-red-600 hover:bg-red-700"
      default:
        return "bg-primary hover:bg-primary/90"
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpen}>
      <DialogContent className="max-w-2xl animate-scale-in">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            {getDialogTitle()}
          </DialogTitle>
          <DialogDescription>Document concerné: {documentName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tapez votre message ici..."
              className="min-h-[200px] mt-2"
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button type="button" onClick={handleSend} className={getButtonColor()} disabled={!message.trim()}>
            <Send className="h-4 w-4 mr-2" />
            Envoyer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function RequiredDocumentsTab({
  requestId,
  requiredDocuments,
  uploadedDocuments,
  documentsRequis = [],
}: RequiredDocumentsTabProps) {
  const [messageDialog, setMessageDialog] = useState<{
    open: boolean
    documentName: string
    messageType: "missing" | "finalize" | "reject"
  }>({
    open: false,
    documentName: "",
    messageType: "missing",
  })

  // Combine required documents from service and treatment
  const allRequiredDocs = [...new Set([...requiredDocuments, ...documentsRequis])]

  // const getDocumentStatus = (docName: string) => {
  //   const uploaded = uploadedDocuments.find(
  //     (doc) =>
  //       doc.type.toLowerCase() === docName.toLowerCase() ||
  //       doc.nom.toLowerCase().includes(docName.toLowerCase()) ||
  //       docName.toLowerCase().includes(doc.type.toLowerCase()) ||
  //       doc.type.toLowerCase().includes(docName.toLowerCase()),
  //   )

  //   if (uploaded) {
  //     return {
  //       status: "uploaded" as const,
  //       document: uploaded,
  //     }
  //   }

  //   return {
  //     status: "missing" as const,
  //     document: null,
  //   }
  // }
const normalize = (str: string) =>
  str.toLowerCase().replace(/[_]/g, " ").trim();

const getDocumentStatus = (docName: string) => {
  const normalizedName = normalize(docName);

  const uploaded = uploadedDocuments.find((doc) => {
    const normalizedType = normalize(doc.type);
    const normalizedNom = normalize(doc.nom);

    return (
      normalizedType === normalizedName ||
      normalizedNom.includes(normalizedName) ||
      normalizedName.includes(normalizedType)
    );
  });

  if (uploaded) {
    return {
      status: "uploaded" as const,
      document: uploaded,
    };
  }

  return {
    status: "missing" as const,
    document: null,
  };
};

  const getStatusBadge = (status: "uploaded" | "missing") => {
    switch (status) {
      case "uploaded":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Téléchargé
          </Badge>
        )
      case "missing":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Manquant
          </Badge>
        )
    }
  }

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message)
    // Here you would implement the actual message sending logic
  }

  const openMessageDialog = (documentName: string, messageType: "missing" | "finalize" | "reject") => {
    setMessageDialog({
      open: true,
      documentName,
      messageType,
    })
  }

  const viewDocument = (document: Document) => {
    if (document.url) {
      window.open(document.url, "_blank")
    }
  }
console.log({ allRequiredDocs, uploadedDocuments },"//////")
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold text-balance">Documents requis</h3>
          <p className="text-muted-foreground text-pretty">Statut des documents nécessaires pour cette demande</p>
        </div>
        {/* <div className="flex gap-2 text-sm">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {uploadedDocuments.length} téléchargés
          </Badge>
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            {allRequiredDocs.length - uploadedDocuments.length} manquants
          </Badge>
        </div> */}
      </div>

      <div className="grid gap-4">
        {allRequiredDocs.map((docName, index) => {
          const { status, document } = getDocumentStatus(docName)

          return (
            <Card
              key={index}
              className="transition-all duration-200 hover:shadow-md animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-muted">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <h4 className="font-medium text-balance">{docName}</h4>
                      {document && (
                        <p className="text-sm text-muted-foreground text-pretty">
                          {document.originalName} • {document.mimeType} • {Math.round((document.size || 0) / 1024)} KB
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {getStatusBadge(status)}

                    {status === "uploaded" && document ? (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewDocument(document)}
                          className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Voir
                        </Button>
                        {/* <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openMessageDialog(docName, "finalize")}
                          className="hover:bg-green-50 hover:text-green-700 hover:border-green-200"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Finaliser
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openMessageDialog(docName, "reject")}
                          className="hover:bg-red-50 hover:text-red-700 hover:border-red-200"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Rejeter
                        </Button> */}
                      </div>
                    ) : (
                    //   <Button
                    //     variant="outline"
                    //     size="sm"
                    //     onClick={() => openMessageDialog(docName, "missing")}
                    //     className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200"
                    //   >
                    //     <MessageSquare className="h-4 w-4 mr-1" />
                    //     Rappeler
                    //   </Button>
                    <div></div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {allRequiredDocs.length === 0 && (
        <Card className="animate-fade-in">
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h4 className="font-medium mb-2">Aucun document requis</h4>
            <p className="text-sm text-muted-foreground">Cette demande ne nécessite aucun document spécifique.</p>
          </CardContent>
        </Card>
      )}

      <MessageDialog
        open={messageDialog.open}
        onOpenChange={(open) => setMessageDialog((prev) => ({ ...prev, open }))}
        documentName={messageDialog.documentName}
        messageType={messageDialog.messageType}
        onSend={handleSendMessage}
      />
    </div>
  )
}
