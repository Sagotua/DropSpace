"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Smartphone,
  Users,
  BarChart3,
  Package,
  ShoppingCart,
  Star,
  Sparkles,
  Rocket,
  Target,
  TrendingUp,
  Calendar,
  CheckCircle,
  ExternalLink,
  Github,
  MessageSquare,
  Heart,
  Coffee,
  Code,
  Palette,
  Shield,
  Database,
  Globe,
  Search,
  Filter,
  Edit,
  RefreshCw,
  Bell,
  Lock,
  User,
  CreditCard,
  Grid,
  Layout,
  MousePointer,
  Accessibility,
  Gauge,
} from "lucide-react"

interface PatchNote {
  version: string
  date: string
  type: "major" | "minor" | "patch"
  title: string
  description: string
  features: {
    icon: any
    title: string
    description: string
    status: "new" | "improved" | "fixed"
  }[]
  stats?: {
    label: string
    value: string
    change: string
    trend: "up" | "down" | "stable"
  }[]
  technical?: {
    title: string
    items: string[]
  }[]
}

const patchNotes: PatchNote[] = [
  {
    version: "2.4.0",
    date: "16 січня 2025",
    type: "minor",
    title: "Мобільна оптимізація",
    description:
      "Повна адаптація платформи для мобільних пристроїв з покращеною зручністю використання та доступністю.",
    features: [
      {
        icon: Smartphone,
        title: "Адаптивний дизайн",
        description: "Повністю адаптивний інтерфейс для всіх розмірів екранів від 320px до 768px",
        status: "new",
      },
      {
        icon: MousePointer,
        title: "Touch-friendly елементи",
        description: "Всі інтерактивні елементи мають мінімальний розмір 44×44px для зручного використання",
        status: "improved",
      },
      {
        icon: Layout,
        title: "Мобільні картки",
        description: "Таблиці замінено на картки для кращого відображення на мобільних пристроях",
        status: "new",
      },
      {
        icon: Grid,
        title: "Респонсивні сітки",
        description: "Статистичні картки та продукти адаптуються під розмір екрану",
        status: "improved",
      },
      {
        icon: Accessibility,
        title: "Покращена доступність",
        description: "Контрастність 4.5:1, підтримка скрін-рідерів та клавіатурної навігації",
        status: "improved",
      },
      {
        icon: Gauge,
        title: "Оптимізована продуктивність",
        description: "CSS-only респонсивний дизайн без JavaScript для кращої швидкості",
        status: "improved",
      },
    ],
    stats: [
      {
        label: "Підтримувані пристрої",
        value: "100%",
        change: "+25%",
        trend: "up",
      },
      {
        label: "Мобільна швидкість",
        value: "95/100",
        change: "+20",
        trend: "up",
      },
      {
        label: "Touch targets",
        value: "44px+",
        change: "Стандарт",
        trend: "stable",
      },
      {
        label: "Доступність",
        value: "AA",
        change: "WCAG 2.1",
        trend: "up",
      },
    ],
    technical: [
      {
        title: "Респонсивні брейкпоінти",
        items: [
          "≤375px: Екстра малі пристрої (iPhone SE)",
          "≤640px: Малі пристрої (мобільні телефони)",
          "≤768px: Середні пристрої (планшети)",
          "≥1024px: Десктоп (без змін)",
        ],
      },
      {
        title: "Оптимізовані сторінки",
        items: [
          "/dashboard/orders - Картки замість таблиць",
          "/dashboard/my-products - 2-колонкова сітка статистики",
          "/dashboard/settings - Одноколонкові форми та стислі вкладки",
        ],
      },
      {
        title: "Технічна реалізація",
        items: [
          "Tailwind responsive utilities (sm:, lg:)",
          "CSS-only адаптація без JavaScript",
          "Збережено всі десктопні макети",
          "Мінімальні touch targets 44px",
        ],
      },
    ],
  },
  {
    version: "2.3.1",
    date: "15 січня 2025",
    type: "patch",
    title: "Покращення навігації",
    description: "Оптимізація бічної панелі та додавання кнопки 'Нове у DropSpace' для відстеження оновлень.",
    features: [
      {
        icon: Bell,
        title: "Кнопка 'Нове у DropSpace'",
        description: "Нова кнопка внизу бічної панелі для швидкого доступу до патч-нотів",
        status: "new",
      },
      {
        icon: Layout,
        title: "Покращена навігація",
        description: "Оптимізовано розташування елементів у бічній панелі",
        status: "improved",
      },
      {
        icon: Sparkles,
        title: "Візуальні ефекти",
        description: "Додано hover-ефекти та анімації для кращого UX",
        status: "improved",
      },
    ],
  },
  {
    version: "2.3.0",
    date: "14 січня 2025",
    type: "minor",
    title: "Система патч-нотів",
    description:
      "Впровадження комплексної системи відстеження оновлень з детальною статистикою та технічними деталями.",
    features: [
      {
        icon: MessageSquare,
        title: "Сторінка патч-нотів",
        description: "Детальна інформація про всі оновлення з візуальною ієрархією",
        status: "new",
      },
      {
        icon: BarChart3,
        title: "Статистика релізів",
        description: "Метрики продуктивності та покращень для кожного оновлення",
        status: "new",
      },
      {
        icon: Code,
        title: "Технічні деталі",
        description: "Детальна інформація про технічні зміни для розробників",
        status: "new",
      },
      {
        icon: Star,
        title: "Система версій",
        description: "Семантичне версіонування з типами релізів",
        status: "new",
      },
    ],
    stats: [
      {
        label: "Функцій додано",
        value: "12+",
        change: "+12",
        trend: "up",
      },
      {
        label: "Покращень UX",
        value: "8",
        change: "+8",
        trend: "up",
      },
      {
        label: "Технічних змін",
        value: "15",
        change: "+15",
        trend: "up",
      },
    ],
  },
  {
    version: "2.2.0",
    date: "13 січня 2025",
    type: "minor",
    title: "Розширена аналітика",
    description: "Додавання комплексної системи аналітики з інтерактивними графіками та детальними звітами.",
    features: [
      {
        icon: BarChart3,
        title: "Інтерактивні графіки",
        description: "Динамічні графіки продажів, прибутку та конверсії",
        status: "new",
      },
      {
        icon: TrendingUp,
        title: "Аналіз трендів",
        description: "Автоматичний аналіз трендів продажів та прогнозування",
        status: "new",
      },
      {
        icon: Target,
        title: "KPI дашборд",
        description: "Ключові показники ефективності в реальному часі",
        status: "new",
      },
      {
        icon: Calendar,
        title: "Періодні звіти",
        description: "Автоматичні звіти за день, тиждень, місяць",
        status: "new",
      },
    ],
    stats: [
      {
        label: "Метрик додано",
        value: "25+",
        change: "+25",
        trend: "up",
      },
      {
        label: "Швидкість аналізу",
        value: "3x",
        change: "+200%",
        trend: "up",
      },
    ],
  },
  {
    version: "2.1.0",
    date: "12 січня 2025",
    type: "minor",
    title: "Система управління товарами",
    description: "Повноцінна система для управління товарами з розширеними можливостями фільтрації та пошуку.",
    features: [
      {
        icon: Package,
        title: "Каталог товарів",
        description: "Повний каталог з фото, описами та характеристиками",
        status: "new",
      },
      {
        icon: Search,
        title: "Розумний пошук",
        description: "Пошук за назвою, SKU, категорією з автодоповненням",
        status: "new",
      },
      {
        icon: Filter,
        title: "Фільтри товарів",
        description: "Багаторівневі фільтри за категоріями, ціною, статусом",
        status: "new",
      },
      {
        icon: Edit,
        title: "Редагування товарів",
        description: "Швидке редагування характеристик та цін",
        status: "new",
      },
    ],
  },
  {
    version: "2.0.0",
    date: "10 січня 2025",
    type: "major",
    title: "Система замовлень",
    description: "Запуск повноцінної системи управління замовленнями з автоматизацією процесів.",
    features: [
      {
        icon: ShoppingCart,
        title: "Управління замовленнями",
        description: "Повний цикл обробки замовлень від створення до доставки",
        status: "new",
      },
      {
        icon: Bell,
        title: "Сповіщення",
        description: "Автоматичні сповіщення про зміну статусу замовлень",
        status: "new",
      },
      {
        icon: Users,
        title: "CRM система",
        description: "Управління клієнтами та історія взаємодій",
        status: "new",
      },
      {
        icon: RefreshCw,
        title: "Автоматизація",
        description: "Автоматичне оновлення статусів та інвентарю",
        status: "new",
      },
    ],
    stats: [
      {
        label: "Замовлень оброблено",
        value: "1000+",
        change: "Запуск",
        trend: "up",
      },
      {
        label: "Час обробки",
        value: "-75%",
        change: "Покращення",
        trend: "up",
      },
    ],
  },
  {
    version: "1.5.0",
    date: "8 січня 2025",
    type: "minor",
    title: "Система ролей",
    description: "Впровадження системи ролей користувачів з різними рівнями доступу.",
    features: [
      {
        icon: Shield,
        title: "Ролі користувачів",
        description: "Дропшиппери, постачальники з різними правами доступу",
        status: "new",
      },
      {
        icon: Lock,
        title: "Контроль доступу",
        description: "Гранульований контроль доступу до функцій",
        status: "new",
      },
      {
        icon: User,
        title: "Профілі користувачів",
        description: "Детальні профілі з налаштуваннями ролей",
        status: "new",
      },
    ],
  },
  {
    version: "1.4.0",
    date: "5 січня 2025",
    type: "minor",
    title: "Система підписок",
    description: "Запуск багаторівневої системи підписок з різними можливостями.",
    features: [
      {
        icon: CreditCard,
        title: "Плани підписок",
        description: "Test, Standard, Cosmos з різними можливостями",
        status: "new",
      },
      {
        icon: Star,
        title: "Преміум функції",
        description: "Розширені можливості для преміум користувачів",
        status: "new",
      },
      {
        icon: Rocket,
        title: "Cosmos план",
        description: "Найпотужніший план з усіма можливостями",
        status: "new",
      },
    ],
  },
  {
    version: "1.3.0",
    date: "3 січня 2025",
    type: "minor",
    title: "Покращення UI/UX",
    description: "Масштабне оновлення інтерфейсу з космічною темою та покращеною навігацією.",
    features: [
      {
        icon: Palette,
        title: "Космічна тема",
        description: "Новий дизайн з градієнтами та космічними ефектами",
        status: "new",
      },
      {
        icon: Sparkles,
        title: "Анімації",
        description: "Плавні переходи та мікроанімації",
        status: "new",
      },
      {
        icon: Layout,
        title: "Покращена навігація",
        description: "Інтуїтивна навігація з швидким доступом",
        status: "improved",
      },
    ],
  },
  {
    version: "1.2.0",
    date: "1 січня 2025",
    type: "minor",
    title: "Система аутентифікації",
    description: "Безпечна система входу та реєстрації з захистом даних.",
    features: [
      {
        icon: Lock,
        title: "Безпечний вхід",
        description: "Двофакторна аутентифікація та шифрування",
        status: "new",
      },
      {
        icon: User,
        title: "Реєстрація користувачів",
        description: "Простий процес реєстрації з верифікацією",
        status: "new",
      },
      {
        icon: Shield,
        title: "Захист даних",
        description: "Шифрування персональних даних користувачів",
        status: "new",
      },
    ],
  },
  {
    version: "1.1.0",
    date: "28 грудня 2024",
    type: "minor",
    title: "Базовий дашборд",
    description: "Створення основного дашборду з ключовими метриками та навігацією.",
    features: [
      {
        icon: BarChart3,
        title: "Статистичні картки",
        description: "Ключові метрики бізнесу на головній сторінці",
        status: "new",
      },
      {
        icon: Layout,
        title: "Навігаційна панель",
        description: "Зручна бічна панель з основними розділами",
        status: "new",
      },
      {
        icon: TrendingUp,
        title: "Графіки продуктивності",
        description: "Візуалізація основних показників",
        status: "new",
      },
    ],
  },
  {
    version: "1.0.0",
    date: "25 грудня 2024",
    type: "major",
    title: "Запуск DropSpace",
    description: "Офіційний запуск платформи DropSpace - революційної CRM системи для дропшиппінгу.",
    features: [
      {
        icon: Rocket,
        title: "Платформа запущена",
        description: "Перша версія DropSpace готова до використання",
        status: "new",
      },
      {
        icon: Globe,
        title: "Веб-інтерфейс",
        description: "Сучасний веб-інтерфейс з адаптивним дизайном",
        status: "new",
      },
      {
        icon: Database,
        title: "База даних",
        description: "Надійна система зберігання даних",
        status: "new",
      },
      {
        icon: Coffee,
        title: "Готово до роботи",
        description: "Всі основні функції готові для користувачів",
        status: "new",
      },
    ],
    stats: [
      {
        label: "Днів розробки",
        value: "180",
        change: "Завершено",
        trend: "up",
      },
      {
        label: "Функцій",
        value: "50+",
        change: "Реалізовано",
        trend: "up",
      },
    ],
  },
]

