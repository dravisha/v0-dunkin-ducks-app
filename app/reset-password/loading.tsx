import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ResetPasswordLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="pt-6">
          <Skeleton className="h-8 w-3/4 mb-4 bg-zinc-800" />
          <Skeleton className="h-4 w-full mb-8 bg-zinc-800" />

          <div className="space-y-4">
            <div>
              <Skeleton className="h-4 w-1/4 mb-2 bg-zinc-800" />
              <Skeleton className="h-10 w-full bg-zinc-800" />
            </div>
            <div>
              <Skeleton className="h-4 w-1/3 mb-2 bg-zinc-800" />
              <Skeleton className="h-10 w-full bg-zinc-800" />
            </div>
            <Skeleton className="h-10 w-full mt-4 bg-zinc-800" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
