// import axios, { type AxiosInstance, type AxiosError } from "axios"
// import { AddCommentPayload, AddCommentRequest, ApiResponse, ChangePasswordPayload, CommuniquesQueryParams, CreateAdvancedServicePayload, CreateAnnouncementPayload, CreateCommuniqueRequest, CreatePlacePayload, CreateServicePayload, CreateServiceRequestPayload, CreateSiteSettingsPayload, ForgotPasswordPayload, LoginOtpPayload, LoginPayload, MultipleUploadResponse, PaginatedResponse, RegisterPayload, ResetPasswordPayload, UpdateAnnouncementPayload, UpdateCommuniqueRequest, UpdatePlacePayload, UpdateSiteSettingsPayload, UpdateUserPayload, UploadResponse, VerifyOtpPayload } from "../types/api"
// import { get } from "http"

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
// export const getImageUrl = (imagePath: string) => {
//   if (!imagePath) return ""
//   if (imagePath.startsWith("http")) return imagePath
//   return `${API_BASE_URL}/${imagePath}`
// }

// export class ApiError extends Error {
//   constructor(
//     message: string,
//     public status: number,
//     public response?: any,
//   ) {
//     super(message)
//     this.name = "ApiError"
//   }
// }

// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
// })

// // Request interceptor to add auth token
// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("auth_token")
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// // Response interceptor for error handling
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error: AxiosError) => {
//     const status = error.response?.status || 0
//     const message = (error.response?.data as any)?.message || error.message || "Network error"
//     throw new ApiError(message, status, error.response?.data)
//   },
// )

// export const apiClient = {
//   get: async <T>(endpoint: string, params?: Record<string, any>) => {
//     const response = await axiosInstance.get<T>(endpoint, { params })
//     return response.data
//   },

//   post: async <T>(endpoint: string, data?: any) => {
//     const response = await axiosInstance.post<T>(endpoint, data)
//     return response.data
//   },

//   patch: async <T>(endpoint: string, data?: any) => {
//     const response = await axiosInstance.patch<T>(endpoint, data)
//     return response.data
//   },

//   delete: async <T>(endpoint: string) => {
//     const response = await axiosInstance.delete<T>(endpoint)
//     return response.data
//   },

//   auth:
// {
//   register: (data: RegisterPayload) => apiClient.post<ApiResponse<any>>("/auth/register", data),
//   login: (data: LoginPayload) => apiClient.post<ApiResponse<any>>("/auth/login", data),
//   loginOtp: (data: LoginOtpPayload) => apiClient.post<ApiResponse<any>>("/auth/login-with-otp", data),
//   verifyOtp: (data: VerifyOtpPayload) => apiClient.post<ApiResponse<any>>("/auth/verify-otp", data),
//   forgotPassword: (data: ForgotPasswordPayload) => apiClient.post<ApiResponse<any>>("/auth/forgot-password", data),
//   resetPassword: (data: ResetPasswordPayload) => apiClient.post<ApiResponse<any>>("/auth/reset-password", data),
//   changePassword: (data: ChangePasswordPayload) => apiClient.patch<ApiResponse<any>>("/auth/change-password", data),
//   logout: () => apiClient.post<ApiResponse<any>>("/auth/logout"),
// },

//   announcements: {
//     getAll: (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/communiques", params),
//     getById: (id: string) => apiClient.get<ApiResponse<any>>(`/communiques/${id}`),
//     create: (data: CreateAnnouncementPayload) => apiClient.post<ApiResponse<any>>("/communiques", data),
//     update: (id: string, data: UpdateAnnouncementPayload) => apiClient.patch<ApiResponse<any>>(`/communiques/${id}`, data),
//     delete: (id: string) => apiClient.delete<ApiResponse<any>>(`/communiques/${id}`),
//     addComment: (id: string, data: AddCommentPayload) => apiClient.post<ApiResponse<any>>(`/communiques/${id}/comments`, data),
//   },

//   services: {
//     getAll: (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/services", params),
//     getById: (id: string) => apiClient.get<ApiResponse<any>>(`/services/${id}`),
//     create: (data: CreateServicePayload) => apiClient.post<ApiResponse<any>>("/services", data),
//     update: (id: string, data: Partial<CreateServicePayload>) => apiClient.patch<ApiResponse<any>>(`/services/${id}`, data),
//     delete: (id: string) => apiClient.delete<ApiResponse<any>>(`/services/${id}`),

//     advanced: {
//       getAll: (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/services/advanced", params),
//       getById: (id: string) => apiClient.get<ApiResponse<any>>(`/services/advanced/${id}`),
//       create: (data: CreateAdvancedServicePayload) => apiClient.post<ApiResponse<any>>("/services/advanced", data),
//       update: (id: string, data: Partial<CreateAdvancedServicePayload>) => apiClient.patch<ApiResponse<any>>(`/services/advanced/${id}`, data),
//       delete: (id: string) => apiClient.delete<ApiResponse<any>>(`/services/advanced/${id}`),
//     },

//     requests: {
//       getAll: (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/services/requests", params),
//       getById: (id: string) => apiClient.get<ApiResponse<any>>(`/services/requests/${id}`),
//       create: (data: CreateServiceRequestPayload) => apiClient.post<ApiResponse<any>>("/services/requests", data),
//       update: (id: string, data: any) => apiClient.patch<ApiResponse<any>>(`/services/requests/${id}`, data),
//       delete: (id: string) => apiClient.delete<ApiResponse<any>>(`/services/requests/${id}`),
//     },
//   },

//   siteSettings: {
//     get: () => apiClient.get<ApiResponse<any>>("/site-settings"),
//     create: (data: CreateSiteSettingsPayload) => apiClient.post<ApiResponse<any>>("/site-settings", data),
//     update: (data: UpdateSiteSettingsPayload) => apiClient.patch<ApiResponse<any>>("/site-settings", data),
//   },

//   users: {
//     getAll: (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/users", params),
//     getById: (id: string) => apiClient.get<ApiResponse<any>>(`/users/${id}`),
//     update: (id: string, data: UpdateUserPayload) => apiClient.patch<ApiResponse<any>>(`/users/${id}`, data),
//     delete: (id: string) => apiClient.delete<ApiResponse<any>>(`/users/${id}`),
//     getProfile: () => apiClient.get<ApiResponse<any>>("/users/profile"),
//     updateProfile: (data: UpdateUserPayload) => apiClient.patch<ApiResponse<any>>("/users/profile", data),
//   },

//   places: {
//     getAll: (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/places", params),
//     getById: (id: string) => apiClient.get<ApiResponse<any>>(`/places/${id}`),
//     create: (data: CreatePlacePayload) => apiClient.post<ApiResponse<any>>("/places", data),
//     update: (id: string, data: UpdatePlacePayload) => apiClient.patch<ApiResponse<any>>(`/places/${id}`, data),
//     delete: (id: string) => apiClient.delete<ApiResponse<any>>(`/places/${id}`),
//     getActivities : (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/places/activities", params),
//     getTypes : (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/places/types", params),
//     getHotels : (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/places/hotels", params),
//     getRestaurants : (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/places/restaurants", params),
//     getAttractions : (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/places/attractions", params),
//     getLandmarks : (params?: Record<string, any>) => apiClient.get<PaginatedResponse<any>>("/places/landmarks", params),
//   },

//   upload: {
//     single: async (file: File) => {
//       const formData = new FormData()
//       formData.append('file', file)

//       const response = await axiosInstance.post<ApiResponse<UploadResponse>>("/upload/single", formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       })
//       return response.data
//     },

//     multiple: async (files: File[]) => {
//       const formData = new FormData()
//       files.forEach(file => formData.append('files', file))

//       const response = await axiosInstance.post<ApiResponse<MultipleUploadResponse>>("/upload/multiple", formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       })
//       return response.data
//     },

//     avatar: async (avatar: File) => {
//       const formData = new FormData()
//       formData.append('avatar', avatar)

//       const response = await axiosInstance.post<ApiResponse<UploadResponse>>("/upload/avatar", formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       })
//       return response.data
//     },

//     documents: async (documents: File[]) => {
//       const formData = new FormData()
//       documents.forEach(doc => formData.append('documents', doc))

//       const response = await axiosInstance.post<ApiResponse<MultipleUploadResponse>>("/upload/documents", formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       })
//       return response.data
//     },
//   },
//     communiques: {
//     getAll: (params?: CommuniquesQueryParams) =>
//       apiClient.get<PaginatedResponse<any>>("/communiques", params),

//     getById: (id: string) =>
//       apiClient.get<ApiResponse<any>>(`/communiques/${id}`),

//     create: (data: CreateCommuniqueRequest) =>
//       apiClient.post<ApiResponse<any>>("/communiques", data),

//     update: (id: string, data: UpdateCommuniqueRequest) =>
//       apiClient.patch<ApiResponse<any>>(`/communiques/${id}`, data),

//     delete: (id: string) =>
//       apiClient.delete<ApiResponse<any>>(`/communiques/${id}`),

//     activate: (id: string) =>
//       apiClient.patch<ApiResponse<any>>(`/communiques/${id}/activate`),

//     deactivate: (id: string) =>
//       apiClient.patch<ApiResponse<any>>(`/communiques/${id}/deactivate`),

//     addComment: (id: string, data: AddCommentRequest) =>
//       apiClient.post<ApiResponse<any>>(`/communiques/${id}/comment`, data),

//     getStats: () =>
//       apiClient.get<ApiResponse<any>>("/communiques/stats"),

//     search: (query: string, page?: number, limit?: number) =>
//       apiClient.get<PaginatedResponse<any>>("/communiques/search", { q: query, page, limit }),

//     getByType: (type: string, page?: number, limit?: number) =>
//       apiClient.get<PaginatedResponse<any>>(`/communiques/${type}`, { page, limit }),

//     getRecent: () =>
//       apiClient.get<PaginatedResponse<any>>("/communiques/actualites/recentes"),
//   },
// }

import axios, { type AxiosInstance, type AxiosError } from "axios";
import type {
  ApiResponse,
  ChangePasswordPayload,
  CommuniquesQueryParams,
  CreateAnnouncementPayload,
  ForgotPasswordPayload,
  LoginOtpPayload,
  LoginPayload,
  OneServiceResponse,
  PaginatedResponse,
  RegisterPayload,
  resendOtpPayload,
  ResetPasswordPayload,
  ServicesResponse,
  UpdateAnnouncementPayload,
  VerifyOtpPayload,
} from "../types/api";
import { ServiceRequestDocument } from "../types/service-request";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const getImageUrl = (imagePath: string) => {
  if (!imagePath) return "";
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE_URL}/${imagePath}`;
};

export class ApiError extends Error {
  constructor(message: string, public status: number, public response?: any) {
    super(message);
    this.name = "ApiError";
  }
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const status = error.response?.status || 0;
    const message =
      (error.response?.data as any)?.message ||
      error.message ||
      "Network error";
    throw new ApiError(message, status, error.response?.data);
  }
);

export const apiClient = {
  get: async <T>(endpoint: string, params?: Record<string, any>) => {
    const response = await axiosInstance.get<T>(endpoint, { params });
    return response.data;
  },

  post: async <T>(endpoint: string, data?: any) => {
    const response = await axiosInstance.post<T>(endpoint, data);
    return response.data;
  },

  patch: async <T>(endpoint: string, data?: any) => {
    const response = await axiosInstance.patch<T>(endpoint, data);
    return response.data;
  },

  delete: async <T>(endpoint: string) => {
    const response = await axiosInstance.delete<T>(endpoint);
    return response.data;
  },

  auth: {
    register: (data: RegisterPayload) =>
      apiClient.post<ApiResponse<any>>("/auth/register", data),
    login: (data: LoginPayload) =>
      apiClient.post<ApiResponse<any>>("/auth/login", data),
    loginOtp: (data: LoginOtpPayload) =>
      apiClient.post<ApiResponse<any>>("/auth/login-with-otp", data),
    resendOtp: (data: resendOtpPayload) =>
      apiClient.post<ApiResponse<any>>("/auth/resend-otp", data),
    verifyOtp: (data: VerifyOtpPayload) =>
      apiClient.post<ApiResponse<any>>("/auth/verify-otp", data),
    forgotPassword: (data: ForgotPasswordPayload) =>
      apiClient.post<ApiResponse<any>>("/auth/forgot-password", data),
    resetPassword: (data: ResetPasswordPayload) =>
      apiClient.post<ApiResponse<any>>("/auth/reset-password", data),
    changePassword: (data: ChangePasswordPayload) =>
      apiClient.patch<ApiResponse<any>>("/auth/change-password", data),
    logout: () => apiClient.post<ApiResponse<any>>("/auth/logout"),
  },

  announcements: {
    getAll: (params?: Record<string, any>) =>
      apiClient.get<PaginatedResponse<any>>("/communiques", params),
    getById: (id: string) =>
      apiClient.get<ApiResponse<any>>(`/communiques/${id}`),
    create: (data: CreateAnnouncementPayload) =>
      apiClient.post<ApiResponse<any>>("/communiques", data),
    update: (id: string, data: UpdateAnnouncementPayload) =>
      apiClient.patch<ApiResponse<any>>(`/communiques/${id}`, data),
    delete: (id: string) =>
      apiClient.delete<ApiResponse<any>>(`/communiques/${id}`),
    addComment: (id: string, data: any) =>
      apiClient.post<ApiResponse<any>>(`/communiques/${id}/comments`, data),
  },

  servicesAll: {
    getAll: (params?: Record<string, any>) =>
      apiClient.get<PaginatedResponse<ServicesResponse>>("/services", params),
    getById: (id: string) => apiClient.get<ApiResponse<any>>(`/services/${id}`),
    create: (data: any) => apiClient.post<ApiResponse<any>>("/services", data),
    update: (id: string, data: any) =>
      apiClient.patch<ApiResponse<any>>(`/services/${id}`, data),
    delete: (id: string) =>
      apiClient.delete<ApiResponse<any>>(`/services/${id}`),

    advanced: {
      getAll: (params?: Record<string, any>) =>
        apiClient.get<PaginatedResponse<any>>("/services/advanced", params),
      getById: (id: string) =>
        apiClient.get<ApiResponse<any>>(`/services/advanced/${id}`),
      create: (data: any) =>
        apiClient.post<ApiResponse<any>>("/services/advanced", data),
      update: (id: string, data: any) =>
        apiClient.patch<ApiResponse<any>>(`/services/advanced/${id}`, data),
      delete: (id: string) =>
        apiClient.delete<ApiResponse<any>>(`/services/advanced/${id}`),
    },

    requests: {
      getAll: (params?: Record<string, any>) =>
        apiClient.get<PaginatedResponse<any>>("/services/requests", params),
      getById: (id: string) =>
        apiClient.get<ApiResponse<any>>(`/services/requests/${id}`),
      create: (data: any) =>
        apiClient.post<ApiResponse<any>>("/services/requests", data),
      update: (id: string, data: any) =>
        apiClient.patch<ApiResponse<any>>(`/services/requests/${id}`, data),
      delete: (id: string) =>
        apiClient.delete<ApiResponse<any>>(`/services/requests/${id}`),
    },
  },

  siteSettings: {
    get: () => apiClient.get<ApiResponse<any>>("/site-settings"),
    create: (data: any) =>
      apiClient.post<ApiResponse<any>>("/site-settings", data),
    update: (data: any) =>
      apiClient.patch<ApiResponse<any>>("/site-settings", data),
  },

  users: {
    getAll: (params?: Record<string, any>) =>
      apiClient.get<PaginatedResponse<any>>("/users", params),
    getById: (id: string) => apiClient.get<ApiResponse<any>>(`/users/${id}`),
    update: (id: string, data: any) =>
      apiClient.patch<ApiResponse<any>>(`/users/${id}`, data),
    delete: (id: string) => apiClient.delete<ApiResponse<any>>(`/users/${id}`),
    getProfile: () => apiClient.get<ApiResponse<any>>("/users/profile"),
    updateProfile: (data: any) =>
      apiClient.patch<ApiResponse<any>>("/users/profile", data),
  },

  places: {
    getAll: (params?: Record<string, any>) =>
      apiClient.get<PaginatedResponse<any>>("/places", params),
    getById: (id: string) => apiClient.get<ApiResponse<any>>(`/places/${id}`),
    create: (data: any) => apiClient.post<ApiResponse<any>>("/places", data),
    update: (id: string, data: any) =>
      apiClient.patch<ApiResponse<any>>(`/places/${id}`, data),
    delete: (id: string) => apiClient.delete<ApiResponse<any>>(`/places/${id}`),
    getActivities: (params?: Record<string, any>) =>
      apiClient.get<PaginatedResponse<any>>("/places/activities", params),
    getTypes: (params?: Record<string, any>) =>
      apiClient.get<PaginatedResponse<any>>("/places/types", params),
    getHotels: (params?: Record<string, any>) =>
      apiClient.get<PaginatedResponse<any>>("/places/hotels", params),
    getRestaurants: (params?: Record<string, any>) =>
      apiClient.get<PaginatedResponse<any>>("/places/restaurants", params),
    getAttractions: (params?: Record<string, any>) =>
      apiClient.get<PaginatedResponse<any>>("/places/attractions", params),
    getLandmarks: (params?: Record<string, any>) =>
      apiClient.get<PaginatedResponse<any>>("/places/landmarks", params),
  },

  upload: {
    single: async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post<ApiResponse<any>>(
        "/upload/single",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },

    multiple: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const response = await axiosInstance.post<ApiResponse<any>>(
        "/upload/multiple",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
    profilePhoto: async (file: File) => {
      const formData = new FormData();
      formData.append("photo", file);
      const response = await axiosInstance.post<ApiResponse<any>>(
        "/users/profile/photo",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    },

    document: async (
      file: File,
      documentType: string,
      description?: string
    ) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", documentType);
      if (description) formData.append("description", description);

      const response = await axiosInstance.post<ApiResponse<any>>(
        "/users/documents",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    },

    avatar: async (avatar: File) => {
      const formData = new FormData();
      formData.append("avatar", avatar);

      const response = await axiosInstance.post<ApiResponse<any>>(
        "/upload/avatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },

    documents: async (documents: File[]) => {
      const formData = new FormData();
      documents.forEach((doc) => formData.append("documents", doc));

      const response = await axiosInstance.post<ApiResponse<any>>(
        "/upload/documents",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    },
  },
  documents: {
    // GET /users/documents
    getAll: async () => {
      const response = await axiosInstance.get<ApiResponse<any[]>>(
        "/users/documents"
      );
      return response.data;
    },

    // PATCH /users/documents/{id}
    update: async (
      documentId: string,
      data: { documentType: string; description?: string }
    ) => {
      const response = await axiosInstance.patch<ApiResponse<any>>(
        `/users/documents/${documentId}`,
        data
      );
      return response.data;
    },

    // DELETE /users/documents/{id}
    delete: async (documentId: string) => {
      const response = await axiosInstance.delete<ApiResponse<any>>(
        `/users/documents/${documentId}`
      );
      return response.data;
    },
  },

  files: {
    // GET /users/files?includeInactive=n
    getAll: async (includeInactive: "y" | "n" = "n") => {
      const response = await axiosInstance.get<ApiResponse<any>>(
        `/users/files?includeInactive=${includeInactive}`
      );
      return response.data;
    },
    getMyDocuments: async (includeInactive: "y" | "n" = "n") => {
      const response = await axiosInstance.get<ApiResponse<any>>(
        `/users/documents?includeInactive=${includeInactive}`
      );
      return response.data;
    },

    // GET /users/{id}/files?includeInactive=n
    getAllForUser: async (userId: string, includeInactive: "y" | "n" = "n") => {
      const response = await axiosInstance.get<ApiResponse<any>>(
        `/users/${userId}/files?includeInactive=${includeInactive}`
      );
      return response.data;
    },
  },

  documentsAdmin: {
    // POST /users/{id}/documents (upload admin)
    uploadForUser: async (
      userId: string,
      file: File,
      documentType: string,
      description?: string
    ) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", documentType);
      if (description) formData.append("description", description);

      const response = await axiosInstance.post<ApiResponse<any>>(
        `/users/${userId}/documents`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    },
  },
  serviceRequests: {
    // Création des demandes
    createRdv: (data: any) =>
      apiClient.post<ApiResponse<any>>("/service-requests/rdv", data),
    createPartenariat: (data: any) =>
      apiClient.post<ApiResponse<any>>("/service-requests/partenariat", data),
    createMariage: (data: any) =>
      apiClient.post<ApiResponse<any>>("/service-requests/mariage", data),

    // Consultation des demandes
    getAll: (params?: any) =>
      apiClient.get<PaginatedResponse<any>>("/service-requests", params),
    getMyRequests: (params?: any) =>
      apiClient.get<PaginatedResponse<any>>(
        "/service-requests/my-requests",
        params
      ),
    getById: (id: string) =>
      apiClient.get<ApiResponse<any>>(`/service-requests/${id}`),
    getByReference: (reference: string) =>
      apiClient.get<ApiResponse<any>>(
        `/service-requests/reference/${reference}`
      ),
    getStats: (params?: any) =>
      apiClient.get<ApiResponse<any>>("/service-requests/statistics", params),
    getAgentWorkload: (agentId: string) =>
      apiClient.get<ApiResponse<any>>(
        `/service-requests/agent-workload/${agentId}`
      ),
    getStatistics: (params?: any) =>
      apiClient.get<ApiResponse<any>>("/service-requests/statistics", params),

    // Gestion des traitements
    createTreatment: (data: any) =>
      apiClient.post<ApiResponse<any>>("/service-requests/treatments", data),
    updateTreatment: (id: string, data: any) =>
      apiClient.patch<ApiResponse<any>>(
        `/service-requests/treatments/${id}`,
        data
      ),
    finalizeTreatment: (id: string, data: any) =>
      apiClient.post<ApiResponse<any>>(
        `/service-requests/treatments/${id}/finalize`,
        data
      ),

    // Gestion des documents
    uploadDocuments: async (
      requestId: string,
      files: File[],
      type: string,
      description?: string
    ) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("type", type);
      if (description) formData.append("description", description);

      const response = await axiosInstance.post<
        ApiResponse<{ documents: ServiceRequestDocument[] }>
      >(`/service-requests/${requestId}/documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },

    uploadTreatmentDocuments: async (
      treatmentId: string,
      files: File[],
      type: string,
      description?: string
    ) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      formData.append("type", type);
      if (description) formData.append("description", description);

      const response = await axiosInstance.post<
        ApiResponse<{ documents: ServiceRequestDocument[] }>
      >(`/service-requests/treatments/${treatmentId}/documents`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
  },
  services: {
    // Lister tous les services
    getAll: (params?: { page?: number; limit?: number; category?: string }) =>
      apiClient.get<ServicesResponse>("/services", params),

    // Lister services par catégorie
    getByCategory: (
      category: string,
      params?: { page?: number; limit?: number }
    ) =>
      apiClient.get<PaginatedResponse<any>>(
        `/services/category/${category}`,
        params
      ),

    // Obtenir un service par ID
    getById: (id: string) => apiClient.get<OneServiceResponse>(`/services/${id}`),

    // Créer un service (Admin)
    create: (data: any) => apiClient.post<ApiResponse<any>>("/services", data),

    // Mettre à jour un service (Admin)
    update: (id: string, data: any) =>
      apiClient.patch<ApiResponse<any>>(`/services/${id}`, data),

    // Supprimer un service (Admin)
    delete: (id: string) =>
      apiClient.delete<ApiResponse<any>>(`/services/${id}`),
  },
  communiques: {
    getAll: (params?: CommuniquesQueryParams) =>
      apiClient.get<PaginatedResponse<any>>("/communiques", params),

    getById: (id: string) =>
      apiClient.get<ApiResponse<any>>(`/communiques/${id}`),

    create: (data: any) =>
      apiClient.post<ApiResponse<any>>("/communiques", data),

    update: (id: string, data: any) =>
      apiClient.patch<ApiResponse<any>>(`/communiques/${id}`, data),

    delete: (id: string) =>
      apiClient.delete<ApiResponse<any>>(`/communiques/${id}`),

    activate: (id: string) =>
      apiClient.patch<ApiResponse<any>>(`/communiques/${id}/activate`),

    deactivate: (id: string) =>
      apiClient.patch<ApiResponse<any>>(`/communiques/${id}/deactivate`),

    addComment: (id: string, data: any) =>
      apiClient.post<ApiResponse<any>>(`/communiques/${id}/comment`, data),

    getStats: () => apiClient.get<ApiResponse<any>>("/communiques/stats"),

    search: (query: string, page?: number, limit?: number) =>
      apiClient.get<PaginatedResponse<any>>("/communiques/search", {
        q: query,
        page,
        limit,
      }),

    getByType: (type: string, page?: number, limit?: number) =>
      apiClient.get<PaginatedResponse<any>>(`/communiques/type/${type}`, {
        page,
        limit,
      }),

    getRecent: () =>
      apiClient.get<PaginatedResponse<any>>("/communiques/actualites/recentes"),
  },
};
