"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit, Trash2, Settings, Calendar, Tag, FileText, FormInput, Workflow, CheckCircle, XCircle, Activity, Users, Clock, TrendingUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

import { useRouter } from "next/navigation"
import { useDeleteService, useServiceById } from "@/hooks/all-services/use-services"
import { ServiceCreateEditDialog } from "@/components/dashboard/service-create-edit-dialog"
import { DeleteConfirmationDialog } from "@/components/dashboard/delete-confirmation-modal"

const serviceCategories = [
  { value: "consultation", label: "Consultation", color: "bg-blue-100 text-blue-800 border-blue-200" },
  { value: "formation", label: "Formation", color: "bg-green-100 text-green-800 border-green-200" },
  { value: "support", label: "Support technique", color: "bg-orange-100 text-orange-800 border-orange-200" },
  { value: "maintenance", label: "Maintenance", color: "bg-purple-100 text-purple-800 border-purple-200" },
  { value: "development", label: "Développement", color: "bg-indigo-100 text-indigo-800 border-indigo-200" },
  { value: "other", label: "Autre", color: "bg-gray-100 text-gray-800 border-gray-200" },
]

const fieldTypes = [
  { value: "text", label: "Texte", icon: "📝" },
  { value: "email", label: "Email", icon: "📧" },
  { value: "number", label: "Nombre", icon: "🔢" },
  { value: "date", label: "Date", icon: "📅" },
  { value: "select", label: "Liste déroulante", icon: "📋" },
  { value: "textarea", label: "Zone de texte", icon: "📄" },
  { value: "checkbox", label: "Case à cocher", icon: "☑️" },
  { value: "file", label: "Fichier", icon: "📁" },
]

