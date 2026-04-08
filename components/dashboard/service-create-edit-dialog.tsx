// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Switch } from "@/components/ui/switch"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Plus, Edit, Save } from "lucide-react"

// import { useToast } from "@/hooks/use-toast"
// import { useCreateService, useUpdateService } from "@/hooks/all-services/use-services"

// interface Service {
//   id: string
//   title: string
//   description?: string
//   category: string
//   price?: number
//   isActive: boolean
// }

// interface ServiceCreateEditDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   service?: Service | null
//   onSuccess?: () => void
// }

// const serviceCategories = [
//   { value: "consultation", label: "Consultation" },
//   { value: "formation", label: "Formation" },
//   { value: "support", label: "Support technique" },
//   { value: "maintenance", label: "Maintenance" },
//   { value: "development", label: "Développement" },
//   { value: "other", label: "Autre" },
// ]

// export function ServiceCreateEditDialog({ open, onOpenChange, service, onSuccess }: ServiceCreateEditDialogProps) {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     category: "",
//     price: "",
//     isActive: true,
//   })
// console.log(service, "service")
//   const createServiceMutation = useCreateService()
//   const updateServiceMutation = useUpdateService()
//   const { toast } = useToast()

//   const isEditing = !!service

//   useEffect(() => {
//     if (service) {
//       setFormData({
//         title: service.title,
//         description: service.description || "",
//         category: service.category,
//         price: service.price?.toString() || "",
//         isActive: service.isActive,
//       })
//     } else {
//       setFormData({
//         title: "",
//         description: "",
//         category: "",
//         price: "",
//         isActive: true,
//       })
//     }
//   }, [service, open])

//   const handleSubmit = async () => {
//     if (!formData.title.trim() || !formData.category) {
//       toast({
//         title: "Erreur",
//         description: "Veuillez remplir tous les champs obligatoires.",
//         variant: "destructive",
//       })
//       return
//     }

//     const serviceData = {
//       title: formData.title.trim(),
//       description: formData.description.trim() || undefined,
//       category: formData.category,
//       price: formData.price ? Number.parseFloat(formData.price) : undefined,
//       isActive: formData.isActive,
//     }

//     try {
//       if (isEditing && service) {
//         await updateServiceMutation.mutateAsync({
//           id: service.id,
//           data: serviceData,
//         })
//         toast({
//           title: "Service modifié",
//           description: "Le service a été modifié avec succès.",
//         })
//       } else {
//         await createServiceMutation.mutateAsync(serviceData)
//         toast({
//           title: "Service créé",
//           description: "Le service a été créé avec succès.",
//         })
//       }

//       onSuccess?.()
//     } catch (error) {
//       toast({
//         title: "Erreur",
//         description: `Erreur lors de ${isEditing ? "la modification" : "la création"} du service.`,
//         variant: "destructive",
//       })
//     }
//   }

