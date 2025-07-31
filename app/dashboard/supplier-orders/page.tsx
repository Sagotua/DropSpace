"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Package, User, MapPin, Phone, Clock, CheckCircle, XCircle, Truck, Eye } from "lucide-react"

// Mock orders data for supplier
const supplierOrders = [
  {
    id: "ORD1001",
    product: {
      id: "PRD001",
      name: "iPhone 15 Pro",
      sku: "IPH15PRO-256",
      image: "/placeholder.svg?height=60&width=60&text=📱",
    },
    quantity: 1,
    totalAmount: 999,
    dropshipper: {
      name: "Олександр Петренко",
      email: "alex@dropship.com",
      phone: "+380 67 123 45 67",
    },
    customer: {
      name: "Марія Іваненко",
      phone: "+380 50 987 65 43",
    },
    shipping: {
      city: "Київ",
      address: "вул. Хрещатик, 1, кв. 15",
    },
    notes: "Доставити до 18:00",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "ORD1002",
    product: {
      id: "PRD001",
      name: "iPhone 15 Pro",
      sku: "IPH15PRO-256",
      image: "/placeholder.svg?height=60&width=60&text=📱",
    },
    quantity: 2,
    totalAmount: 1998,
    dropshipper: {
      name: "Анна Коваленко",
      email: "anna@shop.ua",
      phone: "+380 63 456 78 90",
    },
    customer: {
      name: "Петро Сидоренко",
      phone: "+380 95 111 22 33",
    },
    shipping: {
      city: "Харків",
      address: "пр. Науки, 45, офіс 12",
    },
    notes: "",
    status: "accepted",
    createdAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "ORD1003",
    product: {
      id: "PRD001",
      name: "iPhone 15 Pro",
      sku: "IPH15PRO-256",
      image: "/placeholder.svg?height=60&width=60&text=📱",
    },
    quantity: 1,
    totalAmount: 999,
    dropshipper: {
      name: "Дмитро Мельник",
      email: "dmitro@ecom.com",
      phone: "+380 99 888 77 66",
    },
    customer: {
      name: "Олена Шевченко",
      phone: "+380 66 555 44 33",
    },
    shipping: {
      city: "Одеса",
      address: "вул. Дерибасівська, 10, кв. 5",
    },
    notes: "Передзвонити перед доставкою",
    status: "shipped",
    createdAt: "2024-01-13T09:15:00Z",
  },
]

