"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Search, ShoppingCart, Package, Star, Grid3X3, LayoutGrid } from "lucide-react"

// Mock imported products data
const importedProducts = [
  {
    id: "PRD001",
    name: "iPhone 15 Pro Max Ultra Premium Edition with Advanced Camera System",
    sku: "IPH15PRO-256",
    category: "Смартфони",
    dropPrice: 999,
    rrp: 1199,
    supplier: "TechSupply",
    supplierId: "SUP001",
    image: "/placeholder.svg?height=80&width=80&text=📱",
    inStock: 25,
    status: "active",
    rating: 4.8,
    sales: 156,
  },
  {
    id: "PRD002",
    name: "Samsung Galaxy S24 Ultra",
    sku: "SGS24-128",
    category: "Смартфони",
    dropPrice: 849,
    rrp: 999,
    supplier: "MobileWorld",
    supplierId: "SUP002",
    image: "/placeholder.svg?height=80&width=80&text=📱",
    inStock: 18,
    status: "active",
    rating: 4.7,
    sales: 89,
  },
  {
    id: "PRD003",
    name: "MacBook Air M3 13-inch",
    sku: "MBA-M3-256",
    category: "Ноутбуки",
    dropPrice: 1299,
    rrp: 1499,
    supplier: "AppleStore",
    supplierId: "SUP003",
    image: "/placeholder.svg?height=80&width=80&text=💻",
    inStock: 8,
    status: "low_stock",
    rating: 4.9,
    sales: 67,
  },
  {
    id: "PRD004",
    name: "AirPods Pro 2nd Generation",
    sku: "APP2-WHITE",
    category: "Аксесуари",
    dropPrice: 249,
    rrp: 299,
    supplier: "TechSupply",
    supplierId: "SUP001",
    image: "/placeholder.svg?height=80&width=80&text=🎧",
    inStock: 45,
    status: "active",
    rating: 4.6,
    sales: 234,
  },
  {
    id: "PRD005",
    name: "iPad Pro 12.9-inch M2",
    sku: "IPP-129-M2",
    category: "Планшети",
    dropPrice: 1099,
    rrp: 1299,
    supplier: "AppleStore",
    supplierId: "SUP003",
    image: "/placeholder.svg?height=80&width=80&text=📱",
    inStock: 12,
    status: "active",
    rating: 4.8,
    sales: 123,
  },
  {
    id: "PRD006",
    name: "Sony WH-1000XM5 Wireless Headphones",
    sku: "SONY-WH1000XM5",
    category: "Аксесуари",
    dropPrice: 349,
    rrp: 399,
    supplier: "AudioTech",
    supplierId: "SUP004",
    image: "/placeholder.svg?height=80&width=80&text=🎧",
    inStock: 0,
    status: "out_of_stock",
    rating: 4.7,
    sales: 78,
  },
  // Add more mock products for testing large catalogs
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `IMP-${i + 7}`,
    name: `Імпортований продукт ${i + 7}`,
    sku: `IMP-${String(i + 7).padStart(3, "0")}`,
    category: ["Смартфони", "Ноутбуки", "Аксесуари", "Планшети", "Фототехніка"][Math.floor(Math.random() * 5)],
    dropPrice: Math.floor(Math.random() * 2000) + 100,
    rrp: Math.floor(Math.random() * 2500) + 200,
    supplier: ["TechSupply", "MobileWorld", "AppleStore", "AudioTech"][Math.floor(Math.random() * 4)],
    supplierId: `SUP00${Math.floor(Math.random() * 4) + 1}`,
    image: `/placeholder.svg?height=80&width=80&text=P${i + 7}`,
    inStock: Math.floor(Math.random() * 100),
    status: ["active", "low_stock", "out_of_stock"][Math.floor(Math.random() * 3)] as
      | "active"
      | "low_stock"
      | "out_of_stock",
    rating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    sales: Math.floor(Math.random() * 500),
  })),
]

type DensityMode = "comfortable" | "compact"

