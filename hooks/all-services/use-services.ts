import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"

// --- Query keys pour services ---
export const serviceKeys = {
  all: ["services"],
  lists: (params?: any) => ["services", params],
  details: (id: string) => ["service", id],
}

// --- Lister tous les services ---
export const useServices = (params?: { page?: number; limit?: number; category?: string }) => {
  return useQuery({
    queryKey: serviceKeys.lists(params),
    queryFn: () => apiClient.services.getAll(params),
    staleTime: 5 * 60 * 1000,
  })
}

// --- Lister services par catégorie ---
export const useServicesByCategory = (category: string, params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: serviceKeys.lists({ category, ...params }),
    queryFn: () => apiClient.services.getByCategory(category, params),
    staleTime: 5 * 60 * 1000,
  })
}

// --- Obtenir un service par ID ---
export const useServiceById = (id: string) => {
  return useQuery({
    queryKey: serviceKeys.details(id),
    queryFn: () => apiClient.services.getById(id),
    staleTime: 5 * 60 * 1000,
  })
}

// --- Créer un service (Admin) ---
export const useCreateService = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => apiClient.services.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: serviceKeys.all }),
  })
}

// --- Mettre à jour un service (Admin) ---
export const useUpdateService = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.services.update(id, data),
    onSuccess: (_, vars) => queryClient.invalidateQueries({ queryKey: serviceKeys.details(vars.id) }),
  })
}

// --- Supprimer un service (Admin) ---
export const useDeleteService = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiClient.services.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: serviceKeys.all }),
  })
}
