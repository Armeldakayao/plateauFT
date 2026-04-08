import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { queryKeys } from "@/lib/query-keys"
import type { SiteSettings, CreateSiteSettingsPayload, UpdateSiteSettingsPayload, ApiResponse } from "@/lib/types/api"

// Hook pour récupérer les paramètres du site
export function useSiteSettings() {
  return useQuery({
    queryKey: queryKeys.siteSettings.detail(),
    queryFn: () => apiClient.get<ApiResponse<SiteSettings>>("/site-settings"),
  })
}

// Hook pour créer les paramètres du site
export function useCreateSiteSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateSiteSettingsPayload) => apiClient.post<ApiResponse<SiteSettings>>("/site-settings", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.siteSettings.all })
    },
  })
}

// Hook pour mettre à jour les paramètres du site
export function useUpdateSiteSettings() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: UpdateSiteSettingsPayload) => apiClient.patch<ApiResponse<SiteSettings>>("/site-settings", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.siteSettings.all })
    },
  })
}
