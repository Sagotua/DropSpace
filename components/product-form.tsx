"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"

interface ProductFormProps {
  mode: "create" | "edit"
  onSubmit: (data: any) => void
  onCancel: () => void
  initialData?: any
}

export function ProductForm({ mode, onSubmit, onCancel, initialData }: ProductFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    sku: initialData?.sku || "",
    rrp: initialData?.rrp || "",
    dropPrice: initialData?.dropPrice || "",
    images: initialData?.images || [],
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle image upload logic
    console.log("Image upload:", e.target.files)
  }

  return (
    <Card className="space-gradient border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">
          {mode === "create" ? "Додати новий продукт" : "Редагувати продукт"}
        </CardTitle>
        <CardDescription className="text-gray-400">Заповніть інформацію про продукт</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="title" className="text-gray-300">
              Назва продукту
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white"
              placeholder="Введіть назву продукту"
              required
            />
          </div>

          <div>
            <Label htmlFor="description" className="text-gray-300">
              Опис
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white min-h-[100px]"
              placeholder="Детальний опис продукту"
            />
          </div>

          <div>
            <Label htmlFor="sku" className="text-gray-300">
              SKU
            </Label>
            <Input
              id="sku"
              value={formData.sku}
              onChange={(e) => setFormData((prev) => ({ ...prev, sku: e.target.value }))}
              className="bg-slate-800 border-slate-600 text-white"
              placeholder="Унікальний код продукту"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="rrp" className="text-gray-300">
                RRP (Рекомендована ціна)
              </Label>
              <Input
                id="rrp"
                type="number"
                step="0.01"
                value={formData.rrp}
                onChange={(e) => setFormData((prev) => ({ ...prev, rrp: e.target.value }))}
                className="bg-slate-800 border-slate-600 text-white"
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="dropPrice" className="text-gray-300">
                Drop Price (Ціна для дропшипперів)
              </Label>
              <Input
                id="dropPrice"
                type="number"
                step="0.01"
                value={formData.dropPrice}
                onChange={(e) => setFormData((prev) => ({ ...prev, dropPrice: e.target.value }))}
                className="bg-slate-800 border-slate-600 text-white"
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div>
            <Label className="text-gray-300">Зображення продукту</Label>
            <div className="mt-2 border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-400 mb-2">Перетягніть зображення або натисніть для вибору</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById("image-upload")?.click()}>
                Вибрати файли
              </Button>
            </div>
          </div>

          <div className="flex space-x-4">
            <Button type="submit" className="cosmic-glow">
              {mode === "create" ? "Створити продукт" : "Зберегти зміни"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Скасувати
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
