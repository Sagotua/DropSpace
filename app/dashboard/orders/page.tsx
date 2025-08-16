"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ShoppingCart, Search, Eye, Edit, Clock, CheckCircle, DollarSign, User, MapPin } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  products: {
    name: string
    quantity: number
    price: number
    image: string
  }[]
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  createdAt: string
  shippingMethod: string
  paymentStatus: "pending" | "paid" | "failed"
}

const mockOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-2024-001",
    customer: {
      name: "Олександр Коваленко",
      email: "alex.kovalenko@gmail.com",
      phone: "+380 67 123 45 67",
      address: "вул. Хрещатик, 1, Київ, 01001",
    },
    products: [
      {
        name: "Бездротові навушники AirPods Pro",
        quantity: 2,
        price: 8999,
        image: "/placeholder.svg?height=40&width=40&text=AirPods",
      },
    ],
    status: "processing",
    total: 17998,
    createdAt: "2024-01-15T10:30:00Z",
    shippingMethod: "Нова Пошта",
    paymentStatus: "paid",
  },
  {
    id: "2",
    orderNumber: "ORD-2024-002",
    customer: {
      name: "Марія Петренко",
      email: "maria.petrenko@gmail.com",
      phone: "+380 95 987 65 43",
      address: "вул. Соборна, 15, Львів, 79000",
    },
    products: [
      {
        name: "Смартфон iPhone 15 Pro Max",
        quantity: 1,
        price: 45999,
        image: "/placeholder.svg?height=40&width=40&text=iPhone",
      },
    ],
    status: "shipped",
    total: 45999,
    createdAt: "2024-01-14T14:20:00Z",
    shippingMethod: "УкрПошта",
    paymentStatus: "paid",
  },
  {
    id: "3",
    orderNumber: "ORD-2024-003",
    customer: {
      name: "Іван Сидоренко",
      email: "ivan.sydorenko@gmail.com",
      phone: "+380 63 456 78 90",
      address: "вул. Миру, 22, Одеса, 65000",
    },
    products: [
      {
        name: "Ноутбук MacBook Air M2",
        quantity: 1,
        price: 52999,
        image: "/placeholder.svg?height=40&width=40&text=MacBook",
      },
    ],
    status: "delivered",
    total: 52999,
    createdAt: "2024-01-13T09:15:00Z",
    shippingMethod: "Meest Express",
    paymentStatus: "paid",
  },
  {
    id: "4",
    orderNumber: "ORD-2024-004",
    customer: {
      name: "Анна Мельник",
      email: "anna.melnyk@gmail.com",
      phone: "+380 50 111 22 33",
      address: "вул. Шевченка, 8, Харків, 61000",
    },
    products: [
      {
        name: "Планшет iPad Pro 12.9",
        quantity: 1,
        price: 38999,
        image: "/placeholder.svg?height=40&width=40&text=iPad",
      },
    ],
    status: "pending",
    total: 38999,
    createdAt: "2024-01-12T16:45:00Z",
    shippingMethod: "Нова Пошта",
    paymentStatus: "pending",
  },
]

