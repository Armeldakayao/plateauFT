// // Types pour l'authentification
// export interface RegisterPayload {
//   firstName: string
//   lastName: string
//   birthDate: string
//   birthPlace: string
//   nationality: string
//   city: string
//   email: string
//   phone: string
//   password: string
//   confirmPassword: string
//   idType: string
//   idNumber: string
//   acceptTerms: boolean
//   acceptDataPolicy: boolean
// }

// export interface LoginPayload {
//   email: string
//   password: string
// }

// export interface LoginOtpPayload {
//   email: string
//   otpCode: string
// }

// export interface VerifyOtpPayload {
//   code: string
//   userId: string
// }

// export interface ForgotPasswordPayload {
//   email: string
// }

// export interface ResetPasswordPayload {
//   token: string
//   newPassword: string
// }

// export interface ChangePasswordPayload {
//   currentPassword: string
//   newPassword: string
// }

// // Types pour les annonces
// export interface Announcement {
//   id: string
//   title: string
//   description: string
//   details: string
//   gallery: string[]
//   date: string
//   type: string
//   poster: string
//   comments: string[]
//   tags: string[]
//   createdAt: string
//   updatedAt: string
// }

// export interface CreateAnnouncementPayload {
//   title: string
//   description: string
//   details: string
//   gallery: string[]
//   date: string
//   type: string
//   poster: string
//   comments: string[]
//   tags: string[]
// }

// export interface UpdateAnnouncementPayload {
//   title?: string
//   description?: string
//   tags?: string[]
// }

// export interface AddCommentPayload {
//   comment: string
// }

// // Types pour les communiques
// export interface Communique {
//   id: string
//   title: string
//   description: string
//   details: string
//   gallery: string[]
//   date: string
//   type: string
//   poster: string
//   comments: string[]
//   isActive: boolean
//   viewCount: number
//   tags: string[]
//   createdAt: string
//   updatedAt: string
// }

// export interface CreateCommuniqueRequest {
//   title: string
//   description: string
//   details: string
//   gallery: string[]
//   date: string
//   type: string
//   poster: string
//   comments: string[]
//   tags: string[]
// }

// export interface UpdateCommuniqueRequest {
//   title?: string
//   description?: string
//   details?: string
//   gallery?: string[]
//   date?: string
//   type?: string
//   poster?: string
//   comments?: string[]
//   tags?: string[]
// }

// export interface AddCommentRequest {
//   comment: string
// }

// export interface CommuniquesQueryParams {
//   page?: number
//   limit?: number
//   type?: string
//   search?: string
//   tags?: string
// }

// // Types pour les services
// export interface Service {
//   id: string
//   title: string
//   description: string
//   category: string
//   estimatedDuration: string
//   conditions: string[]
//   requiredDocuments: string[]
//   type: "basic" | "advanced"
//   icon: string
//   createdAt: string
//   updatedAt: string
// }

// export interface CreateServicePayload {
//   title: string
//   description: string
//   category: string
//   estimatedDuration: string
//   conditions: string[]
//   requiredDocuments: string[]
//   type: "basic" | "advanced"
//   icon: string
// }

// export interface AdvancedService {
//   id: string
//   name: string
//   category: string
//   description: string
//   icon: string
//   conditions: string
//   confirmationMessage: string
//   acceptedDocuments: AcceptedDocument[]
//   formFields: FormField[]
//   createdAt: string
//   updatedAt: string
// }

// export interface AcceptedDocument {
//   id: string
//   name: string
//   type: string
//   required: boolean
//   userHelp: string
// }

// export interface FormField {
//   id: string
//   label: string
//   type: string
//   required: boolean
//   userHelp: string
// }

// export interface CreateAdvancedServicePayload {
//   name: string
//   category: string
//   description: string
//   icon: string
//   conditions: string
//   confirmationMessage: string
//   acceptedDocuments: AcceptedDocument[]
//   formFields: FormField[]
// }

// export interface ServiceRequest {
//   id: string
//   type: "basic" | "advanced"
//   payload: Record<string, any>
//   status: string
//   createdAt: string
//   updatedAt: string
// }

// export interface CreateServiceRequestPayload {
//   type: "basic" | "advanced"
//   payload: Record<string, any>
// }

// // Types pour les paramètres du site
// export interface BusinessHours {
//   monday: { open: string; close: string; isOpen: boolean }
//   tuesday: { open: string; close: string; isOpen: boolean }
//   wednesday: { open: string; close: string; isOpen: boolean }
//   thursday: { open: string; close: string; isOpen: boolean }
//   friday: { open: string; close: string; isOpen: boolean }
//   saturday: { open: string; close: string; isOpen: boolean }
//   sunday: { open: string; close: string; isOpen: boolean }
// }

