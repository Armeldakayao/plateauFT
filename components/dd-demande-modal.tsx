// // "use client"

// // import type React from "react"

// // import { useState } from "react"
// // import {
// //   Dialog,
// //   DialogContent,
// //   DialogDescription,
// //   DialogFooter,
// //   DialogHeader,
// //   DialogTitle,
// // } from "@/components/ui/dialog"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Calendar, Paperclip } from "lucide-react"

// // interface AddDemandeModalProps {
// //   isOpen: boolean
// //   onClose: () => void
// //   onSubmit: (data: {
// //     type: string
// //     description: string
// //     dateEnvoi: string
// //     dateLimite: string
// //     attachments: File[]
// //   }) => void
// // }

// // export function AddDemandeModal({ isOpen, onClose, onSubmit }: AddDemandeModalProps) {
// //   const [type, setType] = useState("")
// //   const [description, setDescription] = useState("")
// //   const [dateEnvoi, setDateEnvoi] = useState("")
// //   const [dateLimite, setDateLimite] = useState("")
// //   const [attachments, setAttachments] = useState<File[]>([])

// //   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     if (event.target.files) {
// //       setAttachments(Array.from(event.target.files))
// //     }
// //   }

// //   const handleSubmit = () => {
// //     onSubmit({ type, description, dateEnvoi, dateLimite, attachments })
// //     // Reset form fields after submission
// //     setType("")
// //     setDescription("")
// //     setDateEnvoi("")
// //     setDateLimite("")
// //     setAttachments([])
// //     onClose()
// //   }

// //   const handleCancel = () => {
// //     // Reset form fields on cancel
// //     setType("")
// //     setDescription("")
// //     setDateEnvoi("")
// //     setDateLimite("")
// //     setAttachments([])
// //     onClose()
// //   }

// //   const requestTypes = [
// //     "Certificat de résidence",
// //     "Carte de commerçant",
// //     "Autorisation de domicile",
// //     "Extrait de naissance",
// //     "Certificat de mariage",
// //     "Autre",
// //   ]

// //   return (
// //     <Dialog open={isOpen} onOpenChange={onClose}>
// //       <DialogContent className="sm:max-w-[500px] p-6">
// //         <DialogHeader>
// //           <DialogTitle className="text-2xl font-bold text-primary">Nouvelle demande</DialogTitle>
// //           <DialogDescription className="text-gray-600">
// //             Remplissez les informations ci-dessous pour soumettre une nouvelle demande.
// //           </DialogDescription>
// //         </DialogHeader>
// //         <div className="grid gap-4 py-4">
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <label htmlFor="type" className="text-right text-gray-700">
// //               Type
// //             </label>
// //             <Select value={type} onValueChange={setType}>
// //               <SelectTrigger id="type" className="col-span-3">
// //                 <SelectValue placeholder="Sélectionnez le type de demande" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 {requestTypes.map((reqType) => (
// //                   <SelectItem key={reqType} value={reqType}>
// //                     {reqType}
// //                   </SelectItem>
// //                 ))}
// //               </SelectContent>
// //             </Select>
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <label htmlFor="description" className="text-right text-gray-700">
// //               Description
// //             </label>
// //             <Textarea
// //               id="description"
// //               value={description}
// //               onChange={(e) => setDescription(e.target.value)}
// //               placeholder="Décrivez votre demande en quelques mots"
// //               className="col-span-3 resize-none"
// //             />
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <label htmlFor="dateEnvoi" className="text-right text-gray-700">
// //               Date d'envoi
// //             </label>
// //             <div className="relative col-span-3">
// //               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //               <Input
// //                 id="dateEnvoi"
// //                 type="date"
// //                 value={dateEnvoi}
// //                 onChange={(e) => setDateEnvoi(e.target.value)}
// //                 className="pl-10"
// //               />
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <label htmlFor="dateLimite" className="text-right text-gray-700">
// //               Date limite
// //             </label>
// //             <div className="relative col-span-3">
// //               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //               <Input
// //                 id="dateLimite"
// //                 type="date"
// //                 value={dateLimite}
// //                 onChange={(e) => setDateLimite(e.target.value)}
// //                 className="pl-10"
// //               />
// //             </div>
// //           </div>
// //           <div className="grid grid-cols-4 items-center gap-4">
// //             <label htmlFor="attachments" className="text-right text-gray-700">
// //               Pièces jointes
// //             </label>
// //             <div className="relative col-span-3">
// //               <Paperclip className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //               <Input id="attachments" type="file" multiple onChange={handleFileChange} className="pl-10" />
// //               {attachments.length > 0 && (
// //                 <p className="text-sm text-gray-500 mt-1">{attachments.length} fichier(s) sélectionné(s)</p>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //         <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 pt-4">
// //           <Button
// //             variant="outline"
// //             onClick={handleCancel}
// //             className="text-primary border-primary hover:bg-gray-100 bg-transparent"
// //           >
// //             Annuler
// //           </Button>
// //           <Button onClick={handleSubmit} className="bg-primary hover:bg-primary text-white">
// //             Soumettre
// //           </Button>
// //         </DialogFooter>
// //       </DialogContent>
// //     </Dialog>
// //   )
// // }
// "use client"
// import { useState, useCallback } from "react"
// import { useDropzone } from "react-dropzone"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Calendar, UploadCloud, XCircle } from "lucide-react"
// import { cn } from "@/lib/utils"

