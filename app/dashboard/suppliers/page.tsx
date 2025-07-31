"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast"
import { useRole } from "@/contexts/role-context"
import {
  Search,
  Download,
  Trash2,
  RefreshCw,
  Users,
  Package,
  Calendar,
  Loader2,
  ArrowUpRight,
  Star,
  Building2,
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface Supplier {
  id: string
  name: string
  email: string
  phone: string
  company: string
  productsAvailable: number
  importedProducts: number
  lastSync: string
  status: "active" | "inactive" | "pending"
  rating: number
  joinedDate: string
}

// Mock data for suppliers
const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "Олександр Петренко",
    email: "alex@techsupply.ua",
    phone: "+380501234567",
    company: "TechSupply Ukraine",
    productsAvailable: 1250,
    importedProducts: 450,
    lastSync: "2024-01-15T10:30:00Z",
    status: "active",
    rating: 4.8,
    joinedDate: "2023-08-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Марія Коваленко",
    email: "maria@fashionhub.ua",
    phone: "+380671234567",
    company: "Fashion Hub",
    productsAvailable: 890,
    importedProducts: 230,
    lastSync: "2024-01-14T15:45:00Z",
    status: "active",
    rating: 4.6,
    joinedDate: "2023-09-20T00:00:00Z",
  },
  {
    id: "3",
    name: "Дмитро Іваненко",
    email: "dmitry@homegoods.ua",
    phone: "+380931234567",
    company: "Home & Garden Co",
    productsAvailable: 2100,
    importedProducts: 0,
    lastSync: "2024-01-10T09:15:00Z",
    status: "active",
    rating: 4.9,
    joinedDate: "2023-07-10T00:00:00Z",
  },
  {
    id: "4",
    name: "Анна Сидоренко",
    email: "anna@beautyworld.ua",
    phone: "+380441234567",
    company: "Beauty World",
    productsAvailable: 650,
    importedProducts: 180,
    lastSync: "2024-01-12T14:20:00Z",
    status: "inactive",
    rating: 4.3,
    joinedDate: "2023-11-05T00:00:00Z",
  },
  {
    id: "5",
    name: "Віктор Мельник",
    email: "viktor@sportszone.ua",
    phone: "+380631234567",
    company: "Sports Zone",
    productsAvailable: 1800,
    importedProducts: 320,
    lastSync: "2024-01-13T11:10:00Z",
    status: "pending",
    rating: 4.7,
    joinedDate: "2024-01-01T00:00:00Z",
  },
]

