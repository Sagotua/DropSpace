import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Rocket, Users, Package, TrendingUp, Star } from "lucide-react"

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
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative z-10">Увійти</span>
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="cosmic-glow relative overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 font-semibold">Почати</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 py-16 pb-5">
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
          <p className="text-xl text-gray-300 max-w-2xl mx-auto tracking-tighter mb-5">
            Мінімалістична платформа для дропшипперів та постачальників. Керуйте продуктами, замовленнями та
            партнерствами в одному місці.
          </p>
          <div className="flex flex-col justify-center leading-7 sm:flex-row gap-y-0 my-0">
            <Link href="/auth/register">
              <Button
                size="lg"
                className="cosmic-glow relative overflow-hidden group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 font-semibold tracking-wide">Спробувати безкоштовно</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-4 py-5">
        <div className="container mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 pulse-glow">
                <Package className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Можливості платформи
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Потужні інструменти для успішного дропшипінгу в одній платформі
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="space-gradient border-slate-700 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 group">
                <CardHeader className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors duration-300">
                      <Package className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-300 transition-colors duration-300">
                      Управління продуктами
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      Додавайте, редагуйте та імпортуйте продукти з РРЦ та Дроп ціною
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card className="space-gradient border-slate-700 hover:border-purple-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 group">
                <CardHeader className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                      <Users className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-white group-hover:text-purple-300 transition-colors duration-300">
                      Дві ролі в одній
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      Працюйте як дропшиппер, постачальник або обидві ролі одночасно
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>

              <Card className="space-gradient border-slate-700 hover:border-green-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 group">
                <CardHeader className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors duration-300">
                      <TrendingUp className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-white group-hover:text-green-300 transition-colors duration-300">
                      Експорт на маркетплейси
                    </CardTitle>
                    <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      Експортуйте продукти на Prom.ua, Rozetka та інші платформи
                    </CardDescription>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 pb-14 pt-14">
        <div className="container mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full mb-6 pulse-glow">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent">
                Тарифні плани
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Оберіть ідеальний план для вашого космічного бізнесу
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto items-stretch">
              <div className="group relative flex">
                {/* Animated background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-gray-500/20 via-slate-500/20 to-gray-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <Card className="space-gradient border-slate-700 hover:border-gray-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gray-500/20 group flex flex-col h-full w-full">
                  <CardHeader className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <CardTitle className="text-white group-hover:text-gray-300 transition-colors duration-300">
                        Test
                      </CardTitle>
                      <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Безкоштовно на 14 днів
                      </CardDescription>
                      <div className="text-3xl font-bold text-white group-hover:text-gray-300 transition-colors duration-300">
                        $0
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="flex-grow"></div>
                    <Button
                      className="w-full bg-transparent border-slate-600 text-white hover:bg-slate-800 hover:border-gray-500 transition-all duration-300 mt-auto"
                      variant="outline"
                    >
                      Почати тест
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="group relative flex">
                {/* Animated background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <Card className="space-gradient border-blue-500 relative hover:border-blue-400 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 group flex flex-col h-full w-full">
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 group-hover:bg-blue-400 transition-colors duration-300">
                    Популярний
                  </Badge>
                  <CardHeader className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <CardTitle className="text-white flex items-center group-hover:text-blue-300 transition-colors duration-300">
                        Standard
                        <Star className="ml-2 w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      </CardTitle>
                      <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Для малого бізнесу
                      </CardDescription>
                      <div className="text-3xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                        $5
                        <span className="text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          /міс
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="flex-grow"></div>
                    <Button className="w-full cosmic-glow hover:scale-105 transition-transform duration-300 mt-auto">
                      Обрати план
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="group relative flex">
                {/* Animated background glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <Card className="space-gradient border-slate-700 hover:border-yellow-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 group ring-2 ring-yellow-500/50 shadow-2xl shadow-yellow-500/20 border-yellow-500/30 flex flex-col h-full w-full">
                  <CardHeader className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative">
                      <CardTitle className="text-white flex items-center group-hover:text-yellow-300 transition-colors duration-300">
                        Cosmos
                        <Star className="ml-2 w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
                      </CardTitle>
                      <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        Для професіоналів
                      </CardDescription>
                      <div className="text-3xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                        $25
                        <span className="text-lg text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          /міс
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="flex-grow"></div>
                    <Button
                      className="w-full bg-transparent border-slate-600 text-white hover:bg-slate-800 hover:border-yellow-500 transition-all duration-300 mt-auto"
                      variant="outline"
                    >
                      Обрати план
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 px-4 py-5">
        <div className="container mx-auto text-center text-gray-400">
          <p>© 2025 DropSpace. Всі права захищені.</p>
        </div>
      </footer>
    </div>
  )
}