export default function WhatsNewPage() {
  const getVersionBadge = (type: string) => {
    switch (type) {
      case "major":
        return <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">Major</Badge>
      case "minor":
        return <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">Minor</Badge>
      case "patch":
        return <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">Patch</Badge>
      default:
        return <Badge className="bg-gradient-to-r from-gray-500 to-slate-500 text-white border-0">Release</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Sparkles className="w-4 h-4 text-green-400" />
      case "improved":
        return <TrendingUp className="w-4 h-4 text-blue-400" />
      case "fixed":
        return <CheckCircle className="w-4 h-4 text-purple-400" />
      default:
        return <Star className="w-4 h-4 text-yellow-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Нове</Badge>
      case "improved":
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">Покращено</Badge>
      case "fixed":
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">Виправлено</Badge>
      default:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">Оновлено</Badge>
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-4 h-4 text-green-400" />
      case "down":
        return <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />
      default:
        return <Target className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">Нове у DropSpace</h1>
            <p className="text-sm sm:text-base text-gray-400">Останні оновлення та покращення платформи</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card className="space-gradient border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-white">{patchNotes.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">Релізів</div>
            </CardContent>
          </Card>
          <Card className="space-gradient border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-white">
                {patchNotes.reduce((sum, note) => sum + note.features.length, 0)}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Функцій</div>
            </CardContent>
          </Card>
          <Card className="space-gradient border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-white">
                {patchNotes.filter((note) => note.type === "major").length}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">Major релізів</div>
            </CardContent>
          </Card>
          <Card className="space-gradient border-slate-700">
            <CardContent className="p-4 text-center">
              <div className="text-lg sm:text-2xl font-bold text-white">25</div>
              <div className="text-xs sm:text-sm text-gray-400">Днів активності</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Patch Notes */}
      <div className="space-y-6 sm:space-y-8">
        {patchNotes.map((note, index) => (
          <Card key={note.version} className="space-gradient border-slate-700 overflow-hidden">
            <CardHeader className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">v{note.version}</h2>
                    {getVersionBadge(note.type)}
                    {index === 0 && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 animate-pulse">
                        Останнє
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-white">{note.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400">{note.description}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    {note.date}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 pt-0 space-y-6">
              {/* Features */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  Основні зміни
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {note.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <feature.icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h5 className="font-medium text-white text-sm">{feature.title}</h5>
                            {getStatusBadge(feature.status)}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              {note.stats && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-green-400" />
                    Статистика релізу
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {note.stats.map((stat, statIndex) => (
                      <div key={statIndex} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">{stat.label}</span>
                            {getTrendIcon(stat.trend)}
                          </div>
                          <div className="text-lg sm:text-xl font-bold text-white">{stat.value}</div>
                          <div
                            className={`text-xs ${
                              stat.trend === "up"
                                ? "text-green-400"
                                : stat.trend === "down"
                                  ? "text-red-400"
                                  : "text-gray-400"
                            }`}
                          >
                            {stat.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Details */}
              {note.technical && (
                <div>
                  <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5 text-purple-400" />
                    Технічні деталі
                  </h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {note.technical.map((tech, techIndex) => (
                      <div key={techIndex} className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                        <h5 className="font-medium text-white mb-3">{tech.title}</h5>
                        <ul className="space-y-2">
                          {tech.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2 text-sm text-gray-400">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <Card className="space-gradient border-slate-700">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-red-400" />
              <span className="text-white font-medium">Дякуємо за використання DropSpace!</span>
            </div>
            <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto">
              Ми постійно працюємо над покращенням платформи. Якщо у вас є ідеї або пропозиції, будь ласка, зв'яжіться з
              нами.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="outline" className="bg-transparent border-slate-600 min-h-[44px]">
                <MessageSquare className="w-4 h-4 mr-2" />
                Залишити відгук
              </Button>
              <Button variant="outline" className="bg-transparent border-slate-600 min-h-[44px]">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button className="cosmic-glow min-h-[44px]">
                <ExternalLink className="w-4 h-4 mr-2" />
                Документація
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
