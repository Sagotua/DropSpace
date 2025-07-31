"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingCart,
  Package,
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  DollarSign,
  XCircle,
} from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useRole } from "@/contexts/role-context"

interface BaseOrder {
  id: string
  product: string
  amount: string
  status: string
  time: string
}

interface DropshipperOrder extends BaseOrder {
  customer: string
}

interface SupplierOrder extends BaseOrder {
  dropshipper: string
}

// Mock data for dropshipper
const dropshipperStats = [
  {
    title: "Створені замовлення",
    value: "47",
    change: "+5",
    changeType: "increase" as const,
    icon: ShoppingCart,
    color: "text-blue-400",
    description: "Всього створено",
  },
  {
    title: "Прийняті замовлення",
    value: "38",
    change: "+3",
    changeType: "increase" as const,
    icon: CheckCircle,
    color: "text-green-400",
    description: "Підтверджено постачальниками",
  },
  {
    title: "Відхилені замовлення",
    value: "4",
    change: "-1",
    changeType: "decrease" as const,
    icon: XCircle,
    color: "text-red-400",
    description: "Не підтверджено",
  },
  {
    title: "Очікують обробки",
    value: "5",
    change: "+1",
    changeType: "increase" as const,
    icon: Clock,
    color: "text-yellow-400",
    description: "На розгляді",
  },
  {
    title: "Загальний прибуток",
    value: "₴18,450",
    change: "+12%",
    changeType: "increase" as const,
    icon: DollarSign,
    color: "text-purple-400",
    description: "Маржа цього місяця",
  },
]

// Mock data for supplier
const supplierStats = [
  {
    title: "Отримані замовлення",
    value: "89",
    change: "+8",
    changeType: "increase" as const,
    icon: Package,
    color: "text-blue-400",
    description: "Всього отримано",
  },
  {
    title: "Виконані замовлення",
    value: "67",
    change: "+6",
    changeType: "increase" as const,
    icon: CheckCircle,
    color: "text-green-400",
    description: "Успішно завершено",
  },
  {
    title: "В обробці",
    value: "15",
    change: "+2",
    changeType: "increase" as const,
    icon: Clock,
    color: "text-yellow-400",
    description: "Поточні замовлення",
  },
  {
    title: "Мої продукти",
    value: "456",
    change: "+12",
    changeType: "increase" as const,
    icon: Package,
    color: "text-purple-400",
    description: "Активних позицій",
  },
  {
    title: "Обсяг замовлень",
    value: "₴67,890",
    change: "+18%",
    changeType: "increase" as const,
    icon: DollarSign,
    color: "text-green-400",
    description: "Дохід цього місяця",
  },
]

// Mock recent orders for dropshipper
const dropshipperOrders: DropshipperOrder[] = [
  {
    id: "#1001",
    customer: "Марія Іваненко",
    product: "iPhone 15 Pro",
    amount: "$999",
    status: "pending",
    time: "2 хв тому",
  },
  {
    id: "#1002",
    customer: "Петро Коваленко",
    product: "Samsung Galaxy S24",
    amount: "$849",
    status: "completed",
    time: "15 хв тому",
  },
  {
    id: "#1003",
    customer: "Анна Шевченко",
    product: "MacBook Air M3",
    amount: "$1,299",
    status: "processing",
    time: "1 год тому",
  },
]

// Mock orders for supplier
const supplierOrders: SupplierOrder[] = [
  {
    id: "#S001",
    dropshipper: "Олександр Петренко",
    product: "iPhone 15 Pro",
    amount: "$999",
    status: "pending",
    time: "5 хв тому",
  },
  {
    id: "#S002",
    dropshipper: "Анна Коваленко",
    product: "Samsung Galaxy S24",
    amount: "$849",
    status: "accepted",
    time: "20 хв тому",
  },
  {
    id: "#S003",
    dropshipper: "Дмитро Мельник",
    product: "MacBook Air M3",
    amount: "$1,299",
    status: "shipped",
    time: "2 год тому",
  },
]

// Mock most sold products for dropshipper
const dropshipperTopProducts = [
  {
    name: "iPhone 15 Pro",
    sales: 45,
    revenue: "₴44,955",
    margin: "₴9,000",
    trend: "up",
  },
  {
    name: "Samsung Galaxy S24",
    sales: 32,
    revenue: "₴27,168",
    margin: "₴4,800",
    trend: "up",
  },
  {
    name: "MacBook Air M3",
    sales: 18,
    revenue: "₴23,382",
    margin: "₴3,600",
    trend: "down",
  },
  {
    name: "AirPods Pro 2",
    sales: 24,
    revenue: "₴5,976",
    margin: "₴1,200",
    trend: "up",
  },
]