export default function SuppliersPage() {
  const { currentRole } = useRole()
  const { toast } = useToast()
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers)
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)
  const [importingSuppliers, setImportingSuppliers] = useState<Set<string>>(new Set())
  const [deletingSuppliers, setDeletingSuppliers] = useState<Set<string>>(new Set())

  // Redirect if not dropshipper
  useEffect(() => {
    if (currentRole !== "dropshipper") {
      window.location.href = "/dashboard"
    }
  }, [currentRole])

  // Filter suppliers based on search term
  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: Supplier["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusText = (status: Supplier["status"]) => {
    switch (status) {
      case "active":
        return "Активний"
      case "inactive":
        return "Неактивний"
      case "pending":
        return "Очікує"
      default:
        return status
    }
  }

  const handleImportProducts = async (supplier: Supplier) => {
    setImportingSuppliers((prev) => new Set(prev).add(supplier.id))

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Update supplier data
      setSuppliers((prev) =>
        prev.map((s) =>
          s.id === supplier.id
            ? {
                ...s,
                importedProducts: s.productsAvailable,
                lastSync: new Date().toISOString(),
              }
            : s,
        ),
      )

      toast({
        title: "Продукти імпортовано",
        description: `Успішно імпортовано ${supplier.productsAvailable} продуктів від ${supplier.name}`,
      })
    } catch (error) {
      toast({
        title: "Помилка імпорту",
        description: "Не вдалося імпортувати продукти. Спробуйте ще раз.",
        variant: "destructive",
      })
    } finally {
      setImportingSuppliers((prev) => {
        const newSet = new Set(prev)
        newSet.delete(supplier.id)
        return newSet
      })
    }
  }

  const handleDeleteProducts = async (supplier: Supplier) => {
    setDeletingSuppliers((prev) => new Set(prev).add(supplier.id))

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update supplier data
      setSuppliers((prev) =>
        prev.map((s) =>
          s.id === supplier.id
            ? {
                ...s,
                importedProducts: 0,
                lastSync: new Date().toISOString(),
              }
            : s,
        ),
      )

      toast({
        title: "Продукти видалено",
        description: `Видалено всі імпортовані продукти від ${supplier.name}`,
      })
    } catch (error) {
      toast({
        title: "Помилка видалення",
        description: "Не вдалося видалити продукти. Спробуйте ще раз.",
        variant: "destructive",
      })
    } finally {
      setDeletingSuppliers((prev) => {
        const newSet = new Set(prev)
        newSet.delete(supplier.id)
        return newSet
      })
    }
  }

  const handleRefreshData = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Update last sync for all suppliers
      setSuppliers((prev) =>
        prev.map((supplier) => ({
          ...supplier,
          lastSync: new Date().toISOString(),
        })),
      )

      toast({
        title: "Дані оновлено",
        description: "Інформація про постачальників успішно оновлена",
      })
    } catch (error) {
      toast({
        title: "Помилка оновлення",
        description: "Не вдалося оновити дані. Спробуйте ще раз.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const totalSuppliers = suppliers.length
  const activeSuppliers = suppliers.filter((s) => s.status === "active").length
  const totalAvailableProducts = suppliers.reduce((sum, s) => sum + s.productsAvailable, 0)
  const totalImportedProducts = suppliers.reduce((sum, s) => sum + s.importedProducts, 0)

  if (currentRole !== "dropshipper") {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section - Matching main dashboard */}
      <div>
        <h1 className="text-3xl font-bold text-white">Постачальники</h1>
        <p className="text-gray-400">Керуйте відносинами з постачальниками та імпортом продуктів</p>
      </div>

      {/* Stats Grid - Matching main dashboard style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="space-gradient border-slate-700 hover:border-slate-600 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">+2</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Всього постачальників</p>
              <p className="text-2xl font-bold text-white">{totalSuppliers}</p>
              <p className="text-xs text-gray-500">{activeSuppliers} активних</p>
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700 hover:border-slate-600 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center">
                <Package className="w-6 h-6 text-purple-400" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">+15%</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Доступні продукти</p>
              <p className="text-2xl font-bold text-white">{totalAvailableProducts.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Від усіх постачальників</p>
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700 hover:border-slate-600 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center">
                <Download className="w-6 h-6 text-green-400" />
              </div>
              <div className="flex items-center space-x-1">
                <ArrowUpRight className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400">+8%</span>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Імпортовані продукти</p>
              <p className="text-2xl font-bold text-white">{totalImportedProducts.toLocaleString()}</p>
              <p className="text-xs text-gray-500">
                {totalAvailableProducts > 0 ? ((totalImportedProducts / totalAvailableProducts) * 100).toFixed(1) : 0}%
                від доступних
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700 hover:border-slate-600 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex items-center space-x-1">
                <RefreshCw className={cn("w-4 h-4 text-blue-400", loading && "animate-spin")} />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-400">Останнє оновлення</p>
              <p className="text-2xl font-bold text-white">
                {suppliers.length > 0
                  ? new Date(Math.max(...suppliers.map((s) => new Date(s.lastSync).getTime()))).toLocaleDateString(
                      "uk-UA",
                      {
                        month: "short",
                        day: "numeric",
                      },
                    )
                  : "—"}
              </p>
              <p className="text-xs text-gray-500">Найновіша синхронізація</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid - Matching dashboard layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Suppliers Table */}
        <Card className="lg:col-span-2 space-gradient border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-white">Список постачальників</CardTitle>
              <CardDescription className="text-gray-400">
                Керуйте імпортом продуктів від ваших постачальників
              </CardDescription>
            </div>
            <Button onClick={handleRefreshData} disabled={loading} size="sm" className="cosmic-glow">
              <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
              Оновити
            </Button>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Пошук за назвою, компанією або email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-slate-800/30 border-slate-700 text-white placeholder:text-gray-400"
                />
              </div>
            </div>

            {/* Suppliers Table */}
            <div className="space-y-4">
              {filteredSuppliers.length === 0 ? (
                <div className="text-center py-8">
                  <div className="flex flex-col items-center space-y-2">
                    <Users className="h-8 w-8 text-gray-400" />
                    <p className="text-gray-400">
                      {searchTerm ? "Постачальників не знайдено" : "Немає постачальників"}
                    </p>
                  </div>
                </div>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <div
                    key={supplier.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-slate-800/30 hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">
                          {supplier.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="text-white font-medium">{supplier.name}</p>
                          <Badge variant="secondary" className={`text-xs ${getStatusColor(supplier.status)}`}>
                            {getStatusText(supplier.status)}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <Building2 className="w-3 h-3" />
                            <span>{supplier.company}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-gray-400">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span>{supplier.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-xs text-gray-500">
                            Доступно: {supplier.productsAvailable.toLocaleString()} | Імпортовано:{" "}
                            {supplier.importedProducts.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        onClick={() => handleImportProducts(supplier)}
                        disabled={
                          supplier.status !== "active" ||
                          supplier.productsAvailable === 0 ||
                          importingSuppliers.has(supplier.id)
                        }
                        className="cosmic-glow"
                      >
                        {importingSuppliers.has(supplier.id) ? (
                          <Loader2 className="h-3 w-3 animate-spin mr-1" />
                        ) : (
                          <Download className="h-3 w-3 mr-1" />
                        )}
                        Імпорт
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={supplier.importedProducts === 0 || deletingSuppliers.has(supplier.id)}
                            className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-800/50"
                          >
                            {deletingSuppliers.has(supplier.id) ? (
                              <Loader2 className="h-3 w-3 animate-spin mr-1" />
                            ) : (
                              <Trash2 className="h-3 w-3 mr-1" />
                            )}
                            Видалити
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-slate-900 border-slate-700">
                          <AlertDialogHeader>
                            <AlertDialogTitle className="text-white">Видалити імпортовані продукти?</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400">
                              Ця дія видалить всі {supplier.importedProducts.toLocaleString()} імпортованих продуктів
                              від <strong className="text-white">{supplier.name}</strong>. Цю дію неможливо скасувати.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="bg-transparent border-slate-600 text-gray-300 hover:bg-slate-800/50">
                              Скасувати
                            </AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteProducts(supplier)}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Видалити продукти
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions & Top Suppliers */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Швидкі дії</CardTitle>
              <CardDescription className="text-gray-400">Найчастіші операції з постачальниками</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/dashboard/imported-products">
                <Button className="w-full justify-start cosmic-glow">
                  <Package className="w-4 h-4 mr-2" />
                  Переглянути імпортовані продукти
                </Button>
              </Link>
              <Link href="/dashboard/export">
                <Button className="w-full justify-start bg-transparent" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Експорт на Prom.ua
                </Button>
              </Link>
              <Button
                className="w-full justify-start bg-transparent"
                variant="outline"
                onClick={handleRefreshData}
                disabled={loading}
              >
                <RefreshCw className={cn("w-4 h-4 mr-2", loading && "animate-spin")} />
                Синхронізувати всіх
              </Button>
            </CardContent>
          </Card>

          {/* Top Suppliers */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Топ постачальники</CardTitle>
              <CardDescription className="text-gray-400">
                Найактивніші постачальники за кількістю продуктів
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {suppliers
                  .sort((a, b) => b.productsAvailable - a.productsAvailable)
                  .slice(0, 4)
                  .map((supplier, index) => (
                    <div key={supplier.id} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="text-white font-medium">{supplier.name}</p>
                          <p className="text-sm text-gray-400">{supplier.company}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">{supplier.productsAvailable.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">продуктів</p>
                        <div className="flex items-center justify-end space-x-1 mt-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-xs text-gray-400">{supplier.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
