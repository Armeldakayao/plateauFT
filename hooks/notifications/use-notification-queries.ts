import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { queryKeys } from "@/lib/query-keys"

export interface Notification {
  id: string
  userId: string
  message: string
  type: "info" | "warning" | "error" | "success"
  read: boolean
  createdAt: string
  updatedAt: string
}

export interface NotificationsResponse {
  data: Notification[]
  total: number
  page: number
  limit: number
  totalPages: number
  unreadCount: number
}

export function useNotificationsQuery(page = 1, limit = 10) {
  return useQuery({
    queryKey: queryKeys.notifications.list(page, limit),
    queryFn: () => apiClient.get<NotificationsResponse>(`/notifications?page=${page}&limit=${limit}`),
  })
}

export function useUnreadCountQuery() {
  return useQuery({
    queryKey: queryKeys.notifications.unreadCount(),
    queryFn: () => apiClient.get<{ unreadCount: number }>("/notifications/unread-count"),
  })
}

export function useMarkAsReadMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.patch(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
  })
}

export function useMarkAllAsReadMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => apiClient.patch("/notifications/read-all"),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
  })
}

export function useDeleteNotificationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiClient.delete(`/notifications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
  })
}

export function useCreateNotificationMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { userId: string; message: string; type: "info" | "warning" | "error" | "success" }) =>
      apiClient.post("/notifications", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.all })
    },
  })
}
