"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { useToast } from "@/lib/hooks/use-toast"
// import { queryKeys.users } from "@/lib/query-keys"
import type { UpdateUserPayload, User } from "@/lib/types/api"
import { queryKeys } from "@/lib/query-keys"

// Récupérer tous les utilisateurs
export const useUsers = (filters?: Record<string, any>) => {
  return useQuery({
    //@ts-ignore
    queryKey: queryKeys.users.list(filters),
    queryFn: () => apiClient.users.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

// Récupérer un utilisateur spécifique
export const useUser = (id: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(id),
    queryFn: () => apiClient.users.getById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

// Hook pour le profil de l'utilisateur connecté
export const useProfile = () => {
  return useQuery({
    queryKey: queryKeys.users.profile(),
    queryFn: () => apiClient.users.getById("profile"), // ou /users/profile selon ton API
    staleTime: 5 * 60 * 1000,
  })
}

// Mettre à jour un utilisateur
export const useUpdateUser = () => {
  const queryClient = useQueryClient()
  const { showSuccess, showError, showLoading, dismiss } = useToast()

  return useMutation({
    mutationFn: (payload: { id: string; data: UpdateUserPayload }) =>
      apiClient.users.update(payload.id, payload.data),
    onSuccess: (_, { id }) => {
        //@ts-ignore
      queryClient.invalidateQueries({ queryKey: queryKeys.users.list() })
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(id) })
      showSuccess("Utilisateur mis à jour avec succès")
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Erreur lors de la mise à jour")
    },
  })
}

// Supprimer un utilisateur
export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const { showSuccess, showError, showLoading, dismiss } = useToast()

  return useMutation({
    mutationFn: (id: string) => apiClient.users.delete(id),
    onSuccess: (_, id) => {
        //@ts-ignore
      queryClient.invalidateQueries({ queryKey: queryKeys.users.list() })
      queryClient.removeQueries({ queryKey: queryKeys.users.detail(id) })
      showSuccess("Utilisateur supprimé avec succès")
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Erreur lors de la suppression")
    },
  })
}

// Mettre à jour le profil de l'utilisateur connecté
export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  const { showSuccess, showError } = useToast()

  return useMutation({
    mutationFn: (data: UpdateUserPayload) => apiClient.users.update("profile", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.profile() })
        //@ts-ignore
      queryClient.invalidateQueries({ queryKey: queryKeys.users.list() })
      showSuccess("Profil mis à jour avec succès")
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Erreur lors de la mise à jour du profil")
    },
  })
}
