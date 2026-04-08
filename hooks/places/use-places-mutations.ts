"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { useToast } from "@/lib/hooks/use-toast"
import { placesKeys } from "@/lib/query-keys"
import type { CreatePlaceRequest, UpdatePlaceRequest } from "@/lib/types/api"

export const useCreatePlaceMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreatePlaceRequest) => {
      const loadingToast = showLoading("Création du lieu...")
      try {
        const response = await apiClient.places.create(data)
        dismiss(loadingToast)
        showSuccess("Lieu créé avec succès")
        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placesKeys.all })
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Erreur lors de la création du lieu")
    },
  })
}

export const useUpdatePlaceMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePlaceRequest }) => {
      const loadingToast = showLoading("Mise à jour du lieu...")
      try {
        const response = await apiClient.places.update(id, data)
        dismiss(loadingToast)
        showSuccess("Lieu mis à jour avec succès")
        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: placesKeys.all })
      queryClient.invalidateQueries({ queryKey: placesKeys.detail(id) })
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Erreur lors de la mise à jour")
    },
  })
}

export const useDeletePlaceMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const loadingToast = showLoading("Suppression du lieu...")
      try {
        const response = await apiClient.places.delete(id)
        dismiss(loadingToast)
       queryClient.invalidateQueries({ queryKey: placesKeys.all })
        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: placesKeys.all })
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Erreur lors de la suppression")
    },
  })
}
