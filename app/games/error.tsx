"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function GamesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Games page error:", error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="card-bg">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-brand-dark-400 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
            <p className="text-brand-gray-400 mb-6 max-w-md">
              We encountered an error while loading the games. Please try again.
            </p>
            <Button onClick={reset} className="bg-[#d27621] hover:bg-brand-amber-600 text-white">
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
