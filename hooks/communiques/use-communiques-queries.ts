import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { communiquesKeys } from "@/lib/query-keys"
import type { CommuniquesQueryParams } from "@/lib/types/api"

export const useCommuniques = (params?: CommuniquesQueryParams) => {
  return useQuery({
    queryKey: communiquesKeys.list(params),
    queryFn: () => apiClient.communiques.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useCommunique = (id: string) => {
  return useQuery({
    queryKey: communiquesKeys.detail(id),
    queryFn: () => apiClient.communiques.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCommuniquesStats = () => {
  return useQuery({
    queryKey: communiquesKeys.stats(),
    queryFn: () => apiClient.communiques.getStats(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useCommuniquesSearch = (query: string, page?: number, limit?: number) => {
  return useQuery({
    queryKey: communiquesKeys.search(query),
    queryFn: () => apiClient.communiques.search(query, page, limit),
    enabled: !!query.trim(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}

export const useCommuniquesByType = (type: string, page?: number, limit?: number) => {
  return useQuery({
    queryKey: communiquesKeys.byType(type),
    queryFn: () => apiClient.communiques.getByType(type, page, limit),
    enabled: !!type,
    staleTime: 5 * 60 * 1000,
  })
}

export const useRecentCommuniques = () => {
  return useQuery({
    queryKey: communiquesKeys.recent(),
    queryFn: () => apiClient.communiques.getRecent(),
    staleTime: 5 * 60 * 1000,
  })
}

// Alias hooks for different types
export const useActualites = (page?: number, limit?: number) => {
  return useCommuniquesByType("actualites", page, limit)
}

export const useCommuniquesPresse = (page?: number, limit?: number) => {
  return useCommuniquesByType("communiques-presse", page, limit)
}

export const useCommuniquesMunicipaux = (page?: number, limit?: number) => {
  return useCommuniquesByType("communiques", page, limit)
}

export const useAnnonces = (page?: number, limit?: number) => {
  return useCommuniquesByType("annonces", page, limit)
}
