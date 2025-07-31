"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CreditCard, Check, Star, AlertCircle, TrendingUp, Clock } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

const subscriptionPlans = [
  {
    id: "test",
    name: "Test",
    price: 0,
    period: "14 днів безкоштовно",
    description: "Безкоштовно на 14 днів",
    features: [
      "До 50 продуктів",
      "До 10 замовлень на місяць",
      "Базова аналітика",
      "Email підтримка",
      "Експорт на 1 маркетплейс",
    ],
    buttonText: "Почати тест",
    buttonVariant: "outline" as const,
    popular: false,
    icon: Clock,
    color: "text-gray-400",
    bgGradient: "from-gray-500/20 to-slate-600/20",
  },
  {
    id: "standard",
    name: "Standard",
    price: 5,
    period: "/міс",
    description: "Для малого бізнесу",
    features: [
      "До 1,000 продуктів",
      "Необмежені замовлення",
      "Розширена аналітика",
      "Пріоритетна підтримка",
      "Експорт на всі маркетплейси",
      "API доступ",
      "Автоматизація замовлень",
    ],
    buttonText: "Обрати план",
    buttonVariant: "default" as const,
    popular: true,
    icon: Star,
    color: "text-blue-400",
    bgGradient: "from-blue-500/20 to-purple-600/20",
  },
  {
    id: "cosmos",
    name: "Cosmos",
    price: 25,
    period: "/міс",
    description: "Для професіоналів",
    features: [
      "Необмежені продукти",
      "Необмежені замовлення",
      "Преміум аналітика",
      "24/7 підтримка",
      "Всі інтеграції",
      "Персональний менеджер",
      "Білий лейбл",
      "Кастомні звіти",
      "Приоритетні оновлення",
    ],
    buttonText: "Обрати план",
    buttonVariant: "outline" as const,
    popular: false,
    icon: Star,
    color: "text-yellow-400",
    bgGradient: "from-yellow-500/20 to-orange-600/20",
  },
]

