import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function WhatsNewLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Skeleton className="w-10 h-10 rounded-lg mr-4" />
          <div>
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-6 w-96" />
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-8 w-12" />
                </div>
                <Skeleton className="w-8 h-8 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Patch Notes Skeleton */}
      <div className="space-y-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="bg-slate-800/50 border-slate-700">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-4 h-4" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-6 w-16 rounded" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Skeleton className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Skeleton */}
      <div className="mt-12 text-center">
        <Card className="bg-slate-800/50 border-slate-700 inline-block">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 justify-center">
              <Skeleton className="w-3 h-3 rounded-full" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Skeleton className="h-4 w-48 mt-2 mx-auto" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
