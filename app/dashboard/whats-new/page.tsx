"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calendar, Star, Zap, Bug, Plus } from "lucide-react"

const patchNotes = [
  {
    id: 1,
    date: "2025-01-16",
    version: "v2.1.0",
    type: "major",
    title: "Покращена система замовлень",
    description:
      "Додано нові функції для управління замовленнями, включаючи модальні вікна для перегляду та редагування.",
    changes: [
      "Модальне вікно для перегляду деталей замовлення",
      "Можливість редагування замовлень у статусі 'Очікує'",
      "Покращена валідація форм",
      "Оптимізація продуктивності",
    ],
  },
  {
    id: 2,
    date: "2025-01-15",
    version: "v2.0.5",
    type: "minor",
    title: "Виправлення помилок та покращення UI",
    description: "Виправлено критичні помилки та покращено користувацький інтерфейс.",
    changes: [
      "Виправлено помилку з відображенням статусів",
      "Покращено адаптивність на мобільних пристроях",
      "Оновлено кольорову схему бейджів",
      "Виправлено проблеми з навігацією",
    ],
  },
  {
    id: 3,
    date: "2025-01-10",
    version: "v2.0.0",
    type: "major",
    title: "Великий редизайн платформи",
    description: "Повністю оновлений дизайн з новою кольоровою схемою та покращеною навігацією.",
    changes: [
      "Новий темний дизайн з градієнтами",
      "Покращена бічна панель навігації",
      "Оновлені компоненти форм",
      "Нова система статусів з кольоровим кодуванням",
      "Покращена типографіка",
    ],
  },
  {
    id: 4,
    date: "2025-01-05",
    version: "v1.9.2",
    type: "patch",
    title: "Безпека та стабільність",
    description: "Покращення безпеки та виправлення дрібних помилок.",
    changes: [
      "Покращено захист від XSS атак",
      "Оптимізовано запити до бази даних",
      "Виправлено помилки з експортом даних",
      "Покращено обробку помилок",
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
      return <Plus className="w-4 h-4" />
  }
}

const getTypeBadge = (type: string) => {
  switch (type) {
    case "major":
      return (
        <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0">Мажорне оновлення</Badge>
      )
    case "minor":
      return <Badge className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-0">Мінорне оновлення</Badge>
    case "patch":
      return <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0">Виправлення</Badge>
    default:
      return <Badge className="bg-gradient-to-r from-gray-600 to-slate-600 text-white border-0">Оновлення</Badge>
  }
}

export default function WhatsNewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">What's New in DropSpace</h1>
          <p className="text-gray-400">Останні оновлення та покращення платформи</p>
        </div>
      </div>

      <Separator className="bg-slate-700/50" />

      {/* Patch Notes */}
      <div className="space-y-6">
        {patchNotes.map((note, index) => (
          <Card key={note.id} className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
                    {getTypeIcon(note.type)}
                  </div>
                  <div>
                    <CardTitle className="text-white text-xl mb-1">{note.title}</CardTitle>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(note.date).toLocaleDateString("uk-UA")}</span>
                      </div>
                      <span className="text-blue-400 font-mono">{note.version}</span>
                    </div>
                  </div>
                </div>
                {getTypeBadge(note.type)}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-300 mb-4">{note.description}</p>

              <div className="space-y-2">
                <h4 className="text-white font-medium mb-2">Зміни:</h4>
                <ul className="space-y-2">
                  {note.changes.map((change, changeIndex) => (
                    <li key={changeIndex} className="flex items-start space-x-2 text-gray-300">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm">{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center py-8">
        <p className="text-gray-400 text-sm">
          Маєте пропозиції або знайшли помилку?
          <span className="text-blue-400 hover:text-blue-300 cursor-pointer ml-1">Зв'яжіться з нами</span>
        </p>
      </div>
    </div>
  )
}