// interface AddDemandeModalProps {
//   isOpen: boolean
//   onClose: () => void
//   onSubmit: (data: {
//     type: string
//     description: string
//     dateEnvoi: string
//     dateLimite: string
//     attachments: File[]
//   }) => void
// }

// export function AddDemandeModal({ isOpen, onClose, onSubmit }: AddDemandeModalProps) {
//   const [type, setType] = useState("")
//   const [description, setDescription] = useState("")
//   const [dateEnvoi, setDateEnvoi] = useState("")
//   const [dateLimite, setDateLimite] = useState("")
//   const [attachments, setAttachments] = useState<File[]>([])

//   const onDrop = useCallback((acceptedFiles: File[]) => {
//     setAttachments((prev) => [...prev, ...acceptedFiles])
//   }, [])

//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

//   const removeAttachment = (fileToRemove: File) => {
//     setAttachments((prev) => prev.filter((file) => file !== fileToRemove))
//   }

//   const handleSubmit = () => {
//     if (!type || !description || !dateEnvoi || !dateLimite) {
//       alert("Veuillez remplir tous les champs obligatoires.")
//       return
//     }
//     onSubmit({ type, description, dateEnvoi, dateLimite, attachments })
//     // Reset form fields after submission
//     setType("")
//     setDescription("")
//     setDateEnvoi("")
//     setDateLimite("")
//     setAttachments([])
//     onClose()
//   }

//   const handleCancel = () => {
//     // Reset form fields on cancel
//     setType("")
//     setDescription("")
//     setDateEnvoi("")
//     setDateLimite("")
//     setAttachments([])
//     onClose()
//   }

//   const requestTypes = [
//     "Certificat de résidence",
//     "Carte de commerçant",
//     "Autorisation de domicile",
//     "Extrait de naissance",
//     "Certificat de mariage",
//     "Autre",
//   ]

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[600px] p-6 bg-white rounded-lg shadow-xl">
//         <DialogHeader className="pb-4 border-b border-gray-200">
//           <DialogTitle className="text-3xl font-extrabold text-gray-900">Nouvelle demande</DialogTitle>
//           <DialogDescription className="text-gray-600 text-base">
//             Remplissez les informations ci-dessous pour soumettre une nouvelle demande.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="grid gap-6 py-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
//             <label htmlFor="type" className="text-sm font-medium text-gray-700 md:text-right">
//               Type de demande <span className="text-red-500">*</span>
//             </label>
//             <Select value={type} onValueChange={setType}>
//               <SelectTrigger id="type" className="w-full">
//                 <SelectValue placeholder="Sélectionnez le type de demande" />
//               </SelectTrigger>
//               <SelectContent>
//                 {requestTypes.map((reqType) => (
//                   <SelectItem key={reqType} value={reqType}>
//                     {reqType}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
//             <label htmlFor="description" className="text-sm font-medium text-gray-700 md:text-right pt-2">
//               Description <span className="text-red-500">*</span>
//             </label>
//             <Textarea
//               id="description"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Décrivez votre demande en quelques mots"
//               className="w-full min-h-[100px] resize-y"
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
//             <label htmlFor="dateEnvoi" className="text-sm font-medium text-gray-700 md:text-right">
//               Date d'envoi <span className="text-red-500">*</span>
//             </label>
//             <div className="relative w-full">
//               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <Input
//                 id="dateEnvoi"
//                 type="date"
//                 value={dateEnvoi}
//                 onChange={(e) => setDateEnvoi(e.target.value)}
//                 className="pl-10 w-full"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
//             <label htmlFor="dateLimite" className="text-sm font-medium text-gray-700 md:text-right">
//               Date limite <span className="text-red-500">*</span>
//             </label>
//             <div className="relative w-full">
//               <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//               <Input
//                 id="dateLimite"
//                 type="date"
//                 value={dateLimite}
//                 onChange={(e) => setDateLimite(e.target.value)}
//                 className="pl-10 w-full"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-4">
//             <label htmlFor="attachments" className="text-sm font-medium text-gray-700 md:text-right pt-2">
//               Pièces jointes
//             </label>
//             <div className="w-full">
//               <div
//                 {...getRootProps()}
//                 className={cn(
//                   "flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-md cursor-pointer transition-colors",
//                   isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-gray-50 hover:border-gray-400",
//                 )}
//               >
//                 <input {...getInputProps()} />
//                 <UploadCloud className="w-8 h-8 text-gray-500 mb-2" />
//                 {isDragActive ? (
//                   <p className="text-sm text-gray-600">Déposez les fichiers ici...</p>
//                 ) : (
//                   <p className="text-sm text-gray-600 text-center">
//                     Glissez-déposez des fichiers ici, ou cliquez pour sélectionner
//                   </p>
//                 )}
//               </div>
//               {attachments.length > 0 && (
//                 <div className="mt-3 space-y-2">
//                   {attachments.map((file, index) => (
//                     <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded-md">
//                       <span className="text-sm text-gray-700 truncate">{file.name}</span>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         onClick={() => removeAttachment(file)}
//                         className="w-6 h-6 text-gray-500 hover:text-red-500"
//                       >
//                         <XCircle className="w-4 h-4" />
//                       </Button>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-200">
//           <Button
//             variant="outline"
//             onClick={handleCancel}
//             className="text-gray-700 border-gray-300 hover:bg-gray-100 bg-white px-6 py-2 rounded-md"
//           >
//             Annuler
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-sm"
//           >
//             Soumettre
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
"use client"
import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, UploadCloud, XCircle, FileText, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddDemandeModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    type: string
    description: string
    dateEnvoi: string
    dateLimite: string
    attachments: File[]
  }) => void
}