// export interface EmergencyContact {
//   name: string
//   phone: string
//   service: string
//   available24h: boolean
// }

// export interface ImportantLink {
//   title: string
//   url: string
//   description: string
// }

// export interface SiteSettings {
//   id: string
//   siteName: string
//   logo: string
//   favicon: string
//   primaryColor: string
//   secondaryColor: string
//   phone: string
//   email: string
//   address: string
//   city: string
//   country: string
//   postalCode: string
//   latitude: number
//   longitude: number
//   website: string
//   facebook: string
//   twitter: string
//   instagram: string
//   linkedin: string
//   youtube: string
//   description: string
//   welcomeMessage: string
//   footerText: string
//   businessHours: BusinessHours
//   emergencyContacts: EmergencyContact[]
//   importantLinks: ImportantLink[]
//   createdAt: string
//   updatedAt: string
// }

// export interface CreateSiteSettingsPayload {
//   siteName: string
//   logo: string
//   favicon: string
//   primaryColor: string
//   secondaryColor: string
//   phone: string
//   email: string
//   address: string
//   city: string
//   country: string
//   postalCode: string
//   latitude: number
//   longitude: number
//   website: string
//   facebook: string
//   twitter: string
//   instagram: string
//   linkedin: string
//   youtube: string
//   description: string
//   welcomeMessage: string
//   footerText: string
//   businessHours: BusinessHours
//   emergencyContacts: EmergencyContact[]
//   importantLinks: ImportantLink[]
// }

// export interface UpdateSiteSettingsPayload {
//   siteName?: string
//   primaryColor?: string
//   [key: string]: any
// }

// // Types pour les utilisateurs
// export interface User {
//   id: string
//   firstName: string
//   lastName: string
//   email: string
//   phone: string
//   city: string
//   birthDate: string
//   birthPlace: string
//   nationality: string
//   idType: string
//   idNumber: string
//   createdAt: string
//   updatedAt: string
// }

// export interface UpdateUserPayload {
//   firstName?: string
//   lastName?: string
//   city?: string
//   [key: string]: any
// }

// // Types pour les lieux
// export interface Place {
//   id: string
//   title: string
//   description: string
//   details: string
//   gallery: string[]
//   reviews: string[]
//   phone: string
//   website: string
//   address: string
//   features: string[]
//   specialties: string[]
//   openingHours: string
//   poster: string
//   type: string
//   createdAt: string
//   updatedAt: string
// }

// export interface CreatePlacePayload {
//   title: string
//   description: string
//   details: string
//   gallery: string[]
//   reviews: string[]
//   phone: string
//   website: string
//   address: string
//   features: string[]
//   specialties: string[]
//   openingHours: string
//   poster: string
//   type: string
// }

// export interface UpdatePlacePayload {
//   title?: string
//   features?: string[]
//   [key: string]: any
// }

// // Types de réponse API génériques
// export interface ApiResponse<T> {
//   data: T
//   message: string
//   success: boolean
// }

// export interface PaginatedResponse<T> {
//   data: T[]
//   pagination: {
//     page: number
//     limit: number
//     total: number
//     totalPages: number
//   }
// }

// // Types pour les uploads
// export interface UploadResponse {
//   url: string
//   filename: string
//   size: number
//   mimetype: string
// }

// export interface MultipleUploadResponse {
//   urls: string[]
//   files: Array<{
//     url: string
//     filename: string
//     size: number
//     mimetype: string
//   }>
// }

// // Types pour les workflows combinés
// export interface CreateAnnouncementWithImageRequest {
//   announcement: Omit<CreateAnnouncementPayload, "poster">
//   image?: File
// }

// export interface CreateServiceWithImagesRequest {
//   service: Omit<CreateServicePayload, "icon">
//   images?: File[]
// }

// export interface CreatePlaceWithImagesRequest {
//   place: Omit<CreatePlacePayload, "poster" | "gallery">
//   posterImage?: File
//   galleryImages?: File[]
// }

// export interface CreateCommuniqueWithImagesRequest {
//   communiqueData: Omit<CreateCommuniqueRequest, "poster" | "gallery">
//   posterFile?: File
//   galleryFiles?: File[]
// }

