"use client"

import { useState, useEffect } from "react"
import { useRole } from "@/contexts/role-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { DollarSign, TrendingUp, Clock, CheckCircle, Filter, Search } from "lucide-react"

interface PayoutOrder {
  id: string
  orderId: string
  dropPrice: number
  retailPrice: number
  profit: number
  status: "requested" | "processing" | "completed"
  dropshipperInfo?: {
    name: string
    email: string
  }
  statusUpdatedAt?: string
  requestedAt: string
}

export default function PayoutsPage() {
  const { currentRole } = useRole()
  const [orders, setOrders] = useState<PayoutOrder[]>([])
  const [filteredOrders, setFilteredOrders] = useState<PayoutOrder[]>([])
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Initialize demo data
  useEffect(() => {
    const demoOrders: PayoutOrder[] = [
      {
        id: "payout_1",
        orderId: "ORD-001",
        dropPrice: 150,
        retailPrice: 250,
        profit: 100,
        status: "completed",
        dropshipperInfo: {
          name: "Іван Петренко",
          email: "ivan@example.com",
        },
        statusUpdatedAt: "2024-01-15T10:30:00Z",
        requestedAt: "2024-01-10T14:20:00Z",
      },
      {
        id: "payout_2",
        orderId: "ORD-002",
        dropPrice: 200,
        retailPrice: 350,
        profit: 150,
        status: "processing",
        dropshipperInfo: {
          name: "Марія Коваленко",
          email: "maria@example.com",
        },
        requestedAt: "2024-01-12T09:15:00Z",
      },
      {
        id: "payout_3",
        orderId: "ORD-003",
        dropPrice: 100,
        retailPrice: 180,
        profit: 80,
        status: "requested",
        dropshipperInfo: {
          name: "Олексій Сидоренко",
          email: "alex@example.com",
        },
        requestedAt: "2024-01-14T16:45:00Z",
      },
      {
        id: "payout_4",
        orderId: "ORD-004",
        dropPrice: 300,
        retailPrice: 500,
        profit: 200,
        status: "completed",
        dropshipperInfo: {
          name: "Анна Мельник",
          email: "anna@example.com",
        },
        statusUpdatedAt: "2024-01-13T11:20:00Z",
        requestedAt: "2024-01-08T13:30:00Z",
      },
    ]

    setOrders(demoOrders)
    setFilteredOrders(demoOrders)
  }, [])

  // Filter orders based on status and search term
  useEffect(() => {
    let filtered = orders

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.dropshipperInfo?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.dropshipperInfo?.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    setFilteredOrders(filtered)
  }, [orders, statusFilter, searchTerm])

  const handleRequestPayout = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? { ...order, status: "requested" as const, requestedAt: new Date().toISOString() }
          : order,
      ),
    )
  }

  const handleStatusUpdate = (orderId: string, newStatus: "requested" | "processing" | "completed") => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              statusUpdatedAt: newStatus === "completed" ? new Date().toISOString() : order.statusUpdatedAt,
            }
          : order,
      ),
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "requested":
        return (
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Прийнято
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            В процесі
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
            Виконано
          </Badge>
        )
      default:
        return <Badge variant="secondary">Невідомо</Badge>
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "UAH",
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Calculate summary statistics
  const totalEarned = filteredOrders.reduce((sum, order) => sum + order.profit, 0)
  const totalPaid = filteredOrders
    .filter((order) => order.status === "completed")
    .reduce((sum, order) => sum + order.profit, 0)
  const totalPending = filteredOrders
    .filter((order) => order.status !== "completed")
    .reduce((sum, order) => sum + order.profit, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Виплати</h1>
        <p className="text-gray-400">
          {currentRole === "dropshipper"
            ? "Керуйте вашими виплатами та відстежуйте їх статус"
            : "Обробляйте запити на виплати від дропшипперів"}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Загальний прибуток</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalEarned)}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Виплачено</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalPaid)}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Очікує виплати</p>
                <p className="text-2xl font-bold text-white">{formatCurrency(totalPending)}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="space-gradient border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Фільтри
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Пошук за номером замовлення або дропшиппером..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-gray-400"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-600 text-white">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Всі статуси</SelectItem>
                <SelectItem value="requested">Прийнято</SelectItem>
                <SelectItem value="processing">В процесі</SelectItem>
                <SelectItem value="completed">Виконано</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Payouts Table */}
      <Card className="space-gradient border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">
            {currentRole === "dropshipper" ? "Мої виплати" : "Запити на виплати"}
          </CardTitle>
          <CardDescription className="text-gray-400">
            {currentRole === "dropshipper"
              ? "Список ваших завершених замовлень та статус виплат"
              : "Керуйте запитами на виплати від дропшипперів"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-gray-300">ID Замовлення</TableHead>
                  <TableHead className="text-gray-300">Ціна закупки</TableHead>
                  <TableHead className="text-gray-300">Роздрібна ціна</TableHead>
                  <TableHead className="text-gray-300">Прибуток</TableHead>
                  {currentRole === "supplier" && <TableHead className="text-gray-300">Дропшиппер</TableHead>}
                  <TableHead className="text-gray-300">Статус</TableHead>
                  {currentRole === "supplier" && <TableHead className="text-gray-300">Оновлено</TableHead>}
                  {currentRole === "supplier" && <TableHead className="text-gray-300">Дії</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-slate-700">
                    <TableCell className="font-medium text-white">{order.orderId}</TableCell>
                    <TableCell className="text-gray-300">{formatCurrency(order.dropPrice)}</TableCell>
                    <TableCell className="text-gray-300">{formatCurrency(order.retailPrice)}</TableCell>
                    <TableCell className="text-green-400 font-medium">{formatCurrency(order.profit)}</TableCell>
                    {currentRole === "supplier" && (
                      <TableCell className="text-gray-300">
                        <div>
                          <div className="font-medium">{order.dropshipperInfo?.name}</div>
                          <div className="text-sm text-gray-400">{order.dropshipperInfo?.email}</div>
                        </div>
                      </TableCell>
                    )}
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    {currentRole === "supplier" && (
                      <TableCell className="text-gray-300">
                        {order.statusUpdatedAt ? formatDate(order.statusUpdatedAt) : "-"}
                      </TableCell>
                    )}
                    {currentRole === "supplier" && (
                      <TableCell>
                        <Select
                          value={order.status}
                          onValueChange={(value: "requested" | "processing" | "completed") =>
                            handleStatusUpdate(order.id, value)
                          }
                        >
                          <SelectTrigger className="w-32 bg-slate-800/50 border-slate-600 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="requested">Прийнято</SelectItem>
                            <SelectItem value="processing">В процесі</SelectItem>
                            <SelectItem value="completed">Виконано</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8">
              <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">Немає виплат для відображення</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
