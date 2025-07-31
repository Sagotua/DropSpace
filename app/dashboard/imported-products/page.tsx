"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, ShoppingCart, Package, Plus } from "lucide-react"

// Mock imported products data
const importedProducts = [
  {
    id: "PRD001",
    name: "iPhone 15 Pro",
    sku: "IPH15PRO-256",
    category: "Смартфони",
    dropPrice: 999,
    rrp: 1199,
    supplier: "TechSupply",
    supplierId: "SUP001",
    image: "/placeholder.svg?height=80&width=80&text=📱",
    inStock: 25,
    status: "active",
  },
  {
    id: "PRD002",
    name: "Samsung Galaxy S24",
    sku: "SGS24-128",
    category: "Смартфони",
    dropPrice: 849,
    rrp: 999,
    supplier: "MobileWorld",
    supplierId: "SUP002",
    image: "/placeholder.svg?height=80&width=80&text=📱",
    inStock: 18,
    status: "active",
  },
  {
    id: "PRD003",
    name: "MacBook Air M3",
    sku: "MBA-M3-256",
    category: "Ноутбуки",
    dropPrice: 1299,
    rrp: 1499,
    supplier: "AppleStore",
    supplierId: "SUP003",
    image: "/placeholder.svg?height=80&width=80&text=💻",
    inStock: 8,
    status: "low_stock",
  },
  {
    id: "PRD004",
    name: "AirPods Pro 2",
    sku: "APP2-WHITE",
    category: "Аксесуари",
    dropPrice: 249,
    rrp: 299,
    supplier: "TechSupply",
    supplierId: "SUP001",
    image: "/placeholder.svg?height=80&width=80&text=🎧",
    inStock: 45,
    status: "active",
  },
]

export default function ImportedProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Імпортовані продукти</h1>
          <p className="text-gray-400">Продукти, доступні для замовлення від ваших постачальників</p>
        </div>
        <Link href="/dashboard/create-order">
          <Button className="cosmic-glow">
            <Plus className="w-4 h-4 mr-2" />
            Створити замовлення
          </Button>
        </Link>
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
                <p className="text-2xl font-bold text-white">{new Set(importedProducts.map((p) => p.supplier)).size}</p>
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
                <p className="text-2xl font-bold text-white">18%</p>
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
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="space-gradient border-slate-700 hover:border-slate-600 transition-colors">
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
                    ${product.rrp - product.dropPrice} (
                    {Math.round(((product.rrp - product.dropPrice) / product.rrp) * 100)}%)
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
        ))}
      </div>
    </div>
  )
}
