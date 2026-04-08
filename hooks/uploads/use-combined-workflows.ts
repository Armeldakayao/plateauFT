import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { announcementKeys, serviceKeys, placeKeys, userKeys } from "@/lib/query-keys"
import type {
  CreateAnnouncementWithImageRequest,
  CreateServiceWithImagesRequest,
  CreatePlaceWithImagesRequest,
  CreateAnnouncementRequest,
  CreateServiceRequest,
  CreatePlaceRequest,
} from "@/lib/types/api"

// Hook pour créer une annonce avec image
export const useCreateAnnouncementWithImage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ announcement, image }: CreateAnnouncementWithImageRequest) => {
      let imageUrl = ""

      // 1. Upload de l'image si elle existe
      if (image) {
        const uploadResult = await apiClient.upload.single(image)
        imageUrl = uploadResult.data.url || ""
      }

      // 2. Création de l'annonce avec l'URL de l'image
      const announcementData: CreateAnnouncementRequest = {
        ...announcement,
        poster: imageUrl || announcement.poster || "",
      }

      return apiClient.announcements.create(announcementData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: announcementKeys.all })
    },
  })
}

// Hook pour créer un service avec images
export const useCreateServiceWithImages = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ service, images }: CreateServiceWithImagesRequest) => {
      let iconUrl = ""

      // 1. Upload de l'icône si elle existe
      if (images && images.length > 0) {
        const uploadResult = await apiClient.upload.single(images[0])
        iconUrl = uploadResult.data.url || ""
      }

      // 2. Création du service avec l'URL de l'icône
      const serviceData: CreateServiceRequest = {
        ...service,
        icon: iconUrl || service.icon || "",
      }

      return apiClient.services.create(serviceData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: serviceKeys.all })
    },
  })
}

// Hook pour créer un lieu avec images
export const useCreatePlaceWithImages = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ place, posterImage, galleryImages }: CreatePlaceWithImagesRequest) => {
      let posterUrl = ""
      let galleryUrls: string[] = []

      // 1. Upload du poster si il existe
      if (posterImage) {
        const uploadResult = await apiClient.upload.single(posterImage)
        posterUrl = uploadResult.data.url || ""
      }

      // 2. Upload de la galerie si elle existe
      if (galleryImages && galleryImages.length > 0) {
        const uploadResult = await apiClient.upload.multiple(galleryImages)
        galleryUrls = uploadResult.data.urls || []
      }

      // 3. Création du lieu avec les URLs des images
      const placeData: CreatePlaceRequest = {
        ...place,
        poster: posterUrl || place.poster || "",
        gallery: [...(place.gallery || []), ...galleryUrls],
      }

      return apiClient.places.create(placeData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placeKeys.all })
    },
  })
}

// Hook pour mettre à jour un avatar utilisateur
export const useUpdateUserAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ userId, avatar }: { userId: string; avatar: File }) => {
      // 1. Upload de l'avatar
      const uploadResult = await apiClient.upload.avatar(avatar)
      const avatarUrl = uploadResult.data.url || ""

      // 2. Mise à jour du profil utilisateur
      return apiClient.users.update(userId, { avatar: avatarUrl })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: userKeys.all })
    },
  })
}
