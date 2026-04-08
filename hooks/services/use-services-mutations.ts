import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { queryKeys } from "@/lib/query-keys"
import type {
  CreateServicePayload,
  CreateAdvancedServicePayload,
  CreateServiceRequestPayload,
  Service,
  AdvancedService,
  ServiceRequest,
  ApiResponse,
} from "@/lib/types/api"

// Hook pour créer un service
export function useCreateService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateServicePayload) => apiClient.post<ApiResponse<Service>>("/services", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.lists() })
    },
  })
}

// Hook pour mettre à jour un service
export function useUpdateService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateServicePayload> }) =>
      apiClient.patch<ApiResponse<Service>>(`/services/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.services.detail(id) })
    },
  })
}

// Hook pour supprimer un service
export function useDeleteService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.delete<ApiResponse<{ message: string }>>(`/services/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.lists() })
      queryClient.removeQueries({ queryKey: queryKeys.services.detail(id) })
    },
  })
}

// Hook pour créer un service avancé
export function useCreateAdvancedService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateAdvancedServicePayload) =>
      apiClient.post<ApiResponse<AdvancedService>>("/advanced-services", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.advanced.lists() })
    },
  })
}

// Hook pour mettre à jour un service avancé
export function useUpdateAdvancedService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateAdvancedServicePayload> }) =>
      apiClient.patch<ApiResponse<AdvancedService>>(`/advanced-services/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.advanced.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.services.advanced.detail(id) })
    },
  })
}

// Hook pour supprimer un service avancé
export function useDeleteAdvancedService() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.delete<ApiResponse<{ message: string }>>(`/advanced-services/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.advanced.lists() })
      queryClient.removeQueries({ queryKey: queryKeys.services.advanced.detail(id) })
    },
  })
}

// Hook pour créer une demande de service
export function useCreateServiceRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateServiceRequestPayload) =>
      apiClient.post<ApiResponse<ServiceRequest>>("/service-requests", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.requests.lists() })
    },
  })
}

// Hook pour mettre à jour une demande de service
export function useUpdateServiceRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateServiceRequestPayload> }) =>
      apiClient.patch<ApiResponse<ServiceRequest>>(`/service-requests/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.requests.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.services.requests.detail(id) })
    },
  })
}

// Hook pour supprimer une demande de service
export function useDeleteServiceRequest() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.delete<ApiResponse<{ message: string }>>(`/service-requests/${id}`),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.services.requests.lists() })
      queryClient.removeQueries({ queryKey: queryKeys.services.requests.detail(id) })
    },
  })
}
