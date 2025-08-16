"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import { Package, Plus, Search, Edit, Trash2, Eye, TrendingUp, DollarSign, Star } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface Product {
  id: string
  name: string
  sku: string
  price: number
  cost: number
  stock: number
  category: string
  status: "active" | "inactive" | "out_of_stock"
  image: string
  sales: number
  profit: number
  rating: number
  createdAt: string
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Бездротові навушники AirPods Pro",
    sku: "APP-001",
    price: 8999,
    cost: 6500,
    stock: 25,
    category: "Електроніка",
    status: "active",
    image: "/placeholder.svg?height=80&width=80&text=AirPods",
    sales: 156,
    profit: 2499 * 156,
    rating: 4.8,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Смартфон iPhone 15 Pro Max",
    sku: "IP15-PM",
    price: 45999,
    cost: 38000,
    stock: 12,
    category: "Електроніка",
    status: "active",
    image: "/placeholder.svg?height=80&width=80&text=iPhone",
    sales: 89,
    profit: 7999 * 89,
    rating: 4.9,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    name: "Ноутбук MacBook Air M2",
    sku: "MBA-M2",
    price: 52999,
    cost: 45000,
    stock: 8,
    category: "Комп'ютери",
    status: "active",
    image: "/placeholder.svg?height=80&width=80&text=MacBook",
    sales: 67,
    profit: 7999 * 67,
    rating: 4.7,
    createdAt: "2024-01-08",
  },
  {
    id: "4",
    name: "Розумний годинник Apple Watch Series 9",
    sku: "AW-S9",
    price: 15999,
    cost: 12000,
    stock: 0,
    category: "Аксесуари",
    status: "out_of_stock",
    image: "/placeholder.svg?height=80&width=80&text=Watch",
    sales: 234,
    profit: 3999 * 234,
    rating: 4.6,
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    name: "Планшет iPad Pro 12.9",
    sku: "IPP-129",
    price: 38999,
    cost: 32000,
    stock: 15,
    category: "Планшети",
    status: "active",
    image: "/placeholder.svg?height=80&width=80&text=iPad",
    sales: 123,
    profit: 6999 * 123,
    rating: 4.8,
    createdAt: "2024-01-03",
  },
  {
    id: "6",
    name: "Камера Canon EOS R5",
    sku: "CAN-R5",
    price: 125999,
    cost: 105000,
    stock: 3,
    category: "Фототехніка",
    status: "inactive",
    image: "/placeholder.svg?height=80&width=80&text=Canon",
    sales: 45,
    profit: 20999 * 45,
    rating: 4.9,
    createdAt: "2024-01-01",
  },
]

export default function MyProductsPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(false)

  // Filter products based on search and filters
  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
      const matchesStatus = statusFilter === "all" || product.status === statusFilter

      return matchesSearch && matchesCategory && matchesStatus
    })

    setFilteredProducts(filtered)
  }, [products, searchTerm, categoryFilter, statusFilter])

  // Calculate stats
  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.status === "active").length
  const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0)
  const totalProfit = products.reduce((sum, product) => sum + product.profit, 0)

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Активний</Badge>
      case "inactive":
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Неактивний</Badge>
      case "out_of_stock":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Немає в наявності</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const categories = [...new Set(products.map((p) => p.category))]

  if (!user) return null

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Мої товари</h1>
        <p className="text-sm sm:text-base text-gray-400">Керуйте вашим асортиментом товарів</p>
      </div>

      {/* Stats Cards - Mobile Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Всього товарів</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{totalProducts}</p>
              </div>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Активні</p>
                <p className="text-lg sm:text-2xl font-bold text-white">{activeProducts}</p>
              </div>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700 col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Вартість складу</p>
                <p className="text-lg sm:text-2xl font-bold text-white">₴{totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700 col-span-2 lg:col-span-1">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Загальний прибуток</p>
                <p className="text-lg sm:text-2xl font-bold text-white">₴{totalProfit.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
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
                placeholder="Пошук товарів..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white min-h-[44px]"
              />
            </div>

            {/* Filters - Stack on mobile */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-600 text-white min-h-[44px]">
                  <SelectValue placeholder="Категорія" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="all">Всі категорії</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px] bg-slate-800 border-slate-600 text-white min-h-[44px]">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="all">Всі статуси</SelectItem>
                  <SelectItem value="active">Активні</SelectItem>
                  <SelectItem value="inactive">Неактивні</SelectItem>
                  <SelectItem value="out_of_stock">Немає в наявності</SelectItem>
                </SelectContent>
              </Select>

              <Button className="cosmic-glow min-h-[44px] w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                <span className="sm:inline">Додати товар</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid - Mobile Responsive */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="space-gradient border-slate-700 hover:border-slate-600 transition-colors">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start gap-4">
                {/* Product Image */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-white text-sm sm:text-base truncate">{product.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-400">SKU: {product.sku}</p>
                    </div>
                    {getStatusBadge(product.status)}
                  </div>

                  {/* Price and Stock */}
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Ціна:</span>
                      <span className="text-white font-semibold">₴{product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Залишок:</span>
                      <span
                        className={`font-semibold ${product.stock > 10 ? "text-green-400" : product.stock > 0 ? "text-yellow-400" : "text-red-400"}`}
                      >
                        {product.stock} шт
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">Продажі:</span>
                      <span className="text-white">{product.sales}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-white">{product.rating}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 min-h-[36px] text-xs sm:text-sm bg-transparent"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Переглянути
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 min-h-[36px] text-xs sm:text-sm bg-transparent"
                    >
                      <Edit className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Редагувати
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="outline" className="min-w-[36px] min-h-[36px] p-0 bg-transparent">
                          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-slate-900 border-slate-700">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white">Видалити товар?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-400">
                            Ця дія незворотна. Товар буде видалено назавжди.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="bg-slate-800 border-slate-600 text-white">
                            Скасувати
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Видалити
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-8 sm:p-12 text-center">
            <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Товари не знайдено</h3>
            <p className="text-sm sm:text-base text-gray-400 mb-6">Спробуйте змінити фільтри або додайте новий товар</p>
            <Button className="cosmic-glow min-h-[44px]">
              <Plus className="w-4 h-4 mr-2" />
              Додати перший товар
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