export default function ServiceDetailsPage({ params }: { params: { serviceId: string } }) {
  const router = useRouter()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const { data: service, isLoading, refetch } = useServiceById(params.serviceId)
  const deleteServiceMutation = useDeleteService()
  const { toast } = useToast()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getCategoryData = (category: string) => {
    return serviceCategories.find((c) => c.value === category) || serviceCategories[serviceCategories.length - 1]
  }

  const getFieldTypeData = (type: string) => {
    return fieldTypes.find((t) => t.value === type) || { value: type, label: type, icon: "❓" }
  }

  const handleDelete = async () => {
    if (!service) return

    try {
      await deleteServiceMutation.mutateAsync(service.id)
      toast({
        title: "Service supprimé",
        description: "Le service a été supprimé avec succès.",
      })
      router.push("/admin/services")
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto p-8">
          <div className="flex items-center justify-center py-32">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
              <p className="text-muted-foreground animate-pulse">Chargement des détails du service...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto p-8">
          <div className="text-center py-32">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Service non trouvé</h2>
            <p className="text-muted-foreground mb-6">Le service demandé n'existe pas ou a été supprimé.</p>
            <Button variant="outline" onClick={() => router.push("/admin/services")} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour aux services
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const categoryData = getCategoryData(service.category)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto p-8">
        {/* Hero Header */}
        <div className="relative mb-12">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10 rounded-3xl transform -skew-y-1"></div>
          <div className="relative bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 shadow-lg p-8">
            <div className="flex items-center gap-6 mb-6">
              <Button 
                variant="ghost" 
                onClick={() => router.back()} 
                className="hover:bg-white/80 transition-all duration-300 rounded-full px-4"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  {/* {service.icon && (
                    <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center text-3xl">
                      {service.icon}
                    </div>
                  )} */}
                  <div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                      {service.title}
                    </h1>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge className={`${categoryData.color} font-medium px-3 py-1 rounded-full`}>
                        {categoryData.label}
                      </Badge>
                      <Badge variant={service.isActive ? "default" : "secondary"} className="flex items-center gap-1 px-3 py-1 rounded-full">
                        {service.isActive ? (
                          <>
                            <CheckCircle className="w-3 h-3" />
                            Actif
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3 h-3" />
                            Inactif
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditOpen(true)} 
                  className="bg-white/80 hover:bg-white border-primary/20 hover:border-primary/40 transition-all duration-300 rounded-xl px-6"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteOpen(true)}
                  className="bg-red-50/80 hover:bg-red-100 border-red-200 hover:border-red-300 text-red-600 hover:text-red-700 transition-all duration-300 rounded-xl px-6"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </div>
            </div>

            {service.description && (
              <div className="bg-white/50 rounded-2xl p-6 border border-white/50">
                <p className="text-gray-700 leading-relaxed text-lg">{service.description}</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Contenu principal */}
          <div className="xl:col-span-3 space-y-8">
            {/* Documents requis */}
            {service.requiredDocuments && service.requiredDocuments.length > 0 && (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100/50">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    Documents requis
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {service.requiredDocuments.map((doc, index) => (
                      <div key={index} className="bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-600" />
                          <span className="font-medium text-blue-900">{doc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Champs du formulaire */}
            {service.formFields && service.formFields.length > 0 && (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100/50">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <FormInput className="w-5 h-5 text-green-600" />
                    </div>
                    Champs du formulaire
                    <Badge variant="secondary" className="ml-auto">
                      {service.formFields.length} champ{service.formFields.length > 1 ? 's' : ''}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid gap-4">
                    {service.formFields.map((field, index) => {
                      //@ts-ignore
                      const fieldTypeData = getFieldTypeData(field.type)
                      return (
                        <div key={index} className="group bg-gradient-to-r from-gray-50 to-gray-100/50 border border-gray-200 rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:border-gray-300">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{fieldTypeData.icon}</span>
                              <div>
                                <h4 className="font-semibold text-gray-900">{
                                   //@ts-ignore
                                field.label || field.name}</h4>
                                <code className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded font-mono">
                                  {
                                     //@ts-ignore
                                  field.name}
                                </code>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              { //@ts-ignore
                              field.required && (
                                <Badge variant="destructive" className="text-xs rounded-full">
                                  Obligatoire
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs rounded-full">
                                {fieldTypeData.label}
                              </Badge>
                            </div>
                          </div>
                          
                          { //@ts-ignore
                          field.options && field.options.length > 0 && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <span className="text-xs font-medium text-gray-500 mb-2 block">Options disponibles:</span>
                              <div className="flex flex-wrap gap-2">
                                { //@ts-ignore
                                field.options.map((option, optionIndex) => (
                                  <Badge key={optionIndex} variant="outline" className="text-xs bg-white rounded-full">
                                    {option}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Workflow */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100/50">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Workflow className="w-5 h-5 text-purple-600" />
                  </div>
                  Configuration du workflow
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
               {
                 //@ts-ignore
               service.workflow && service.workflow.steps && service.workflow.steps.length > 0 ? (
  <div className="space-y-4">
    { //@ts-ignore
    service.workflow.steps.map((step: any, index: number) => (
      <div 
        key={index} 
        className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-100 shadow-sm"
      >
        <div>
          <p className="font-semibold text-slate-800">{step.name}</p>
          <p className="text-sm text-slate-500">Responsable : {step.responsable}</p>
        </div>
        <span className="text-purple-600 font-bold">Étape {index + 1}</span>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-12">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
      <Workflow className="w-8 h-8 text-gray-400" />
    </div>
    <p className="text-gray-500">Aucun workflow configuré pour ce service</p>
  </div>
)}

              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistiques */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100/50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5 text-orange-600" />
                  Aperçu rapide
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium">Documents</span>
                  </div>
                  <Badge variant="outline" className="bg-white">{service.requiredDocuments?.length || 0}</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <FormInput className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">Champs</span>
                  </div>
                  <Badge variant="outline" className="bg-white">{service.formFields?.length || 0}</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-purple-100/50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Workflow className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium">Workflow</span>
                  </div>
                  <Badge variant={service.workflow && Object.keys(service.workflow).length > 0 ? "default" : "secondary"} className="bg-white">
                    {service.workflow && Object.keys(service.workflow).length > 0 ? "Configuré" : "Non défini"}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Informations système */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-100/50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5 text-gray-600" />
                  Informations système
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Créé le</label>
                  <p className="text-sm font-medium mt-1">{formatDate(service.createdAt)}</p>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Modifié le</label>
                  <p className="text-sm font-medium mt-1">{formatDate(service.updatedAt)}</p>
                </div>
                
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Type de service</label>
                  <Badge variant="secondary" className="mt-1 bg-gray-100">{service.type}</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Actions rapides */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-indigo-100/50">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Settings className="w-5 h-5 text-indigo-600" />
                  Actions rapides
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300 transition-all duration-300 rounded-xl"
                  onClick={() => setIsEditOpen(true)}
                >
                  <Edit className="w-4 h-4 mr-3" />
                  Modifier le service
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-gradient-to-r from-red-50 to-pink-50 border-red-200 hover:border-red-300 text-red-600 hover:text-red-700 transition-all duration-300 rounded-xl"
                  onClick={() => setIsDeleteOpen(true)}
                >
                  <Trash2 className="w-4 h-4 mr-3" />
                  Supprimer le service
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Dialogs */}
        <ServiceCreateEditDialog
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
           //@ts-ignore
          service={service}
          onSuccess={() => {
            refetch()
            setIsEditOpen(false)
          }}
        />

        <DeleteConfirmationDialog
          open={isDeleteOpen}
          onOpenChange={setIsDeleteOpen}
          onConfirm={handleDelete}
          isLoading={deleteServiceMutation.isPending}
          title="Supprimer le service"
          description={`Êtes-vous sûr de vouloir supprimer le service "${service.title}" ? Cette action est irréversible.`}
        />
      </div>
    </div>
  )
}