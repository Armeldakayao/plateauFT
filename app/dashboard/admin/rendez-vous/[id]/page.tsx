"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Download, Edit, Trash2 } from "lucide-react"
import Link from "next/link"

interface RendezVousDetailsProps {
  params: { id: string }
}

export default function RendezVousDetailsPage({ params }: RendezVousDetailsProps) {
  const [currentStatus, setCurrentStatus] = useState("confirme")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  const rdvDetails = {
    id: params.id,
    citoyen: {
      nom: "KOUAME Jean-Cédric",
      email: "j.kouame@example.com",
      telephone: "07 88 46 67 23",
      numeroReference: "REF-2024-2472",
    },
    service: {
      nom: "Célébration de mariage",
      date: "Vendredi 30 juillet 2024",
      heure: "14h00 - 15h00",
      lieu: "Salle des mariages, Mairie du Plateau",
      agent: "Adjé Bernadette - État civil",
    },
    documents: [
      { nom: "Pièce jointe", statut: "Téléchargé" },
      { nom: "Justificatif de domicile", statut: "Téléchargé" },
    ],
  }

  const handleStatusChange = (newStatus: string) => {
    setCurrentStatus(newStatus)
    console.log("Statut du rendez-vous modifié:", newStatus)
  }

  const handleDelete = () => {
    console.log("Rendez-vous supprimé:", params.id)
    setShowDeleteModal(false)
    // Redirection vers la liste
  }

  const handleEdit = () => {
    console.log("Modification du rendez-vous:", params.id)
    setShowEditModal(false)
  }

  const DeleteModal = () => (
    <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-red-600">Confirmer la suppression</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-gray-700">
            Êtes-vous sûr de vouloir supprimer ce rendez-vous avec{" "}
            <span className="font-semibold">{rdvDetails.citoyen.nom}</span> ?
          </p>
          <p className="text-sm text-gray-500 mt-2">Cette action est irréversible.</p>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Supprimer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  const EditModal = () => (
    <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-blue-600">Modifier le rendez-vous</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div>
            <Label className="text-sm font-medium text-gray-700">Date</Label>
            <input
              type="date"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              defaultValue="2024-07-30"
            />
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700">Heure</Label>
            <input
              type="time"
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md"
              defaultValue="14:00"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowEditModal(false)}>
            Annuler
          </Button>
          <Button onClick={handleEdit} className="bg-blue-600 hover:bg-blue-700 text-white">
            Modifier
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="text-sm text-gray-600">
          <Link href="/admin" className="hover:text-blue-600">
            Tableau de bord
          </Link>
          <span className="mx-2">›</span>
          <Link href="/admin/rendez-vous" className="hover:text-blue-600">
            Gestion des Rendez-vous
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Détail d'un Rendez-vous</span>
        </nav>
      </div>

      {/* Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 md:p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Détail d'un Rendez-vous</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-orange-300 text-orange-600 bg-transparent"
              onClick={() => setShowEditModal(true)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Modifier
            </Button>
            <Button
              variant="outline"
              className="border-red-300 text-red-600 bg-transparent"
              onClick={() => setShowDeleteModal(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Annuler
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Informations sur le citoyen */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-green-50 border-b border-green-200">
              <CardTitle className="text-xl font-semibold text-green-600">Informations sur le citoyen</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-semibold text-gray-700 text-sm">Nom & Prénom</label>
                    <p className="text-gray-600">{rdvDetails.citoyen.nom}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 text-sm">Email</label>
                    <p className="text-gray-600">{rdvDetails.citoyen.email}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 text-sm">N° de téléphone</label>
                    <p className="text-gray-600">{rdvDetails.citoyen.telephone}</p>
                  </div>
                  <div>
                    <label className="font-semibold text-gray-700 text-sm">N° de référence interne</label>
                    <p className="text-gray-600">{rdvDetails.citoyen.numeroReference}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Détails du rendez-vous */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-orange-50 border-b border-orange-200">
              <CardTitle className="text-xl font-semibold text-orange-600">Détails du rendez-vous</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-4">
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Service concerné</label>
                  <p className="text-gray-600">{rdvDetails.service.nom}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Date du rendez-vous</label>
                  <p className="text-gray-600">{rdvDetails.service.date}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Heure</label>
                  <p className="text-gray-600">{rdvDetails.service.heure}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Lieu du rendez-vous</label>
                  <p className="text-gray-600">{rdvDetails.service.lieu}</p>
                </div>
                <div>
                  <label className="font-semibold text-gray-700 text-sm">Agent responsable</label>
                  <p className="text-gray-600">{rdvDetails.service.agent}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Documents liés */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-200">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Documents liés <span className="text-sm font-normal">(si joint par le citoyen)</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="space-y-3">
                {rdvDetails.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-gray-900 text-sm">{doc.nom}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-500 text-white hover:bg-green-500 px-3 py-1 text-xs">
                        {doc.statut}
                      </Badge>
                      <Button variant="outline" size="sm" className="border-gray-300 bg-transparent">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Statut actuel du rendez-vous */}
          <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-blue-50 border-b border-blue-200">
              <CardTitle className="text-lg font-semibold text-blue-600">Statut actuel du rendez-vous</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <RadioGroup value={currentStatus} onValueChange={handleStatusChange} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="pret" id="pret" />
                  <Label htmlFor="pret" className="text-sm font-medium text-gray-700">
                    Prêt
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="confirme" id="confirme" />
                  <Label htmlFor="confirme" className="text-sm font-medium text-gray-700">
                    Confirmé
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reporte" id="reporte" />
                  <Label htmlFor="reporte" className="text-sm font-medium text-gray-700">
                    Reporté
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="annule" id="annule" />
                  <Label htmlFor="annule" className="text-sm font-medium text-gray-700">
                    Annulé
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>
      </div>

      <DeleteModal />
      <EditModal />
    </div>
  )
}
