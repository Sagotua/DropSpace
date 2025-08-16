"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Eye, Edit, MoreHorizontal, Package } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const mockProducts = [
  {
    id: "PRD001",
    name: "iPhone 15 Pro",
    sku: "IPH15PRO-256",
    category: "Смартфони",
    rrp: "$1,199",
    dropPrice: "$999",
    stock: 25,
    status: "active",
    image: "/placeholder.svg?height=60&width=60&text=📱",
  },
  {
    id: "PRD002",
    name: "Samsung Galaxy S24",
    sku: "SGS24-128",
    category: "Смартфони",
    rrp: "$999",
    dropPrice: "$849",
    stock: 18,
    status: "active",
    image: "/placeholder.svg?height=60&width=60&text=📱",
  },
  {
    id: "PRD003",
    name: "MacBook Air M3",
    sku: "MBA-M3-256",
    category: "Ноутбуки",
    rrp: "$1,499",
    dropPrice: "$1,299",
    stock: 8,
    status: "low_stock",
    image: "/placeholder.svg?height=60&width=60&text=💻",
  },
  {
    id: "PRD004",
    name: "AirPods Pro 2",
    sku: "APP2-WHITE",
    category: "Аксесуари",
    rrp: "$299",
    dropPrice: "$249",
    stock: 0,
    status: "out_of_stock",
    image: "/placeholder.svg?height=60&width=60&text=🎧",
  },
]

export default function MyProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30 hover:border-green-500/50 transition-all duration-200"
      case "low_stock":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30 hover:bg-yellow-500/30 hover:border-yellow-500/50 transition-all duration-200"
      case "out_of_stock":
        return "bg-red-500/20 text-red-400 border-red-500/30 hover:bg-red-500/30 hover:border-red-500/50 transition-all duration-200"
      case "inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30 hover:border-gray-500/50 transition-all duration-200"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30 hover:bg-gray-500/30 hover:border-gray-500/50 transition-all duration-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Активний"
      case "low_stock":
        return "Мало на складі"
      case "out_of_stock":
        return "Немає в наявності"
      case "inactive":
        return "Неактивний"
      default:
        return status
    }
  }

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Мої продукти</h1>
          <p className="text-sm sm:text-base text-gray-400">Керуйте вашими продуктами та їх наявністю</p>
        </div>
        <Button className="cosmic-glow w-full sm:w-auto min-h-[44px]">
          <Plus className="w-4 h-4 mr-2" />
          Додати продукт
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Всього продуктів</p>
                <p className="text-lg sm:text-2xl font-bold text-white">456</p>
              </div>
              <Package className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Активні</p>
                <p className="text-lg sm:text-2xl font-bold text-white">423</p>
              </div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Мало на складі</p>
                <p className="text-lg sm:text-2xl font-bold text-white">18</p>
              </div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-400">Немає в наявності</p>
                <p className="text-lg sm:text-2xl font-bold text-white">15</p>
              </div>
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="space-gradient border-slate-700">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Пошук за назвою або SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white min-h-[44px]"
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white min-h-[44px]">
                  <SelectValue placeholder="Категорія" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Всі категорії</SelectItem>
                  <SelectItem value="Смартфони">Смартфони</SelectItem>
                  <SelectItem value="Ноутбуки">Ноутбуки</SelectItem>
                  <SelectItem value="Аксесуари">Аксесуари</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white min-h-[44px]">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="all">Всі статуси</SelectItem>
                  <SelectItem value="active">Активні</SelectItem>
                  <SelectItem value="low_stock">Мало на складі</SelectItem>
                  <SelectItem value="out_of_stock">Немає в наявності</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="space-gradient border-slate-700 hover:border-slate-600 transition-colors">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-medium text-sm sm:text-base truncate">{product.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">{product.sku}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="min-w-[44px] min-h-[44px] p-2 flex-shrink-0">
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

              <div className="space-y-2 sm:space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs sm:text-sm">Категорія:</span>
                  <span className="text-white text-xs sm:text-sm truncate ml-2">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs sm:text-sm">RRP:</span>
                  <span className="text-white text-xs sm:text-sm font-medium">{product.rrp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs sm:text-sm">Drop Price:</span>
                  <span className="text-green-400 text-xs sm:text-sm font-medium">{product.dropPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 text-xs sm:text-sm">На складі:</span>
                  <span className="text-white text-xs sm:text-sm">{product.stock}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-xs sm:text-sm">Статус:</span>
                  <Badge variant="secondary" className={`text-xs ${getStatusColor(product.status)}`}>
                    {getStatusText(product.status)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
