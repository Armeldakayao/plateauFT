// "use client"

// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Search, Plus, Edit, Trash2, MapPin, Star, Grid3X3, List, Eye, EllipsisVertical, Building2, Pencil } from "lucide-react"
// import Link from "next/link"

// import { getImageUrl } from "@/lib/api/client"
// import { usePlacesQuery } from "@/hooks/places/use-places-queries"
// import {
//   useCreatePlaceMutation,
//   useDeletePlaceMutation,
//   useUpdatePlaceMutation,
// } from "@/hooks/places/use-places-mutations"
// import { useToast } from "@/hooks/use-toast"
// import { PlacesForm } from "@/components/dashboard/places-form"
// import { ConfirmDeleteModal } from "@/components/dashboard/confirm-delete-modal"
// import { DetailsSheet } from "@/components/dashboard/details-sheet"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// export default function PlacesManagerPage() {
//   const { toast } = useToast()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedType, setSelectedType] = useState("all")
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
//   const [editingPlace, setEditingPlace] = useState<any>(null)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//   const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; place: any }>({
//     isOpen: false,
//     place: null,
//   })
//   const [detailsSheet, setDetailsSheet] = useState<{ isOpen: boolean; place: any }>({
//     isOpen: false,
//     place: null,
//   })

//   const {
//     data: placesData,
//     isLoading,
//     error,
//   } = usePlacesQuery({
//     search: searchTerm,
//     type: selectedType !== "all" ? selectedType : undefined,
//     limit: 100,
//     page: 1,
//   })

  
//   const createMutation = useCreatePlaceMutation()
//   const updateMutation = useUpdatePlaceMutation()
//   const deleteMutation = useDeletePlaceMutation()

//   const places = placesData?.data || [
//     {
//       id: "1",
//       name: "Restaurant Le Gourmet",
//       type: "restaurant",
//       address: "123 Rue de la Paix",
//       rating: 4.5,
//       status: "active",
//       createdAt: "2024-01-15",
//       description: "Un restaurant gastronomique exceptionnel.",
//     },
//     {
//       id: "2",
//       name: "Hôtel Central",
//       type: "hotel",
//       address: "45 Avenue Principale",
//       rating: 4.2,
//       status: "active",
//       createdAt: "2024-01-10",
//       description: "Un hôtel confortable et bien situé.",
//     },
//     {
//       id: "3",
//       name: "Parc Municipal",
//       type: "activity",
//       address: "Place de la République",
//       rating: 4.8,
//       status: "active",
//       createdAt: "2024-01-05",
//       description: "Un parc idéal pour les activités extérieures.",
//     },
//   ]

//   const handleDelete = async () => {
//     if (!deleteModal.place) return

//     try {
//       await deleteMutation.mutateAsync(deleteModal.place.id)
//       toast({
//         title: "Succès",
//         description: "Lieu supprimé avec succès",
//       })
//       setDeleteModal({ isOpen: false, place: null })
//     } catch (error) {
//       console.error("Error deleting place:", error)
//       toast({
//         title: "Erreur",
//         description: "Erreur lors de la suppression du lieu",
//         variant: "destructive",
//       })
//     }
//   }

//   const getTypeLabel = (type: string) => {
//     switch (type) {
//       case "restaurant":
//         return "Restaurant"
//       case "hotel":
//         return "Hôtel"
//       case "activity":
//         return "Activité"
//       case "landmark":
//         return "Monument"
//       default:
//         return type
//     }
//   }

//   const getTypeBadge = (type: string) => {
//     const colors = {
//       restaurant: "bg-orange-500",
//       hotel: "bg-blue-500",
//       activity: "bg-green-500",
//       landmark: "bg-purple-500",
//     }
//     return (
//       <Badge className={`${colors[type as keyof typeof colors] || "bg-gray-500"} text-white`}>
//         {getTypeLabel(type)}
//       </Badge>
//     )
//   }

//   const handleCreateSuccess = () => {
//     setIsCreateModalOpen(false)
//     toast({
//       title: "Succès",
//       description: "Lieu créé avec succès",
//     })
//   }

//   const handleEditSuccess = () => {
//     setIsEditModalOpen(false)
//     setEditingPlace(null)
//     toast({
//       title: "Succès",
//       description: "Lieu modifié avec succès",
//     })
//   }

//   const handleEditClick = (place: any) => {
//     setEditingPlace(place)
//     setIsEditModalOpen(true)
//   }

//   const openDeleteModal = (place: any) => {
//     setDeleteModal({ isOpen: true, place })
//   }

//   const openDetailsSheet = (place: any) => {
//     setDetailsSheet({ isOpen: true, place })
//   }

//   if (isLoading) {
//     return (
//       <div className="p-8 bg-gray-50 min-h-screen">
//         <div className="flex items-center justify-center h-64">
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg flex items-center gap-2">
//             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//             Chargement des lieux...
//           </motion.div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="p-8 bg-gray-50 min-h-screen"
//     >
//       <div className="mb-6">
//         <nav className="text-sm text-gray-600">
//           <Link href="/admin" className="hover:text-blue-600 transition-colors">
//             Tableau de bord
//           </Link>
//           <span className="mx-2">›</span>
//           <span className="text-gray-900 font-medium">Gestion des lieux</span>
//         </nav>
//       </div>