// Mock recently active dropshippers for supplier
const supplierActiveDropshippers = [
  {
    name: "Олександр Петренко",
    orders: 12,
    totalValue: "₴11,988",
    lastOrder: "2 години тому",
    status: "active",
  },
  {
    name: "Марія Коваленко",
    orders: 8,
    totalValue: "₴6,792",
    lastOrder: "5 годин тому",
    status: "active",
  },
  {
    name: "Дмитро Мельник",
    orders: 15,
    totalValue: "₴19,485",
    lastOrder: "1 день тому",
    status: "recent",
  },
  {
    name: "Анна Шевченко",
    orders: 6,
    totalValue: "₴7,794",
    lastOrder: "2 дні тому",
    status: "recent",
  },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const { currentRole } = useRole()

  if (!user) return null

  const currentStats = currentRole === "dropshipper" ? dropshipperStats : supplierStats
  const currentOrders = currentRole === "dropshipper" ? dropshipperOrders : supplierOrders
  const currentTopProducts = currentRole === "dropshipper" ? dropshipperTopProducts : supplierActiveDropshippers

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30"
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30"
      case "accepted":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30 hover:bg-blue-500/30"
      case "shipped":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30 hover:bg-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Виконано"
      case "pending":
        return "Очікує"
      case "processing":
        return "Обробляється"
      case "accepted":
        return "Прийнято"
      case "shipped":
        return "Відправлено"
      default:
        return status
    }
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Панель {currentRole === "dropshipper" ? "дропшиппера" : "постачальника"}
        </h1>
        <p className="text-gray-400">
          {currentRole === "dropshipper"
            ? "Керуйте вашими замовленнями та імпортуйте продукти від постачальників"
            : "Додавайте продукти та обробляйте замовлення від дропшипперів"}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {currentStats.map((stat, index) => (
          <Card key={index} className="space-gradient border-slate-700 hover:border-slate-600 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {stat.changeType === "increase" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-400" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-400" />
                  )}
                  <span className={`text-sm ${stat.changeType === "increase" ? "text-green-400" : "text-red-400"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-400">{stat.title}</p>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 space-gradient border-slate-700">
          <CardHeader>
            <div>
              <CardTitle className="text-white">
                {currentRole === "dropshipper" ? "Останні замовлення" : "Нові замовлення"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {currentRole === "dropshipper"
                  ? "Ваші останні замовлення та їх статус"
                  : "Замовлення від дропшипперів, що потребують обробки"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {currentRole === "dropshipper"
                          ? (order as DropshipperOrder).customer
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")
                          : (order as SupplierOrder).dropshipper
                              .split(" ")
                              .map((n: string) => n[0])
                              .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">{order.id}</p>
                      <p className="text-sm text-gray-400">
                        {currentRole === "dropshipper"
                          ? (order as DropshipperOrder).customer
                          : (order as SupplierOrder).dropshipper}
                      </p>
                      <p className="text-sm text-gray-500">{order.product}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-white font-medium">{order.amount}</p>
                    <Badge variant="secondary" className={`text-xs ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </Badge>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Top Products */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Швидкі дії</CardTitle>
              <CardDescription className="text-gray-400">Найчастіші операції</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentRole === "dropshipper" ? (
                <>
                  <Link href="/dashboard/create-order">
                    <Button className="w-full justify-start cosmic-glow">
                      <Plus className="w-4 h-4 mr-2" />
                      Створити замовлення
                    </Button>
                  </Link>
                  <Link href="/dashboard/imported-products">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Package className="w-4 h-4 mr-2" />
                      Імпортувати продукти
                    </Button>
                  </Link>
                  <Link href="/dashboard/export">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Експорт на Prom.ua
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/dashboard/add-product">
                    <Button className="w-full justify-start cosmic-glow">
                      <Plus className="w-4 h-4 mr-2" />
                      Додати продукт
                    </Button>
                  </Link>
                  <Link href="/dashboard/supplier-orders">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Обробити замовлення
                    </Button>
                  </Link>
                  <Link href="/dashboard/analytics">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Переглянути аналітику
                    </Button>
                  </Link>
                </>
              )}
            </CardContent>
          </Card>

          {/* Top Products / Active Dropshippers */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">
                {currentRole === "dropshipper" ? "Найпродаваніші продукти" : "Активні дропшиппери"}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {currentRole === "dropshipper"
                  ? "Ваші найуспішніші продукти цього місяця"
                  : "Дропшиппери з найбільшою активністю"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentRole === "dropshipper"
                  ? dropshipperTopProducts.map((product, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">#{index + 1}</span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{product.name}</p>
                            <p className="text-sm text-gray-400">{product.sales} продажів</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{product.revenue}</p>
                          <p className="text-sm text-green-400">Маржа: {product.margin}</p>
                          <div className="flex items-center justify-end space-x-1 mt-1">
                            {product.trend === "up" ? (
                              <ArrowUpRight className="w-3 h-3 text-green-400" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 text-red-400" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  : supplierActiveDropshippers.map((dropshipper, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {dropshipper.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{dropshipper.name}</p>
                            <p className="text-sm text-gray-400">{dropshipper.orders} замовлень</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{dropshipper.totalValue}</p>
                          <p className="text-sm text-gray-400">{dropshipper.lastOrder}</p>
                          <Badge
                            variant="secondary"
                            className={`text-xs mt-1 ${
                              dropshipper.status === "active"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                            }`}
                          >
                            {dropshipper.status === "active" ? "Активний" : "Недавно"}
                          </Badge>
                        </div>
                      </div>
                    ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Activity Timeline */}
      <Card className="space-gradient border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Остання активність</CardTitle>
          <CardDescription className="text-gray-400">Ваші останні дії в системі</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                action:
                  currentRole === "dropshipper"
                    ? "Імпортовано 15 продуктів від постачальника TechSupply"
                    : "Нове замовлення #1001 від дропшиппера ShopMaster",
                time: "2 години тому",
                icon: Package,
                color: "text-blue-400",
              },
              {
                action:
                  currentRole === "dropshipper"
                    ? "Створено замовлення #1002 на суму $849"
                    : "Оновлено статус замовлення #998 на 'Відправлено'",
                time: "4 години тому",
                icon: ShoppingCart,
                color: "text-green-400",
              },
              {
                action:
                  currentRole === "dropshipper"
                    ? "Експортовано 50 продуктів на Rozetka"
                    : "Додано новий продукт 'Wireless Headphones Pro'",
                time: "1 день тому",
                icon: TrendingUp,
                color: "text-purple-400",
              },
            ].map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30">
                <div className={`w-8 h-8 rounded-full bg-slate-800/50 flex items-center justify-center`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm">{activity.action}</p>
                  <p className="text-gray-400 text-xs flex items-center mt-1">
                    <Clock className="w-3 h-3 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
