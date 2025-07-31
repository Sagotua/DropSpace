import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PayoutsLoading() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="h-9 w-48 bg-slate-700" />
        <Skeleton className="h-5 w-96 mt-2 bg-slate-700" />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="space-gradient border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-slate-600" />
                  <Skeleton className="h-8 w-32 bg-slate-600" />
                </div>
                <Skeleton className="w-12 h-12 rounded-lg bg-slate-600" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card className="space-gradient border-slate-700">
        <CardHeader>
          <Skeleton className="h-6 w-24 bg-slate-600" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1 bg-slate-600" />
            <Skeleton className="h-10 w-48 bg-slate-600" />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="space-gradient border-slate-700">
        <CardHeader>
          <Skeleton className="h-6 w-32 bg-slate-600" />
          <Skeleton className="h-4 w-64 bg-slate-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <Skeleton className="h-4 w-20 bg-slate-600" />
                <Skeleton className="h-4 w-24 bg-slate-600" />
                <Skeleton className="h-4 w-24 bg-slate-600" />
                <Skeleton className="h-4 w-20 bg-slate-600" />
                <Skeleton className="h-4 w-32 bg-slate-600" />
                <Skeleton className="h-4 w-20 bg-slate-600" />
                <Skeleton className="h-8 w-24 bg-slate-600" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