//   const isLoading = createServiceMutation.isPending || updateServiceMutation.isPending

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             {isEditing ? (
//               <>
//                 <Edit className="w-5 h-5" />
//                 Modifier le service
//               </>
//             ) : (
//               <>
//                 <Plus className="w-5 h-5" />
//                 Créer un nouveau service
//               </>
//             )}
//           </DialogTitle>
//           <DialogDescription>
//             {isEditing ? "Modifiez les informations de ce service." : "Créez un nouveau service pour votre plateforme."}
//           </DialogDescription>
//         </DialogHeader>

//         <div className="space-y-4 py-4">
//           <div className="space-y-2">
//             <Label htmlFor="name">Nom du service *</Label>
//             <Input
//               id="name"
//               value={formData.title}
//               onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
//               placeholder="Ex: Consultation technique"
//             />
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="category">Catégorie *</Label>
//             <Select
//               value={formData.category}
//               onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Sélectionnez une catégorie" />
//               </SelectTrigger>
//               <SelectContent>
//                 {serviceCategories.map((category) => (
//                   <SelectItem key={category.value} value={category.value}>
//                     {category.label}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

         

//           <div className="space-y-2">
//             <Label htmlFor="description">Description</Label>
//             <Textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
//               placeholder="Décrivez ce service..."
//               rows={4}
//             />
//           </div>

//           <div className="flex items-center space-x-2">
//             <Switch
//               id="isActive"
//               checked={formData.isActive}
//               onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
//             />
//             <Label htmlFor="isActive">Service actif</Label>
//           </div>
//         </div>

//         <DialogFooter>
//           <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
//             Annuler
//           </Button>
//           <Button onClick={handleSubmit} disabled={isLoading}>
//             {isLoading ? (
//               <>
//                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
//                 {isEditing ? "Modification..." : "Création..."}
//               </>
//             ) : (
//               <>
//                 <Save className="w-4 h-4 mr-2" />
//                 {isEditing ? "Modifier" : "Créer"}
//               </>
//             )}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Save, ChevronLeft, ChevronRight, X, FileText, FormInput, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { useToast } from "@/hooks/use-toast"
import { useCreateService, useUpdateService } from "@/hooks/all-services/use-services"

interface FormField {
  name: string
  type: string
  required: boolean
  label?: string
  options?: string[]
}

// interface Service {
//   id: string
//   type: string
//   title: string
//   description?: string
//   icon?: string
//   category: string
//   isActive: boolean
//   requiredDocuments: string[]
//   formFields: FormField[]
//   workflow: object
// }
 interface Service {
    id: string;
    type: string;
    title: string;
    description?: string;
    icon?: string;
    category: string;
    isActive: boolean;
    requiredDocuments: string[];
    formFields: FormField[]; // préciser si la structure est connue
    workflow: Record<string, unknown>; // préciser si la structure est connue
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
  }[];
interface ServiceCreateEditDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service?: Service | null
  onSuccess?: () => void
}

const serviceCategories = [
  { value: "consultation", label: "Consultation" },
  { value: "formation", label: "Formation" },
  { value: "support", label: "Support technique" },
  { value: "maintenance", label: "Maintenance" },
  { value: "development", label: "Développement" },
  { value: "other", label: "Autre" },
]

const serviceTypes = [
  { value: "rdv", label: "Rendez-vous" },
  { value: "partenariat", label: "Partenariat" },
  { value: "mariage", label: "Mariage" },
  { value: "other", label: "Autre" },
]

const fieldTypes = [
  { value: "text", label: "Texte" },
  { value: "email", label: "Email" },
  { value: "number", label: "Nombre" },
  { value: "date", label: "Date" },
  { value: "select", label: "Liste déroulante" },
  { value: "textarea", label: "Zone de texte" },
  { value: "checkbox", label: "Case à cocher" },
  { value: "file", label: "Fichier" },
]

const commonDocuments = [
  "Carte d'identité",
  "Passeport", 
  "Justificatif de domicile",
  "Relevé bancaire",
  "Certificat de naissance",
  "Diplôme",
  "CV",
  "Photo d'identité",
]

export function ServiceCreateEditDialog({ open, onOpenChange, service, onSuccess }: ServiceCreateEditDialogProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    type: "",
    customType: "",
    title: "",
    description: "",
    icon: "",
    category: "",
    isActive: true,
    requiredDocuments: [] as string[],
    formFields: [] as FormField[],
  })

  // États pour les nouveaux champs
  const [newDocument, setNewDocument] = useState("")
  const [newField, setNewField] = useState<FormField>({
    name: "",
    type: "text",
    required: false,
    label: "",
    options: []
  })
  const [newFieldOption, setNewFieldOption] = useState("")

  const createServiceMutation = useCreateService()
  const updateServiceMutation = useUpdateService()
  const { toast } = useToast()

  const isEditing = !!service
  const totalSteps = 3

  useEffect(() => {
    if (service) {
      setFormData({
        type: service.type,
        customType: service.type === "other" ? service.type : "",
        title: service.title,
        description: service.description || "",
        icon: service.icon || "",
        category: service.category,
        isActive: service.isActive,
        requiredDocuments: service.requiredDocuments || [],
        formFields: service.formFields || [],
      })
    } else {
      setFormData({
        type: "",
        customType: "",
        title: "",
        description: "",
        icon: "",
        category: "",
        isActive: true,
        requiredDocuments: [],
        formFields: [],
      })
    }
    setCurrentStep(1)
  }, [service, open])

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const canProceedToStep2 = () => {
    return formData.title.trim() && formData.category && formData.type &&
           (formData.type !== "other" || formData.customType.trim())
  }

  const addDocument = (document: string) => {
    if (document && !formData.requiredDocuments.includes(document)) {
      setFormData(prev => ({
        ...prev,
        requiredDocuments: [...prev.requiredDocuments, document]
      }))
    }
    setNewDocument("")
  }

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      requiredDocuments: prev.requiredDocuments.filter((_, i) => i !== index)
    }))
  }

  const addFieldOption = () => {
    if (newFieldOption.trim()) {
      setNewField(prev => ({
        ...prev,
        options: [...(prev.options || []), newFieldOption.trim()]
      }))
      setNewFieldOption("")
    }
  }

  const removeFieldOption = (index: number) => {
    setNewField(prev => ({
      ...prev,
      options: prev.options?.filter((_, i) => i !== index) || []
    }))
  }

  const addFormField = () => {
    if (newField.name.trim()) {
      const field = {
        ...newField,
        label: newField.label || newField.name
      }
      setFormData(prev => ({
        ...prev,
        formFields: [...prev.formFields, field]
      }))
      setNewField({
        name: "",
        type: "text",
        required: false,
        label: "",
        options: []
      })
    }
  }

  const removeFormField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      formFields: prev.formFields.filter((_, i) => i !== index)
    }))
  }

  const handleSubmit = async () => {
    if (!canProceedToStep2()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      })
      return
    }

    const serviceData = {
      type: formData.type === "other" ? formData.customType.trim() : formData.type,
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      icon: formData.icon.trim() || undefined,
      category: formData.category,
      isActive: formData.isActive,
      requiredDocuments: formData.requiredDocuments,
      formFields: formData.formFields,
      workflow: {},
    }

    try {
      if (isEditing && service) {
        await updateServiceMutation.mutateAsync({
          id: service.id,
          data: serviceData,
        })
        toast({
          title: "Service modifié",
          description: "Le service a été modifié avec succès.",
        })
      } else {
        await createServiceMutation.mutateAsync(serviceData)
        toast({
          title: "Service créé",
          description: "Le service a été créé avec succès.",
        })
      }

      onSuccess?.()
    } catch (error) {
      toast({
        title: "Erreur",
        description: `Erreur lors de ${isEditing ? "la modification" : "la création"} du service.`,
        variant: "destructive",
      })
    }
  }

  const isLoading = createServiceMutation.isPending || updateServiceMutation.isPending

  const stepConfig = [
    {
      step: 1,
      title: "Informations générales",
      description: "Configuration de base du service",
      icon: <Info className="w-5 h-5" />
    },
    {
      step: 2,
      title: "Documents requis",
      description: "Documents nécessaires pour le service",
      icon: <FileText className="w-5 h-5" />
    },
    {
      step: 3,
      title: "Champs du formulaire",
      description: "Configuration des champs personnalisés",
      icon: <FormInput className="w-5 h-5" />
    }
  ]

  const renderStep1 = () => (
    <Card className="rounded-[7px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="w-5 h-5 text-primary" />
          Informations générales
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-medium">
              Titre du service <span className="text-destructive">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Ex: Consultation technique"
              className="h-10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className="text-sm font-medium">
              Catégorie <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Sélectionnez une catégorie" />
              </SelectTrigger>
              <SelectContent>
                {serviceCategories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="type" className="text-sm font-medium">
              Type <span className="text-destructive">*</span>
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => {
                setFormData((prev) => ({ 
                  ...prev, 
                  type: value,
                  customType: value === "other" ? prev.customType : ""
                }))
              }}
            >
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Sélectionnez un type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {formData.type === "other" && (
            <div className="space-y-2">
              <Label htmlFor="customType" className="text-sm font-medium">
                Type personnalisé <span className="text-destructive">*</span>
              </Label>
              <Input
                id="customType"
                value={formData.customType}
                onChange={(e) => setFormData((prev) => ({ ...prev, customType: e.target.value }))}
                placeholder="Précisez le type de service"
                className="h-10"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="icon" className="text-sm font-medium">Icône</Label>
            <Input
              id="icon"
              value={formData.icon}
              onChange={(e) => setFormData((prev) => ({ ...prev, icon: e.target.value }))}
              placeholder="Ex: settings, calendar, etc."
              className="h-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description" className="text-sm font-medium">Description</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Décrivez ce service..."
            rows={4}
            className="resize-none"
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="space-y-1">
            <Label htmlFor="isActive" className="text-sm font-medium">État du service</Label>
            <p className="text-xs text-muted-foreground">
              {formData.isActive ? "Le service sera visible et accessible" : "Le service sera désactivé"}
            </p>
          </div>
          <Switch
            id="isActive"
            checked={formData.isActive}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, isActive: checked }))}
          />
        </div>
      </CardContent>
    </Card>
  )

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Documents requis
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Sélectionnez les documents que les utilisateurs devront fournir
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-sm font-medium">Ajouter des documents</Label>
            
            <div className="flex gap-2">
              <Select
                value={newDocument}
                onValueChange={setNewDocument}
              >
                <SelectTrigger className="flex-1 h-10">
                  <SelectValue placeholder="Choisir un document prédéfini" />
                </SelectTrigger>
                <SelectContent>
                  {commonDocuments.map((doc) => (
                    <SelectItem key={doc} value={doc}>
                      {doc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                onClick={() => addDocument(newDocument)}
                disabled={!newDocument}
                className="h-10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="Ou saisir un document personnalisé"
                value={newDocument}
                onChange={(e) => setNewDocument(e.target.value)}
                className="h-10"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => addDocument(newDocument)}
                disabled={!newDocument}
                className="h-10"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {formData.requiredDocuments.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Documents sélectionnés</Label>
              <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg min-h-[60px]">
                {formData.requiredDocuments.map((doc, index) => (
                  <Badge key={index} variant="secondary" className="gap-2 py-1 px-3">
                    <FileText className="w-3 h-3" />
                    {doc}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-destructive"
                      onClick={() => removeDocument(index)}
                    />
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FormInput className="w-5 h-5 text-primary" />
          Champs du formulaire
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Définissez les champs que les utilisateurs devront remplir
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <Card className="border-dashed">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Ajouter un nouveau champ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fieldName" className="text-sm font-medium">Nom du champ</Label>
                <Input
                  id="fieldName"
                  value={newField.name}
                  onChange={(e) => setNewField(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: nom, email, telephone"
                  className="h-10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fieldLabel" className="text-sm font-medium">Label d'affichage</Label>
                <Input
                  id="fieldLabel"
                  value={newField.label}
                  onChange={(e) => setNewField(prev => ({ ...prev, label: e.target.value }))}
                  placeholder="Ex: Nom complet"
                  className="h-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fieldType" className="text-sm font-medium">Type de champ</Label>
              <Select
                value={newField.type}
                onValueChange={(value) => setNewField(prev => ({ ...prev, type: value, options: [] }))}
              >
                <SelectTrigger className="h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fieldTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {newField.type === "select" && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Options (pour liste déroulante)</Label>
                <div className="flex gap-2">
                  <Input
                    value={newFieldOption}
                    onChange={(e) => setNewFieldOption(e.target.value)}
                    placeholder="Saisir une option"
                    className="h-10"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addFieldOption}
                    disabled={!newFieldOption.trim()}
                    className="h-10"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                {newField.options && newField.options.length > 0 && (
                  <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
                    {newField.options.map((option, index) => (
                      <Badge key={index} variant="outline" className="gap-1">
                        {option}
                        <X
                          className="w-3 h-3 cursor-pointer hover:text-destructive"
                          onClick={() => removeFieldOption(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <Label htmlFor="fieldRequired" className="text-sm font-medium cursor-pointer">
                Champ obligatoire
              </Label>
              <Switch
                id="fieldRequired"
                checked={newField.required}
                onCheckedChange={(checked) => setNewField(prev => ({ ...prev, required: checked }))}
              />
            </div>

            <Button
              type="button"
              onClick={addFormField}
              disabled={!newField.name.trim()}
              className="w-full h-10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Ajouter le champ
            </Button>
          </CardContent>
        </Card>

        {formData.formFields.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Champs configurés</Label>
            <div className="space-y-2">
              {formData.formFields.map((field, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg bg-card">
                  <div className="flex items-center gap-3">
                    <FormInput className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium text-sm">{field.label || field.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {fieldTypes.find(t => t.value === field.type)?.label}
                        {field.required && " • Obligatoire"}
                      </div>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFormField(index)}
                    className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl h-[85vh] flex flex-col p-0">
        {/* Header fixe */}
        <div className="flex-shrink-0 p-6 pb-0">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {isEditing ? (
                <>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Edit className="w-5 h-5 text-primary" />
                  </div>
                  Modifier le service
                </>
              ) : (
                <>
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  Créer un nouveau service
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-base">
              {isEditing ? "Modifiez les informations de ce service." : "Créez un nouveau service pour votre plateforme."}
            </DialogDescription>
          </DialogHeader>

          {/* Indicateur d'étapes */}
          <div className="mt-6">
            <div className="flex items-center justify-center space-x-4">
              {stepConfig.map((step, index) => (
                <div key={step.step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
                        step.step <= currentStep
                          ? "bg-primary text-primary-foreground shadow-md"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step.step <= currentStep ? (
                        <div className="text-sm font-bold">{step.step}</div>
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div className="text-center mt-2">
                      <div className={`text-sm font-medium ${
                        step.step === currentStep ? "text-primary" : "text-muted-foreground"
                      }`}>
                        {step.title}
                      </div>
                    </div>
                  </div>
                  {index < stepConfig.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 transition-all duration-200 ${
                        step.step < currentStep ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto px-6">
          <div className="py-6">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </div>
        </div>

        {/* Footer fixe */}
        <div className="flex-shrink-0 border-t bg-background">
          <DialogFooter className="px-6 py-4">
            <div className="flex justify-between w-full">
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => onOpenChange(false)} 
                  disabled={isLoading}
                  className="h-10"
                >
                  Annuler
                </Button>
                {currentStep > 1 && (
                  <Button 
                    variant="outline" 
                    onClick={handlePrevious}
                    className="h-10"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Précédent
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                {currentStep < totalSteps ? (
                  <Button
                    onClick={handleNext}
                    disabled={currentStep === 1 && !canProceedToStep2()}
                    className="h-10 px-6"
                  >
                    Suivant
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={isLoading}
                    className="h-10 px-6"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        {isEditing ? "Modification..." : "Création..."}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {isEditing ? "Modifier" : "Créer"}
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}