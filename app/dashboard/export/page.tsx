"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Upload,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Eye,
  RefreshCw,
  ExternalLink,
  Key,
  Zap,
  Package,
  Search,
  TrendingUp,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useRole } from "@/contexts/role-context"

// Mock data for products
const mockProducts = [
  {
    id: "PRD001",
    name: "iPhone 15 Pro",
    sku: "IPH15PRO-256",
    category: "Смартфони",
    price: 32000,
    stock: 25,
    status: "active",
    image: "/placeholder.svg?height=60&width=60&text=📱",
    promStatus: "exported",
    rozetkaStatus: "pending",
    lastExported: "2024-01-15T10:30:00Z",
  },
  {
    id: "PRD002",
    name: "Samsung Galaxy S24",
    sku: "SGS24-128",
    category: "Смартфони",
    price: 28000,
    stock: 18,
    status: "active",
    image: "/placeholder.svg?height=60&width=60&text=📱",
    promStatus: "failed",
    rozetkaStatus: "exported",
    lastExported: "2024-01-14T15:20:00Z",
  },
  {
    id: "PRD003",
    name: "MacBook Air M3",
    sku: "MBA-M3-256",
    category: "Ноутбуки",
    price: 45000,
    stock: 8,
    status: "active",
    image: "/placeholder.svg?height=60&width=60&text=💻",
    promStatus: "not_exported",
    rozetkaStatus: "not_exported",
    lastExported: null,
  },
]

// Mock integration status
const mockIntegrations = {
  prom: {
    connected: true,
    apiKey: "prom_****_****_****_1234",
    lastSync: "2024-01-15T10:30:00Z",
    status: "active",
  },
  rozetka: {
    connected: false,
    apiKey: null,
    lastSync: null,
    status: "disconnected",
  },
}

interface ExportJob {
  id: string
  platform: "prom" | "rozetka"
  status: "pending" | "running" | "completed" | "failed"
  progress: number
  totalProducts: number
  successCount: number
  failedCount: number
  startedAt: string
  completedAt?: string
  errors?: string[]
}

