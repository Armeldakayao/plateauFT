// // Query Keys Factory - Organisation centralisée des clés de cache
// export const queryKeys = {
//   // Auth
//   auth: {
//     all: ["auth"] as const,
//     user: () => [...queryKeys.auth.all, "user"] as const,
//   },

import { profile } from "console";
import { ServiceRequestFilters } from "../types/service-request";

//   // Announcements
//   announcements: {
//     all: ["announcements"] as const,
//     lists: () => [...queryKeys.announcements.all, "list"] as const,
//     list: (filters: Record<string, any>) => [...queryKeys.announcements.lists(), { filters }] as const,
//     details: () => [...queryKeys.announcements.all, "detail"] as const,
//     detail: (id: string) => [...queryKeys.announcements.details(), id] as const,
//     comments: (id: string) => [...queryKeys.announcements.detail(id), "comments"] as const,
//   },

//   // Services
//   services: {
//     all: ["services"] as const,
//     lists: () => [...queryKeys.services.all, "list"] as const,
//     list: (filters: Record<string, any>) => [...queryKeys.services.lists(), { filters }] as const,
//     details: () => [...queryKeys.services.all, "detail"] as const,
//     detail: (id: string) => [...queryKeys.services.details(), id] as const,
//     advanced: {
//       all: ["services", "advanced"] as const,
//       lists: () => [...queryKeys.services.advanced.all, "list"] as const,
//       list: (filters: Record<string, any>) => [...queryKeys.services.advanced.lists(), { filters }] as const,
//       details: () => [...queryKeys.services.advanced.all, "detail"] as const,
//       detail: (id: string) => [...queryKeys.services.advanced.details(), id] as const,
//     },
//     requests: {
//       all: ["services", "requests"] as const,
//       lists: () => [...queryKeys.services.requests.all, "list"] as const,
//       list: (filters: Record<string, any>) => [...queryKeys.services.requests.lists(), { filters }] as const,
//       details: () => [...queryKeys.services.requests.all, "detail"] as const,
//       detail: (id: string) => [...queryKeys.services.requests.details(), id] as const,
//     },
//   },

//   // Site Settings
//   siteSettings: {
//     all: ["site-settings"] as const,
//     detail: () => [...queryKeys.siteSettings.all, "detail"] as const,
//   },

//   // Users
//   users: {
//     all: ["users"] as const,
//     lists: () => [...queryKeys.users.all, "list"] as const,
//     list: (filters: Record<string, any>) => [...queryKeys.users.lists(), { filters }] as const,
//     details: () => [...queryKeys.users.all, "detail"] as const,
//     detail: (id: string) => [...queryKeys.users.details(), id] as const,
//   },

//   // Places
//   places: {
//     all: ["places"] as const,
//     lists: () => [...queryKeys.places.all, "list"] as const,
//     list: (filters: Record<string, any>) => [...queryKeys.places.lists(), { filters }] as const,
//     details: () => [...queryKeys.places.all, "detail"] as const,
//     detail: (id: string) => [...queryKeys.places.details(), id] as const,
//   },

//   // Communiques
//   communiques: {
//     all: ["communiques"] as const,
//     lists: () => [...queryKeys.communiques.all, "list"] as const,
//     list: (filters?: Record<string, any>) => [...queryKeys.communiques.lists(), { filters }] as const,
//     details: () => [...queryKeys.communiques.all, "detail"] as const,
//     detail: (id: string) => [...queryKeys.communiques.details(), id] as const,
//     stats: () => [...queryKeys.communiques.all, "stats"] as const,
//     search: (query: string) => [...queryKeys.communiques.all, "search", query] as const,
//     byType: (type: string) => [...queryKeys.communiques.all, "type", type] as const,
//     recent: () => [...queryKeys.communiques.all, "recent"] as const,
//   },

//   // Uploads
//   uploads: {
//     all: ["uploads"] as const,
//     single: () => [...queryKeys.uploads.all, "single"] as const,
//     multiple: () => [...queryKeys.uploads.all, "multiple"] as const,
//     avatar: () => [...queryKeys.uploads.all, "avatar"] as const,
//     documents: () => [...queryKeys.uploads.all, "documents"] as const,
//   },
// } as const