export function AddDemandeModal({ isOpen, onClose, onSubmit }: AddDemandeModalProps) {
  const [type, setType] = useState("")
  const [description, setDescription] = useState("")
  const [dateEnvoi, setDateEnvoi] = useState("")
  const [dateLimite, setDateLimite] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setAttachments((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const removeAttachment = (fileToRemove: File) => {
    setAttachments((prev) => prev.filter((file) => file !== fileToRemove))
  }

  const handleSubmit = () => {
    if (!type || !description || !dateEnvoi || !dateLimite) {
      alert("Veuillez remplir tous les champs obligatoires.")
      return
    }
    onSubmit({ type, description, dateEnvoi, dateLimite, attachments })
    // Reset form fields after submission
    setType("")
    setDescription("")
    setDateEnvoi("")
    setDateLimite("")
    setAttachments([])
    onClose()
  }

  const handleCancel = () => {
    // Reset form fields on cancel
    setType("")
    setDescription("")
    setDateEnvoi("")
    setDateLimite("")
    setAttachments([])
    onClose()
  }

  const requestTypes = [
    "Certificat de résidence",
    "Carte de commerçant",
    "Autorisation de domicile",
    "Extrait de naissance",
    "Certificat de mariage",
    "Autre",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden bg-gradient-to-br from-white to-slate-50 border-0 shadow-2xl rounded-2xl">
        <DialogHeader className="pb-6 space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Nouvelle demande
              </DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Créez votre demande administrative en quelques étapes
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[60vh] pr-2 space-y-6">
          {/* Type de demande */}
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              Type de demande 
              <span className="text-red-500">*</span>
            </label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger className="w-full h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200">
                <SelectValue placeholder="Sélectionnez le type de demande" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-2 shadow-lg">
                {requestTypes.map((reqType) => (
                  <SelectItem 
                    key={reqType} 
                    value={reqType}
                    className="rounded-lg hover:bg-blue-50 focus:bg-blue-50"
                  >
                    {reqType}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
              Description 
              <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre demande en détail..."
              className="w-full min-h-[120px] border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 resize-none"
            />
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="dateEnvoi" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                Date d'envoi 
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <Input
                  id="dateEnvoi"
                  type="date"
                  value={dateEnvoi}
                  onChange={(e) => setDateEnvoi(e.target.value)}
                  className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="dateLimite" className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                Date limite 
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <Input
                  id="dateLimite"
                  type="date"
                  value={dateLimite}
                  onChange={(e) => setDateLimite(e.target.value)}
                  className="pl-12 h-12 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* Pièces jointes */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-800">
              Pièces jointes
            </label>
            <div
              {...getRootProps()}
              className={cn(
                "relative flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300",
                isDragActive 
                  ? "border-blue-500 bg-blue-50 scale-105" 
                  : "border-gray-300 bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/50"
              )}
            >
              <input {...getInputProps()} />
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
                <UploadCloud className="w-8 h-8 text-white" />
              </div>
              {isDragActive ? (
                <div className="text-center">
                  <p className="text-blue-600 font-semibold mb-1">Parfait ! Déposez vos fichiers</p>
                  <p className="text-sm text-gray-500">Relâchez pour les ajouter</p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-700 font-semibold mb-1">Glissez vos fichiers ici</p>
                  <p className="text-sm text-gray-500">ou cliquez pour parcourir</p>
                </div>
              )}
            </div>

            {attachments.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-semibold text-gray-700">
                  Fichiers sélectionnés ({attachments.length})
                </p>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {attachments.map((file, index) => (
                    <div 
                      key={index} 
                      className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                          <FileText className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-gray-700 truncate font-medium">
                          {file.name}
                        </span>
                        <span className="text-xs text-gray-500 shrink-0">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAttachment(file)}
                        className="text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 ml-2"
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="h-12 px-6 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 rounded-xl font-semibold transition-all duration-200"
          >
            Annuler
          </Button>
          <Button
            onClick={handleSubmit}
            className="h-12 px-8 bg-primary text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Soumettre la demande
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}