export default function ImportedProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [densityMode, setDensityMode] = useState<DensityMode>("comfortable")

  // Load density preference from localStorage
  useEffect(() => {
    const savedDensity = localStorage.getItem("imported-product-density") as DensityMode
    if (savedDensity) {
      setDensityMode(savedDensity)
    }
  }, [])

  // Save density preference to localStorage
  const handleDensityChange = (newDensity: DensityMode) => {
    setDensityMode(newDensity)
    localStorage.setItem("imported-product-density", newDensity)
  }

  const filteredProducts = importedProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.supplier.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "low_stock":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "out_of_stock":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "В наявності"
      case "low_stock":
        return "Мало на складі"
      case "out_of_stock":
        return "Немає в наявності"
      default:
        return status
    }
  }

  // Compact Product Card Component
  const CompactImportedProductCard = ({ product }: { product: any }) => (
    <Card className="space-gradient border-slate-700 hover:border-slate-600 transition-all duration-200 hover:shadow-lg h-[140px] group">
      <CardContent className="p-3 h-full">
        <div className="flex gap-3 h-full">
          {/* Product Image */}
          <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0 flex flex-col justify-between">
            {/* Header Row */}
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0 flex-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <h3 className="font-medium text-white text-sm leading-tight truncate cursor-help">
                      {product.name}
                    </h3>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="bg-slate-800 border-slate-600 text-white max-w-xs">
                    <p>{product.name}</p>
                  </TooltipContent>
                </Tooltip>
                <p className="text-xs text-gray-400 truncate">{product.sku}</p>
              </div>
              <Badge variant="secondary" className={`text-xs px-2 py-0.5 ${getStatusColor(product.status)}`}>
                {getStatusText(product.status)}
              </Badge>
            </div>

            {/* Metrics Row */}
            <div className="flex items-center gap-3 text-xs mb-2">
              <span className="text-green-400 font-medium">${product.dropPrice}</span>
              <span className="text-gray-400">•</span>
              <span className="text-white">RRP: ${product.rrp}</span>
              <span className="text-gray-400">•</span>
              <span className="text-blue-400 font-medium">
                ${product.rrp - product.dropPrice} (
                {Math.round(((product.rrp - product.dropPrice) / product.rrp) * 100)}%)
              </span>
            </div>

            {/* Supplier and Stock Row */}
            <div className="flex items-center gap-3 text-xs mb-2">
              <span className="text-gray-300 truncate">{product.supplier}</span>
              <span className="text-gray-400">•</span>
              <span
                className={`font-medium ${product.inStock > 10 ? "text-green-400" : product.inStock > 0 ? "text-yellow-400" : "text-red-400"}`}
              >
                {product.inStock} шт
              </span>
            </div>

            {/* Rating and Action Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-xs text-white">{product.rating}</span>
              </div>

              {/* Order Action */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/dashboard/create-order?product=${product.id}`}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="sm"
                        className="h-7 px-2 text-xs cosmic-glow"
                        disabled={product.status === "out_of_stock"}
                        aria-label="Замовити продукт"
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Замовити
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Замовити продукт</p>
                    </TooltipContent>
                  </Tooltip>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Comfortable Product Card Component (existing design)
  const ComfortableImportedProductCard = ({ product }: { product: any }) => (
    <Card className="space-gradient border-slate-700 hover:border-slate-600 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="text-white font-medium">{product.name}</h3>
              <p className="text-sm text-gray-400">{product.sku}</p>
            </div>
          </div>
          <Badge variant="secondary" className={`text-xs ${getStatusColor(product.status)}`}>
            {getStatusText(product.status)}
          </Badge>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Категорія:</span>
            <span className="text-white text-sm">{product.category}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">RRP:</span>
            <span className="text-white text-sm">${product.rrp}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Ваша ціна:</span>
            <span className="text-green-400 text-sm font-medium">${product.dropPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Маржа:</span>
            <span className="text-blue-400 text-sm font-medium">
              ${product.rrp - product.dropPrice} ({Math.round(((product.rrp - product.dropPrice) / product.rrp) * 100)}
              %)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">Постачальник:</span>
            <span className="text-white text-sm">{product.supplier}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400 text-sm">В наявності:</span>
            <span className="text-white text-sm">{product.inStock} шт.</span>
          </div>
          {product.rating && (
            <div className="flex justify-between">
              <span className="text-gray-400 text-sm">Рейтинг:</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-white text-sm">{product.rating}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700">
          <Link href={`/dashboard/create-order?product=${product.id}`}>
            <Button className="w-full cosmic-glow" disabled={product.status === "out_of_stock"}>
              <ShoppingCart className="w-4 h-4 mr-2" />
              Замовити продукт
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  // Grid class based on density mode
  const getGridClasses = () => {
    if (densityMode === "compact") {
      return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3"
    }
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Імпортовані продукти</h1>
            <p className="text-gray-400">Продукти, доступні для замовлення від ваших постачальників</p>
          </div>

          {/* Density Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Щільність:</span>
            <div className="flex items-center bg-slate-800 rounded-lg p-1">
              <Button
                size="sm"
                variant={densityMode === "comfortable" ? "default" : "ghost"}
                onClick={() => handleDensityChange("comfortable")}
                className="h-8 px-3 text-xs"
              >
                <LayoutGrid className="w-3 h-3 mr-1" />
                Зручно
              </Button>
              <Button
                size="sm"
                variant={densityMode === "compact" ? "default" : "ghost"}
                onClick={() => handleDensityChange("compact")}
                className="h-8 px-3 text-xs"
              >
                <Grid3X3 className="w-3 h-3 mr-1" />
                Компактно
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="space-gradient border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Всього продуктів</p>
                  <p className="text-2xl font-bold text-white">{importedProducts.length}</p>
                </div>
                <Package className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          <Card className="space-gradient border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Доступні</p>
                  <p className="text-2xl font-bold text-white">
                    {importedProducts.filter((p) => p.status === "active").length}
                  </p>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="space-gradient border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Постачальники</p>
                  <p className="text-2xl font-bold text-white">
                    {new Set(importedProducts.map((p) => p.supplier)).size}
                  </p>
                </div>
                <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
              </div>
            </CardContent>
          </Card>
          <Card className="space-gradient border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Середня маржа</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(
                      importedProducts.reduce((acc, p) => acc + ((p.rrp - p.dropPrice) / p.rrp) * 100, 0) /
                        importedProducts.length,
                    )}
                    %
                  </p>
                </div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
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
                  placeholder="Пошук за назвою, SKU або постачальником..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Категорія" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Всі категорії</SelectItem>
                  <SelectItem value="Смартфони">Смартфони</SelectItem>
                  <SelectItem value="Ноутбуки">Ноутбуки</SelectItem>
                  <SelectItem value="Аксесуари">Аксесуари</SelectItem>
                  <SelectItem value="Планшети">Планшети</SelectItem>
                  <SelectItem value="Фототехніка">Фототехніка</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid - Responsive based on density */}
        <div className={getGridClasses()}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="block md:hidden">
              {/* Mobile: Always use comfortable layout */}
              <ComfortableImportedProductCard product={product} />
            </div>
          ))}
          {filteredProducts.map((product) => (
            <div key={`desktop-${product.id}`} className="hidden md:block">
              {/* Desktop: Use selected density */}
              {densityMode === "compact" ? (
                <CompactImportedProductCard product={product} />
              ) : (
                <ComfortableImportedProductCard product={product} />
              )}
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <Card className="space-gradient border-slate-700">
            <CardContent className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Продукти не знайдено</h3>
              <p className="text-gray-400 mb-6">Спробуйте змінити фільтри пошуку</p>
            </CardContent>
          </Card>
        )}

        {/* Performance indicator for large catalogs */}
        {filteredProducts.length > 100 && (
          <div className="text-center text-sm text-gray-400">
            Показано {filteredProducts.length} продуктів • Використовуйте компактний режим для кращої продуктивності
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