//       <div className="mb-8">
//         <motion.h1
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.1 }}
//           className="text-3xl font-bold text-gray-900 mb-6"
//         >
//           Gestion des lieux
//         </motion.h1>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//          className="bg-white rounded-[10px] shadow-sm border border-gray-300 p-6 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-4 items-end">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher un lieu</label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Rechercher par nom, adresse..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Select value={selectedType} onValueChange={setSelectedType}>
//                 <SelectTrigger className="w-48 border border-gray-300 rounded-[5px]">
//                   <SelectValue placeholder="Type de lieu" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Tous les types</SelectItem>
//                   <SelectItem value="restaurant">Restaurants</SelectItem>
//                   <SelectItem value="hotel">Hôtels</SelectItem>
//                   <SelectItem value="activity">Activités</SelectItem>
//                   <SelectItem value="landmark">Monuments</SelectItem>
//                 </SelectContent>
//               </Select>
//              <div className="flex border rounded-[7px]">
//                 <Button
//                   variant={viewMode === "grid" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("grid")}
//                   className="rounded-r-none w-full h-full rounded-l-[5px]"
//                 >
//                   <Grid3X3 className="w-4 h-4" />
//                 </Button>
//                 <Button
//                   variant={viewMode === "list" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("list")}
//                   className="rounded-l-none w-full h-full rounded-r-[5px]"
//                 >
//                   <List className="w-4 h-4" />
//                 </Button>
//               </div>
//               <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
//                 <DialogTrigger asChild>
//                   <Button className="bg-primary text-white">
//                     <Plus className="w-4 h-4 mr-2" />
//                     Nouveau lieu
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
//                   <DialogHeader>
//                     <DialogTitle>Créer un nouveau lieu</DialogTitle>
//                   </DialogHeader>
//                   <div className="max-h-[calc(90vh-80px)] overflow-hidden">
//                     <PlacesForm
//                       mode="create"
//                       onSuccess={() => setIsCreateModalOpen(false)}
//                       onCancel={() => setIsCreateModalOpen(false)}
//                     />
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {places.length === 0 && !isLoading && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="text-center py-16"
//           >
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
//               <Building2 className="w-24 h-24 text-gray-300 mx-auto mb-6" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun lieu trouvé</h3>
//               <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                 {searchTerm || selectedType !== "all"
//                   ? "Aucun lieu ne correspond à vos critères de recherche. Essayez de modifier vos filtres."
//                   : "Vous n'avez pas encore ajouté de lieux. Commencez par créer votre premier lieu."}
//               </p>
//               {/* {!searchTerm && selectedType === "all" && (
//                 <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
//                   <DialogTrigger asChild>
//                     <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//                       <Plus className="w-4 h-4 mr-2" />
//                       Ajouter votre premier lieu
//                     </Button>
//                   </DialogTrigger>
//                   <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
//                     <DialogHeader>
//                       <DialogTitle>Créer un nouveau lieu</DialogTitle>
//                     </DialogHeader>
//                     <div className="max-h-[calc(90vh-80px)] overflow-hidden">
//                       <PlacesForm
//                         mode="create"
//                         onSuccess={() => setIsCreateModalOpen(false)}
//                         onCancel={() => setIsCreateModalOpen(false)}
//                       />
//                     </div>
//                   </DialogContent>
//                 </Dialog>
//               )} */}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       <AnimatePresence>
//         {places.length > 0 && viewMode === "grid" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {places.map((place, index) => (
//               <motion.div
//                 key={place.id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden rounded-lg group">
//                   {/* Poster en haut */}
//                   {place.poster && (
//                     <div className="relative h-40 w-full cursor-pointer group" onClick={() => openDetailsSheet(place)}>
//                       <img
//                         src={getImageUrl(place.poster) || "/placeholder.svg"}
//                         alt={place.name}
//                         className="w-full h-full object-cover transition-transform group-hover:scale-105"
//                       />
//                       <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                         <Eye className="w-8 h-8 text-white" />
//                       </div>
//                     </div>
//                   )}

//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <CardTitle className="text-lg font-semibold line-clamp-1">{place.name}</CardTitle>
//                         <div className="flex items-center gap-2 mt-2">
//                           <MapPin className="w-4 h-4 text-gray-500" />
//                           <p className="text-sm text-gray-500 line-clamp-1">{place.address}</p>
//                         </div>
//                       </div>
//                       {getTypeBadge(place.type)}
//                     </div>
//                   </CardHeader>

//                   <CardContent>
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="text-sm text-gray-500">{new Date(place.createdAt).toLocaleDateString()}</span>
//                       <div className="flex items-center gap-1">
//                         <div className="flex justify-end">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <button className="p-2 rounded-full hover:bg-gray-100 transition">
//                                 <EllipsisVertical className="w-5 h-5 text-gray-600" />
//                               </button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end" className="rounded-[4px] bg-white">
//                               <DropdownMenuItem onClick={() => openDetailsSheet(place)}>
//                                 <Eye className="w-4 h-4 mr-2" /> Voir
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => handleEditClick(place)}>
//                                 <Edit className="w-4 h-4 mr-2" /> Modifier
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => openDeleteModal(place)}
//                                 className="text-red-600 focus:text-red-700"
//                               >
//                                 <Trash2 className="w-4 h-4 mr-2" /> Supprimer
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </div>
//                       </div>
//                     </div>
//                     <p>{place.description}</p>
//                     {/* Menu d'actions */}
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* List view */}
//       {places.length > 0 && viewMode === "list" && (
//         <div className="bg-white rounded-[10px] shadow-sm border border-gray-200">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b">
//                 <tr>
//                   <th className="text-left p-4 font-medium text-gray-900">Lieu</th>
//                   <th className="text-left p-4 font-medium text-gray-900">Type</th>
//                   <th className="text-left p-4 font-medium text-gray-900">Adresse</th>
//                   <th className="text-left p-4 font-medium text-gray-900">Note</th>
//                   <th className="text-left p-4 font-medium text-gray-900">Date</th>
//                   <th className="text-right p-4 font-medium text-gray-900">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {places.map((place) => (
//                   <tr key={place.id} className="border-b hover:bg-gray-50">
//                     <td className="p-4">
//                       <div className="flex items-center gap-3">
//                         {place.poster && (
//                           <img
//                             src={getImageUrl(place.poster) || "/placeholder.svg"}
//                             alt={place.name}
//                             className="w-12 h-12 rounded-lg object-cover"
//                           />
//                         )}
//                         <div>
//                           <p className="font-medium text-gray-900">{place.title}</p>
//                           {place.description && (
//                             <p className="text-sm text-gray-500 line-clamp-1">{place.description}</p>
//                           )}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="p-4">{getTypeBadge(place.type)}</td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-2">
//                         <MapPin className="w-4 h-4 text-gray-500" />
//                         <span className="text-sm text-gray-600">{place.address}</span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-1">
//                         <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                         <span className="text-sm font-medium">{place.rating}</span>
//                       </div>
//                     </td>
//                     <td className="p-4">
//                       <span className="text-sm text-gray-500">{new Date(place.createdAt).toLocaleDateString()}</span>
//                     </td>
//                     <td className="p-4">
//                       <div className="flex items-center gap-4 justify-end">
//                         <Button
//                          title="Voir Lieu"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => openDetailsSheet(place)}
//                           className="text-blue-600 p-0 hover:text-blue-700 hover:bg-blue-50"
//                         >
//                           <Eye className="w-4 h-4" />
//                         </Button>
//                         <Dialog
//                           open={isEditModalOpen && editingPlace?.id === place.id}
//                           onOpenChange={(open) => {
//                             if (!open) {
//                               setIsEditModalOpen(false)
//                               setEditingPlace(null)
//                             }
//                           }}
//                         >
//                           <DialogTrigger asChild>
//                             <Button
//                             title="Modifier Lieu"
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => handleEditClick(place)}
//                               className="text-gray-600 p-0 hover:text-gray-700 hover:bg-gray-50"
//                             >
//                               <Pencil className="w-4 h-4" />
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
//                             <DialogHeader>
//                               <DialogTitle>Modifier le lieu</DialogTitle>
//                             </DialogHeader>
//                             {editingPlace && (
//                               <PlacesForm
//                                 mode="edit"
//                                 initialData={editingPlace}
//                                 onSuccess={handleEditSuccess}
//                                 onCancel={() => {
//                                   setIsEditModalOpen(false)
//                                   setEditingPlace(null)
//                                 }}
//                               />
//                             )}
//                           </DialogContent>
//                         </Dialog>
//                         <Button
//                          title="Modifier Lieu"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => openDeleteModal(place)}
//                           className="text-red-600 p-0 hover:text-red-700 hover:bg-red-50"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </Button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5 }}
//         className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8"
//       >
//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-orange-600">
//               {places.filter((p) => p.type === "restaurant").length}
//             </div>
//             <p className="text-sm text-gray-600">Restaurants</p>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-blue-600">{places.filter((p) => p.type === "hotel").length}</div>
//             <p className="text-sm text-gray-600">Hôtels</p>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-green-600">
//               {places.filter((p) => p.type === "activity").length}
//             </div>
//             <p className="text-sm text-gray-600">Activités</p>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-purple-600">
//               {places.filter((p) => p.type === "landmark").length}
//             </div>
//             <p className="text-sm text-gray-600">Monuments</p>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Modals and Sheets */}
//       <ConfirmDeleteModal
//         isOpen={deleteModal.isOpen}
//         onClose={() => setDeleteModal({ isOpen: false, place: null })}
//         onConfirm={handleDelete}
//         title={deleteModal.place?.name || ""}
//         description="Cette action est irréversible."
//         isLoading={deleteMutation.isPending}
//       />

