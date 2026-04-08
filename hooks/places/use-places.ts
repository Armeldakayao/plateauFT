import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { queryKeys } from "@/lib/query-keys"
import type { Place, CreatePlacePayload, UpdatePlacePayload, ApiResponse, PaginatedResponse } from "@/lib/types/api"

// Hook pour récupérer tous les lieux
export function usePlaces(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: queryKeys.places.list(filters),
    queryFn: () => {
      const searchParams = new URLSearchParams(filters)
      const endpoint = `/places${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
      return apiClient.get<PaginatedResponse<Place>>(endpoint)
    },
  })
}

// Hook pour récupérer un lieu spécifique
export function usePlace(id: string) {
  return useQuery({
    queryKey: queryKeys.places.detail(id),
    queryFn: () => apiClient.get<ApiResponse<Place>>(`/places/${id}`),
    enabled: !!id,
  })
}

// Hook pour créer un lieu
export function useCreatePlace() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreatePlacePayload) => apiClient.post<ApiResponse<Place>>("/places", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.places.lists() })
    },
  })
}

// Hook pour mettre à jour un lieu
export function useUpdatePlace() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlacePayload }) =>
      apiClient.patch<ApiResponse<Place>>(`/places/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.places.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.places.detail(id) })
    },
  })
}

// Hook pour supprimer un lieu
export function useDeletePlace() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.delete<ApiResponse<{ message: string }>>(`/places/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.places.lists() })
      queryClient.removeQueries({ queryKey: queryKeys.places.detail(id) })
    },
  })
}
