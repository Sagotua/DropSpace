import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div>
        <Skeleton className="h-8 w-48 bg-slate-700" />
        <Skeleton className="h-4 w-96 mt-2 bg-slate-700" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="space-gradient border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-slate-600" />
                  <Skeleton className="h-8 w-16 bg-slate-600" />
                  <Skeleton className="h-3 w-20 bg-slate-600" />
                </div>
                <Skeleton className="h-8 w-8 rounded bg-slate-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="grid lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Card key={i} className="space-gradient border-slate-700">
            <CardHeader>
              <Skeleton className="h-6 w-48 bg-slate-600" />
              <Skeleton className="h-4 w-64 bg-slate-600" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full bg-slate-600" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top Items Skeleton */}
      <Card className="space-gradient border-slate-700">
        <CardHeader>
          <Skeleton className="h-6 w-48 bg-slate-600" />
          <Skeleton className="h-4 w-64 bg-slate-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-10 w-10 rounded-full bg-slate-600" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-32 bg-slate-600" />
                    <Skeleton className="h-3 w-24 bg-slate-600" />
                  </div>
                </div>
                <div className="text-right space-y-2">
                  <Skeleton className="h-4 w-16 bg-slate-600" />
                  <Skeleton className="h-3 w-12 bg-slate-600" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
