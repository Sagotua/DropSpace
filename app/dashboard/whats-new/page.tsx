"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Star, Bug, Zap, Shield, Palette, Eye, Edit, Navigation } from "lucide-react"

const patchNotes = [
  {
    version: "2.3.0",
    date: "16 січня 2025",
    type: "major",
    title: "Система патч-нотів та покращення навігації",
    changes: [
      "Додано нову кнопку 'Нове у DropSpace' в сайдбар для всіх ролей користувачів",
      "Створено повноцінну сторінку патч-нотів з адаптивним дизайном",
      "Реалізовано кольорове кодування для різних типів оновлень",
      "Додано анімації та ефекти наведення для кращого UX",
      "Інтегровано систему версіонування з детальними описами змін",
    ],
  },
  {
    version: "2.2.5",
    date: "16 січня 2025",
    type: "minor",
    title: "Функціональність замовлень для дропшипперів",
    changes: [
      "Додано модальне вікно для перегляду деталей замовлення з повною інформацією про клієнта",
      "Реалізовано модальне вікно редагування замовлень (доступне лише для статусу 'Очікує')",
      "Покращено dropdown меню з функціональними кнопками 'Переглянути' та 'Редагувати'",
      "Додано валідацію для редагування замовлень залежно від статусу",
      "Оптимізовано відображення інформації про клієнтів та постачальників",
    ],
  },
  {
    version: "2.2.0",
    date: "15 січня 2025",
    type: "major",
    title: "Консистентна система статусних бейджів",
    changes: [
      "Стандартизовано кольорову схему для всіх статусних бейджів в додатку",
      "Додано hover ефекти та анімації для всіх бейджів статусів",
      "Оновлено бейдж підписки на сторінці налаштувань з консистентним стилем",
      "Реалізовано градієнтні фони та ефекти для покращення візуального досвіду",
      "Покращено читабельність та доступність статусних індикаторів",
    ],
  },
  {
    version: "2.1.8",
    date: "15 січня 2025",
    type: "patch",
    title: "Покращення футера та стилізації",
    changes: [
      "Спрощено дизайн футера з консистентним стилем",
      "Видалено зайві елементи та об'єднано текст в одну лінію",
      "Покращено адаптивність футера на різних розмірах екранів",
      "Оптимізовано кольорову схему для кращої читабельності",
    ],
  },
  {
    version: "2.1.5",
    date: "14 січня 2025",
    type: "minor",
    title: "Покращення системи ролей та навігації",
    changes: [
      "Оптимізовано сайдбар для різних ролей користувачів (дропшиппер/постачальник)",
      "Покращено активні стани навігаційних елементів",
      "Додано градієнтні ефекти для активних пунктів меню",
      "Реалізовано плавні переходи та анімації в навігації",
      "Покращено мобільну версію сайдбара з backdrop blur ефектом",
    ],
  },
  {
    version: "2.1.0",
    date: "13 січня 2025",
    type: "major",
    title: "Система управління замовленнями",
    changes: [
      "Створено повноцінну сторінку управління замовленнями",
      "Додано фільтрацію замовлень за статусом та пошук",
      "Реалізовано таблицю замовлень з детальною інформацією",
      "Додано кольорові бейджі для різних статусів замовлень",
      "Інтегровано dropdown меню з діями для кожного замовлення",
    ],
  },
  {
    version: "2.0.0",
    date: "10 січня 2025",
    type: "major",
    title: "Великий редизайн платформи DropSpace",
    changes: [
      "Повністю оновлений дизайн з космічною темою та градієнтами",
      "Реалізовано темну тему з синьо-фіолетовою кольоровою палітрою",
      "Створено нову систему компонентів з консистентним стилем",
      "Додано анімації та ефекти для покращення користувацького досвіду",
      "Оптимізовано адаптивність для всіх типів пристроїв",
      "Інтегровано нову типографіку та іконографію",
    ],
  },
  {
    version: "1.9.5",
    date: "8 січня 2025",
    type: "minor",
    title: "Початкова структура CRM системи",
    changes: [
      "Створено базову архітектуру додатку з Next.js App Router",
      "Реалізовано систему автентифікації та ролей користувачів",
      "Додано базові сторінки для дропшипперів та постачальників",
      "Створено контекст для управління ролями користувачів",
      "Інтегровано shadcn/ui компоненти для консистентного UI",
    ],
  },
]

