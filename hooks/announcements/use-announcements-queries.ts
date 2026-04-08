import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { queryKeys } from "@/lib/query-keys"
import type { Announcement, ApiResponse, PaginatedResponse } from "@/lib/types/api"

// Hook pour récupérer toutes les annonces
export function useAnnouncements(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: queryKeys.announcements.list(filters),
    queryFn: () => {
      const searchParams = new URLSearchParams(filters)
      const endpoint = `/communiques${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
      return apiClient.get<PaginatedResponse<Announcement>>(endpoint)
    },
  })
}

// Hook pour récupérer une annonce spécifique
export function useAnnouncement(id: string) {
  return useQuery({
    queryKey: queryKeys.announcements.detail(id),
    queryFn: () => apiClient.get<ApiResponse<Announcement>>(`/communiques/${id}`),
    enabled: !!id,
  })
}
