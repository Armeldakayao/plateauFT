"use client"

import {
  FileText,
  FileImage,
  File,
  FileSpreadsheet,
  FileVideo,
  FileAudio,
  Archive,
  CreditCard,
  MapPin,
  Car,
  Baby,
  Shield,
} from "lucide-react"

interface DocumentIconProps {
  mimeType?: string
  documentType?: string
  className?: string
}

export function DocumentIcon({ mimeType, documentType, className = "w-5 h-5" }: DocumentIconProps) {
  // Icônes spécifiques par type de document
  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case "identity_card":
        return <CreditCard className={`${className} text-blue-600`} />
      case "passport":
        return <Shield className={`${className} text-purple-600`} />
      case "driving_license":
        return <Car className={`${className} text-green-600`} />
      case "proof_of_address":
        return <MapPin className={`${className} text-orange-600`} />
      case "birth_certificate":
        return <Baby className={`${className} text-pink-600`} />
      default:
        return null
    }
  }

  // Icônes par type MIME
  const getMimeTypeIcon = (mime: string) => {
    if (mime.startsWith("image/")) {
      return <FileImage className={`${className} text-green-500`} />
    }
    if (mime.includes("pdf")) {
      return <FileText className={`${className} text-red-500`} />
    }
    if (mime.includes("word") || mime.includes("document")) {
      return <FileText className={`${className} text-blue-500`} />
    }
    if (mime.includes("sheet") || mime.includes("excel")) {
      return <FileSpreadsheet className={`${className} text-green-500`} />
    }
    if (mime.startsWith("video/")) {
      return <FileVideo className={`${className} text-purple-500`} />
    }
    if (mime.startsWith("audio/")) {
      return <FileAudio className={`${className} text-orange-500`} />
    }
    if (mime.includes("zip") || mime.includes("rar") || mime.includes("archive")) {
      return <Archive className={`${className} text-yellow-500`} />
    }
    return <File className={`${className} text-gray-500`} />
  }

  // Priorité aux icônes de type de document
  if (documentType) {
    const docIcon = getDocumentTypeIcon(documentType)
    if (docIcon) return docIcon
  }

  // Sinon, utiliser l'icône basée sur le type MIME
  if (mimeType) {
    return getMimeTypeIcon(mimeType)
  }

  // Icône par défaut
  return <FileText className={`${className} text-gray-500`} />
}
