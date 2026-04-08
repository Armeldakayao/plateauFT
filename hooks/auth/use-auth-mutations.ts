// import { useMutation, useQueryClient } from "@tanstack/react-query"
// import { apiClient } from "@/lib/api/client"
// import { queryKeys } from "@/lib/query-keys"
// import type {
//   RegisterPayload,
//   LoginPayload,
//   LoginOtpPayload,
//   VerifyOtpPayload,
//   ForgotPasswordPayload,
//   ResetPasswordPayload,
//   ChangePasswordPayload,
//   ApiResponse,
//   User,
// } from "@/lib/types/api"

// // Hook pour l'inscription
// export function useRegister() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (data: RegisterPayload) =>
//       apiClient.post<ApiResponse<{ user: User; token: string }>>("/register", data),
//     onSuccess: (response) => {
//       // Stocker le token
//       localStorage.setItem("auth_token", response.data.token)
//       // Invalider le cache auth
//       queryClient.invalidateQueries({ queryKey: queryKeys.auth.all })
//     },
//   })
// }

// // Hook pour la connexion
// export function useLogin() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (data: LoginPayload) => apiClient.post<ApiResponse<{ user: User; token: string }>>("/login", data),
//     onSuccess: (response) => {
//       localStorage.setItem("auth_token", response.data.token)
//       queryClient.invalidateQueries({ queryKey: queryKeys.auth.all })
//     },
//   })
// }

// // Hook pour la connexion OTP
// export function useLoginOtp() {
//   return useMutation({
//     mutationFn: (data: LoginOtpPayload) => apiClient.post<ApiResponse<{ message: string }>>("/login-otp", data),
//   })
// }

// // Hook pour vérifier l'OTP de connexion
// export function useVerifyLoginOtp() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (data: VerifyOtpPayload) =>
//       apiClient.post<ApiResponse<{ user: User; token: string }>>("/verify-login-otp", data),
//     onSuccess: (response) => {
//       localStorage.setItem("auth_token", response.data.token)
//       queryClient.invalidateQueries({ queryKey: queryKeys.auth.all })
//     },
//   })
// }

// // Hook pour vérifier l'inscription
// export function useVerifyRegistration() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: (data: VerifyOtpPayload) =>
//       apiClient.post<ApiResponse<{ user: User; token: string }>>("/verify-registration", data),
//     onSuccess: (response) => {
//       localStorage.setItem("auth_token", response.data.token)
//       queryClient.invalidateQueries({ queryKey: queryKeys.auth.all })
//     },
//   })
// }

// // Hook pour mot de passe oublié
// export function useForgotPassword() {
//   return useMutation({
//     mutationFn: (data: ForgotPasswordPayload) =>
//       apiClient.post<ApiResponse<{ message: string }>>("/forgot-password", data),
//   })
// }

// // Hook pour réinitialiser le mot de passe
// export function useResetPassword() {
//   return useMutation({
//     mutationFn: (data: ResetPasswordPayload) =>
//       apiClient.post<ApiResponse<{ message: string }>>("/reset-password", data),
//   })
// }

// // Hook pour changer le mot de passe
// export function useChangePassword() {
//   return useMutation({
//     mutationFn: (data: ChangePasswordPayload) =>
//       apiClient.post<ApiResponse<{ message: string }>>("/change-password", data),
//   })
// }

// // Hook pour la déconnexion
// export function useLogout() {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: async () => {
//       localStorage.removeItem("auth_token")
//       return Promise.resolve()
//     },
//     onSuccess: () => {
//       queryClient.clear()
//     },
//   })
// }
"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { apiClient } from "@/lib/api/client"
import { useToast } from "@/lib/hooks/use-toast"
import { authKeys } from "@/lib/query-keys"
import type {
  RegisterPayload,
  LoginPayload,
  LoginOtpPayload,
  VerifyOtpPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  ChangePasswordPayload,
  resendOtpPayload,
} from "@/lib/types/api"

export const useRegisterMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RegisterPayload) => {
      const loadingToast = showLoading("Inscription en cours...")
      try {
        const response = await apiClient.auth.register(data)
        dismiss(loadingToast)
        showSuccess("Inscription réussie ! Vérifiez votre email pour le code OTP.")
        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Erreur lors de l'inscription")
    },
  })
}

