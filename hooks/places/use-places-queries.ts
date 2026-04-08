import { useQuery, useInfiniteQuery } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { placesKeys } from "@/lib/query-keys"

export const usePlacesQuery = (params: {
  page?: number
  limit?: number
  type?: string
  search?: string
} = {}) => {
  return useQuery({
    queryKey: placesKeys.list(params),
    queryFn: () => apiClient.places.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}

export const usePlaceQuery = (id: string) => {
  return useQuery({
    queryKey: placesKeys.detail(id),
    queryFn: () => apiClient.places.getById(id),
    enabled: !!id,
  })
}

export const useRestaurantsQuery = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: placesKeys.restaurant(),
    queryFn: () => apiClient.places.getRestaurants(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useHotelsQuery = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: placesKeys.hotels(),
    queryFn: () => apiClient.places.getHotels(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useActivitiesQuery = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: placesKeys.activities(),
    queryFn: () => apiClient.places.getActivities(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useLandmarksQuery = (params?: { page?: number; limit?: number }) => {
  return useQuery({
    queryKey: placesKeys.landmarks(),
    queryFn: () => apiClient.places.getLandmarks(params),
    staleTime: 5 * 60 * 1000,
  })
}

export const useInfinitePlacesQuery = (params?: {
  type?: string
  search?: string
  limit?: number
}) => {
  return useInfiniteQuery({
    queryKey: placesKeys.infinite(params),
    queryFn: ({ pageParam = 1 }) => apiClient.places.getAll({ ...params, page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.page && lastPage.totalPages && lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1
      }
      return undefined
    },
    initialPageParam: 1,
  })
}
