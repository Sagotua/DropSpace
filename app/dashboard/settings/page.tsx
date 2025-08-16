"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Camera, Save, Shield, Bell, CreditCard, Eye, EyeOff } from "lucide-react"
import { useState } from "react"

const SettingsPage = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Налаштування</h1>
        <p className="text-gray-400">Керуйте своїм профілем та налаштуваннями акаунту</p>
      </div>

      {/* Mobile-Responsive Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-4 bg-slate-800/50 border border-slate-700">
          <TabsTrigger
            value="profile"
            className="text-xs lg:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Профіль
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="text-xs lg:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white"
          >
            Безпека
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="text-xs lg:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white hidden sm:inline"
          >
            Сповіщення
          </TabsTrigger>
          <TabsTrigger
            value="billing"
            className="text-xs lg:text-sm data-[state=active]:bg-blue-600 data-[state=active]:text-white hidden lg:block"
          >
            Підписка
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg lg:text-xl">Інформація профілю</CardTitle>
              <CardDescription className="text-gray-400">
                Оновіть свою особисту інформацію та налаштування профілю
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section - Mobile Responsive */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <div className="relative">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 lg:w-10 lg:h-10 text-white" />
                  </div>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 lg:w-10 lg:h-10 rounded-full p-0 bg-blue-600 hover:bg-blue-700"
                  >
                    <Camera className="w-3 h-3 lg:w-4 lg:h-4" />
                  </Button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-white text-base lg:text-lg">Іван Петренко</h3>
                  <p className="text-gray-400 text-sm">ivan.petrenko@example.com</p>
                  <Badge className="mt-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">
                    Активна підписка
                  </Badge>
                </div>
              </div>

              {/* Form Fields - Mobile Single Column */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-300">
                    Ім'я
                  </Label>
                  <Input
                    id="firstName"
                    defaultValue="Іван"
                    className="bg-slate-800/50 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-300">
                    Прізвище
                  </Label>
                  <Input
                    id="lastName"
                    defaultValue="Петренко"
                    className="bg-slate-800/50 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
                <div className="space-y-2 lg:col-span-2">
                  <Label htmlFor="email" className="text-gray-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="ivan.petrenko@example.com"
                    className="bg-slate-800/50 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-300">
                    Телефон
                  </Label>
                  <Input
                    id="phone"
                    defaultValue="+380 67 123 45 67"
                    className="bg-slate-800/50 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-gray-300">
                    Компанія
                  </Label>
                  <Input
                    id="company"
                    defaultValue="DropSpace Ltd."
                    className="bg-slate-800/50 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
              </div>

              <Button className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-h-[44px]">
                <Save className="mr-2 h-4 w-4" />
                Зберегти зміни
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg lg:text-xl flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Безпека акаунту
              </CardTitle>
              <CardDescription className="text-gray-400">Керуйте паролем та налаштуваннями безпеки</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-gray-300">
                    Поточний пароль
                  </Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showPassword ? "text" : "password"}
                      className="bg-slate-800/50 border-slate-600 text-white min-h-[44px] pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-gray-300">
                    Новий пароль
                  </Label>
                  <Input
                    id="newPassword"
                    type="password"
                    className="bg-slate-800/50 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-300">
                    Підтвердити пароль
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    className="bg-slate-800/50 border-slate-600 text-white min-h-[44px]"
                  />
                </div>
              </div>

              <Separator className="bg-slate-700" />

              <div className="space-y-4">
                <h4 className="text-white font-medium">Двофакторна автентифікація</h4>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <p className="text-gray-300 text-sm">Увімкнути 2FA для додаткової безпеки</p>
                    <p className="text-gray-500 text-xs">Рекомендовано для захисту акаунту</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-h-[44px]">
                <Save className="mr-2 h-4 w-4" />
                Оновити пароль
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg lg:text-xl flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Налаштування сповіщень
              </CardTitle>
              <CardDescription className="text-gray-400">
                Керуйте тим, як і коли ви отримуєте сповіщення
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-medium">Email сповіщення</h4>
                    <p className="text-gray-400 text-sm">Отримувати сповіщення на email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator className="bg-slate-700" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-medium">Нові замовлення</h4>
                    <p className="text-gray-400 text-sm">Сповіщення про нові замовлення</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-medium">Оновлення статусу</h4>
                    <p className="text-gray-400 text-sm">Зміни статусу замовлень</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-medium">Маркетингові повідомлення</h4>
                    <p className="text-gray-400 text-sm">Новини та пропозиції</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="text-white font-medium">Звіти та аналітика</h4>
                    <p className="text-gray-400 text-sm">Щотижневі звіти продуктивності</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Button className="w-full lg:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 min-h-[44px]">
                <Save className="mr-2 h-4 w-4" />
                Зберегти налаштування
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6 lg:block hidden">
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white text-lg lg:text-xl flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Підписка та оплата
              </CardTitle>
              <CardDescription className="text-gray-400">Керуйте своєю підпискою та методами оплати</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-600/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-white font-medium">Cosmos Plan</h4>
                    <p className="text-gray-300 text-sm">$25/місяць • Активна до 15.02.2024</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">Активна</Badge>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium">Методи оплати</h4>
                <div className="p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <CreditCard className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-white text-sm">•••• •••• •••• 4242</p>
                        <p className="text-gray-400 text-xs">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="border-slate-600 text-gray-300">
                      Основна
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="border-slate-600 text-gray-300 hover:bg-slate-800 min-h-[44px] bg-transparent"
                >
                  Змінити план
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-600 text-gray-300 hover:bg-slate-800 min-h-[44px] bg-transparent"
                >
                  Додати картку
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SettingsPage
