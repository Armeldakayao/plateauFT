// // "use client"

// // import { useState } from "react"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Badge } from "@/components/ui/badge"
// // import { Search, Plus, Edit } from "lucide-react"
// // import Link from "next/link"

// // export default function GestionCitoyensPage() {
// //   const [searchTerm, setSearchTerm] = useState("")

// //   const citoyens = [
// //     {
// //       id: "1",
// //       nomPrenom: "Koffi Stephane",
// //       telephone: "07 88 46 67 23",
// //       dateInscription: "12/07/2024",
// //       statut: "Actif",
// //     },
// //     {
// //       id: "2",
// //       nomPrenom: "Alioune Mamadou",
// //       telephone: "07 88 46 67 23",
// //       dateInscription: "12/07/2024",
// //       statut: "Inactif",
// //     },
// //     {
// //       id: "3",
// //       nomPrenom: "Coulibaly Fatou",
// //       telephone: "07 88 46 67 23",
// //       dateInscription: "12/07/2024",
// //       statut: "Bloqué",
// //     },
// //     {
// //       id: "4",
// //       nomPrenom: "Alioune Mamadou",
// //       telephone: "07 88 46 67 23",
// //       dateInscription: "12/07/2024",
// //       statut: "Inactif",
// //     },
// //     {
// //       id: "5",
// //       nomPrenom: "Coulibaly Fatou",
// //       telephone: "07 88 46 67 23",
// //       dateInscription: "12/07/2024",
// //       statut: "Actif",
// //     },
// //   ]

// //   const getStatusBadge = (statut: string) => {
// //     switch (statut) {
// //       case "Actif":
// //         return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Actif</Badge>
// //       case "Inactif":
// //         return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1 text-xs">Inactif</Badge>
// //       case "Bloqué":
// //         return <Badge className="bg-orange-500 text-white hover:bg-orange-500 px-3 py-1 text-xs">Bloqué</Badge>
// //       default:
// //         return <Badge variant="secondary">{statut}</Badge>
// //     }
// //   }

// //   const getActionButtons = (statut: string) => {
// //     return (
// //       <div className="flex items-center gap-2">
// //         <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 bg-transparent">
// //           <Edit className="w-4 h-4" />
// //         </Button>
// //         <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 bg-transparent">
// //           Éditer
// //         </Button>
// //         {statut === "Actif" ? (
// //           <Button variant="outline" size="sm" className="border-red-300 text-red-600 bg-transparent">
// //             Bloquer
// //           </Button>
// //         ) : (
// //           <Button variant="outline" size="sm" className="border-green-300 text-green-600 bg-transparent">
// //             Activer
// //           </Button>
// //         )}
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="p-8 bg-gray-50 min-h-screen">
// //       {/* Breadcrumb */}
// //       <div className="mb-6">
// //         <nav className="text-sm text-gray-600">
// //           <Link href="/admin" className="hover:text-blue-600">
// //             Tableau de bord
// //           </Link>
// //           <span className="mx-2">›</span>
// //           <span className="text-gray-900 font-medium">Gestion des citoyens</span>
// //         </nav>
// //       </div>

// //       <div className="mb-8">
// //         <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion des citoyens</h1>

// //         {/* Search and Filter */}
// //         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
// //           <div className="flex flex-col lg:flex-row gap-4 items-end">
// //             <div className="flex-1">
// //               <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher un citoyen</label>
// //               <div className="relative">
// //                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
// //                 <Input
// //                   placeholder="Recherchez par nom, email, numéro de téléphone, et n°..."
// //                   value={searchTerm}
// //                   onChange={(e) => setSearchTerm(e.target.value)}
// //                   className="pl-10"
// //                 />
// //               </div>
// //             </div>
// //             <div className="flex gap-2">
// //               <Button className="bg-blue-600 hover:bg-blue-700 text-white">Filtrer par statut d'inscription</Button>
// //               <Button variant="outline" className="border-gray-300 bg-transparent">
// //                 Filtrer par
// //               </Button>
// //               <Button variant="outline" className="border-gray-300 bg-transparent">
// //                 Tri
// //               </Button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Add Citizen Button */}
// //         <div className="flex justify-end mb-6">
// //           <Link href="/dashboard/admin/gestion-citoyens/ajouter">
// //             <Button className="bg-green-600 hover:bg-green-700 text-white">
// //               <Plus className="w-4 h-4 mr-2" />
// //               Ajouter manuellement un citoyen
// //             </Button>
// //           </Link>
// //         </div>
// //       </div>