// export const authKeys = queryKeys.auth
// export const announcementKeys = queryKeys.announcements
// export const serviceKeys = queryKeys.services
// export const siteSettingsKeys = queryKeys.siteSettings
// export const userKeys = queryKeys.users
// export const placeKeys = queryKeys.places
// export const uploadKeys = queryKeys.uploads
// export const communiquesKeys = queryKeys.communiques
// Query Keys Factory - Organisation centralisée des clés de cache
export const queryKeys = {
  // Auth
  auth: {
    all: ["auth"] as const,
    user: () => [...queryKeys.auth.all, "user"] as const,
  },

  // Announcements
  announcements: {
    all: ["announcements"] as const,
    lists: () => [...queryKeys.announcements.all, "list"] as const,
    list: (filters: Record<string, any>) => [...queryKeys.announcements.lists(), { filters }] as const,
    details: () => [...queryKeys.announcements.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.announcements.details(), id] as const,
    comments: (id: string) => [...queryKeys.announcements.detail(id), "comments"] as const,
  },

  // Services
  services1: {
    all: ["services"] as const,
    lists: () => [...queryKeys.services.all, "list"] as const,
    list: (filters: Record<string, any>) => [...queryKeys.services.lists(), { filters }] as const,
    details: () => [...queryKeys.services.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.services.details(), id] as const,
    advanced: {
      all: ["services", "advanced"] as const,
      lists: () => [...queryKeys.services.advanced.all, "list"] as const,
      list: (filters: Record<string, any>) => [...queryKeys.services.advanced.lists(), { filters }] as const,
      details: () => [...queryKeys.services.advanced.all, "detail"] as const,
      detail: (id: string) => [...queryKeys.services.advanced.details(), id] as const,
    },
    requests: {
      all: ["services", "requests"] as const,
      lists: () => [...queryKeys.services.requests.all, "list"] as const,
      list: (filters: Record<string, any>) => [...queryKeys.services.requests.lists(), { filters }] as const,
      details: () => [...queryKeys.services.requests.all, "detail"] as const,
      detail: (id: string) => [...queryKeys.services.requests.details(), id] as const,
    },
  },

  // Site Settings
  siteSettings: {
    all: ["site-settings"] as const,
    detail: () => [...queryKeys.siteSettings.all, "detail"] as const,
  },

  // Users
  users: {
    all: ["users"] as const,
    lists: () => [...queryKeys.users.all, "list"] as const,
    list: (filters: Record<string, any>) => [...queryKeys.users.lists(), { filters }] as const,
    details: () => [...queryKeys.users.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    profile: () => [...queryKeys.users.all, "profile"] as const,
  },

  // Places
  places: {
    all: ["places"] as const,
    lists: () => [...queryKeys.places.all, "list"] as const,
    list: (filters: Record<string, any>) => [...queryKeys.places.lists(), { filters }] as const,
    details: () => [...queryKeys.places.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.places.details(), id] as const,
    search: (query: string) => [...queryKeys.places.all, "search", query] as const,
    byType: (type: string) => [...queryKeys.places.all, "type", type] as const,
    recent: () => [...queryKeys.places.all, "recent"] as const,
    restaurant: () => [...queryKeys.places.all, "restaurant"] as const,
    activities: () => [...queryKeys.places.all, "activities"] as const,
    events: () => [...queryKeys.places.all, "events"] as const,
    hotels: () => [...queryKeys.places.all, "hotels"] as const,
    landmarks: () => [...queryKeys.places.all, "landmarks"] as const,
    landmarksList: (params?: { page?: number; limit?: number }) =>
      [...queryKeys.places.all, "landmarks", "list", params] as const,
    infinite:(params?: { type?: string; search?: string; limit?: number }) => [...queryKeys.places.all, "infinite", params] as const
  },

  // Communiques
  communiques: {
    all: ["communiques"] as const,
    lists: () => [...queryKeys.communiques.all, "list"] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.communiques.lists(), { filters }] as const,
    details: () => [...queryKeys.communiques.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.communiques.details(), id] as const,
    stats: () => [...queryKeys.communiques.all, "stats"] as const,
    search: (query: string) => [...queryKeys.communiques.all, "search", query] as const,
    byType: (type: string) => [...queryKeys.communiques.all, "type", type] as const,
    recent: () => [...queryKeys.communiques.all, "recent"] as const,
  },

  // Uploads
  uploads: {
    all: ["uploads"] as const,
    single: () => [...queryKeys.uploads.all, "single"] as const,
    multiple: () => [...queryKeys.uploads.all, "multiple"] as const,
    avatar: () => [...queryKeys.uploads.all, "avatar"] as const,
    documents: () => [...queryKeys.uploads.all, "documents"] as const,
    documentsList: () => [...queryKeys.uploads.all, "documents", "list"] as const,
    document: (id: string) => [...queryKeys.uploads.all, "documents", id] as const,
    files : (includeInactive?: "y" | "n" ) => [...queryKeys.uploads.all, "files", includeInactive] as const,
    adminUserFiles : (userId: string, includeInactive?: "y" | "n" ) => [...queryKeys.uploads.all, "files", userId, includeInactive] as const,
    myDocuments : (includeInactive?: "y" | "n" ) => [...queryKeys.uploads.all, "documents", includeInactive] as const
  },

  // Notifications
  notifications: {
    all: ["notifications"] as const,
    lists: () => [...queryKeys.notifications.all, "list"] as const,
    list: (filters?: Record<string, any>) => [...queryKeys.notifications.lists(), { filters }] as const,
    unreadCount: () => [...queryKeys.notifications.all, "unread-count"] as const,
  },
services: {
    all: ["services"] as const,
    lists: () => [...queryKeys.services.all, "list"] as const,
    list: (filters: Record<string, any>) => [...queryKeys.services.lists(), { filters }] as const,
    details: () => [...queryKeys.services.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.services.details(), id] as const,
    advanced: {
      all: ["services", "advanced"] as const,
      lists: () => [...queryKeys.services.advanced.all, "list"] as const,
      list: (filters: Record<string, any>) => [...queryKeys.services.advanced.lists(), { filters }] as const,
      details: () => [...queryKeys.services.advanced.all, "detail"] as const,
      detail: (id: string) => [...queryKeys.services.advanced.details(), id] as const,
    },
    requests: {
      all: ["services", "requests"] as const,
      lists: () => [...queryKeys.services.requests.all, "list"] as const,
      list: (filters: Record<string, any>) => [...queryKeys.services.requests.lists(), { filters }] as const,
      details: () => [...queryKeys.services.requests.all, "detail"] as const,
      detail: (id: string) => [...queryKeys.services.requests.details(), id] as const,
    },
  },

  // Service Requests
  serviceRequests: {
    all: ["service-requests"] as const,
    lists: () => [...queryKeys.serviceRequests.all, "list"] as const,
    list: (filters?: ServiceRequestFilters) => [...queryKeys.serviceRequests.lists(), { filters }] as const,
    details: () => [...queryKeys.serviceRequests.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.serviceRequests.details(), id] as const,
    myRequests: (filters?: ServiceRequestFilters) =>
      [...queryKeys.serviceRequests.all, "my-requests", { filters }] as const,
    byReference: (reference: string) => [...queryKeys.serviceRequests.all, "reference", reference] as const,
    stats: (filters?: any) => [...queryKeys.serviceRequests.all, "stats", { filters }] as const,
    agentWorkload: (agentId: string) => [...queryKeys.serviceRequests.all, "agent-workload", agentId] as const,
  },

  // Treatments
  treatments: {
    all: ["treatments"] as const,
    lists: () => [...queryKeys.treatments.all, "list"] as const,
    list: (filters?: any) => [...queryKeys.treatments.lists(), { filters }] as const,
    details: () => [...queryKeys.treatments.all, "detail"] as const,
    detail: (id: string) => [...queryKeys.treatments.details(), id] as const,
    byRequest: (requestId: string) => [...queryKeys.treatments.all, "by-request", requestId] as const,
  },

  // Search
  search: {
    all: ["search"] as const,
    search: (query: string, type?: string) => [...queryKeys.search.all, "global", query, type] as const,
    suggestions: (query: string) => [...queryKeys.search.all, "suggestions", query] as const,
  },
} as const

export const authKeys = queryKeys.auth
export const announcementKeys = queryKeys.announcements
export const serviceKeys = queryKeys.services
export const siteSettingsKeys = queryKeys.siteSettings
export const userKeys = queryKeys.users
export const placeKeys = queryKeys.places
export const uploadKeys = queryKeys.uploads
export const communiquesKeys = queryKeys.communiques
export const notificationsKeys = queryKeys.notifications
export const searchKeys = queryKeys.search

export const placesKeys = queryKeys.places
