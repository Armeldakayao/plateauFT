import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { communiquesKeys } from "@/lib/query-keys"
import type { CreateCommuniqueRequest, UpdateCommuniqueRequest, AddCommentRequest } from "@/lib/types/api"

export const useCreateCommunique = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateCommuniqueRequest) => apiClient.communiques.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communiquesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: communiquesKeys.stats() })
    },
  })
}

export const useUpdateCommunique = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCommuniqueRequest }) => apiClient.communiques.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: communiquesKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: communiquesKeys.lists() })
    },
  })
}

export const useDeleteCommunique = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.communiques.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communiquesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: communiquesKeys.stats() })
    },
  })
}

export const useActivateCommunique = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.communiques.activate(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: communiquesKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: communiquesKeys.lists() })
    },
  })
}

export const useDeactivateCommunique = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.communiques.deactivate(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: communiquesKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: communiquesKeys.lists() })
    },
  })
}

export const useAddComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddCommentRequest }) => apiClient.communiques.addComment(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: communiquesKeys.detail(id) })
      queryClient.invalidateQueries({ queryKey: communiquesKeys.lists() })
    },
  })
}

// Combined workflows with uploads
export const useCreateCommuniqueWithImages = () => {
  const queryClient = useQueryClient()
  const createCommunique = useCreateCommunique()

  return useMutation({
    mutationFn: async ({
      communiqueData,
      posterFile,
      galleryFiles,
    }: {
      communiqueData: Omit<CreateCommuniqueRequest, "poster" | "gallery">
      posterFile?: File
      galleryFiles?: File[]
    }) => {
      let poster = ""
      let gallery: string[] = []

      // Upload poster if provided
      if (posterFile) {
        const posterResponse = await apiClient.upload.single(posterFile)
        poster = posterResponse.data.url
      }

      // Upload gallery images if provided
      if (galleryFiles && galleryFiles.length > 0) {
        const galleryResponse = await apiClient.upload.multiple(galleryFiles)
        gallery = galleryResponse.data.urls
      }

      // Create communique with uploaded image URLs
      return createCommunique.mutateAsync({
        ...communiqueData,
        poster,
        gallery,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communiquesKeys.lists() })
      queryClient.invalidateQueries({ queryKey: communiquesKeys.stats() })
    },
  })
}
