"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Eye, Edit, Trash2, Filter, Download } from "lucide-react"
import { useServiceRequests } from "@/hooks/services-requests/use-service-request"


export default function GestionDemandesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [page, setPage] = useState(1)

  const { data: demandesData, isLoading } = useServiceRequests({
    page,
    limit: 20,
     //@ts-ignore
    etat: statusFilter !== "all" ? statusFilter : undefined,
     //@ts-ignore
    type: typeFilter !== "all" ? typeFilter : undefined,
  })

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "validee":
        return <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">Validée</Badge>
      case "en_cours":
        return <Badge className="bg-blue-500 text-white hover:bg-blue-500 px-3 py-1 text-xs">En cours</Badge>
      case "en_attente":
        return <Badge className="bg-orange-500 text-white hover:bg-orange-500 px-3 py-1 text-xs">En attente</Badge>
      case "refusee":
        return <Badge className="bg-red-500 text-white hover:bg-red-500 px-3 py-1 text-xs">Refusée</Badge>
      case "annulee":
        return <Badge className="bg-gray-500 text-white hover:bg-gray-500 px-3 py-1 text-xs">Annulée</Badge>
      default:
        return <Badge variant="secondary">{statut}</Badge>
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "rdv":
        return "Rendez-vous"
      case "mariage":
        return "Mariage"
      case "partenariat":
        return "Partenariat"
      default:
        return type
    }
  }

  const filteredDemandes =
    demandesData?.data?.filter((demande) => {
      const matchesSearch =
        demande.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demande.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        demande.numeroReference.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesSearch
    }) || []

  if (isLoading) {
    return (
      <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-7">
          <span className="text-primary">Suivi et traitement des</span> demandes citoyennes
        </h1>

        {/* Filters */}
        <div className="bg-primary text-white p-5 rounded-[10px] mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Type de demande</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-white rounded-[7px] text-gray-900">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="rdv">Rendez-vous</SelectItem>
                  <SelectItem value="mariage">Mariage</SelectItem>
                  <SelectItem value="partenariat">Partenariat</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Statut</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-white rounded-[7px] text-gray-900">
                  <SelectValue placeholder="Tous" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="validee">Validée</SelectItem>
                  <SelectItem value="refusee">Refusée</SelectItem>
                  <SelectItem value="annulee">Annulée</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <Select>
                <SelectTrigger className="bg-white rounded-[7px] text-gray-900">
                  <SelectValue placeholder="Toutes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes</SelectItem>
                  <SelectItem value="today">Aujourd'hui</SelectItem>
                  <SelectItem value="week">Cette semaine</SelectItem>
                  <SelectItem value="month">Ce mois</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Recherche par nom</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Nom du demandeur"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white text-gray-900"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-300 bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
            <Button variant="outline" className="border-gray-300 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Filtres avancés
            </Button>
          </div>
          <div className="text-sm text-gray-600">{
             //@ts-ignore
          demandesData?.total || 0} demande(s) au total</div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Nom & Prénom</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Type de demande</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Référence</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Date de demande</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Statut</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700 text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDemandes.map((demande) => (
                <tr key={demande.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">
                    {demande.nom} {demande.prenom}
                  </td>
                  <td className="py-4 px-6 text-gray-600">{getTypeLabel(demande.type)}</td>
                  <td className="py-4 px-6 text-gray-600 font-mono text-sm">{demande.numeroReference}</td>
                  <td className="py-4 px-6 text-gray-600">{new Date(demande.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-6">{getStatusBadge(demande.traitements[0].etat || demande.etat)}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/admin/requests/${demande.id}`}>
                        <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 bg-transparent">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-red-300 text-red-600 bg-transparent">
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
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="bg-transparent"
          >
            Précédent
          </Button>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">
              Page {page} sur {
                 //@ts-ignore
              demandesData?.totalPages || 1}
            </span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={
               //@ts-ignore
              page >= (demandesData?.totalPages || 1)}
            className="bg-transparent"
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  )
}