//       <DetailsSheet
//         isOpen={detailsSheet.isOpen}
//         onClose={() => setDetailsSheet({ isOpen: false, place: null })}
//         item={detailsSheet.place}
//         type="place"
//       />
//     </motion.div>
//   )
// }




// "use client"

// import { useState, useEffect, useCallback, useRef } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Search, Plus, Edit, Trash2, MapPin, Star, Grid3X3, List, Eye, EllipsisVertical, Building2, Pencil, ChevronLeft, ChevronRight } from "lucide-react"
// import Link from "next/link"

// import { getImageUrl } from "@/lib/api/client"
// import { usePlacesQuery } from "@/hooks/places/use-places-queries"
// import {
//   useCreatePlaceMutation,
//   useDeletePlaceMutation,
//   useUpdatePlaceMutation,
// } from "@/hooks/places/use-places-mutations"
// import { useToast } from "@/hooks/use-toast"
// import { PlacesForm } from "@/components/dashboard/places-form"
// import { ConfirmDeleteModal } from "@/components/dashboard/confirm-delete-modal"
// import { DetailsSheet } from "@/components/dashboard/details-sheet"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// // Hook personnalisé pour le debounce
// function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState<T>(value)

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value)
//     }, delay)

//     return () => {
//       clearTimeout(handler)
//     }
//   }, [value, delay])

//   return debouncedValue
// }

// // Hook pour le scroll infini
// function useInfiniteScroll(callback: () => void, hasMore: boolean, loading: boolean) {
//   const observer = useRef<IntersectionObserver>()
  
//   const lastElementRef = useCallback((node: HTMLDivElement) => {
//     if (loading) return
//     if (observer.current) observer.current.disconnect()
//     observer.current = new IntersectionObserver(entries => {
//       if (entries[0].isIntersecting && hasMore) {
//         callback()
//       }
//     })
//     if (node) observer.current.observe(node)
//   }, [loading, hasMore, callback])

//   return lastElementRef
// }

// export default function PlacesManagerPage() {
//   const { toast } = useToast()
//   const [searchTerm, setSearchTerm] = useState("")
//   const [selectedType, setSelectedType] = useState("all")
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
//   const [editingPlace, setEditingPlace] = useState<any>(null)
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
//   const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; place: any }>({
//     isOpen: false,
//     place: null,
//   })
//   const [detailsSheet, setDetailsSheet] = useState<{ isOpen: boolean; place: any }>({
//     isOpen: false,
//     place: null,
//   })

//   // États pour la pagination et le scroll infini
//   const [currentPage, setCurrentPage] = useState(1)
//   const [allPlaces, setAllPlaces] = useState<any[]>([])
//   const [hasMore, setHasMore] = useState(true)
//   const [isLoadingMore, setIsLoadingMore] = useState(false)
  
//   const ITEMS_PER_PAGE = 6 // Pour la vue grid
//   const LIST_ITEMS_PER_PAGE = 5 // Pour la vue list

//   // Debounce la recherche pour éviter trop d'appels API
//   const debouncedSearchTerm = useDebounce(searchTerm, 500)

//   const {
//     data: placesData,
//     isLoading,
//     error,
//     refetch
//   } = usePlacesQuery({
//     search: searchTerm?debouncedSearchTerm:"",
//     type: selectedType !== "all" ? selectedType : undefined,
//     limit: viewMode === "grid" ? ITEMS_PER_PAGE : LIST_ITEMS_PER_PAGE,
//     page: currentPage,
//   })

//   const createMutation = useCreatePlaceMutation()
//   const updateMutation = useUpdatePlaceMutation()
//   const deleteMutation = useDeletePlaceMutation()

//   // Données de fallback
//   const fallbackPlaces = [
//     {
//       id: "1",
//       name: "Restaurant Le Gourmet",
//       title: "Restaurant Le Gourmet",
//       type: "restaurant",
//       address: "123 Rue de la Paix",
//       rating: 4.5,
//       status: "active",
//       createdAt: "2024-01-15",
//       description: "Un restaurant gastronomique exceptionnel.",
//       poster: null
//     },
//     {
//       id: "2",
//       name: "Hôtel Central",
//       title: "Hôtel Central",
//       type: "hotel",
//       address: "45 Avenue Principale",
//       rating: 4.2,
//       status: "active",
//       createdAt: "2024-01-10",
//       description: "Un hôtel confortable et bien situé.",
//       poster: null
//     },
//     {
//       id: "3",
//       name: "Parc Municipal",
//       title: "Parc Municipal",
//       type: "activity",
//       address: "Place de la République",
//       rating: 4.8,
//       status: "active",
//       createdAt: "2024-01-05",
//       description: "Un parc idéal pour les activités extérieures.",
//       poster: null
//     },
//   ]

//   // Gestion des données selon le mode de vue
//   useEffect(() => {
//     if (placesData?.data) {
//       if (viewMode === "grid") {
//         if (currentPage === 1) {
//           setAllPlaces(placesData.data)
//         } else {
//           setAllPlaces(prev => [...prev, ...placesData.data])
//         }
//         setHasMore(placesData.data.length === ITEMS_PER_PAGE)
//       }
//     } else if (currentPage === 1) {
//       // Utiliser les données de fallback seulement pour la première page
//       setAllPlaces(fallbackPlaces)
//       setHasMore(false)
//     }
//     setIsLoadingMore(false)
//   }, [placesData, currentPage, viewMode])

