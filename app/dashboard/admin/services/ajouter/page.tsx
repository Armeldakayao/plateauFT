"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, X, Edit3, Trash2, Save, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface FormField {
  id: string
  intitule: string
  type: string
  obligatoire: boolean
  aideUtilisateur: string
}

interface Document {
  id: string
  nom: string
  type: string
  obligatoire: boolean
  aideUtilisateur: string
}

interface ServiceInfo {
  nom: string
  categorie: string
  description: string
  icone: string
  conditions: string
  messageConfirmation: string
}

export default function AjouterServicePage() {
  const [showAddField, setShowAddField] = useState(false)
  const [showAddDoc, setShowAddDoc] = useState(false)

  const [serviceInfo, setServiceInfo] = useState<ServiceInfo>({
    nom: "",
    categorie: "",
    description: "",
    icone: "",
    conditions: "",
    messageConfirmation: "",
  })

  const [newField, setNewField] = useState<Omit<FormField, "id">>({
    intitule: "",
    type: "",
    obligatoire: true,
    aideUtilisateur: "",
  })

  const [newDoc, setNewDoc] = useState<Omit<Document, "id">>({
    nom: "",
    type: "",
    obligatoire: true,
    aideUtilisateur: "",
  })

  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: "1",
      intitule: "Nom du demandeur",
      type: "Texte",
      obligatoire: true,
      aideUtilisateur: "Saisir le nom complet du demandeur",
    },
    {
      id: "2",
      intitule: "Téléphone",
      type: "Numéro",
      obligatoire: true,
      aideUtilisateur: "Ex: +225700000000",
    },
  ])

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      nom: "CNI des deux conjoints",
      type: "PDF",
      obligatoire: true,
      aideUtilisateur: "Joindre recto + verso dans un seul fichier PDF",
    },
    {
      id: "2",
      nom: "Acte de naissance",
      type: "PDF & JPG",
      obligatoire: true,
      aideUtilisateur: "Documents attestant et devant dater de moins de 3 mois",
    },
  ])

  const addFormField = () => {
    if (newField.intitule && newField.type) {
      const field: FormField = {
        ...newField,
        id: Date.now().toString(),
      }
      setFormFields([...formFields, field])
      setNewField({
        intitule: "",
        type: "",
        obligatoire: true,
        aideUtilisateur: "",
      })
      setShowAddField(false)
    }
  }

  const addDocument = () => {
    if (newDoc.nom && newDoc.type) {
      const doc: Document = {
        ...newDoc,
        id: Date.now().toString(),
      }
      setDocuments([...documents, doc])
      setNewDoc({
        nom: "",
        type: "",
        obligatoire: true,
        aideUtilisateur: "",
      })
      setShowAddDoc(false)
    }
  }

  const removeFormField = (id: string) => {
    setFormFields(formFields.filter((field) => field.id !== id))
  }

  const removeDocument = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <motion.div
      className="p-4 md:p-8 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Breadcrumb */}
      <motion.div className="mb-6" variants={itemVariants}>
        <nav className="text-sm text-gray-600">
          <Link href="/admin" className="hover:text-blue-600 transition-colors">
            Tableau de bord
          </Link>
          <span className="mx-2">›</span>
          <Link href="/admin/services-formulaires" className="hover:text-blue-600 transition-colors">
            Services & Formulaires
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-900 font-medium">Ajout d'un nouveau service</span>
        </nav>
      </motion.div>

      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4 md:p-6 mb-8 shadow-sm"
        variants={itemVariants}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Ajout d'un nouveau service</h1>
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-md"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Service Espace Citoyen
            <br />
            Secrétaire Générale
          </motion.div>
        </div>
      </motion.div>

      <div className=" space-y-8">
        {/* Informations générales du service */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg border rounded-[10px] bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
              <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-blue-600" />
                Informations générales du service
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nom du service</label>
                  <Input
                    placeholder="Nom officiel du service (ex: mariage)"
                    className="border-gray-300 focus:border-blue-500 transition-colors"
                    value={serviceInfo.nom}
                    onChange={(e) => setServiceInfo({ ...serviceInfo, nom: e.target.value })}
                  />
                </motion.div>
                <motion.div whileFocus={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                  <Select
                    value={serviceInfo.categorie}
                    onValueChange={(value) => setServiceInfo({ ...serviceInfo, categorie: value })}
                  >
                    <SelectTrigger className="border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="etat-civil">État civil</SelectItem>
                      <SelectItem value="administration">Administration</SelectItem>
                      <SelectItem value="urbanisme">Urbanisme</SelectItem>
                    </SelectContent>
                  </Select>
                </motion.div>
                <motion.div
                  className="lg:col-span-2"
                  whileFocus={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Textarea
                    placeholder="Description détaillée du service proposé dans la commune de l'Plateau"
                    className="border-gray-300 focus:border-blue-500 transition-colors"
                    rows={3}
                    value={serviceInfo.description}
                    onChange={(e) => setServiceInfo({ ...serviceInfo, description: e.target.value })}
                  />
                </motion.div>
                <motion.div
                  className="lg:col-span-2"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icône du service (optionnel)</label>
                  <Input
                    placeholder="URL de l'icône ou nom"
                    className="border-gray-300 focus:border-blue-500 transition-colors"
                    value={serviceInfo.icone}
                    onChange={(e) => setServiceInfo({ ...serviceInfo, icone: e.target.value })}
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Détails et Conditions de la Demande */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg border rounded-[10px] bg-white/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-100">
              <CardTitle className="text-xl font-semibold text-orange-600">
                Détails et Conditions de la Demande
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conditions ou informations importantes à connaître
                </label>
                <Textarea
                  placeholder="La demande doit être déposée au moins 10 jours avant la date souhaitée..."
                  className="border-gray-300 focus:border-orange-500 transition-colors"
                  rows={6}
                  value={serviceInfo.conditions}
                  onChange={(e) => setServiceInfo({ ...serviceInfo, conditions: e.target.value })}
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Champs du Formulaire Citoyen à créer */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg border rounded-[10px] bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="text-xl font-semibold text-gray-900">
                  Champs du Formulaire Citoyen à créer
                </CardTitle>
                <Dialog open={showAddField} onOpenChange={setShowAddField}>
                  <DialogTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-gradient-to-r rounded-[5px] from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-md">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un Champs
                      </Button>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <DialogHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white -m-6 mb-6 p-6 rounded-t-lg">
                        <DialogTitle className="text-lg flex items-center justify-between">Nouveau Champs</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nom du Champs</label>
                          <Input
                            placeholder="Nom du champs"
                            className="border-gray-300 focus:border-blue-500"
                            value={newField.intitule}
                            onChange={(e) => setNewField({ ...newField, intitule: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                          <Select
                            value={newField.type}
                            onValueChange={(value) => setNewField({ ...newField, type: value })}
                          >
                            <SelectTrigger className="border-gray-300">
                              <SelectValue placeholder="Sélectionner le type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Texte">Texte</SelectItem>
                              <SelectItem value="Numéro">Numéro</SelectItem>
                              <SelectItem value="Email">Email</SelectItem>
                              <SelectItem value="Date">Date</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Aide pour l'utilisateur
                          </label>
                          <Textarea
                            placeholder="Saisir votre texte"
                            className="border-gray-300 focus:border-blue-500"
                            value={newField.aideUtilisateur}
                            onChange={(e) => setNewField({ ...newField, aideUtilisateur: e.target.value })}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gray-700">Obligatoire</span>
                          <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Badge
                                className={`cursor-pointer transition-all ${
                                  newField.obligatoire
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                }`}
                                onClick={() => setNewField({ ...newField, obligatoire: true })}
                              >
                                Oui
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Badge
                                className={`cursor-pointer transition-all ${
                                  !newField.obligatoire
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                }`}
                                onClick={() => setNewField({ ...newField, obligatoire: false })}
                              >
                                Non
                              </Badge>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <Button
                          variant="outline"
                          className="flex-1 border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => setShowAddField(false)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Annuler
                        </Button>
                        <Button
                          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                          onClick={addFormField}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Ajouter le Champs
                        </Button>
                      </div>
                    </motion.div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <tr>
                      <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Intitulé</th>
                      <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Type de champ</th>
                      <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Obligatoire</th>
                      <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Aide utilisateur</th>
                      <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {formFields.map((field, index) => (
                        <motion.tr
                          key={field.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                        >
                          <td className="py-3 px-4 md:px-6 font-medium text-gray-900">{field.intitule}</td>
                          <td className="py-3 px-4 md:px-6 text-gray-600">{field.type}</td>
                          <td className="py-3 px-4 md:px-6">
                            {field.obligatoire ? (
                              <Badge className="bg-green-500 text-white hover:bg-green-500">Oui</Badge>
                            ) : (
                              <Badge variant="outline">Non</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 md:px-6 text-gray-600 text-sm">{field.aideUtilisateur}</td>
                          <td className="py-3 px-4 md:px-6">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeFormField(field.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Documents à fournir */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg border rounded-[10px] bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <CardTitle className="text-xl font-semibold text-gray-900">Documents à fournir</CardTitle>
                <Dialog open={showAddDoc} onOpenChange={setShowAddDoc}>
                  <DialogTrigger asChild>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button className="bg-gradient-to-r rounded-[5px] from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md">
                        <Plus className="w-4 h-4 mr-2" />
                        Ajouter un document
                      </Button>
                    </motion.div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <DialogHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white -m-6 mb-6 p-6 rounded-t-lg">
                        <DialogTitle className="text-lg">Ajouter un document demandé</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Nom du document</label>
                          <Input
                            placeholder="Nom du document"
                            className="border-gray-300 focus:border-green-500"
                            value={newDoc.nom}
                            onChange={(e) => setNewDoc({ ...newDoc, nom: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Type accepté</label>
                          <Select value={newDoc.type} onValueChange={(value) => setNewDoc({ ...newDoc, type: value })}>
                            <SelectTrigger className="border-gray-300">
                              <SelectValue placeholder="Sélectionner le type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="PDF">PDF</SelectItem>
                              <SelectItem value="JPG">JPG</SelectItem>
                              <SelectItem value="PNG">PNG</SelectItem>
                              <SelectItem value="PDF & JPG">PDF & JPG</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Aide pour l'utilisateur
                          </label>
                          <Textarea
                            placeholder="Saisir votre texte"
                            className="border-gray-300 focus:border-green-500"
                            value={newDoc.aideUtilisateur}
                            onChange={(e) => setNewDoc({ ...newDoc, aideUtilisateur: e.target.value })}
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-gray-700">Obligatoire</span>
                          <div className="flex gap-2">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Badge
                                className={`cursor-pointer transition-all ${
                                  newDoc.obligatoire
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                }`}
                                onClick={() => setNewDoc({ ...newDoc, obligatoire: true })}
                              >
                                Oui
                              </Badge>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Badge
                                className={`cursor-pointer transition-all ${
                                  !newDoc.obligatoire
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                                }`}
                                onClick={() => setNewDoc({ ...newDoc, obligatoire: false })}
                              >
                                Non
                              </Badge>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3 mt-6">
                        <Button
                          variant="outline"
                          className="flex-1 border-red-300 text-red-600 hover:bg-red-50 bg-transparent"
                          onClick={() => setShowAddDoc(false)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Annuler
                        </Button>
                        <Button
                          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
                          onClick={addDocument}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Ajouter le document
                        </Button>
                      </div>
                    </motion.div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <tr>
                      <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Nom du document</th>
                      <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Type accepté</th>
                      <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Obligatoire</th>
                      <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Aide utilisateur</th>
                      <th className="text-left py-3 px-4 md:px-6 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence>
                      {documents.map((doc, index) => (
                        <motion.tr
                          key={doc.id}
                          initial={{ opacity: 0, y: -20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border-b border-gray-100 hover:bg-green-50 transition-colors"
                        >
                          <td className="py-3 px-4 md:px-6 font-medium text-gray-900">{doc.nom}</td>
                          <td className="py-3 px-4 md:px-6 text-gray-600">{doc.type}</td>
                          <td className="py-3 px-4 md:px-6">
                            {doc.obligatoire ? (
                              <Badge className="bg-green-500 text-white hover:bg-green-500">Oui</Badge>
                            ) : (
                              <Badge variant="outline">Non</Badge>
                            )}
                          </td>
                          <td className="py-3 px-4 md:px-6 text-gray-600 text-sm">{doc.aideUtilisateur}</td>
                          <td className="py-3 px-4 md:px-6">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => removeDocument(doc.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Message de confirmation automatique */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-lg border rounded-[10px] bg-white/80 backdrop-blur-sm">
            <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-xl font-semibold text-blue-600">Message de confirmation automatique</CardTitle>
            </CardHeader>
            <CardContent className="p-4 md:p-6">
              <motion.div whileFocus={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 300 }}>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message envoyé au citoyen</label>
                <Textarea
                  placeholder="Bonjour, votre demande a bien été reçue. Vous recevrez une notification dès qu'elle sera traitée..."
                  className="border-gray-300 focus:border-blue-500 transition-colors"
                  rows={4}
                  value={serviceInfo.messageConfirmation}
                  onChange={(e) => setServiceInfo({ ...serviceInfo, messageConfirmation: e.target.value })}
                />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        <motion.div className="flex flex-col sm:flex-row justify-center gap-4 pb-8" variants={itemVariants}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 bg-transparent px-8 shadow-md"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Annuler
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 shadow-md">
              <Save className="w-4 h-4 mr-2" />
              Enregistrer le service et publier
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
