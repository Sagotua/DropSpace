"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Rocket, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading, user } = useAuth()
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      const success = await login(formData.email, formData.password)

      if (success) {
        setSuccess("Успішний вхід! Перенаправляємо в панель управління...")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        setError("Невірний email або пароль")
      }
    } catch (error) {
      setError("Помилка при вході. Спробуйте ще раз.")
    }
  }

  // Demo accounts for testing
  const demoAccounts = [
    { email: "dropshipper@demo.com", password: "demo123", role: "Дропшиппер" },
    { email: "supplier@demo.com", password: "demo123", role: "Постачальник" },
    { email: "both@demo.com", password: "demo123", role: "Обидві ролі" },
  ]

  const handleDemoLogin = async (email: string, password: string) => {
    setFormData({ email, password })
    setError("")
    setSuccess("")

    try {
      const success = await login(email, password)

      if (success) {
        setSuccess("Успішний вхід! Перенаправляємо в панель управління...")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        setError("Помилка при вході з демо акаунтом")
      }
    } catch (error) {
      setError("Помилка при вході. Спробуйте ще раз.")
    }
  }

  // Don't render if user is already logged in
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md space-y-6">
        <Card className="space-gradient border-slate-700">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto flex items-center justify-center mb-4">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-white text-2xl">Вхід в DropSpace</CardTitle>
            <CardDescription className="text-gray-400">Увійдіть до вашого акаунту</CardDescription>
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

              <Button type="submit" className="w-full cosmic-glow" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Входимо...
                  </>
                ) : (
                  "Увійти"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Немає акаунту?{" "}
                <Link href="/auth/register" className="text-blue-400 hover:text-blue-300">
                  Зареєструватися
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo accounts */}
        <Card className="space-gradient border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Демо акаунти для тестування</CardTitle>
            <CardDescription className="text-gray-400">
              Використайте ці акаунти для швидкого тестування платформи
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">{account.role}</p>
                  <p className="text-gray-400 text-xs">{account.email}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDemoLogin(account.email, account.password)}
                  disabled={isLoading}
                  className="bg-transparent border-slate-600 hover:bg-slate-700"
                >
                  Увійти
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