//   // Reset quand on change de type ou de recherche
//   useEffect(() => {
//     setCurrentPage(1)
//     setAllPlaces([])
//     setHasMore(true)
//   }, [debouncedSearchTerm, selectedType, viewMode])

//   // Fonction pour charger plus d'éléments (scroll infini)
//   const loadMore = useCallback(() => {
//     if (!isLoadingMore && hasMore) {
//       setIsLoadingMore(true)
//       setCurrentPage(prev => prev + 1)
//     }
//   }, [isLoadingMore, hasMore])

//   // Hook pour le scroll infini
//   const lastElementRef = useInfiniteScroll(loadMore, hasMore, isLoadingMore)

//   const places = viewMode === "grid" ? allPlaces : (placesData?.data || fallbackPlaces)
//   //@ts-ignore
//   const totalPages = Math.ceil((placesData?.total || fallbackPlaces.length) / LIST_ITEMS_PER_PAGE)

//   const handleDelete = async () => {
//     if (!deleteModal.place) return

//     try {
//       await deleteMutation.mutateAsync(deleteModal.place.id)
//       toast({
//         title: "Succès",
//         description: "Lieu supprimé avec succès",
//       })
//       setDeleteModal({ isOpen: false, place: null })
//       // Rafraîchir les données
//       refetch()
//     } catch (error) {
//       console.error("Error deleting place:", error)
//       toast({
//         title: "Erreur",
//         description: "Erreur lors de la suppression du lieu",
//         variant: "destructive",
//       })
//     }
//   }

//   const getTypeLabel = (type: string) => {
//     switch (type) {
//       case "restaurant":
//         return "Restaurant"
//       case "hotel":
//         return "Hôtel"
//       case "activity":
//         return "Activité"
//       case "landmark":
//         return "Monument"
//       default:
//         return type
//     }
//   }

//   const getTypeBadge = (type: string) => {
//     const colors = {
//       restaurant: "bg-orange-500",
//       hotel: "bg-blue-500",
//       activity: "bg-green-500",
//       landmark: "bg-purple-500",
//     }
//     return (
//       <Badge className={`${colors[type as keyof typeof colors] || "bg-gray-500"} text-white`}>
//         {getTypeLabel(type)}
//       </Badge>
//     )
//   }

//   const handleCreateSuccess = () => {
//     setIsCreateModalOpen(false)
//     toast({
//       title: "Succès",
//       description: "Lieu créé avec succès",
//     })
//     refetch()
//   }

//   const handleEditSuccess = () => {
//     setIsEditModalOpen(false)
//     setEditingPlace(null)
//     toast({
//       title: "Succès",
//       description: "Lieu modifié avec succès",
//     })
//     refetch()
//   }

//   const handleEditClick = (place: any) => {
//     setEditingPlace(place)
//     setIsEditModalOpen(true)
//   }

//   const openDeleteModal = (place: any) => {
//     setDeleteModal({ isOpen: true, place })
//   }

//   const openDetailsSheet = (place: any) => {
//     setDetailsSheet({ isOpen: true, place })
//   }

//   // Pagination pour la vue liste
//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//   }

//   const getPaginationRange = () => {
//     const range = []
//     const showPages = 5
//     let start = Math.max(1, currentPage - Math.floor(showPages / 2))
//     let end = Math.min(totalPages, start + showPages - 1)
    
//     if (end - start + 1 < showPages) {
//       start = Math.max(1, end - showPages + 1)
//     }
    
//     for (let i = start; i <= end; i++) {
//       range.push(i)
//     }
    
//     return range
//   }

//   if (isLoading && currentPage === 1) {
//     return (
//       <div className="p-8 bg-gray-50 min-h-screen">
//         <div className="flex items-center justify-center h-64">
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg flex items-center gap-2">
//             <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
//             Chargement des lieux...
//           </motion.div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//       className="p-8 bg-gray-50 min-h-screen"
//     >
//       <div className="mb-6">
//         <nav className="text-sm text-gray-600">
//           <Link href="/admin" className="hover:text-blue-600 transition-colors">
//             Tableau de bord
//           </Link>
//           <span className="mx-2">›</span>
//           <span className="text-gray-900 font-medium">Gestion des lieux</span>
//         </nav>
//       </div>

//       <div className="mb-8">
//         <motion.h1
//           initial={{ opacity: 0, x: -20 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ delay: 0.1 }}
//           className="text-3xl font-bold text-gray-900 mb-6"
//         >
//           Gestion des lieux
//         </motion.h1>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//          className="bg-white rounded-[10px] shadow-sm border border-gray-300 p-6 mb-6"
//         >
//           <div className="flex flex-col lg:flex-row gap-4 items-end">
//             <div className="flex-1">
//               <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher un lieu</label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
//                 <Input
//                   placeholder="Rechercher par nom, adresse..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//                 {/* Indicateur de recherche */}
//                 {searchTerm !== debouncedSearchTerm && (
//                   <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                     <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Select value={selectedType} onValueChange={setSelectedType}>
//                 <SelectTrigger className="w-48 border border-gray-300 rounded-[5px]">
//                   <SelectValue placeholder="Type de lieu" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Tous les types</SelectItem>
//                   <SelectItem value="restaurant">Restaurants</SelectItem>
//                   <SelectItem value="hotel">Hôtels</SelectItem>
//                   <SelectItem value="activity">Activités</SelectItem>
//                   <SelectItem value="landmark">Monuments</SelectItem>
//                 </SelectContent>
//               </Select>
//              <div className="flex border rounded-[7px]">
//                 <Button
//                   variant={viewMode === "grid" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("grid")}
//                   className="rounded-r-none w-full h-full rounded-l-[5px]"
//                 >
//                   <Grid3X3 className="w-4 h-4" />
//                 </Button>
//                 <Button
//                   variant={viewMode === "list" ? "default" : "ghost"}
//                   size="sm"
//                   onClick={() => setViewMode("list")}
//                   className="rounded-l-none w-full h-full rounded-r-[5px]"
//                 >
//                   <List className="w-4 h-4" />
//                 </Button>
//               </div>
//               <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
//                 <DialogTrigger asChild>
//                   <Button className="bg-primary text-white">
//                     <Plus className="w-4 h-4 mr-2" />
//                     Nouveau lieu
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
//                   <DialogHeader>
//                     <DialogTitle>Créer un nouveau lieu</DialogTitle>
//                   </DialogHeader>
//                   <div className="max-h-[calc(90vh-80px)] overflow-hidden">
//                     <PlacesForm
//                       mode="create"
//                       onSuccess={handleCreateSuccess}
//                       onCancel={() => setIsCreateModalOpen(false)}
//                     />
//                   </div>
//                 </DialogContent>
//               </Dialog>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       <AnimatePresence>
//         {places.length === 0 && !isLoading && (
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 0.9 }}
//             className="text-center py-16"
//           >
//             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
//               <Building2 className="w-24 h-24 text-gray-300 mx-auto mb-6" />
//               <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun lieu trouvé</h3>
//               <p className="text-gray-500 mb-6 max-w-md mx-auto">
//                 {searchTerm || selectedType !== "all"
//                   ? "Aucun lieu ne correspond à vos critères de recherche. Essayez de modifier vos filtres."
//                   : "Vous n'avez pas encore ajouté de lieux. Commencez par créer votre premier lieu."}
//               </p>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Vue Grid avec scroll infini */}
//       <AnimatePresence>
//         {places.length > 0 && viewMode === "grid" && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
//           >
//             {places.map((place, index) => (
//               <motion.div
//                 key={place.id}
//                 ref={index === places.length - 1 ? lastElementRef : null}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: index * 0.1 }}
//               >
//                 <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden rounded-lg group">
//                   {/* Poster en haut */}
//                   {place.poster && (
//                     <div className="relative h-40 w-full cursor-pointer group" onClick={() => openDetailsSheet(place)}>
//                       <img
//                         src={getImageUrl(place.poster) || "/placeholder.svg"}
//                         alt={place.name}
//                         className="w-full h-full object-cover transition-transform group-hover:scale-105"
//                       />
//                       <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                         <Eye className="w-8 h-8 text-white" />
//                       </div>
//                     </div>
//                   )}