export const useLoginMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()

  return useMutation({
    mutationFn: async (data: LoginPayload) => {
      const loadingToast = showLoading("Connexion en cours...")
      try {
        const response = await apiClient.auth.login(data)
        dismiss(loadingToast)
        showSuccess("Code de vérification envoyé à votre email")
        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Identifiants incorrects")
    },
  })
}

export const useLoginWithOtpMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: LoginOtpPayload) => {
      const loadingToast = showLoading("Vérification du code...")
      try {
        const response = await apiClient.auth.loginOtp(data)
        dismiss(loadingToast)
        showSuccess("Connexion réussie !")

        // Store token
        //@ts-ignore
        localStorage.setItem("auth_token", response.accessToken)
        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Code OTP incorrect ou expiré")
    },
  })
}

export const useVerifyOtpMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: VerifyOtpPayload) => {
      const loadingToast = showLoading("Vérification en cours...")
      try {
        const response = await apiClient.auth.verifyOtp(data)
        dismiss(loadingToast)
        showSuccess("Email vérifié avec succès ! Vous êtes maintenant connecté.")

        // Store token
        //@ts-ignore
        localStorage.setItem("auth_token", response.accessToken)
        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Code incorrect ou expiré")
    },
  })
}
export const useVerifyOtpCitizenMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: VerifyOtpPayload) => {
      const loadingToast = showLoading("Vérification en cours...")
      try {
        const response = await apiClient.auth.verifyOtp(data)
        dismiss(loadingToast)
        showSuccess("Email vérifié avec succès ! Vous êtes maintenant connecté.")

        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.all })
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Code incorrect ou expiré")
    },
  })
}
export const useForgotPasswordMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()

  return useMutation({
    mutationFn: async (data: ForgotPasswordPayload) => {
      const loadingToast = showLoading("Envoi de l'email de réinitialisation...")
      try {
        const response = await apiClient.auth.forgotPassword(data)
        dismiss(loadingToast)
        showSuccess("Email de réinitialisation envoyé")
        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Erreur lors de l'envoi de l'email")
    },
  })
}

export const useResetPasswordMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()

  return useMutation({
    mutationFn: async (data: ResetPasswordPayload) => {
      const loadingToast = showLoading("Réinitialisation du mot de passe...")
      try {
        const response = await apiClient.auth.resetPassword(data)
        dismiss(loadingToast)
        showSuccess("Mot de passe réinitialisé avec succès")
        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Token invalide ou expiré")
    },
  })
}

export const useChangePasswordMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()

  return useMutation({
    mutationFn: async (data: ChangePasswordPayload) => {
      const loadingToast = showLoading("Modification du mot de passe...")
      try {
        const response = await apiClient.auth.changePassword(data)
        dismiss(loadingToast)
        showSuccess("Mot de passe modifié avec succès")
        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Mot de passe actuel incorrect")
    },
  })
}

export const useResendOtpMutation = () => {
  const { showSuccess, showError, showLoading, dismiss } = useToast()

  return useMutation({
    mutationFn: async (data: resendOtpPayload) => {
      const loadingToast = showLoading("Renvoi du code OTP...")
      try {
        const response = await apiClient.auth.resendOtp(data)
        dismiss(loadingToast)
        showSuccess("Nouveau code OTP envoyé")
        return response
      } catch (error) {
        dismiss(loadingToast)
        throw error
      }
    },
    onError: (error: any) => {
      showError(error.response?.data?.message || "Erreur lors du renvoi du code")
    },
  })
}

export const useLogoutMutation = () => {
  const { showSuccess } = useToast()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("auth_token")
      return Promise.resolve()
    },
    onSuccess: () => {
      queryClient.clear()
      showSuccess("Déconnexion réussie")
    },
  })
}

// Legacy exports for backward compatibility
export const useRegister = useRegisterMutation
export const useLogin = useLoginMutation
export const useLoginOtp = useLoginWithOtpMutation
export const useVerifyLoginOtp = useVerifyOtpMutation
export const useVerifyRegistration = useVerifyOtpMutation
export const useForgotPassword = useForgotPasswordMutation
export const useResetPassword = useResetPasswordMutation
export const useChangePassword = useChangePasswordMutation
export const useLogout = useLogoutMutation
