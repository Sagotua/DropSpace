"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  User,
  Lock,
  Bell,
  Camera,
  Save,
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Mail,
  Phone,
  Shield,
  Package,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar: string
  roles: {
    dropshipper: boolean
    supplier: boolean
  }
}

interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

interface NotificationSettings {
  orderNotifications: boolean
  emailUpdates: boolean
  marketingEmails: boolean
  securityAlerts: boolean
}

export default function SettingsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  // Profile state
  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    avatar: "",
    roles: {
      dropshipper: false,
      supplier: false,
    },
  })

  // Password state
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  // Notification state
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    orderNotifications: true,
    emailUpdates: true,
    marketingEmails: false,
    securityAlerts: true,
  })

  // Load user data on component mount
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: "", // Would come from API in real app
        avatar: `/placeholder.svg?height=100&width=100&text=${user.firstName[0]}${user.lastName[0]}`,
        roles: user.roles,
      })

      // Load notification settings from localStorage or API
      const savedNotifications = localStorage.getItem("dropspace_notifications")
      if (savedNotifications) {
        setNotificationSettings(JSON.parse(savedNotifications))
      }
    }
  }, [user])

  // Clear message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [message])

  const handleProfileSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would update the user in the auth context
      setMessage({ type: "success", text: "Профіль успішно оновлено!" })
    } catch (error) {
      setMessage({ type: "error", text: "Помилка при оновленні профілю. Спробуйте ще раз." })
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    setIsLoading(true)
    setMessage(null)

    // Validation
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Заповніть всі поля" })
      setIsLoading(false)
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: "error", text: "Нові паролі не співпадають" })
      setIsLoading(false)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: "error", text: "Новий пароль повинен містити мінімум 6 символів" })
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setMessage({ type: "success", text: "Пароль успішно змінено!" })
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      setMessage({ type: "error", text: "Помилка при зміні пароля. Перевірте поточний пароль." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleNotificationSave = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Save to localStorage (in real app would be API)
      localStorage.setItem("dropspace_notifications", JSON.stringify(notificationSettings))

      setMessage({ type: "success", text: "Налаштування сповіщень збережено!" })
    } catch (error) {
      setMessage({ type: "error", text: "Помилка при збереженні налаштувань." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = () => {
    // In a real app, this would open file picker and upload image
    alert("Функція завантаження аватара буде доступна незабаром!")
  }

  if (!user) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Налаштування</h1>
        <p className="text-gray-400">Керуйте вашим профілем, безпекою та налаштуваннями</p>
      </div>

      {/* Message Alert */}
      {message && (
        <Alert
          className={`${message.type === "success" ? "border-green-500/50 bg-green-500/10" : "border-red-500/50 bg-red-500/10"}`}
        >
          {message.type === "success" ? (
            <CheckCircle className="h-4 w-4 text-green-400" />
          ) : (
            <AlertCircle className="h-4 w-4 text-red-400" />
          )}
          <AlertDescription className={message.type === "success" ? "text-green-400" : "text-red-400"}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700 grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700">
            <User className="w-4 h-4 mr-2" />
            Профіль
          </TabsTrigger>
          <TabsTrigger value="password" className="data-[state=active]:bg-slate-700">
            <Lock className="w-4 h-4 mr-2" />
            Пароль
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700">
            <Bell className="w-4 h-4 mr-2" />
            Сповіщення
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Avatar Section */}
            <Card className="space-gradient border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Аватар</CardTitle>
                <CardDescription className="text-gray-400">Оновіть ваше фото профілю</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={profileData.avatar || "/placeholder.svg"} alt="Avatar" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl">
                        {profileData.firstName[0]}
                        {profileData.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <Button
                      size="sm"
                      className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 cosmic-glow"
                      onClick={handleAvatarUpload}
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button variant="outline" onClick={handleAvatarUpload} className="bg-transparent border-slate-600">
                    Змінити фото
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Form */}
            <div className="lg:col-span-2">
              <Card className="space-gradient border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Особиста інформація</CardTitle>
                  <CardDescription className="text-gray-400">
                    Оновіть ваші особисті дані та контактну інформацію
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-gray-300">
                        Ім'я
                      </Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, firstName: e.target.value }))}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-gray-300">
                        Прізвище
                      </Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, lastName: e.target.value }))}
                        className="bg-slate-800 border-slate-600 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-gray-300">
                      Email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        readOnly
                        className="pl-10 bg-slate-800/50 border-slate-600 text-gray-400 cursor-not-allowed"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Email не можна змінити</p>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-gray-300">
                      Телефон (необов'язково)
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="pl-10 bg-slate-800 border-slate-600 text-white"
                        placeholder="+380 XX XXX XX XX"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-gray-300">Ролі в системі</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {profileData.roles.dropshipper && (
                        <Badge variant="outline" className="border-blue-500 text-blue-400">
                          <Shield className="w-3 h-3 mr-1" />
                          Дропшиппер
                        </Badge>
                      )}
                      {profileData.roles.supplier && (
                        <Badge variant="outline" className="border-purple-500 text-purple-400">
                          <Package className="w-3 h-3 mr-1" />
                          Постачальник
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Ролі встановлюються при реєстрації</p>
                  </div>

                  <Button onClick={handleProfileSave} disabled={isLoading} className="cosmic-glow">
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Збереження...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Зберегти зміни
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Account Info - only in Profile tab */}
          <Card className="space-gradient border-slate-700 max-w-2xl mt-6">
            <CardHeader>
              <CardTitle className="text-white">Інформація про акаунт</CardTitle>
              <CardDescription className="text-gray-400">Деталі вашого акаунту</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-gray-400">ID користувача:</Label>
                  <p className="text-white font-mono">{user.id}</p>
                </div>
                <div>
                  <Label className="text-gray-400">Дата реєстрації:</Label>
                  <p className="text-white">{new Date(user.createdAt).toLocaleDateString("uk-UA")}</p>
                </div>
                <div>
                  <Label className="text-gray-400">Поточна підписка:</Label>
                  <Badge variant="outline" className="border-blue-500 text-blue-400 ml-2">
                    {user.subscription}
                  </Badge>
                </div>
                <div>
                  <Label className="text-gray-400">Статус акаунту:</Label>
                  <Badge variant="outline" className="border-green-500 text-green-400 ml-2">
                    Активний
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Password Tab */}
        <TabsContent value="password">
          <Card className="space-gradient border-slate-700 max-w-2xl">
            <CardHeader>
              <CardTitle className="text-white">Зміна пароля</CardTitle>
              <CardDescription className="text-gray-400">
                Оновіть ваш пароль для забезпечення безпеки акаунту
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="currentPassword" className="text-gray-300">
                  Поточний пароль
                </Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPasswords.current ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, currentPassword: e.target.value }))}
                    className="bg-slate-800 border-slate-600 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPasswords((prev) => ({ ...prev, current: !prev.current }))}
                  >
                    {showPasswords.current ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword" className="text-gray-300">
                  Новий пароль
                </Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showPasswords.new ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, newPassword: e.target.value }))}
                    className="bg-slate-800 border-slate-600 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPasswords((prev) => ({ ...prev, new: !prev.new }))}
                  >
                    {showPasswords.new ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Мінімум 6 символів</p>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-gray-300">
                  Підтвердіть новий пароль
                </Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showPasswords.confirm ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                    className="bg-slate-800 border-slate-600 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))}
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className="w-4 h-4 text-gray-400" />
                    ) : (
                      <Eye className="w-4 h-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Password Strength Indicator */}
              {passwordData.newPassword && (
                <div className="space-y-2">
                  <Label className="text-gray-300 text-sm">Надійність пароля:</Label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded ${
                          passwordData.newPassword.length >= level * 2
                            ? level <= 2
                              ? "bg-red-500"
                              : level === 3
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            : "bg-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-500">
                    {passwordData.newPassword.length < 6
                      ? "Слабкий пароль"
                      : passwordData.newPassword.length < 10
                        ? "Середній пароль"
                        : "Надійний пароль"}
                  </p>
                </div>
              )}

              <Button onClick={handlePasswordChange} disabled={isLoading} className="cosmic-glow">
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Оновлення...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Оновити пароль
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="space-gradient border-slate-700 max-w-2xl">
            <CardHeader>
              <CardTitle className="text-white">Налаштування сповіщень</CardTitle>
              <CardDescription className="text-gray-400">
                Керуйте тим, які сповіщення ви хочете отримувати
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-white">Сповіщення про замовлення</Label>
                    <p className="text-sm text-gray-400">Отримувати email при зміні статусу замовлень</p>
                  </div>
                  <Switch
                    checked={notificationSettings.orderNotifications}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, orderNotifications: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-white">Оновлення платформи</Label>
                    <p className="text-sm text-gray-400">Інформація про нові функції та оновлення</p>
                  </div>
                  <Switch
                    checked={notificationSettings.emailUpdates}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, emailUpdates: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-white">Маркетингові листи</Label>
                    <p className="text-sm text-gray-400">Спеціальні пропозиції та новини про продукти</p>
                  </div>
                  <Switch
                    checked={notificationSettings.marketingEmails}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, marketingEmails: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                  <div className="space-y-1">
                    <Label className="text-white">Сповіщення безпеки</Label>
                    <p className="text-sm text-gray-400">Важливі повідомлення про безпеку акаунту</p>
                  </div>
                  <Switch
                    checked={notificationSettings.securityAlerts}
                    onCheckedChange={(checked) =>
                      setNotificationSettings((prev) => ({ ...prev, securityAlerts: checked }))
                    }
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <Button onClick={handleNotificationSave} disabled={isLoading} className="cosmic-glow">
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Збереження...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Зберегти налаштування
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