//                   <CardHeader>
//                     <div className="flex items-start justify-between">
//                       <div className="flex-1">
//                         <CardTitle className="text-lg font-semibold line-clamp-1">{place.name}</CardTitle>
//                         <div className="flex items-center gap-2 mt-2">
//                           <MapPin className="w-4 h-4 text-gray-500" />
//                           <p className="text-sm text-gray-500 line-clamp-1">{place.address}</p>
//                         </div>
//                       </div>
//                       {getTypeBadge(place.type)}
//                     </div>
//                   </CardHeader>

//                   <CardContent>
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="text-sm text-gray-500">{new Date(place.createdAt).toLocaleDateString()}</span>
//                       <div className="flex items-center gap-1">
//                         <div className="flex justify-end">
//                           <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                               <button className="p-2 rounded-full hover:bg-gray-100 transition">
//                                 <EllipsisVertical className="w-5 h-5 text-gray-600" />
//                               </button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end" className="rounded-[4px] bg-white">
//                               <DropdownMenuItem onClick={() => openDetailsSheet(place)}>
//                                 <Eye className="w-4 h-4 mr-2" /> Voir
//                               </DropdownMenuItem>
//                               <DropdownMenuItem onClick={() => handleEditClick(place)}>
//                                 <Edit className="w-4 h-4 mr-2" /> Modifier
//                               </DropdownMenuItem>
//                               <DropdownMenuItem
//                                 onClick={() => openDeleteModal(place)}
//                                 className="text-red-600 focus:text-red-700"
//                               >
//                                 <Trash2 className="w-4 h-4 mr-2" /> Supprimer
//                               </DropdownMenuItem>
//                             </DropdownMenuContent>
//                           </DropdownMenu>
//                         </div>
//                       </div>
//                     </div>
//                     <p className="text-sm text-gray-600 line-clamp-2">{place.description}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Indicateur de chargement pour le scroll infini */}
//       {viewMode === "grid" && isLoadingMore && (
//         <div className="flex justify-center mt-8">
//           <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//         </div>
//       )}

//       {/* Vue Liste avec pagination */}
//       {places.length > 0 && viewMode === "list" && (
//         <div className="space-y-6">
//           <div className="bg-white rounded-[10px] shadow-sm border border-gray-200">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50 border-b">
//                   <tr>
//                     <th className="text-left p-4 font-medium text-gray-900">Lieu</th>
//                     <th className="text-left p-4 font-medium text-gray-900">Type</th>
//                     <th className="text-left p-4 font-medium text-gray-900">Adresse</th>
//                     <th className="text-left p-4 font-medium text-gray-900">Note</th>
//                     <th className="text-left p-4 font-medium text-gray-900">Date</th>
//                     <th className="text-right p-4 font-medium text-gray-900">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {places.map((place) => (
//                     <tr key={place.id} className="border-b hover:bg-gray-50">
//                       <td className="p-4">
//                         <div className="flex items-center gap-3">
//                           {place.poster && (
//                             <img
//                               src={getImageUrl(place.poster) || "/placeholder.svg"}
//                               alt={place.name}
//                               className="w-12 h-12 rounded-lg object-cover"
//                             />
//                           )}
//                           <div>
//                             <p className="font-medium text-gray-900">{place.title || place.name}</p>
//                             {place.description && (
//                               <p className="text-sm text-gray-500 line-clamp-1">{place.description}</p>
//                             )}
//                           </div>
//                         </div>
//                       </td>
//                       <td className="p-4">{getTypeBadge(place.type)}</td>
//                       <td className="p-4">
//                         <div className="flex items-center gap-2">
//                           <MapPin className="w-4 h-4 text-gray-500" />
//                           <span className="text-sm text-gray-600">{place.address}</span>
//                         </div>
//                       </td>
//                       <td className="p-4">
//                         <div className="flex items-center gap-1">
//                           <Star className="w-4 h-4 text-yellow-500 fill-current" />
//                           <span className="text-sm font-medium">{place.rating}</span>
//                         </div>
//                       </td>
//                       <td className="p-4">
//                         <span className="text-sm text-gray-500">{new Date(place.createdAt).toLocaleDateString()}</span>
//                       </td>
//                       <td className="p-4">
//                         <div className="flex items-center gap-4 justify-end">
//                           <Button
//                            title="Voir Lieu"
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => openDetailsSheet(place)}
//                             className="text-blue-600 p-0 hover:text-blue-700 hover:bg-blue-50"
//                           >
//                             <Eye className="w-4 h-4" />
//                           </Button>
//                           <Dialog
//                             open={isEditModalOpen && editingPlace?.id === place.id}
//                             onOpenChange={(open) => {
//                               if (!open) {
//                                 setIsEditModalOpen(false)
//                                 setEditingPlace(null)
//                               }
//                             }}
//                           >
//                             <DialogTrigger asChild>
//                               <Button
//                               title="Modifier Lieu"
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={() => handleEditClick(place)}
//                                 className="text-gray-600 p-0 hover:text-gray-700 hover:bg-gray-50"
//                               >
//                                 <Pencil className="w-4 h-4" />
//                               </Button>
//                             </DialogTrigger>
//                             <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
//                               <DialogHeader>
//                                 <DialogTitle>Modifier le lieu</DialogTitle>
//                               </DialogHeader>
//                               {editingPlace && (
//                                 <PlacesForm
//                                   mode="edit"
//                                   initialData={editingPlace}
//                                   onSuccess={handleEditSuccess}
//                                   onCancel={() => {
//                                     setIsEditModalOpen(false)
//                                     setEditingPlace(null)
//                                   }}
//                                 />
//                               )}
//                             </DialogContent>
//                           </Dialog>
//                           <Button
//                            title="Supprimer Lieu"
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => openDeleteModal(place)}
//                             className="text-red-600 p-0 hover:text-red-700 hover:bg-red-50"
//                           >
//                             <Trash2 className="w-4 h-4" />
//                           </Button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* Pagination pour la vue liste */}
//           {totalPages > 1 && (
//             <div className="flex items-center justify-between">
//               <div className="text-sm text-gray-700">
//                 Page {currentPage} sur {totalPages}
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handlePageChange(currentPage - 1)}
//                   disabled={currentPage === 1 || isLoading}
//                   className="flex items-center gap-1"
//                 >
//                   <ChevronLeft className="w-4 h-4" />
//                   Précédent
//                 </Button>
                
