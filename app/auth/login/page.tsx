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
      const loginSuccess = await login(formData.email, formData.password)

      if (loginSuccess) {
        setSuccess("Успішний вхід! Перенаправляємо в панель управління...")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        setError("Невірний email або пароль")
      }
    } catch (error) {
      console.error("Login error:", error)
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
      console.log("Attempting demo login with:", email, password)
      const loginSuccess = await login(email, password)

      if (loginSuccess) {
        setSuccess("Успішний вхід! Перенаправляємо в панель управління...")
        setTimeout(() => {
          router.push("/dashboard")
        }, 1500)
      } else {
        setError("Помилка при вході з демо акаунтом. Перевірте консоль для деталей.")
      }
    } catch (error) {
      console.error("Demo login error:", error)
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
            <Link href="/" className="inline-block">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mx-auto flex items-center justify-center mb-4 cursor-pointer hover:scale-110 transition-transform duration-200">
                <Rocket className="w-6 h-6 text-white" />
              </div>
            </Link>
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

              <Button
                type="submit"
                className="w-full relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ease-out border border-blue-500/30 hover:border-blue-400/50"
                disabled={isLoading}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                <span className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Входимо...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🚀</span>
                      Увійти
                    </>
                  )}
                </span>
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
          <CardContent className="space-y-4">
            {demoAccounts.map((account, index) => (
              <div
                key={index}
                className="group relative overflow-hidden flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/40 via-slate-800/30 to-slate-800/40 rounded-xl border border-slate-700/50 hover:border-slate-600/70 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center border border-slate-600/50 group-hover:border-blue-500/50 transition-colors duration-300">
                    <span className="text-lg">
                      {account.role === "Дропшиппер" ? "📦" : account.role === "Постачальник" ? "🏭" : "⚡"}
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold group-hover:text-blue-200 transition-colors duration-300">
                      {account.role}
                    </p>
                    <p className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">
                      {account.email}
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDemoLogin(account.email, account.password)}
                  disabled={isLoading}
                  className="relative z-10 bg-transparent border-slate-600 hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-purple-600/20 hover:border-blue-500/50 text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Увійти"}
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
