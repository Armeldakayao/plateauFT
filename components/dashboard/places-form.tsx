"use client"
import { useState, useCallback } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, X, ImageIcon, FileText, MapPin, Phone, Globe, Plus, Loader2 } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

import { useToast } from "@/hooks/use-toast"
import { getImageUrl } from "@/lib/api/client"
import { useUploadMultiple, useUploadSingle } from "@/hooks/uploads/use-upload-mutations"
import { useCreatePlaceMutation, useUpdatePlaceMutation } from "@/hooks/places/use-places-mutations"
import { placesFormSchema, type PlacesFormData } from "@/lib/validations/places"

interface PlacesFormProps {
  initialData?: Partial<PlacesFormData & { id: string }>
  mode?: "create" | "edit"
  onSuccess?: () => void
  onCancel?: () => void
}

export function PlacesForm({ initialData, mode = "create", onSuccess, onCancel }: PlacesFormProps) {
  const { toast } = useToast()
  const [newFeature, setNewFeature] = useState("")
  const [newSpecialty, setNewSpecialty] = useState("")
  const [posterPreview, setPosterPreview] = useState<string>(initialData?.poster ? getImageUrl(initialData.poster) : "")
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>(
    initialData?.gallery?.map((img) => getImageUrl(img)) || [],
  )

  const form = useForm<PlacesFormData>({
     //@ts-ignore
    resolver: zodResolver(placesFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      details: initialData?.details || "",
      gallery: initialData?.gallery || [],
      reviews: initialData?.reviews || [],
      phone: initialData?.phone || "",
      website: initialData?.website || "",
      address: initialData?.address || "",
      features: initialData?.features || [],
      specialties: initialData?.specialties || [],
      openingHours: initialData?.openingHours || "",
      poster: initialData?.poster || "",
      type: initialData?.type || "restaurant",
    },
  })

  const uploadSingle = useUploadSingle()
  const uploadMultiple = useUploadMultiple()
  const createMutation = useCreatePlaceMutation()
  const updateMutation = useUpdatePlaceMutation()

  const handlePosterUpload = useCallback(
    async (file: File) => {
      try {
        const previewUrl = URL.createObjectURL(file)
        setPosterPreview(previewUrl)

        const result = await uploadSingle.mutateAsync(file)
        if (result.success && result.data?.filePath) {
          form.setValue("poster", result.data.filePath)
          toast({
            title: "Succès",
            description: "Image poster uploadée avec succès",
          })
        }
      } catch (error) {
        console.error("Erreur upload poster:", error)
        toast({
          title: "Erreur",
          description: "Erreur lors de l'upload du poster",
          variant: "destructive",
        })
      }
    },
    [uploadSingle, toast, form],
  )

  const handleGalleryUpload = useCallback(
    async (files: File[]) => {
      try {
        const newPreviews = files.map((file) => URL.createObjectURL(file))
        setGalleryPreviews((prev) => [...prev, ...newPreviews])

        const result = await uploadMultiple.mutateAsync(files)
        if (result.success && result.data?.filePaths) {
          const currentGallery = form.getValues("gallery")
          form.setValue("gallery", [...currentGallery, ...result.data.filePaths])
          toast({
            title: "Succès",
            description: `${files.length} image(s) uploadée(s) avec succès`,
          })
        }
      } catch (error) {
        console.error("Erreur upload gallery:", error)
        toast({
          title: "Erreur",
          description: "Erreur lors de l'upload des images",
          variant: "destructive",
        })
      }
    },
    [uploadMultiple, toast, form],
  )

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      const currentFeatures = form.getValues("features")
      if (!currentFeatures.includes(newFeature.trim())) {
        form.setValue("features", [...currentFeatures, newFeature.trim()])
        setNewFeature("")
      }
    }
  }

  const handleAddSpecialty = () => {
    if (newSpecialty.trim()) {
      const currentSpecialties = form.getValues("specialties")
      if (!currentSpecialties.includes(newSpecialty.trim())) {
        form.setValue("specialties", [...currentSpecialties, newSpecialty.trim()])
        setNewSpecialty("")
      }
    }
  }

  const handleRemovePoster = () => {
    setPosterPreview("")
    form.setValue("poster", "")
    toast({
      title: "Image supprimée",
      description: "L'image principale a été supprimée",
    })
  }

  const handleRemoveGalleryImage = (index: number) => {
    const currentGallery = form.getValues("gallery")
    form.setValue(
      "gallery",
      currentGallery.filter((_, i) => i !== index),
    )
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  // const onSubmit = async (data: PlacesFormData) => {
  //   try {
  //     if (mode === "create") {
  //        //@ts-ignore
  //       await createMutation.mutateAsync(data)
  //       toast({
  //         title: "Succès",
  //         description: "Lieu créé avec succès",
  //       })
  //     } else {
  //       if (!initialData?.id) {
  //         throw new Error("ID manquant pour la mise à jour")
  //       }
  //       await updateMutation.mutateAsync({
  //         id: initialData.id,
  //         data,
  //       })
  //       toast({
  //         title: "Succès",
  //         description: "Lieu modifié avec succès",
  //       })
  //     }
  //     onSuccess?.()
  //   } catch (error) {
  //     console.error("Erreur lors de la soumission:", error)
  //     toast({
  //       title: "Erreur",
  //       description: "Erreur lors de la sauvegarde",
  //       variant: "destructive",
  //     })
  //   }
  // }
const onSubmit = async (data: PlacesFormData) => {
  try {
    // Si aucun site n'est renseigné, générer un lien Google Search
    if (!data.website || data.website.trim() === "") {
      const query = encodeURIComponent(data.title.trim());
      data.website = `https://www.google.com/search?q=${query}`;
    }

    if (mode === "create") {
      //@ts-ignore
      await createMutation.mutateAsync(data);
      toast({
        title: "Succès",
        description: "Lieu créé avec succès",
      });
    } else {
      if (!initialData?.id) {
        throw new Error("ID manquant pour la mise à jour");
      }
      await updateMutation.mutateAsync({
        id: initialData.id,
        data,
      });
      toast({
        title: "Succès",
        description: "Lieu modifié avec succès",
      });
    }
    onSuccess?.();
  } catch (error) {
    console.error("Erreur lors de la soumission:", error);
    toast({
      title: "Erreur",
      description: "Erreur lors de la sauvegarde",
      variant: "destructive",
    });
  }
};

  const isLoading =
    createMutation.isPending || updateMutation.isPending || uploadSingle.isPending || uploadMultiple.isPending

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full h-full flex flex-col"
    >
      <Card className="flex-1 border-none shadow-none">
        <CardContent className="p-0 h-full flex flex-col">
          <Form {...form}>
            <form
             //@ts-ignore
             onSubmit={form.handleSubmit(onSubmit)} className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto pr-2 space-y-6 max-h-[calc(80vh-120px)]">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du lieu *</FormLabel>
                        <FormControl>
                          <Input placeholder="Nom du lieu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border border-gray-300 rounded-[5px]">
                              <SelectValue placeholder="Sélectionner un type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="restaurant">Restaurant</SelectItem>
                            <SelectItem value="hotel">Hôtel</SelectItem>
                            <SelectItem value="activity">Activité</SelectItem>
                            <SelectItem value="landmark">Monument</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          Adresse *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Adresse complète" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          Téléphone
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="+33 1 23 45 67 89" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Site web
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="openingHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horaires d'ouverture</FormLabel>
                        <FormControl>
                          <Input placeholder="Lun-Ven: 9h-18h, Sam: 10h-16h" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description courte *</FormLabel>
                        <FormControl>
                          <Textarea className="border border-gray-300 rounded-[5px]" placeholder="Description courte du lieu..." rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="details"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Détails complets *</FormLabel>
                        <FormControl>
                          <Textarea className="border border-gray-300 rounded-[5px]" placeholder="Détails complets du lieu..." rows={6} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="poster"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image principale</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                            <AnimatePresence mode="wait">
                              {posterPreview ? (
                                <motion.div
                                  key="preview"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  className="relative"
                                >
                                  <img
                                    src={posterPreview || "/placeholder.svg"}
                                    alt="Poster preview"
                                    className="w-full h-48 object-cover rounded-lg"
                                  />
                                  <div className="absolute top-2 right-2 flex gap-2">
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        const file = e.target.files?.[0]
                                        if (file) handlePosterUpload(file)
                                      }}
                                      className="hidden"
                                      id="poster-replace"
                                    />
                                    <Button type="button" variant="secondary" size="sm" asChild>
                                      <label htmlFor="poster-replace" className="cursor-pointer">
                                        <Upload className="w-4 h-4" />
                                      </label>
                                    </Button>
                                    <Button type="button" variant="destructive" size="sm" onClick={handleRemovePoster}>
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  key="upload"
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.9 }}
                                  className="text-center"
                                >
                                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                  <p className="text-gray-600 mb-2">Cliquez pour sélectionner une image principale</p>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => {
                                      const file = e.target.files?.[0]
                                      if (file) handlePosterUpload(file)
                                    }}
                                    className="hidden"
                                    id="poster-upload"
                                  />
                                  <Button type="button" variant="outline" asChild>
                                    <label htmlFor="poster-upload" className="cursor-pointer">
                                      <Upload className="w-4 h-4 mr-2" />
                                      Choisir une image
                                    </label>
                                  </Button>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="gallery"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Galerie d'images</FormLabel>
                        <FormControl>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-gray-400 transition-colors">
                            <div className="text-center mb-4">
                              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 mb-2">Ajoutez des images à la galerie</p>
                              <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={(e) => {
                                  const files = Array.from(e.target.files || [])
                                  if (files.length > 0) handleGalleryUpload(files)
                                }}
                                className="hidden"
                                id="gallery-upload"
                              />
                              <Button type="button" variant="outline" asChild>
                                <label htmlFor="gallery-upload" className="cursor-pointer">
                                  <Upload className="w-4 h-4 mr-2" />
                                  Choisir des images
                                </label>
                              </Button>
                            </div>

                            <AnimatePresence>
                              {galleryPreviews.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4"
                                >
                                  {galleryPreviews.map((preview, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.8 }}
                                      transition={{ delay: index * 0.1 }}
                                      className="relative group"
                                    >
                                      <img
                                        src={preview || "/placeholder.svg"}
                                        alt={`Gallery ${index + 1}`}
                                        className="w-full h-24 object-cover rounded-lg"
                                      />
                                      <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        className="absolute top-1 right-1 w-6 h-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleRemoveGalleryImage(index)}
                                      >
                                        <X className="w-3 h-3" />
                                      </Button>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="features"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Caractéristiques</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Input
                                value={newFeature}
                                onChange={(e) => setNewFeature(e.target.value)}
                                placeholder="Ajouter une caractéristique..."
                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddFeature())}
                              />
                              <Button type="button" onClick={handleAddFeature} variant="outline">
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <AnimatePresence>
                              {field.value.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="flex flex-wrap gap-2"
                                >
                                  {field.value.map((feature, index) => (
                                    <motion.div
                                      key={feature}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.8 }}
                                      transition={{ delay: index * 0.05 }}
                                    >
                                      <Badge variant="secondary" className="flex items-center gap-1">
                                        {feature}
                                        <X
                                          className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                                          onClick={() => {
                                            const currentFeatures = form.getValues("features")
                                            form.setValue(
                                              "features",
                                              currentFeatures.filter((_, i) => i !== index),
                                            )
                                          }}
                                        />
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>

                <motion.div  className="pb-10" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                  <FormField
                   //@ts-ignore
                    control={form.control}
                    name="specialties"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Spécialités</FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <Input
                                value={newSpecialty}
                                onChange={(e) => setNewSpecialty(e.target.value)}
                                placeholder="Ajouter une spécialité..."
                                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), handleAddSpecialty())}
                              />
                              <Button type="button" onClick={handleAddSpecialty} variant="outline">
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                            <AnimatePresence>
                              {field.value.length > 0 && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="flex flex-wrap gap-2"
                                >
                                  {field.value.map((specialty, index) => (
                                    <motion.div
                                      key={specialty}
                                      initial={{ opacity: 0, scale: 0.8 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      exit={{ opacity: 0, scale: 0.8 }}
                                      transition={{ delay: index * 0.05 }}
                                    >
                                      <Badge variant="secondary" className="flex items-center gap-1">
                                        {specialty}
                                        <X
                                          className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors"
                                          onClick={() => {
                                            const currentSpecialties = form.getValues("specialties")
                                            form.setValue(
                                              "specialties",
                                              currentSpecialties.filter((_, i) => i !== index),
                                            )
                                          }}
                                        />
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="flex justify-end gap-4 pt-6 border-t bg-white"
              >
                <Button type="button" variant="outline" onClick={onCancel}>
                  Annuler
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {mode === "create" ? "Créer" : "Mettre à jour"}
                </Button>
              </motion.div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