//                 {getPaginationRange().map((page) => (
//                   <Button
//                     key={page}
//                     variant={currentPage === page ? "default" : "outline"}
//                     size="sm"
//                     onClick={() => handlePageChange(page)}
//                     disabled={isLoading}
//                     className="min-w-[32px]"
//                   >
//                     {page}
//                   </Button>
//                 ))}
                
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => handlePageChange(currentPage + 1)}
//                   disabled={currentPage === totalPages || isLoading}
//                   className="flex items-center gap-1"
//                 >
//                   Suivant
//                   <ChevronRight className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Statistiques */}
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5 }}
//         className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8"
//       >
//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-orange-600">
//               {places.filter((p) => p.type === "restaurant").length}
//             </div>
//             <p className="text-sm text-gray-600">Restaurants</p>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-blue-600">{places.filter((p) => p.type === "hotel").length}</div>
//             <p className="text-sm text-gray-600">Hôtels</p>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-green-600">
//               {places.filter((p) => p.type === "activity").length}
//             </div>
//             <p className="text-sm text-gray-600">Activités</p>
//           </CardContent>
//         </Card>
//         <Card className="hover:shadow-md transition-shadow">
//           <CardContent className="p-4">
//             <div className="text-2xl font-bold text-purple-600">
//               {places.filter((p) => p.type === "landmark").length}
//             </div>
//             <p className="text-sm text-gray-600">Monuments</p>
//           </CardContent>
//         </Card>
//       </motion.div>

//       {/* Modals and Sheets */}
//       <ConfirmDeleteModal
//         isOpen={deleteModal.isOpen}
//         onClose={() => setDeleteModal({ isOpen: false, place: null })}
//         onConfirm={handleDelete}
//         title={deleteModal.place?.name || ""}
//         description="Cette action est irréversible."
//         isLoading={deleteMutation.isPending}
//       />

//       <DetailsSheet
//         isOpen={detailsSheet.isOpen}
//         onClose={() => setDetailsSheet({ isOpen: false, place: null })}
//         item={detailsSheet.place}
//         type="place"
//       />
//     </motion.div>
//   )
// }



"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, Edit, Trash2, MapPin, Star, Grid3X3, List, Eye, EllipsisVertical, Building2, Pencil, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import { getImageUrl } from "@/lib/api/client"
import { usePlacesQuery } from "@/hooks/places/use-places-queries"
import {
  useCreatePlaceMutation,
  useDeletePlaceMutation,
  useUpdatePlaceMutation,
} from "@/hooks/places/use-places-mutations"
import { useToast } from "@/hooks/use-toast"
import { PlacesForm } from "@/components/dashboard/places-form"
import { ConfirmDeleteModal } from "@/components/dashboard/confirm-delete-modal"
import { DetailsSheet } from "@/components/dashboard/details-sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Hook personnalisé pour le debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Hook pour le scroll infini
function useInfiniteScroll(callback: () => void, hasMore: boolean, loading: boolean) {
  const observer = useRef<IntersectionObserver>()
  
  const lastElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        callback()
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore, callback])

  return lastElementRef
}

export default function PlacesManagerPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [editingPlace, setEditingPlace] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; place: any }>({
    isOpen: false,
    place: null,
  })
  const [detailsSheet, setDetailsSheet] = useState<{ isOpen: boolean; place: any }>({
    isOpen: false,
    place: null,
  })

  // États pour la pagination et le scroll infini
  const [currentPage, setCurrentPage] = useState(1)
  const [allPlaces, setAllPlaces] = useState<any[]>([])
  const [hasMore, setHasMore] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [shouldUseFallback, setShouldUseFallback] = useState(false)
  
  const ITEMS_PER_PAGE = 6 // Pour la vue grid
  const LIST_ITEMS_PER_PAGE = 5 // Pour la vue list

  // Debounce la recherche pour éviter trop d'appels API
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  const queryParams = {
  type: selectedType !== "all" ? selectedType : undefined,
  limit: viewMode === "grid" ? ITEMS_PER_PAGE : LIST_ITEMS_PER_PAGE,
  page: currentPage,
  ...(debouncedSearchTerm ? { search: searchTerm?.length > 0?debouncedSearchTerm:"" } : {})
}

