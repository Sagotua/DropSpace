import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Users, Package, TrendingUp, Star, Zap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Rocket className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">DropSpace</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
              Можливості
            </Link>
            <Link href="#pricing" className="text-gray-300 hover:text-white transition-colors">
              Тарифи
            </Link>
            <Link href="/auth/login" className="text-gray-300 hover:text-white transition-colors">
              Увійти
            </Link>
            <Link href="/auth/register">
              <Button className="cosmic-glow">Почати</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 pb-2 px-4">
        <div className="container mx-auto text-center">
          <div className="float-animation mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center pulse-glow">
              <Rocket className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            CRM для{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              космічного
            </span>{" "}
            дропшипінгу
          </h1>
          <p className="text-xl text-gray-300 mb-6 max-w-2xl mx-auto">
            Мінімалістична платформа для дропшипперів та постачальників. Керуйте продуктами, замовленнями та
            партнерствами в одному місці.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="cosmic-glow">
                Спробувати безкоштовно
                <Zap className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-slate-600 text-white hover:bg-slate-800 bg-transparent"
            >
              Дивитися демо
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 pb-2 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-[28px]">Можливості платформи</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="space-gradient border-slate-700">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle className="text-white">Управління продуктами</CardTitle>
                <CardDescription className="text-gray-400">
                  Додавайте, редагуйте та імпортуйте продукти з РРЦ та Дроп ціною
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="space-gradient border-slate-700">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle className="text-white">Дві ролі в одній</CardTitle>
                <CardDescription className="text-gray-400">
                  Працюйте як дропшиппер, постачальник або обидві ролі одночасно
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="space-gradient border-slate-700">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <CardTitle className="text-white">Експорт на маркетплейси</CardTitle>
                <CardDescription className="text-gray-400">
                  Експортуйте продукти на Prom, Rozetka та інші платформи
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 pb-10 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-[28px]">Тарифні плани</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="space-gradient border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Test</CardTitle>
                <CardDescription className="text-gray-400">Безкоштовно на 14 днів</CardDescription>
                <div className="text-3xl font-bold text-white">$0</div>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  Почати тест
                </Button>
              </CardContent>
            </Card>

            <Card className="space-gradient border-blue-500 relative">
              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500">Популярний</Badge>
              <CardHeader>
                <CardTitle className="text-white">Standard</CardTitle>
                <CardDescription className="text-gray-400">Для малого бізнесу</CardDescription>
                <div className="text-3xl font-bold text-white">
                  $5<span className="text-lg text-gray-400">/міс</span>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full cosmic-glow">Обрати план</Button>
              </CardContent>
            </Card>

            <Card className="space-gradient border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  Cosmos
                  <Star className="ml-2 w-4 h-4 text-yellow-400" />
                </CardTitle>
                <CardDescription className="text-gray-400">Для професіоналів</CardDescription>
                <div className="text-3xl font-bold text-white">
                  $25<span className="text-lg text-gray-400">/міс</span>
                </div>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-transparent" variant="outline">
                  Обрати план
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-5 px-4">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2025 DropSpace. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  )
}
