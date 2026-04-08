import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { ServiceRequestFilters } from "@/lib/types/service-request"
import { queryKeys } from "@/lib/query-keys"


export const useServiceRequests = (filters?: ServiceRequestFilters) => {
  return useQuery({
    queryKey: queryKeys.serviceRequests.list(filters),
    queryFn: () => apiClient.serviceRequests.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const useMyServiceRequests = (filters?: ServiceRequestFilters) => {
  return useQuery({
    queryKey: queryKeys.serviceRequests.myRequests(filters),
    queryFn: () => apiClient.serviceRequests.getMyRequests(filters),
    staleTime: 5 * 60 * 1000,
  })
}

export const useServiceRequest = (id: string) => {
  return useQuery({
    queryKey: queryKeys.serviceRequests.detail(id),
    queryFn: () => apiClient.serviceRequests.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useServiceRequestStatistics = (filters?: any) => {
  return useQuery({
    queryKey: queryKeys.serviceRequests.stats(filters),
    queryFn: () => apiClient.serviceRequests.getStatistics(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useServiceRequestByReference = (reference: string) => {
  return useQuery({
    queryKey: queryKeys.serviceRequests.byReference(reference),
    queryFn: () => apiClient.serviceRequests.getByReference(reference),
    enabled: !!reference,
    staleTime: 5 * 60 * 1000,
  })
}

export const useServiceRequestStats = (filters?: any) => {
  return useQuery({
    queryKey: queryKeys.serviceRequests.stats(filters),
    queryFn: () => apiClient.serviceRequests.getStats(filters),
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useAgentWorkload = (agentId: string) => {
  return useQuery({
    queryKey: queryKeys.serviceRequests.agentWorkload(agentId),
    queryFn: () => apiClient.serviceRequests.getAgentWorkload(agentId),
    enabled: !!agentId,
    staleTime: 10 * 60 * 1000,
  })
}
