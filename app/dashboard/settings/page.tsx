"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { User, Shield, Bell, CreditCard, Eye, EyeOff, Upload, Smartphone, Mail } from "lucide-react"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const tabs = [
    { id: "profile", label: "Профіль", icon: User, mobileLabel: "Профіль" },
    { id: "security", label: "Безпека", icon: Shield, mobileLabel: "Безпека" },
    { id: "notifications", label: "Сповіщення", icon: Bell, mobileLabel: "Сповіщ." },
    { id: "billing", label: "Підписка", icon: CreditCard, mobileLabel: "Підписка", hideOnMobile: true },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Налаштування</h1>
        <p className="text-sm sm:text-base text-gray-400">Керуйте своїм профілем та налаштуваннями акаунту</p>
      </div>

      {/* Tab Navigation - Mobile Responsive */}
      <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-2 min-h-[44px] text-xs sm:text-sm ${
              tab.hideOnMobile ? "hidden lg:flex" : ""
            } ${
              activeTab === tab.id
                ? "cosmic-glow"
                : "bg-slate-800 border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.mobileLabel}</span>
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "profile" && (
        <div className="space-y-6">
          {/* Profile Information */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Інформація профілю</CardTitle>
              <CardDescription className="text-gray-400">Оновіть свою особисту інформацію</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-slate-700 text-white text-lg">ДК</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-white font-medium">Дмитро Коваленко</h3>
                  <p className="text-gray-400 text-sm">dmitro.kovalenko@example.com</p>
                  <Button size="sm" className="mt-2 min-h-[36px] bg-transparent" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Змінити фото
                  </Button>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Form Fields - Mobile Responsive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">
                    Ім'я
                  </Label>
                  <Input
                    id="firstName"
                    defaultValue="Дмитро"
                    className="bg-slate-800 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">
                    Прізвище
                  </Label>
                  <Input
                    id="lastName"
                    defaultValue="Коваленко"
                    className="bg-slate-800 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="dmitro.kovalenko@example.com"
                    className="bg-slate-800 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Телефон
                  </Label>
                  <Input
                    id="phone"
                    defaultValue="+380 67 123 4567"
                    className="bg-slate-800 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-white">
                    Компанія
                  </Label>
                  <Input
                    id="company"
                    defaultValue="DropSpace LLC"
                    className="bg-slate-800 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="bio" className="text-white">
                    Про себе
                  </Label>
                  <Textarea
                    id="bio"
                    placeholder="Розкажіть про себе..."
                    className="bg-slate-800 border-slate-600 text-white min-h-[100px]"
                  />
                </div>
              </div>

              <Button className="cosmic-glow w-full sm:w-auto min-h-[44px]">Зберегти зміни</Button>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "security" && (
        <div className="space-y-6">
          {/* Password */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Зміна паролю</CardTitle>
              <CardDescription className="text-gray-400">Оновіть свій пароль для безпеки акаунту</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-white">
                  Поточний пароль
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    className="bg-slate-800 border-slate-600 text-white pr-10 min-h-[44px]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-white">
                  Новий пароль
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    className="bg-slate-800 border-slate-600 text-white pr-10 min-h-[44px]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">
                  Підтвердіть новий пароль
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className="bg-slate-800 border-slate-600 text-white pr-10 min-h-[44px]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button className="cosmic-glow w-full sm:w-auto min-h-[44px]">Змінити пароль</Button>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Двофакторна автентифікація</CardTitle>
              <CardDescription className="text-gray-400">
                Додайте додатковий рівень безпеки до вашого акаунту
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gray-400" />
                    <span className="text-white">SMS автентифікація</span>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Вимкнено</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Отримуйте коди підтвердження через SMS</p>
                </div>
                <Switch />
              </div>
              <Separator className="bg-slate-700" />
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span className="text-white">Email автентифікація</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Увімкнено</Badge>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Отримуйте коди підтвердження на email</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "notifications" && (
        <div className="space-y-6">
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Налаштування сповіщень</CardTitle>
              <CardDescription className="text-gray-400">Керуйте тим, як ви отримуєте сповіщення</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Email Notifications */}
              <div>
                <h4 className="text-white font-medium mb-4">Email сповіщення</h4>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <span className="text-white">Нові замовлення</span>
                      <p className="text-sm text-gray-400">Сповіщення про нові замовлення</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <span className="text-white">Зміни статусу</span>
                      <p className="text-sm text-gray-400">Оновлення статусу замовлень</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <span className="text-white">Нові продукти</span>
                      <p className="text-sm text-gray-400">Сповіщення про нові продукти від постачальників</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              <Separator className="bg-slate-700" />

              {/* Push Notifications */}
              <div>
                <h4 className="text-white font-medium mb-4">Push сповіщення</h4>
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <span className="text-white">Термінові сповіщення</span>
                      <p className="text-sm text-gray-400">Важливі оновлення та попередження</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <div className="flex-1">
                      <span className="text-white">Маркетингові повідомлення</span>
                      <p className="text-sm text-gray-400">Акції та спеціальні пропозиції</p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "billing" && (
        <div className="space-y-6">
          {/* Current Plan */}
          <Card className="space-gradient border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Поточна підписка</CardTitle>
              <CardDescription className="text-gray-400">Керуйте своєю підпискою та методами оплати</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-600/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Cosmos Plan</h4>
                    <p className="text-gray-400 text-sm">Максимальний план з усіма функціями</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">$25</p>
                    <p className="text-gray-400 text-sm">на місяць</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="flex-1 min-h-[44px] bg-transparent">
                    Змінити план
                  </Button>
                  <Button variant="outline" className="flex-1 min-h-[44px] bg-transparent">
                    Скасувати підписку
                  </Button>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h4 className="text-white font-medium mb-4">Метод оплати</h4>
                <div className="p-4 bg-slate-800 border border-slate-600 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white">•••• •••• •••• 4242</p>
                        <p className="text-gray-400 text-sm">Закінчується 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="min-h-[36px] bg-transparent">
                      Змінити
                    </Button>
                  </div>
                </div>
              </div>

              {/* Billing History */}
              <div>
                <h4 className="text-white font-medium mb-4">Історія платежів</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <div>
                      <p className="text-white">Cosmos Plan</p>
                      <p className="text-gray-400 text-sm">15 січня 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white">$25.00</p>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Оплачено</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800 rounded-lg">
                    <div>
                      <p className="text-white">Cosmos Plan</p>
                      <p className="text-gray-400 text-sm">15 грудня 2023</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white">$25.00</p>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Оплачено</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
