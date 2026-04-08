"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Plus, Edit, Trash2, Calendar, Eye, Grid3X3, List, Pencil, FileText } from "lucide-react"

import { useToast } from "@/hooks/use-toast"
import { getImageUrl } from "@/lib/api/client"
import { useCommuniques } from "@/hooks/communiques/use-communiques-queries"
import { useDeleteCommunique } from "@/hooks/communiques/use-communiques-mutation"
import { ActualitesForm } from "@/components/dashboard/actualites-form"
import { ConfirmDeleteModal } from "@/components/dashboard/confirm-delete-modal"
import { DetailsSheet } from "@/components/dashboard/details-sheet"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { EllipsisVertical } from "lucide-react"

export default function ActualitesManagerPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingActualite, setEditingActualite] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; actualite: any }>({
    isOpen: false,
    actualite: null,
  })
  const [detailsSheet, setDetailsSheet] = useState<{ isOpen: boolean; actualite: any }>({
    isOpen: false,
    actualite: null,
  })

  const {
    data: actualitesData,
    isLoading,
    error,
  } = useCommuniques({
    search: searchTerm,
    type: selectedType !== "all" ? selectedType : undefined,
  })

  const deleteMutation = useDeleteCommunique()

  const handleDelete = async () => {
    if (!deleteModal.actualite) return

    try {
      await deleteMutation.mutateAsync(deleteModal.actualite.id)
      toast({
        title: "Succès",
        description: "Actualité supprimée avec succès",
      })
      setDeleteModal({ isOpen: false, actualite: null })
    } catch (error) {
      console.error("Error deleting actualite:", error)
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression de l'actualité",
        variant: "destructive",
      })
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "news":
        return "Actualité"
      case "press_release":
        return "Communiqué de presse"
      case "announcement":
        return "Annonce"
      case "communique":
        return "Communiqué"
      default:
        return type
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      news: "bg-blue-500",
      press_release: "bg-green-500",
      announcement: "bg-orange-500",
      communique: "bg-purple-500",
    }
    return (
      <Badge className={`${colors[type as keyof typeof colors] || "bg-gray-500"} text-white`}>
        {getTypeLabel(type)}
      </Badge>
    )
  }

  if (isLoading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-lg flex items-center gap-2">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            Chargement des actualités...
          </motion.div>
        </div>
      </div>
    )
  }

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false)
    toast({
      title: "Succès",
      description: "Actualité créée avec succès",
    })
  }

  const handleEditSuccess = () => {
    setIsEditModalOpen(false)
    setEditingActualite(null)
    toast({
      title: "Succès",
      description: "Actualité modifiée avec succès",
    })
  }

  const handleEditClick = (actualite: any) => {
    setEditingActualite(actualite)
    setIsEditModalOpen(true)
  }

  const openDeleteModal = (actualite: any) => {
    setDeleteModal({ isOpen: true, actualite })
  }

  const openDetailsSheet = (actualite: any) => {
    setDetailsSheet({ isOpen: true, actualite })
  }

  const actualites = actualitesData?.data || [
    {
      id: "1",
      title: "Nouveau communiqué municipal",
      description: "Description courte du communiqué...",
      type: "communique",
      date: "2024-08-17",
      poster: "/news-collage.png",
      tags: ["urbanisme", "transport"],
      status: "published",
    },
    {
      id: "2",
      title: "Annonce importante",
      description: "Une annonce importante pour tous les citoyens...",
      type: "announcement",
      date: "2024-08-15",
      poster: "/public-service-announcement.png",
      tags: ["environnement"],
      status: "published",
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="p-8 bg-gray-50 min-h-screen"
    >
      <div className="mb-8">
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-bold text-gray-900 mb-6"
        >
          Gestion des actualités
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-[10px] shadow-sm border border-gray-300 p-6 mb-6"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Rechercher une actualité</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par titre, description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 "
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-48 border border-gray-300 rounded-[5px]">
                  <SelectValue placeholder="Type d'actualité" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="news">Actualités</SelectItem>
                  <SelectItem value="press_release">Communiqués de presse</SelectItem>
                  <SelectItem value="announcement">Annonces</SelectItem>
                  <SelectItem value="communique">Communiqués</SelectItem>
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

              <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Nouvelle actualité
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] ">
                  <DialogHeader>
                    <DialogTitle>Créer une nouvelle actualité</DialogTitle>
                  </DialogHeader>
                  <div className="max-h-[90vh] ">
                    <ActualitesForm
                      mode="create"
                      onSuccess={handleCreateSuccess}
                      onCancel={() => setIsCreateDialogOpen(false)}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {actualites.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-16"
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <FileText className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune actualité trouvée</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                {searchTerm || selectedType !== "all"
                  ? "Aucune actualité ne correspond à vos critères de recherche. Essayez de modifier vos filtres."
                  : "Vous n'avez pas encore publié d'actualités. Commencez par créer votre première actualité."}
              </p>
              {/* {!searchTerm && selectedType === "all" && (
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Créer votre première actualité
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
                    <DialogHeader>
                      <DialogTitle>Créer une nouvelle actualité</DialogTitle>
                    </DialogHeader>
                    <div className="max-h-[calc(90vh-80px)] overflow-hidden">
                      <ActualitesForm
                        mode="create"
                        onSuccess={() => setIsCreateDialogOpen(false)}
                        onCancel={() => setIsCreateDialogOpen(false)}
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              )} */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {actualites.length > 0 && viewMode === "grid" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {actualites.map((actualite, index) => (
              <motion.div
                key={actualite.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-300 rounded-[7px] group">
                  {actualite.poster && (
                    <div
                      className="relative h-40 w-full border-b cursor-pointer group"
                      onClick={() => openDetailsSheet(actualite)}
                    >
                      <img
                        src={getImageUrl(actualite.poster) || "/placeholder.svg"}
                        alt={actualite.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Eye className="w-8 h-8 text-white" />
                      </div>
                    </div>
                  )}

                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold line-clamp-2">{actualite.title}</CardTitle>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(actualite.date).toLocaleDateString()}
                        </div>
                      </div>
                      {getTypeBadge(actualite.type)}
                    </div>
                  </CardHeader>

                  <CardContent>
                    {actualite.description && (
                      <p className="text-sm text-gray-600  line-clamp-3 mb-4">
                        {actualite.description?.slice(0, 100)}...
                      </p>
                    )}

                    <div className="flex justify-end">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="p-2 rounded-full hover:bg-gray-100 transition">
                            <EllipsisVertical className="w-5 h-5 text-gray-600" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-[4px] bg-white">
                          <DropdownMenuItem onClick={() => openDetailsSheet(actualite)}>
                            <Eye className="w-4 h-4 mr-2" /> Voir
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditClick(actualite)}>
                            <Edit className="w-4 h-4 mr-2" /> Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => openDeleteModal(actualite)}
                            className="text-red-600 focus:text-red-700"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {viewMode === "list" && actualites.length > 0 && (
        <div className="bg-white rounded-[10px] shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full rounded-t-[10px]">
              <thead className="bg-gray-50  border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-900">Actualité</th>
                  <th className="text-left p-4 font-medium text-gray-900">Type</th>
                  <th className="text-left p-4 font-medium text-gray-900">Date</th>
                  <th className="text-left p-4 font-medium text-gray-900">Tags</th>
                  <th className="text-right p-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {actualites.map((actualite) => (
                  <tr key={actualite.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {actualite.poster && (
                          <img
                            src={getImageUrl(actualite.poster) || "/placeholder.svg"}
                            alt={actualite.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        )}
                        <div>
                          <p className="font-medium text-gray-900">{actualite.title}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{actualite.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{getTypeBadge(actualite.type)}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{new Date(actualite.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {actualite.tags?.slice(0, 2).map((tag: string, index: number) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {actualite.tags?.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{actualite.tags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4 justify-end">
                        <Button
                          title="Voir l'actualité"
                          variant="ghost"
                          size="sm"
                          onClick={() => openDetailsSheet(actualite)}
                          className="text-blue-600 p-0 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Eye className="w-5 h-5" />
                        </Button>
                        <Dialog
                          open={isEditModalOpen && editingActualite?.id === actualite.id}
                          onOpenChange={(open) => {
                            if (!open) {
                              setIsEditModalOpen(false)
                              setEditingActualite(null)
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              title="Modifier l'actualité"
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditClick(actualite)}
                              className="text-gray-600 p-0 hover:text-gray-700 hover:bg-gray-50"
                            >
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Modifier l'actualité</DialogTitle>
                            </DialogHeader>
                            {editingActualite && (
                              <ActualitesForm
                                mode="edit"
                                initialData={editingActualite}
                                onSuccess={handleEditSuccess}
                                onCancel={() => {
                                  setIsEditModalOpen(false)
                                  setEditingActualite(null)
                                }}
                              />
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button
                          title="Supprimer l'actualité"
                          variant="ghost"
                          size="sm"
                          onClick={() => openDeleteModal(actualite)}
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
      )}

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, actualite: null })}
        onConfirm={handleDelete}
        title={deleteModal.actualite?.title || ""}
        description="Cette action est irréversible."
        isLoading={deleteMutation.isPending}
      />

      <DetailsSheet
        isOpen={detailsSheet.isOpen}
        onClose={() => setDetailsSheet({ isOpen: false, actualite: null })}
        item={detailsSheet.actualite}
        type="actualite"
      />
    </motion.div>
  )
}