export default function SubscriptionPage() {
  const { user } = useAuth()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  if (!user) return null

  const currentSubscription = user.subscription || "Test"

  const handlePlanSelect = (planId: string) => {
    if (planId === currentSubscription.toLowerCase()) return

    setSelectedPlan(planId)

    if (planId === "test") {
      // Handle test plan activation
      handleTestActivation()
    } else {
      // Open payment modal for paid plans
      setShowPaymentModal(true)
    }
  }

  const handleTestActivation = async () => {
    setIsProcessing(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    alert("Тестовий період активовано на 14 днів!")
    setIsProcessing(false)
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real app, this would integrate with Stripe/Paddle
    alert(`Підписка "${selectedPlan}" успішно активована!`)

    setIsProcessing(false)
    setShowPaymentModal(false)
    setSelectedPlan(null)
  }

  const handleCancelSubscription = () => {
    if (confirm("Ви впевнені, що хочете скасувати підписку?")) {
      alert("Підписка буде скасована в кінці поточного періоду")
    }
  }

  const getNextBillingDate = () => {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    return date.toLocaleDateString("uk-UA")
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-white">Підписка</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Оберіть план, який найкраще підходить для вашого бізнесу. Ви можете змінити або скасувати підписку в будь-який
          час.
        </p>
      </div>

      {/* Current Subscription Status */}
      {currentSubscription && (
        <Card className="space-gradient border-slate-700 max-w-2xl mx-auto">
          <CardContent className="p-8 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-600/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-600/10 rounded-full blur-xl"></div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  {/* Pulse ring effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl animate-ping opacity-20"></div>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Поточна підписка: {currentSubscription}
                  </h3>
                  <p className="text-sm text-gray-300 flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>
                      {currentSubscription === "Test"
                        ? "Тестовий період до 15.02.2024"
                        : `Наступне списання: ${getNextBillingDate()}`}
                    </span>
                  </p>
                </div>
              </div>
              {currentSubscription !== "Test" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelSubscription}
                  className="bg-transparent border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-400 transition-all duration-300 backdrop-blur-sm"
                >
                  Скасувати
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Subscription Plans */}
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

        <div className="relative z-10 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto p-8 items-stretch">
          {subscriptionPlans.map((plan, index) => {
            const isCurrentPlan = plan.name.toLowerCase() === currentSubscription.toLowerCase()
            const PlanIcon = plan.icon

            return (
              <div
                key={plan.id}
                className="group relative flex"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`,
                }}
              >
                {/* Animated background glow */}
                <div
                  className={`absolute -inset-1 ${
                    plan.name === "Cosmos"
                      ? "bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-yellow-500/20"
                      : "bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20"
                  } rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500`}
                ></div>

                <Card
                  className={`space-gradient border-slate-700 relative hover:border-slate-600 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 flex flex-col h-full w-full ${
                    plan.popular ? "ring-2 ring-blue-500/50 shadow-2xl shadow-blue-500/20" : ""
                  } ${isCurrentPlan ? "ring-2 ring-green-500/50 shadow-2xl shadow-green-500/20" : ""} ${
                    plan.name === "Cosmos"
                      ? "ring-2 ring-yellow-500/50 shadow-2xl shadow-yellow-500/20 border-yellow-500/30"
                      : ""
                  } group-hover:shadow-2xl group-hover:shadow-purple-500/20`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <Badge className="absolute -top-3 left-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 animate-bounce z-10">
                      <Star className="w-3 h-3 mr-1" />
                      Популярний
                    </Badge>
                  )}

                  {/* Current Plan Badge */}
                  {isCurrentPlan && (
                    <Badge className="absolute -top-3 right-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 animate-pulse z-10">
                      <Check className="w-3 h-3 mr-1" />
                      Поточний план
                    </Badge>
                  )}

                  <CardHeader className="text-center pb-4 relative overflow-hidden">
                    {/* Header background effect */}
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-800/20 to-slate-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                      <div
                        className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-all duration-300 ${
                          plan.id === "test"
                            ? "bg-gray-800/50 border-2 border-gray-600/50 hover:border-gray-500"
                            : plan.id === "standard"
                              ? "bg-blue-900/30 border-2 border-blue-600/50 hover:border-blue-500"
                              : "bg-yellow-900/30 border-2 border-yellow-600/50 hover:border-yellow-500"
                        }`}
                      >
                        <PlanIcon
                          className={`w-10 h-10 transition-all duration-300 ${
                            plan.id === "test"
                              ? "text-gray-400 hover:text-gray-300"
                              : plan.id === "standard"
                                ? "text-blue-400 hover:text-blue-300"
                                : "text-yellow-400 hover:text-yellow-300"
                          }`}
                        />
                      </div>

                      <CardTitle className="text-white text-2xl flex items-center justify-center space-x-2 mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-500">
                        <span>{plan.name}</span>
                      </CardTitle>

                      <div className="space-y-3">
                        <div className="text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-500">
                          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            ${plan.price}
                          </span>
                          <span className="text-lg text-gray-400 font-normal">{plan.period}</span>
                        </div>
                        <CardDescription className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                          {plan.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6 relative flex-grow flex flex-col">
                    {/* Features List */}
                    <ul className="space-y-4 flex-grow">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center space-x-3 transform transition-all duration-300 hover:translate-x-2"
                          style={{
                            animation: `slideInLeft 0.4s ease-out ${index * 0.2 + featureIndex * 0.1}s both`,
                          }}
                        >
                          <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-gray-300 text-sm group-hover:text-white transition-colors duration-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto pt-4 pb-0">
                      {/* Action Button */}
                      <Button
                        className={`w-full transform transition-all duration-500 hover:scale-105 ${
                          plan.buttonVariant === "default"
                            ? "cosmic-glow hover:shadow-2xl hover:shadow-blue-500/50"
                            : "bg-transparent border-slate-600 hover:bg-gradient-to-r hover:from-slate-700 hover:to-slate-600 hover:border-slate-500"
                        }`}
                        variant={plan.buttonVariant}
                        onClick={() => handlePlanSelect(plan.id)}
                        disabled={isCurrentPlan || isProcessing}
                      >
                        {isProcessing && selectedPlan === plan.id ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Обробка...
                          </>
                        ) : isCurrentPlan ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Поточний план
                          </>
                        ) : (
                          <>
                            <span>{plan.buttonText}</span>
                            <TrendingUp className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>

                      {/* Upgrade/Downgrade hints */}
                      {!isCurrentPlan && currentSubscription !== "Test" && (
                        <div className="text-center transform transition-all duration-300 hover:scale-105 mt-3">
                          {plan.price >
                          (subscriptionPlans.find((p) => p.name.toLowerCase() === currentSubscription.toLowerCase())
                            ?.price || 0) ? (
                            <p className="text-xs text-blue-400 flex items-center justify-center animate-pulse">
                              <TrendingUp className="w-3 h-3 mr-1" />
                              Покращення плану
                            </p>
                          ) : (
                            plan.price <
                              (subscriptionPlans.find((p) => p.name.toLowerCase() === currentSubscription.toLowerCase())
                                ?.price || 0) && (
                              <p className="text-xs text-yellow-400 flex items-center justify-center animate-pulse">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Зміна плану
                              </p>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>

      {/* Features Comparison */}
      <Card className="space-gradient border-slate-700 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-white text-center">Порівняння можливостей</CardTitle>
          <CardDescription className="text-gray-400 text-center">
            Детальне порівняння всіх планів підписки
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/5 to-purple-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500/5 to-pink-600/5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="overflow-x-auto rounded-xl border border-slate-700/50 bg-slate-800/20 backdrop-blur-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700/50 bg-gradient-to-r from-slate-800/30 to-slate-700/30">
                    <th className="text-left py-4 px-6 text-gray-200 font-semibold">Можливості</th>
                    <th className="text-center py-4 px-4 text-gray-200 font-semibold">Test</th>
                    <th className="text-center py-4 px-4 text-gray-200 font-semibold">Standard</th>
                    <th className="text-center py-4 px-4 text-gray-200 font-semibold">Cosmos</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    { feature: "Кількість продуктів", test: "50", standard: "1,000", cosmos: "Необмежено" },
                    { feature: "Замовлення на місяць", test: "10", standard: "Необмежено", cosmos: "Необмежено" },
                    { feature: "Аналітика", test: "Базова", standard: "Розширена", cosmos: "Преміум" },
                    { feature: "Підтримка", test: "Email", standard: "Пріоритетна", cosmos: "24/7" },
                    { feature: "API доступ", test: "❌", standard: "✅", cosmos: "✅" },
                    { feature: "Персональний менеджер", test: "❌", standard: "❌", cosmos: "✅" },
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-800/50 hover:bg-slate-700/20 transition-colors duration-200"
                    >
                      <td className="py-4 px-6 text-gray-200 font-medium">{row.feature}</td>
                      <td className="py-4 px-4 text-center text-gray-400">{row.test}</td>
                      <td className="py-4 px-4 text-center text-blue-300">{row.standard}</td>
                      <td className="py-4 px-4 text-center text-yellow-300 font-medium">{row.cosmos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card className="space-gradient border-slate-700 max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-white text-center">Часті питання</CardTitle>
        </CardHeader>
        <CardContent className="p-8 relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-green-500/5 to-blue-600/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-28 h-28 bg-gradient-to-tr from-purple-500/5 to-pink-600/5 rounded-full blur-2xl"></div>

          <div className="relative z-10 space-y-6">
            {[
              {
                question: "Чи можу я змінити план в будь-який час?",
                answer: "Так, ви можете покращити або змінити план в будь-який час. Зміни набудуть чинності негайно.",
              },
              {
                question: "Що відбувається після закінчення тестового періоду?",
                answer:
                  "Після закінчення 14-денного тестового періоду ваш акаунт буде обмежений. Ви можете обрати платний план для продовження роботи.",
              },
              {
                question: "Чи є знижки для річної оплати?",
                answer: "Так, при оплаті за рік ви отримуєте знижку 20% на всі платні плани.",
              },
              {
                question: "Чи можу я скасувати підписку?",
                answer:
                  "Так, ви можете скасувати підписку в будь-який час. Доступ до платних функцій збережеться до кінця оплаченого періоду.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-gradient-to-r from-slate-800/30 to-slate-700/20 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">?</span>
                  </div>
                  <div className="space-y-3 flex-1">
                    <h4 className="text-white font-semibold text-lg leading-relaxed">{faq.question}</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="bg-slate-900 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">Підтвердження підписки</DialogTitle>
            <DialogDescription className="text-gray-400">
              Ви обрали план "{subscriptionPlans.find((p) => p.id === selectedPlan)?.name}"
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {selectedPlan && (
              <div className="p-4 bg-slate-800/30 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">План:</span>
                  <span className="text-white font-medium">
                    {subscriptionPlans.find((p) => p.id === selectedPlan)?.name}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-300">Ціна:</span>
                  <span className="text-white font-medium">
                    ${subscriptionPlans.find((p) => p.id === selectedPlan)?.price}/міс
                  </span>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 bg-transparent border-slate-600"
                onClick={() => setShowPaymentModal(false)}
                disabled={isProcessing}
              >
                Скасувати
              </Button>
              <Button className="flex-1 cosmic-glow" onClick={handlePayment} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Обробка...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4 mr-2" />
                    Оплатити
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
