import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { queryKeys } from "@/lib/query-keys"
import type { Service, AdvancedService, ServiceRequest, ApiResponse, PaginatedResponse } from "@/lib/types/api"

// Hook pour récupérer tous les services
export function useServices(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: queryKeys.services.list(filters),
    queryFn: () => {
      const searchParams = new URLSearchParams(filters)
      const endpoint = `/services${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
      return apiClient.get<PaginatedResponse<Service>>(endpoint)
    },
  })
}

// Hook pour récupérer un service spécifique
export function useService(id: string) {
  return useQuery({
    queryKey: queryKeys.services.detail(id),
    queryFn: () => apiClient.get<ApiResponse<Service>>(`/services/${id}`),
    enabled: !!id,
  })
}

// Hook pour récupérer tous les services avancés
export function useAdvancedServices(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: queryKeys.services.advanced.list(filters),
    queryFn: () => {
      const searchParams = new URLSearchParams(filters)
      const endpoint = `/advanced-services${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
      return apiClient.get<PaginatedResponse<AdvancedService>>(endpoint)
    },
  })
}

// Hook pour récupérer un service avancé spécifique
export function useAdvancedService(id: string) {
  return useQuery({
    queryKey: queryKeys.services.advanced.detail(id),
    queryFn: () => apiClient.get<ApiResponse<AdvancedService>>(`/advanced-services/${id}`),
    enabled: !!id,
  })
}

// Hook pour récupérer toutes les demandes de service
export function useServiceRequests(filters: Record<string, any> = {}) {
  return useQuery({
    queryKey: queryKeys.services.requests.list(filters),
    queryFn: () => {
      const searchParams = new URLSearchParams(filters)
      const endpoint = `/service-requests${searchParams.toString() ? `?${searchParams.toString()}` : ""}`
      return apiClient.get<PaginatedResponse<ServiceRequest>>(endpoint)
    },
  })
}
