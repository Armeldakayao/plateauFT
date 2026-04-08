import { Skeleton } from "@/components/ui/skeleton"

export default function ServicesFormulairesLoading() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-8 w-80 mb-6" />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex gap-4">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Skeleton className="h-10 w-64" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-6">
          <Skeleton className="h-6 w-80" />
        </div>
        <div className="p-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-100 last:border-0">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-16" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
