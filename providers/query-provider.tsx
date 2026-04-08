"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { useState } from "react"

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Temps de cache par défaut
            staleTime: 1000 * 60 * 5, // 5 minutes
            // Temps avant garbage collection
            gcTime: 1000 * 60 * 10, // 10 minutes
            // Retry sur erreur
            retry: (failureCount, error: any) => {
              // Ne pas retry sur les erreurs 4xx
              if (error?.status >= 400 && error?.status < 500) {
                return false
              }
              return failureCount < 3
            },
            // Refetch en arrière-plan
            refetchOnWindowFocus: false,
          },
          mutations: {
            // Retry pour les mutations
            retry: (failureCount, error: any) => {
              if (error?.status >= 400 && error?.status < 500) {
                return false
              }
              return failureCount < 2
            },
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
