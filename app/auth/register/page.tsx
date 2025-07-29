"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Rocket, User, Package, Users, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function RegisterPage() {
  const router = useRouter()
  const { register, isLoading, user } = useAuth()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    roles: {
      dropshipper: false,
      supplier: false,
    },
  })

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleRoleChange = (role: "dropshipper" | "supplier", checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      roles: {
        ...prev.roles,
        [role]: checked,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Паролі не співпадають")
      return
    }

    if (formData.password.length < 6) {
      setError("Пароль повинен містити мінімум 6 символів")
      return
    }

    if (!formData.roles.dropshipper && !formData.roles.supplier) {
      setError("Оберіть хоча б одну роль")
      return
    }

    try {
      const success = await register(formData)

      if (success) {
        setSuccess("Акаунт успішно створено! Перенаправляємо в панель управління...")
        setTimeout(() => {
          router.push("/dashboard")
        }, 2000)
      } else {
        setError("Користувач з таким email вже існує")
      }
    } catch (error) {
      setError("Помилка при створенні акаунту. Спробуйте ще раз.")
    }
  }

  // Don't render if user is already logged in
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md space-gradient border-slate-700">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto flex items-center justify-center mb-4">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-white text-2xl">Реєстрація в DropSpace</CardTitle>
          <CardDescription className="text-gray-400">Створіть акаунт для початку роботи</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert className="mb-4 border-red-500/50 bg-red-500/10">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="mb-4 border-green-500/50 bg-green-500/10">
              <CheckCircle className="h-4 w-4 text-green-400" />
              <AlertDescription className="text-green-400">{success}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-300">
                  Ім'я
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-300">
                  Прізвище
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  className="bg-slate-800 border-slate-600 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="bg-slate-800 border-slate-600 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-gray-300">
                Пароль
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                className="bg-slate-800 border-slate-600 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Підтвердіть пароль
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                className="bg-slate-800 border-slate-600 text-white"
                required
              />
            </div>

            <div className="space-y-3">
              <Label className="text-gray-300 text-sm font-medium">Оберіть вашу роль:</Label>

              <div className="flex items-center space-x-2 p-3 rounded-lg border border-slate-600 hover:border-blue-500 transition-colors">
                <Checkbox
                  id="dropshipper"
                  checked={formData.roles.dropshipper}
                  onCheckedChange={(checked) => handleRoleChange("dropshipper", checked as boolean)}
                />
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-blue-400" />
                  <Label htmlFor="dropshipper" className="text-white cursor-pointer">
                    Дропшиппер
                  </Label>
                </div>
              </div>

              <div className="flex items-center space-x-2 p-3 rounded-lg border border-slate-600 hover:border-purple-500 transition-colors">
                <Checkbox
                  id="supplier"
                  checked={formData.roles.supplier}
                  onCheckedChange={(checked) => handleRoleChange("supplier", checked as boolean)}
                />
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-purple-400" />
                  <Label htmlFor="supplier" className="text-white cursor-pointer">
                    Постачальник
                  </Label>
                </div>
              </div>

              {formData.roles.dropshipper && formData.roles.supplier && (
                <div className="flex items-center space-x-2 p-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400">Ви зможете перемикатися між ролями в панелі управління</span>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full cosmic-glow"
              disabled={isLoading || (!formData.roles.dropshipper && !formData.roles.supplier)}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Створюємо акаунт...
                </>
              ) : (
                "Створити акаунт"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Вже маєте акаунт?{" "}
              <Link href="/auth/login" className="text-blue-400 hover:text-blue-300">
                Увійти
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