// //       {/* Table */}
// //       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
// //         <div className="border-b border-gray-200 p-4">
// //           <h3 className="text-lg font-semibold text-gray-900">Liste des citoyens enregistrés</h3>
// //         </div>
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead className="bg-gray-50 border-b border-gray-200">
// //               <tr>
// //                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Nom & Prénom</th>
// //                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Téléphone</th>
// //                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Date d'inscription</th>
// //                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Statut</th>
// //                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {citoyens.map((citoyen, index) => (
// //                 <tr key={citoyen.id} className="border-b border-gray-100 hover:bg-gray-50">
// //                   <td className="py-4 px-6 font-medium text-gray-900">{citoyen.nomPrenom}</td>
// //                   <td className="py-4 px-6 text-gray-600">{citoyen.telephone}</td>
// //                   <td className="py-4 px-6 text-gray-600">{citoyen.dateInscription}</td>
// //                   <td className="py-4 px-6">{getStatusBadge(citoyen.statut)}</td>
// //                   <td className="py-4 px-6">{getActionButtons(citoyen.statut)}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Pagination */}
// //         <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
// //           <div className="text-sm text-gray-500">Précédent</div>
// //           <div className="flex items-center gap-2">
// //             <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
// //               1
// //             </Button>
// //           </div>
// //           <div className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">Précédent</div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }
// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Search, Plus, Edit } from "lucide-react"
// import Link from "next/link"
// import { useDeleteUser, useUpdateUser, useUsers } from "@/hooks"


// export default function GestionCitoyensPage() {
//   const [searchTerm, setSearchTerm] = useState("")

//   const {
//     data: usersData,
//     isLoading,
//     error,
//   } = useUsers({
//     search: searchTerm,
//     role: "citizen", // Filter for citizens only
//   })
//   const updateUserMutation = useUpdateUser()
//   const deleteUserMutation = useDeleteUser()

//   const citoyens = usersData?.data || [
//     {
//       id: "1",
//       nomPrenom: "Koffi Stephane",
//       telephone: "07 88 46 67 23",
//       dateInscription: "12/07/2024",
//       statut: "Actif",
//     },
//     {
//       id: "2",
//       nomPrenom: "Alioune Mamadou",
//       telephone: "07 88 46 67 23",
//       dateInscription: "12/07/2024",
//       statut: "Inactif",
//     },
//     {
//       id: "3",
//       nomPrenom: "Coulibaly Fatou",
//       telephone: "07 88 46 67 23",
//       dateInscription: "12/07/2024",
//       statut: "Bloqué",
//     },
//     {
//       id: "4",
//       nomPrenom: "Alioune Mamadou",
//       telephone: "07 88 46 67 23",
//       dateInscription: "12/07/2024",
//       statut: "Inactif",
//     },
//     {
//       id: "5",
//       nomPrenom: "Coulibaly Fatou",
//       telephone: "07 88 46 67 23",
//       dateInscription: "12/07/2024",
//       statut: "Actif",
//     },
//   ]

//   const handleToggleUserStatus = async (userId: string, currentStatus: string) => {
//     const newStatus = currentStatus === "Actif" ? "Inactif" : "Actif"
//     try {
//       await updateUserMutation.mutateAsync({
//         id: userId,
//         data: { status: newStatus.toLowerCase() },
//       })
//     } catch (error) {
//       console.error("Error updating user status:", error)
//     }
//   }

//   const handleBlockUser = async (userId: string) => {
//     try {
//       await updateUserMutation.mutateAsync({
//         id: userId,
//         data: { status: "blocked" },
//       })
//     } catch (error) {
//       console.error("Error blocking user:", error)
//     }
//   }

//   const getStatusBadge = (statut: string) => {
//     switch (statut) {
//       case "Actif":
//         return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Actif</Badge>
//       case "Inactif":
//         return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1 text-xs">Inactif</Badge>
//       case "Bloqué":
//         return <Badge className="bg-orange-500 text-white hover:bg-orange-500 px-3 py-1 text-xs">Bloqué</Badge>
//       default:
//         return <Badge variant="secondary">{statut}</Badge>
//     }
//   }

