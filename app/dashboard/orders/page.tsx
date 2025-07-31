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
          <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
            Виконано
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
            Очікує
          </Badge>
        )
      case "processing":
        return (
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            Обробляється
          </Badge>
        )
      case "shipped":
        return (
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-400 border-purple-500/30">
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
          <h1 className="text-3xl font-bold text-white">Мої замовлення</h1>
          <p className="text-gray-400">Керуйте вашими замовленнями та відстежуйте їх статус</p>
        </div>
        <Link href="/dashboard/create-order">
          <Button className="cosmic-glow">
            <Plus className="w-4 h-4 mr-2" />
            Нове замовлення
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card className="space-gradient border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Пошук за клієнтом, продуктом або ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-800 border-slate-600 text-white">
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
            <Button variant="outline" className="bg-transparent border-slate-600">
              <Filter className="w-4 h-4 mr-2" />
              Фільтри
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="space-gradient border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Замовлення ({filteredOrders.length})</CardTitle>
          <CardDescription className="text-gray-400">Список всіх ваших замовлень</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
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
        </CardContent>
      </Card>
    </div>
  )
}
