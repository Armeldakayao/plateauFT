import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { CreateTreatmentRequest, MariageRequest, PartenaritRequest, RdvRequest, UpdateTreatmentRequest } from "@/lib/types/service-request"
import { queryKeys } from "@/lib/query-keys"



export const useCreateRdvRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: RdvRequest) => apiClient.serviceRequests.createRdv(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.myRequests() })
    },
  })
}

export const useCreatePartenaritRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PartenaritRequest) => apiClient.serviceRequests.createPartenariat(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.myRequests() })
    },
  })
}

export const useCreateMariageRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: MariageRequest) => apiClient.serviceRequests.createMariage(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.lists() })
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.myRequests() })
    },
  })
}

export const useCreateTreatment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateTreatmentRequest) => apiClient.serviceRequests.createTreatment(data),
    onSuccess: (_, { demandeId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.detail(demandeId) })
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.lists() })
    },
  })
}

export const useUpdateTreatment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTreatmentRequest }) =>
      apiClient.serviceRequests.updateTreatment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.lists() })
    },
  })
}

export const useFinalizeTreatment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => apiClient.serviceRequests.finalizeTreatment(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.lists() })
    },
  })
}

export const useUploadServiceRequestDocuments = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      requestId,
      files,
      type,
      description,
    }: {
      requestId: string
      files: File[]
      type: string
      description?: string
    }) => apiClient.serviceRequests.uploadDocuments(requestId, files, type, description),
    onSuccess: (_, { requestId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.detail(requestId) })
    },
  })
}

export const useUploadTreatmentDocuments = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      treatmentId,
      files,
      type,
      description,
    }: {
      treatmentId: string
      files: File[]
      type: string
      description?: string
    }) => apiClient.serviceRequests.uploadTreatmentDocuments(treatmentId, files, type, description),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.serviceRequests.lists() })
    },
  })
}
