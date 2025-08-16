import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function WhatsNewLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-80 bg-slate-700/50" />
        <Skeleton className="h-4 w-96 bg-slate-700/50" />
      </div>

      {/* Separator */}
      <div className="h-px bg-slate-700/50" />

      {/* Patch Notes Skeletons */}
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="bg-slate-800/50 border-slate-700/50">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Skeleton className="w-10 h-10 rounded-lg bg-slate-700/50" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-64 bg-slate-700/50" />
                    <div className="flex items-center space-x-3">
                      <Skeleton className="h-4 w-24 bg-slate-700/50" />
                      <Skeleton className="h-4 w-16 bg-slate-700/50" />
                    </div>
                  </div>
                </div>
                <Skeleton className="h-6 w-32 rounded-full bg-slate-700/50" />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <Skeleton className="h-4 w-full mb-2 bg-slate-700/50" />
              <Skeleton className="h-4 w-3/4 mb-4 bg-slate-700/50" />

              <div className="space-y-2">
                <Skeleton className="h-4 w-20 bg-slate-700/50" />
                {Array.from({ length: 3 }).map((_, changeIndex) => (
                  <div key={changeIndex} className="flex items-start space-x-2">
                    <Skeleton className="w-1.5 h-1.5 rounded-full mt-2 bg-slate-700/50" />
                    <Skeleton className="h-4 w-full bg-slate-700/50" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