export default function SupplierOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "accepted":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "shipped":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Очікує"
      case "accepted":
        return "Прийнято"
      case "rejected":
        return "Відхилено"
      case "shipped":
        return "Відправлено"
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "accepted":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleStatusUpdate = (orderId: string, newStatus: string) => {
    // In a real app, this would update the backend
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
    alert(`Статус замовлення ${orderId} змінено на "${getStatusText(newStatus)}"`)
  }

  const filteredOrders = supplierOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.dropshipper.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const ordersByStatus = {
    pending: filteredOrders.filter((o) => o.status === "pending"),
    accepted: filteredOrders.filter((o) => o.status === "accepted"),
    shipped: filteredOrders.filter((o) => o.status === "shipped"),
    rejected: filteredOrders.filter((o) => o.status === "rejected"),
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Замовлення від дропшипперів</h1>
        <p className="text-gray-400">Керуйте замовленнями на ваші продукти</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Нові замовлення</p>
                <p className="text-2xl font-bold text-white">{ordersByStatus.pending.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Прийняті</p>
                <p className="text-2xl font-bold text-white">{ordersByStatus.accepted.length}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Відправлені</p>
                <p className="text-2xl font-bold text-white">{ordersByStatus.shipped.length}</p>
              </div>
              <Truck className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Відхилені</p>
                <p className="text-2xl font-bold text-white">{ordersByStatus.rejected.length}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="space-gradient border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Пошук за ID, клієнтом або дропшиппером..."
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
                <SelectItem value="accepted">Прийнято</SelectItem>
                <SelectItem value="shipped">Відправлено</SelectItem>
                <SelectItem value="rejected">Відхилено</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="all" className="data-[state=active]:bg-slate-700">
            Всі ({filteredOrders.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="data-[state=active]:bg-slate-700">
            Нові ({ordersByStatus.pending.length})
          </TabsTrigger>
          <TabsTrigger value="accepted" className="data-[state=active]:bg-slate-700">
            Прийняті ({ordersByStatus.accepted.length})
          </TabsTrigger>
          <TabsTrigger value="shipped" className="data-[state=active]:bg-slate-700">
            Відправлені ({ordersByStatus.shipped.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <OrdersList orders={filteredOrders} onStatusUpdate={handleStatusUpdate} onViewDetails={setSelectedOrder} />
        </TabsContent>
        <TabsContent value="pending">
          <OrdersList
            orders={ordersByStatus.pending}
            onStatusUpdate={handleStatusUpdate}
            onViewDetails={setSelectedOrder}
          />
        </TabsContent>
        <TabsContent value="accepted">
          <OrdersList
            orders={ordersByStatus.accepted}
            onStatusUpdate={handleStatusUpdate}
            onViewDetails={setSelectedOrder}
          />
        </TabsContent>
        <TabsContent value="shipped">
          <OrdersList
            orders={ordersByStatus.shipped}
            onStatusUpdate={handleStatusUpdate}
            onViewDetails={setSelectedOrder}
          />
        </TabsContent>
      </Tabs>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </div>
  )
}

// Orders List Component
function OrdersList({
  orders,
  onStatusUpdate,
  onViewDetails,
}: {
  orders: any[]
  onStatusUpdate: (orderId: string, status: string) => void
  onViewDetails: (order: any) => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "accepted":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "shipped":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Очікує"
      case "accepted":
        return "Прийнято"
      case "rejected":
        return "Відхилено"
      case "shipped":
        return "Відправлено"
      default:
        return status
    }
  }

  if (orders.length === 0) {
    return (
      <Card className="space-gradient border-slate-700">
        <CardContent className="p-12 text-center">
          <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Немає замовлень</h3>
          <p className="text-gray-400">Замовлення з'являться тут, коли дропшиппери оформлять їх на ваші продукти</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-6">
      {orders.map((order) => (
        <Card key={order.id} className="space-gradient border-slate-700 hover:border-slate-600 transition-colors">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Order Info */}
              <div className="flex items-start space-x-4">
                <img
                  src={order.product.image || "/placeholder.svg"}
                  alt={order.product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-white font-medium">{order.id}</h3>
                    <Badge variant="secondary" className={getStatusColor(order.status)}>
                      {getStatusText(order.status)}
                    </Badge>
                  </div>
                  <p className="text-gray-300 font-medium">{order.product.name}</p>
                  <p className="text-sm text-gray-400">Кількість: {order.quantity}</p>
                  <p className="text-sm text-green-400 font-medium">${order.totalAmount}</p>
                </div>
              </div>

              {/* Customer & Dropshipper Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:max-w-md">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Дропшиппер:</p>
                  <p className="text-white text-sm font-medium">{order.dropshipper.name}</p>
                  <p className="text-gray-400 text-xs">{order.dropshipper.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Клієнт:</p>
                  <p className="text-white text-sm font-medium">{order.customer.name}</p>
                  <p className="text-gray-400 text-xs">{order.shipping.city}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2">
                <Button size="sm" variant="outline" onClick={() => onViewDetails(order)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Деталі
                </Button>
                {order.status === "pending" && (
                  <>
                    <Button size="sm" className="cosmic-glow" onClick={() => onStatusUpdate(order.id, "accepted")}>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Прийняти
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                      onClick={() => onStatusUpdate(order.id, "rejected")}
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Відхилити
                    </Button>
                  </>
                )}
                {order.status === "accepted" && (
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => onStatusUpdate(order.id, "shipped")}
                  >
                    <Truck className="w-4 h-4 mr-2" />
                    Відправити
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Order Details Dialog Component
function OrderDetailsDialog({
  order,
  isOpen,
  onClose,
  onStatusUpdate,
}: {
  order: any
  isOpen: boolean
  onClose: () => void
  onStatusUpdate: (orderId: string, status: string) => void
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "accepted":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "rejected":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "shipped":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Очікує"
      case "accepted":
        return "Прийнято"
      case "rejected":
        return "Відхилено"
      case "shipped":
        return "Відправлено"
      default:
        return status
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center justify-between">
            Деталі замовлення {order.id}
            <Badge variant="secondary" className={getStatusColor(order.status)}>
              {getStatusText(order.status)}
            </Badge>
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Створено: {new Date(order.createdAt).toLocaleDateString("uk-UA")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Info */}
          <div className="space-y-3">
            <h3 className="text-white font-medium flex items-center">
              <Package className="w-4 h-4 mr-2 text-blue-400" />
              Продукт
            </h3>
            <div className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg">
              <img
                src={order.product.image || "/placeholder.svg"}
                alt={order.product.name}
                className="w-16 h-16 rounded-lg"
              />
              <div>
                <p className="text-white font-medium">{order.product.name}</p>
                <p className="text-gray-400 text-sm">SKU: {order.product.sku}</p>
                <p className="text-gray-400 text-sm">Кількість: {order.quantity}</p>
                <p className="text-green-400 font-medium">${order.totalAmount}</p>
              </div>
            </div>
          </div>

          {/* Dropshipper Info */}
          <div className="space-y-3">
            <h3 className="text-white font-medium flex items-center">
              <User className="w-4 h-4 mr-2 text-purple-400" />
              Дропшиппер
            </h3>
            <div className="p-4 bg-slate-800/30 rounded-lg">
              <p className="text-white font-medium">{order.dropshipper.name}</p>
              <p className="text-gray-400 text-sm">{order.dropshipper.email}</p>
              <p className="text-gray-400 text-sm flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                {order.dropshipper.phone}
              </p>
            </div>
          </div>

          {/* Customer & Shipping Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-white font-medium flex items-center">
                <User className="w-4 h-4 mr-2 text-green-400" />
                Клієнт
              </h3>
              <div className="p-4 bg-slate-800/30 rounded-lg">
                <p className="text-white font-medium">{order.customer.name}</p>
                <p className="text-gray-400 text-sm flex items-center">
                  <Phone className="w-3 h-3 mr-1" />
                  {order.customer.phone}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-white font-medium flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-yellow-400" />
                Доставка
              </h3>
              <div className="p-4 bg-slate-800/30 rounded-lg">
                <p className="text-white font-medium">{order.shipping.city}</p>
                <p className="text-gray-400 text-sm">{order.shipping.address}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="space-y-3">
              <h3 className="text-white font-medium">Примітки</h3>
              <div className="p-4 bg-slate-800/30 rounded-lg">
                <p className="text-gray-300">{order.notes}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-700">
            {order.status === "pending" && (
              <>
                <Button
                  className="cosmic-glow"
                  onClick={() => {
                    onStatusUpdate(order.id, "accepted")
                    onClose()
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Прийняти замовлення
                </Button>
                <Button
                  variant="outline"
                  className="border-red-500 text-red-400 hover:bg-red-500/10 bg-transparent"
                  onClick={() => {
                    onStatusUpdate(order.id, "rejected")
                    onClose()
                  }}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Відхилити
                </Button>
              </>
            )}
            {order.status === "accepted" && (
              <Button
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => {
                  onStatusUpdate(order.id, "shipped")
                  onClose()
                }}
              >
                <Truck className="w-4 h-4 mr-2" />
                Позначити як відправлено
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
