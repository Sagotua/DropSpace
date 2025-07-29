"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Package, User, MapPin, ShoppingCart } from "lucide-react"
import Link from "next/link"

// Mock imported products data
const importedProducts = [
  {
    id: "PRD001",
    name: "iPhone 15 Pro",
    sku: "IPH15PRO-256",
    dropPrice: 999,
    rrp: 1199,
    supplier: "TechSupply",
    supplierId: "SUP001",
    image: "/placeholder.svg?height=80&width=80&text=📱",
    inStock: 25,
  },
  {
    id: "PRD002",
    name: "Samsung Galaxy S24",
    sku: "SGS24-128",
    dropPrice: 849,
    rrp: 999,
    supplier: "MobileWorld",
    supplierId: "SUP002",
    image: "/placeholder.svg?height=80&width=80&text=📱",
    inStock: 18,
  },
  {
    id: "PRD003",
    name: "MacBook Air M3",
    sku: "MBA-M3-256",
    dropPrice: 1299,
    rrp: 1499,
    supplier: "AppleStore",
    supplierId: "SUP003",
    image: "/placeholder.svg?height=80&width=80&text=💻",
    inStock: 8,
  },
]

export default function CreateOrderPage() {
  const router = useRouter()
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [formData, setFormData] = useState({
    quantity: 1,
    customerName: "",
    customerPhone: "",
    shippingCity: "",
    shippingAddress: "",
    notes: "",
  })

  const selectedProductData = importedProducts.find((p) => p.id === selectedProduct)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedProduct || !selectedProductData) return

    // Create order object
    const newOrder = {
      id: `ORD${Date.now()}`,
      productId: selectedProduct,
      product: selectedProductData,
      quantity: formData.quantity,
      totalAmount: selectedProductData.dropPrice * formData.quantity,
      customer: {
        name: formData.customerName,
        phone: formData.customerPhone,
      },
      shipping: {
        city: formData.shippingCity,
        address: formData.shippingAddress,
      },
      notes: formData.notes,
      status: "pending",
      createdAt: new Date().toISOString(),
      supplierId: selectedProductData.supplierId,
      supplier: selectedProductData.supplier,
    }

    // In a real app, this would be sent to the backend
    console.log("Creating order:", newOrder)

    // Simulate order creation
    alert("Замовлення успішно створено!")
    router.push("/dashboard/orders")
  }

  const calculateTotal = () => {
    if (!selectedProductData) return 0
    return selectedProductData.dropPrice * formData.quantity
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад до панелі
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Створити замовлення</h1>
          <p className="text-gray-400">Оформіть замовлення для вашого клієнта</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Order Form */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Selection */}
            <Card className="space-gradient border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Package className="w-5 h-5 mr-2 text-blue-400" />
                  Вибір продукту
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Оберіть продукт з ваших імпортованих товарів
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="product" className="text-gray-300">
                    Продукт *
                  </Label>
                  <Select value={selectedProduct} onValueChange={setSelectedProduct} required>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                      <SelectValue placeholder="Оберіть продукт" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      {importedProducts.map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          <div className="flex items-center space-x-3">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-8 h-8 rounded"
                            />
                            <div>
                              <div className="text-white">{product.name}</div>
                              <div className="text-xs text-gray-400">
                                ${product.dropPrice} • {product.supplier} • В наявності: {product.inStock}
                              </div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedProductData && (
                  <div className="p-4 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <img
                        src={selectedProductData.image || "/placeholder.svg"}
                        alt={selectedProductData.name}
                        className="w-16 h-16 rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-medium">{selectedProductData.name}</h3>
                        <p className="text-sm text-gray-400">SKU: {selectedProductData.sku}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <Badge variant="outline" className="border-green-500 text-green-400">
                            Drop Price: ${selectedProductData.dropPrice}
                          </Badge>
                          <Badge variant="outline" className="border-blue-500 text-blue-400">
                            {selectedProductData.supplier}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="quantity" className="text-gray-300">
                    Кількість *
                  </Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max={selectedProductData?.inStock || 1}
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, quantity: Number.parseInt(e.target.value) || 1 }))
                    }
                    className="bg-slate-800 border-slate-600 text-white"
                    required
                  />
                  {selectedProductData && (
                    <p className="text-xs text-gray-400 mt-1">Максимум: {selectedProductData.inStock} шт.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="space-gradient border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-400" />
                  Інформація про клієнта
                </CardTitle>
                <CardDescription className="text-gray-400">Дані вашого клієнта для доставки</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName" className="text-gray-300">
                      Ім'я клієнта *
                    </Label>
                    <Input
                      id="customerName"
                      value={formData.customerName}
                      onChange={(e) => setFormData((prev) => ({ ...prev, customerName: e.target.value }))}
                      className="bg-slate-800 border-slate-600 text-white"
                      placeholder="Введіть ім'я клієнта"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone" className="text-gray-300">
                      Телефон клієнта *
                    </Label>
                    <Input
                      id="customerPhone"
                      value={formData.customerPhone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, customerPhone: e.target.value }))}
                      className="bg-slate-800 border-slate-600 text-white"
                      placeholder="+380 XX XXX XX XX"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card className="space-gradient border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-purple-400" />
                  Адреса доставки
                </CardTitle>
                <CardDescription className="text-gray-400">Куди доставити замовлення</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="shippingCity" className="text-gray-300">
                    Місто *
                  </Label>
                  <Input
                    id="shippingCity"
                    value={formData.shippingCity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, shippingCity: e.target.value }))}
                    className="bg-slate-800 border-slate-600 text-white"
                    placeholder="Київ, Харків, Одеса..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="shippingAddress" className="text-gray-300">
                    Адреса *
                  </Label>
                  <Textarea
                    id="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData((prev) => ({ ...prev, shippingAddress: e.target.value }))}
                    className="bg-slate-800 border-slate-600 text-white min-h-[80px]"
                    placeholder="Вулиця, будинок, квартира..."
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="notes" className="text-gray-300">
                    Примітки (необов'язково)
                  </Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                    className="bg-slate-800 border-slate-600 text-white min-h-[60px]"
                    placeholder="Додаткові побажання або інструкції..."
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex space-x-4">
              <Button type="submit" className="cosmic-glow" disabled={!selectedProduct}>
                <ShoppingCart className="w-4 h-4 mr-2" />
                Створити замовлення
              </Button>
              <Link href="/dashboard">
                <Button variant="outline" className="bg-transparent border-slate-600">
                  Скасувати
                </Button>
              </Link>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <Card className="space-gradient border-slate-700 sticky top-6">
            <CardHeader>
              <CardTitle className="text-white">Підсумок замовлення</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedProductData ? (
                <>
                  <div className="flex items-center space-x-3">
                    <img
                      src={selectedProductData.image || "/placeholder.svg"}
                      alt={selectedProductData.name}
                      className="w-12 h-12 rounded"
                    />
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">{selectedProductData.name}</p>
                      <p className="text-gray-400 text-xs">{selectedProductData.supplier}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-4 border-t border-slate-700">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ціна за одиницю:</span>
                      <span className="text-white">${selectedProductData.dropPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Кількість:</span>
                      <span className="text-white">{formData.quantity}</span>
                    </div>
                    <div className="flex justify-between font-medium pt-2 border-t border-slate-700">
                      <span className="text-white">Загальна сума:</span>
                      <span className="text-green-400 text-lg">${calculateTotal()}</span>
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                    <p className="text-blue-400 text-sm">
                      💡 Замовлення буде відправлено постачальнику "{selectedProductData.supplier}" для підтвердження
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <Package className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">Оберіть продукт для створення замовлення</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
