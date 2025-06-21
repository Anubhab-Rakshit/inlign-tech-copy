import { Suspense } from "react"

// Simple loading component for page transitions (not the main loader)
function SimpleLoader() {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-white/10 rounded-2xl p-8 border border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-white font-medium">Loading...</span>
        </div>
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <Suspense fallback={<SimpleLoader />}>
      <SimpleLoader />
    </Suspense>
  )
}