// // Renaming existing types for consistency
// export interface CreateAnnouncementRequest extends CreateAnnouncementPayload {}
// export interface CreateServiceRequest extends CreateServicePayload {}
// export interface CreatePlaceRequest extends CreatePlacePayload {}
// Types pour l'authentification
export interface RegisterPayload {
  firstName: string
  lastName: string
  birthDate: string
  birthPlace: string
  nationality: string
  city: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  idType: string
  idNumber: string
  acceptTerms: boolean
  acceptDataPolicy: boolean
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginOtpPayload {
  email: string
  otpCode: string
}

export interface VerifyOtpPayload {
  code: string
  userId: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  token: string
  newPassword: string
}

export interface ChangePasswordPayload {
  currentPassword: string
  newPassword: string
}

export interface resendOtpPayload {
  email: string
}

// Auth response types
export interface LoginResponse {
  message: string
  requiresOtp: boolean
  email: string
  userId: string
}

export interface LoginWithOtpResponse {
  message: string
  accessToken: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
}

export interface RegisterResponse {
  message: string
  userId: string
  email: string
}

export interface VerifyOtpResponse {
  message: string
  accessToken: string
  user: {
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
  }
}

// Types pour les annonces
export interface Announcement {
  id: string
  title: string
  description: string
  details: string
  gallery: string[]
  date: string
  type: string
  poster: string
  comments: string[]
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface CreateAnnouncementPayload {
  title: string
  description: string
  details: string
  gallery: string[]
  date: string
  type: string
  poster: string
  comments: string[]
  tags: string[]
}

export interface UpdateAnnouncementPayload {
  title?: string
  description?: string
  tags?: string[]
}

export interface AddCommentPayload {
  comment: string
}

// Types pour les communiques
export interface Communique {
  id: string
  title: string
  description: string
  details: string
  gallery: string[]
  date: string
  type: string
  poster: string
  comments: string[]
  isActive: boolean
  viewCount: number
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface CreateCommuniqueRequest {
  title: string
  description: string
  details: string
  gallery: string[]
  date: string
  type: string
  poster: string
  comments: string[]
  tags: string[]
}

export interface UpdateCommuniqueRequest {
  title?: string
  description?: string
  details?: string
  gallery?: string[]
  date?: string
  type?: string
  poster?: string
  comments?: string[]
  tags?: string[]
}

export interface AddCommentRequest {
  comment: string
}

export interface CommuniquesQueryParams {
  page?: number
  limit?: number
  type?: string
  search?: string
  tags?: string
}

// Types pour les services
export interface Service {
  id: string
  title: string
  description: string
  category: string
  estimatedDuration: string
  conditions: string[]
  requiredDocuments: string[]
  type: "basic" | "advanced"
  icon: string
  createdAt: string
  updatedAt: string
}

export interface CreateServicePayload {
  title: string
  description: string
  category: string
  estimatedDuration: string
  conditions: string[]
  requiredDocuments: string[]
  type: "basic" | "advanced"
  icon: string
}

export interface AdvancedService {
  id: string
  name: string
  category: string
  description: string
  icon: string
  conditions: string
  confirmationMessage: string
  acceptedDocuments: AcceptedDocument[]
  formFields: FormField[]
  createdAt: string
  updatedAt: string
}

export interface AcceptedDocument {
  id: string
  name: string
  type: string
  required: boolean
  userHelp: string
}

export interface FormField {
  id: string
  label: string
  type: string
  required: boolean
  userHelp: string
}

export interface CreateAdvancedServicePayload {
  name: string
  category: string
  description: string
  icon: string
  conditions: string
  confirmationMessage: string
  acceptedDocuments: AcceptedDocument[]
  formFields: FormField[]
}

export interface ServiceRequest {
  id: string
  type: "basic" | "advanced"
  payload: Record<string, any>
  status: string
  createdAt: string
  updatedAt: string
}

export interface CreateServiceRequestPayload {
  type: "basic" | "advanced"
  payload: Record<string, any>
}

// Types pour les paramètres du site
export interface BusinessHours {
  monday: { open: string; close: string; isOpen: boolean }
  tuesday: { open: string; close: string; isOpen: boolean }
  wednesday: { open: string; close: string; isOpen: boolean }
  thursday: { open: string; close: string; isOpen: boolean }
  friday: { open: string; close: string; isOpen: boolean }
  saturday: { open: string; close: string; isOpen: boolean }
  sunday: { open: string; close: string; isOpen: boolean }
}

export interface EmergencyContact {
  name: string
  phone: string
  service: string
  available24h: boolean
}

export interface ImportantLink {
  title: string
  url: string
  description: string
}

export interface SiteSettings {
  id: string
  siteName: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  phone: string
  email: string
  address: string
  city: string
  country: string
  postalCode: string
  latitude: number
  longitude: number
  website: string
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
  youtube: string
  description: string
  welcomeMessage: string
  footerText: string
  businessHours: BusinessHours
  emergencyContacts: EmergencyContact[]
  importantLinks: ImportantLink[]
  createdAt: string
  updatedAt: string
}

export interface CreateSiteSettingsPayload {
  siteName: string
  logo: string
  favicon: string
  primaryColor: string
  secondaryColor: string
  phone: string
  email: string
  address: string
  city: string
  country: string
  postalCode: string
  latitude: number
  longitude: number
  website: string
  facebook: string
  twitter: string
  instagram: string
  linkedin: string
  youtube: string
  description: string
  welcomeMessage: string
  footerText: string
  businessHours: BusinessHours
  emergencyContacts: EmergencyContact[]
  importantLinks: ImportantLink[]
}

export interface UpdateSiteSettingsPayload {
  siteName?: string
  primaryColor?: string
  [key: string]: any
}

// Types pour les utilisateurs
export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  city: string
  birthDate: string
  birthPlace: string
  nationality: string
  idType: string
  idNumber: string
  createdAt: string
  updatedAt: string
}

export interface UpdateUserPayload {
  firstName?: string
  lastName?: string
  city?: string
  [key: string]: any
}

// Types pour les lieux
export interface Place {
  id: string
  title: string
  description: string
  details: string
  gallery: string[]
  reviews: string[]
  phone: string
  website: string
  address: string
  features: string[]
  specialties: string[]
  openingHours: string
  poster: string
  type: string
  createdAt: string
  updatedAt: string
}

export interface CreatePlacePayload {
  title: string
  description: string
  details: string
  gallery: string[]
  reviews: string[]
  phone: string
  website: string
  address: string
  features: string[]
  specialties: string[]
  openingHours: string
  poster: string
  type: string
}

export interface UpdatePlacePayload {
  title?: string
  description?: string
  details?: string
  gallery?: string[]
  reviews?: string[]
  phone?: string
  website?: string
  address?: string
  features?: string[]
  specialties?: string[]
  openingHours?: string
  poster?: string
  type?: "restaurant" | "hotel" | "activity" | "landmark"
}

export interface PlacesResponse {
  data: Place[]
  total?: number
  page?: number
  limit?: number
  totalPages?: number
}

// Types de réponse API génériques
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Types pour les uploads
export interface UploadResponse {
  url: string
  filename: string
  size: number
  mimetype: string
}

export interface MultipleUploadResponse {
  urls: string[]
  files: Array<{
    url: string
    filename: string
    size: number
    mimetype: string
  }>
}

// Types pour les workflows combinés
export interface CreateAnnouncementWithImageRequest {
  announcement: Omit<CreateAnnouncementPayload, "poster">
  image?: File
}

export interface CreateServiceWithImagesRequest {
  service: Omit<CreateServicePayload, "icon">
  images?: File[]
}

export interface CreatePlaceWithImagesRequest {
  place: Omit<CreatePlacePayload, "poster" | "gallery">
  posterImage?: File
  galleryImages?: File[]
}

export interface CreateCommuniqueWithImagesRequest {
  communiqueData: Omit<CreateCommuniqueRequest, "poster" | "gallery">
  posterFile?: File
  galleryFiles?: File[]
}

// Renaming existing types for consistency
export interface CreateAnnouncementRequest extends CreateAnnouncementPayload {}
export interface CreateServiceRequest extends CreateServicePayload {}
export interface CreatePlaceRequest extends CreatePlacePayload {}
export interface UpdatePlaceRequest extends UpdatePlacePayload {}

// Types for notifications, search, and auth responses
export interface Notification {
  id: string
  userId: string
  message: string
  type: "info" | "warning" | "error" | "success"
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface CreateNotificationRequest {
  userId: string
  message: string
  type: "info" | "warning" | "error" | "success"
}

export interface NotificationsResponse {
  data: Notification[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface UnreadCountResponse {
  count: number
}

export interface SearchResponse {
  query: string
  results: {
    places: Place[]
    announcements: Announcement[]
    services: Service[]
  }
  total: number
}

export interface SearchRequest {
  query: string
  type?: string
}






export interface ServicesResponse {
  data: {
    id: string;
    type: string;
    title: string;
    description: string;
    icon: string;
    category: string;
    isActive: boolean;
    requiredDocuments: string[];
    formFields: unknown[]; 
    workflow: Record<string, unknown>; 
    createdAt: string; 
    updatedAt: string; 
  }[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
export interface OneServiceResponse {
 
    id: string;
    type: string;
    title: string;
    description: string;
    icon: string;
    category: string;
    isActive: boolean;
    requiredDocuments: string[];
    formFields: unknown[]; 
    workflow: Record<string, unknown>; 
    createdAt: string; 
    updatedAt: string; 
 
}