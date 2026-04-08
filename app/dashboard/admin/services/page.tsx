// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Search, Plus, Edit, Filter, Trash2 } from "lucide-react"
// import Link from "next/link"

// export default function ServicesFormulairesPage() {
//   const [categoryFilter, setCategoryFilter] = useState("all")
//   const [statusFilter, setStatusFilter] = useState("all")

//   const services = [
//     {
//       id: "1",
//       nom: "Demande de célébration de mariage",
//       categorie: "État civil",
//       dateCreation: "12/07/2024",
//       statut: "Activé",
//     },
//     {
//       id: "2",
//       nom: "Demande de certificat de résidence",
//       categorie: "Administration",
//       dateCreation: "15/07/2024",
//       statut: "Désactivé",
//     },
//     {
//       id: "3",
//       nom: "Demande de certificat de mariage",
//       categorie: "État civil",
//       dateCreation: "18/07/2024",
//       statut: "Activé",
//     },
//     {
//       id: "4",
//       nom: "Demande de certificat de résidence",
//       categorie: "Administration",
//       dateCreation: "20/07/2024",
//       statut: "Désactivé",
//     },
//   ]

//   const getStatusBadge = (statut: string) => {
//     switch (statut) {
//       case "Activé":
//         return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Activé</Badge>
//       case "Désactivé":
//         return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1 text-xs">Désactivé</Badge>
//       default:
//         return <Badge variant="secondary">{statut}</Badge>
//     }
//   }

//   const getActionButtons = (statut: string) => {
//     return (
//       <div className="flex items-center gap-2">
//         <Button variant="outline" size="sm" className="border-blue-300 text-blue-600 bg-transparent">
//           Voir
//         </Button>
//         <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 bg-transparent">
//           <Edit className="w-4 h-4" />
//         </Button>
//         <Button variant="outline" size="sm" className="border-red-300 text-red-600 bg-transparent">
//           <Trash2 className="w-4 h-4" />
//         </Button>
//       </div>
//     )
//   }

//   return (
//     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
//       {/* Breadcrumb */}
//       <div className="mb-6">
//         <nav className="text-2xl text-gray-600">
//           <Link href="/dashboard/admin" className="hover:text-blue-600">
//             Tableau de bord
//           </Link>
//           <span className="mx-2">›</span>
//           <span className="text-gray-900 font-medium">Services & Formulaires</span>
//         </nav>
//       </div>

//       <div className="mb-8">
//         {/* <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Services & Formulaires</h1> */}

//         {/* Filters */}
//         <div className="bg-primary rounded-[10px] shadow-sm border border-gray-200 p-4 md:p-6 mb-6">
//           <div className="flex flex-col lg:flex-row gap-4 items-end">
//             <div className="flex flex-col sm:flex-row gap-4 flex-1">
//               {/* <div className="flex items-center gap-2">
//                 <Search className="w-5 h-5 text-blue-600" />
//                 <Filter className="w-5 h-5 text-gray-400" />
//               </div> */}
//               <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//                 <SelectTrigger className="w-full bg-white text-primary rounded-[5px] sm:w-48">
//                   <SelectValue placeholder="Catégorie" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Toutes</SelectItem>
//                   <SelectItem value="etat-civil">État civil</SelectItem>
//                   <SelectItem value="administration">Administration</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-full bg-white text-primary rounded-[5px] sm:w-48">
//                   <SelectValue placeholder="Statut" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">Tous</SelectItem>
//                   <SelectItem value="active">Activé</SelectItem>
//                   <SelectItem value="inactive">Désactivé</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Button variant="outline" className="border-gray-300 bg-transparent">
//                 Trier par
//               </Button>
//             </div>
//           </div>
//         </div>

//         {/* Add Service Button */}
//         <div className="flex justify-end mb-6">
//           <Link href="/dashboard/admin/services-formulaires/ajouter">
//             <Button className="bg-secondary hover:bg-secondary rounded-[5px] text-white">
//               <Plus className="w-4 h-4 mr-2" />
//               Ajouter un nouveau service
//             </Button>
//           </Link>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
//         <div className="border-b border-gray-200 p-4 md:p-6">
//           <h3 className="text-2xl font-semibold text-gray-900">Liste des services & formulaires</h3>
//         </div>
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b border-gray-200">
//               <tr>
//                 <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-lg">Nom du service</th>
//                 <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-lg">Catégorie</th>
//                 <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-lg">Date création</th>
//                 <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-lg">Statut</th>
//                 <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-lg">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {services.map((service, index) => (
//                 <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
//                   <td className="py-4 px-4 md:px-6 font-medium text-gray-900">{service.nom}</td>
//                   <td className="py-4 px-4 md:px-6 text-gray-600">{service.categorie}</td>
//                   <td className="py-4 px-4 md:px-6 text-gray-600">{service.dateCreation}</td>
//                   <td className="py-4 px-4 md:px-6">{getStatusBadge(service.statut)}</td>
//                   <td className="py-4 px-4 md:px-6">{getActionButtons(service.statut)}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex items-center justify-between px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50">
//           <div className="text-sm text-gray-500">Précédent</div>
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
//               1
//             </Button>
//           </div>
//           <div className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">Suivant</div>
//         </div>
//       </div>
//     </div>
//   )
// }




"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash2, Eye, Settings, Filter, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"


