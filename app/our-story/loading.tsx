import { Skeleton } from "@/components/ui/skeleton"

export default function OurStoryLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-dark-900 to-brand-dark-800 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="p-6 md:p-8">
          <Skeleton className="h-10 w-48 mx-auto mb-8 bg-gray-700" />

          <div className="space-y-6">
            <div>
              <Skeleton className="h-8 w-64 mb-3 bg-gray-700" />
              <Skeleton className="h-6 w-full bg-gray-700" />
              <Skeleton className="h-6 w-5/6 mt-2 bg-gray-700" />
              <Skeleton className="h-6 w-full mt-3 bg-gray-700" />
              <Skeleton className="h-6 w-4/5 mt-2 bg-gray-700" />
            </div>

            <div>
              <Skeleton className="h-8 w-64 mb-3 bg-gray-700" />
              <Skeleton className="h-6 w-full bg-gray-700" />
              <Skeleton className="h-6 w-5/6 mt-2 bg-gray-700" />
              <Skeleton className="h-6 w-4/5 mt-2 bg-gray-700" />
            </div>

            <Skeleton className="h-6 w-full bg-gray-700" />

            <div>
              <Skeleton className="h-8 w-64 mb-3 bg-gray-700" />
              <div className="space-y-3 pl-6">
                <Skeleton className="h-6 w-5/6 bg-gray-700" />
                <Skeleton className="h-6 w-full bg-gray-700" />
                <Skeleton className="h-6 w-full bg-gray-700" />
                <Skeleton className="h-6 w-5/6 bg-gray-700" />
              </div>
            </div>

            <div>
              <Skeleton className="h-8 w-64 mb-3 bg-gray-700" />
              <div className="space-y-3 pl-6">
                <Skeleton className="h-6 w-full bg-gray-700" />
                <Skeleton className="h-6 w-5/6 bg-gray-700" />
              </div>
            </div>

            <Skeleton className="h-8 w-64 mx-auto mt-8 bg-gray-700" />
          </div>

          <Skeleton className="h-10 w-32 mx-auto mt-10 bg-gray-700" />
        </div>
      </div>
    </main>
  )
}
