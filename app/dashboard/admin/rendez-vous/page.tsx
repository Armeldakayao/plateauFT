"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import Link from "next/link"

interface RendezVous {
  id: string
  dateHeure: string
  service: string
  nomCitoyen: string
  contact: string
  statut: string
}

export default function RendezVousPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [serviceFilter, setServiceFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; rdv: RendezVous | null }>({
    open: false,
    rdv: null,
  })
  const [editModal, setEditModal] = useState<{ open: boolean; rdv: RendezVous | null }>({
    open: false,
    rdv: null,
  })

  const [rendezVous, setRendezVous] = useState<RendezVous[]>([
    {
      id: "1",
      dateHeure: "15/07/2024 14:00",
      service: "Célébration de mariage",
      nomCitoyen: "Koffi Stephane",
      contact: "07 88 46 67 23",
      statut: "Confirmé",
    },
    {
      id: "2",
      dateHeure: "16/07/2024 10:00",
      service: "Certificat de résidence",
      nomCitoyen: "Alioune Mamadou",
      contact: "07 88 46 67 24",
      statut: "En attente",
    },
    {
      id: "3",
      dateHeure: "17/07/2024 15:30",
      service: "Certificat de mariage",
      nomCitoyen: "Coulibaly Fatou",
      contact: "07 88 46 67 25",
      statut: "Annulé",
    },
  ])

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "Confirmé":
        return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Confirmé</Badge>
      case "En attente":
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500 px-3 py-1 text-xs">En attente</Badge>
      case "Annulé":
        return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1 text-xs">Annulé</Badge>
      case "Reporté":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500 px-3 py-1 text-xs">Reporté</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const handleDelete = (rdv: RendezVous) => {
    setDeleteModal({ open: true, rdv })
  }

  const confirmDelete = () => {
    if (deleteModal.rdv) {
      setRendezVous((prev) => prev.filter((r) => r.id !== deleteModal.rdv!.id))
      console.log("Rendez-vous supprimé:", deleteModal.rdv.id)
    }
    setDeleteModal({ open: false, rdv: null })
  }

  const handleEdit = (rdv: RendezVous) => {
    setEditModal({ open: true, rdv })
  }

  const handleStatusChange = (newStatus: string) => {
    if (editModal.rdv) {
      setRendezVous((prev) => prev.map((r) => (r.id === editModal.rdv!.id ? { ...r, statut: newStatus } : r)))
      console.log("Statut modifié:", editModal.rdv.id, "->", newStatus)
    }
    setEditModal({ open: false, rdv: null })
  }

  const DeleteModal = () => (
    <Dialog open={deleteModal.open} onOpenChange={(open) => setDeleteModal({ open, rdv: null })}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Confirmer la suppression</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700">
            Êtes-vous sûr de vouloir supprimer ce rendez-vous avec{" "}
            <span className="font-semibold">{deleteModal.rdv?.nomCitoyen}</span> ?
          </p>
          <p className="text-sm text-gray-500 mt-2">Cette action est irréversible.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setDeleteModal({ open: false, rdv: null })}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={confirmDelete}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const EditModal = () => (
    <Dialog open={editModal.open} onOpenChange={(open) => setEditModal({ open, rdv: null })}>
      <DialogContent className="max-w-md ">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Modifier le statut</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700 mb-4">
            Rendez-vous avec <span className="font-semibold">{editModal.rdv?.nomCitoyen}</span>
          </p>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">Service: {editModal.rdv?.service}</p>
            <p className="text-sm text-gray-600">Date: {editModal.rdv?.dateHeure}</p>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nouveau statut</label>
            <Select onValueChange={handleStatusChange} defaultValue={editModal.rdv?.statut}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white text-gray-900 rounded-[5px]">
                <SelectItem value="Confirmé">Confirmé</SelectItem>
                <SelectItem value="En attente">En attente</SelectItem>
                <SelectItem value="Reporté">Reporté</SelectItem>
                <SelectItem value="Annulé">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setEditModal({ open: false, rdv: null })}>
            Annuler
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      {/* <div className="mb-6">
        <nav className="text-sm text-gray-600">
          <Link href="/admin" className="hover:text-blue-600">
            Tableau de bord
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Gestion des Rendez-vous</span>
        </nav>
      </div> */}

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Gestion des Rendez-vous</h1>

        {/* Filters */}
        <div className="bg-primary rounded-[10px]  p-4 md:p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-white mb-2">Rechercher</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Rechercher par nom, service..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select value={serviceFilter} onValueChange={setServiceFilter}>
                <SelectTrigger className="w-full bg-white rounded-[5px] text-primary sm:w-48">
                  <SelectValue placeholder="Filtrer par service" />
                </SelectTrigger>
                <SelectContent className="bg-white text-primary rounded-[5px]">
                  <SelectItem value="all">Tous les services</SelectItem>
                  <SelectItem value="mariage">Célébration de mariage</SelectItem>
                  <SelectItem value="residence">Certificat de résidence</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full bg-white rounded-[5px] text-primary sm:w-48">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent className="bg-white text-primary rounded-[5px]">
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="confirme">Confirmé</SelectItem>
                  <SelectItem value="attente">En attente</SelectItem>
                  <SelectItem value="annule">Annulé</SelectItem>
                </SelectContent>
              </Select>
              {/* <Button variant="outline" className="border-gray-300 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Date
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-4 md:p-6">
          <h3 className="text-2xl font-semibold text-gray-900">Liste des rendez-vous</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-lg">Date & Heure</th>
                <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-lg">Service demandé</th>
                <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-lg">Nom du Citoyen</th>
                <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-lg">Contact</th>
                <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-lg">Statut</th>
                <th className="text-left py-4 px-4 md:px-6 font-semibold text-gray-700 text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rendezVous.map((rdv) => (
                <tr key={rdv.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 md:px-6 font-medium text-gray-900">{rdv.dateHeure}</td>
                  <td className="py-4 px-4 md:px-6 text-gray-600">{rdv.service}</td>
                  <td className="py-4 px-4 md:px-6 text-gray-600">{rdv.nomCitoyen}</td>
                  <td className="py-4 px-4 md:px-6 text-gray-600">{rdv.contact}</td>
                  <td className="py-4 px-4 md:px-6">{getStatusBadge(rdv.statut)}</td>
                  <td className="py-4 px-4 md:px-6">
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/admin/rendez-vous/${rdv.id}`}>
                        <Button variant="outline" size="sm" className="border-blue-300 rounded-[5px] text-blue-600 bg-transparent">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-orange-300 rounded-[5px] text-orange-600 bg-transparent"
                        onClick={() => handleEdit(rdv)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 rounded-[5px] text-red-600 bg-transparent"
                        onClick={() => handleDelete(rdv)}
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

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 md:px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">Précédent</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="w-8 h-8 p-0 bg-transparent">
              1
            </Button>
          </div>
          <div className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">Suivant</div>
        </div>
      </div>

      <DeleteModal />
      <EditModal />
    </div>
  )
}
