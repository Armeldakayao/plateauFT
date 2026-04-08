import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { queryKeys } from "@/lib/query-keys"
import type {
  CreateAnnouncementPayload,
  UpdateAnnouncementPayload,
  AddCommentPayload,
  Announcement,
  ApiResponse,
} from "@/lib/types/api"

// Hook pour créer une annonce
export function useCreateAnnouncement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateAnnouncementPayload) => apiClient.post<ApiResponse<Announcement>>("/communiques", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.announcements.lists() })
    },
  })
}

// Hook pour mettre à jour une annonce
export function useUpdateAnnouncement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAnnouncementPayload }) =>
      apiClient.patch<ApiResponse<Announcement>>(`/communiques/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.announcements.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.announcements.detail(id) })
    },
  })
}

// Hook pour supprimer une annonce
export function useDeleteAnnouncement() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.delete<ApiResponse<{ message: string }>>(`/communiques/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.announcements.lists() })
      queryClient.removeQueries({ queryKey: queryKeys.announcements.detail(id) })
    },
  })
}

// Hook pour ajouter un commentaire
export function useAddComment() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: AddCommentPayload }) =>
      apiClient.post<ApiResponse<{ message: string }>>(`/announcements/${id}/comments`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.announcements.detail(id) })
      queryClient.invalidateQueries({ queryKey: queryKeys.announcements.comments(id) })
    },
  })
}
