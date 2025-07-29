"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import {
  ShoppingCart,
  Package,
  Users,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  Truck,
  Calendar,
  Target,
  Award,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRole } from "@/contexts/role-context"

// Mock data for dropshipper analytics
const dropshipperData = {
  totalOrders: 156,
  activeOrders: 23,
  completedOrders: 133,
  topSuppliers: [
    { name: "TechSupply", orders: 45, revenue: "$45,230" },
    { name: "MobileWorld", orders: 38, revenue: "$32,150" },
    { name: "AppleStore", orders: 29, revenue: "$38,970" },
    { name: "GadgetHub", orders: 24, revenue: "$18,450" },
    { name: "ElectroMax", orders: 20, revenue: "$22,100" },
  ],
  monthlyOrders: [
    { month: "Січ", orders: 12 },
    { month: "Лют", orders: 18 },
    { month: "Бер", orders: 15 },
    { month: "Кві", orders: 22 },
    { month: "Тра", orders: 28 },
    { month: "Чер", orders: 35 },
    { month: "Лип", orders: 31 },
    { month: "Сер", orders: 29 },
    { month: "Вер", orders: 33 },
    { month: "Жов", orders: 38 },
    { month: "Лис", orders: 42 },
    { month: "Гру", orders: 45 },
  ],
  orderStatus: [
    { name: "Виконано", value: 133, color: "#10b981" },
    { name: "Активні", value: 23, color: "#3b82f6" },
  ],
}

// Mock data for supplier analytics
const supplierData = {
  totalOrdersReceived: 89,
  ordersAccepted: 67,
  ordersRejected: 8,
  ordersShipped: 59,
  totalEarnings: 67890,
  topProducts: [
    { name: "iPhone 15 Pro", quantity: 45, revenue: "$44,955" },
    { name: "Samsung Galaxy S24", quantity: 32, revenue: "$27,168" },
    { name: "MacBook Air M3", quantity: 28, revenue: "$36,372" },
    { name: "AirPods Pro 2", quantity: 24, revenue: "$5,976" },
    { name: "iPad Air", quantity: 18, revenue: "$10,782" },
  ],
  weeklyRevenue: [
    { week: "Тиж 1", revenue: 8500 },
    { week: "Тиж 2", revenue: 12300 },
    { week: "Тиж 3", revenue: 9800 },
    { week: "Тиж 4", revenue: 15600 },
    { week: "Тиж 5", revenue: 11200 },
    { week: "Тиж 6", revenue: 13900 },
    { week: "Тиж 7", revenue: 16800 },
    { week: "Тиж 8", revenue: 14500 },
  ],
  orderStatusDistribution: [
    { name: "Прийнято", value: 67, color: "#10b981" },
    { name: "Відправлено", value: 59, color: "#3b82f6" },
    { name: "Відхилено", value: 8, color: "#ef4444" },
  ],
}

export default function AnalyticsPage() {
  const { user } = useAuth()
  const { currentRole } = useRole()

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          Аналітика {currentRole === "dropshipper" ? "дропшиппера" : "постачальника"}
        </h1>
        <p className="text-gray-400">
          {currentRole === "dropshipper"
            ? "Детальна статистика ваших замовлень та продажів"
            : "Аналітика ваших продуктів та замовлень від дропшипперів"}
        </p>
      </div>

      {/* Role-based content */}
      {currentRole === "dropshipper" ? <DropshipperAnalytics /> : <SupplierAnalytics />}
    </div>
  )
}

// Dropshipper Analytics Component
function DropshipperAnalytics() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Всього замовлень</p>
                <p className="text-2xl font-bold text-white">{dropshipperData.totalOrders}</p>
                <p className="text-xs text-green-400 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% цього місяця
                </p>
              </div>
              <ShoppingCart className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Активні замовлення</p>
                <p className="text-2xl font-bold text-white">{dropshipperData.activeOrders}</p>
                <p className="text-xs text-yellow-400 flex items-center mt-1">
                  <Clock className="w-3 h-3 mr-1" />В обробці
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Виконано</p>
                <p className="text-2xl font-bold text-white">{dropshipperData.completedOrders}</p>
                <p className="text-xs text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  85% успішність
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Постачальники</p>
                <p className="text-2xl font-bold text-white">{dropshipperData.topSuppliers.length}</p>
                <p className="text-xs text-purple-400 flex items-center mt-1">
                  <Users className="w-3 h-3 mr-1" />
                  Активних партнерів
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Monthly Orders Chart */}
        <Card className="space-gradient border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-blue-400" />
              Замовлення по місяцях
            </CardTitle>
            <CardDescription className="text-gray-400">Динаміка замовлень протягом року</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dropshipperData.monthlyOrders}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card className="space-gradient border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-green-400" />
              Розподіл замовлень
            </CardTitle>
            <CardDescription className="text-gray-400">Статус ваших замовлень</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dropshipperData.orderStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dropshipperData.orderStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {dropshipperData.orderStatus.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-300">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Suppliers */}
      <Card className="space-gradient border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-400" />
            Топ-5 постачальників
          </CardTitle>
          <CardDescription className="text-gray-400">Ваші найактивніші партнери за кількістю замовлень</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {dropshipperData.topSuppliers.map((supplier, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{supplier.name}</p>
                    <p className="text-sm text-gray-400">{supplier.orders} замовлень</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{supplier.revenue}</p>
                  <p className="text-sm text-green-400">Дохід</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Supplier Analytics Component
function SupplierAnalytics() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Отримано замовлень</p>
                <p className="text-2xl font-bold text-white">{supplierData.totalOrdersReceived}</p>
                <p className="text-xs text-blue-400 flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +8% цього тижня
                </p>
              </div>
              <Package className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Прийнято</p>
                <p className="text-2xl font-bold text-white">{supplierData.ordersAccepted}</p>
                <p className="text-xs text-green-400 flex items-center mt-1">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  75% коефіцієнт
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Відправлено</p>
                <p className="text-2xl font-bold text-white">{supplierData.ordersShipped}</p>
                <p className="text-xs text-purple-400 flex items-center mt-1">
                  <Truck className="w-3 h-3 mr-1" />
                  88% виконання
                </p>
              </div>
              <Truck className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Загальний дохід</p>
                <p className="text-2xl font-bold text-white">${supplierData.totalEarnings.toLocaleString()}</p>
                <p className="text-xs text-yellow-400 flex items-center mt-1">
                  <DollarSign className="w-3 h-3 mr-1" />
                  Цього місяця
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Weekly Revenue Chart */}
        <Card className="space-gradient border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Тижневий дохід
            </CardTitle>
            <CardDescription className="text-gray-400">Динаміка доходів за останні 8 тижнів</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={supplierData.weeklyRevenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="week" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => [`$${value}`, "Дохід"]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Order Status Distribution */}
        <Card className="space-gradient border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-400" />
              Статус замовлень
            </CardTitle>
            <CardDescription className="text-gray-400">Розподіл замовлень за статусом</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={supplierData.orderStatusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {supplierData.orderStatusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-4 mt-4">
              {supplierData.orderStatusDistribution.map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-sm text-gray-300">
                    {item.name}: {item.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card className="space-gradient border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-400" />
            Топ-5 продуктів
          </CardTitle>
          <CardDescription className="text-gray-400">Найпопулярніші продукти за кількістю продажів</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {supplierData.topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{product.name}</p>
                    <p className="text-sm text-gray-400">{product.quantity} продано</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{product.revenue}</p>
                  <p className="text-sm text-green-400">Дохід</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
