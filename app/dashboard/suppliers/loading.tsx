import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SuppliersLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div>
        <Skeleton className="h-9 w-64 mb-2 bg-slate-800/50" />
        <Skeleton className="h-5 w-96 bg-slate-800/50" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="space-gradient border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="w-12 h-12 rounded-lg bg-slate-800/50" />
                <Skeleton className="w-8 h-4 bg-slate-800/50" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-slate-800/50" />
                <Skeleton className="h-8 w-16 bg-slate-800/50" />
                <Skeleton className="h-3 w-20 bg-slate-800/50" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid Skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Suppliers Table Skeleton */}
        <Card className="lg:col-span-2 space-gradient border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48 bg-slate-800/50" />
              <Skeleton className="h-4 w-64 bg-slate-800/50" />
            </div>
            <Skeleton className="h-9 w-24 bg-slate-800/50" />
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Skeleton className="h-10 w-full bg-slate-800/50" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-12 rounded-full bg-slate-800/50" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32 bg-slate-800/50" />
                      <Skeleton className="h-4 w-48 bg-slate-800/50" />
                      <Skeleton className="h-3 w-40 bg-slate-800/50" />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-16 bg-slate-800/50" />
                    <Skeleton className="h-8 w-20 bg-slate-800/50" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Quick Actions Skeleton */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <Skeleton className="h-6 w-24 bg-slate-800/50" />
              <Skeleton className="h-4 w-48 bg-slate-800/50" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full bg-slate-800/50" />
              ))}
            </CardContent>
          </Card>

          {/* Top Suppliers Skeleton */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <Skeleton className="h-6 w-32 bg-slate-800/50" />
              <Skeleton className="h-4 w-40 bg-slate-800/50" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Skeleton className="w-10 h-10 rounded-full bg-slate-800/50" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-24 bg-slate-800/50" />
                        <Skeleton className="h-3 w-20 bg-slate-800/50" />
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <Skeleton className="h-4 w-12 bg-slate-800/50" />
                      <Skeleton className="h-3 w-16 bg-slate-800/50" />
                      <Skeleton className="h-3 w-8 bg-slate-800/50" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
