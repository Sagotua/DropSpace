import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SettingsLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div>
        <Skeleton className="h-8 w-48 bg-slate-700" />
        <Skeleton className="h-4 w-96 mt-2 bg-slate-700" />
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-6">
        <div className="flex space-x-1 bg-slate-800 rounded-lg p-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 flex-1 bg-slate-700" />
          ))}
        </div>

        {/* Content Skeleton */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Avatar Card Skeleton */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <Skeleton className="h-6 w-24 bg-slate-600" />
              <Skeleton className="h-4 w-32 bg-slate-600" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Skeleton className="w-24 h-24 rounded-full bg-slate-600" />
                <Skeleton className="h-10 w-24 bg-slate-600" />
              </div>
            </CardContent>
          </Card>

          {/* Form Skeleton */}
          <div className="lg:col-span-2">
            <Card className="space-gradient border-slate-700">
              <CardHeader>
                <Skeleton className="h-6 w-48 bg-slate-600" />
                <Skeleton className="h-4 w-64 bg-slate-600" />
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <Skeleton className="h-4 w-16 bg-slate-600" />
                      <Skeleton className="h-10 w-full bg-slate-600" />
                    </div>
                  ))}
                </div>
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-20 bg-slate-600" />
                    <Skeleton className="h-10 w-full bg-slate-600" />
                  </div>
                ))}
                <Skeleton className="h-10 w-32 bg-slate-600" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