export default function OrdersPage() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [paymentFilter, setPaymentFilter] = useState("all")

  // Filter orders based on search and filters
  useEffect(() => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || order.status === statusFilter
      const matchesPayment = paymentFilter === "all" || order.paymentStatus === paymentFilter

      return matchesSearch && matchesStatus && matchesPayment
    })

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter, paymentFilter])

  // Calculate stats
  const totalOrders = orders.length
  const pendingOrders = orders.filter((o) => o.status === "pending").length
  const totalRevenue = orders.filter((o) => o.paymentStatus === "paid").reduce((sum, order) => sum + order.total, 0)
  const completedOrders = orders.filter((o) => o.status === "delivered").length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Очікує</Badge>
      case "processing":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Обробляється</Badge>
      case "shipped":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Відправлено</Badge>
      case "delivered":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Доставлено</Badge>
      case "cancelled":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Скасовано</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Оплачено</Badge>
      case "pending":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Очікує оплати</Badge>
      case "failed":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Помилка оплати</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  if (!user) return null

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Замовлення</h1>
        <p className="text-sm sm:text-base text-gray-400">Керуйте всіма замовленнями ваших клієнтів</p>
      </div>

      {/* Stats Cards - Mobile Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Всього замовлень</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{totalOrders}</p>
              </div>
              <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Очікують</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{pendingOrders}</p>
              </div>
              <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700 col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Виручка</p>
                <p className="text-lg sm:text-2xl font-bold text-white">₴{totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700 col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Виконано</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{completedOrders}</p>
              </div>
              <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search - Mobile Responsive */}
      <Card className="space-gradient border-slate-700">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Пошук замовлень..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white min-h-[44px]"
              />
            </div>

            {/* Filters - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-600 text-white min-h-[44px]">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="all">Всі статуси</SelectItem>
                  <SelectItem value="pending">Очікує</SelectItem>
                  <SelectItem value="processing">Обробляється</SelectItem>
                  <SelectItem value="shipped">Відправлено</SelectItem>
                  <SelectItem value="delivered">Доставлено</SelectItem>
                  <SelectItem value="cancelled">Скасовано</SelectItem>
                </SelectContent>
              </Select>

              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-600 text-white min-h-[44px]">
                  <SelectValue placeholder="Оплата" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="all">Всі оплати</SelectItem>
                  <SelectItem value="paid">Оплачено</SelectItem>
                  <SelectItem value="pending">Очікує оплати</SelectItem>
                  <SelectItem value="failed">Помилка оплати</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders - Mobile Cards, Desktop Table */}
      <Card className="space-gradient border-slate-700">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-white text-lg sm:text-xl">Список замовлень</CardTitle>
          <CardDescription className="text-gray-400">
            {filteredOrders.length} з {totalOrders} замовлень
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 sm:p-6 sm:pt-0">
          {/* Mobile Card Layout */}
          <div className="block lg:hidden space-y-4 p-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="bg-slate-800/50 border-slate-600">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* Order Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white text-sm">{order.orderNumber}</h3>
                        <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString("uk-UA")}</p>
                      </div>
                      {getStatusBadge(order.status)}
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-white">{order.customer.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-400 truncate">{order.customer.address}</span>
                      </div>
                    </div>

                    {/* Products */}
                    <div className="space-y-2">
                      {order.products.map((product, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-8 h-8 rounded bg-slate-700"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-white truncate">{product.name}</p>
                            <p className="text-xs text-gray-400">
                              {product.quantity} × ₴{product.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Details */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-600">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-400">Загальна сума</p>
                        <p className="text-sm font-semibold text-white">₴{order.total.toLocaleString()}</p>
                      </div>
                      <div className="space-y-1 text-right">
                        <p className="text-xs text-gray-400">Оплата</p>
                        {getPaymentBadge(order.paymentStatus)}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1 min-h-[36px] bg-transparent">
                        <Eye className="w-4 h-4 mr-2" />
                        Переглянути
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 min-h-[36px] bg-transparent">
                        <Edit className="w-4 h-4 mr-2" />
                        Редагувати
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Desktop Table Layout */}
          <div className="hidden lg:block">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-gray-300">Замовлення</TableHead>
                  <TableHead className="text-gray-300">Клієнт</TableHead>
                  <TableHead className="text-gray-300">Товари</TableHead>
                  <TableHead className="text-gray-300">Статус</TableHead>
                  <TableHead className="text-gray-300">Оплата</TableHead>
                  <TableHead className="text-gray-300">Сума</TableHead>
                  <TableHead className="text-gray-300">Дата</TableHead>
                  <TableHead className="text-gray-300">Дії</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className="border-slate-700 hover:bg-slate-800/50">
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{order.orderNumber}</p>
                        <p className="text-sm text-gray-400">{order.shippingMethod}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-white">{order.customer.name}</p>
                        <p className="text-sm text-gray-400">{order.customer.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.products.map((product, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-6 h-6 rounded"
                            />
                            <span className="text-sm text-white truncate max-w-[150px]">
                              {product.name} × {product.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell>{getPaymentBadge(order.paymentStatus)}</TableCell>
                    <TableCell>
                      <span className="font-semibold text-white">₴{order.total.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      <span className="text-gray-400">{new Date(order.createdAt).toLocaleDateString("uk-UA")}</span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="p-8 sm:p-12 text-center">
              <ShoppingCart className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Замовлення не знайдено</h3>
              <p className="text-sm sm:text-base text-gray-400">Спробуйте змінити фільтри пошуку</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
