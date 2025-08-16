"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Filter, Plus, Eye, Edit, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockOrders = [
  {
    id: "#1001",
    customer: "Марія Іваненко",
    product: "iPhone 15 Pro",
    quantity: 1,
    amount: "$999",
    status: "pending",
    date: "2024-01-15",
    supplier: "TechSupply",
  },
  {
    id: "#1002",
    customer: "Петро Коваленко",
    product: "Samsung Galaxy S24",
    quantity: 2,
    amount: "$1,698",
    status: "completed",
    date: "2024-01-14",
    supplier: "MobileWorld",
  },
  {
    id: "#1003",
    customer: "Анна Шевченко",
    product: "MacBook Air M3",
    quantity: 1,
    amount: "$1,299",
    status: "processing",
    date: "2024-01-13",
    supplier: "AppleStore",
  },
  {
    id: "#1004",
    customer: "Олександр Мельник",
    product: "AirPods Pro 2",
    quantity: 3,
    amount: "$747",
    status: "shipped",
    date: "2024-01-12",
    supplier: "TechSupply",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge
            variant="secondary"
            className="bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50 transition-all duration-200"
          >
            Виконано
          </Badge>
        )
      case "pending":
        return (
          <Badge
            variant="secondary"
            className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30 hover:border-yellow-500/50 transition-all duration-200"
          >
            Очікує
          </Badge>
        )
      case "processing":
        return (
          <Badge
            variant="secondary"
            className="bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-500/50 transition-all duration-200"
          >
            Обробляється
          </Badge>
        )
      case "shipped":
        return (
          <Badge
            variant="secondary"
            className="bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30 hover:border-purple-500/50 transition-all duration-200"
          >
            Відправлено
          </Badge>
        )
      default:
        return <Badge variant="secondary">Невідомо</Badge>
    }
  }

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Мої замовлення</h1>
          <p className="text-sm sm:text-base text-gray-400">Керуйте вашими замовленнями та відстежуйте їх статус</p>
        </div>
        <Link href="/dashboard/create-order">
          <Button className="cosmic-glow w-full sm:w-auto min-h-[44px]">
            <Plus className="w-4 h-4 mr-2" />
            Нове замовлення
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="space-gradient border-slate-700">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Пошук за клієнтом, продуктом або ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white min-h-[44px]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white min-h-[44px]">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Всі статуси</SelectItem>
                  <SelectItem value="pending">Очікує</SelectItem>
                  <SelectItem value="processing">Обробляється</SelectItem>
                  <SelectItem value="shipped">Відправлено</SelectItem>
                  <SelectItem value="completed">Виконано</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="bg-transparent border-slate-600 min-h-[44px]">
                <Filter className="w-4 h-4 mr-2" />
                Фільтри
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders - Desktop Table / Mobile Cards */}
      <Card className="space-gradient border-slate-700">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-white text-lg sm:text-xl">Замовлення ({filteredOrders.length})</CardTitle>
          <CardDescription className="text-gray-400 text-sm sm:text-base">Список всіх ваших замовлень</CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6">
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-gray-300">ID</TableHead>
                  <TableHead className="text-gray-300">Клієнт</TableHead>
                  <TableHead className="text-gray-300">Продукт</TableHead>
                  <TableHead className="text-gray-300">Кількість</TableHead>
                  <TableHead className="text-gray-300">Сума</TableHead>
                  <TableHead className="text-gray-300">Статус</TableHead>
                  <TableHead className="text-gray-300">Дата</TableHead>
                  <TableHead className="text-gray-300">Постачальник</TableHead>
                  <TableHead className="text-gray-300"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-slate-700 hover:bg-slate-800/30">
                    <TableCell className="text-white font-medium">{order.id}</TableCell>
                    <TableCell className="text-gray-300">{order.customer}</TableCell>
                    <TableCell className="text-gray-300">{order.product}</TableCell>
                    <TableCell className="text-gray-300">{order.quantity}</TableCell>
                    <TableCell className="text-white font-medium">{order.amount}</TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-gray-300">{order.date}</TableCell>
                    <TableCell className="text-gray-300">{order.supplier}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-slate-700" align="end">
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-slate-700">
                            <Eye className="mr-2 h-4 w-4" />
                            Переглянути
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-slate-700">
                            <Edit className="mr-2 h-4 w-4" />
                            Редагувати
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-white font-medium text-base">{order.id}</h3>
                      <p className="text-gray-400 text-sm">{order.customer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(order.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="min-w-[44px] min-h-[44px] p-2">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-slate-700" align="end">
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-slate-700 min-h-[44px]">
                            <Eye className="mr-2 h-4 w-4" />
                            Переглянути
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-slate-700 min-h-[44px]">
                            <Edit className="mr-2 h-4 w-4" />
                            Редагувати
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Продукт:</span>
                      <span className="text-white text-sm font-medium">{order.product}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Кількість:</span>
                      <span className="text-white text-sm">{order.quantity}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Сума:</span>
                      <span className="text-white text-sm font-medium">{order.amount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Дата:</span>
                      <span className="text-gray-300 text-sm">{order.date}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-sm">Постачальник:</span>
                      <span className="text-gray-300 text-sm">{order.supplier}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
