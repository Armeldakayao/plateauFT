"use client"

import { useState } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Plus, Search } from "lucide-react"
import type { ServiceRequestFilters } from "@/lib/types/service-request"
import Link from "next/link"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useMyServiceRequests } from "@/hooks/services-requests/use-service-request"
import Sidebar from "@/components/sidebar"

const ETAT_OPTIONS = [
  { value: "en_attente", label: "En attente", color: "bg-yellow-100 text-yellow-800" },
  { value: "en_cours", label: "En cours", color: "bg-blue-100 text-blue-800" },
  { value: "termine", label: "Terminé", color: "bg-green-100 text-green-800" },
  { value: "annule", label: "Annulé", color: "bg-red-100 text-red-800" },
]

const TYPE_OPTIONS = [
  { value: "rdv", label: "Rendez-vous" },
  { value: "partenariat", label: "Partenariat" },
  { value: "mariage", label: "Mariage" },
]

export default function UserServiceRequestsPage() {
  const [filters, setFilters] = useState<ServiceRequestFilters>({
    page: 1,
    limit: 10,
    search: "",
    type: "",
    etat: "",
  })

  const { data: requests, isLoading } = useMyServiceRequests(filters)

  const updateFilter = (key: keyof ServiceRequestFilters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }))
  }

  const clearFilters = () => {
    setFilters({ page: 1, limit: 10, search: "", type: "", etat: "" })
  }

  const getEtatBadge = (etat: string) => {
    const option = ETAT_OPTIONS.find((opt) => opt.value === etat)
    return <Badge className={option?.color || "bg-gray-100 text-gray-800"}>{option?.label || etat}</Badge>
  }

  return (
    <div>
    
      <div className=" p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Mes Demandes</h1>
          <p className="text-muted-foreground">Suivez l'état de vos demandes de services</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/client/new-request">
            <Plus className="h-4 w-4 mr-2" />
            Nouvelle demande
          </Link>
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests?.total || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {requests?.data?.filter((r) => r.etat === "en_cours").length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminées</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {requests?.data?.filter((r) => r.etat === "termine").length || 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={filters.search || ""}
                onChange={(e) => updateFilter("search", e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filters.type || "all"} onValueChange={(value) => updateFilter("type", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Type de demande" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                {TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.etat || "all"} onValueChange={(value) => updateFilter("etat", value)}>
              <SelectTrigger>
                <SelectValue placeholder="État" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les états</SelectItem>
                {ETAT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>
              Réinitialiser
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Requests Table */}
      <Card>
        <CardHeader>
          <CardTitle>Mes Demandes</CardTitle>
          <CardDescription>{requests?.total || 0} demande(s) trouvée(s)</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Référence</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>État</TableHead>
                  <TableHead>Date création</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requests?.data?.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.numeroReference}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {TYPE_OPTIONS.find((t) => t.value === request.type)?.label || request.type}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{request.service?.title}</div>
                        <div className="text-sm text-muted-foreground">{request.service?.category}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getEtatBadge(request.etat)}</TableCell>
                    <TableCell>{format(new Date(request.createdAt), "dd/MM/yyyy", { locale: fr })}</TableCell>
                    <TableCell>
                      <Button className="rounded-[5px]" variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/client/service-request/${request.id}`}>Voir détails</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
    </div>
  )
}