const getTypeIcon = (type: string) => {
  switch (type) {
    case "major":
      return <Star className="w-4 h-4" />
    case "minor":
      return <Zap className="w-4 h-4" />
    case "patch":
      return <Bug className="w-4 h-4" />
    default:
      return <Shield className="w-4 h-4" />
  }
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case "major":
      return (
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 hover:from-purple-700 hover:to-pink-700 transition-all duration-300">
          Велике оновлення
        </Badge>
      )
    case "minor":
      return (
        <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0 hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
          Нові функції
        </Badge>
      )
    case "patch":
      return (
        <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 hover:from-green-700 hover:to-emerald-700 transition-all duration-300">
          Виправлення
        </Badge>
      )
    default:
      return (
        <Badge className="bg-gradient-to-r from-gray-600 to-slate-600 text-white border-0 hover:from-gray-700 hover:to-slate-700 transition-all duration-300">
          Оновлення
        </Badge>
      )
  }
}

const getFeatureIcon = (change: string) => {
  if (change.includes("модальне") || change.includes("вікно")) return <Eye className="w-3 h-3" />
  if (change.includes("редагування") || change.includes("редагувати")) return <Edit className="w-3 h-3" />
  if (change.includes("навігації") || change.includes("сайдбар")) return <Navigation className="w-3 h-3" />
  if (change.includes("дизайн") || change.includes("стиль")) return <Palette className="w-3 h-3" />
  return null
}

export default function WhatsNewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4 pulse-glow">
            <span className="text-white text-xl font-bold">!</span>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Нове у DropSpace
            </h1>
            <p className="text-gray-400 text-lg">Хронологія розвитку нашої космічної CRM платформи</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-400 text-sm font-medium">Всього оновлень</p>
                <p className="text-2xl font-bold text-white">{patchNotes.length}</p>
              </div>
              <Star className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-600/10 to-cyan-600/10 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-400 text-sm font-medium">Нових функцій</p>
                <p className="text-2xl font-bold text-white">
                  {patchNotes.filter((note) => note.type === "minor").length}
                </p>
              </div>
              <Zap className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-600/10 to-emerald-600/10 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-400 text-sm font-medium">Виправлень</p>
                <p className="text-2xl font-bold text-white">
                  {patchNotes.filter((note) => note.type === "patch").length}
                </p>
              </div>
              <Bug className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Patch Notes */}
      <div className="space-y-6">
        {patchNotes.map((note, index) => (
          <Card
            key={index}
            className="space-gradient border-slate-700 hover:border-blue-500/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 group"
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30 group-hover:border-blue-400/50 transition-colors duration-300">
                    {getTypeIcon(note.type)}
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-blue-300 transition-colors duration-300">
                    {note.title}
                  </CardTitle>
                  {getTypeBadge(note.type)}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{note.date}</span>
                  <Badge variant="outline" className="border-slate-600 text-gray-300 font-mono">
                    v{note.version}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {note.changes.map((change, changeIndex) => (
                  <li
                    key={changeIndex}
                    className="flex items-start gap-3 text-gray-300 group/item hover:text-gray-200 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex-shrink-0 group-hover/item:scale-125 transition-transform duration-200"></div>
                      {getFeatureIcon(change) && (
                        <div className="text-blue-400 opacity-70">{getFeatureIcon(change)}</div>
                      )}
                    </div>
                    <span className="leading-relaxed">{change}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <Card className="bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 border-slate-700/50 inline-block">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Система постійно розвивається та оновлюється</span>
            </div>
            <p className="text-gray-400 text-sm mt-2">
              Маєте ідеї для покращень?
              <span className="text-blue-400 hover:text-blue-300 cursor-pointer ml-1 transition-colors duration-200">
                Поділіться з нами!
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
