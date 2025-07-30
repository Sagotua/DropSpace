import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SubscriptionLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="text-center space-y-4">
        <Skeleton className="h-8 w-48 mx-auto bg-slate-700" />
        <Skeleton className="h-4 w-96 mx-auto bg-slate-700" />
      </div>

      {/* Current Subscription Skeleton */}
      <Card className="space-gradient border-slate-700 max-w-2xl mx-auto">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Skeleton className="w-12 h-12 rounded-lg bg-slate-600" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-48 bg-slate-600" />
                <Skeleton className="h-3 w-32 bg-slate-600" />
              </div>
            </div>
            <Skeleton className="h-8 w-20 bg-slate-600" />
          </div>
        </CardContent>
      </Card>

      {/* Plans Skeleton */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="space-gradient border-slate-700">
            <CardHeader className="text-center pb-4">
              <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4 bg-slate-600" />
              <Skeleton className="h-6 w-24 mx-auto mb-2 bg-slate-600" />
              <Skeleton className="h-8 w-16 mx-auto mb-2 bg-slate-600" />
              <Skeleton className="h-4 w-32 mx-auto bg-slate-600" />
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <div key={j} className="flex items-center space-x-3">
                    <Skeleton className="w-4 h-4 bg-slate-600" />
                    <Skeleton className="h-4 flex-1 bg-slate-600" />
                  </div>
                ))}
              </div>
              <Skeleton className="h-10 w-full bg-slate-600" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Comparison Skeleton */}
      <Card className="space-gradient border-slate-700 max-w-4xl mx-auto">
        <CardHeader>
          <Skeleton className="h-6 w-48 mx-auto mb-2 bg-slate-600" />
          <Skeleton className="h-4 w-64 mx-auto bg-slate-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="grid grid-cols-4 gap-4">
                <Skeleton className="h-4 bg-slate-600" />
                <Skeleton className="h-4 bg-slate-600" />
                <Skeleton className="h-4 bg-slate-600" />
                <Skeleton className="h-4 bg-slate-600" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
