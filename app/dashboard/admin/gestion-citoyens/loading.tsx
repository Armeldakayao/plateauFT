import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <Skeleton className="h-4 w-64" />
      </div>

      <div className="mb-8">
        <Skeleton className="h-8 w-64 mb-6" />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-end">
            <div className="flex-1">
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-16" />
            </div>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Skeleton className="h-10 w-64" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 p-4">
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="p-6 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-8 w-32" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