//   const getActionButtons = (citoyen: any) => {
//     return (
//       <div className="flex items-center gap-2">
//         <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 bg-transparent">
//           <Edit className="w-4 h-4" />
//         </Button>
//         <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 bg-transparent">
//           Éditer
//         </Button>
//         {citoyen.statut === "Actif" ? (
//           <Button
//             variant="outline"
//             size="sm"
//             className="border-red-300 text-red-600 bg-transparent"
//             onClick={() => handleBlockUser(citoyen.id)}
//             disabled={updateUserMutation.isPending}
//           >
//             Bloquer
//           </Button>
//         ) : (
//           <Button
//             variant="outline"
//             size="sm"
//             className="border-green-300 text-green-600 bg-transparent"
//             onClick={() => handleToggleUserStatus(citoyen.id, citoyen.statut)}
//             disabled={updateUserMutation.isPending}
//           >
//             Activer
//           </Button>
//         )}
//       </div>
//     )
//   }

//   if (isLoading) {
//     return (
//       <div className="p-8 bg-gray-50 min-h-screen">
//         <div className="flex items-center justify-center h-64">
//           <div className="text-lg">Chargement des citoyens...</div>
//         </div>
//       </div>
//     )
//   }
// console.log(citoyens,"citoyens")
//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">
//       {/* Breadcrumb */}
//       <div className="mb-6">
//         <nav className="text-sm text-gray-600">
//           <Link href="/admin" className="hover:text-blue-600">
//             Tableau de bord
//           </Link>
//           <span className="mx-2">›</span>
//           <span className="text-gray-900 font-medium">Gestion des citoyens</span>
//         </nav>
//       </div>

//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion des citoyens</h1>

//         {/* Search and Filter */}
//         <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
//           <div className="flex flex-col lg:flex-row gap-4 items-end">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher un citoyen</label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Recherchez par nom, email, numéro de téléphone, et n°..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Button className="bg-blue-600 hover:bg-blue-700 text-white">Filtrer par statut d'inscription</Button>
//               <Button variant="outline" className="border-gray-300 bg-transparent">
//                 Filtrer par
//               </Button>
//               <Button variant="outline" className="border-gray-300 bg-transparent">
//                 Tri
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Add Citizen Button */}
//         <div className="flex justify-end mb-6">
//           <Link href="/admin/gestion-citoyens/ajouter">
//             <Button className="bg-green-600 hover:bg-green-700 text-white">
//               <Plus className="w-4 h-4 mr-2" />
//               Ajouter manuellement un citoyen
//             </Button>
//           </Link>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="border-b border-gray-200 p-4">
//           <h3 className="text-lg font-semibold text-gray-900">Liste des citoyens enregistrés</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Nom & Prénom</th>
//                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Téléphone</th>
//                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Date d'inscription</th>
//                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Statut</th>
//                 <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {citoyens.map((citoyen, index) => (
//                 <tr key={citoyen.id} className="border-b border-gray-100 hover:bg-gray-50">
//                   <td className="py-4 px-6 font-medium text-gray-900">{citoyen.lastName} {citoyen.firstName}</td>
//                   <td className="py-4 px-6 text-gray-600">{citoyen.phone}</td>
//                   <td className="py-4 px-6 text-gray-600">{citoyen.dateInscription}</td>
//                   <td className="py-4 px-6">{getStatusBadge(citoyen.statut)}</td>
//                   <td className="py-4 px-6">{getActionButtons(citoyen)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
//           <div className="text-sm text-gray-500">Précédent</div>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
//               1
//             </Button>
//           </div>
//           <div className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">Précédent</div>
//         </div>
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Eye, Trash2, Shield, Grid3X3, List, User, Phone, Calendar } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { useDeleteUser, useRegisterMutation, useResendOtpMutation, useUpdateUser, useUsers } from "@/hooks"
import { ConfirmDeleteModal } from "@/components/dashboard/confirm-delete-modal"
import { DetailsSheet } from "@/components/dashboard/details-sheet"
import { EmailVerificationModal } from "@/components/dashboard/email-verification-modal"
import { AddCitoyenForm } from "@/components/add-citoyen"




