import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { uploadKeys } from "@/lib/query-keys"

export const useUploadSingle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => apiClient.upload.single(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: uploadKeys.all })
    },
  })
}

export const useUploadMultiple = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (files: File[]) => apiClient.upload.multiple(files),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: uploadKeys.all })
    },
  })
}

export const useUploadAvatar = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (avatar: File) => apiClient.upload.avatar(avatar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: uploadKeys.all })
    },
  })
}

export const useUploadDocuments = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (documents: File[]) => apiClient.upload.documents(documents),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: uploadKeys.all })
    },
  })
}



export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => apiClient.upload.profilePhoto(file),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: uploadKeys.all }),
  })
}

// --- Upload document utilisateur ---
export const useUploadDocument = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ file, documentType, description }: { file: File; documentType: string; description?: string }) =>
      apiClient.upload.document(file, documentType, description),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: uploadKeys.documents() }),
  })
}

// --- Get all documents ---
export const useDocuments = () => {
  return useQuery({
    queryKey: uploadKeys.documents(),
    queryFn: () => apiClient.documents.getAll(),
    staleTime: 5 * 60 * 1000,
  })
}

// --- Update document ---
export const useUpdateDocument = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { documentType: string; description?: string } }) =>
      apiClient.documents.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: uploadKeys.documents() }),
  })
}

// --- Delete document ---
export const useDeleteDocument = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiClient.documents.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: uploadKeys.documents() }),
  })
}

// --- Get all files (photo + docs) ---
export const useUserFiles = (includeInactive: "y" | "n" = "n") => {
  return useQuery({
    queryKey: uploadKeys.files(includeInactive),
    queryFn: () => apiClient.files.getAll(includeInactive),
    staleTime: 5 * 60 * 1000,
  })
}

export const useMyDocuments = (includeInactive: "y" | "n" = "n") => {
  return useQuery({
    queryKey: uploadKeys.myDocuments(includeInactive),
    queryFn: () => apiClient.files.getMyDocuments(includeInactive),
    staleTime: 5 * 60 * 1000,
  })
}

// --- Upload document admin ---
export const useUploadDocumentForUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ userId, file, documentType, description }: { userId: string; file: File; documentType: string; description?: string }) =>
      apiClient.documentsAdmin.uploadForUser(userId, file, documentType, description),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: uploadKeys.all }),
  })
}


// --- Get all files of a specific user (Admin) ---
export const useUserFilesAdmin = (userId: string, includeInactive: "y" | "n" = "n") => {
  return useQuery({
    queryKey: uploadKeys.adminUserFiles(userId, includeInactive),
    queryFn: () => apiClient.files.getAllForUser(userId, includeInactive),
    enabled: !!userId, // n'exécute la requête que si userId est défini
    staleTime: 5 * 60 * 1000,
  })
}