const {
  data: placesData,
  isLoading,
  error,
  refetch
} = usePlacesQuery(queryParams)


  const createMutation = useCreatePlaceMutation()
  const updateMutation = useUpdatePlaceMutation()
  const deleteMutation = useDeletePlaceMutation()

  // Données de fallback (seulement pour les cas où il n'y a pas de recherche/filtre)
  const fallbackPlaces = [
    {
      id: "1",
      name: "Restaurant Le Gourmet",
      title: "Restaurant Le Gourmet",
      type: "restaurant",
      address: "123 Rue de la Paix",
      rating: 4.5,
      status: "active",
      createdAt: "2024-01-15",
      description: "Un restaurant gastronomique exceptionnel.",
      poster: null
    },
    {
      id: "2",
      name: "Hôtel Central",
      title: "Hôtel Central",
      type: "hotel",
      address: "45 Avenue Principale",
      rating: 4.2,
      status: "active",
      createdAt: "2024-01-10",
      description: "Un hôtel confortable et bien situé.",
      poster: null
    },
    {
      id: "3",
      name: "Parc Municipal",
      title: "Parc Municipal",
      type: "activity",
      address: "Place de la République",
      rating: 4.8,
      status: "active",
      createdAt: "2024-01-05",
      description: "Un parc idéal pour les activités extérieures.",
      poster: null
    },
    {
      id: "4",
      name: "Musée d'Histoire",
      title: "Musée d'Histoire",
      type: "landmark",
      address: "10 Boulevard de la Culture",
      rating: 4.3,
      status: "active",
      createdAt: "2024-01-12",
      description: "Un musée riche en histoire locale.",
      poster: null
    },
    {
      id: "5",
      name: "Café des Arts",
      title: "Café des Arts",
      type: "restaurant",
      address: "22 Rue des Artistes",
      rating: 4.1,
      status: "active",
      createdAt: "2024-01-08",
      description: "Un café chaleureux avec une ambiance artistique.",
      poster: null
    },
    {
      id: "6",
      name: "Hôtel de Luxe",
      title: "Hôtel de Luxe",
      type: "hotel",
      address: "100 Avenue du Prestige",
      rating: 4.7,
      status: "active",
      createdAt: "2024-01-03",
      description: "Un hôtel de luxe avec service premium.",
      poster: null
    },
  ]

  // Détermine si on doit utiliser les données de fallback
  const hasSearchOrFilter = debouncedSearchTerm || selectedType !== "all"
  
  // Gestion des données selon le mode de vue
  useEffect(() => {
    if (placesData?.data) {
      // Si on a des données de l'API
      setShouldUseFallback(false)
      if (viewMode === "grid") {
        if (currentPage === 1) {
          setAllPlaces(placesData.data)
        } else {
          setAllPlaces(prev => [...prev, ...placesData.data])
        }
        setHasMore(placesData.data.length === ITEMS_PER_PAGE)
      }
    } else if (error || (!isLoading && !placesData)) {
      // Si erreur ou pas de données de l'API
      if (!hasSearchOrFilter) {
        // Utiliser les données de fallback seulement s'il n'y a pas de recherche/filtre
        setShouldUseFallback(true)
        if (currentPage === 1) {
          setAllPlaces(fallbackPlaces.slice(0, ITEMS_PER_PAGE))
          setHasMore(fallbackPlaces.length > ITEMS_PER_PAGE)
        } else {
          const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
          const endIndex = startIndex + ITEMS_PER_PAGE
          const newItems = fallbackPlaces.slice(startIndex, endIndex)
          if (newItems.length > 0) {
            setAllPlaces(prev => [...prev, ...newItems])
          }
          setHasMore(endIndex < fallbackPlaces.length)
        }
      } else {
        // Pas de données avec recherche/filtre
        setShouldUseFallback(false)
        setAllPlaces([])
        setHasMore(false)
      }
    }
    setIsLoadingMore(false)
  }, [placesData, currentPage, viewMode, error, isLoading, hasSearchOrFilter])

  // Reset quand on change de type ou de recherche
  useEffect(() => {
    setCurrentPage(1)
    setAllPlaces([])
    setHasMore(true)
    setShouldUseFallback(false)
  }, [debouncedSearchTerm, selectedType, viewMode])

  // Fonction pour charger plus d'éléments (scroll infini)
  const loadMore = useCallback(() => {
    if (!isLoadingMore && hasMore) {
      setIsLoadingMore(true)
      setCurrentPage(prev => prev + 1)
    }
  }, [isLoadingMore, hasMore])

  // Hook pour le scroll infini
  const lastElementRef = useInfiniteScroll(loadMore, hasMore, isLoadingMore)

  // Données à afficher selon le mode de vue
  const places = viewMode === "grid" 
    ? allPlaces 
    : (placesData?.data || (shouldUseFallback && !hasSearchOrFilter ? fallbackPlaces.slice(0, LIST_ITEMS_PER_PAGE) : []))

  // Calcul du total pour la pagination (vue liste)
  //@ts-ignore
  const totalItems = placesData?.total || (shouldUseFallback && !hasSearchOrFilter ? fallbackPlaces.length : 0)
  const totalPages = Math.ceil(totalItems / LIST_ITEMS_PER_PAGE)

  const handleDelete = async () => {
    if (!deleteModal.place) return

    try {
      await deleteMutation.mutateAsync(deleteModal.place.id)
      toast({
        title: "Succès",
        description: "Lieu supprimé avec succès",
      })
      setDeleteModal({ isOpen: false, place: null })

      // Rafraîchir les données
      refetch()
    } catch (error) {
      console.error("Error deleting place:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression du lieu",
        variant: "destructive",
      })
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "restaurant":
        return "Restaurant"
      case "hotel":
        return "Hôtel"
      case "activity":
        return "Activité"
      case "landmark":
        return "Monument"
      default:
        return type
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      restaurant: "bg-orange-500",
      hotel: "bg-blue-500",
      activity: "bg-green-500",
      landmark: "bg-purple-500",
    }
    return (
      <Badge className={`${colors[type as keyof typeof colors] || "bg-gray-500"} text-white`}>
        {getTypeLabel(type)}
      </Badge>
    )
  }

  const handleCreateSuccess = () => {
    setIsCreateModalOpen(false)
    toast({
      title: "Succès",
      description: "Lieu créé avec succès",
    })
    refetch()
  }

  const handleEditSuccess = () => {
    setIsEditModalOpen(false)
    setEditingPlace(null)
    toast({
      title: "Succès",
      description: "Lieu modifié avec succès",
    })
    refetch()
  }

  const handleEditClick = (place: any) => {
    setEditingPlace(place)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (place: any) => {
    setDeleteModal({ isOpen: true, place })
  }

  const openDetailsSheet = (place: any) => {
    setDetailsSheet({ isOpen: true, place })
  }

  // Pagination pour la vue liste
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const getPaginationRange = () => {
    const range = []
    const showPages = 5
    let start = Math.max(1, currentPage - Math.floor(showPages / 2))
    let end = Math.min(totalPages, start + showPages - 1)
    
    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1)
    }
    
    for (let i = start; i <= end; i++) {
      range.push(i)
    }
    
    return range
  }

  // Loader pour le chargement initial
  if (isLoading && currentPage === 1 && allPlaces.length === 0) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg flex items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            Chargement des lieux...
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-8 bg-gray-50 min-h-screen"
    >
      <div className="mb-6">
        <nav className="text-sm text-gray-600">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Tableau de bord
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Gestion des lieux</span>
        </nav>
      </div>

      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 mb-6"
        >
          Gestion des lieux
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
         className="bg-white rounded-[10px] shadow-sm border border-gray-300 p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher un lieu</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom, adresse..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                {/* Indicateur de recherche */}
                {searchTerm !== debouncedSearchTerm && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48 border border-gray-300 rounded-[5px]">
                  <SelectValue placeholder="Type de lieu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="restaurant">Restaurants</SelectItem>
                  <SelectItem value="hotel">Hôtels</SelectItem>
                  <SelectItem value="activity">Activités</SelectItem>
                  <SelectItem value="landmark">Monuments</SelectItem>
                </SelectContent>
              </Select>
             <div className="flex border rounded-[7px]">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none w-full h-full rounded-l-[5px]"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none w-full h-full rounded-r-[5px]"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
              <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouveau lieu
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                  <DialogHeader>
                    <DialogTitle>Créer un nouveau lieu</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[calc(90vh-80px)] overflow-hidden">
                    <PlacesForm
                      mode="create"
                      onSuccess={handleCreateSuccess}
                      onCancel={() => setIsCreateModalOpen(false)}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {places.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-16"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Building2 className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun lieu trouvé</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm || selectedType !== "all"
                  ? "Aucun lieu ne correspond à vos critères de recherche. Essayez de modifier vos filtres."
                  : "Vous n'avez pas encore ajouté de lieux. Commencez par créer votre premier lieu."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vue Grid avec scroll infini */}
      <AnimatePresence>
        {places.length > 0 && viewMode === "grid" && (
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
>
  {places.map((place, index) => (
    <motion.div
      key={place.id}
      ref={index === places.length - 1 ? lastElementRef : null}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="h-full"
    >
      <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden rounded-lg group h-full flex flex-col">
        {/* Poster en haut */}
        {place.poster ? (
  <div
    className="relative h-40 w-full cursor-pointer group"
    onClick={() => openDetailsSheet(place)}
  >
    <img
      src={getImageUrl(place.poster)}
      alt={place.name}
      className="w-full h-full object-cover transition-transform group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <Eye className="w-8 h-8 text-white" />
    </div>
  </div>
) : (
  <div
    className="relative h-40 w-full cursor-pointer bg-gray-400 flex items-center justify-center text-white text-xl font-bold"
    onClick={() => openDetailsSheet(place)}
  >
    {place.title}
    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
      <Eye className="w-8 h-8 text-white" />
    </div>
  </div>
)}


        <CardHeader className="flex-grow">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-xl font-semibold line-clamp-1">{place.title}</CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <p className="text-sm text-gray-500 line-clamp-1">{place.address}</p>
              </div>
            </div>
            {getTypeBadge(place.type)}
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">{new Date(place.createdAt).toLocaleDateString()}</span>
            <div className="flex items-center gap-1">
              <div className="flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition">
                      <EllipsisVertical className="w-5 h-5 text-gray-600" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="rounded-[4px] bg-white">
                    <DropdownMenuItem onClick={() => openDetailsSheet(place)}>
                      <Eye className="w-4 h-4 mr-2" /> Voir
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEditClick(place)}>
                      <Edit className="w-4 h-4 mr-2" /> Modifier
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => openDeleteModal(place)}
                      className="text-red-600 focus:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{place.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</motion.div>

        )}
      </AnimatePresence>

      {/* Loader pour le scroll infini (vue grid) */}
      {viewMode === "grid" && (isLoadingMore || (isLoading && allPlaces.length > 0)) && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-2 text-gray-600">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Chargement...</span>
          </div>
        </div>
      )}

      {/* Vue Liste avec pagination */}
      {places.length > 0 && viewMode === "list" && (
        <div className="space-y-6">
          <div className="bg-white rounded-[10px] shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left p-4 font-medium text-gray-900">Lieu</th>
                    <th className="text-left p-4 font-medium text-gray-900">Type</th>
                    <th className="text-left p-4 font-medium text-gray-900">Adresse</th>
                    <th className="text-left p-4 font-medium text-gray-900">Note</th>
                    <th className="text-left p-4 font-medium text-gray-900">Date</th>
                    <th className="text-right p-4 font-medium text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {places.map((place) => (
                    <tr key={place.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {place.poster && (
                            <img
                              src={getImageUrl(place.poster) || "/placeholder.svg"}
                              alt={place.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-900">{place.title || place.name}</p>
                            {place.description && (
                              <p className="text-sm text-gray-500 line-clamp-1">{place.description}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">{getTypeBadge(place.type)}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-sm text-gray-600">{place.address}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{place.rating}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-gray-500">{new Date(place.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-4 justify-end">
                          <Button
                           title="Voir Lieu"
                            variant="ghost"
                            size="sm"
                            onClick={() => openDetailsSheet(place)}
                            className="text-blue-600 p-0 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Dialog
                            open={isEditModalOpen && editingPlace?.id === place.id}
                            onOpenChange={(open) => {
                              if (!open) {
                                setIsEditModalOpen(false)
                                setEditingPlace(null)
                              }
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button
                              title="Modifier Lieu"
                                variant="ghost"
                                size="sm"
                                onClick={() => handleEditClick(place)}
                                className="text-gray-600 p-0 hover:text-gray-700 hover:bg-gray-50"
                              >
                                <Pencil className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                              <DialogHeader>
                                <DialogTitle>Modifier le lieu</DialogTitle>
                              </DialogHeader>
                              {editingPlace && (
                                <PlacesForm
                                  mode="edit"
                                  initialData={editingPlace}
                                  onSuccess={handleEditSuccess}
                                  onCancel={() => {
                                    setIsEditModalOpen(false)
                                    setEditingPlace(null)
                                  }}
                                />
                              )}
                            </DialogContent>
                          </Dialog>
                          <Button
                           title="Supprimer Lieu"
                            variant="ghost"
                            size="sm"
                            onClick={() => openDeleteModal(place)}
                            className="text-red-600 p-0 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination pour la vue liste */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Page {currentPage} sur {totalPages}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1 || isLoading}
                  className="flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Précédent
                </Button>
                
                {getPaginationRange().map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                    disabled={isLoading}
                    className="min-w-[32px]"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || isLoading}
                  className="flex items-center gap-1"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Statistiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8"
      >
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {places.filter((p) => p.type === "restaurant").length}
            </div>
            <p className="text-sm text-gray-600">Restaurants</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{places.filter((p) => p.type === "hotel").length}</div>
            <p className="text-sm text-gray-600">Hôtels</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {places.filter((p) => p.type === "activity").length}
            </div>
            <p className="text-sm text-gray-600">Activités</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {places.filter((p) => p.type === "landmark").length}
            </div>
            <p className="text-sm text-gray-600">Monuments</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Modals and Sheets */}
      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, place: null })}
        onConfirm={handleDelete}
        title={deleteModal.place?.name || ""}
        description="Cette action est irréversible."
        isLoading={deleteMutation.isPending}
      />

      <DetailsSheet
        isOpen={detailsSheet.isOpen}
        onClose={() => setDetailsSheet({ isOpen: false, place: null })}
        item={detailsSheet.place}
        type="place"
      />
    </motion.div>
  )
}