interface CitoyenData {
  nom: string
  prenom: string
  dateNaissance: string
  lieuResidence: string
  typeDocument: string
  telephone: string
  email: string
  motDePasse: string
  confirmationMotDePasse: string
  role: string
}


export default function GestionCitoyensPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("list")
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showEditInfoModal, setShowEditInfoModal] = useState(false)
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDetailsSheet, setShowDetailsSheet] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [newUserEmail, setNewUserEmail] = useState("")
  const [documents, setDocuments] = useState<any[]>([])

  const [citoyenData, setCitoyenData] = useState<CitoyenData>({
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuResidence: "",
    typeDocument: "",
    telephone: "",
    email: "",
    motDePasse: "",
    confirmationMotDePasse: "",
    role: "citizen",
  })

const {toast} = useToast()
  const { data: usersData, isLoading } = useUsers({ search: searchTerm, role: "citizen" })
  const updateUserMutation = useUpdateUser()
  const deleteUserMutation = useDeleteUser()
  const registerMutation = useRegisterMutation()
  const resendOtpMutation = useResendOtpMutation()

  const users = usersData?.data || []

  const handleAddUser = async (data: any) => {
    try {
      await registerMutation.mutateAsync({
        firstName: data.firstName,
        lastName: data.lastName,
        birthDate: data.birthDate,
        birthPlace: data.birthPlace,
        nationality: data.nationality,
        city: data.city,
        email: data.email,
        phone: data.phone,
        password: "TempPassword123!", // Temporary password
        confirmPassword: "TempPassword123!",
        idType: "cni",
        idNumber: "AUTO_GENERATED",
        acceptTerms: true,
        acceptDataPolicy: true,
         //@ts-ignore
        profileImage: data.profileImage,
        documents: data.documents,
        role: data.role,
        isVerified: data.isVerified,
      })

      setNewUserEmail(data.email)
      setShowAddModal(false)
      if (!data.isVerified) {
        setShowVerificationModal(true)
      } else {

        toast({
          title: "Compte créé avec succès",
          description: "Le compte a bien été créé.",
        })
      }
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Erreur lors de la création du compte",
        description: "Erreur lors de la création du compte.",
        variant: "destructive",
      })
    }
  }

  const handleUpdateUserStatus = async (userId: string, status: string) => {
    try {
      await updateUserMutation.mutateAsync({
        id: userId,
        data: { status },
      })
     toast({
       title: "Statut mis à jour avec succès",
      description: "Le statut de l'utilisateur a bien été mis à jour.",
     })
      setShowEditModal(false)
    } catch (error) {
      console.error("Error updating user status:", error)
     toast({
       title: "Erreur lors de la mise à jour du statut",
       description: "Erreur lors de la mise à jour du statut de l'utilisateur.",
       variant: "destructive",
     })
    }
  }

  const handleUpdateUserRole = async (userId: string, role: string) => {
    try {
      await updateUserMutation.mutateAsync({
        id: userId,
        data: { role },
      })
     toast({
       title: "Rôle mis à jour avec succès",
      description: "Le rôle de l'utilisateur a bien été mis à jour.",
     })
      setShowEditModal(false)
    } catch (error) {
      console.error("Error updating user role:", error)
     toast({
       title: "Erreur lors de la mise à jour du rôle",
       description: "Erreur lors de la mise à jour du rôle de l'utilisateur.",
       variant: "destructive",
     })
    }
  }

  const handleDeleteUser = async () => {
    if (selectedUser) {
      try {
        await deleteUserMutation.mutateAsync(selectedUser.id)
        setShowDeleteModal(false)
        setSelectedUser(null)
       toast({
         title: "Compte supprimé avec succès",
        description: "Le compte de l'utilisateur a bien été supprimé.",
       })
      } catch (error) {
        console.error("Error deleting user:", error)
        toast({
          title: "Erreur lors de la suppression du compte",
          description: "Erreur lors de la suppression du compte de l'utilisateur.",
          variant: "destructive",
        })
      }
    }
  }

  const handleManualVerification = async (userId: string, isVerified: boolean) => {
    try {
      await updateUserMutation.mutateAsync({
        id: userId,
        data: { isVerified },
      })
     toast({
       title: "Statut mis à jour avec ℕ",
       description: "Le statut de l'utilisateur a bien été mis à jour.",
     })
    } catch (error) {
      console.error("Error updating verification status:", error)
     toast({
       title: "Erreur lors de la mise à jour du statut",
       description: "Erreur lors de la mise à jour du statut de l'utilisateur.",
       variant: "destructive",
     })
    }
  }

  const handleUpdateUserInfo = async (data: any) => {
    try {
      await updateUserMutation.mutateAsync({
        id: selectedUser.id,
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          birthDate: data.birthDate,
          birthPlace: data.birthPlace,
          nationality: data.nationality,
          city: data.city,
        },
      })
     toast({
       title: "Informations mises à jour",
       description: "Vos informations ont bien été mis à jour.",
     })
      setShowEditInfoModal(false)
    } catch (error) {
      console.error("Error updating user info:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour des informations",
        variant: "destructive",
      })
      // showError("Erreur lors de la mise à jour des informations")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case "active":
        return <Badge className="bg-green-500 text-white hover:bg-green-500">Actif</Badge>
      case "inactive":
        return <Badge className="bg-red-500 text-white hover:bg-red-500">Inactif</Badge>
      case "blocked":
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500">Bloqué</Badge>
      case "pending":
        return <Badge className="bg-yellow-500 text-white hover:bg-yellow-500">En attente</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const resetForm = () => {
    setCitoyenData({
      nom: "",
      prenom: "",
      dateNaissance: "",
      lieuResidence: "",
      typeDocument: "",
      telephone: "",
      email: "",
      motDePasse: "",
      confirmationMotDePasse: "",
      role: "citizen",
    })
    setDocuments([])
  }

  const renderUserCard = (user: any) => (
    <motion.div
      key={user.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        {getStatusBadge(user.status)}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          {user.phone}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          {new Date(user.createdAt).toLocaleDateString("fr-FR")}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedUser(user)
            setShowDetailsSheet(true)
          }}
          className="flex-1"
        >
          <Eye className="w-4 h-4 mr-1" />
          Voir
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedUser(user)
            setShowEditInfoModal(true)
          }}
          title="Modifier les informations"
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedUser(user)
            setShowEditModal(true)
          }}
          title="Gérer le statut"
          className="text-blue-600 hover:text-blue-700"
        >
          ⚙️
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setSelectedUser(user)
            setShowDeleteModal(true)
          }}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  )

  const renderUserRow = (user: any) => (
    <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-medium text-gray-900">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 text-gray-600">{user.phone}</td>
      <td className="py-4 px-6 text-gray-600">{new Date(user.createdAt).toLocaleDateString("fr-FR")}</td>
      <td className="py-4 px-6">{getStatusBadge(user.status)}</td>
      <td className="py-4 px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedUser(user)
              window.location.href = (`/dashboard/admin/gestion-citoyens/${user.id}`)
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedUser(user)
              setShowEditInfoModal(true)
            }}
            title="Modifier les informations"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedUser(user)
              setShowEditModal(true)
            }}
            title="Gérer le statut"
            className="text-blue-600 hover:text-blue-700"
          >
            ⚙️
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedUser(user)
              setShowDeleteModal(true)
            }}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </td>
    </tr>
  )

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Gestion des citoyens</h1>

        {/* Search and Controls */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom, email, téléphone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button onClick={() => setShowAddModal(true)} className="bg-green-600 hover:bg-green-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Ajouter citoyen
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Users Display */}
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Chargement des citoyens...</div>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{users.map(renderUserCard)}</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <h3 className="text-lg font-semibold text-gray-900">Liste des citoyens</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Citoyen</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Téléphone</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Date d'inscription</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Statut</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>{users.map(renderUserRow)}</tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Ajouter un nouveau citoyen</DialogTitle>
          </DialogHeader>

          <AddCitoyenForm
           //@ts-ignore
            onSubmit={async (data) => {
              try {
                await registerMutation.mutateAsync({
                  firstName: data.firstName,
                  lastName: data.lastName,
                  birthDate: data.birthDate,
                  birthPlace: data.birthPlace,
                  nationality: data.nationality,
                  city: data.city,
                  email: data.email,
                  phone: data.phone,
                  password: "TempPassword123!", 
                  confirmPassword: "TempPassword123!",
                  idType: "cni",
                  idNumber: "",
                  acceptTerms: true,
                  acceptDataPolicy: true,
                   //@ts-ignore
                  profileImage: data.profileImage,
                  documents: data.documents,
                  role: data.role,
                  isVerified: data.isVerified,
                }, {
                  onSuccess: (data) => {
                    console.log("Registration success:", data)
                    // showSuccess("Utilisateur ajouté avec succès")
                     //@ts-ignore
                setNewUserEmail(data.userId)
                  }
                })
                setShowAddModal(false)

                if (!data.isVerified) {
                  setShowVerificationModal(true)
                } else {
                  toast({
                    title: "Compte créé avec succès",
                    description: "Le compte a bien été créé.",
                  })
                }
              } catch (error) {
                console.error("Registration error:", error)
                toast({
                  title: "Erreur lors de la création du compte",
                  description: "Erreur lors de la création du compte.",
                  variant: "destructive",
                })
              }
            }}
            onCancel={() => {
              setShowAddModal(false)
              resetForm()
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Email Verification Modal */}
      <EmailVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        email={newUserEmail}
        onSuccess={() => {
          toast({
            title: "Compte créé et vérifié avec succès",
            description: "Le compte a bien été créé et vérifié.",
          })
          resetForm()
        }}
      />

      {/* Edit User Info Modal */}
      <Dialog open={showEditInfoModal} onOpenChange={setShowEditInfoModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Modifier les informations du citoyen</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <AddCitoyenForm
              initialData={selectedUser}
              isEditing={true}
              onSubmit={handleUpdateUserInfo}
              onCancel={() => setShowEditInfoModal(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Status Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Gérer le statut du citoyen</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <Select
                    value={selectedUser.status}
                    onValueChange={(value) => handleUpdateUserStatus(selectedUser.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                      <SelectItem value="blocked">Bloqué</SelectItem>
                      <SelectItem value="pending">En attente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rôle</label>
                  <Select
                    value={selectedUser.role}
                    onValueChange={(value) => handleUpdateUserRole(selectedUser.id, value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="citizen">Citoyen</SelectItem>
                      <SelectItem value="admin">Administrateur</SelectItem>
                      <SelectItem value="moderator">Modérateur</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Vérification du compte</h3>
                <div className="flex items-center gap-4">
                  <Badge variant={selectedUser.isVerified ? "default" : "secondary"}>
                    {selectedUser.isVerified ? "Vérifié" : "Non vérifié"}
                  </Badge>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManualVerification(selectedUser.id, true)}
                      disabled={selectedUser.isVerified}
                    >
                      Vérifier manuellement
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleManualVerification(selectedUser.id, false)}
                      disabled={!selectedUser.isVerified}
                    >
                      Annuler vérification
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-medium text-gray-900 mb-3">Gestion OTP</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setNewUserEmail(selectedUser.id)
                      setShowEditModal(false)
                      setShowVerificationModal(true)
                    }}
                  >
                    Entrer code OTP
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={async () => {
                      try {
                        await resendOtpMutation.mutateAsync({email: selectedUser.email}) 
                        toast({
                          title: "Code OTP renvoyé",
                          description: "Un nouveau code OTP a été envoyé au citoyen",
                        })
                      } catch (error) {
                        toast({
                          title: "Erreur",
                          description: "Une erreur s'est produite lors du renvoi du code OTP",
                        })
                      }
                    }}
                  >
                    Renvoyer OTP
                  </Button>
                </div>
              </div>

              <div className="flex justify-end gap-4">
                <Button variant="outline" onClick={() => setShowEditModal(false)}>
                  Fermer
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteUser}
        title="Supprimer le citoyen"
        description={`Êtes-vous sûr de vouloir supprimer le compte de ${selectedUser?.firstName} ${selectedUser?.lastName} ? Cette action est irréversible.`}
        isLoading={deleteUserMutation.isPending}
      />

      {/* Details Sheet */}
      <DetailsSheet
        isOpen={showDetailsSheet}
        onClose={() => setShowDetailsSheet(false)}
        item={selectedUser}
         //@ts-ignore
        type="user"
      />
    </div>
  )
}