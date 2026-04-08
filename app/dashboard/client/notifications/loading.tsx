import Sidebar from "@/components/sidebar"

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 md:ml-64 p-4 md:p-8">
        <div className="animate-pulse">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="h-8 bg-gray-300 rounded w-48 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-64"></div>
            </div>
            <div className="h-10 bg-gray-300 rounded w-40"></div>
          </div>

          {/* Filters skeleton */}
          <div className="bg-white rounded-lg border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="h-10 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Notifications skeleton */}
          <div className="bg-white rounded-lg border">
            <div className="p-6 border-b">
              <div className="h-6 bg-gray-300 rounded w-48"></div>
            </div>
            <div className="divide-y divide-gray-100">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="h-5 bg-gray-300 rounded w-48"></div>
                        <div className="flex gap-2">
                          <div className="h-5 bg-gray-300 rounded w-16"></div>
                          <div className="h-5 bg-gray-300 rounded w-16"></div>
                        </div>
                      </div>
                      <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-3"></div>
                      <div className="flex items-center justify-between">
                        <div className="h-3 bg-gray-300 rounded w-32"></div>
                        <div className="flex gap-2">
                          <div className="h-6 bg-gray-300 rounded w-20"></div>
                          <div className="h-6 bg-gray-300 rounded w-20"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
