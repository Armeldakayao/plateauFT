import { toast } from "sonner"

export interface ToastOptions {
  title?: string
  description?: string
  duration?: number
}

export const useToast = () => {
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(options?.title || "Succès", {
      description: message,
      duration: options?.duration || 4000,
    })
  }

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(options?.title || "Erreur", {
      description: message,
      duration: options?.duration || 5000,
    })
  }

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(options?.title || "Information", {
      description: message,
      duration: options?.duration || 4000,
    })
  }

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warning(options?.title || "Attention", {
      description: message,
      duration: options?.duration || 4000,
    })
  }

  const showLoading = (message: string) => {
    return toast.loading(message)
  }

  const dismiss = (toastId?: string | number) => {
    toast.dismiss(toastId)
  }

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    dismiss,
  }
}