import { useRouter } from "next/navigation"
import { useDeleteService, useServices } from "@/hooks/all-services/use-services"
import { ServiceCreateEditDialog } from "@/components/dashboard/service-create-edit-dialog"
import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-modal"
import { FormField } from "@/lib/types/api"

interface Service {
  id: string
 
  description?: string
  category: string
  price?: number
  isActive: boolean
  createdAt: string
  updatedAt: string
  type: string
  title: string
  requiredDocuments: string[]
  formFields: FormField[]
  workflow: Record<string, unknown>
}

const serviceCategories = [
  { value: "consultation", label: "Consultation" },
  { value: "formation", label: "Formation" },
  { value: "support", label: "Support technique" },
  { value: "maintenance", label: "Maintenance" },
  { value: "development", label: "Développement" },
  { value: "other", label: "Autre" },
]

export default function AdminServicesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all")
  const [page, setPage] = useState(1)
  const [isCreateEditOpen, setIsCreateEditOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [deletingService, setDeletingService] = useState<Service | null>(null)

  const {
    data: servicesData,
    isLoading,
    refetch,
  } = useServices({
    page,
    limit: 20,
    category: categoryFilter === "all" ? undefined : categoryFilter,
  })

  const deleteServiceMutation = useDeleteService()
  const { toast } = useToast()

  const services = (servicesData?.data || []).map((service) => ({
    ...service,
    formFields: service.formFields as FormField[], // Ensure formFields is typed as FormField[]
  }))
  const totalPages = servicesData?.totalPages || 1

  // Filtrage local
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && service.isActive) ||
      (statusFilter === "inactive" && !service.isActive)

    return matchesSearch && matchesStatus
  })

  const formatPrice = (price?: number) => {
    if (!price) return "Gratuit"
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  const getCategoryLabel = (category: string) => {
    const cat = serviceCategories.find((c) => c.value === category)
    return cat?.label || category
  }

  const handleCreateService = () => {
    setEditingService(null)
    setIsCreateEditOpen(true)
  }

  const handleEditService = (service: Service) => {
    setEditingService(service)
    setIsCreateEditOpen(true)
  }

  const handleViewService = (serviceId: string) => {
    router.push(`/dashboard/admin/services/${serviceId}`)
  }

  const handleDeleteService = async () => {
    if (!deletingService) return

    try {
      await deleteServiceMutation.mutateAsync(deletingService.id)
      toast({
        title: "Service supprimé",
        description: "Le service a été supprimé avec succès.",
      })
      refetch()
      setDeletingService(null)
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression du service.",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            Gestion des services
          </h1>
          <p className="text-gray-600 mt-1">Gérez tous les services de votre plateforme</p>
        </div>
        <Button onClick={handleCreateService} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouveau service
        </Button>
      </div>

      {/* Filtres et recherche */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom ou description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={statusFilter}
                onValueChange={(value: "all" | "active" | "inactive") => setStatusFilter(value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actifs</SelectItem>
                  <SelectItem value="inactive">Inactifs</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total services</p>
                <p className="text-2xl font-bold">{services.length}</p>
              </div>
              <Settings className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Services actifs</p>
                <p className="text-2xl font-bold text-green-600">{services.filter((s) => s.isActive).length}</p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Services inactifs</p>
                <p className="text-2xl font-bold text-red-600">{services.filter((s) => !s.isActive).length}</p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Catégories</p>
                <p className="text-2xl font-bold">{new Set(services.map((s) => s.category)).size}</p>
              </div>
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table des services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Services ({filteredServices.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredServices.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Aucun service trouvé</p>
              <Button variant="outline" className="mt-4 bg-transparent" onClick={handleCreateService}>
                Créer votre premier service
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Catégorie</TableHead>
                  {/* <TableHead>Prix</TableHead> */}
                  <TableHead>Statut</TableHead>
                  <TableHead>Créé le</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredServices.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{service?.title}</div>
                        {service.description && (
                          <div className="text-sm text-muted-foreground truncate max-w-xs">{service.description}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{getCategoryLabel(service.category)}</Badge>
                    </TableCell>
                    {/* <TableCell>
                      <span className="font-medium">{formatPrice(service.price)}</span>
                    </TableCell> */}
                    <TableCell>
                      <Badge variant={service.isActive ? "default" : "secondary"}>
                        {service.isActive ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell>{formatDate(service.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-40" align="end">
                          <DropdownMenuItem onClick={() => handleViewService(service.id)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditService(service)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setDeletingService(service)} className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            Précédent
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} sur {totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Suivant
          </Button>
        </div>
      )}

      {/* Dialogs */}
      <ServiceCreateEditDialog
        open={isCreateEditOpen}
        onOpenChange={setIsCreateEditOpen}
        //@ts-ignore
        service={editingService}
        onSuccess={() => {
          refetch()
          setIsCreateEditOpen(false)
          setEditingService(null)
        }}
      />

      <DeleteConfirmationDialog
        open={!!deletingService}
        onOpenChange={(open) => !open && setDeletingService(null)}
        onConfirm={handleDeleteService}
        isLoading={deleteServiceMutation.isPending}
        title="Supprimer le service"
        description={`Êtes-vous sûr de vouloir supprimer le service "${deletingService?.title}" ? Cette action est irréversible.`}
      />
    </div>
  )
}