export default function ExportPage() {
  const { user } = useAuth()
  const { currentRole } = useRole()
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [exportJobs, setExportJobs] = useState<ExportJob[]>([])
  const [isExporting, setIsExporting] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [integrations, setIntegrations] = useState(mockIntegrations)
  const [showCredentialsDialog, setShowCredentialsDialog] = useState(false)
  const [currentPlatform, setCurrentPlatform] = useState<"prom" | "rozetka">("prom")

  // Filter products based on search and filters
  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    const matchesStatus = statusFilter === "all" || product.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  // Calculate stats
  const totalProducts = mockProducts.length
  const exportedProducts = mockProducts.filter(
    (p) => p.promStatus === "exported" || p.rozetkaStatus === "exported",
  ).length
  const pendingProducts = mockProducts.filter((p) => p.promStatus === "pending" || p.rozetkaStatus === "pending").length
  const failedProducts = mockProducts.filter((p) => p.promStatus === "failed" || p.rozetkaStatus === "failed").length

  const getStatusColor = (status: string) => {
    switch (status) {
      case "exported":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "failed":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "not_exported":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "exported":
        return "Експортовано"
      case "pending":
        return "Очікує"
      case "failed":
        return "Помилка"
      case "not_exported":
        return "Не експортовано"
      default:
        return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "exported":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <Clock className="w-4 h-4" />
      case "failed":
        return <XCircle className="w-4 h-4" />
      case "not_exported":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(filteredProducts.map((p) => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleProductSelect = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts((prev) => [...prev, productId])
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId))
    }
  }

  const handlePlatformSelect = (platform: string, checked: boolean) => {
    if (checked) {
      setSelectedPlatforms((prev) => [...prev, platform])
    } else {
      setSelectedPlatforms((prev) => prev.filter((p) => p !== platform))
    }
  }

  const handleExport = async () => {
    if (selectedProducts.length === 0 || selectedPlatforms.length === 0) {
      return
    }

    setIsExporting(true)

    // Create export jobs for each platform
    const newJobs: ExportJob[] = selectedPlatforms.map((platform) => ({
      id: `job_${Date.now()}_${platform}`,
      platform: platform as "prom" | "rozetka",
      status: "pending",
      progress: 0,
      totalProducts: selectedProducts.length,
      successCount: 0,
      failedCount: 0,
      startedAt: new Date().toISOString(),
    }))

    setExportJobs((prev) => [...prev, ...newJobs])

    // Simulate export process
    for (const job of newJobs) {
      await simulateExport(job)
    }

    setIsExporting(false)
  }

  const simulateExport = async (job: ExportJob) => {
    // Update job status to running
    setExportJobs((prev) => prev.map((j) => (j.id === job.id ? { ...j, status: "running" } : j)))

    // Simulate progress
    for (let i = 0; i <= job.totalProducts; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const progress = (i / job.totalProducts) * 100
      const success = Math.random() > 0.2 // 80% success rate

      setExportJobs((prev) =>
        prev.map((j) =>
          j.id === job.id
            ? {
                ...j,
                progress,
                successCount: success ? i : j.successCount,
                failedCount: success ? j.failedCount : i - j.successCount,
              }
            : j,
        ),
      )
    }

    // Complete the job
    setExportJobs((prev) =>
      prev.map((j) =>
        j.id === job.id
          ? {
              ...j,
              status: job.failedCount > 0 ? "failed" : "completed",
              completedAt: new Date().toISOString(),
              errors: job.failedCount > 0 ? ["Деякі продукти не вдалося експортувати"] : undefined,
            }
          : j,
      ),
    )
  }

  const handleConnectPlatform = (platform: "prom" | "rozetka") => {
    setCurrentPlatform(platform)
    setShowCredentialsDialog(true)
  }

  const handleSaveCredentials = (apiKey: string) => {
    setIntegrations((prev) => ({
      ...prev,
      [currentPlatform]: {
        connected: true,
        apiKey: `${currentPlatform}_****_****_****_${apiKey.slice(-4)}`,
        lastSync: new Date().toISOString(),
        status: "active",
      },
    }))
    setShowCredentialsDialog(false)
  }

  if (!user) return null

  return (
    <div className="space-y-8">
      {/* Header - Matching main dashboard style */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            
            Експорт продуктів
          </h1>
          <p className="text-gray-400 mt-0">Експортуйте ваші продукти на Prom.ua та Rozetka</p>
        </div>
        
      </div>

      {/* Stats Cards - Matching main dashboard grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Всього продуктів</p>
                <p className="text-2xl font-bold text-white">{totalProducts}</p>
                <p className="text-xs text-gray-500 mt-1">Доступно для експорту</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Експортовано</p>
                <p className="text-2xl font-bold text-white">{exportedProducts}</p>
                <p className="text-xs text-green-400 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {Math.round((exportedProducts / totalProducts) * 100)}% успішно
                </p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Очікують</p>
                <p className="text-2xl font-bold text-white">{pendingProducts}</p>
                <p className="text-xs text-yellow-400 mt-1 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />В процесі
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="space-gradient border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Помилки</p>
                <p className="text-2xl font-bold text-white">{failedProducts}</p>
                <p className="text-xs text-red-400 mt-1 flex items-center">
                  <XCircle className="w-3 h-3 mr-1" />
                  Потребують уваги
                </p>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid - Matching dashboard layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Platform Integration Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="space-gradient border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Prom.ua</CardTitle>
                    <CardDescription>Інтеграція з Prom.ua</CardDescription>
                  </div>
                </div>
                <Badge
                  className={
                    integrations.prom.connected
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }
                >
                  {integrations.prom.connected ? "Підключено" : "Не підключено"}
                </Badge>
              </CardHeader>
              <CardContent>
                {integrations.prom.connected ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">API ключ:</span>
                      <span className="text-white font-mono">{integrations.prom.apiKey}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Остання синхронізація:</span>
                      <span className="text-white">
                        {new Date(integrations.prom.lastSync!).toLocaleString("uk-UA")}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent border-slate-600 hover:bg-slate-700"
                      onClick={() => handleConnectPlatform("prom")}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Налаштувати
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-400">Підключіть ваш акаунт Prom.ua для експорту продуктів</p>
                    <Button className="w-full cosmic-glow" onClick={() => handleConnectPlatform("prom")}>
                      <Key className="w-4 h-4 mr-2" />
                      Підключити Prom.ua
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="space-gradient border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Rozetka</CardTitle>
                    <CardDescription>Інтеграція з Rozetka</CardDescription>
                  </div>
                </div>
                <Badge
                  className={
                    integrations.rozetka.connected
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }
                >
                  {integrations.rozetka.connected ? "Підключено" : "Не підключено"}
                </Badge>
              </CardHeader>
              <CardContent>
                {integrations.rozetka.connected ? (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">API ключ:</span>
                      <span className="text-white font-mono">{integrations.rozetka.apiKey}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Остання синхронізація:</span>
                      <span className="text-white">
                        {new Date(integrations.rozetka.lastSync!).toLocaleString("uk-UA")}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full bg-transparent border-slate-600 hover:bg-slate-700"
                      onClick={() => handleConnectPlatform("rozetka")}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Налаштувати
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-400">Підключіть ваш акаунт Rozetka для експорту продуктів</p>
                    <Button className="w-full cosmic-glow" onClick={() => handleConnectPlatform("rozetka")}>
                      <Key className="w-4 h-4 mr-2" />
                      Підключити Rozetka
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Export Controls */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Налаштування експорту</CardTitle>
              <CardDescription>Виберіть продукти та платформи для експорту</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Platform Selection */}
              <div>
                <Label className="text-gray-300 text-sm font-medium">Платформи для експорту</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="prom"
                      checked={selectedPlatforms.includes("prom")}
                      onCheckedChange={(checked) => handlePlatformSelect("prom", checked as boolean)}
                      disabled={!integrations.prom.connected}
                    />
                    <Label htmlFor="prom" className="text-gray-300 cursor-pointer">
                      Prom.ua
                    </Label>
                    {!integrations.prom.connected && (
                      <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                        Не підключено
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rozetka"
                      checked={selectedPlatforms.includes("rozetka")}
                      onCheckedChange={(checked) => handlePlatformSelect("rozetka", checked as boolean)}
                      disabled={!integrations.rozetka.connected}
                    />
                    <Label htmlFor="rozetka" className="text-gray-300 cursor-pointer">
                      Rozetka
                    </Label>
                    {!integrations.rozetka.connected && (
                      <Badge variant="outline" className="border-red-500/30 text-red-400 text-xs">
                        Не підключено
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Export Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleExport}
                  disabled={selectedProducts.length === 0 || selectedPlatforms.length === 0 || isExporting}
                  className="cosmic-glow"
                >
                  {isExporting ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Експортування...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4 mr-2" />
                      Експортувати вибрані ({selectedProducts.length})
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedProducts(filteredProducts.map((p) => p.id))
                    setSelectedPlatforms(
                      ["prom", "rozetka"].filter((p) => integrations[p as keyof typeof integrations].connected),
                    )
                  }}
                  disabled={isExporting}
                  className="bg-transparent border-slate-600 hover:bg-slate-700"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Швидкий експорт всіх
                </Button>
              </div>

              {selectedProducts.length > 0 && selectedPlatforms.length > 0 && (
                <Alert className="border-blue-500/50 bg-blue-500/10">
                  <AlertCircle className="h-4 w-4 text-blue-400" />
                  <AlertDescription className="text-blue-400">
                    Буде експортовано {selectedProducts.length} продуктів на {selectedPlatforms.length} платформ(и)
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Products Management */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="bg-slate-800 border-slate-700">
              <TabsTrigger value="products" className="data-[state=active]:bg-slate-700">
                <Package className="w-4 h-4 mr-2" />
                Продукти
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-slate-700">
                <Clock className="w-4 h-4 mr-2" />
                Історія експорту
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products" className="space-y-6">
              {/* Filters */}
              <Card className="space-gradient border-slate-700">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Пошук за назвою або SKU..."
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
                      </SelectContent>
                    </Select>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-48 bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Статус" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="all">Всі статуси</SelectItem>
                        <SelectItem value="active">Активні</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Products List */}
              <Card className="space-gradient border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Продукти для експорту</CardTitle>
                    <CardDescription>Виберіть продукти для експорту на зовнішні платформи</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="select-all"
                      checked={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                      onCheckedChange={handleSelectAll}
                    />
                    <Label htmlFor="select-all" className="text-gray-300 cursor-pointer">
                      Вибрати всі
                    </Label>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50 hover:bg-slate-700/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            id={product.id}
                            checked={selectedProducts.includes(product.id)}
                            onCheckedChange={(checked) => handleProductSelect(product.id, checked as boolean)}
                          />
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <h3 className="text-white font-medium">{product.name}</h3>
                            <p className="text-sm text-gray-400">{product.sku}</p>
                            <p className="text-sm text-gray-400">₴{product.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-400">Prom:</span>
                              <Badge className={`text-xs ${getStatusColor(product.promStatus)}`}>
                                {getStatusIcon(product.promStatus)}
                                <span className="ml-1">{getStatusText(product.promStatus)}</span>
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-400">Rozetka:</span>
                              <Badge className={`text-xs ${getStatusColor(product.rozetkaStatus)}`}>
                                {getStatusIcon(product.rozetkaStatus)}
                                <span className="ml-1">{getStatusText(product.rozetkaStatus)}</span>
                              </Badge>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm" className="hover:bg-slate-600">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              {/* Export Jobs */}
              <Card className="space-gradient border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Історія експорту</CardTitle>
                  <CardDescription>Відстежуйте статус ваших експортів</CardDescription>
                </CardHeader>
                <CardContent>
                  {exportJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Немає історії експорту</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {exportJobs.map((job) => (
                        <div key={job.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`w-3 h-3 rounded-full ${
                                  job.status === "completed"
                                    ? "bg-green-400"
                                    : job.status === "failed"
                                      ? "bg-red-400"
                                      : job.status === "running"
                                        ? "bg-blue-400"
                                        : "bg-yellow-400"
                                }`}
                              />
                              <span className="text-white font-medium">
                                {job.platform === "prom" ? "Prom.ua" : "Rozetka"}
                              </span>
                              <Badge className={getStatusColor(job.status)}>{getStatusText(job.status)}</Badge>
                            </div>
                            <span className="text-sm text-gray-400">
                              {new Date(job.startedAt).toLocaleString("uk-UA")}
                            </span>
                          </div>

                          {job.status === "running" && (
                            <div className="mb-3">
                              <div className="flex justify-between text-sm text-gray-400 mb-1">
                                <span>Прогрес</span>
                                <span>{Math.round(job.progress)}%</span>
                              </div>
                              <Progress value={job.progress} className="h-2" />
                            </div>
                          )}

                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-400">Всього:</span>
                              <span className="text-white ml-2">{job.totalProducts}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Успішно:</span>
                              <span className="text-green-400 ml-2">{job.successCount}</span>
                            </div>
                            <div>
                              <span className="text-gray-400">Помилки:</span>
                              <span className="text-red-400 ml-2">{job.failedCount}</span>
                            </div>
                          </div>

                          {job.errors && job.errors.length > 0 && (
                            <Alert className="mt-3 border-red-500/50 bg-red-500/10">
                              <XCircle className="h-4 w-4 text-red-400" />
                              <AlertDescription className="text-red-400">{job.errors.join(", ")}</AlertDescription>
                            </Alert>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar - Matching dashboard sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Швидкі дії</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                className="w-full justify-start cosmic-glow"
                onClick={() => {
                  setSelectedProducts(filteredProducts.map((p) => p.id))
                  setSelectedPlatforms(
                    ["prom", "rozetka"].filter((p) => integrations[p as keyof typeof integrations].connected),
                  )
                }}
              >
                <Zap className="w-4 h-4 mr-2" />
                Експорт всіх продуктів
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent border-slate-600 hover:bg-slate-700"
                onClick={() => handleConnectPlatform("prom")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Налаштувати Prom.ua
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start bg-transparent border-slate-600 hover:bg-slate-700"
                onClick={() => handleConnectPlatform("rozetka")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Налаштувати Rozetka
              </Button>
            </CardContent>
          </Card>

          {/* Export Statistics */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Статистика експорту</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Успішність експорту</span>
                <span className="text-green-400 font-medium">
                  {Math.round((exportedProducts / totalProducts) * 100)}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Активні інтеграції</span>
                <span className="text-blue-400 font-medium">
                  {Object.values(integrations).filter((i) => i.connected).length}/2
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Останній експорт</span>
                <span className="text-gray-300 text-sm">
                  {integrations.prom.lastSync
                    ? new Date(integrations.prom.lastSync).toLocaleDateString("uk-UA")
                    : "Ніколи"}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">Остання активність</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-gray-300">iPhone 15 Pro експортовано на Prom.ua</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <span className="text-gray-300">Samsung Galaxy S24 - помилка експорту</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <span className="text-gray-300">MacBook Air M3 очікує експорту</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Credentials Dialog */}
      <CredentialsDialog
        open={showCredentialsDialog}
        onOpenChange={setShowCredentialsDialog}
        platform={currentPlatform}
        onSave={handleSaveCredentials}
      />
    </div>
  )
}

// Credentials Dialog Component
interface CredentialsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  platform: "prom" | "rozetka"
  onSave: (apiKey: string) => void
}

function CredentialsDialog({ open, onOpenChange, platform, onSave }: CredentialsDialogProps) {
  const [apiKey, setApiKey] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    if (!apiKey.trim()) return

    setIsLoading(true)

    // Simulate API validation
    await new Promise((resolve) => setTimeout(resolve, 1500))

    onSave(apiKey)
    setApiKey("")
    setIsLoading(false)
  }

  const platformInfo = {
    prom: {
      name: "Prom.ua",
      color: "text-orange-400",
      instructions: "Отримайте API ключ в особистому кабінеті Prom.ua в розділі 'API'",
    },
    rozetka: {
      name: "Rozetka",
      color: "text-green-400",
      instructions: "Отримайте API ключ в особистому кабінеті Rozetka в розділі 'Інтеграції'",
    },
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <Key className={`w-5 h-5 mr-2 ${platformInfo[platform].color}`} />
            Підключення до {platformInfo[platform].name}
          </DialogTitle>
          <DialogDescription className="text-gray-400">{platformInfo[platform].instructions}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="api-key" className="text-gray-300">
              API ключ
            </Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Введіть ваш API ключ"
              className="bg-slate-700 border-slate-600 text-white"
            />
          </div>

          <Alert className="border-blue-500/50 bg-blue-500/10">
            <AlertCircle className="h-4 w-4 text-blue-400" />
            <AlertDescription className="text-blue-400">
              Ваш API ключ буде збережено в зашифрованому ви��ляді та використовуватиметься лише для експорту продуктів.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-transparent border-slate-600 hover:bg-slate-700"
            >
              Скасувати
            </Button>
            <Button onClick={handleSave} disabled={!apiKey.trim() || isLoading} className="cosmic-glow">
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Перевірка...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Зберегти
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
